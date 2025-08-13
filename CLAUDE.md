# 2GIS MapGL Mobile App - Development Guidelines

## 🏗️ Atomic Design Architecture

This codebase follows **Atomic Design** principles strictly. Components are organized in a hierarchy where each level can only depend on levels below it.

### 🚀 Recent Migration Progress

**COMPLETED**: Atomic design migration for advice card components
- ✅ **MetaItem** - Category search cards (116px height)
- ✅ **MetaItemAd** - Sponsored content cards with gradient
- ✅ **Cover** - Collection covers (116px/244px variants)
- ✅ **Interesting** - Feature promotion cards (244px double height)
- ✅ **RD** - Business advertiser cards with gallery (244px double height)

All components now use design tokens exclusively and follow atomic design hierarchy.

### Component Hierarchy Rules

```
Atoms → Molecules → Organisms → Templates → Pages
```

- **Atoms**: No dependencies on other components
- **Molecules**: Can only import atoms
- **Organisms**: Can import atoms and molecules
- **Templates**: Can import atoms, molecules, and organisms
- **Pages**: Can import from all levels below

## ⚡ Essential Commands

```bash
npm run dev         # Start development server (port 3000)
npm run build       # Production build
npm run type-check  # TypeScript validation
npm run lint        # ESLint checks
npm run format      # Format code with Prettier
```

> **Note**: Tests have been temporarily removed. All test files and configurations have been deleted while preserving ESLint, TypeScript type checking, and other code quality tools. Tests will be refactored and rewritten in a future task.

## 🎨 Design Token Usage

### Always Use Tokens

```typescript
// ✅ CORRECT - Using design tokens
import { tokens } from '@/lib/ui/tokens';

backgroundColor: tokens.colors.background.secondary
padding: tokens.spacing[4]
fontSize: tokens.typography.fontSize.base
borderRadius: tokens.borders.radius.md

// ❌ WRONG - Hardcoded values
backgroundColor: '#F1F1F1'
padding: '16px'
fontSize: '14px'
borderRadius: '8px'
```

### Available Tokens

- **Colors**: `tokens.colors.*` (primary, text, background, border, traffic)
- **Spacing**: `tokens.spacing[0-10]` (0px to 40px)
- **Typography**: `tokens.typography.*` (fontSize, fontWeight, lineHeight)
- **Borders**: `tokens.borders.*` (radius, width)
- **Transitions**: `tokens.transitions.*` (duration, easing)

## 🎨 Figma Design References

