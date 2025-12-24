import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@/lib/kv';
import { checkAdminSecret } from '@/lib/adminAuth';
import { Item } from '@/types';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;

    // Load existing item
    const raw = await kv.hget('items', id);

    if (!raw) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    const item: Item = typeof raw === 'string' ? JSON.parse(raw) : raw;

    // Check if item is claimed
    if (!item.claimedBy) {
      return NextResponse.json({ error: 'Item is not claimed' }, { status: 400 });
    }

    // Unclaim the item
    item.claimedBy = undefined;
    item.claimedAt = undefined;

    // Save back to KV
    await kv.hset('items', { [id]: JSON.stringify(item) });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error unclaiming item:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
