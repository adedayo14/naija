export type Category = 'tshirt' | 'shirt' | 'trousers' | 'jeans' | 'cardigan' | 'shoes' | 'other';

export interface Item {
  id: string;              // 'item-001' etc
  title: string;           // 'Blue Uniqlo T-shirt'
  description?: string;
  size: string;            // 'M', 'UK 10', '32x32', etc.
  category: Category;
  imagePath: string;       // '/items/uniqlo-blue-tshirt-m.jpg'
  weightKg: number;        // shipping weight
  createdAt: string;       // ISO
  claimedBy?: string;      // undefined if not claimed
  claimedAt?: string;      // undefined if not claimed
}

export type ShippingConfig = {
  tshirt: number;
  shirt: number;
  trousers: number;
  jeans: number;
  cardigan: number;
  shoes: number;
  other: number;
};

// Default weights by category (in kg)
export const DEFAULT_WEIGHTS: Record<Category, number> = {
  tshirt: 0.20,
  shirt: 0.30,
  trousers: 0.50,
  jeans: 0.55,
  cardigan: 0.35,
  shoes: 0.90,
  other: 0.40,
};

// Default points cost per category
export const DEFAULT_SHIPPING_CONFIG: ShippingConfig = {
  tshirt: 1000,
  shirt: 1500,
  trousers: 2000,
  jeans: 2000,
  cardigan: 1500,
  shoes: 2500,
  other: 1200,
};

// Points budget per user
export const POINTS_BUDGET = 20000;