### Search Bar Components
- **Dashboard Search Bar**: node-id `271-221631` - White background with menu button
- **Suggestions Page Search Bar**: node-id `271-221659` - White background with X button  
- **Search Results Search Bar**: node-id `271-221789` - Gray background (#F1F1F1) with X button

### Implementation Notes
- **Drag Handle**: Always handled by BottomSheet component, not SearchBar
- **Background Colors**: SearchBar inherits background from parent container
- **Atomic Design**: SearchBar organism focuses only on search functionality
- **Top Spacing**: Exactly 16px from bottom sheet edge to search bar (all screens)
  - Drag handle top: `pt-1.5` = 6px
  - Drag handle height: `h-1` = 4px  
  - Drag handle bottom: `pb-1.5` = 6px
  - SearchBar top: no padding (0px)
  - **Total spacing**: 6 + 4 + 6 = 16px (drag handle perfectly centered)
- **Design Token Colors**:
  - White backgrounds: `tokens.colors.background.primary` → `#FFFFFF`
  - Gray backgrounds: `tokens.colors.background.secondary` → `#F1F1F1`
  - Drag handle on white: `rgba(20, 20, 20, 0.09)`
  - Drag handle on gray: `rgba(137, 137, 137, 0.25)`

### Button Behavior and Positioning
- **Salute Button**: Always positioned inside the search bar as rightIcon in SearchInput molecule
  - Displays on all screens (dashboard, suggestions, search results)
  - Uses `IMAGES.SALUT_ASSISTANT` asset with 24x24 size
  - Search input structure: `[search icon] [text input] [salute button]`
- **Burger/Cross Button**: 
  - Positioned OUTSIDE the search input, to the right of the search bar
  - Transforms dynamically based on `currentScreen` from Zustand store
  - Dashboard: Shows burger menu (`ICONS.MENU`) → calls `onMenuClick`
  - Suggestions/Search Results: Shows X icon (`ICONS.CLOSE`) → calls `onClear`
  - Always uses `rgba(20, 20, 20, 0.06)` background color from Figma designs
- **Clear Button Inside Search**: NEVER appears (per Figma designs)
  - All clear functionality is handled by the X button outside the search input
  - Search results screen: NO clear button inside search bar
  - Suggestions screen: NO clear button inside search bar  
  - Dashboard screen: NO clear button inside search bar

### Component Structure
```typescript
SearchBar organism:
├── SearchInput molecule
│   ├── leftIcon: Search icon
│   └── rightIcon: Salute button only
└── Action Button: Burger/Cross with dynamic background
    ├── Dashboard: Burger menu (opens menu)
    └── Suggestions/Results: X icon (clears search)
```

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/      # Basic UI elements
│   ├── molecules/  # Composed from atoms  
│   ├── organisms/  # Complex components
│   ├── templates/  # Page layouts
│   └── pages/      # Complete screens
├── stores/         # Zustand state management
│   ├── index.ts    # Main store with middleware
│   ├── slices/     # Map, Search, UI state slices
│   ├── selectors/  # Atomic selectors
│   └── types.ts    # TypeScript interfaces
└── lib/
    └── ui/
        └── tokens.ts  # Design tokens
```

## 🚀 Component Creation Guidelines

### Creating a New Atom

```typescript
// src/components/atoms/MyAtom.tsx
'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';

interface MyAtomProps {
  // Props definition
}

export function MyAtom({ ...props }: MyAtomProps) {
  // Use only design tokens, no component imports, no store access
  return <div>...</div>;
}
```

### Creating a New Molecule

```typescript
// src/components/molecules/MyMolecule.tsx
'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';
// Import only atoms - NO molecule imports allowed!

interface MyMoleculeProps {
  title: string;
  onClick?: () => void;
  theme?: 'Light' | 'Dark';
}

export function MyMolecule({ title, onClick, theme = 'Light' }: MyMoleculeProps) {
  // Can only import design tokens, no molecule dependencies
  const isLight = theme === 'Light';
  
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: isLight ? tokens.colors.background.primary : 'rgba(255,255,255,0.06)',
        borderRadius: tokens.borders.radius.lg,
        padding: tokens.spacing[4],
      }}
    >
      <h3 style={{
        color: isLight ? tokens.colors.text.primary : tokens.colors.text.inverse,
        fontSize: tokens.typography.fontSize.lg,
        fontWeight: tokens.typography.fontWeight.semibold,
      }}>
        {title}
      </h3>
    </div>
  );
}
```

### Creating a New Organism with Store Access

```typescript
// src/components/organisms/MyOrganism.tsx
'use client';

import React from 'react';
import { Button, Text } from '@/components/atoms';
import useStore from '@/stores';
import { useActions } from '@/stores';

export function MyOrganism() {
  // Atomic selectors - only re-render when specific data changes
  const query = useStore((state) => state.search.query);
  const actions = useActions();
  
  return (
    <div>
      <Text>{query}</Text>
      <Button onClick={() => actions.performSearch('test')}>Search</Button>
    </div>
  );
}
```

### Creating a New Page

```typescript
// src/components/pages/MyPage.tsx
'use client';

import React from 'react';
import { MyOrganism } from '@/components/organisms';
import useStore from '@/stores';

