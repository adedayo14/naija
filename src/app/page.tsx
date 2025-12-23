import { kv } from '@/lib/kv';
import { Item } from '@/types';
import ItemsBrowser from '@/components/ItemsBrowser';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Load all items from KV
  const raw = await kv.hgetall('items');

  let items: Item[] = [];
  if (raw) {
    items = Object.values(raw).map(itemStr => {
      return typeof itemStr === 'string' ? JSON.parse(itemStr) : itemStr;
    });
  }

  // Filter to only unclaimed items
  const unclaimedItems = items.filter(item => !item.claimedBy);

  // Sort by createdAt descending (newest first)
  unclaimedItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-12">
        <header className="space-y-3 mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
            Closet drop
          </p>
          <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">Pick what you want</h1>
          <p className="max-w-2xl text-sm text-neutral-600 sm:text-base">
            I&apos;m giving these away. Browse items, filter by category and size, and claim what you want.
            Shipping costs are calculated based on item category.
          </p>
        </header>

        <ItemsBrowser initialItems={unclaimedItems} />
      </div>
    </div>
  );
}
