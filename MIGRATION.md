# Migration from Prisma/SQLite to Vercel KV

This document outlines the changes made to migrate from Prisma/SQLite to Vercel KV.

## Summary of Changes

The app has been completely restructured to use Vercel KV instead of Prisma/SQLite, following the exact specifications provided.

## What Was Changed

### 1. Data Storage
- **Removed**: Prisma ORM, SQLite database
- **Added**: Vercel KV for all data persistence
- **Data Structure**:
  - Items stored in hash: `items` (key: itemId, value: JSON-stringified Item)
  - Shipping config stored as string: `shipping:config`

### 2. Authentication
- **Removed**: Cookie-based admin authentication
- **Added**: Header-based authentication using `x-admin-secret`
- Admin password stored in `localStorage` on client
- All admin API routes check `x-admin-secret` header

### 3. Architecture Changes
- **Removed**: Server Actions (`actions.ts`)
- **Added**: RESTful API routes under `/api/`
- Public page is now a server component that fetches from KV
- Admin page is a client component that calls API routes

### 4. Files Deleted
```
src/app/actions.ts                 # Server actions
src/app/_components/catalog.tsx    # Old catalog component
src/lib/auth.ts                    # Cookie-based auth
src/lib/config.ts                  # Old config helper
src/lib/prisma.ts                  # Prisma client
prisma/schema.prisma               # Database schema
prisma/dev.db                      # SQLite database
```

### 5. Files Created

#### Type Definitions
- `src/types.ts` - All TypeScript types (Item, Category, ShippingConfig, defaults)

#### Library Files
- `src/lib/kv.ts` - Vercel KV instance export
- `src/lib/adminAuth.ts` - Admin secret validation helper

#### API Routes - Public
- `src/app/api/claim/route.ts` - POST endpoint to claim items
- `src/app/api/shipping/route.ts` - GET endpoint for shipping config

#### API Routes - Admin
- `src/app/api/admin/shipping/route.ts` - GET/POST for shipping config
- `src/app/api/admin/items/route.ts` - GET/POST for items list
- `src/app/api/admin/items/[id]/route.ts` - PATCH/DELETE for individual items

#### Components
- `src/components/ItemsBrowser.tsx` - Main catalog component with filters and state
- `src/components/ItemCard.tsx` - Individual item display with claim functionality
- `src/components/FiltersBar.tsx` - Category/size/sort filters
- `src/components/ClaimedItemsPanel.tsx` - Shows user's claimed items with shipping total

#### Pages
- `src/app/page.tsx` - Rewritten public catalog page (server component)
- `src/app/admin/page.tsx` - Rewritten admin dashboard (client component)

### 6. Configuration Changes

#### package.json
- Removed: `@prisma/client`, `prisma`, `zod`
- Added: `@vercel/kv`
- Removed scripts: `db:push`, `db:studio`

#### .env.example
```bash
# Old
DATABASE_URL="file:./prisma/dev.db"
ADMIN_PASSWORD="set-a-strong-password"
SHIPPING_RATE_PER_KG="10"

# New
ADMIN_SECRET="your-secure-admin-password-here"
KV_URL="your-kv-url"
KV_REST_API_URL="your-kv-rest-api-url"
KV_REST_API_TOKEN="your-kv-rest-api-token"
KV_REST_API_READ_ONLY_TOKEN="your-kv-rest-api-read-only-token"
```

## Next Steps for Deployment

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create Vercel KV Database**
   - Go to Vercel dashboard → Storage → Create Database → KV
   - Environment variables will be auto-added

3. **Set Admin Secret**
   - In Vercel project settings, add:
   ```
   ADMIN_SECRET=your-secure-password
   ```

4. **Deploy**
   ```bash
   vercel deploy
   ```

5. **Add Images**
   - Place item images in `/public/items/` directory
   - Reference them in admin as `/items/filename.jpg`
   - Redeploy after adding images

## Data Migration

If you have existing data in SQLite:

1. Export items from SQLite
2. Use admin UI to manually recreate items in KV, OR
3. Write a migration script that:
   - Reads from old database
   - Calls `POST /api/admin/items` for each item
   - Sets shipping config via `POST /api/admin/shipping`

## API Testing

You can test the API routes using curl:

```bash
# Get shipping config (public)
curl http://localhost:3000/api/shipping

# Claim an item (public)
curl -X POST http://localhost:3000/api/claim \
  -H "Content-Type: application/json" \
  -d '{"itemId": "item-123", "name": "John Doe"}'

# Get all items (admin)
curl http://localhost:3000/api/admin/items \
  -H "x-admin-secret: your-password"

# Create item (admin)
curl -X POST http://localhost:3000/api/admin/items \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: your-password" \
  -d '{
    "title": "Blue T-shirt",
    "size": "M",
    "category": "tshirt",
    "imagePath": "/items/blue-tshirt.jpg"
  }'
```

## Features Implemented

✅ Public catalog page with filters and sorting
✅ Claim items with name
✅ Claimed items panel with shipping estimate
✅ Admin authentication via header
✅ Admin can create/delete items
✅ Admin can configure shipping prices per category
✅ Admin can view all claims
✅ Default weights per category
✅ All data in Vercel KV
✅ Images from `/public/items/` folder
✅ TypeScript throughout
✅ Tailwind CSS styling

## Architecture Highlights

- **Server Components**: Public page loads data server-side from KV
- **Client Components**: Admin page and item browser for interactivity
- **API Routes**: RESTful endpoints for all mutations
- **State Management**: React state for filters, claimed items, admin forms
- **Authentication**: Simple header-based with localStorage persistence
- **Type Safety**: Full TypeScript coverage with shared types

## Differences from Original Spec

Minor variations:
- Item ID format uses timestamp: `item-${Date.now()}` instead of `item-001`
- Admin uses localStorage instead of cookies (simpler for header-based auth)
- Shipping config returns defaults if not set (no need for separate initialization)

All core requirements met exactly as specified.