export function MyPage() {
  const ui = useStore((state) => state.ui);
  
  return (
    <div className="min-h-full bg-background-primary">
      <MyOrganism />
    </div>
  );
}
```

## 🗺️ State Management

### Zustand Store - Single Source of Truth

```typescript
// All state through Zustand store
import useStore from '@/stores';
import { useActions } from '@/stores';

// Atomic selectors - only re-render when specific data changes
const search = useStore((state) => state.search);
const ui = useStore((state) => state.ui);
const map = useStore((state) => state.map);
const actions = useActions();

// Navigate to screen
ui.navigateTo(ScreenType.SEARCH_RESULTS);

// Never manage state locally when it exists in store
// ❌ const [currentScreen, setCurrentScreen] = useState();
```

### Store Architecture

The Zustand store is organized into slices:

- **Map Slice**: Map instance, markers, center, zoom, direct map control
- **Search Slice**: Query, suggestions, results, history with debounced operations
- **UI Slice**: Navigation, bottom sheet state, screen transitions
- **Cross-Slice Actions**: Complex workflows that coordinate multiple slices

### Atomic Selector Best Practices

```typescript
// ✅ CORRECT - Atomic selectors for performance
const query = useStore((state) => state.search.query);
const currentScreen = useStore((state) => state.ui.currentScreen);
const markers = useStore((state) => state.map.markers);

// ❌ WRONG - Subscribes to entire store
const store = useStore();
const query = store.search.query;
```

### Cross-Slice Actions

```typescript
// Use actions for complex workflows
const { performSearch, selectLocation, focusSearchBar } = useActions();

// Performs coordinated updates across search, UI, and map
await performSearch('restaurants near me');
```

### Store Persistence

```typescript
// Search history and UI preferences automatically persist
// Configure in src/stores/index.ts:
persist(
  // ...store slices
  {
    name: 'mapgl-app-storage',
    partialize: (state) => ({
      search: { history: state.search.history },
      ui: { currentScreen: state.ui.currentScreen }
    })
  }
)
```

## 🎯 Styling Best Practices

### CSS Classes

```typescript
// ✅ Use Tailwind utilities with design token classes
className="bg-background-secondary p-4 rounded-lg"

// ✅ Use design token CSS variables
style={{ backgroundColor: tokens.colors.background.secondary }}

// ❌ Never use hardcoded values
style={{ backgroundColor: '#F1F1F1' }}
```

### Component Styling

1. Use Tailwind utilities where possible
2. Reference design tokens for all values
3. Avoid `!important` declarations
4. Keep specificity low
5. Remove unused styles regularly

## 🏛️ Common Patterns

### Map Operations

```typescript
// Always use Zustand store
const map = useStore((state) => state.map);
const actions = useActions();

// Add marker
await map.addMarker('marker-id', [lng, lat]);

// Center map
map.instance.setCenter([lng, lat], { duration: 300 });

// Clean up
map.clearMarkers();

// Cross-slice actions for complex workflows
await actions.performSearch('restaurants'); // Updates search, UI, and map
```

### Bottom Sheet Integration

```typescript
// All screens wrapped in BottomSheet through MobileMapShell
// Zustand manages bottom sheet state and screen-specific backgrounds
const ui = useStore((state) => state.ui);
const currentScreen = ui.currentScreen;

