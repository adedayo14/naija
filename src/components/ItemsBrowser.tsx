'use client';

import { useState, useEffect, useMemo } from 'react';
import { Item, Category, ShippingConfig } from '@/types';
import ItemCard from './ItemCard';
import FiltersBar from './FiltersBar';
import ClaimedItemsPanel from './ClaimedItemsPanel';

interface ItemsBrowserProps {
  initialItems: Item[];
}

export default function ItemsBrowser({ initialItems }: ItemsBrowserProps) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [claimedItems, setClaimedItems] = useState<Item[]>([]);
  const [shippingConfig, setShippingConfig] = useState<ShippingConfig | null>(null);

  // Filters and sorting
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [sizeFilter, setSizeFilter] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'weight'>('default');

  // Load shipping config on mount
  useEffect(() => {
    fetch('/api/shipping')
      .then(res => res.json())
      .then(config => setShippingConfig(config))
      .catch(err => console.error('Error loading shipping config:', err));
  }, []);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let filtered = [...items];

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    // Size filter
    if (sizeFilter.trim()) {
      const sizeLower = sizeFilter.toLowerCase();
      filtered = filtered.filter(item =>
        item.size.toLowerCase().includes(sizeLower)
      );
    }

    // Sorting
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'weight') {
      filtered.sort((a, b) => a.weightKg - b.weightKg);
    }

    return filtered;
  }, [items, categoryFilter, sizeFilter, sortBy]);

  const handleClaim = async (itemId: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, name }),
      });

      const data = await response.json();

      if (response.status === 409) {
        return { success: false, error: 'Sorry, someone already claimed this item.' };
      }

      if (!response.ok) {
        return { success: false, error: data.error || 'Failed to claim item' };
      }

      // Success - remove from available items and add to claimed
      const claimedItem = items.find(item => item.id === itemId);
      if (claimedItem) {
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
        setClaimedItems(prevClaimed => [...prevClaimed, { ...claimedItem, claimedBy: name, claimedAt: new Date().toISOString() }]);
      }

      return { success: true };
    } catch (error) {
      console.error('Error claiming item:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Items</h1>

      <ClaimedItemsPanel claimedItems={claimedItems} shippingConfig={shippingConfig} />

      <FiltersBar
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        sizeFilter={sizeFilter}
        onSizeChange={setSizeFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          No items match your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} onClaim={handleClaim} />
          ))}
        </div>
      )}
    </div>
  );
}
