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
- ✅ **Cart & Checkout System** - Complete shopping cart functionality
  - ✅ **CartNavbar** - Fixed-position overlay with maximum z-index (2,147,483,647)
  - ✅ **Global Cart State** - Zustand cart slice with persistent storage
  - ✅ **CheckoutItemCard** - Pixel-perfect checkout item display (node-id 337-225744)
  - ✅ **Cart Integration** - ProductsCarousel connected to global cart state
  - ✅ **Overlay Positioning** - CartNavbar positioned OVER BottomSheet at template level
- ✅ **OrganizationHeader Improvements** - Enhanced organization page header
  - ✅ **Removed duplicate drag handle** - OrganizationHeader no longer renders own drag handle
  - ✅ **RatingStars integration** - Replaced custom star implementation with RatingStars atom
  - ✅ **Crown badge for advertisers** - Golden crown icon for organizations with `isAdvertiser: true`
  - ✅ **Integrated OrganizationTabs** - Tabs now part of header for seamless scroll behavior
  - ✅ **Fixed gradient directions** - Proper fade-out effects at tab scroll edges
  - ✅ **AD block for advertisers** - Advertising disclaimer block with proper styling
  - ✅ **Enhanced contact integration** - Replaced custom contact buttons with ContactInfo molecule
- ✅ **OrganizationPage Enhancements** - Complete organization detail page improvements
  - ✅ **Secondary background** - Content area uses `tokens.colors.background.secondary` (#F1F1F1)
  - ✅ **ContactInfo molecule integration** - Standardized contact functionality with proper typing
  - ✅ **Seamless header-tabs integration** - Single scrolling unit eliminates positioning jumps
  - ✅ **Enhanced mock data** - Full contact information (phone, messengers, website, social media)
- ✅ **AddressCard Molecule** - Complete address display component for organization pages
  - ✅ **Address display** - Shows full address with distance/travel time information
  - ✅ **Navigation integration** - 40×40px navigate button with custom navigation icon
  - ✅ **Design compliance** - Follows Figma specifications with proper spacing and styling
  - ✅ **Atomic design** - Proper molecule-level component using only atoms and design tokens
- ✅ **ContactInfo Debugging & Verification** - Comprehensive Playwright-assisted investigation
  - ✅ **Component functionality verified** - ContactInfo displays correctly with proper data flow
  - ✅ **Mock data enhancement** - Added comprehensive contact information to all organizations
  - ✅ **Test infrastructure** - Added data-testid attributes for automated testing
  - ✅ **Conditional rendering** - Component properly handles missing contact data
  - ✅ **Visual verification** - Screenshots and DOM inspection confirm proper rendering
- ✅ **Conditional Tab Display Logic** - Category-based tab system for organization pages
  - ✅ **Food establishment detection** - 20+ food-related categories (Russian/English) with flexible matching
  - ✅ **Smart tab rendering** - Food establishments show "Меню" tab, others show "Цены" tab
  - ✅ **Enhanced tab content** - MenuTabContent with dish pricing, PricesTabContent with service pricing
  - ✅ **Auto-reset functionality** - Switches to overview tab when changing organizations
  - ✅ **Debug support** - Console logging for category detection verification
  - ✅ **Performance optimized** - Efficient substring matching with multilingual support
- ✅ **Product-to-Category Aliasing System** - Complete smart search functionality for natural product queries
  - ✅ **Comprehensive Product Mapping** - 200+ product terms across 6 major categories (electronics, grocery, medical, pharmacy, auto, beauty)
  - ✅ **Smart Search Logic** - Enhanced search slice with product detection and category-based filtering
  - ✅ **Search Context Display** - Blue banner UI showing search context ("Показаны магазины, где можно купить [product]")
  - ✅ **Product Suggestions** - New suggestion type for product-based search recommendations
  - ✅ **Natural Language Queries** - Users can search "молоко" to find grocery stores, "перфоратор" for electronics stores
  - ✅ **Performance Optimized** - Reverse index for fast product-to-category lookup
  - ✅ **TypeScript Integration** - Full type safety with enhanced SearchSuggestion and SearchContext types
  - ✅ **Multilingual Support** - Russian product terms with extensible architecture for additional languages
  - ✅ **Playwright Testing** - Comprehensive testing verified correct functionality for multiple product categories

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

## 🔍 Product-to-Category Aliasing System

### Smart Search Architecture

The product aliasing system enables natural language product searches by mapping product terms to relevant store categories. Users can search for products like "молоко", "перфоратор", or "врач" and automatically find appropriate stores.

### File Structure

```
src/__mocks__/search/
├── productAliases.ts          # Product-to-category mappings
├── suggestions.ts             # Enhanced with product suggestions
└── searchResultsByQuery.ts    # Query-specific results
```

### Product Categories

The system supports 6 major categories with 200+ product terms:

- **Electronics**: перфоратор, дрель, телевизор, ноутбук, холодильник
- **Grocery**: молоко, хлеб, мясо, овощи, фрукты
- **Medical**: врач, анализы, узи, справка, консультация
- **Pharmacy**: лекарство, витамины, бинт, градусник
- **Auto**: шиномонтаж, масло, тормозные колодки, аккумулятор
- **Beauty**: стрижка, маникюр, массаж, эпиляция

### Implementation Pattern

```typescript
// Product search detection in searchSlice.ts
const matchedCategories = getMatchingCategories(query);
if (matchedCategories.length > 0) {
  // Product search found - filter organizations by category
  const orgCategories = getOrganizationCategories(matchedCategories);
  results = allOrganizations.filter(org => 
    orgCategories.includes(org.category)
  );
  
  // Set search context for UI display
  searchContext = {
    type: 'product_search',
    query: query,
    categories: matchedCategories,
    message: `Показаны магазины, где можно купить "${query}"`
  };
}
```

### Search Context Display

```typescript
// SearchResultsPage.tsx - Product search banner
{searchContext?.type === 'product_search' && (
  <div className="bg-blue-50 p-3 mx-4 mb-2 rounded-lg border border-blue-200">
    <Text className="text-sm text-blue-700 font-medium">
      {searchContext.message}
    </Text>
    {searchContext.categories && (
      <Text className="text-xs text-blue-600 mt-1">
        Категории: {searchContext.categories.map(cat => 
          categoryDisplayNames[cat] || cat
        ).join(', ')}
      </Text>
    )}
  </div>
)}
```

### Product Suggestions

```typescript
// Enhanced suggestions with product type
export interface ProductSuggestion {
  id: string;
  type: 'product';
  text: string;
  subtitle: string;
  category: string;
  productCategories: string[];
  count: number;
}

// Popular products auto-generated as suggestions
const popularProducts = [
  'молоко', 'хлеб', 'мясо', 'телевизор', 'холодильник', 
  'перфоратор', 'врач', 'стрижка', 'маникюр', 'шиномонтаж'
];
```

### Performance Optimization

```typescript
// Reverse index for fast product lookup
export const buildProductIndex = (): Map<string, string[]> => {
  const index = new Map<string, string[]>();
  
  Object.entries(productAliases).forEach(([category, products]) => {
    products.forEach(product => {
      const key = product.toLowerCase();
      if (!index.has(key)) {
        index.set(key, []);
      }
      index.get(key)!.push(category);
    });
  });
  
  return index;
};
```

### Usage Examples

```typescript
// Example searches and expected results:

// Grocery search
await performSearch('молоко');
// Results: Пятёрочка, Магнит, ВкусВилл, Перекрёсток
// Context: "Показаны магазины, где можно купить 'молоко'"
// Categories: "Продуктовые магазины"

// Electronics search  
await performSearch('перфоратор');
// Results: Техносила, DNS, М.Видео
// Context: "Показаны магазины, где можно купить 'перфоратор'"
// Categories: "Электроника и техника"

// Medical search
await performSearch('врач');
// Results: СМ-Клиника, Поликлиника №1, медицинские центры
// Context: "Показаны магазины, где можно купить 'врач'"
// Categories: "Медицинские услуги"
```

### Extension Guidelines

To add new product categories:

1. **Add products to productAliases.ts**:
```typescript
export const productAliases = {
  // ... existing categories
  'books': ['книга', 'учебник', 'роман', 'детектив'],
};
```

2. **Map to organization categories**:
```typescript
export const categoryToOrganizationMap = {
  // ... existing mappings
  'books': ['Книжный магазин', 'Библиотека'],
};
```

3. **Add display names**:
```typescript
export const categoryDisplayNames = {
  // ... existing names
  'books': 'Книжные магазины',
};
```

### Debugging Support

- **Console logging**: Search detection logs to browser console
- **Search context**: Visual banner shows detected categories
- **Type safety**: Full TypeScript support prevents runtime errors
- **Playwright testing**: Automated verification of search functionality

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

### OrganizationHeader Pattern

```typescript
// Enhanced OrganizationHeader with integrated tabs and improved features
<OrganizationHeader 
  isCollapsed={isHeaderCollapsed}
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>

// OrganizationHeader structure after improvements:
OrganizationHeader
  ├── Friends avatars (FriendAvatars molecule)
  ├── Title with crown badge (for advertisers: isAdvertiser === true)
  ├── Rating stars (RatingStars atom - replaces custom implementation)
  ├── Travel time with icon
  ├── Address line
  ├── Work hours with traffic.heavy color for warnings
  ├── AD block (for advertisers only)
  └── OrganizationTabs (integrated, not separate)

// Key improvements:
// - No duplicate drag handle (handled by BottomSheet)
// - Crown badge: Golden crown SVG for advertiser organizations
// - RatingStars: Proper atom usage instead of custom stars
// - Tabs integration: Seamless scrolling with proper gradients
// - AD block: Advertiser disclaimer with proper styling
```

### AddressCard Pattern

```typescript
// AddressCard molecule for displaying address information with navigation
<AddressCard
  address={organization.address}
  distance={organization.distance}
  travelTime={organization.travelTime}
  onNavigate={() => {
    // TODO: Open navigation/map functionality
    console.log('Navigate to:', organization.address);
  }}
/>

// AddressCard Props Interface
interface AddressCardProps {
  address: string;        // Full address string
  distance?: string;      // Distance from current location (e.g., "2 мин", "850 м")
  travelTime?: string;    // Travel time (optional, can be same as distance)
  onNavigate?: () => void; // Navigation callback function
}

// Usage in OrganizationPage Overview tab
function OverviewTabContent({ organization }: { organization: SearchResult }) {
  const handleNavigate = () => {
    // TODO: Integrate with map navigation system
    console.log('Navigate to:', organization.address);
  };

  return (
    <div className="space-y-6">
      {/* Address Card Section */}
      <div>
        <h2>Адрес</h2>
        <AddressCard
          address={organization.address}
          distance={organization.distance}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  );
}

// Features:
// - 🏠 Clean address display with proper typography
// - 📍 Distance/travel time information in secondary color
// - 🧭 40×40px navigation button with custom icon
// - 🎯 White background with rounded corners (tokens.borders.radius.lg)
// - 📱 16px padding (tokens.spacing[4]) for proper spacing
// - ♿ Accessible navigation button with aria-label
// - 🏗️ Follows atomic design - uses only atoms and design tokens
```

### ContactInfo Pattern

```typescript
// ContactInfo molecule for comprehensive contact functionality
// Now integrated into OrganizationPage replacing custom contact buttons
<ContactInfo
  phone={organization.phone}
  messengers={organization.messengers}
  website={organization.website}
  socialMedia={organization.socialMedia}
/>

// Organization/Master data structure with contact information (unified)
interface SearchResult {
  // ... other fields
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

// Usage in OrganizationPage (replaces custom contact buttons)
function OverviewTabContent({ organization }: { organization: SearchResult }) {
  return (
    <div className="space-y-6">
      {/* Contact Section */}
      <div>
        <h2>Контакты</h2>
        <ContactInfo
          phone={organization.phone}
          messengers={organization.messengers}
          website={organization.website}
          socialMedia={organization.socialMedia}
        />
      </div>
    </div>
  );
}

// Also used in MasterDetailsPage
export function MasterDetailsPage() {
  const currentMaster = useStore((state) => state.organization.currentOrganization);
  
  return (
    <div>
      <MasterDetailsHeader master={currentMaster} />
      <ContactInfo
        phone={currentMaster.phone}
        messengers={currentMaster.messengers}
        website={currentMaster.website}
        socialMedia={currentMaster.socialMedia}
      />
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

### CheckoutItemCard Pattern

```typescript
// CheckoutItemCard organism for cart and checkout functionality
<CheckoutItemCard
  id="item-1"
  image="/assets/figma/8441c3055b3f38c931e05b652aacb578fe48a2b8.png"
  title="Спортивная бутылка с ситечком Арктика 500 мл чёрная матовая"
  weight="60 г"
  quantity={1}
  price={120}
  oldPrice={150}
  onQuantityChange={handleQuantityChange}
/>

// CheckoutItemCard Props Interface
interface CheckoutItemCardProps {
  id: string;
  image: string;          // Product image URL
  title: string;          // Product title (max 2 lines with ellipsis)
  weight?: string;        // Optional weight/size display
  quantity: number;       // Current quantity in cart
  price: number;          // Current price per item
  oldPrice?: number;      // Optional strikethrough price
  onQuantityChange: (id: string, quantity: number) => void;
}

// Usage in cart/checkout pages
export function CartPage() {
  const cartItems = useStore((state) => state.cart.cart.items);
  const updateQuantity = useStore((state) => state.cart.updateQuantity);
  
  const handleQuantityChange = useCallback((id: string, quantity: number, price: number) => {
    updateQuantity(id, quantity, price);
  }, [updateQuantity]);
  
  return (
    <div className="space-y-4">
      {Array.from(cartItems.entries()).map(([productId, quantity]) => {
        const product = getProductById(productId); // Get product details
        return (
          <CheckoutItemCard
            key={productId}
            id={productId}
            image={product.image}
            title={product.title}
            weight={product.weight}
            quantity={quantity}
            price={product.price}
            oldPrice={product.oldPrice}
            onQuantityChange={(id, qty) => handleQuantityChange(id, qty, product.price)}
          />
        );
      })}
    </div>
  );
}

// Features:
// - 📦 106×106px product image with border (rgba(137,137,137,0.3))
// - 📝 2-line title truncation with proper typography (SB Sans Text 14px)
// - ⚖️ Optional weight/size display (14px gray text)
// - 🔢 Quantity controls with decrease/increase buttons (min quantity: 1)
// - 💰 Price display with optional strikethrough old price
// - 🧮 Automatic total calculation (price × quantity)
// - 🎯 Pixel-perfect Figma design match (node-id 337-225744)
// - ♿ Accessible button controls with proper alt texts
// - 🏗️ Follows atomic design hierarchy (organism level)
```

### Conditional Tab Display Pattern

```typescript
// Conditional tab display based on organization category in OrganizationPage
// Define comprehensive food-related categories for tab logic
const FOOD_CATEGORIES = [
  'ресторан', 'кафе', 'бар', 'кофе', 'пекарня', 'фастфуд', 'пицца', 'пиццерия', 'суши', 
  'столовая', 'буфет', 'закусочная', 'бистро', 'паб', 'таверна', 'кофейня',
  'restaurant', 'cafe', 'bar', 'coffee', 'bakery', 'fastfood', 'pizza', 'sushi', 
  'canteen', 'buffet', 'bistro', 'pub', 'tavern', 'coffee shop'
];

// Smart category detection with flexible substring matching
const isFoodEstablishment = organization ? FOOD_CATEGORIES.some(category => 
  organization.category?.toLowerCase().includes(category.toLowerCase())
) : false;

// Dynamic tab configuration based on organization type
const tabs: TabItem[] = [
  { id: 'overview', label: 'Обзор' },
  { id: 'reviews', label: 'Отзывы', count: organization?.reviewCount },
  
  // Conditional tab: Menu for food, Prices for everything else
  isFoodEstablishment 
    ? { id: 'menu', label: 'Меню', count: 213 }
    : { id: 'prices', label: 'Цены' },
    
  { id: 'photos', label: 'Фото', count: 432 },
  { id: 'info', label: 'Инфо' },
  { id: 'promotions', label: 'Акции' },
];

// Conditional content rendering
{activeTab === 'menu' && <MenuTabContent />}
{activeTab === 'prices' && <PricesTabContent />}

// Auto-reset to overview when organization changes
useEffect(() => {
  if (organization) {
    setActiveTab('overview');
  }
}, [organization?.id, setActiveTab]);

// Debug logging for category detection (development)
useEffect(() => {
  if (organization) {
    console.log(`Organization "${organization.name}" - Category: "${organization.category}" - Food establishment: ${isFoodEstablishment}`);
  }
}, [organization, isFoodEstablishment]);

// Category mapping examples:
// Food establishments → "Меню" tab:
// - "Ресторан европейской кухни" → Menu
// - "Пиццерия" → Menu  
// - "Кофейня" → Menu
// - "Кафе" → Menu

// Non-food establishments → "Цены" tab:
// - "Магазин цифровой техники" → Prices
// - "Медицинская лаборатория" → Prices
// - "Автосервис" → Prices
// - "Салон красоты" → Prices

// Features:
// - 🔍 Flexible detection: Substring matching catches variations
// - 🌐 Multilingual support: Russian and English categories
// - 📱 Responsive design: Content adapts to organization type
// - 🔄 Auto-reset: Switches to overview on organization change
// - 🐛 Debug support: Console logging for verification
// - ⚡ Performance: Efficient category matching with short-circuit evaluation
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
| ~~OrganizationHeader duplicate drag handle~~ | ✅ **FIXED**: Removed duplicate drag handle, BottomSheet handles it |
| ~~Custom rating stars implementation~~ | ✅ **FIXED**: Replaced with RatingStars atom for consistency |
| ~~OrganizationTabs positioning jumps~~ | ✅ **FIXED**: Integrated tabs into header for seamless scroll |
| ~~Tab gradient directions backwards~~ | ✅ **FIXED**: Proper fade-out effects at scroll edges |
| ~~Custom contact button implementations~~ | ✅ **FIXED**: Replaced with ContactInfo molecule across pages |
| ~~ContactInfo not displaying in organization pages~~ | ✅ **FIXED**: Added comprehensive contact data to all mock organizations |
| ~~Missing address navigation functionality~~ | ✅ **FIXED**: Implemented AddressCard molecule with navigation button |

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