import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@/lib/kv';
import { checkAdminSecret } from '@/lib/adminAuth';
import { ShippingConfig, DEFAULT_SHIPPING_CONFIG } from '@/types';

export async function GET(req: NextRequest) {
  if (!checkAdminSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const raw = await kv.get('shipping:config');

    if (!raw) {
      return NextResponse.json(DEFAULT_SHIPPING_CONFIG);
    }

    const config: ShippingConfig = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error fetching shipping config:', error);
    return NextResponse.json(DEFAULT_SHIPPING_CONFIG);
  }
}

export async function POST(req: NextRequest) {
  if (!checkAdminSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Validate the payload matches ShippingConfig structure
    const categories = ['tshirt', 'shirt', 'trousers', 'jeans', 'cardigan', 'shoes', 'other'];
    for (const category of categories) {
      if (typeof body[category] !== 'number' || body[category] < 0) {
        return NextResponse.json({
          error: `Invalid value for ${category}: must be a non-negative number`
        }, { status: 400 });
      }
    }

    const config: ShippingConfig = {
      tshirt: body.tshirt,
      shirt: body.shirt,
      trousers: body.trousers,
      jeans: body.jeans,
      cardigan: body.cardigan,
      shoes: body.shoes,
      other: body.other,
    };

    await kv.set('shipping:config', JSON.stringify(config));

    return NextResponse.json({ success: true, config });
  } catch (error) {
    console.error('Error saving shipping config:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
