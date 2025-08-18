#!/bin/bash

echo "🗑️ Moving unused Figma assets to .trash-assets..."

# Counter for moved files
moved_count=0
total_size=0

# Process each figma asset file
find public/assets/figma -type f \( -name "*.png" -o -name "*.svg" -o -name "*.jpg" -o -name "*.webp" \) | while read file; do
  rel_path=$(echo "$file" | sed 's|^public/||')
  
  # Check if this file is in the used list
  if ! grep -q "^$rel_path$" used-figma.txt; then
    # Get file size before moving
    size=$(du -k "$file" | cut -f1)
    total_size=$((total_size + size))
    
    # Create directory structure in trash
    mkdir -p ".trash-assets/$(dirname "$rel_path")"
    
    # Move the file
    mv "$file" ".trash-assets/$rel_path"
    
    # Increment counter
    moved_count=$((moved_count + 1))
    
    # Show progress every 50 files
    if [ $((moved_count % 50)) -eq 0 ]; then
      echo "Moved $moved_count files..."
    fi
  fi
done

echo "✅ Moved $moved_count unused Figma assets"

# Clean up empty directories
echo "🧹 Cleaning up empty directories..."
find public/assets/figma -type d -empty -delete

echo "✅ Cleanup complete!"