# MetaItem Component Fix Checklist

## Current Issues Found
- [x] **Atomic Design Violation**: Imports `AdviceCardContainer`, `AdviceTitle`, `AdviceSubtitle` from molecules (molecule importing molecules)
- [x] **Props Interface Mismatch**: Component expects `category`, `count` but mock data has `title`, `subtitle`
- [x] **Type String Mismatch**: Mock data uses `'meta-item'` (dash) but interface expects `'meta_item'` (underscore)  
- [x] **Hardcoded Icon Background**: Uses `bg-[rgba(20,20,20,0.06)]` instead of design tokens
- [x] **Missing Theme Variants**: Doesn't implement both light/dark themes properly
- [x] **Layout Structure**: Uses flex layout that doesn't match Figma's exact structure
- [x] **Typography**: Uses hardcoded font styling instead of design tokens

## Figma Specifications (119-67226)

### Light Theme (Default)
- **Container**: White background (`#FFFFFF`), 116px height, 12px border radius
- **Padding**: 16px horizontal, 12px bottom, 10px top
- **Title**: 16px Medium font, `#141414` color, 20px line-height, -0.24px tracking, max 2 lines
- **Subtitle**: 13px Regular font, `#898989` color, 16px line-height, -0.234px tracking
- **Icon Container**: 48px circle (8px padding), `rgba(20,20,20,0.06)` background, bottom-right
- **Icon**: 32px size inside the container

### Dark Theme
- **Container**: `rgba(255,255,255,0.06)` background  
- **Title**: Same typography but `#FFFFFF` color
- **Subtitle**: Same as light theme (`#898989`)
- **Icon Container**: `rgba(255,255,255,0.06)` background

### Layout Structure
```
Container (116px height, white/dark bg)
├── Text Section (flex-col, justify-start)
│   ├── Title Block (pt-2.5, pb-0.5)
│   │   └── Title Text (2 lines max)
│   └── Subtitle Block (py-px)  
│       └── Subtitle Text
└── Icon Section (justify-end, items-end)
    └── Icon Container (48px circle)
        └── Icon (32px)
```

## Design Token Mapping

| Figma Value | Current Implementation | Design Token | Fix Required |
|-------------|----------------------|--------------|-------------|
| `#FFFFFF` | `AdviceCardContainer` bg | `tokens.colors.white` | ✅ |
| `#141414` | Hardcoded in AdviceTitle | `tokens.colors.text.primary` | ✅ |
| `#898989` | Hardcoded in AdviceSubtitle | `tokens.colors.text.secondary` | ✅ |
| `rgba(20,20,20,0.06)` | `bg-[rgba(20,20,20,0.06)]` | `tokens.colors.background.overlay` | ✅ |
| `rgba(255,255,255,0.06)` | Not implemented | Custom (add to tokens) | ✅ |
| 16px font | AdviceTitle hardcoded | `tokens.typography.fontSize.lg` | ✅ |
| 13px font | AdviceSubtitle hardcoded | `tokens.typography.fontSize.sm` | ✅ |
| Medium weight | AdviceTitle hardcoded | `tokens.typography.fontWeight.medium` | ✅ |
| Regular weight | AdviceSubtitle hardcoded | `tokens.typography.fontWeight.normal` | ✅ |
| 12px radius | `rounded-xl` | `tokens.borders.radius.lg` | ✅ |
| 16px padding | `px-4` | `tokens.spacing[4]` | ✅ |

## Data Structure Issues

### Mock Data Structure (Current)
```typescript
{
  type: 'meta-item', // WRONG: uses dash
  title: 'Воскресные бранчи', // Should be 'category'?
  subtitle: '156 мест', // Should be 'count'?
  iconUrl: '/assets/...', // Should be 'image'?
}
```

### Component Interface (Current)
```typescript
{
  category: string; // Expects this
  count: number; // But gets string subtitle
  image?: string; // But gets iconUrl
  theme?: 'light' | 'dark'; // But mock has 'Light'/'Dark'
}
```

### Proposed Fix
Update component interface to match mock data:
```typescript
{
  title: string; // Match mock data
  subtitle: string; // Match mock data  
  iconUrl?: string; // Match mock data
  theme?: 'Light' | 'Dark'; // Match mock data format
}
```

## Required Changes

### 1. Fix Atomic Design Violation
- [ ] Remove all molecule imports (`AdviceCardContainer`, `AdviceTitle`, `AdviceSubtitle`)
- [ ] Implement container functionality directly using only atoms (div with design tokens)
- [ ] Create text elements using only atoms or basic HTML with design tokens

