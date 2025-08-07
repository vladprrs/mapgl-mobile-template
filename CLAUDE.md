```markdown
# 2GIS MapGL Mobile App

Mobile-first map application with draggable bottom sheet overlay and dashboard interface.
**Stack:** Next.js 15, TypeScript, 2GIS MapGL, React 19, Tailwind CSS

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
│   ├── page.tsx           # Main app with MapProvider + Dashboard
│   ├── layout.tsx         # Root layout with mobile optimization
│   ├── test-stories/      # Story components test page
│   └── test-advice/       # Advice components test page
├── components/
│   ├── map/               # MapContainer, MapProvider
│   ├── bottom-sheet/      # BottomSheet, DragHandle, useBottomSheet
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
│   │   │   ├── mockData.ts        # Sample data
│   │   │   └── index.ts           # Exports
│   │   └── index.ts       # Dashboard exports
│   ├── icons/             # Icon system
│   │   ├── Icon.tsx       # Reusable icon component
│   │   └── index.ts       # Icon exports
│   ├── LocationList.tsx   # Sample location list component  
│   └── PlaceDetails.tsx   # Detailed place information component
├── hooks/
│   ├── useMapGL.ts        # Map context and operations
│   └── useBottomSheet.ts  # Bottom sheet state and gesture handling
├── lib/
│   ├── mapgl/            # Map config & utilities
│   ├── config/           # Environment config
│   └── icons/            # Icon definitions and mappings
└── __tests__/            # Component and hook tests
    ├── components/
    │   ├── bottom-sheet/  # BottomSheet test suite
    │   └── dashboard/     # Dashboard component tests
    │       ├── advice/    # Advice component tests
    │       │   ├── MetaItem.test.tsx
    │       │   ├── MetaItemAd.test.tsx
    │       │   ├── Interesting.test.tsx
    │       │   └── AdviceSection.test.tsx
    │       ├── SearchBar.test.tsx
    │       ├── QuickAccessPanel.test.tsx
    │       ├── StoryItem.test.tsx
    │       └── StoriesPanel.test.tsx
    └── hooks/            # Hook test suite
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

### Dashboard Component

The main interface rendered inside the BottomSheet, providing search and quick access features.

```typescript
import { Dashboard } from '@/components/dashboard';

// Usage in BottomSheet
<BottomSheetWithDashboard snapPoints={[10, 50, 90]}>
  <Dashboard />
</BottomSheetWithDashboard>
```

**Components:**

#### SearchBar
- Integrated drag handle (6px from top edge)
- Search input with icon
- Voice assistant (Salut) button with actual Figma asset
- Menu button
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

### Bottom Sheet Component

Mobile-optimized draggable overlay for displaying content over the map.

```typescript
import { BottomSheet } from '@/components/bottom-sheet';

// Basic usage
<BottomSheet>
  <LocationList />
</BottomSheet>

// With custom snap points
<BottomSheet snapPoints={[15, 60, 95]} onSnapChange={(snap) => console.log(snap)}>
  <PlaceDetails />
</BottomSheet>
```

**Key Features:**
- **Snap Points**: Default [10%, 50%, 90%] positions (starts at 50%)
- **Multi-Modal Gestures**: Touch, mouse wheel, drag handle
- **Smart Scrolling**: Content scrolling only when fully expanded (90%)
- **Performance**: 60fps animations with CSS transforms
- **Mobile-First**: Touch-optimized with proper passive event handling

**CRITICAL: SCROLL DIRECTION (INVERTED - CORRECT BEHAVIOR)**
- **Scroll DOWN / Mouse wheel DOWN / Swipe DOWN** = EXPAND sheet (natural push-down gesture)
- **Scroll UP / Mouse wheel UP / Swipe UP** = COLLAPSE sheet (natural pull-up gesture)
- This matches native iOS/Android bottom sheet behavior - DO NOT CHANGE THIS DIRECTION
- The implementation uses inverted deltaY values to achieve natural feel

**Hook Usage:**
```typescript
import { useBottomSheet } from '@/hooks/useBottomSheet';

const {
  currentSnap,
  currentSheetState, // 'collapsed' | 'half' | 'expanded'
  isExpanded,
  isDragging,
  snapTo,
  sheetRef,
  contentRef,
  // Base drag functions
  handleDragStart,
  handleDragMove,
  handleDragEnd,
  // Content handlers for scroll behavior
  handleContentTouchStart,
  handleContentTouchMove,
  handleContentTouchEnd,
} = useBottomSheet({
  snapPoints: [10, 50, 90],
  onSnapChange: (snap) => console.log('Snapped to:', snap)
});

