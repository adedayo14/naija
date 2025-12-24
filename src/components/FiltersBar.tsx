'use client';

import { Category } from '@/types';

interface FiltersBarProps {
  categoryFilter: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
  sizeFilter: string;
  onSizeChange: (size: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'default' | 'name' | 'weight';
  onSortChange: (sort: 'default' | 'name' | 'weight') => void;
}

const categories = [
  { value: 'all', label: 'All Items', icon: '🏷️' },
  { value: 'tshirt', label: 'T-Shirts', icon: '👕' },
  { value: 'shirt', label: 'Shirts', icon: '👔' },
  { value: 'trousers', label: 'Trousers', icon: '👖' },
  { value: 'jeans', label: 'Jeans', icon: '👖' },
  { value: 'cardigan', label: 'Cardigans', icon: '🧥' },
  { value: 'jacket', label: 'Jackets', icon: '🧥' },
  { value: 'shoes', label: 'Shoes', icon: '👟' },
  { value: 'other', label: 'Other', icon: '✨' },
];

const sizes = ['S', 'M', 'L', 'XL', '32', '34', '36'];

export default function FiltersBar({
  categoryFilter,
  onCategoryChange,
  sizeFilter,
  onSizeChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: FiltersBarProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Category Filter Pills */}
      <div>
        <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
          Browse by Category
        </label>
        <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => onCategoryChange(cat.value as Category | 'all')}
              className={`
                inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm
                transition-all duration-200 active:scale-95 sm:hover:scale-105 whitespace-nowrap
                ${
                  categoryFilter === cat.value
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-700 shadow-sm'
                }
              `}
            >
              <span className="text-sm sm:text-base">{cat.icon}</span>
              <span className="hidden xs:inline sm:inline">{cat.label}</span>
              <span className="xs:hidden sm:hidden">{cat.label.split(' ')[0]}</span>
              {categoryFilter === cat.value && (
                <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter Buttons */}
      <div>
        <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
          Filter by Size
        </label>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => onSizeChange('')}
            className={`
              inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm
              transition-all duration-200 active:scale-95 sm:hover:scale-105
              ${
                sizeFilter === ''
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-700 shadow-sm'
              }
            `}
          >
            All Sizes
          </button>
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onSizeChange(size)}
              className={`
                inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm
                transition-all duration-200 active:scale-95 sm:hover:scale-105
                ${
                  sizeFilter === size
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-700 shadow-sm'
                }
              `}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Sort Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search */}
        <div className="relative">
          <label htmlFor="search-input" className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
            Search Items
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <svg className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="search-input"
              type="text"
              placeholder="Search by name, brand, description..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
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
          <label htmlFor="sort-select" className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
            Sort Items
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <svg className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </div>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'default' | 'name' | 'weight')}
              className="w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white shadow-sm appearance-none cursor-pointer"
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
