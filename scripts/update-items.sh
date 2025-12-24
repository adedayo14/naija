#!/bin/bash

API_URL="https://naija-five.vercel.app/api/admin/items"
ADMIN_SECRET="admin123"

# Function to update an item
update_item() {
  local item_id="$1"
  local updates="$2"
  local description="$3"

  echo "Updating: $description"
  curl -s -X PATCH "$API_URL/$item_id" \
    -H "Content-Type: application/json" \
    -H "x-admin-secret: $ADMIN_SECRET" \
    -d "$updates" | jq -r '.id // .error'
}

# Fetch all items
echo "Fetching all items..."
ITEMS=$(curl -s "$API_URL" -H "x-admin-secret: $ADMIN_SECRET")

# Update jeans items - change to jeans category and remove numbers
echo ""
echo "=== Updating Jeans Items ==="

# Jack Wills Jeans 1
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Jack Wills Jeans 1") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"Jack Wills Jeans","category":"jeans"}' "Jack Wills Jeans 1 -> Jack Wills Jeans (jeans)"

# Jack Wills Jeans 2
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Jack Wills Jeans 2") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"Jack Wills Jeans","category":"jeans"}' "Jack Wills Jeans 2 -> Jack Wills Jeans (jeans)"

# Jack Wills Jeans 3
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Jack Wills Jeans 3") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"Jack Wills Jeans","category":"jeans"}' "Jack Wills Jeans 3 -> Jack Wills Jeans (jeans)"

# Jack Wills Jeans 4
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Jack Wills Jeans 4") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"Jack Wills Jeans","category":"jeans"}' "Jack Wills Jeans 4 -> Jack Wills Jeans (jeans)"

# Jack Wills Jeans 11
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Jack Wills Jeans 11") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"Jack Wills Jeans","category":"jeans"}' "Jack Wills Jeans 11 -> Jack Wills Jeans (jeans)"

# Jack Wills Jeans (already correct title, just update category)
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Jack Wills Jeans") | .id')
[ -n "$ID" ] && update_item "$ID" '{"category":"jeans"}' "Jack Wills Jeans -> category: jeans"

# Fat Face Jeans
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Fat Face Jeans") | .id')
[ -n "$ID" ] && update_item "$ID" '{"category":"jeans"}' "Fat Face Jeans -> category: jeans"

# Polo Ralph Lauren Jeans
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Polo Ralph Lauren Jeans") | .id')
[ -n "$ID" ] && update_item "$ID" '{"category":"jeans"}' "Polo Ralph Lauren Jeans -> category: jeans"

# Jeans
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Jeans") | .id')
[ -n "$ID" ] && update_item "$ID" '{"category":"jeans"}' "Jeans -> category: jeans"

# Jeans 11
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Jeans 11") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"Jeans","category":"jeans"}' "Jeans 11 -> Jeans (jeans)"

# Skinny Jeans
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Skinny Jeans") | .id')
[ -n "$ID" ] && update_item "$ID" '{"category":"jeans"}' "Skinny Jeans -> category: jeans"

echo ""
echo "=== Updating Cardigan Items ==="

# Monsoon Cardigan
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Monsoon Cardigan") | .id')
[ -n "$ID" ] && update_item "$ID" '{"category":"cardigan"}' "Monsoon Cardigan -> category: cardigan"

# Unsung Hero Cardigan
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Unsung Hero Cardigan") | .id')
[ -n "$ID" ] && update_item "$ID" '{"category":"cardigan"}' "Unsung Hero Cardigan -> category: cardigan"

echo ""
echo "=== Removing Numbers from Item Names ==="

# Abercrombie & Fitch Polo Shirt 3
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Abercrombie & Fitch Polo Shirt 3") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"Abercrombie & Fitch Polo Shirt"}' "Abercrombie & Fitch Polo Shirt 3 -> Abercrombie & Fitch Polo Shirt"

# American Apparel Jumper 2
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="American Apparel Jumper 2") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"American Apparel Jumper"}' "American Apparel Jumper 2 -> American Apparel Jumper"

# American Apparel Polo 2
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="American Apparel Polo 2") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"American Apparel Polo"}' "American Apparel Polo 2 -> American Apparel Polo"

# American Apparel Shirt 2
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="American Apparel Shirt 2") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"American Apparel Shirt"}' "American Apparel Shirt 2 -> American Apparel Shirt"

# American Apparel Shirt 7
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="American Apparel Shirt 7") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"American Apparel Shirt"}' "American Apparel Shirt 7 -> American Apparel Shirt"

# American Apparel Shorts 2
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="American Apparel Shorts 2") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"American Apparel Shorts"}' "American Apparel Shorts 2 -> American Apparel Shorts"

# Fat Face T-Shirt 2
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Fat Face T-Shirt 2") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"Fat Face T-Shirt"}' "Fat Face T-Shirt 2 -> Fat Face T-Shirt"

# Charles Tyrwhitt Shirt 2
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Charles Tyrwhitt Shirt 2") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"Charles Tyrwhitt Shirt"}' "Charles Tyrwhitt Shirt 2 -> Charles Tyrwhitt Shirt"

# Charles Tyrwhitt Shirt 3
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Charles Tyrwhitt Shirt 3") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"Charles Tyrwhitt Shirt"}' "Charles Tyrwhitt Shirt 3 -> Charles Tyrwhitt Shirt"

# Canterbury Polo 4
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Canterbury Polo 4") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"Canterbury Polo"}' "Canterbury Polo 4 -> Canterbury Polo"

# Jack Wills Polo 3
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Jack Wills Polo 3") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"Jack Wills Polo"}' "Jack Wills Polo 3 -> Jack Wills Polo"

# Jack Wills Polo 3 Alt
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Jack Wills Polo 3 Alt") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"Jack Wills Polo"}' "Jack Wills Polo 3 Alt -> Jack Wills Polo"

# Jack Wills Trouser 5
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Jack Wills Trouser 5") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"Jack Wills Trouser"}' "Jack Wills Trouser 5 -> Jack Wills Trouser"

# T-Shirt 2
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="T-Shirt 2") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"T-Shirt"}' "T-Shirt 2 -> T-Shirt"

# T-Shirt 10
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="T-Shirt 10") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"T-Shirt"}' "T-Shirt 10 -> T-Shirt"

# TM Lewin Shirt 2
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="TM Lewin Shirt 2") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"TM Lewin Shirt"}' "TM Lewin Shirt 2 -> TM Lewin Shirt"

# TM Lewin Shirt 3
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="TM Lewin Shirt 3") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"TM Lewin Shirt"}' "TM Lewin Shirt 3 -> TM Lewin Shirt"

# TM Lewin Shirt 4
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="TM Lewin Shirt 4") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"TM Lewin Shirt"}' "TM Lewin Shirt 4 -> TM Lewin Shirt"

# Trouser 4
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Trouser 4") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"Trouser"}' "Trouser 4 -> Trouser"

# Shirt 8
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Shirt 8") | .id')
[ -n "$ID" ] && update_item "$ID" '{"title":"Shirt"}' "Shirt 8 -> Shirt"

echo ""
echo "=== Updates Complete ==="
