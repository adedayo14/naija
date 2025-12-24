#!/bin/bash

API_URL="https://naija-phi.vercel.app/api/admin/items"
ADMIN_SECRET="admin123"

# Function to add an item
add_item() {
  local title="$1"
  local desc="$2"
  local size="$3"
  local category="$4"
  local image="$5"
  local weight="$6"

  curl -s -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -H "x-admin-secret: $ADMIN_SECRET" \
    -d "{\"title\":\"$title\",\"description\":\"$desc\",\"size\":\"$size\",\"category\":\"$category\",\"imagePath\":\"$image\",\"weightKg\":$weight}" | jq -r '.id // .error'

  echo "Added: $title"
}

echo "Adding all items..."
echo ""

# Abercrombie & Fitch
add_item "Abercrombie & Fitch Polo Shirt" "Classic polo shirt" "M" "shirt" "/items/Abercrombie and fitch polo1.jpg" 0.30
add_item "Abercrombie & Fitch Polo Shirt 3" "Classic polo shirt" "M" "shirt" "/items/abercrombie and fitch polo 3.jpg" 0.30

# Acne Studios
add_item "Acne Studios Trouser" "Designer trousers" "34" "trousers" "/items/Acne studios trouser.jpg" 0.50

# American Apparel
add_item "American Apparel Trouser" "Casual trousers" "34" "trousers" "/items/American Apparel Trouser 1.jpg" 0.50
add_item "American Apparel Jumper" "Comfortable jumper" "M" "shirt" "/items/American Apparel jumper.jpg" 0.40
add_item "American Apparel Shirt" "Casual shirt" "M" "shirt" "/items/American Apparel shirt 1.jpg" 0.30
add_item "American Apparel Sesame Street Tee" "Graphic t-shirt" "M" "tshirt" "/items/american appareal sesame street.jpg" 0.20
add_item "American Apparel Check Shirt" "Checked pattern shirt" "M" "shirt" "/items/american apparel check shirt.jpg" 0.30
add_item "American Apparel Chinos" "Chino trousers" "34" "trousers" "/items/american apparel chinos trousers.jpg" 0.50
add_item "American Apparel Jacket" "Casual jacket" "M" "other" "/items/american apparel jacket.jpg" 0.60
add_item "American Apparel Lightweight Jacket" "Light jacket" "M" "other" "/items/american apparel lightweight jacket.jpg" 0.50
add_item "American Apparel Polo" "Classic polo" "M" "shirt" "/items/amwrican apparel polo.jpg" 0.30
add_item "American Apparel Polo 2" "Classic polo" "M" "shirt" "/items/american apparel polo 2.jpg" 0.30
add_item "American Apparel Shirt 2" "Casual shirt" "M" "shirt" "/items/american apparel shiirt 2.jpg" 0.30
add_item "American Apparel Shirt 7" "Casual shirt" "M" "shirt" "/items/american apparel shirt 7.jpg" 0.30
add_item "American Apparel Shorts" "Casual shorts" "M" "trousers" "/items/american apparel short 3.jpg" 0.30
add_item "American Apparel Shorts 2" "Casual shorts" "M" "trousers" "/items/american apparel shorts 2.jpg" 0.30
add_item "American Apparel T-Shirt" "Classic tee" "M" "tshirt" "/items/american apparel t shirt 3.jpg" 0.20
add_item "American Apparel Striped Trousers" "Striped pattern" "34" "trousers" "/items/american apparel trousers stripe .jpg" 0.50
add_item "American Apparel V-Neck" "V-neck shirt" "M" "tshirt" "/items/american apparel vneck.jpg" 0.20
add_item "American Apparel Jumper 2" "Comfortable jumper" "M" "shirt" "/items/anmerican apparel jumper.jpg" 0.40

# ASOS
add_item "ASOS Polo" "Modern polo shirt" "M" "shirt" "/items/asos polo.jpg" 0.30

