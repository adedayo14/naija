import { NextResponse } from 'next/server';
import { kv } from '@/lib/kv';
import { ShippingConfig, DEFAULT_SHIPPING_CONFIG } from '@/types';

export async function GET() {
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
