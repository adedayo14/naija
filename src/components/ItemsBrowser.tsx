'use client';

import { useState, useEffect, useMemo } from 'react';
import { Item, Category, ShippingConfig, POINTS_BUDGET } from '@/types';
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

  const handleClaim = async (itemId: string, name: string) => {
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

      if (response.status === 403 && data.error === 'budget_exceeded') {
        return { success: false, error: data.message || 'You have reached your maximum budget.' };
      }

      if (!response.ok) {
        return { success: false, error: data.message || data.error || 'Failed to claim item' };
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
    <div className="space-y-8">
      <ClaimedItemsPanel claimedItems={claimedItems} shippingConfig={shippingConfig} />

      {/* Filters Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <FiltersBar
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          sizeFilter={sizeFilter}
          onSizeChange={setSizeFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      {/* Results Count */}
      {(categoryFilter !== 'all' || sizeFilter) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <p className="text-xs sm:text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredItems.length}</span> {filteredItems.length === 1 ? 'item' : 'items'}
            {categoryFilter !== 'all' && <span> in <span className="capitalize font-medium">{categoryFilter}s</span></span>}
            {sizeFilter && <span> matching <span className="font-medium">"{sizeFilter}"</span></span>}
          </p>
          <button
            type="button"
            onClick={() => {
              setCategoryFilter('all');
              setSizeFilter('');
              setSortBy('default');
            }}
            className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 active:gap-2 sm:hover:gap-2 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear filters
          </button>
        </div>
      )}

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 sm:py-20 px-4">
          <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gray-100 mb-4 sm:mb-6">
            <svg className="w-8 sm:w-10 h-8 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No items found</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            {categoryFilter !== 'all' || sizeFilter
              ? 'Try adjusting your filters to see more items.'
              : 'Check back soon for new items!'}
          </p>
          {(categoryFilter !== 'all' || sizeFilter) && (
            <button
              type="button"
              onClick={() => {
                setCategoryFilter('all');
                setSizeFilter('');
              }}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              pointsCost={shippingConfig ? shippingConfig[item.category] : 0}
              onClaim={handleClaim}
            />
          ))}
        </div>
      )}
    </div>
  );
}
