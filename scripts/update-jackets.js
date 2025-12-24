const { kv } = require('@vercel/kv');

async function updateJackets() {
  console.log('Fetching all items...');
  const itemsRaw = await kv.hgetall('items');
  
  if (!itemsRaw) {
    console.log('No items found');
    return;
  }

  const items = Object.entries(itemsRaw).map(([id, data]) => ({
    id,
    ...JSON.parse(data)
  }));

  console.log(`Total items: ${items.length}`);

  // Find American Apparel jackets
  const jackets = items.filter(item => 
    item.title.toLowerCase().includes('american apparel') && 
    (item.category === 'other' || item.title.toLowerCase().includes('jacket'))
  );

  console.log(`Found ${jackets.length} American Apparel jacket items`);

  for (const item of jackets) {
    console.log(`\nUpdating: ${item.title}`);
    console.log(`  Old category: ${item.category}`);
    console.log(`  Old weight: ${item.weightKg}kg`);

    // Update to jacket category and add "Lightweight" if not present
    item.category = 'jacket';
    if (!item.title.toLowerCase().includes('lightweight')) {
      // Insert "Lightweight" before "Jacket"
      item.title = item.title.replace(/Jacket/i, 'Lightweight Jacket');
    }

    await kv.hset('items', {
      [item.id]: JSON.stringify(item)
    });

    console.log(`  New title: ${item.title}`);
    console.log(`  New category: ${item.category}`);
    console.log(`  ✓ Updated`);
  }

  console.log(`\n✅ Migration complete! Updated ${jackets.length} items.`);
}

updateJackets().catch(console.error);
