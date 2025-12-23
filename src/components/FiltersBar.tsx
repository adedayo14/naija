'use client';

import { Category } from '@/types';

interface FiltersBarProps {
  categoryFilter: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
  sizeFilter: string;
  onSizeChange: (size: string) => void;
  sortBy: 'default' | 'name' | 'weight';
  onSortChange: (sort: 'default' | 'name' | 'weight') => void;
}

export default function FiltersBar({
  categoryFilter,
  onCategoryChange,
  sizeFilter,
  onSizeChange,
  sortBy,
  onSortChange,
}: FiltersBarProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value as Category | 'all')}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="all">All</option>
            <option value="tshirt">T-shirts</option>
            <option value="shirt">Shirts</option>
            <option value="trousers">Trousers</option>
            <option value="shoes">Shoes</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Size
          </label>
          <input
            type="text"
            placeholder="Filter by size..."
            value={sizeFilter}
            onChange={(e) => onSizeChange(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'default' | 'name' | 'weight')}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="default">Default</option>
            <option value="name">Name A–Z</option>
            <option value="weight">Weight: light to heavy</option>
          </select>
        </div>
      </div>
    </div>
  );
}
