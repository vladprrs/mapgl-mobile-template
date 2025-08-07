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
│   └── layout.tsx         # Root layout with mobile optimization
├── components/
│   ├── map/               # MapContainer, MapProvider
│   ├── bottom-sheet/      # BottomSheet, DragHandle, useBottomSheet
│   ├── dashboard/         # Dashboard components
│   │   ├── Dashboard.tsx  # Main dashboard container
│   │   ├── SearchBar.tsx  # Search with voice assistant
│   │   ├── QuickAccessPanel.tsx  # Quick action buttons
│   │   └── index.ts       # Exports
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

Centralized icon component and asset management system.

```typescript
import { Icon, ICONS, COLORS, IMAGES } from '@/components/icons';

// Use Icon component
<Icon name={ICONS.HOME} size={24} color={COLORS.TEXT_PRIMARY} />

// Use image assets
<Image src={IMAGES.SALUT_ASSISTANT} alt="Voice assistant" />

// Use color tokens
style={{ backgroundColor: COLORS.BUTTON_SECONDARY_BG }}
```

**Available Icons:**
- `ICONS.SEARCH` - Search magnifying glass
- `ICONS.MENU` - Hamburger menu
- `ICONS.HOME` - Home icon
- `ICONS.WORK` - Briefcase/work icon  
- `ICONS.BOOKMARK` - Bookmark icon
- `ICONS.LOCATION` - Location pin

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
- Stories Panel: [Pending]
- Tips Block: [Pending]

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
- **Icon System**: Centralized icon component with Figma assets
- **Design Tokens**: Colors, fonts, and spacing from Figma

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