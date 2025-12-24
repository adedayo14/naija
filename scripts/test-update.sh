#!/bin/bash

API_URL="https://naija-five.vercel.app/api/admin/items"
ADMIN_SECRET="admin123"

# Get one jeans item
echo "Fetching items..."
ITEMS=$(curl -s "$API_URL" -H "x-admin-secret: $ADMIN_SECRET")
ID=$(echo "$ITEMS" | jq -r '.[] | select(.title=="Jack Wills Jeans 1") | .id')

echo "Found item ID: $ID"
echo ""
echo "Attempting to update category to 'jeans'..."
echo ""

RESPONSE=$(curl -s -X PATCH "$API_URL/$ID" \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: $ADMIN_SECRET" \
  -d '{"category":"jeans"}')

echo "Response:"
echo "$RESPONSE" | jq
