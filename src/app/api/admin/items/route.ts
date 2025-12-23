import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@/lib/kv';
import { checkAdminSecret } from '@/lib/adminAuth';
import { Item, Category, DEFAULT_WEIGHTS } from '@/types';

export async function GET(req: NextRequest) {
  if (!checkAdminSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const raw = await kv.hgetall('items');

    if (!raw) {
      return NextResponse.json([]);
    }

    // Convert hash to array of items
    const items: Item[] = Object.values(raw).map(itemStr => {
      return typeof itemStr === 'string' ? JSON.parse(itemStr) : itemStr;
    });

    // Sort by createdAt descending (newest first)
    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!checkAdminSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, size, category, imagePath, weightKg } = body;

    // Validate required fields
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    if (!size || typeof size !== 'string' || size.trim().length === 0) {
      return NextResponse.json({ error: 'Size is required' }, { status: 400 });
    }

    if (!category || !['tshirt', 'shirt', 'trousers', 'shoes', 'other'].includes(category)) {
      return NextResponse.json({ error: 'Valid category is required' }, { status: 400 });
    }

    if (!imagePath || typeof imagePath !== 'string' || imagePath.trim().length === 0) {
      return NextResponse.json({ error: 'Image path is required' }, { status: 400 });
    }

    // Use provided weight or default for category
    const weight = weightKg && typeof weightKg === 'number' && weightKg > 0
      ? weightKg
      : DEFAULT_WEIGHTS[category as Category];

    // Generate ID and create item
    const id = `item-${Date.now()}`;
    const item: Item = {
      id,
      title: title.trim(),
      description: description?.trim(),
      size: size.trim(),
      category: category as Category,
      imagePath: imagePath.trim(),
      weightKg: weight,
      createdAt: new Date().toISOString(),
      claimedBy: undefined,
      claimedAt: undefined,
    };

    // Save to KV
    await kv.hset('items', { [id]: JSON.stringify(item) });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
