# 2GIS MapGL Mobile App

A mobile-first map application with a draggable bottom sheet interface, built using Atomic Design principles.

## 🏗️ Architecture

This application follows **Atomic Design** methodology with a clear component hierarchy:
- **Atoms** → **Molecules** → **Organisms** → **Templates** → **Pages**

## 🛠️ Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Zustand** - Lightweight state management (8KB)
- **Tailwind CSS** - Utility-first styling
- **2GIS MapGL** - Interactive map rendering
- **react-modal-sheet** - Bottom sheet functionality
- **Design Tokens** - Centralized style system

## 📁 Project Structure

```
src/
├── app/                       # Next.js app router
├── components/
│   ├── atoms/                # Basic UI elements (Button, Icon, FilterChip, RatingStars)
│   ├── molecules/            # Combinations of atoms (SearchInput, FriendAvatars, ContactInfo)
│   ├── organisms/            # Complex components (SearchBar, OrganizationHeader, MastersNearbyCard)
│   ├── templates/            # Page layouts (MobileMapShell, ScreenRenderer)
│   └── pages/               # Full pages (DashboardPage, AddressPage, MasterDetailsPage)
├── stores/                   # Zustand state management
│   ├── index.ts             # Main store with middleware
│   ├── slices/              # Map, Search, UI, Organization state slices
│   │   ├── mapSlice.ts
│   │   ├── searchSlice.ts
│   │   ├── uiSlice.ts
│   │   ├── organizationSlice.ts
│   │   ├── cartSlice.ts     # Shopping cart state management
│   │   └── actions.ts       # Cross-slice actions
│   ├── selectors/           # Atomic selectors for performance
│   └── types.ts             # TypeScript interfaces
├── lib/
│   └── ui/
│       └── tokens.ts        # Design tokens (colors, spacing, typography)
├── __mocks__/               # Mock data for development
│   ├── search/              # Search results and suggestions
│   └── masters/             # Service professionals data
├── assets/                  # Static assets and Figma exports
│   └── figma/               # Extracted Figma assets
└── public/
    ├── avatars/             # Friend avatars from Figma
    ├── assets/              # Product images and icons
    └── icons/               # UI icons
```

## 🎨 Design Principles

### 1. Atomic Design Hierarchy
- Components can only import from layers below
- Atoms have no dependencies on other components
- Strict separation of concerns at each level

### 2. Design Tokens
- All styling uses centralized tokens from `lib/ui/tokens.ts`
- No hardcoded colors, spacing, or typography values
- Consistent visual language throughout the app

### 3. Zustand State Management
- **Single Store**: All application state in one Zustand store
- **Atomic Selectors**: Components only re-render when specific data changes
- **Cross-Slice Actions**: Coordinated actions across map, search, and UI state
- **Performance Optimized**: Direct map control without React overhead

### 4. Minimal Complexity
- Clean, semantic HTML structure
- No unnecessary animations or wrappers
- Maximum 2-3 levels of DOM nesting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- 2GIS API key

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Set up environment variables
# Create .env.local and add your 2GIS API key:
# NEXT_PUBLIC_2GIS_API_KEY=your_api_key_here
```

### Development

```bash
# Start development server
npm run dev
# Opens at http://localhost:3000
```

### Production Build

```bash
# Create production build
npm run build

