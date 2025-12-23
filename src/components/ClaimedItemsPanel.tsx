'use client';

import { Item, ShippingConfig } from '@/types';

interface ClaimedItemsPanelProps {
  claimedItems: Item[];
  shippingConfig: ShippingConfig | null;
}

export default function ClaimedItemsPanel({ claimedItems, shippingConfig }: ClaimedItemsPanelProps) {
  if (claimedItems.length === 0) {
    return null;
  }

  const totalWeight = claimedItems.reduce((sum, item) => sum + item.weightKg, 0);
  const totalShipping = shippingConfig
    ? claimedItems.reduce((sum, item) => sum + shippingConfig[item.category], 0)
    : 0;

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-green-900 mb-4">Your Claimed Items</h2>

      <div className="space-y-3 mb-4">
        {claimedItems.map((item) => (
          <div key={item.id} className="bg-white p-3 rounded border">
            <div className="font-semibold">{item.title}</div>
            <div className="text-sm text-gray-600 flex gap-3 mt-1">
              <span>Size: {item.size}</span>
              <span className="capitalize">{item.category}</span>
              <span>{item.weightKg}kg</span>
              {shippingConfig && (
                <span>Shipping: £{shippingConfig[item.category].toFixed(2)}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-green-300 pt-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Total Weight:</span>
          <span>{totalWeight.toFixed(2)}kg</span>
        </div>
        {shippingConfig && (
          <div className="flex justify-between text-lg font-bold text-green-900">
            <span>Estimated Shipping:</span>
            <span>£{totalShipping.toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
