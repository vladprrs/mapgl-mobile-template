# 2GIS MapGL Mobile App - Development Guidelines

## 🏗️ Atomic Design Architecture

This codebase follows **Atomic Design** principles strictly. Components are organized in a hierarchy where each level can only depend on levels below it.

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
npm test           # Run test suite
```

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

## 📁 Project Structure

```
src/components/
├── atoms/          # Basic UI elements
├── molecules/      # Composed from atoms
├── organisms/      # Complex components
├── templates/      # Page layouts
└── pages/          # Complete screens
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
  // Use only design tokens, no component imports
  return <div>...</div>;
}
```

### Creating a New Molecule

```typescript
// src/components/molecules/MyMolecule.tsx
'use client';

import React from 'react';
import { Button, Text } from '@/components/atoms';

export function MyMolecule() {
  // Can only import from atoms
  return (
    <div>
      <Text>Label</Text>
      <Button>Action</Button>
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

export function MyPage() {
  return (
    <div className="min-h-full bg-background-primary">
      <MyOrganism />
    </div>
  );
}
```

## 🗺️ Navigation State Management

### ScreenManager - Single Source of Truth

```typescript
// All navigation through ScreenManager
const { navigateTo, screenState } = useScreenManager();

// Navigate to screen
navigateTo(ScreenType.SEARCH_RESULTS, searchQuery);

// Never manage navigation state locally
// ❌ const [currentScreen, setCurrentScreen] = useState();
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
// Always use MapProvider
const { map, addMarker, clearMarkers } = useMapContext();

// Add marker
await addMarker('marker-id', [lng, lat]);

// Center map
map.setCenter([lng, lat], { duration: 300 });

// Clean up
clearMarkers();
```

### Bottom Sheet Integration

```typescript
// All screens wrapped in BottomSheet through MobileMapShell
// Search results uses secondary background
headerBackground={screenState.currentScreen === ScreenType.SEARCH_RESULTS ? '#F1F1F1' : 'white'}
contentBackground={screenState.currentScreen === ScreenType.SEARCH_RESULTS ? '#F1F1F1' : 'white'}
```

## ⚠️ Critical Rules

### Never Do This

- ❌ Import from higher atomic levels
- ❌ Use hardcoded colors or spacing
- ❌ Manage navigation state outside ScreenManager
- ❌ Create circular dependencies
- ❌ Nest buttons inside buttons
- ❌ Use more than 3 levels of DOM nesting
- ❌ Add complex animations without purpose

### Always Do This

- ✅ Follow atomic design hierarchy
- ✅ Use design tokens for all styling
- ✅ Keep components single-responsibility
- ✅ Test components in isolation
- ✅ Use TypeScript strictly (no `any` without justification)
- ✅ Clean up resources in useEffect
- ✅ Handle loading and error states

## 🐛 Known Issues & Solutions

| Problem | Solution |
|---------|----------|
| Hydration mismatch | Use dynamic imports with `ssr: false` for client-only components |
| Map not cleaning up | Always call `map.destroy()` in cleanup |
| Bottom sheet not dragging | Check react-modal-sheet v4.4.0 installed |
| Phantom borders | Use consistent background colors through props |

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
- Should be testable in isolation
- Follow naming conventions (PascalCase for components)

## 🔄 Git Workflow

```bash
# Branch naming
feature/feature-name
fix/bug-description
refactor/component-name

# Commit messages
feat: add new component
fix: resolve hydration error
refactor: migrate to atomic design
docs: update README
```

## 🧪 Testing Approach

- Unit tests for atoms and molecules
- Integration tests for organisms
- E2E tests for critical user flows
- Mock external dependencies
- Test error boundaries

## 📚 Quick Reference

### File Naming
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Types: `types.ts` or `ComponentName.types.ts`
- Tests: `ComponentName.test.tsx`

### Import Order
1. React imports
2. External libraries
3. Atoms
4. Molecules
5. Organisms
6. Templates
7. Utils and hooks
8. Types

### Performance Guidelines
- Lazy load heavy components
- Memoize expensive calculations
- Use React.memo for pure components
- Optimize images with Next.js Image
- Minimize bundle size