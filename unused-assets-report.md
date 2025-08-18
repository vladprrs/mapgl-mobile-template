# Unused Assets Cleanup Report

## Executive Summary

**Total space to be saved: ~77 MB**

- 847 unused Figma assets (76 MB)
- Multiple duplicate assets across directories
- Largest unused files: 18MB and 12MB PNG files

## Asset Analysis

### 1. Figma Assets (`public/assets/figma/`)
- **Total files**: 876
- **Used files**: 31 (3.5%)
- **Unused files**: 847 (96.5%)
- **Space to save**: 76 MB

#### Top Space Hogs:
1. `329de0585f566054c9ac235d4232bc1bbfccf213.png` - 18 MB (completely unused)
2. `99a0c1f253ebf6605332da01f8ce163277d79bd6.png` - 12 MB (completely unused)
3. `ac79fad2197ba37543d53e44dcc1a4cfe432cdd3.png` - 3.1 MB (completely unused)

### 2. Duplicate Assets
Many assets are duplicated across multiple directories:
- `ab30eb256075f0e735cf60ae0de004384a15c87a.png` - 1.2 MB × 8 copies = 9.6 MB
- `af44a73d69b0b90274f2c40b553a4cb530fc7a73.png` - 1.1 MB × 12 copies = 13.2 MB

### 3. Actually Used Assets

#### Figma Icons (6 files):
- `/assets/figma/icons/c5443c9b0d39ee0d86a9a663a17b3f2cc5c05af0.svg` - Поесть
- `/assets/figma/icons/5bbd729c4d66ffe9605baf28fedce95010a165cf.svg` - Банкоматы
- `/assets/figma/icons/58b4c95e38b9410447b0d379c29667cb42194242.svg` - Катки
- `/assets/figma/icons/4fa44d9eb250d553be8160f438c22620c295924e.svg` - Аптеки
- `/assets/figma/icons/8adb07d16b8ae139570779eedd1ad0d7024651e3.svg` - Отели
- `/assets/figma/icons/83921c4741ea1c0c421d5b412bf28d8175ca6c61.svg` - Все рубрики

#### Product Images (5 files):
- `/assets/figma/24ace8940eccc51dbbf5b15af155b01435ec8a23.png`
- `/assets/figma/d86e9c98cc883aff65270c606c4f6cc1b65f2d4d.png`
- `/assets/figma/8441c3055b3f38c931e05b652aacb578fe48a2b8.png`
- `/assets/figma/2559335aecfc0288dce9aa2b2bac3b24eb5b4be5.png`
- `/assets/figma/432a168b924d61b5bc79cc0268a37d4bf270fb5a.png`

#### Store Assets (referenced but missing):
- `/assets/figma/stores/samokat-*.png` (referenced but files don't exist)
- `/assets/figma/stores/mvideo-*.png` (referenced but files don't exist)
- `/assets/figma/products/screwdriver.png` (referenced but doesn't exist)
- `/assets/figma/products/saw.png` (referenced but doesn't exist)

### 4. Other Asset Directories

#### Icons (`public/icons/`)
- Most icons are actively used in search results and UI components
- Keep all for now

#### Avatars (`public/avatars/`)
- Used in friend lists and search results
- Keep all for now

#### Products (`public/assets/products/`)
- 5 product images actively used
- Keep all

## Cleanup Strategy

### Phase 1: Safe Cleanup (Immediate)
1. Remove all unused figma assets (847 files, 76 MB)
2. Move to `.trash-assets/` folder first for safety
3. Add `.trash-assets/` to `.gitignore`

### Phase 2: Fix Missing References
1. Either remove references to non-existent store/product images
2. Or add the missing images if needed

### Phase 3: Deduplicate
1. Remove duplicate copies of large images
2. Update references to use single source

## Commands to Execute

```bash
# 1. Create trash directory
mkdir -p .trash-assets

# 2. Move unused figma assets
grep -r "/assets/figma/" src --include="*.ts" --include="*.tsx" 2>/dev/null | \
  grep -o '/assets/figma/[^"'"'"']*\.\(png\|svg\|jpg\|webp\)' | \
  sed 's|^/||' | sort | uniq > used-figma.txt

find public/assets/figma -type f \( -name "*.png" -o -name "*.svg" -o -name "*.jpg" -o -name "*.webp" \) | \
  while read file; do
    rel_path=$(echo $file | sed 's|^public/||')
    if ! grep -q "^$rel_path$" used-figma.txt; then
      mkdir -p ".trash-assets/$(dirname $rel_path)"
      mv "$file" ".trash-assets/$rel_path"
    fi
  done

# 3. Add to .gitignore
echo ".trash-assets/" >> .gitignore

# 4. Clean up empty directories
find public/assets/figma -type d -empty -delete
```

## Verification Steps

1. Run `npm run build` - Should complete without errors
2. Run `npm run type-check` - Should pass
3. Visual inspection of app - All images should load
4. Check browser console - No 404 errors for images

## Final Note

After verification, the `.trash-assets/` folder can be permanently deleted, freeing up 77+ MB from the repository.