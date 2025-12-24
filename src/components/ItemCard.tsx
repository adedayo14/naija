'use client';

import { Item } from '@/types';
import { useState } from 'react';

interface ItemCardProps {
  item: Item;
  pointsCost: number;
  onClaim: (itemId: string, name: string) => Promise<{ success: boolean; error?: string }>;
}

export default function ItemCard({ item, pointsCost, onClaim }: ItemCardProps) {
  const [name, setName] = useState('');
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState('');
  const [showClaimForm, setShowClaimForm] = useState(false);

  const handleClaim = async () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setClaiming(true);
    setError('');

    const result = await onClaim(item.id, name.trim());

    if (!result.success) {
      setError(result.error || 'Failed to claim item');
      setClaiming(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={item.imagePath.split('/').map((part, i) => i === 0 ? part : encodeURIComponent(part)).join('/')}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg capitalize">
            {item.category}
          </span>
        </div>

        {/* Weight Badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/90 backdrop-blur-sm text-white shadow-lg">
            {item.weightKg}kg
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
          )}
        </div>

        {/* Size Info */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Size {item.size}</span>
          </div>
          <div className="flex items-center gap-1 text-blue-700 font-bold text-xs sm:text-sm">
            <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{pointsCost.toLocaleString()} pts</span>
          </div>
        </div>

        {/* Claim Section */}
        {!showClaimForm ? (
          <button
            onClick={() => setShowClaimForm(true)}
            className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg sm:transform sm:hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Claim This Item
          </button>
        ) : (
          <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={claiming}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
            />

            {error && (
              <div className="flex items-center gap-2 p-2.5 sm:p-3 bg-red-50 border border-red-200 rounded-lg animate-in fade-in slide-in-from-top-1">
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs sm:text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleClaim}
                disabled={claiming}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
              >
                {claiming ? (
                  <>
                    <svg className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="hidden sm:inline">Claiming...</span>
                    <span className="sm:hidden">...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Confirm
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowClaimForm(false);
                  setError('');
                  setName('');
                }}
                disabled={claiming}
                className="px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 hover:border-gray-300 active:scale-95 text-gray-700 font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