// Programmatically control
snapTo(90); // Expand to 90%
```

**Sheet States:**
- **Collapsed (10%)**: Scroll DOWN to expand to half
- **Half (50%)**: DEFAULT starting state, scroll DOWN to expand full, UP to collapse
- **Expanded (90%)**: Content scrollable, scroll UP from top to collapse

## TDD Workflow

1. **Write test first** → See it fail (RED)
2. **Implement minimal code** → Make it pass (GREEN)  
3. **Refactor** → Keep tests green

```bash
npm run test:watch          # During development
npm run test:coverage       # Check coverage (min 80%)
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

**Mock Bottom Sheet Hook in tests:**
```typescript
jest.mock('@/hooks/useBottomSheet', () => ({
  useBottomSheet: jest.fn(() => ({
    position: 10,
    isDragging: false,
    isExpanded: false,
    handleDragStart: jest.fn(),
    handleDragMove: jest.fn(),
    handleDragEnd: jest.fn(),
    sheetRef: { current: null },
  })),
}));
```

## Known Issues & Solutions

| Problem | Solution |
|---------|----------|
| **Duplicate zoom controls** | Let 2GIS handle controls automatically - don't add manually |
| **GeoControl is not a constructor** | Geolocation not available in 2GIS by default |
| **Hydration mismatch errors** | Use `isClient` pattern for browser-only values |
| **Map not cleaning up** | Always call `map.destroy()` in useEffect cleanup |
| **Controls added multiple times** | Don't add controls manually - use 2GIS defaults |
| **Marker creation TypeError** | Don't pass unsupported props like `label` to 2GIS markers |
| **Passive event listener warnings** | Bottom sheet uses native events with `passive: false` |
| **Bottom sheet not dragging** | Ensure `touch-action: none` is set on draggable elements |

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
- Interesting: `119-67257`
- MetaItem: `119-67226`
- MetaItemAd: `119-66974`
- Cover: `119-66903` (Default) / `119-66910` (Big)
- RD: `119-66916`
- AdviceSection: `162-220899`

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

**Advice Component Assets Extracted:**
- Tourist illustration: `/assets/advice/e54c37b478c3fbeeadd3e7ff6c943f19ac03e375.png`
- Ice rink icons: `/assets/advice/d09f29e90c1485808c9c5f19153fbd5bde35b060.svg`, `/assets/advice/18f5b1e0152b51de3ce4cf9f463c841f262c2a6a.svg`
- Xiaomi logo: `/assets/advice/74f7e8baab90184b05499ea80dce96f157e67779.png`
- Gradient masks: `/assets/advice/a81e514928dac622f5cd9e79d6ae0c85e8041eda.svg`, `/assets/advice/8a864d910be8ae51e64885c1673c28f86d3a82d6.svg`

**Asset Workflow:**
1. Extract assets using MCP tool with node ID
2. Assets saved to `public/assets/`
3. Add to icon/image constants in `src/lib/icons/`
4. Use in components via Icon component or Image imports

See `/docs/figma-asset-workflow.md` for detailed workflow documentation.

## Mobile Optimization

- **Viewport:** `viewport-fit=cover` for notches
- **Touch:** `touch-action: none` on draggable elements
- **Safe areas:** `padding-bottom: env(safe-area-inset-bottom)`
- **Map settings:** `cooperativeGestures: false`, `pitch: 0`

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
1. Check touch-action: none is set on draggable elements
2. Verify passive: false on native touch listeners
3. Ensure snap points are valid numbers [10, 50, 90]
4. Test on actual mobile device for touch gestures
5. **REMEMBER**: Scroll direction is INVERTED for natural feel:
   - DOWN = EXPAND, UP = COLLAPSE (matches iOS/Android)
   - Implementation inverts deltaY values (-deltaY) for correct behavior

## 🔧 Recent Updates (Jan 2025)

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

### Icon Positioning Fix ✅
**Problem**: Icons were stretching to fill 24x24 containers
**Solution**: Icons maintain natural aspect ratios and padding
- Each icon uses its exact viewBox from Figma (e.g., 19x19 for search)
- Icons wrapped in fixed-size container divs
- Container centers icons using flexbox
- Original padding/margins preserved from designs

