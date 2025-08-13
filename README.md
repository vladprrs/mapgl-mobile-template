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
├── app/                    # Next.js app router
├── components/
│   ├── atoms/             # Basic UI elements (Button, Badge, Text, Icon)
│   ├── molecules/         # Combinations of atoms (SearchResultItem, QuickAction)
│   ├── organisms/         # Complex components (SearchBar, SearchResultsList, BottomSheet)
│   ├── templates/         # Page layouts (MobileMapShell, ScreenRenderer)
│   └── pages/            # Full pages (DashboardPage, SearchResultsPage)
├── stores/                # Zustand state management
│   ├── index.ts          # Main store with middleware
│   ├── slices/           # Map, Search, UI state slices
│   ├── selectors/        # Atomic selectors for performance
│   └── types.ts          # TypeScript interfaces
├── lib/
│   └── ui/
│       └── tokens.ts     # Design tokens (colors, spacing, typography)
├── __mocks__/            # Mock data for development
└── assets/               # Static assets (images, icons)
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

### Organisms
Complex, self-contained components:
- `SearchBar` - Full search interface with Zustand integration
- `AdviceSection` - Masonry grid layout for advice cards
- `BottomSheet` - Draggable sheet container with snap points
- `MapContainer` - Map instance wrapper with direct store access

### Templates
Page layouts and navigation:
- `MobileMapShell` - Main app shell with map + bottom sheet
- `ScreenRenderer` - Screen transition handler with store selectors

### Pages
Complete screen implementations:
- `DashboardPage` - Home screen with advice cards
- `SearchResultsPage` - Search results display
- `SearchSuggestionsPage` - Search suggestions

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
- **Cross-Slice Actions**: Coordinated workflows like `performSearch()`

### Performance Features
- **Selective Re-renders**: Components only update when their data changes
- **Persistence**: Search history and preferences saved to localStorage
- **DevTools**: Full Redux DevTools integration for debugging
- **Type Safety**: Complete TypeScript interfaces for all state

## 🎯 Key Features

- **Draggable Bottom Sheet** - 3 snap points (10%, 50%, 90%) with state persistence
- **Interactive Map** - 2GIS MapGL with markers and navigation, direct control
- **Smart Search System** - Real-time suggestions, debounced queries, cached results
- **Advice Cards System** - Masonry grid with MetaItem, Cover, Interesting, RD components
- **Atomic Design Architecture** - Recently migrated to strict component hierarchy
- **Design Tokens** - Centralized styling system with no hardcoded values
- **Responsive Design** - Mobile-first with safe area support
- **State Management** - Zustand with atomic selectors and cross-slice actions
- **Performance Optimized** - Minimal re-renders, 8KB state management overhead
- **Code Quality** - ESLint, TypeScript, Prettier with pre-commit hooks

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