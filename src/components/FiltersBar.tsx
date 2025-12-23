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

const categories = [
  { value: 'all', label: 'All Items', icon: '🏷️' },
  { value: 'tshirt', label: 'T-Shirts', icon: '👕' },
  { value: 'shirt', label: 'Shirts', icon: '👔' },
  { value: 'trousers', label: 'Trousers', icon: '👖' },
  { value: 'shoes', label: 'Shoes', icon: '👟' },
  { value: 'other', label: 'Other', icon: '✨' },
];

export default function FiltersBar({
  categoryFilter,
  onCategoryChange,
  sizeFilter,
  onSizeChange,
  sortBy,
  onSortChange,
}: FiltersBarProps) {
  return (
    <div className="space-y-6">
      {/* Category Filter Pills */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Browse by Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => onCategoryChange(cat.value as Category | 'all')}
              className={`
                inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm
                transition-all duration-200 transform hover:scale-105
                ${
                  categoryFilter === cat.value
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-emerald-500 hover:text-emerald-700 shadow-sm'
                }
              `}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.label}</span>
              {categoryFilter === cat.value && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Sort Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Size Search */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Search by Size
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="e.g., M, L, UK 10, 32x32..."
              value={sizeFilter}
              onChange={(e) => onSizeChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all bg-white shadow-sm"
            />
            {sizeFilter && (
              <button
                type="button"
                onClick={() => onSizeChange('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sort Items
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </div>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'default' | 'name' | 'weight')}
              className="w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all bg-white shadow-sm appearance-none cursor-pointer"
            >
              <option value="default">Latest First</option>
              <option value="name">Name (A–Z)</option>
              <option value="weight">Weight (Light to Heavy)</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
