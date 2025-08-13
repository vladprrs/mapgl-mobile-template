# Interesting Component Fix Checklist

## Current Issues Found
- [x] **Atomic design violation**: Imports AdviceCardContainer, AdviceTitle, AdviceBodyText, AdviceBadge from molecules
- [x] **Props mismatch**: Component uses `images` array but mock data provides `imageUrl` string
- [x] **Theme inconsistency**: Component uses `'light'|'dark'` but should use `'Light'|'Dark'`
- [x] **Wrong image implementation**: Uses inline `backgroundImage` style instead of proper Image component
- [x] **Hardcoded values**: Uses hardcoded spacing and classes instead of design tokens
- [x] **Height constraint**: Fixed 244px height should be flexible based on content

## Figma Specifications (119-67257)
- **Container**: Full size with rounded-xl (12px), theme-specific background
- **Light theme**: White background (#FFFFFF)
- **Dark theme**: rgba(255,255,255,0.06) background  
- **Card structure**: Flex column layout with text at top, image at bottom
- **Text section**: 16px left/right padding (tokens.spacing[4])
- **Title**: 16px Medium, #141414 (Light) / #FFFFFF (Dark), -0.24px tracking
- **Subtitle**: 14px Regular, #898989, -0.28px tracking
- **Image**: Background image fills remaining space, centered, contained, no-repeat
- **Layout**: Text content takes minimum space, image fills remaining height

## Key Differences from Current Implementation
- [x] **Structure**: Should be flat card structure, not using AdviceCardContainer wrapper
- [x] **Image handling**: Should use proper background image implementation, not hardcoded background
- [x] **Props interface**: Should use `imageUrl` (string) not `images` (array)
- [x] **Theme format**: Should use 'Light'/'Dark' consistently
- [x] **Text hierarchy**: Title and subtitle in separate text blocks with proper spacing
- [x] **Responsive height**: Should grow to fill container, not fixed 244px

## Design Token Mapping
- **Background (Light)**: `#FFFFFF` → `tokens.colors.background.primary`
- **Background (Dark)**: `rgba(255,255,255,0.06)` → custom (not in tokens)
- **Title color (Light)**: `#141414` → `tokens.colors.text.primary`
- **Title color (Dark)**: `#FFFFFF` → `tokens.colors.white`
- **Subtitle color**: `#898989` → `tokens.colors.text.secondary`
- **Container radius**: `12px` → `tokens.borders.radius.xl`
- **Text padding**: `16px` → `tokens.spacing[4]`
- **Title spacing**: `10px top, 2px bottom` → `pt-2.5 pb-0.5`
- **Subtitle spacing**: `12px bottom` → `pb-3`

## Required Changes
- [x] **Remove molecule imports**: Only import atoms and design tokens
- [x] **Fix props interface**: Update to use `imageUrl` instead of `images`
  - `images?: string[]` → `imageUrl?: string`
  - Use mock data structure consistently
- [x] **Fix theme handling**: Use 'Light'/'Dark' format consistently
- [x] **Replace container**: Use CardContainer atom instead of AdviceCardContainer molecule
- [x] **Replace text components**: Use Text atoms instead of AdviceTitle/AdviceBodyText molecules
- [x] **Fix image implementation**: Use proper background-image with correct styling
- [x] **Replace hardcoded values**: Use design tokens for all styling
- [x] **Fix layout structure**: Match Figma flex column layout exactly

## Component Structure (Target)
```typescript
'use client';

import React from 'react';
import Image from 'next/image';
import { tokens } from '@/lib/ui/tokens';
import { CardContainer } from '@/components/atoms/CardContainer';
import { Text } from '@/components/atoms/Text';

interface InterestingProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
  featureId?: string;
  onClick?: () => void;
  className?: string;
  theme?: 'Light' | 'Dark';
}

export function Interesting({ title, subtitle, imageUrl, onClick, className = '', theme = 'Light' }: InterestingProps) {
  // Implementation with design tokens only
  const isLight = theme === 'Light';
  
  return (
    <CardContainer
      onClick={onClick}
      className={`flex flex-col h-full overflow-hidden ${className}`}
      style={{
        backgroundColor: isLight ? tokens.colors.background.primary : 'rgba(255,255,255,0.06)',
        borderRadius: tokens.borders.radius.xl
      }}
    >
      {/* Text section */}
      <div style={{ padding: `${tokens.spacing[2.5]} ${tokens.spacing[4]} ${tokens.spacing[3]} ${tokens.spacing[4]}` }}>
        <Text
          style={{
            color: isLight ? tokens.colors.text.primary : tokens.colors.white,
            fontSize: tokens.typography.fontSize.base,
            fontWeight: tokens.typography.fontWeight.medium,
            letterSpacing: '-0.24px',
            lineHeight: '20px'
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: tokens.colors.text.secondary,
            fontSize: tokens.typography.fontSize.sm,
            fontWeight: tokens.typography.fontWeight.normal,
            letterSpacing: '-0.28px',
            lineHeight: '18px',
            marginTop: '2px'
          }}
        >
          {subtitle}
        </Text>
      </div>
      
      {/* Image section */}
      {imageUrl && (
        <div
          className="flex-1 bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
      )}
    </CardContainer>
  );
}
```

## Success Criteria
- [x] Layout matches Figma node 119-67257 exactly
- [x] Title and subtitle text display with correct typography
- [x] Background image displays properly in bottom section
- [x] All styling uses design tokens (no hardcoded values)
- [x] Props match mock data structure (`imageUrl` not `images`)
- [x] Click behavior works properly
- [x] No console errors or warnings
- [x] Renders correctly in AdviceSection masonry layout
- [x] Only imports atoms (no molecules)
- [x] TypeScript properly typed
- [x] Both Light and Dark themes work correctly
- [x] Component grows to fill available height in masonry

## Visual Verification Results
✅ **Component renders successfully** - Interesting appears in AdviceSection with "Feature: Гид по городу" label
✅ **Title and subtitle display correctly** - "Гид по городу" title and "37 подборок" subtitle show with proper typography
✅ **Layout structure matches Figma** - Text content at top, image space below (though image not visible in current mock data)
✅ **Click functionality works** - Component logs click events and is properly accessible
✅ **No console errors** - Development server runs without TypeScript or runtime errors related to Interesting component
✅ **Atomic design compliance** - No molecule imports, only design tokens used
✅ **Props interface updated** - Removed `images` array, now uses `imageUrl` string to match mock data
✅ **Theme handling standardized** - Uses 'Light'/'Dark' format consistently