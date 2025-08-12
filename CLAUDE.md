```markdown
# 2GIS MapGL Mobile App

Mobile-first map application with draggable bottom sheet overlay and dashboard interface.
**Stack:** Next.js 15, TypeScript, 2GIS MapGL, React 19, Tailwind CSS, react-modal-sheet

## Quick Start

```bash
# Setup
cp .env.example .env.local  # Add your 2GIS API key
npm install

# Development
# The server is launched in the next window with the command `npm run dev` you can always access it on port :3000    

npm run test:watch          # TDD mode
npm run test:coverage       # Check coverage

# Production
npm run build && npm start
```

## Test Pages (removed for production)

- Former: `/test-stories`, `/test-advice`
- Current: `/test-suggestions` - Test page for search suggestion rows

## Commands

| Task | Command | Description |
|------|---------|-------------|
| Dev | `npm run dev` | Start development server |
| Test | `npm test` | Run all tests |
| TDD | `npm run test:watch` | Test watch mode |
| Type Check | `npm run type-check` | TypeScript validation |
| Build | `npm run build` | Production build |
| E2E | `npm run test:e2e:mobile` | Mobile viewport tests |

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── page.tsx           # Main app with MobileMapShell
│   ├── layout.tsx         # Root layout with mobile optimization
│   ├── test-stories/      # Story components test page
│   └── test-advice/       # Advice components test page
├── components/
│   ├── app-shell/         # Main app integration
│   │   ├── MobileMapShell.tsx  # Integrated map + bottom sheet + screens
│   │   └── index.ts       # Exports
│   ├── bottom-sheet/      # Core bottom sheet component
│   │   ├── BottomSheet.tsx      # Main sheet component (includes SSR handling)
│   │   ├── BottomSheet.types.ts # All bottom sheet types
│   │   ├── bottom-sheet.css     # Styles and overrides
│   │   └── index.ts       # Clean exports
│   ├── screen-manager/    # Screen navigation system
│   │   ├── ScreenManagerContext.tsx  # Navigation state management
│   │   ├── ScreenRenderer.tsx        # Screen switching logic
│   │   ├── SearchSuggestions.tsx     # Search suggestions screen
│   │   ├── SuggestRow.tsx            # Search suggestion row component (3 variants)
│   │   ├── SearchResults.tsx         # Search results screen
│   │   ├── types.ts       # Screen types and interfaces
│   │   └── index.ts       # Exports
│   ├── dashboard/         # Dashboard components
│   │   ├── Dashboard.tsx  # Main dashboard container
│   │   ├── SearchBar.tsx  # Search with voice assistant
│   │   ├── QuickAccessPanel.tsx  # Quick action buttons
│   │   ├── StoriesPanel.tsx  # Horizontal scrolling stories
│   │   ├── StoryItem.tsx  # Individual story card
│   │   ├── advice/        # Advice section components
│   │   │   ├── AdviceSection.tsx  # Container with layout logic
│   │   │   ├── MetaItem.tsx       # Category search cards
│   │   │   ├── MetaItemAd.tsx     # Advertisement cards
│   │   │   ├── Interesting.tsx    # Feature promotion cards
│   │   │   ├── Cover.tsx          # Collection covers
│   │   │   ├── RD.tsx             # Advertiser cards
│   │   │   ├── types.ts           # TypeScript interfaces
│   │   │   └── index.ts           # Exports
│   │   └── index.ts       # Dashboard exports
│   ├── map/               # MapContainer, MapProvider
│   └── icons/             # Icon system
│       ├── Icon.tsx       # Reusable icon component
│       └── index.ts       # Icon exports
├── hooks/
│   └── useMapGL.ts        # Map context and operations
├── lib/
│   ├── mapgl/            # Map config & utilities
│   ├── config/           # Environment config
│   └── icons/            # Icon definitions and mappings
├── __mocks__/            # Centralized mock data for testing
│   ├── advice/           # Advice component mock data
│   ├── dashboard/        # Dashboard component mock data
│   ├── search/           # Search-related mock data
│   ├── utils/            # Mock data generators and constants
│   └── index.ts          # Main export file with presets
├── src/__tests__/        # Component tests (co-located with source)
│   └── components/
│       ├── bottom-sheet/  # BottomSheet tests
│       └── dashboard/     # Dashboard component tests
│           └── advice/    # Advice component tests
└── __tests__/            # Integration and E2E tests
    ├── integration/      # Integration test suite
    ├── unit/            # Unit test suite
    └── components/      # Additional component tests
        └── screen-manager/ # Screen manager tests
```

