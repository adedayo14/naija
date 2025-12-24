export type Category = 'tshirt' | 'shirt' | 'trousers' | 'jeans' | 'cardigan' | 'jacket' | 'shoes' | 'other';

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
  jacket: number;
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
  jacket: 0.60,
  shoes: 0.90,
  other: 0.40,
};

// Default points cost per category (based on £5.50/kg shipping)
export const DEFAULT_SHIPPING_CONFIG: ShippingConfig = {
  tshirt: 200,    // 0.20kg = £1.10
  shirt: 300,     // 0.30kg = £1.65
  trousers: 450,  // 0.50kg = £2.75
  jeans: 600,     // 0.55kg = £3.30
  cardigan: 400,  // 0.35kg = £1.93
  jacket: 650,    // 0.60kg = £3.30
  shoes: 900,     // 0.90kg = £4.95
  other: 500,     // 0.40kg = £2.20
};

// Points budget per user
export const POINTS_BUDGET = 5000;
