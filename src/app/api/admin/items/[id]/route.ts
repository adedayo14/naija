import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@/lib/kv';
import { checkAdminSecret } from '@/lib/adminAuth';
import { Item, Category, DEFAULT_WEIGHTS } from '@/types';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    // Load existing item
    const raw = await kv.hget('items', id);

    if (!raw) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    const item: Item = typeof raw === 'string' ? JSON.parse(raw) : raw;

    // Merge allowed fields
    if (body.title !== undefined) {
      if (typeof body.title !== 'string' || body.title.trim().length === 0) {
        return NextResponse.json({ error: 'Title must be a non-empty string' }, { status: 400 });
      }
      item.title = body.title.trim();
    }

    if (body.description !== undefined) {
      item.description = typeof body.description === 'string' ? body.description.trim() : undefined;
    }

    if (body.size !== undefined) {
      if (typeof body.size !== 'string' || body.size.trim().length === 0) {
        return NextResponse.json({ error: 'Size must be a non-empty string' }, { status: 400 });
      }
      item.size = body.size.trim();
    }

    if (body.category !== undefined) {
      if (!['tshirt', 'shirt', 'trousers', 'shoes', 'other'].includes(body.category)) {
        return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
      }
      item.category = body.category as Category;
    }

    if (body.imagePath !== undefined) {
      if (typeof body.imagePath !== 'string' || body.imagePath.trim().length === 0) {
        return NextResponse.json({ error: 'Image path must be a non-empty string' }, { status: 400 });
      }
      item.imagePath = body.imagePath.trim();
    }

    if (body.weightKg !== undefined) {
      if (typeof body.weightKg !== 'number' || body.weightKg <= 0) {
        return NextResponse.json({ error: 'Weight must be a positive number' }, { status: 400 });
      }
      item.weightKg = body.weightKg;
    }

    // Save back to KV
    await kv.hset('items', { [id]: JSON.stringify(item) });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;

    // Check if item exists
    const raw = await kv.hget('items', id);

    if (!raw) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Delete from KV
    await kv.hdel('items', id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
