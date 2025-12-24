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

echo ""
echo "=== Updating American Apparel Jacket Items ==="

# Find and update American Apparel Jacket items
echo "$ITEMS" | jq -r '.[] | select(.title | test("American Apparel.*Jacket"; "i")) | .id + "|" + .title' | while IFS='|' read -r ID TITLE; do
  echo "Found: $TITLE (ID: $ID)"
  update_item "$ID" '{"title":"American Apparel Lightweight Jacket","category":"jacket"}' "$TITLE -> American Apparel Lightweight Jacket (jacket)"
done

echo ""
echo "=== Updates Complete ==="