# Burton
add_item "Burton Shirt" "Casual shirt" "M" "shirt" "/items/burton shirt.jpg" 0.30
add_item "Burton Shorts" "Casual shorts" "M" "trousers" "/items/shorts burton.jpg" 0.30

# Canterbury
add_item "Canterbury Polo" "Sport polo" "M" "shirt" "/items/cantenbury polo 1.jpg" 0.30
add_item "Canterbury Polo 4" "Sport polo" "M" "shirt" "/items/canterbury polo 4.jpg" 0.30

# Charles Tyrwhitt
add_item "Charles Tyrwhitt Shirt" "Formal shirt" "16.5 L" "shirt" "/items/charles tyhwhitt shirt 1.jpg" 0.30
add_item "Charles Tyrwhitt Shirt 2" "Formal shirt" "16.5 L" "shirt" "/items/charles tyhwhitt shirt 2.jpg" 0.30
add_item "Charles Tyrwhitt Shirt 3" "Formal shirt" "16.5 L" "shirt" "/items/charles tyhwhitt shirt 3.jpg" 0.30

# COS
add_item "COS Shirt" "Minimalist design" "M" "shirt" "/items/COS shirt M.jpg" 0.30

# Fat Face
add_item "Fat Face Cargo Pants" "Cargo style pants" "34" "trousers" "/items/cargo pants Fat face.jpg" 0.50
add_item "Fat Face Jeans" "Classic jeans" "34" "trousers" "/items/fat face jeans size 34 W.jpg" 0.60
add_item "Fat Face Hoodie" "Comfortable hoodie" "M" "other" "/items/fatface hoody.jpg" 0.50
add_item "Fat Face Joggers" "Casual joggers" "34" "trousers" "/items/fatface joggers.jpg" 0.40
add_item "Fat Face Jumper" "Cozy jumper" "M" "shirt" "/items/fatface jumper 1.jpg" 0.40
add_item "Fat Face Shirt" "Casual shirt" "M" "shirt" "/items/fatface shirt 1.jpg" 0.30
add_item "Fat Face Track Bottoms" "Sport trousers" "34" "trousers" "/items/fatface track bottoms.jpg" 0.40
add_item "Fat Face T-Shirt" "Casual tee" "M" "tshirt" "/items/fatface tshiort 21.jpg" 0.20
add_item "Fat Face T-Shirt 2" "Casual tee" "M" "tshirt" "/items/fatface tshirt.jpg" 0.20

# Hollister
add_item "Hollister Polo" "Classic polo" "M" "shirt" "/items/hollister polo 3.jpg" 0.30
add_item "Hollister T-Shirt" "Casual tee" "M" "tshirt" "/items/hollister t short 5.jpg" 0.20

# Humour
add_item "Humour Shorts" "Casual shorts" "M" "trousers" "/items/humour shorts.jpg" 0.30

# Jack Wills
add_item "Jack Wills Casual Shirt" "Casual shirt" "M" "shirt" "/items/jack wills causal shirt.jpg" 0.30
add_item "Jack Wills Denim Overshirt" "Denim overshirt" "M" "shirt" "/items/jack wills demin  overshirt.jpg" 0.50
add_item "Jack Wills Jeans" "Classic jeans" "34" "trousers" "/items/jack wills jeans .jpg" 0.60
add_item "Jack Wills Jeans 1" "Classic jeans" "34" "trousers" "/items/jack wills jeans 1.jpg" 0.60
add_item "Jack Wills Jeans 2" "Classic jeans" "34" "trousers" "/items/jack wills jeans 2.jpg" 0.60
add_item "Jack Wills Jeans 3" "Classic jeans" "34" "trousers" "/items/jack wills leans 3.jpg" 0.60
add_item "Jack Wills Jeans 4" "Classic jeans" "34" "trousers" "/items/jack wills jeans 4.jpg" 0.60
add_item "Jack Wills Jeans 11" "Classic jeans" "34" "trousers" "/items/jack wills jeans 11.jpg" 0.60
add_item "Jack Wills Jumper" "Cozy jumper" "M" "shirt" "/items/jack wills jumper.jpg" 0.40
add_item "Jack Wills Polo" "Classic polo" "M" "shirt" "/items/JW polo1.jpg" 0.30
add_item "Jack Wills Polo 3" "Classic polo" "M" "shirt" "/items/jack wills polo 3.jpg" 0.30
add_item "Jack Wills Polo 3 Alt" "Classic polo" "M" "shirt" "/items/jackwills polo 3.jpg" 0.30
add_item "Jack Wills Shirt" "Casual shirt" "M" "shirt" "/items/jack wills shirt 1.jpg" 0.30
add_item "Jack Wills Trouser" "Smart trousers" "34" "trousers" "/items/jack wills trouser 1.jpg" 0.50
add_item "Jack Wills Trouser 5" "Smart trousers" "34" "trousers" "/items/jack wills trouser 5.jpg" 0.50

