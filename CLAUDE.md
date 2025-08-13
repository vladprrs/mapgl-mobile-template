# 2GIS MapGL Mobile App

Mobile map application with draggable bottom sheet overlay.
**Stack:** Next.js 15, TypeScript, 2GIS MapGL, React 19, Tailwind CSS, react-modal-sheet

## Quick Start

```bash
cp .env.example .env.local  # Add your 2GIS API key
npm install
npm run dev                 # Start on port 3000
```

## Essential Commands

| Task | Command | Description |
|------|---------|-------------|
| Dev | `npm run dev` | Start development server |
| Build | `npm run build` | Production build |
| Test | `npm test` | Run tests |
| Type Check | `npm run type-check` | TypeScript validation |

## Project Structure

```
src/
├── app/                    # Next.js app router
├── components/
│   ├── app-shell/         # Main app integration
│   ├── bottom-sheet/      # Draggable overlay (react-modal-sheet)
│   ├── screen-manager/    # Screen navigation
│   ├── dashboard/         # Dashboard UI components
│   │   └── advice/        # Advice cards masonry layout
│   ├── map/               # Map components
│   └── icons/             # Icon system
├── hooks/                 # React hooks
├── lib/                   # Utilities and configs
└── __mocks__/            # Test mock data
```

## Critical Patterns

### Map Initialization

```typescript
useEffect(() => {
  load().then((mapgl) => {
    const map = new mapgl.Map('map-container', {
      key: process.env.NEXT_PUBLIC_2GIS_API_KEY,
      center: [37.618423, 55.751244],
      zoom: 13,
      // Let 2GIS handle controls automatically
    });
    
    mapRef.current = map;
  });
  
  return () => {
    mapRef.current?.destroy(); // Always cleanup
  };
}, []);
```

### SSR Hydration Fix

```typescript
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);

const value = isClient 
  ? clientSpecificValue     // e.g., window.innerHeight
  : 'serverSafeDefault';     // e.g., '100%'
```

### Map Operations

```typescript
// Add marker
await addMarker('marker-id', [lng, lat]);

// Center map
map.setCenter([lng, lat], { duration: 300 });
map.setZoom(15);

// Remove markers
removeMarker('marker-id');
clearMarkers();
```

## Core Components

### MobileMapShell
Main app integration combining map, bottom sheet, and screens.

```typescript
<MobileMapShell 
  snapPoints={[10, 50, 90]}
  items={adviceItems}
/>
```

### Bottom Sheet (react-modal-sheet)
Draggable overlay with gesture handling.

```typescript
<BottomSheet 
  snapPoints={[15, 60, 95]} 
  headerBackground="#F1F1F1"
>
  {/* content */}
</BottomSheet>
```

**Snap Points:** 10% (collapsed), 50% (default), 90% (expanded)
**Scrolling:** Only enabled at 90% snap point

### SearchBar
Three variants for different screens:
- `dashboard`: White bg, menu icon
- `suggest`: White bg, clear button
- `results`: Gray bg (#F1F1F1), white input, clear button

### Icon System

```typescript
import { Icon, ICONS, COLORS } from '@/components/icons';

<Icon name={ICONS.HOME} size={24} color={COLORS.TEXT_PRIMARY} />
```

**Design Tokens:**
- `TEXT_PRIMARY`: #141414
- `TEXT_SECONDARY`: #898989
- `TRAFFIC_HEAVY`: #F5373C
- `TRAFFIC_MODERATE`: #EFA701
- `TRAFFIC_LIGHT`: #1BA136
- `BUTTON_SECONDARY_BG`: rgba(20, 20, 20, 0.06)

## Known Issues & Solutions

| Problem | Solution |
|---------|----------|
| Duplicate zoom controls | Let 2GIS handle controls automatically |
| Hydration mismatch | Use BottomSheetClient for dynamic import |
| Map not cleaning up | Always call `map.destroy()` in cleanup |
| Bottom sheet not dragging | Check react-modal-sheet v4.4.0 installed |
| Touch gestures broken | Never set `touchAction: "none"` globally - only on map container |
| Layout shift on load | Initialize state with empty arrays, not undefined |

## MCP Servers

```json
{
  "mcpServers": {
    "context7": { "command": "mcp-server-context7" },
    "figma": { "command": "mcp-server-figma" },
    "playwright": { "command": "mcp-server-playwright" },
    "github": { "command": "mcp-server-github" }
  }
}
```

### Figma Integration

Extract components and assets:

```typescript
mcp__figma-dev-mode-mcp-server__get_code({
  nodeId: "189-220904",
  dirForAssetWrites: "/path/to/public/assets",
})
```

**Component Node IDs:**
- SearchBar: `189-220904`
- QuickAccessPanel: `189-220977`
- AdviceSection: `162-220899`
- StoriesPanel: `189-221058`

## Mobile Optimization

- **Viewport:** `viewport-fit=cover`
- **Touch:** Only set `touch-action: none` on map container
- **Safe areas:** `padding-bottom: env(safe-area-inset-bottom)`
- **Map settings:** `cooperativeGestures: false`, `pitch: 0`

## Git Workflow

**Branches:** `feature/`, `fix/`, `refactor/`, `docs/`
**Commits:** `feat:`, `fix:`, `test:`, `docs:`, `refactor:`

## Quick Debug

```bash
# Console errors?
- Check browser console for API key errors
- Verify .env.local exists with valid key

# Map not showing?
- Check container has height
- Verify API key is valid

# Bottom sheet issues?
- Ensure react-modal-sheet v4.4.0 installed
- Check snap points are [10, 50, 90]
- Never set touchAction globally
```

## Development Guidelines

**Never create test pages** (`/test-feature`, `/test-fix`, etc.)
- Test directly in main application flow
- Use `npm run dev` with actual app
- Test in real context within existing screens

## Component Specifics

### Dashboard Components
- **QuickAccessPanel**: Horizontal scroll with traffic indicators
- **StoriesPanel**: Story cards (96x112px) with viewed state
- **AdviceSection**: 2-column masonry layout (Figma 162-220899)
  - MetaItem: Category cards (116px height)
  - MetaItemAd: Ad cards with gradient (116px)
  - Interesting: Feature cards (244px)
  - Cover: Collection covers (116px/244px)
  - RD: Advertiser cards with gallery (244px)

### Screen Management
- Dashboard, SearchSuggestions, SearchResults screens
- ScreenRenderer handles transitions
- SearchBar stays sticky across screens

### Recent Fixes
- Bottom sheet manual dragging with auto-transitions
- SearchResults screen background (#F1F1F1)
- Extended drag area at all snap points
- Content scroll only at 90% snap
- Touch action scoped to map container only