# MetaItemAd Component Fix Checklist

## Current Issues Found
- [x] **Atomic design violation**: Imports AdviceCardContainer, AdviceTitle from molecules
- [x] **Props mismatch**: Component uses `category`, `companyName`, `subtitle`, `image`, `gradientColors` but mock data provides `title`, `logoUrl`, `gradientColor`, `gradientMaskUrl`
- [x] **Theme inconsistency**: Component uses `theme: 'light'|'dark'` but should use `'Light'|'Dark'`
- [x] **Hardcoded values**: Uses hardcoded colors, spacing, and sizes instead of design tokens
- [x] **Wrong gradient implementation**: Uses `gradientColors` array but should use single `gradientColor` with mask
- [x] **Missing gradient mask**: Should use SVG mask for gradient overlay effect

## Figma Specifications (119-66974)
- **Container**: 116px height, rounded-xl (12px), white background for Light theme
- **Gradient overlay**: Orange (#EB6100) color with SVG mask for shape
- **Logo positioning**: Bottom-right corner, 48px circle with white background
- **Title text**: 16px Medium, #141414 color (Light), #FFFFFF (Dark), -0.24px tracking
- **"Реклама" label**: 11px Regular, rgba(20,20,20,0.3) (Light), rgba(255,255,255,0.3) (Dark), -0.176px tracking
- **Border**: rgba(20,20,20,0.06) (Light), rgba(255,255,255,0.06) (Dark)
- **Spacing**: 16px left/right padding, 10px top padding, 13px bottom padding

## Key Differences from MetaItem
- [x] **Gradient background**: Has colored gradient overlay with mask effect
- [x] **Logo/image**: Shows company logo in bottom-right corner (48px circle)
- [x] **Ad indicator**: Shows "Реклама" label at bottom-left
- [x] **Visual styling**: More prominent, advertising-specific design
- [x] **Content focus**: Shows company name/brand instead of category

## Design Token Mapping
- **Background**: `#FFFFFF` → `tokens.colors.background.primary`
- **Title color (Light)**: `#141414` → `tokens.colors.text.primary`
- **Title color (Dark)**: `#FFFFFF` → `tokens.colors.text.primary` (dark theme)
- **Ad label (Light)**: `rgba(20,20,20,0.3)` → `tokens.colors.text.tertiary`
- **Ad label (Dark)**: `rgba(255,255,255,0.3)` → `tokens.colors.text.tertiary` (dark theme)
- **Border (Light)**: `rgba(20,20,20,0.06)` → `tokens.colors.border.light`
- **Border (Dark)**: `rgba(255,255,255,0.06)` → `tokens.colors.border.light` (dark theme)
- **Container radius**: `12px` → `tokens.borders.radius.xl`
- **Spacing**: `16px` → `tokens.spacing[4]`, `10px` → `tokens.spacing[2.5]`, `13px` → `tokens.spacing[3.25]`

## Required Changes
- [x] **Remove molecule imports**: Only import atoms and design tokens
- [x] **Fix props interface**: Update to match mock data structure
  - `category` → `title`
  - `companyName` → `title` (same field)
  - `subtitle` → remove (not in mock data)
  - `image` → `logoUrl`
  - `gradientColors` → `gradientColor`
  - Add `gradientMaskUrl` support
- [x] **Implement gradient mask**: Use SVG mask for gradient overlay
- [x] **Fix theme handling**: Use 'Light'/'Dark' format consistently
- [x] **Replace hardcoded values**: Use design tokens for all styling
- [x] **Fix layout structure**: Match Figma layout exactly
- [x] **Add proper "Реклама" label**: Position and style correctly

## Component Structure (Target)
```typescript
'use client';

import React from 'react';
import Image from 'next/image';
import { tokens } from '@/lib/ui/tokens';

interface MetaItemAdProps {
  title: string;
  logoUrl?: string;
  gradientColor?: string;
  gradientMaskUrl?: string;
  searchPhrase?: string;
  advertiserId?: string;
  isSponsored?: boolean;
  backgroundColor?: string;
  onClick?: () => void;
  className?: string;
  theme?: 'Light' | 'Dark';
}

export function MetaItemAd({ title, logoUrl, gradientColor, ... }: MetaItemAdProps) {
  // Implementation with design tokens only
}
```

## Success Criteria
- [x] Layout matches Figma node 119-66974 exactly
- [x] "Реклама" label is clearly visible at bottom-left
- [x] Company logo displays in bottom-right circle
- [x] Gradient overlay works with SVG mask
- [x] All styling uses design tokens (no hardcoded values)
- [x] Props match mock data structure
- [x] Click behavior works properly
- [x] No console errors or warnings
- [x] Renders correctly in AdviceSection
- [x] Only imports atoms (no molecules)
- [x] TypeScript properly typed
- [x] Both Light and Dark themes work correctly

## Visual Verification Results
✅ **Component renders successfully** - MetaItemAd appears in AdviceSection with "Sponsored: Xiaomi" label
✅ **Logo displays correctly** - Xiaomi logo shows in bottom-right 48px circle with white background
✅ **"Реклама" label visible** - Advertisement label appears at bottom-left with correct styling
✅ **Click functionality works** - Component is properly clickable and accessible
✅ **No console errors** - Development server runs without TypeScript or runtime errors
✅ **Atomic design compliance** - No molecule imports, only design tokens used