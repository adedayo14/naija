const API_URL = "https://naija-five.vercel.app/api/admin/items";
const ADMIN_SECRET = "admin123";

// Mapping of old titles to new titles and categories
const updates = {
  // Jeans - remove numbers and update category
  "Jack Wills Jeans 1": { title: "Jack Wills Jeans", category: "jeans" },
  "Jack Wills Jeans 2": { title: "Jack Wills Jeans", category: "jeans" },
  "Jack Wills Jeans 3": { title: "Jack Wills Jeans", category: "jeans" },
  "Jack Wills Jeans 4": { title: "Jack Wills Jeans", category: "jeans" },
  "Jack Wills Jeans 11": { title: "Jack Wills Jeans", category: "jeans" },
  "Jack Wills Jeans": { category: "jeans" },
  "Fat Face Jeans": { category: "jeans" },
  "Polo Ralph Lauren Jeans": { category: "jeans" },
  "Jeans": { category: "jeans" },
  "Jeans 11": { title: "Jeans", category: "jeans" },
  "Skinny Jeans": { category: "jeans" },

  // Cardigans - update category
  "Monsoon Cardigan": { category: "cardigan" },
  "Unsung Hero Cardigan": { category: "cardigan" },

  // Remove numbers from other items
  "Abercrombie & Fitch Polo Shirt 3": { title: "Abercrombie & Fitch Polo Shirt" },
  "American Apparel Jumper 2": { title: "American Apparel Jumper" },
  "American Apparel Polo 2": { title: "American Apparel Polo" },
  "American Apparel Shirt 2": { title: "American Apparel Shirt" },
  "American Apparel Shirt 7": { title: "American Apparel Shirt" },
  "American Apparel Shorts 2": { title: "American Apparel Shorts" },
  "Fat Face T-Shirt 2": { title: "Fat Face T-Shirt" },
  "Charles Tyrwhitt Shirt 2": { title: "Charles Tyrwhitt Shirt" },
  "Charles Tyrwhitt Shirt 3": { title: "Charles Tyrwhitt Shirt" },
  "Canterbury Polo 4": { title: "Canterbury Polo" },
  "Jack Wills Polo 3": { title: "Jack Wills Polo" },
  "Jack Wills Polo 3 Alt": { title: "Jack Wills Polo" },
  "Jack Wills Trouser 5": { title: "Jack Wills Trouser" },
  "T-Shirt 2": { title: "T-Shirt" },
  "T-Shirt 10": { title: "T-Shirt" },
  "TM Lewin Shirt 2": { title: "TM Lewin Shirt" },
  "TM Lewin Shirt 3": { title: "TM Lewin Shirt" },
  "TM Lewin Shirt 4": { title: "TM Lewin Shirt" },
  "Trouser 4": { title: "Trouser" },

  // Better descriptive names based on common types
  "Shirt 8": { title: "Shirt" },
  "Jack Wills Denim Overshirt": { title: "Jack Wills Overshirt" },
};

async function updateItem(itemId, updates) {
  const response = await fetch(`${API_URL}/${itemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-secret': ADMIN_SECRET,
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to update ${itemId}: ${error.error || response.statusText}`);
  }

  return response.json();
}

async function main() {
  // Fetch all items
  const response = await fetch(API_URL, {
    headers: { 'x-admin-secret': ADMIN_SECRET },
  });

  const items = await response.json();
  console.log(`Found ${items.length} items\n`);

  let updateCount = 0;

  for (const item of items) {
    const update = updates[item.title];

    if (update) {
      console.log(`Updating: ${item.title}`);

      const changes = {};
      if (update.title) changes.title = update.title;
      if (update.category) changes.category = update.category;

      try {
        await updateItem(item.id, changes);
        console.log(`  ✓ Updated to: ${update.title || item.title}${update.category ? ` (category: ${update.category})` : ''}`);
        updateCount++;
      } catch (error) {
        console.log(`  ✗ Error: ${error.message}`);
      }
    }
  }

  console.log(`\nUpdated ${updateCount} items`);
}

main().catch(console.error);
