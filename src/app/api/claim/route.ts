import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@/lib/kv';
import { Item } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { itemId, name } = body;

    // Validate name
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const trimmedName = name.trim();
    if (trimmedName.length === 0 || trimmedName.length > 64) {
      return NextResponse.json({ error: 'Name must be between 1 and 64 characters' }, { status: 400 });
    }

    // Load the item from KV
    const raw = await kv.hget('items', itemId);

    if (!raw) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Parse the item
    const item: Item = typeof raw === 'string' ? JSON.parse(raw) : raw;

    // Check if already claimed
    if (item.claimedBy) {
      return NextResponse.json({ error: 'already_claimed' }, { status: 409 });
    }

    // Update the item
    item.claimedBy = trimmedName;
    item.claimedAt = new Date().toISOString();

    // Save back to KV
    await kv.hset('items', { [itemId]: JSON.stringify(item) });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error claiming item:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
