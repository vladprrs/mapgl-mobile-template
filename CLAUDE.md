# 2GIS MapGL Mobile App - Development Guidelines

## 🏗️ Atomic Design Architecture

This codebase follows **Atomic Design** principles strictly. Components are organized in a hierarchy where each level can only depend on levels below it.

### 🚀 Recent Migration Progress

**COMPLETED**: Atomic design migration and comprehensive app functionality
- ✅ **MetaItem** - Category search cards (116px height)
- ✅ **MetaItemAd** - Sponsored content cards with gradient
- ✅ **Cover** - Collection covers (116px/244px variants)
- ✅ **Interesting** - Feature promotion cards (244px double height)
- ✅ **RD** - Business advertiser cards with gallery (244px double height)
- ✅ **Empty Search State** - Complete implementation with three sections
  - ✅ **RecommendationCard** - 88×96px cards for horizontal recommendations
  - ✅ **RecommendationsSection** - Horizontal scrollable recommendations
  - ✅ **SearchHistoryItem** - Search history with SuggestRow pattern
  - ✅ **SearchHistorySection** - History with default suggestions for new users
  - ✅ **CityHighlightsSection** - Reuses Cover molecule for featured content
- ✅ **SearchResultCard** - Complete search result organism with friends integration
  - ✅ **FriendAvatars** - Pixel-perfect overlapping avatars with Figma assets
  - ✅ **ZMKBlock** - Advertising block for non-advertiser cards
- ✅ **Organization Details System** - Complete organization page implementation
  - ✅ **OrganizationPage** - Full page with tab navigation and content sections
  - ✅ **OrganizationHeader** - Expanded/collapsed states with smooth transitions
  - ✅ **OrganizationTabs** - Horizontal scrollable tabs with counters and gradients
  - ✅ **OrganizationSlice** - Zustand state management for organization data
- ✅ **MastersNearbyCard** - Service professionals with ratings and galleries
- ✅ **Bottom Sheet Improvements** - Enhanced navigation and positioning
  - ✅ Search pages now open in expanded state (90%) by default
  - ✅ Fixed OrganizationTabs positioning to eliminate unwanted spacing
  - ✅ Consistent snap behavior across all screens
- ✅ **Address & Master Details Pages** - Complete address and service professional pages
  - ✅ **AddressPage** - Simplified address details with tabs (Обзор, Мастера)
  - ✅ **MasterDetailsPage** - Complete master profiles with reviews and contact info
  - ✅ **MastersListPage** - Full masters list with navigation from search results
  - ✅ **ContactInfo** - Comprehensive contact component from Figma (node-id 322-78232)
- ✅ **Friends Section Debugging** - Playwright-assisted debugging and fixes
  - ✅ Fixed data flow from mock sources to search results
  - ✅ Corrected avatar paths to use extracted Figma assets
  - ✅ Verified 24×24px rounded avatars with 50% overlap and proper z-index

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

### Empty Search State Components
- **Horizontal Recommendations**: node-id `286-221899` - 88×96px cards with icons
- **Search History Section**: node-id `286-221965` - White rounded container with history items
- **City Highlights Section**: node-id `286-222026` - Featured collections using Cover molecule
- **Complete Layout**: node-id `289-222256` - Two-zone background layout (white/gray)

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
│   ├── atoms/          # Basic UI elements (Button, Icon, FilterChip, RatingStars)
│   ├── molecules/      # Composed from atoms (SearchInput, FriendAvatars, ContactInfo)
│   ├── organisms/      # Complex components (SearchBar, OrganizationHeader, MastersNearbyCard)
│   ├── templates/      # Page layouts (MobileMapShell, ScreenRenderer)
│   └── pages/          # Complete screens (DashboardPage, AddressPage, MasterDetailsPage)
├── stores/             # Zustand state management
│   ├── index.ts        # Main store with middleware
│   ├── slices/         # Map, Search, UI, Organization state slices
│   │   ├── mapSlice.ts
│   │   ├── searchSlice.ts
│   │   ├── uiSlice.ts
│   │   ├── organizationSlice.ts
│   │   └── actions.ts  # Cross-slice actions
│   ├── selectors/      # Atomic selectors
│   └── types.ts        # TypeScript interfaces
├── __mocks__/          # Mock data for development
│   ├── search/         # Search results and suggestions
│   └── masters/        # Service professionals data
├── assets/             # Static assets and Figma exports
│   └── figma/          # Extracted Figma assets
└── lib/
    └── ui/
        └── tokens.ts   # Design tokens
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

// Auto-expand behavior for different screens
switch (currentScreen) {
  case ScreenType.SEARCH_SUGGESTIONS:
  case ScreenType.SEARCH_RESULTS:
  case ScreenType.ORGANIZATION_DETAILS:
    // Automatically expand to 90% for better content visibility
    targetSnap = 90;
    break;
  case ScreenType.DASHBOARD:
  default:
    // Keep at 50% for dashboard
    targetSnap = 50;
    break;
}

// Search results and organization details use secondary background
headerBackground={currentScreen === ScreenType.SEARCH_RESULTS || currentScreen === ScreenType.ORGANIZATION_DETAILS 
  ? tokens.colors.background.secondary : 'white'}
