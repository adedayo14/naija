'use client';

import { Item, ShippingConfig, POINTS_BUDGET } from '@/types';

interface ClaimedItemsPanelProps {
  claimedItems: Item[];
  shippingConfig: ShippingConfig | null;
}

export default function ClaimedItemsPanel({ claimedItems, shippingConfig }: ClaimedItemsPanelProps) {
  if (claimedItems.length === 0) {
    return null;
  }

  const totalWeight = claimedItems.reduce((sum, item) => sum + item.weightKg, 0);
  const totalPoints = shippingConfig
    ? claimedItems.reduce((sum, item) => sum + shippingConfig[item.category], 0)
    : 0;
  const remainingPoints = POINTS_BUDGET - totalPoints;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-200 shadow-xl mb-8 animate-in slide-in-from-top duration-500">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

      <div className="relative p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-emerald-900">Your Claimed Items</h2>
              <p className="text-sm text-emerald-700 mt-0.5">
                {claimedItems.length} {claimedItems.length === 1 ? 'item' : 'items'} reserved
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-emerald-300 shadow-sm">
            <span className="text-sm font-semibold text-emerald-900">
              🎉 Success!
            </span>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {claimedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={item.imagePath}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 capitalize">
                      {item.category}
                    </span>
                    <span>Size {item.size}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <span className="flex items-center gap-1 text-gray-700 font-medium">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                      {item.weightKg}kg
                    </span>
                    {shippingConfig && (
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {shippingConfig[item.category].toLocaleString()} pts
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
            <div className="text-center sm:text-left">
              <div className="text-emerald-100 text-sm font-medium mb-1">Total Items</div>
              <div className="text-3xl font-bold">{claimedItems.length}</div>
            </div>

            <div className="text-center sm:text-left">
              <div className="text-emerald-100 text-sm font-medium mb-1">Points Used</div>
              <div className="text-3xl font-bold">{totalPoints.toLocaleString()}</div>
            </div>

            {shippingConfig && (
              <div className="text-center sm:text-left">
                <div className="text-emerald-100 text-sm font-medium mb-1">Points Remaining</div>
                <div className={`text-3xl font-bold ${remainingPoints < 0 ? 'text-red-300' : ''}`}>
                  {remainingPoints.toLocaleString()}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-emerald-50 text-sm flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                These items are reserved for you! You have a budget of {POINTS_BUDGET.toLocaleString()} points total.
                {remainingPoints < 0 && ' ⚠️ You have exceeded your points budget.'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