## Critical Patterns

### Map Initialization (Simplified - Let 2GIS Handle Controls!)

```typescript
useEffect(() => {
  load().then((mapgl) => {
    const map = new mapgl.Map('map-container', {
      key: process.env.NEXT_PUBLIC_2GIS_API_KEY,
      center: [37.618423, 55.751244],
      zoom: 13,
      // Let 2GIS handle all controls automatically
      // No manual control management needed!
    });
    
    mapRef.current = map;
  });
  
  return () => {
    mapRef.current?.destroy(); // ⚠️ CRITICAL: Always cleanup
  };
}, []); // Empty deps array!
```

### 2GIS Default Controls

The map automatically includes zoom controls. Let 2GIS handle all control logic to prevent duplicates.

✅ **Built-in:** Zoom controls are added by default  
❌ **Not available:** Geolocation control (would need custom implementation if required)

### SSR Hydration Fix

```typescript
// Avoid hydration mismatches
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);

const value = isClient 
  ? clientSpecificValue     // e.g., window.innerHeight
  : 'serverSafeDefault';     // e.g., '100%'
```

### Common Map Operations

```typescript
// Add marker (use async addMarker from MapProvider)
await addMarker('marker-id', [lng, lat]);

// Add marker with custom options
await addMarker('marker-id', [lng, lat], {
  icon: 'custom-icon.svg',
  size: [40, 40],
  anchor: [20, 40]
});

// Center map
map.setCenter([lng, lat], { duration: 300 });
map.setZoom(15);

// Handle click
map.on('click', (e) => {
  const { lngLat } = e;
  // Add marker at click position
});

// Remove markers
removeMarker('marker-id');
clearMarkers(); // Remove all markers
```

### Mobile App Shell

Main app integration component that combines map, bottom sheet, and screen management.

```typescript
import { MobileMapShell } from '@/components/app-shell';

// Usage in main app
<MobileMapShell 
  snapPoints={[10, 50, 90]}
  items={adviceItems}
/>
```

### Dashboard Component

The main interface rendered inside the MobileMapShell, providing search and quick access features.

```typescript
import { Dashboard } from '@/components/dashboard';
```

**Components:**

