# 2GIS MapGL Mobile App - Development Guide

## 🏗️ Atomic Design Architecture
Components hierarchy: `Atoms → Molecules → Organisms → Templates → Pages`
- **Atoms**: No component imports, design tokens only
- **Molecules**: Import atoms only, NO molecule dependencies 
- **Organisms**: Import atoms + molecules + store access
- **Pages**: Import all levels

## ⚡ Commands
```bash
npm run dev         # Development server (port 3000)
npm run build       # Production build  
npm run type-check  # TypeScript validation
npm run lint        # ESLint checks
```

## 🎨 Design Tokens (REQUIRED)
```typescript
import { tokens } from '@/lib/ui/tokens';

// ✅ ALWAYS use tokens
backgroundColor: tokens.colors.background.secondary
padding: tokens.spacing[4]
fontSize: tokens.typography.fontSize.base

// ❌ NEVER hardcode
backgroundColor: '#F1F1F1'
```

## 🗺️ State Management - Zustand Only
```typescript
import useStore from '@/stores';
import { useActions } from '@/stores';

// Atomic selectors (performance)
const query = useStore(state => state.search.query);
const actions = useActions();

// Cross-slice actions for complex workflows
await actions.performSearch('restaurants');
```

## 📁 Key File Locations
```
src/
├── components/atoms/      # Button, Icon, RatingStars
├── components/molecules/  # SearchInput, FriendAvatars, ContactInfo  
├── components/organisms/  # SearchBar, OrganizationHeader
├── stores/slices/        # Map, Search, UI state
├── __mocks__/search/     # Product aliases, suggestions
└── lib/ui/tokens.ts      # Design tokens
```

## 🎯 Critical Component Rules

### SearchBar Structure
```typescript
SearchBar organism:
├── SearchInput molecule (leftIcon: search, rightIcon: salute button)
└── Action Button (burger/X based on currentScreen)
```

### Bottom Sheet Behavior
- Search pages: Auto-expand to 90%
- Dashboard: Stay at 50%
- Organization details: Secondary background (#F1F1F1)

### Product Search System
Location: `src/__mocks__/search/productAliases.ts`
- Maps "молоко" → grocery stores, "перфоратор" → electronics
- Shows blue banner: "Показаны магазины, где можно купить [product]"

### Food Establishment Detection
```typescript
const FOOD_CATEGORIES = ['ресторан', 'кафе', 'пицца', 'суши', ...];
// Food → "Меню" tab, Others → "Цены" tab
```

## 🎨 Figma References
- **ContactInfo**: node-id `322-78232`
- **CheckoutItemCard**: node-id `337-225744` 
- **ChatBottomSheet**: node-id `357-246695`
- **AISearchHelper**: node-id `364-243412`

## ⚠️ Critical Rules
- ❌ NEVER import molecules from other molecules
- ❌ NEVER use hardcoded colors/spacing
- ❌ NEVER manage state outside Zustand
- ✅ ALWAYS use design tokens
- ✅ ALWAYS use atomic selectors for performance
- ✅ ALWAYS run `npm run type-check` and `npm run lint` before commit

## 🐛 Quick Fixes
- Hydration errors: Use dynamic imports with `ssr: false`
- Map cleanup: Always call `map.destroy()`
- Theme format: Use 'Light'/'Dark' not 'light'/'dark'
- Bottom sheet issues: Check react-modal-sheet v4.4.0

## 📝 Component Creation Pattern
```typescript
// Molecule example
'use client';
import { tokens } from '@/lib/ui/tokens';
// Import only atoms - NO molecule imports!

export function MyMolecule({ theme = 'Light' }) {
  return (
    <div style={{
      backgroundColor: tokens.colors.background.primary,
      padding: tokens.spacing[4],
    }}>
      Content
    </div>
  );
}
```

## 🔍 Product Categories
6 categories with 200+ terms:
- **Electronics**: перфоратор, дрель, телевизор
- **Grocery**: молоко, хлеб, мясо  
- **Medical**: врач, анализы, узи
- **Pharmacy**: лекарство, витамины
- **Auto**: шиномонтаж, масло
- **Beauty**: стрижка, маникюр

Tests temporarily removed. All quality tools (ESLint, TypeScript, Prettier) remain active.