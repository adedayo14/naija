# Naija Closet Giveaway

A Next.js app for sharing clothing/shoe inventory. Guests can browse/filter items, see shipping costs, and claim pieces. An admin view (password protected) lets you manage items and configure shipping prices.

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript**
- **Tailwind CSS** for styling
- **Vercel KV** for data persistence (items, claims, shipping config)
- **Deployed on Vercel**

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Admin secret for managing items
ADMIN_SECRET="your-secure-admin-password"

# Vercel KV credentials
# These will be automatically provided when you add Vercel KV to your project
KV_URL="your-kv-url"
KV_REST_API_URL="your-kv-rest-api-url"
KV_REST_API_TOKEN="your-kv-rest-api-token"
KV_REST_API_READ_ONLY_TOKEN="your-kv-rest-api-read-only-token"
```

### 3. Run locally

```bash
npm run dev
```

Visit:
- `http://localhost:3000` - Public catalog page
- `http://localhost:3000/admin` - Admin dashboard

## Deploying to Vercel

### 1. Add Vercel KV Storage

1. In your Vercel project dashboard, go to **Storage** tab
2. Click **Create Database** and select **KV**
3. Create the database - environment variables will be automatically added to your project

### 2. Set Environment Variables

In Vercel project settings, add:

```
ADMIN_SECRET=your-secure-admin-password
```

(KV credentials are auto-added when you create the KV database)

### 3. Deploy

```bash
vercel deploy
```

Or push to your connected Git repository for automatic deployment.

## How It Works

### Public Page (`/`)

- Displays all unclaimed items
- Filter by category (t-shirt, shirt, trousers, shoes, other)
- Filter by size (text search)
- Sort by name or weight
- Claim items with your name
- See claimed items panel with total shipping estimate

### Admin Page (`/admin`)

- **Login**: Password-based authentication (stored in localStorage)
- **Shipping Settings**: Configure shipping prices per category (£)
- **Item Management**:
  - Create items with title, description, size, category, image path, weight
  - View all items with filter (all/unclaimed/claimed)
  - See who claimed what and when
  - Delete items
- **Claims Overview**: See total items claimed, weight, and shipping cost

## Data Structure

All data is stored in Vercel KV:

### Items Hash (`items`)

Each item is stored as:

```typescript
{
  id: string;              // 'item-1234567890'
  title: string;           // 'Blue Uniqlo T-shirt'
  description?: string;    // Optional description
  size: string;            // 'M', 'UK 10', '32x32', etc.
  category: 'tshirt' | 'shirt' | 'trousers' | 'shoes' | 'other';
  imagePath: string;       // '/items/blue-shirt.jpg'
  weightKg: number;        // 0.25
  createdAt: string;       // ISO date
  claimedBy?: string;      // 'John Doe' (if claimed)
  claimedAt?: string;      // ISO date (if claimed)
}
```

### Shipping Config (`shipping:config`)

```typescript
{
  tshirt: 1.0,    // £1.00
  shirt: 1.0,
  trousers: 1.5,
  shoes: 2.0,
  other: 1.0
}
```

## Image Management

Images are stored in `/public/items/` directory:

1. Add images to `/public/items/` folder manually
2. In admin, enter the path like `/items/blue-shirt-m.jpg`
3. Redeploy to include new images

For dynamic uploads, consider:
- Vercel Blob Storage
- Cloudinary
- Supabase Storage

## API Routes

### Public

- `POST /api/claim` - Claim an item
- `GET /api/shipping` - Get shipping config

### Admin (require `x-admin-secret` header)

- `GET /api/admin/items` - List all items
- `POST /api/admin/items` - Create item
- `PATCH /api/admin/items/[id]` - Update item
- `DELETE /api/admin/items/[id]` - Delete item
- `GET /api/admin/shipping` - Get shipping config
- `POST /api/admin/shipping` - Update shipping config

## File Structure

```
src/
├── app/
│   ├── page.tsx                           # Public catalog page
│   ├── admin/
│   │   └── page.tsx                       # Admin dashboard
│   └── api/
│       ├── claim/route.ts                 # Claim API
│       ├── shipping/route.ts              # Public shipping config
│       └── admin/
│           ├── shipping/route.ts          # Admin shipping config
│           └── items/
│               ├── route.ts               # List/create items
│               └── [id]/route.ts          # Update/delete item
├── components/
│   ├── ItemsBrowser.tsx                   # Main catalog component
│   ├── ItemCard.tsx                       # Individual item card
│   ├── FiltersBar.tsx                     # Category/size filters
│   └── ClaimedItemsPanel.tsx              # User's claimed items
├── lib/
│   ├── kv.ts                              # Vercel KV instance
│   └── adminAuth.ts                       # Admin authentication
└── types.ts                               # TypeScript types

public/
└── items/                                  # Static item images
    └── [your-images].jpg
```

## Next Steps

- Add email/phone capture on claim
- Implement bulk item import (CSV)
- Add item edit functionality in admin
- Create "share my picks" feature
- Add analytics/tracking
- Implement image upload from admin panel