# Run production server
npm start
```

## 📝 Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler |
| `npm run format` | Format code with Prettier |

> **⚠️ Testing Status**: Tests are temporarily removed. All test files and configurations have been deleted while preserving code quality tools. Tests will be refactored and rewritten in a future task.

## 🏛️ Component Architecture

### Atoms
Basic building blocks with no dependencies:
- `Button`, `Badge`, `Text`, `Icon`
- `CardContainer`, `Input`

### Molecules
Simple combinations of atoms (recently migrated to atomic design):
- `SearchInput` - Search field with icons, voice assistant integration
- `StoryItem` - Image + text display for story content
- `MetaItem` - Category search card with icon, title, subtitle (116px height)
- `MetaItemAd` - Sponsored content card with logo and gradient
- `Cover` - Featured collection covers (116px default, 244px big variant)
- `Interesting` - Feature promotion cards (244px double height)
- `RD` - Business advertiser cards with gallery (244px double height)
- `RecommendationCard` - Horizontal recommendation cards for empty search (88×96px)
- `SearchHistoryItem` - Search history items following SuggestRow pattern
- `FriendAvatars` - Overlapping avatar display with pixel-perfect Figma specs (24×24px, 50% overlap)
- `ZMKBlock` - Purple gradient advertising block for non-advertiser search results
- `OrganizationTabs` - Horizontal scrollable tabs with counters and gradients
- `ContactInfo` - Comprehensive contact component with phone, messaging, website, and social media (Figma node-id 322-78232)
- `AddressCard` - Address display molecule with navigation integration for organization pages
- `CartNavbar` - Fixed-position checkout overlay with maximum z-index for cart functionality

### Organisms
Complex, self-contained components:
- `SearchBar` - Full search interface with Zustand integration
- `AdviceSection` - Masonry grid layout for advice cards
- `BottomSheet` - Draggable sheet container with snap points
- `MapContainer` - Map instance wrapper with direct store access
- `RecommendationsSection` - Horizontal scrollable recommendations for empty search
- `SearchHistorySection` - Search history with default suggestions for new users
- `CityHighlightsSection` - Featured city content using Cover molecule
- `SearchResultCard` - Complete search result display with friends integration and ZMK advertising
- `OrganizationHeader` - Organization page header with expanded/collapsed states
- `MastersNearbyCard` - Service professionals with ratings and galleries
- `ProductsCarousel` - Horizontal scrollable product display with cart integration
- `ProductCard` - Individual product display with add to cart functionality
- `CheckoutItemCard` - Cart/checkout item display with quantity controls (Figma node-id 337-225744)

### Templates
Page layouts and navigation:
- `MobileMapShell` - Main app shell with map + bottom sheet
- `ScreenRenderer` - Screen transition handler with store selectors

### Pages
Complete screen implementations:
- `DashboardPage` - Home screen with advice cards
- `SearchResultsPage` - Search results display
- `SearchSuggestionsPage` - Search suggestions with empty search state (recommendations, history, city highlights)
- `OrganizationPage` - Complete organization details with tabs navigation
- `AddressPage` - Address/building details with simplified tabs (Обзор, Мастера)
- `MasterDetailsPage` - Service professional profiles with reviews and ContactInfo
- `MastersListPage` - Complete masters list with navigation from search results

## 🏪 State Management

### Zustand Store Architecture
```typescript
// Direct store access with atomic selectors
const search = useStore((state) => state.search);
const ui = useStore((state) => state.ui);
const map = useStore((state) => state.map);
const actions = useActions();
```

### Store Slices
- **Map Slice**: Map instance, markers, center, zoom with direct map control
- **Search Slice**: Query, suggestions, results, history with debounced search
- **UI Slice**: Navigation, bottom sheet, screen state with optimized updates
- **Organization Slice**: Organization details, tab navigation, loading states
- **Cart Slice**: Shopping cart items, totals, quantity management with persistence
- **Cross-Slice Actions**: Coordinated workflows like `performSearch()`, `selectOrganization()`

### Performance Features
- **Selective Re-renders**: Components only update when their data changes
- **Persistence**: Search history and preferences saved to localStorage
- **DevTools**: Full Redux DevTools integration for debugging
- **Type Safety**: Complete TypeScript interfaces for all state

## 🎯 Key Features

- **Draggable Bottom Sheet** - Smart auto-expansion: search pages open at 90%, dashboard at 50%
- **Interactive Map** - 2GIS MapGL with markers and navigation, direct control
- **Smart Search System** - Real-time suggestions, debounced queries, cached results
- **Search Results with Social Features** - Friends visited indicators with overlapping avatars
- **Empty Search State** - Complete UX with recommendations, history, and city highlights
- **Organization Details** - Complete organization pages with tabs navigation and content sections
- **Service Professionals** - MastersNearbyCard with ratings, galleries, and comprehensive contact functionality
- **Contact Integration** - ContactInfo component with phone calls, messaging, websites, and social media  
- **Address Navigation** - AddressCard component with one-tap navigation to organization locations
- **Advice Cards System** - Masonry grid with MetaItem, Cover, Interesting, RD components
- **Atomic Design Architecture** - Recently migrated to strict component hierarchy
- **Design Tokens** - Centralized styling system with no hardcoded values
- **Shopping Cart System** - Global cart state with persistent storage and checkout flow
- **Cart Components** - CheckoutItemCard with quantity controls and price calculations
- **Overlay Navigation** - CartNavbar with maximum z-index positioning over all UI elements
- **Figma Integration** - Direct asset extraction using Figma Dev Mode for pixel-perfect implementation
- **Playwright Debugging** - Advanced debugging patterns for React component visibility and data flow issues
- **ContactInfo Verification** - Comprehensive Playwright-assisted debugging and testing infrastructure
- **Responsive Design** - Mobile-first with safe area support
- **State Management** - Zustand with atomic selectors and cross-slice actions
- **Performance Optimized** - Minimal re-renders, 8KB state management overhead
- **Code Quality** - ESLint, TypeScript, Prettier with pre-commit hooks

## 👥 Friends Section Implementation

### Pixel-Perfect Figma Integration
The friends section showcases advanced Figma Dev Mode integration:

- **Direct Asset Extraction**: Avatar images extracted from Figma Design (node-id 297-222454)
- **Exact Specifications**: 24×24px rounded square avatars with 50% overlap
- **Perfect Styling**: 0.5px borders, proper z-index stacking, #1ba136 green rating badges
- **Real Data Integration**: 40+ high-quality avatar images in `public/avatars/` directory

### Advanced Debugging with Playwright
Demonstrates professional debugging techniques:

```typescript
// React Fiber inspection to access component props
const searchResults = await page.evaluate(() => {
  const fiberKey = Object.keys(searchResultsList).find(key => key.startsWith('__reactFiber'));
  return searchResultsList[fiberKey].memoizedProps.results;
});

