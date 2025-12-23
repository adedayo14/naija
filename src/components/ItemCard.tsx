'use client';

import { Item } from '@/types';
import { useState } from 'react';

interface ItemCardProps {
  item: Item;
  onClaim: (itemId: string, name: string) => Promise<{ success: boolean; error?: string }>;
}

export default function ItemCard({ item, onClaim }: ItemCardProps) {
  const [name, setName] = useState('');
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState('');

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
    // On success, the parent component will remove this card from the list
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-3">
      <div className="aspect-square w-full bg-gray-100 rounded overflow-hidden">
        <img
          src={item.imagePath}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div>
        <h3 className="font-semibold text-lg">{item.title}</h3>
        {item.description && (
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        )}
      </div>

      <div className="flex gap-2 text-sm text-gray-700">
        <span className="bg-gray-100 px-2 py-1 rounded">Size: {item.size}</span>
        <span className="bg-gray-100 px-2 py-1 rounded capitalize">{item.category}</span>
        <span className="bg-gray-100 px-2 py-1 rounded">{item.weightKg}kg</span>
      </div>

      <div className="mt-2">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-2"
          disabled={claiming}
        />

        {error && (
          <p className="text-red-600 text-sm mb-2">{error}</p>
        )}

        <button
          onClick={handleClaim}
          disabled={claiming}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {claiming ? 'Claiming...' : 'Claim'}
        </button>
      </div>
    </div>
  );
}