// Search results uses secondary background
headerBackground={currentScreen === ScreenType.SEARCH_RESULTS ? tokens.colors.background.secondary : 'white'}
contentBackground={currentScreen === ScreenType.SEARCH_RESULTS ? tokens.colors.background.secondary : 'white'}
```

## ⚠️ Critical Rules

### Never Do This

- ❌ Import from higher atomic levels
- ❌ Use hardcoded colors or spacing
- ❌ Manage state outside Zustand store
- ❌ Create circular dependencies
- ❌ Nest buttons inside buttons
- ❌ Use more than 3 levels of DOM nesting
- ❌ Add complex animations without purpose
- ❌ Use `any` types in store slices
- ❌ Bypass atomic selectors with `.getState()`

### Always Do This

- ✅ Follow atomic design hierarchy
- ✅ Use design tokens for all styling
- ✅ Use Zustand atomic selectors for performance
- ✅ Keep components single-responsibility
- ✅ Use TypeScript strictly (no `any` without justification)
- ✅ Clean up resources in useEffect
- ✅ Handle loading and error states
- ✅ Use cross-slice actions for complex workflows
- ✅ Call `map.destroy()` in cleanup

## 🐛 Known Issues & Solutions

| Problem | Solution |
|---------|----------|
| Hydration mismatch | Use dynamic imports with `ssr: false` for client-only components |
| Map not cleaning up | Always call `map.destroy()` in cleanup |
| Bottom sheet not dragging | Check react-modal-sheet v4.4.0 installed |
| Phantom borders | Use consistent background colors through props |
| Atomic design violations | Never import molecules from other molecules - use design tokens only |
| Theme inconsistency | Always use 'Light'/'Dark' format, not 'light'/'dark' |
| Hardcoded styling | Replace ALL hardcoded values with tokens.* references |

## 🎯 Atomic Design Best Practices

### ✅ Do This
- Import only design tokens in molecules: `import { tokens } from '@/lib/ui/tokens'`
- Use 'Light'/'Dark' theme format consistently
- All colors: `tokens.colors.*`, spacing: `tokens.spacing[*]`, typography: `tokens.typography.*`
- Follow exact Figma specifications from Dev Mode
- Test visual verification after changes
- Document fixes in separate markdown files

### ❌ Never Do This
- Import molecules from other molecules
- Use hardcoded colors, spacing, or font sizes
- Mix 'light'/'dark' with 'Light'/'Dark' theme formats
- Skip visual verification after component changes
- Commit without running type-check and lint

## 📝 Code Quality Standards

### TypeScript Requirements

```typescript
// ✅ Proper typing
interface Props {
  title: string;
  onClick: () => void;
}

// ❌ Avoid any
const data: any = fetch();
```

### Component Requirements

- Must be client components (`'use client'`)
- Props must have TypeScript interfaces
- Must handle edge cases (empty states, errors)
- Follow naming conventions (PascalCase for components)

## 🔄 Git Workflow

```bash
# Branch naming
feature/feature-name
fix/bug-description
refactor/component-name

# Commit messages
feat: add new component with Zustand integration
fix: resolve hydration error
refactor: migrate to Zustand store
docs: update README with Zustand architecture
```

## 🧪 Testing Status

**Currently Removed**: All tests have been temporarily removed from this project to allow for a clean refactor. This includes:

- All test files (`*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx`)
- Test configuration files (`jest.config.js`, `jest.setup.js`, `playwright.config.ts`)
- Test dependencies (`@testing-library/*`, `jest`, `@playwright/test`, etc.)
- Test scripts in `package.json`

**Preserved**: All code quality tools remain operational:
- ✅ ESLint (`npm run lint`)
- ✅ TypeScript type checking (`npm run type-check`)
- ✅ Prettier formatting (`npm run format`)
- ✅ Git pre-commit hooks
- ✅ Build process (`npm run build`)

**Future Plan**: Tests will be rewritten using modern testing patterns that align with the atomic design architecture.

## 📚 Quick Reference

### File Naming
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Types: `types.ts` or `ComponentName.types.ts`

### Import Order
1. React imports
2. External libraries
3. Store imports (useStore, useActions)
4. Atoms
5. Molecules
6. Organisms
7. Templates
8. Utils and hooks
9. Types

### Performance Guidelines
- Lazy load heavy components
- Use atomic selectors to prevent unnecessary re-renders
- Memoize expensive calculations with React.useMemo
- Use React.memo for pure components
- Leverage Zustand's selective subscriptions
- Direct map operations bypass React reconciliation
- Optimize images with Next.js Image
- Minimize bundle size (Zustand adds only 8KB)