contentBackground={currentScreen === ScreenType.SEARCH_RESULTS || currentScreen === ScreenType.ORGANIZATION_DETAILS 
  ? tokens.colors.background.secondary : 'white'}
```

### Empty Search State Pattern

```typescript
// Two-zone layout implementation for empty search state
if (query.length === 0) {
  return (
    <div className="flex flex-col h-full">
      {/* White zone - Recommendations */}
      <div className="bg-white pb-4 pt-2 shrink-0">
        <RecommendationsSection />
      </div>
      
      {/* Gray zone - History + City Highlights */}
      <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#f1f1f1' }}>
        <div className="pt-4">
          <SearchHistorySection showHeader={false} />
        </div>
        <CityHighlightsSection />
      </div>
    </div>
  );
}
```

### Friends Section Pattern

```typescript
// FriendAvatars molecule with pixel-perfect Figma specifications
<FriendAvatars 
  friends={friendsVisited.friends}
  maxVisible={4}
  size={24}
  theme="Light"
  showRating={true}
/>

// SearchResultCard integration with conditional friends display
{friendsVisited && (
  <div style={{
    paddingBottom: tokens.spacing[1], // 4px bottom padding
    paddingTop: 0,
  }}>
    <FriendAvatars 
      friends={friendsVisited.friends}
      maxVisible={4}
      size={24}
      theme="Light"
      showRating={true}
    />
  </div>
)}

// Mock data structure for friends
friendsVisited: {
  friends: [
    { id: '1', name: 'Александр', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' },
    { id: '2', name: 'Мария', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' }
  ],
  rating: 5.0
}
```

### Friends Section Debugging Pattern

```typescript
// Use Playwright for debugging component visibility issues
// 1. Check DOM structure and data flow
const searchResults = await page.evaluate(() => {
  const searchResultsList = document.querySelector('[role="list"]');
  const fiberKey = Object.keys(searchResultsList).find(key => key.startsWith('__reactFiber'));
  const fiber = searchResultsList[fiberKey];
  return fiber.memoizedProps.results; // Access React component props
});

// 2. Verify avatar images and friends data
const avatarDetails = await page.evaluate(() => {
  const friendAvatars = document.querySelectorAll('img[alt*="Елена"], img[alt*="Дмитрий"]');
  return Array.from(friendAvatars).map(img => ({
    alt: img.alt,
    src: img.src,
    width: img.width,
    height: img.height
  }));
});

// 3. Common data flow issues to check:
// - Mock data source: Ensure search slice imports from correct mock file
// - Avatar paths: Use '/avatars/' not '/assets/' for Figma-extracted images  
// - Friends property: Verify 'friendsVisited' exists in search result data
// - Component rendering: Check conditional rendering logic in SearchResultCard
```

### ContactInfo Pattern

```typescript
// ContactInfo molecule for comprehensive contact functionality
<ContactInfo
  phone={master.phone}
  messengers={master.messengers}
  website={master.website}
  socialMedia={master.socialMedia}
/>

// Master data structure with contact information
interface Master {
  phone?: string;
  messengers?: {
    telegram?: string;  // '@username' or phone number
    whatsapp?: string;  // Phone number format
    viber?: string;     // Phone number format
  };
  website?: string;     // Domain or full URL (auto HTTPS prefix)
  socialMedia?: {
    vk?: string;        // Full VK URL
    youtube?: string;   // Full YouTube URL
    twitter?: string;   // Full Twitter URL
    facebook?: string;  // Full Facebook URL
    google?: string;    // Google Business URL
  };
}

// Usage in MasterDetailsPage
export function MasterDetailsPage() {
  const currentMaster = useStore((state) => state.organization.currentOrganization) as Master;
  
  return (
    <div>
      <MasterDetailsHeader master={currentMaster} />
      
      {/* Contact Info - replaces floating call button */}
      <ContactInfo
        phone={currentMaster.phone}
        messengers={currentMaster.messengers}
        website={currentMaster.website}
        socialMedia={currentMaster.socialMedia}
      />
      
      {/* Other sections... */}
    </div>
  );
}

// Features:
// - 📞 Direct phone calls with tel: links
// - 💬 Smart messenger URL handling (Telegram @username, WhatsApp/Viber numbers)
// - 🌐 Auto HTTPS prefix for websites
// - 📱 Horizontal scrollable social media buttons with platform colors
// - 🎯 Pixel-perfect Figma design match (node-id 322-78232)
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
| ~~Friends section not showing~~ | ✅ **FIXED**: Mock data and avatar paths correctly configured |
| ~~Avatar images not loading~~ | ✅ **FIXED**: All Figma assets extracted to `public/avatars/` |
| ~~Friends data missing in search results~~ | ✅ **FIXED**: Updated mock data with `friendsVisited` property |
| ~~OrganizationTabs spacing issues~~ | ✅ **FIXED**: Removed hardcoded positioning, proper sticky behavior |
| ~~Search pages opening at 50%~~ | ✅ **FIXED**: Search screens now open at 90% (expanded) by default |

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