# Generic Jeans
add_item "Jeans" "Classic jeans" "34" "trousers" "/items/jeans.jpg" 0.60
add_item "Jeans 11" "Classic jeans" "34" "trousers" "/items/jeans 11.jpg" 0.60
add_item "Skinny Jeans" "Slim fit jeans" "34" "trousers" "/items/skinny jeans.jpg" 0.50

# L.O.G.G
add_item "L.O.G.G Jumper" "Casual jumper" "M" "shirt" "/items/LOgg Jumper.jpg" 0.40

# Monsoon
add_item "Monsoon Cardigan" "Stylish cardigan" "M" "other" "/items/monsoon cardigan.jpg" 0.40

# Nike
add_item "Nike Sport T-Shirt" "Athletic tee" "M" "tshirt" "/items/nike sport t short.jpg" 0.20

# Polo Ralph Lauren
add_item "Polo Ralph Lauren Jeans" "Designer jeans" "34" "trousers" "/items/polo raplh lauren jeans.jpg" 0.60

# Shannon
add_item "Shannon T-Shirt" "Graphic tee" "M" "tshirt" "/items/shannon t shirt.jpg" 0.20

# Sleeveless
add_item "Sleeveless Hoodie" "Athletic hoodie" "M" "other" "/items/sleeveless hoodie.jpg" 0.30

# TM Lewin
add_item "TM Lewin Shirt" "Formal shirt" "16.5 L" "shirt" "/items/tm lewin JF shirt 16.5 L.jpg" 0.30
add_item "TM Lewin Shirt 2" "Formal shirt" "16.5 L" "shirt" "/items/tm lewin shirt 16.5 L.jpg" 0.30
add_item "TM Lewin Shirt 3" "Formal shirt" "16.5 L" "shirt" "/items/tm lewin shirt 2 16.5 L.jpg" 0.30
add_item "TM Lewin Shirt 4" "Formal shirt" "16.5 L" "shirt" "/items/tm lewin short 16.5 Large.jpg" 0.30

# Generic Items
add_item "Trouser" "Classic trousers" "34" "trousers" "/items/Trouser.jpg" 0.50
add_item "Trouser 4" "Smart trousers" "34" "trousers" "/items/trouser 4.jpg" 0.50
add_item "Unlimited Trouser" "Casual trousers" "34" "trousers" "/items/unlimited trouser .jpg" 0.50
add_item "Water Repellent Transparent Trouser" "Technical trousers" "34" "trousers" "/items/water repellent transparent trouser.jpg" 0.50
add_item "Shirt 8" "Casual shirt" "M" "shirt" "/items/shirt 8.jpg" 0.30
add_item "T-Shirt" "Classic tee" "M" "tshirt" "/items/t hisrt 1.jpg" 0.20
add_item "T-Shirt 2" "Classic tee" "M" "tshirt" "/items/t shirt 2.jpg" 0.20
add_item "T-Shirt 10" "Classic tee" "M" "tshirt" "/items/t shirt 10.jpg" 0.20

# Unsung Hero
add_item "Unsung Hero Cardigan" "Stylish cardigan" "M" "other" "/items/unsung hero cardi.jpg" 0.40

echo ""
echo "All items added successfully!"