### Story Components Implementation ✅
**StoryItem Component**:
- Exact Figma dimensions: 96x112px content with 4px padding
- Background image with gradient overlay for text readability
- White text label (11px, semibold, -0.176px tracking)
- Viewed state: 2px green border (#1BA136)
- Active state: Scale transform animation (95%)

**StoriesPanel Component**:
- Horizontal scrolling with hidden scrollbar
- Fade gradients on left/right edges
- 8px gap between stories
- 16px padding from container edges

### Double Border Fix ✅
**Problem**: Clicking stories created overlapping focus rings and borders
**Solution**: Consolidated border styling using inset box-shadow
- Removed separate border div element
- Used `focus-visible` for keyboard-only focus indication
- Viewed state uses `box-shadow: inset 0 0 0 2px #1BA136` for inside border
- Clean visual hierarchy without conflicts

### Gesture Fixes ✅

### Position Jump & Flickering Issues - FIXED ✅
**Problem**: Curtain jumped to extreme positions (10%/90%) on initial touch
**Root Cause**: Position calculation used `snapPoint` instead of actual visual position
**Solution**: Added `startPosition` tracking in gesture state

```typescript
// FIXED: Track actual position when gesture starts
gestureState.current.startPosition = state.position; // Not snapPoint!
let newPosition = gestureState.current.startPosition + deltaPercent;
```

### Direction Inversion Conflict - FIXED ✅
**Problem**: Upward drag caused flickering, downward drag locked to 90%
**Root Cause**: `handleScrollGesture` logic conflicted with direct drag gestures
**Solution**: Replaced scroll gesture logic with direct drag control for content touches

### Gesture State Corruption - FIXED ✅
**Problem**: Rapid gestures caused unresponsive or stuck states
**Solution**: Improved state synchronization and cleanup

### Advice Section Implementation ✅
**Complete Advice Section Layout** (from Figma node 162-220899):
- Title: "Советы к месту" (19px Semibold, -0.38px tracking)
- Background: #F1F1F1
- Two-column grid layout with 12px gap
- Components have white backgrounds

**All 5 Components Completed**:
- **MetaItem**: Category cards with 116px height, icon in circle, Light/Dark themes
- **MetaItemAd**: Advertisement cards with gradient mask effect, "Реклама" label
- **Interesting**: Feature promotion cards with illustration (Default: 160px, Big: 244px height)
- **Cover**: Collection covers with gradient overlay (Default: 142px, Big: 200px height)
- **RD**: Advertiser cards with gallery and ratings (116px standard, 244px with gallery)

**Component Heights**:
- Standard: 116px (MetaItem, MetaItemAd, RD without gallery)
- Cover Default: 142px
- Interesting Default: 160px min
- Cover Big: 200px
- Interesting/RD with gallery: 244px

**Design Specifications**:
- Border radius: 12px (rounded-xl) for all components
- Typography: 16px Medium for titles, 13-14px for subtitles
- Theme support: Light and Dark variants for all components
- Active states: scale-95 transform on press
- Mixed layout: Smart arrangement based on component types and states

## 🚨 Critical Debugging - Gesture Issues

### Position Jumps
```javascript
// Check if startPosition is tracked correctly
console.log('Gesture start:', gestureState.current.startPosition, 'vs snap:', state.snapPoint)

// Verify smooth position progression  
console.log('Position delta:', newPosition - gestureState.current.startPosition)
```

### Direction Issues
```javascript
// Verify drag direction matches intent
const deltaY = gestureState.current.startY - touch.clientY;
console.log('Delta:', deltaY, 'Direction:', deltaY > 0 ? 'UP/EXPAND' : 'DOWN/COLLAPSE')
```

### Flickering/Unresponsive
```javascript
// Check for state conflicts
console.log('isDragging:', state.isDragging, 'isActive:', gestureState.current.isActive)

// Verify content scroll priority
console.log('Expanded:', isExpanded, 'Can scroll:', canContentScroll(scrollDirection))
```

### Testing Gesture Fixes
```bash
# Run gesture-specific tests
npm test -- gesture-position-fixes.test.tsx

# Check gesture performance
npm test -- --testNamePattern="maintains 60fps"

# Verify no regressions
npm test -- __tests__/components/bottom-sheet/
```

# Marker errors?
1. Don't pass unsupported options like 'label' to 2GIS markers
2. Use async/await with addMarker function
3. Verify coordinates are [lng, lat] format
4. Check map instance exists before adding markers
```
```