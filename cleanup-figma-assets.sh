#!/bin/bash

echo "🔍 Analyzing Figma assets usage..."

# Create temporary directory for cleanup
mkdir -p .trash-assets/figma

# Get all referenced figma assets
grep -r "/assets/figma/" src --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" 2>/dev/null | \
  grep -o '/assets/figma/[^"'"'"']*\.\(png\|svg\|jpg\|webp\)' | \
  sed 's|^/||' | sort | uniq > used-figma-assets.txt

echo "Found $(wc -l < used-figma-assets.txt) referenced figma assets"

# Get all figma asset files
find public/assets/figma -type f \( -name "*.png" -o -name "*.svg" -o -name "*.jpg" -o -name "*.webp" \) | \
  sed 's|^public/||' | sort > all-figma-assets.txt

echo "Found $(wc -l < all-figma-assets.txt) total figma assets"

# Find unused assets
comm -13 used-figma-assets.txt all-figma-assets.txt > unused-figma-assets.txt

echo "Found $(wc -l < unused-figma-assets.txt) unused figma assets"

# Calculate total size of unused assets
total_size=0
while IFS= read -r file; do
  if [ -f "public/$file" ]; then
    size=$(du -k "public/$file" | cut -f1)
    total_size=$((total_size + size))
  fi
done < unused-figma-assets.txt

echo "Total size of unused figma assets: $((total_size / 1024)) MB"

# Check for the largest unused files
echo ""
echo "Top 10 largest unused figma assets:"
while IFS= read -r file; do
  if [ -f "public/$file" ]; then
    du -h "public/$file"
  fi
done < unused-figma-assets.txt | sort -rh | head -10

# Cleanup temp files
rm -f used-figma-assets.txt all-figma-assets.txt unused-figma-assets.txt