```markdown
# 2GIS MapGL Mobile App

Mobile-first map application with draggable bottom sheet overlay.
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
├── components/
│   ├── map/               # MapContainer, MapProvider, GeolocationControl
│   └── bottom-sheet/      # BottomSheet with snap points
├── hooks/                 # useMapGL, useBottomSheet
└── lib/
    ├── mapgl/            # Map config & utilities
    └── config/           # Environment config
```

## Critical Patterns

### Map Initialization (Always with Cleanup!)

```typescript
useEffect(() => {
  load().then((mapgl) => {
    const map = new mapgl.Map('map-container', {
      key: process.env.NEXT_PUBLIC_2GIS_API_KEY,
      center: [37.618423, 55.751244],
      zoom: 13,
      zoomControl: false, // ⚠️ IMPORTANT: Prevent duplicate controls
    });
    
    mapRef.current = map;
    
    // Add controls manually
    const zoomControl = new mapgl.ZoomControl(map, {
      position: 'topRight'
    });
    zoomControlRef.current = zoomControl;
  });
  
  return () => {
    zoomControlRef.current?.destroy?.();
    mapRef.current?.destroy(); // ⚠️ CRITICAL: Always cleanup
  };
}, []); // Empty deps array!
```

### Available 2GIS Controls

✅ **Exists:** `ZoomControl`, `TrafficControl`, `ScaleControl`, `FloorControl`  
❌ **Doesn't Exist:** `GeoControl`, `GeolocationControl` (use our custom component)

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
// Add marker
const marker = new mapgl.Marker(map, {
  coordinates: [lng, lat],
  icon: 'url-to-icon.svg'
});

// Center map
map.setCenter([lng, lat], { duration: 300 });
map.setZoom(15);

// Handle click
map.on('click', (e) => {
  const { lngLat } = e;
  // Add marker at click position
});
```

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

## Known Issues & Solutions

| Problem | Solution |
|---------|----------|
| **Duplicate zoom controls** | Set `zoomControl: false` in map init options |
| **GeoControl is not a constructor** | Use custom `GeolocationControl` component |
| **Hydration mismatch errors** | Use `isClient` pattern for browser-only values |
| **Map not cleaning up** | Always call `map.destroy()` in useEffect cleanup |
| **Controls added multiple times** | Store control refs and destroy in cleanup |

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
1. Check `zoomControl: false` in map options
2. Verify cleanup in useEffect
3. Check React StrictMode (dev only)
```
```