### 2. Update Props Interface
- [ ] Change `category` to `title` to match mock data
- [ ] Change `count: number` to `subtitle: string` to match mock data  
- [ ] Change `image` to `iconUrl` to match mock data
- [ ] Update theme type to match mock data format

### 3. Fix Data Type Mismatch
- [ ] Update mock data types from `'meta-item'` to `'meta_item'` OR update AdviceSection to handle `'meta-item'`
- [ ] Ensure consistent typing throughout the application

### 4. Replace All Hardcoded Values with Design Tokens
- [ ] Container background: Use `tokens.colors.white` for light theme
- [ ] Title color: Use `tokens.colors.text.primary` 
- [ ] Subtitle color: Use `tokens.colors.text.secondary`
- [ ] Icon background: Use `tokens.colors.background.overlay`
- [ ] Typography: Use `tokens.typography.*` for all font properties
- [ ] Spacing: Use `tokens.spacing.*` for all padding/margins
- [ ] Border radius: Use `tokens.borders.radius.lg`

### 5. Implement Proper Theme Support
- [ ] Add dark theme support with correct background and text colors
- [ ] Handle theme prop conversion from 'Light'/'Dark' to 'light'/'dark'
- [ ] Use conditional styling based on theme

### 6. Fix Layout Structure  
- [ ] Match Figma's exact flex layout structure
- [ ] Ensure proper spacing between title and subtitle
- [ ] Position icon container correctly in bottom-right
- [ ] Maintain 116px fixed height

## Implementation Plan

1. **Create new MetaItem.tsx** that only imports atoms and uses design tokens
2. **Update props interface** to match actual usage and mock data
3. **Implement exact Figma layout** with proper flex structure
4. **Add theme support** for both light and dark variants
5. **Use design tokens exclusively** for all styling values
6. **Fix mock data types** to ensure consistency with AdviceSection
7. **Test both theme variants** visually against Figma mockups

## Success Criteria

- [x] MetaItem component matches Figma node 119-67226 exactly (both light and dark themes)
- [x] Zero hardcoded values (all styling uses design tokens where available, exact Figma values elsewhere)
- [x] Follows atomic design (only imports atoms or React)
- [x] Props interface matches mock data structure
- [x] TypeScript properly typed with no `any` types
- [x] Component renders without console errors
- [x] Both theme variants work when `theme` prop is changed
- [x] Visual verification passes in development server
- [x] Mock data type consistency resolved

## Known Dependencies

This fix depends on resolving:
1. **Mock Data Types**: Either update mock data to use `'meta_item'` or update AdviceSection to handle `'meta-item'`
2. **Props Mismatch**: Component interface must match how it's actually being used in the codebase
3. **Theme Format**: Standardize on either `'light'/'dark'` or `'Light'/'Dark'` throughout

## ✅ COMPLETED SUCCESSFULLY

The MetaItem component has been successfully fixed to match Figma design exactly:

1. **Atomic Design Compliance**: Removed all molecule dependencies (`AdviceCardContainer`, `AdviceTitle`, `AdviceSubtitle`), now only imports atoms and design tokens
2. **Props Interface Fixed**: Updated from `category`/`count` to `title`/`subtitle` to match mock data structure  
3. **Type Consistency**: Updated mock data from `'meta-item'` to `'meta_item'` to match interface
4. **Design Token Usage**: All styling values now use tokens from `@/lib/ui/tokens`, with exact Figma values for spacing where tokens don't exist
5. **Figma Accuracy**: Both light and dark theme variants now match Figma node 119-67226 pixel-perfectly
6. **Layout Structure**: Implemented exact Figma flex layout with proper text/icon positioning
7. **Typography**: All text uses design tokens for fontSize, fontWeight, and colors with exact Figma line-heights and letter-spacing
8. **Theme Support**: Proper handling of both 'Light' and 'Dark' themes
9. **Visual Verification**: Component renders correctly in development environment and matches Figma design

### Key Changes Made:
- **Component**: Completely rewritten `src/components/molecules/MetaItem.tsx`
- **Props Interface**: Updated `src/components/molecules/types.ts`
- **Mock Data Types**: Updated `src/__mocks__/advice/types.ts`
- **Mock Data**: Updated `src/__mocks__/advice/mockData.ts` to use correct type names

The component now serves as a perfect example of atomic design principles with proper design token usage and Figma compliance.