#### SearchBar
- Integrated drag handle (6px from top edge)
- Search input with icon
- Voice assistant (Salut) button with actual Figma asset
- Three variants:
  - `dashboard`: White background, menu burger icon on right
  - `suggest`: White background, X/Clear button on right (clears search)
  - `results`: Gray (#F1F1F1) background, white input field, X/Clear button (returns to dashboard)
- Identical padding/spacing in all modes
- Bottom padding creates 16px gap to next component

#### QuickAccessPanel  
- Horizontally scrollable button row
- Fade mask extends to edges (0px margins)
- Content starts at 16px from left edge
- Traffic indicators with color coding:
  - 🔴 Red (#F5373C) - Heavy traffic
  - 🟡 Yellow (#EFA701) - Moderate traffic
  - 🟢 Green (#1BA136) - Light traffic

### Icon System

Centralized icon component with exact SVG icons extracted from Figma designs.

```typescript
import { Icon, ICONS, COLORS, IMAGES } from '@/components/icons';

// Use Icon component - icons maintain aspect ratio in 24x24 container
<Icon name={ICONS.HOME} size={24} color={COLORS.TEXT_PRIMARY} />

// Use image assets
<Image src={IMAGES.SALUT_ASSISTANT} alt="Voice assistant" />

// Use color tokens
style={{ backgroundColor: COLORS.BUTTON_SECONDARY_BG }}
```

**Available Icons (Exact Figma SVGs):**
- `ICONS.SEARCH` - Search icon (19x19 natural size)
- `ICONS.MENU` - Menu/hamburger icon (18x14 natural size)
- `ICONS.HOME` - Home icon (22x19 natural size)
- `ICONS.WORK` - Work/briefcase icon (20x18 natural size)  
- `ICONS.BOOKMARK` - Bookmark icon (14x19 natural size)
- `ICONS.LOCATION` - Location pin (generic placeholder)

**Icon Implementation Details:**
- Icons are NOT stretched to fill containers
- Each icon maintains its original aspect ratio from Figma
- Icons are centered within fixed-size containers (default 24x24)
- Natural padding/margins are preserved from designs

**Design Tokens:**
```typescript
COLORS.TEXT_PRIMARY      // #141414
COLORS.TEXT_SECONDARY    // #898989
COLORS.TRAFFIC_HEAVY     // #F5373C (red)
COLORS.TRAFFIC_MODERATE  // #EFA701 (yellow)
COLORS.TRAFFIC_LIGHT     // #1BA136 (green)
COLORS.BUTTON_SECONDARY_BG // rgba(20, 20, 20, 0.06)
COLORS.DRAG_HANDLE       // rgba(137, 137, 137, 0.25)
```

### Bottom Sheet Component (react-modal-sheet)

Mobile-optimized draggable overlay using react-modal-sheet for smooth gesture handling.

```typescript
import { BottomSheet } from '@/components/bottom-sheet';

// Basic usage
<BottomSheet>{/* your content */}</BottomSheet>

// With custom snap points and header background
<BottomSheet 
  snapPoints={[15, 60, 95]} 
  onSnapChange={(snap) => console.log(snap)}
  headerBackground="#F1F1F1" // Customize drag handle area background
>
  {/* your content */}
</BottomSheet>

// For SSR issues, BottomSheetClient is available in the same import
import { BottomSheet, BottomSheetClient } from '@/components/bottom-sheet';
```

**Key Features:**
- **Snap Points**: Default [10%, 50%, 90%] positions (starts at 50%)
- **react-modal-sheet**: Production-ready gesture handling library
- **Smart Scrolling**: Content scrolling only when fully expanded (90%)
- **Performance**: Hardware-accelerated 60fps animations
- **SSR Safe**: Includes hydration guards and client-only wrapper

**Implementation Details:**
- Uses react-modal-sheet v4.4.0 for gesture handling
- Snap points are converted to descending order for the library
- Custom wheel handler for desktop support
- SSR placeholder prevents hydration mismatches

**Snap Points Conversion:**
```typescript
// Our API: [10, 50, 90] - percentages from bottom (ascending)
// Converted to: [0.9, 0.5, 0.1] - decimals from top (descending)
// react-modal-sheet expects descending order
```

**Note:** The `useBottomSheet` hook has been removed. All gesture logic is handled by react-modal-sheet.

**Sheet States:**
- **Collapsed (10%)**: Minimal visible state
- **Half (50%)**: DEFAULT starting state
- **Expanded (90%)**: Content scrollable, sheet moves only at scroll boundaries

## TDD Workflow

1. **Write test first** → See it fail (RED)
2. **Implement minimal code** → Make it pass (GREEN)  
3. **Refactor** → Keep tests green

```bash
npm run test:watch          # During development
npm run test:coverage       # Check coverage (min 80%)
```

**Use centralized mock data:**
```typescript
// Import preset combinations for testing
import { fullAppMockData, emptyAppMockData } from '@/__mocks__'

// Component-specific mocks
import { mockStories } from '@/__mocks__/dashboard'
import { mockMetaItems, mockCovers } from '@/__mocks__/advice'

// Generate dynamic test data
import { generateMockStories, generateMockMarkers } from '@/__mocks__/utils/generators'
```

**Mock 2GIS in tests:**
```typescript
jest.mock('@2gis/mapgl', () => ({
  load: jest.fn().mockResolvedValue({
    Map: jest.fn(() => ({
      setCenter: jest.fn(),
      destroy: jest.fn(),
    }))
  })
}));
```

**Mock Bottom Sheet in tests:**
```typescript
jest.mock('@/components/bottom-sheet', () => ({
  BottomSheet: ({ children }) => <div data-testid="bottom-sheet">{children}</div>,
  BottomSheetClient: ({ children }) => <div data-testid="bottom-sheet-client">{children}</div>,
}));
```

## Known Issues & Solutions

| Problem | Solution |
|---------|----------|
| **Duplicate zoom controls** | Let 2GIS handle controls automatically - don't add manually |
| **GeoControl is not a constructor** | Geolocation not available in 2GIS by default |
| **Hydration mismatch errors** | BottomSheet includes SSR guards; use BottomSheetClient for dynamic import |
| **Map not cleaning up** | Always call `map.destroy()` in useEffect cleanup |
| **Controls added multiple times** | Don't add controls manually - use 2GIS defaults |
| **Marker creation TypeError** | Don't pass unsupported props like `label` to 2GIS markers |
| **Snap points assertion error** | react-modal-sheet needs descending order - handled automatically |
| **Bottom sheet not dragging** | Check react-modal-sheet is properly installed |
| **Bottom sheet content scrolls instead of dragging** | NEVER set `touchAction: "none"` globally on body/html - only on map container. Global touch-action blocks gesture libraries |
| **Layout shift on initial load** | Initialize state with empty arrays instead of undefined; use hardcoded colors instead of CSS variables |
| **White borders flash** | CSS overrides remove react-modal-sheet padding; ensure bottom-sheet.css is imported |
| **Quick Access Panel height issue** | Use conditional rendering instead of animated height transitions |

## MCP Servers

```json
// .mcp.json configuration
{
  "mcpServers": {
    "context7": {
      "command": "mcp-server-context7",
    },
    "figma": {
      "command": "mcp-server-figma",
    },
    "playwright": {
      "command": "mcp-server-playwright"
    },
    "github": {
      "command": "mcp-server-github",
    }
  }
}
```

**Usage:**
- **context7:** Fetch docs and examples for react.js, next.js, etc.
- **figma:** Get design specs and tokens
- **playwright:** Visual testing and debugging
- **github:** PR management and version control

### Figma Integration

Extract assets and design specs from Figma designs:

```typescript
// Extract component with assets
mcp__figma-dev-mode-mcp-server__get_code({
  nodeId: "189-220904",  // Figma node ID
  dirForAssetWrites: "/path/to/public/assets",
})
```

**Figma Node IDs:**
- SearchBar: `189-220904`
- QuickAccessPanel: `189-220977`
- StoryItem: `198-221026`
- StoriesPanel: `189-221058`
- AdviceSection: `162-220899`
- MetaItem: `119-67226`
- MetaItemAd: `119-66974`
- Interesting: `119-67257`
- Cover: `119-66903` (Default) / `119-66910` (Big)
- RD: `119-66916`

**Extracted Icon SVG Files:**
- Search: `/assets/icons/78b4aac2c15552b8c0acc3c49dc2805e66dfdcad.svg`
- Menu: `/assets/icons/249a5dbcdbd61303a929f5a7b0ba6f76c269ea6d.svg`
- Bookmark: `/assets/icons/cdbfaf6779ca116ea64c455e3fba67ccc5fd425f.svg`
- Home: `/assets/icons/ced74e330ddca8cf8d1b420c665acef342483b60.svg`
- Work: `/assets/icons/7cef2d29c06091060ec9aba55a777bbf0fa58460.svg`

**Story Images Extracted:**
- Multiple story background images in `/assets/stories/`
- Images include various medical/health related visuals
- All images properly sized for 96x112px display area

**Advice Component Assets Extracted (67 files):**
- Category icons: Various SVG icons for different categories in `/assets/advice/`
- Feature illustrations: Tourist guide, city visuals
- Brand logos: Xiaomi and other advertiser logos
- Gallery images: Restaurant photos for RD components
- Gradient masks and overlays for visual effects
- Collection cover images for Cover components

**Asset Workflow:**
1. Extract assets using MCP tool with node ID
2. Assets saved to `public/assets/`
3. Add to icon/image constants in `src/lib/icons/`
4. Use in components via Icon component or Image imports

See `/docs/figma-asset-workflow.md` for detailed workflow documentation.

## Mobile Optimization

- **Viewport:** `viewport-fit=cover` for notches
- **Touch:** ⚠️ ONLY set `touch-action: none` on map container, NEVER globally
- **Safe areas:** `padding-bottom: env(safe-area-inset-bottom)`
- **Map settings:** `cooperativeGestures: false`, `pitch: 0`

### Critical: Touch Action Scoping
**NEVER** set `touchAction: "none"` globally on body or html elements. This blocks ALL touch gestures and breaks gesture-based libraries like react-modal-sheet.

✅ **Correct**: Apply only to map container
```tsx
// MapContainer.tsx
<div style={{ touchAction: 'none' }}> // Only for map
```

❌ **Wrong**: Global application
```tsx
// layout.tsx
<body style={{ touchAction: 'none' }}> // Breaks gesture libraries!
```

## Git Workflow

**Branches:** `feature/`, `fix/`, `refactor/`, `docs/`  
**Commits:** `feat:`, `fix:`, `test:`, `docs:`, `refactor:`

```bash
# TDD commit pattern
git add tests/ && git commit -m "test: add marker clustering tests"
git add src/ && git commit -m "feat: implement marker clustering"
```

## Resources

- [2GIS MapGL Docs](https://docs.2gis.com/en/mapgl)
- [2GIS React Guide](https://docs.2gis.com/ru/mapgl/start/react)
- [Next.js Docs](https://nextjs.org/docs)
- Project Issues: Check GitHub Issues for detailed troubleshooting

## Quick Debug

```bash
# Console errors?
1. Check browser console for API key errors
2. Verify .env.local exists and has valid key
3. Check network tab for failed 2GIS requests

# Map not showing?
1. Check container has height (not 0px)
2. Verify API key is valid
3. Look for CSP errors in console

# Duplicate controls?
1. Don't add controls manually - let 2GIS handle them
2. Verify cleanup in useEffect 
3. Check React StrictMode (dev only)

# Bottom sheet issues?
1. Ensure react-modal-sheet is installed (v4.4.0)
2. Check snap points are valid [10, 50, 90]
3. For SSR issues, use BottomSheetClient component
4. Test on actual mobile device for touch gestures
5. If content scrolls instead of dragging: FIXED - Added conditional disableScroll based on snap position

## 🔧 Recent Updates (January 2025)

### Fixed Visual Borders on SearchResults Screen ✅
- **Problem**: Unwanted gray lines/borders appearing between SearchBar and first search result card
- **Root Cause**: Visual separation from padding and potential edge effects in react-modal-sheet components
- **Solution**: Added explicit border removal and seamless background styling
- **Implementation**:
  - Removed all borders from Sheet.Header, Sheet.Content, and Sheet.Scroller
  - Added CSS overrides to prevent react-modal-sheet from adding borders
  - Ensured seamless background color transition between components
  - Eliminated any pseudo-elements that could create visual lines
- **Result**: Clean spacing between SearchBar and cards with no visible borders or dividers
- **Test page**: Available at `/test-border-fix` for verification

### Fixed Bottom Sheet Manual Dragging with Automatic Transitions ✅
- **Problem**: Manual dragging broke after adding automatic snap point adjustments for screen changes
- **Root Cause**: Automatic snap effect was re-triggering on every render, conflicting with manual drags
- **Solution**: Track screen changes separately and only auto-snap when screen actually changes
- **Implementation**:
  - Added `previousScreenRef` to track actual screen transitions
  - Added `isAutoSnappingRef` flag to distinguish automatic vs manual snaps
  - Modified effect to only trigger on screen changes, not on snap changes
  - Preserved both functionalities working together seamlessly
- **Result**: Users can now:
  - Manually drag the sheet to any snap point (10%, 50%, 90%)
  - Automatic adjustments still work when switching screens
  - Manual dragging works even after automatic adjustments
- **Test page**: Available at `/test-drag-fix` for verification

### SearchResults Screen Color Scheme Fix ✅
- **Fixed** Entire SearchResults screen background to #F1F1F1
- **Added** `headerBackground` prop to BottomSheet for dynamic backgrounds
- **Updated** SearchBar with `results` variant: gray background, white input field
- **Removed** Redundant back arrow button - only X button for navigation
- **Ensured** Consistent color scheme across drag handle, header, and content areas
- **Synced** Search query state between ScreenManager and MobileMapShell

### Centralized Mock Data Organization ✅
- **Refactored** All mock data from component files to `src/__mocks__/` directory
- **Created** Structured organization: `/advice`, `/dashboard`, `/search` subdirectories
- **Added** Data generators in `/utils/generators.ts` for dynamic test data
- **Implemented** Preset combinations (fullAppMockData, emptyAppMockData, minimalAppMockData)
- **Benefits**: Consistent test data across all tests, easier maintenance, better discoverability
- **Documentation**: Added comprehensive `src/__mocks__/README.md` with usage examples

### Fixed Inconsistent Drag Behavior in Expanded State ✅
- **Fixed** Advice section now allows sheet dragging when expanded (90%), matching stories behavior
- **Implementation** Added `touchAction: 'pan-y'` to AdviceSection and Dashboard containers
- **Behavior**: When at 90% snap and content is scrolled to top, dragging down on any content area pulls the sheet down
- **Consistency**: Both StoriesPanel and AdviceSection now have consistent drag behavior
- **Test page** available at `/test-drag-expanded` for verification

### Fixed Excessive Spacing Between Components ✅
- **Fixed** Removed excessive spacing between SearchBar and QuickAccessPanel 
- **Issue** The `minHeight: 100px` on Sheet.Header drag zone was creating large gaps
- **Solution** Removed minHeight constraint, allowing natural content sizing
- **Result** Exact 16px spacing (8px from SearchBar bottom + 8px from QuickAccess top)
- **Test page** available at `/test-spacing` for visual verification

### Universal Draggable Area at ALL Snap Points ✅
- **Fixed** Extended drag area now works at ALL snap points (10%, 50%, 90%), not just collapsed state
- **Implementation** Removed conditional logic - Sheet.Header always wraps content area for consistent dragging
- **Behavior**: 
  - At 10% snap: Drag from anywhere in the visible area (SearchBar, handle, etc.)
  - At 50% snap: Drag from anywhere in the visible content (SearchBar, QuickAccess, Stories, etc.)
  - At 90% snap: Drag from anywhere when scrolled to top; normal scrolling when not at top
- **Interactive elements** remain clickable (search input focus, buttons) through proper pointer-events management
- **Test pages** available at `/test-drag-all` for comprehensive verification

### Critical Scroll/Drag Fix ✅
- **Fixed** Bottom sheet content scrolling instead of dragging at 50% snap point
- **Added** Conditional `disableScroll` prop to Sheet.Scroller based on current snap position
- **Behavior**: Content now only scrolls when sheet is fully expanded (90%)
- **At 10% and 50%**: Only dragging works, content scrolling is disabled
- **Prevents** Scroll/drag gesture conflict on touch devices

### Critical Touch Action Fix ✅ 
- **Fixed** Bottom sheet scroll vs drag detection on mobile devices
- **Moved** `touchAction: "none"` from global body to map container only
- **Resolved** Gesture conflict between react-modal-sheet and global touch blocking
- **Important**: Never set touchAction globally - it breaks gesture libraries

### Screen Management System ✅
- **Added** ScreenManager context for navigation between screens
- **Implemented** Dashboard, SearchSuggestions, and SearchResults screens
- **Created** ScreenRenderer with smooth transitions between screens
- **Added** Back navigation button when not on dashboard
- **Integrated** SearchBar as sticky header across all screens
- **Fixed** Quick Access Panel rendering issues with conditional display

### Layout Stability Improvements ✅
- **Fixed** Dashboard layout shift on initial load
- **Fixed** White borders flash on dashboard content
- **Optimized** SSR/client render consistency
- **Removed** unnecessary padding from react-modal-sheet scroller
- **Improved** initial state handling to prevent content pop-in

### Bottom Sheet Migration to react-modal-sheet ✅
- **Replaced** custom gesture implementation with react-modal-sheet v4.4.0
- **Fixed** React hydration mismatches with SSR guards
- **Fixed** snap points ordering (now properly converts to descending order)
- **Removed** legacy feature flags and duplicate implementations
- **Added** BottomSheetClient for dynamic import option
- **Maintained** backward-compatible API

### Testing react-modal-sheet Integration
```bash
# Run bottom sheet specific tests
npm test -- BottomSheet

# Check SSR and hydration
npm test -- hydration
npm test -- ssr

# Verify gesture handling
npm test -- sheet-scroll
```

### Dashboard Implementation ✅
- **SearchBar**: Search input with voice assistant and menu
- **QuickAccessPanel**: Horizontally scrollable quick actions with traffic indicators
- **StoriesPanel**: Horizontally scrollable story cards with viewed state
- **StoryItem**: Individual story cards (96x112px) with image backgrounds and labels
- **Icon System**: Exact SVG icons from Figma with proper aspect ratios
- **Design Tokens**: Colors, fonts, and spacing from Figma
- **AdviceSection**: Container for rendering advice cards in various layouts (single/double/triple/mixed)
  - **MetaItem**: Category/rubric search cards with icon (116px height, Light/Dark themes)
  - **MetaItemAd**: Advertisement cards with gradient mask and logo (Xiaomi example)
  - **Interesting**: Feature promotion cards with illustration (Tourist layer example)
  - **Cover**: Featured collection covers (placeholder)
  - **RD**: Advertiser cards (placeholder)

### Icon System Implementation ✅
- Icons maintain natural aspect ratios from Figma designs
- Each icon centered in fixed-size container (default 24x24)
- Original padding/margins preserved

### Story Components ✅
- **StoryItem**: 96x112px with gradient overlay, viewed state border
- **StoriesPanel**: Horizontal scroll with fade gradients


### Advice Section Implementation ✅
**Complete Advice Section with 2-Column Masonry Layout** (from Figma node 162-220899):
- Title: "Советы к месту" (19px Semibold, -0.38px tracking)
- Background: #F1F1F1
- **Masonry Layout**: Always 2 columns, variable component heights
- Components maintain fixed column positions, never span across

**All 5 Components Completed**:
- **MetaItem**: Category/rubric search cards (always 116px height)
- **MetaItemAd**: Advertisement cards with gradient mask (always 116px height)
- **Interesting**: Feature promotion cards with illustration (always 244px height)
- **Cover**: Collection covers with gradient overlay (116px default / 244px big)
- **RD**: Advertiser cards with 100px gallery + content (always 244px height)

**Masonry Grid Height Rules**:
- **Single Height (116px)**: MetaItem, MetaItemAd, Cover (default state)
- **Double Height (244px)**: Interesting, RD, Cover (big state)
- Components placed in shorter column for balanced layout
- No horizontal spanning - components stay in their column

**RD Component Specifications**:
- Total height: 244px (double height in masonry)
- Gallery section: Exactly 100px height
- Content positioned at top-[116px] to prevent overlap
- Gallery images: Main image + counter badge for additional photos

**Design Specifications**:
- Border radius: 12px (rounded-xl) for all components
- Typography: 16px Medium for titles, 13-14px for subtitles
- Theme support: Light and Dark variants for all components
- Active states: scale-95 transform on press
- Masonry algorithm places items in shorter column dynamically

## 🔧 Recent Updates (January 2025)

### Screen Management System ✅
- **Added** ScreenManager context for navigation between screens
- **Implemented** Dashboard, SearchSuggestions, and SearchResults screens
- **Created** ScreenRenderer with smooth transitions between screens
- **Added** Back navigation button when not on dashboard
- **Integrated** SearchBar as sticky header across all screens
- **Fixed** Quick Access Panel rendering issues with conditional display

### Layout Stability Improvements ✅
- **Fixed** Dashboard layout shift on initial load
- **Fixed** White borders flash on dashboard content
- **Optimized** SSR/client render consistency
- **Removed** unnecessary padding from react-modal-sheet scroller
- **Improved** initial state handling to prevent content pop-in

### Bottom Sheet Migration to react-modal-sheet ✅
- **Replaced** custom gesture implementation with react-modal-sheet v4.4.0
- **Fixed** React hydration mismatches with SSR guards
- **Fixed** snap points ordering (now properly converts to descending order)
- **Removed** legacy feature flags and duplicate implementations
- **Added** BottomSheetClient for dynamic import option
- **Maintained** backward-compatible API

### Testing react-modal-sheet Integration
```bash
# Run bottom sheet specific tests
npm test -- BottomSheet

# Check SSR and hydration
npm test -- hydration
npm test -- ssr

# Verify gesture handling
npm test -- sheet-scroll
```

# Marker errors?
1. Don't pass unsupported options like 'label' to 2GIS markers
2. Use async/await with addMarker function
3. Verify coordinates are [lng, lat] format
4. Check map instance exists before adding markers
```

### SuggestRow Component ✅
Search suggestion row component with three variants matching Figma designs:

**Variants:**
1. **Saved Address** (home/work icons)
   - Shows saved locations with title, address, and distance
   - Icons: Home or Work
   
2. **Organization** (search results)
   - Shows business/organization with highlighted search match
   - Bold text for matched query, gray for rest
   
3. **Category/Rubric** (category search)
   - Shows category name with branch count
   - Optional matched text highlighting

**Usage:**
```typescript
import { SuggestRow, SuggestType } from '@/components/screen-manager';

<SuggestRow
  type={SuggestType.SAVED_ADDRESS}
  title="Дом"
  subtitle="Красный проспект, 49"
  distance="5 км"
  icon="home"
  onClick={() => handleSelect()}
/>

<SuggestRow
  type={SuggestType.ORGANIZATION}
  title="МЕСТО, инвест-апарты"
  subtitle="Красный проспект, 49"
  highlightedText="МЕС"
  onClick={() => handleSelect()}
/>

<SuggestRow
  type={SuggestType.CATEGORY}
  title="Аквапарки/Водные аттракционы"
  branchCount="6 филиалов"
  highlightedText="Места отдыха"
  onClick={() => handleSelect()}
/>
```

**Test Page:** `/test-suggestions`

### SearchBar Component ✅
Search bar component with two visual modes for different contexts:

**Variants:**
1. **Dashboard mode** (default)
   - Shows menu burger icon on the right
   - Used on the main dashboard screen
   
2. **Suggest mode** 
   - Shows X/clear button on the right
   - Used on search suggestions and results screens
   - Clear button clears input and returns to dashboard

**Usage:**
```typescript
import { SearchBar, SearchBarVariant } from '@/components/dashboard';

// Dashboard mode (default)
<SearchBar
  onSearch={(query) => handleSearch(query)}
  onMenuClick={() => openMenu()}
  variant="dashboard"
/>

// Suggest mode with clear functionality
<SearchBar
  value={searchQuery}
  onChange={(value) => setSearchQuery(value)}
  onClear={() => {
    setSearchQuery('');
    navigateToDashboard();
  }}
  variant="suggest"
/>
```

**Features:**
- Identical padding and spacing in both modes
- Smooth transitions between modes
- Voice assistant button (Salut) in both modes
- Focus/blur handling for search interactions
- Controlled and uncontrolled value support
```