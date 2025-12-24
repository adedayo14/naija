const items = [
  // Abercrombie & Fitch
  { title: "Abercrombie & Fitch Polo Shirt", description: "Classic polo shirt", size: "M", category: "shirt", imagePath: "/items/Abercrombie and fitch polo1.jpg", weightKg: 0.30 },
  { title: "Abercrombie & Fitch Polo Shirt 3", description: "Classic polo shirt", size: "M", category: "shirt", imagePath: "/items/abercrombie and fitch polo 3.jpg", weightKg: 0.30 },

  // Acne Studios
  { title: "Acne Studios Trouser", description: "Designer trousers", size: "34", category: "trousers", imagePath: "/items/Acne studios trouser.jpg", weightKg: 0.50 },

  // American Apparel
  { title: "American Apparel Trouser", description: "Casual trousers", size: "34", category: "trousers", imagePath: "/items/American Apparel Trouser 1.jpg", weightKg: 0.50 },
  { title: "American Apparel Jumper", description: "Comfortable jumper", size: "M", category: "shirt", imagePath: "/items/American Apparel jumper.jpg", weightKg: 0.40 },
  { title: "American Apparel Shirt", description: "Casual shirt", size: "M", category: "shirt", imagePath: "/items/American Apparel shirt 1.jpg", weightKg: 0.30 },
  { title: "American Apparel Sesame Street Tee", description: "Graphic t-shirt", size: "M", category: "tshirt", imagePath: "/items/american appareal sesame street.jpg", weightKg: 0.20 },
  { title: "American Apparel Check Shirt", description: "Checked pattern shirt", size: "M", category: "shirt", imagePath: "/items/american apparel check shirt.jpg", weightKg: 0.30 },
  { title: "American Apparel Chinos", description: "Chino trousers", size: "34", category: "trousers", imagePath: "/items/american apparel chinos trousers.jpg", weightKg: 0.50 },
  { title: "American Apparel Jacket", description: "Casual jacket", size: "M", category: "other", imagePath: "/items/american apparel jacket.jpg", weightKg: 0.60 },
  { title: "American Apparel Lightweight Jacket", description: "Light jacket", size: "M", category: "other", imagePath: "/items/american apparel lightweight jacket.jpg", weightKg: 0.50 },
  { title: "American Apparel Polo", description: "Classic polo", size: "M", category: "shirt", imagePath: "/items/amwrican apparel polo.jpg", weightKg: 0.30 },
  { title: "American Apparel Polo 2", description: "Classic polo", size: "M", category: "shirt", imagePath: "/items/american apparel polo 2.jpg", weightKg: 0.30 },
  { title: "American Apparel Shirt 2", description: "Casual shirt", size: "M", category: "shirt", imagePath: "/items/american apparel shiirt 2.jpg", weightKg: 0.30 },
  { title: "American Apparel Shirt 7", description: "Casual shirt", size: "M", category: "shirt", imagePath: "/items/american apparel shirt 7.jpg", weightKg: 0.30 },
  { title: "American Apparel Shorts", description: "Casual shorts", size: "M", category: "trousers", imagePath: "/items/american apparel short 3.jpg", weightKg: 0.30 },
  { title: "American Apparel Shorts 2", description: "Casual shorts", size: "M", category: "trousers", imagePath: "/items/american apparel shorts 2.jpg", weightKg: 0.30 },
  { title: "American Apparel T-Shirt", description: "Classic tee", size: "M", category: "tshirt", imagePath: "/items/american apparel t shirt 3.jpg", weightKg: 0.20 },
  { title: "American Apparel Striped Trousers", description: "Striped pattern", size: "34", category: "trousers", imagePath: "/items/american apparel trousers stripe .jpg", weightKg: 0.50 },
  { title: "American Apparel V-Neck", description: "V-neck shirt", size: "M", category: "tshirt", imagePath: "/items/american apparel vneck.jpg", weightKg: 0.20 },
  { title: "American Apparel Jumper 2", description: "Comfortable jumper", size: "M", category: "shirt", imagePath: "/items/anmerican apparel jumper.jpg", weightKg: 0.40 },

  // ASOS
  { title: "ASOS Polo", description: "Modern polo shirt", size: "M", category: "shirt", imagePath: "/items/asos polo.jpg", weightKg: 0.30 },

  // Burton
  { title: "Burton Shirt", description: "Casual shirt", size: "M", category: "shirt", imagePath: "/items/burton shirt.jpg", weightKg: 0.30 },
  { title: "Burton Shorts", description: "Casual shorts", size: "M", category: "trousers", imagePath: "/items/shorts burton.jpg", weightKg: 0.30 },

  // Canterbury
  { title: "Canterbury Polo", description: "Sport polo", size: "M", category: "shirt", imagePath: "/items/cantenbury polo 1.jpg", weightKg: 0.30 },
  { title: "Canterbury Polo 4", description: "Sport polo", size: "M", category: "shirt", imagePath: "/items/canterbury polo 4.jpg", weightKg: 0.30 },

  // Charles Tyrwhitt
  { title: "Charles Tyrwhitt Shirt", description: "Formal shirt", size: "16.5 L", category: "shirt", imagePath: "/items/charles tyhwhitt shirt 1.jpg", weightKg: 0.30 },
  { title: "Charles Tyrwhitt Shirt 2", description: "Formal shirt", size: "16.5 L", category: "shirt", imagePath: "/items/charles tyhwhitt shirt 2.jpg", weightKg: 0.30 },
  { title: "Charles Tyrwhitt Shirt 3", description: "Formal shirt", size: "16.5 L", category: "shirt", imagePath: "/items/charles tyhwhitt shirt 3.jpg", weightKg: 0.30 },

  // COS
  { title: "COS Shirt", description: "Minimalist design", size: "M", category: "shirt", imagePath: "/items/COS shirt M.jpg", weightKg: 0.30 },

  // Fat Face
  { title: "Fat Face Cargo Pants", description: "Cargo style pants", size: "34", category: "trousers", imagePath: "/items/cargo pants Fat face.jpg", weightKg: 0.50 },
  { title: "Fat Face Jeans", description: "Classic jeans", size: "34", category: "trousers", imagePath: "/items/fat face jeans size 34 W.jpg", weightKg: 0.60 },
  { title: "Fat Face Hoodie", description: "Comfortable hoodie", size: "M", category: "other", imagePath: "/items/fatface hoody.jpg", weightKg: 0.50 },
  { title: "Fat Face Joggers", description: "Casual joggers", size: "34", category: "trousers", imagePath: "/items/fatface joggers.jpg", weightKg: 0.40 },
  { title: "Fat Face Jumper", description: "Cozy jumper", size: "M", category: "shirt", imagePath: "/items/fatface jumper 1.jpg", weightKg: 0.40 },
  { title: "Fat Face Shirt", description: "Casual shirt", size: "M", category: "shirt", imagePath: "/items/fatface shirt 1.jpg", weightKg: 0.30 },
  { title: "Fat Face Track Bottoms", description: "Sport trousers", size: "34", category: "trousers", imagePath: "/items/fatface track bottoms.jpg", weightKg: 0.40 },
  { title: "Fat Face T-Shirt", description: "Casual tee", size: "M", category: "tshirt", imagePath: "/items/fatface tshiort 21.jpg", weightKg: 0.20 },
  { title: "Fat Face T-Shirt 2", description: "Casual tee", size: "M", category: "tshirt", imagePath: "/items/fatface tshirt.jpg", weightKg: 0.20 },

  // Hollister
  { title: "Hollister Polo", description: "Classic polo", size: "M", category: "shirt", imagePath: "/items/hollister polo 3.jpg", weightKg: 0.30 },
  { title: "Hollister T-Shirt", description: "Casual tee", size: "M", category: "tshirt", imagePath: "/items/hollister t short 5.jpg", weightKg: 0.20 },

  // Humour
  { title: "Humour Shorts", description: "Casual shorts", size: "M", category: "trousers", imagePath: "/items/humour shorts.jpg", weightKg: 0.30 },

  // Jack Wills
  { title: "Jack Wills Casual Shirt", description: "Casual shirt", size: "M", category: "shirt", imagePath: "/items/jack wills causal shirt.jpg", weightKg: 0.30 },
  { title: "Jack Wills Denim Overshirt", description: "Denim overshirt", size: "M", category: "shirt", imagePath: "/items/jack wills demin  overshirt.jpg", weightKg: 0.50 },
  { title: "Jack Wills Jeans", description: "Classic jeans", size: "34", category: "trousers", imagePath: "/items/jack wills jeans .jpg", weightKg: 0.60 },
  { title: "Jack Wills Jeans 1", description: "Classic jeans", size: "34", category: "trousers", imagePath: "/items/jack wills jeans 1.jpg", weightKg: 0.60 },
  { title: "Jack Wills Jeans 2", description: "Classic jeans", size: "34", category: "trousers", imagePath: "/items/jack wills jeans 2.jpg", weightKg: 0.60 },
  { title: "Jack Wills Jeans 3", description: "Classic jeans", size: "34", category: "trousers", imagePath: "/items/jack wills leans 3.jpg", weightKg: 0.60 },
  { title: "Jack Wills Jeans 4", description: "Classic jeans", size: "34", category: "trousers", imagePath: "/items/jack wills jeans 4.jpg", weightKg: 0.60 },
  { title: "Jack Wills Jeans 11", description: "Classic jeans", size: "34", category: "trousers", imagePath: "/items/jack wills jeans 11.jpg", weightKg: 0.60 },
  { title: "Jack Wills Jumper", description: "Cozy jumper", size: "M", category: "shirt", imagePath: "/items/jack wills jumper.jpg", weightKg: 0.40 },
  { title: "Jack Wills Polo", description: "Classic polo", size: "M", category: "shirt", imagePath: "/items/JW polo1.jpg", weightKg: 0.30 },
  { title: "Jack Wills Polo 3", description: "Classic polo", size: "M", category: "shirt", imagePath: "/items/jack wills polo 3.jpg", weightKg: 0.30 },
  { title: "Jack Wills Polo 3 Alt", description: "Classic polo", size: "M", category: "shirt", imagePath: "/items/jackwills polo 3.jpg", weightKg: 0.30 },
  { title: "Jack Wills Shirt", description: "Casual shirt", size: "M", category: "shirt", imagePath: "/items/jack wills shirt 1.jpg", weightKg: 0.30 },
  { title: "Jack Wills Trouser", description: "Smart trousers", size: "34", category: "trousers", imagePath: "/items/jack wills trouser 1.jpg", weightKg: 0.50 },
  { title: "Jack Wills Trouser 5", description: "Smart trousers", size: "34", category: "trousers", imagePath: "/items/jack wills trouser 5.jpg", weightKg: 0.50 },

  // Jeans (Generic)
  { title: "Jeans", description: "Classic jeans", size: "34", category: "trousers", imagePath: "/items/jeans.jpg", weightKg: 0.60 },
  { title: "Jeans 11", description: "Classic jeans", size: "34", category: "trousers", imagePath: "/items/jeans 11.jpg", weightKg: 0.60 },
  { title: "Skinny Jeans", description: "Slim fit jeans", size: "34", category: "trousers", imagePath: "/items/skinny jeans.jpg", weightKg: 0.50 },

  // L.O.G.G
  { title: "L.O.G.G Jumper", description: "Casual jumper", size: "M", category: "shirt", imagePath: "/items/LOgg Jumper.jpg", weightKg: 0.40 },

  // Monsoon
  { title: "Monsoon Cardigan", description: "Stylish cardigan", size: "M", category: "other", imagePath: "/items/monsoon cardigan.jpg", weightKg: 0.40 },

  // Nike
  { title: "Nike Sport T-Shirt", description: "Athletic tee", size: "M", category: "tshirt", imagePath: "/items/nike sport t short.jpg", weightKg: 0.20 },

  // Polo Ralph Lauren
  { title: "Polo Ralph Lauren Jeans", description: "Designer jeans", size: "34", category: "trousers", imagePath: "/items/polo raplh lauren jeans.jpg", weightKg: 0.60 },

  // Shannon
  { title: "Shannon T-Shirt", description: "Graphic tee", size: "M", category: "tshirt", imagePath: "/items/shannon t shirt.jpg", weightKg: 0.20 },

  // Sleeveless
  { title: "Sleeveless Hoodie", description: "Athletic hoodie", size: "M", category: "other", imagePath: "/items/sleeveless hoodie.jpg", weightKg: 0.30 },

  // TM Lewin
  { title: "TM Lewin Shirt", description: "Formal shirt", size: "16.5 L", category: "shirt", imagePath: "/items/tm lewin JF shirt 16.5 L.jpg", weightKg: 0.30 },
  { title: "TM Lewin Shirt 2", description: "Formal shirt", size: "16.5 L", category: "shirt", imagePath: "/items/tm lewin shirt 16.5 L.jpg", weightKg: 0.30 },
  { title: "TM Lewin Shirt 3", description: "Formal shirt", size: "16.5 L", category: "shirt", imagePath: "/items/tm lewin shirt 2 16.5 L.jpg", weightKg: 0.30 },
  { title: "TM Lewin Shirt 4", description: "Formal shirt", size: "16.5 L", category: "shirt", imagePath: "/items/tm lewin short 16.5 Large.jpg", weightKg: 0.30 },

  // Generic Items
  { title: "Trouser", description: "Classic trousers", size: "34", category: "trousers", imagePath: "/items/Trouser.jpg", weightKg: 0.50 },
  { title: "Trouser 4", description: "Smart trousers", size: "34", category: "trousers", imagePath: "/items/trouser 4.jpg", weightKg: 0.50 },
  { title: "Unlimited Trouser", description: "Casual trousers", size: "34", category: "trousers", imagePath: "/items/unlimited trouser .jpg", weightKg: 0.50 },
  { title: "Water Repellent Transparent Trouser", description: "Technical trousers", size: "34", category: "trousers", imagePath: "/items/water repellent transparent trouser.jpg", weightKg: 0.50 },
  { title: "Shirt 8", description: "Casual shirt", size: "M", category: "shirt", imagePath: "/items/shirt 8.jpg", weightKg: 0.30 },
  { title: "T-Shirt", description: "Classic tee", size: "M", category: "tshirt", imagePath: "/items/t hisrt 1.jpg", weightKg: 0.20 },
  { title: "T-Shirt 2", description: "Classic tee", size: "M", category: "tshirt", imagePath: "/items/t shirt 2.jpg", weightKg: 0.20 },
  { title: "T-Shirt 10", description: "Classic tee", size: "M", category: "tshirt", imagePath: "/items/t shirt 10.jpg", weightKg: 0.20 },

  // Unsung Hero
  { title: "Unsung Hero Cardigan", description: "Stylish cardigan", size: "M", category: "other", imagePath: "/items/unsung hero cardi.jpg", weightKg: 0.40 },
];

async function addItems() {
  const adminSecret = process.env.ADMIN_SECRET || 'admin123';
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  console.log(`Adding ${items.length} items to ${baseUrl}...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const item of items) {
    try {
      const response = await fetch(`${baseUrl}/api/admin/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': adminSecret,
        },
        body: JSON.stringify(item),
      });

      const data = await response.json();

      if (response.ok) {
        successCount++;
        console.log(`✓ Added: ${item.title}`);
      } else {
        errorCount++;
        console.log(`✗ Failed: ${item.title} - ${data.error}`);
      }
    } catch (error) {
      errorCount++;
      console.log(`✗ Failed: ${item.title} - ${error.message}`);
    }
  }

  console.log(`\nCompleted: ${successCount} successful, ${errorCount} failed`);
}

addItems();