// Data flow verification from store to DOM
const avatarDetails = await page.evaluate(() => 
  Array.from(document.querySelectorAll('img[alt*="Елена"]')).map(img => ({
    alt: img.alt, src: img.src, width: img.width, height: img.height
  }))
);
```

### Component Architecture
- **FriendAvatars Molecule**: Self-contained overlapping avatar display
- **SearchResultCard Integration**: Conditional rendering with proper data flow
- **Mock Data Structure**: Realistic friends data with Figma-extracted avatars
- **Error Boundaries**: Graceful fallbacks to user initials for missing images

## 📱 Mobile Optimizations

- Viewport-fit cover for notched devices
- Safe area insets for proper spacing
- Touch-optimized interactions
- Cooperative gestures for map

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_2GIS_API_KEY=your_api_key_here
```

### Zustand Store
The store is automatically initialized with:
- **Persistence**: Search history and UI preferences
- **DevTools**: Redux DevTools integration in development
- **Middleware**: Immer for immutable updates, subscriptions for performance

```typescript
// Example usage in components
function MyComponent() {
  // Atomic selectors - only re-renders when specific data changes
  const query = useStore((state) => state.search.query);
  const currentScreen = useStore((state) => state.ui.currentScreen);
  
  // Cross-slice actions
  const { performSearch, navigateTo } = useActions();
}
```

### Design Tokens
Modify `src/lib/ui/tokens.ts` to customize:
- Colors
- Typography
- Spacing
- Border radius
- Transitions

## 📄 License

[Your License Here]

## 🧪 Testing Strategy

**Current Status**: All tests have been temporarily removed to allow for a clean architectural refactor.

**What was removed**:
- Jest configuration and test files
- Playwright E2E setup
- Testing Library components
- All `*.test.ts` and `*.spec.ts` files

**What remains**:
- ✅ Full TypeScript type checking
- ✅ ESLint with comprehensive rules
- ✅ Prettier code formatting
- ✅ Pre-commit hooks for quality
- ✅ Build process validation

**Future Plans**:
Tests will be rewritten to align with the atomic design architecture, focusing on:
- Component isolation testing at each atomic level
- Integration testing for store interactions
- E2E testing for critical user flows
- Performance testing for state management

## 🤝 Contributing

Please read our contributing guidelines before submitting PRs.