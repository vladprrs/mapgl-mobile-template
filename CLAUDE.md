# 2GIS MapGL Mobile Web Application

## Project Overview

Mobile-first web application with 2GIS MapGL interactive map interface. The application features a full-screen map with a draggable bottom sheet overlay for content interaction.

**Tech Stack:**
- Next.js 15 with App Router
- TypeScript
- 2GIS MapGL (@2gis/mapgl)
- Tailwind CSS
- React 19

**Key Features:**
- Full-screen 2GIS MapGL map as base layer
- Draggable bottom sheet with multiple snap points
- Mobile-optimized touch interactions
- Map-sheet synchronized state management

## Architecture

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with viewport config
│   ├── page.tsx             # Main page with map
│   └── globals.css          # Global styles
├── components/
│   ├── map/
│   │   ├── MapContainer.tsx # Main map component
│   │   ├── MapProvider.tsx  # MapGL context provider
│   │   ├── MapMarker.tsx    # Marker component
│   │   └── MapControls.tsx  # Map control buttons
│   ├── bottom-sheet/
│   │   ├── BottomSheet.tsx  # Main sheet component
│   │   ├── SheetHandle.tsx  # Drag handle
│   │   └── SheetContent.tsx # Scrollable content
│   └── ui/                  # Reusable UI components
├── hooks/
│   ├── useMapGL.ts          # MapGL instance hook
│   ├── useBottomSheet.ts    # Sheet state management
│   └── useMobileGestures.ts # Touch gesture handling
├── lib/
│   ├── mapgl/
│   │   ├── config.ts        # MapGL configuration
│   │   ├── markers.ts       # Marker management
│   │   └── utils.ts         # Map utilities
│   └── utils/               # General utilities
└── types/
    ├── mapgl.d.ts           # 2GIS MapGL types
    └── index.ts             # App types
```

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Format code
npm run format
```

## 2GIS MapGL Integration

### Environment Setup

1. Get API key from https://docs.2gis.com/en/mapgl/overview#how-to-get-an-api-key
2. Add to `.env.local`:
```env
NEXT_PUBLIC_2GIS_API_KEY=your_api_key_here
```

### Map Initialization Pattern

```typescript
import { load } from '@2gis/mapgl';
import { useEffect, useRef } from 'react';

const mapRef = useRef<mapgl.Map | null>(null);

useEffect(() => {
  load().then((mapgl) => {
    const map = new mapgl.Map('map-container', {
      center: [37.618423, 55.751244], // Moscow
      zoom: 13,
      key: process.env.NEXT_PUBLIC_2GIS_API_KEY,
      style: 'c080bb6a-8134-4993-93a1-5b4d8c36a59b', // Default style
      // Mobile optimizations
      pitch: 0,
      rotation: 0,
      fitBoundsOptions: {
        padding: { top: 50, bottom: 300, left: 50, right: 50 }
      }
    });
    mapRef.current = map;
  });
}, []);
```

### Common Map Operations

#### Adding Markers
```typescript
const addMarker = (coordinates: [number, number], options?: MarkerOptions) => {
  if (!mapRef.current) return;
  
  const marker = new mapgl.Marker(mapRef.current, {
    coordinates,
    icon: 'https://docs.2gis.com/img/mapgl/marker.svg',
    size: [32, 32],
    anchor: [16, 32],
    ...options
  });
  
  return marker;
};
```

#### Changing Map View
```typescript
const centerOnLocation = (coordinates: [number, number], zoom?: number) => {
  mapRef.current?.setCenter(coordinates, {
    duration: 300,
    easing: 'easeInOutCubic'
  });
  if (zoom) {
    mapRef.current?.setZoom(zoom);
  }
};
```

#### Handling Map Events
```typescript
map.on('click', (event) => {
  const { lngLat } = event;
  // Handle click at coordinates
});

map.on('moveend', () => {
  const center = map.getCenter();
  const zoom = map.getZoom();
  // Save view state
});
```

#### Using Controls
```typescript
// Zoom controls
const zoomControl = new mapgl.ZoomControl(map, {
  position: 'topRight'
});

// Geolocation
const geoControl = new mapgl.GeoControl(map, {
  position: 'topRight'
});

// Scale ruler
const ruler = new mapgl.RulerControl(map);
```

## Bottom Sheet Implementation

### Component Structure
```typescript
interface BottomSheetProps {
  snapPoints: number[]; // [0.1, 0.5, 0.9] for 10%, 50%, 90% height
  defaultSnapPoint?: number;
  onSnapChange?: (snapPoint: number) => void;
  children: React.ReactNode;
}
```

### Touch Gesture Handling
- Drag handle for sheet manipulation
- Velocity-based snapping
- Rubber band effect at boundaries
- Content scroll when expanded
- Prevent map interaction when dragging sheet

### Map-Sheet Interaction Pattern
```typescript
// In sheet content component
const { map } = useMapGL();

const handleLocationSelect = (location: Location) => {
  // Update map from sheet interaction
  map?.setCenter(location.coordinates);
  map?.setZoom(15);
  
  // Add marker
  addMarker(location.coordinates, {
    label: location.name
  });
};
```

## Mobile Optimization

### Viewport Configuration
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
```

### Safe Area Handling
```css
.bottom-sheet {
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

### Touch Event Optimization
```typescript
// Prevent default touch behaviors
element.addEventListener('touchstart', handleTouchStart, { passive: false });

// Use pointer events for unified handling
element.addEventListener('pointerdown', handlePointerDown);
element.addEventListener('pointermove', handlePointerMove);
element.addEventListener('pointerup', handlePointerUp);
```

### Performance Settings
```typescript
const mapConfig = {
  // Reduce tile size for mobile
  tileSize: 256,
  // Limit max zoom for performance
  maxZoom: 18,
  // Disable 3D buildings on low-end devices
  enable3d: isHighEndDevice(),
  // Optimize gesture handling
  cooperativeGestures: false,
  // Preload tiles for smoother panning
  preloadTiles: true
};
```

## State Management

### Map Context
```typescript
interface MapContextValue {
  map: mapgl.Map | null;
  isLoading: boolean;
  markers: Map<string, mapgl.Marker>;
  addMarker: (id: string, coords: [number, number]) => void;
  removeMarker: (id: string) => void;
  clearMarkers: () => void;
  centerOnMarker: (id: string) => void;
}
```

### Bottom Sheet Context
```typescript
interface SheetContextValue {
  isOpen: boolean;
  snapPoint: number;
  setSnapPoint: (point: number) => void;
  content: React.ReactNode | null;
  setContent: (content: React.ReactNode) => void;
}
```

## Testing

### Unit Tests
```bash
npm test                 # Run all tests
npm test -- --watch     # Watch mode
npm test -- --coverage  # Coverage report
```

### Visual Testing
```typescript
// Using Playwright for mobile viewport testing
test('mobile map interaction', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 }); // iPhone X
  await page.goto('/');
  
  // Test map loads
  await expect(page.locator('#map-container')).toBeVisible();
  
  // Test bottom sheet interaction
  const sheet = page.locator('[data-testid="bottom-sheet"]');
  await sheet.dragTo({ y: 200 });
  await expect(sheet).toHaveCSS('transform', /translateY\(200px\)/);
});
```

## Code Style Guidelines

### TypeScript
- Use strict mode
- Define interfaces for all props
- Avoid `any` type
- Use enums for constants
- Implement proper error boundaries

### React Components
- Use functional components with hooks
- Implement memo for expensive renders
- Use custom hooks for logic extraction
- Keep components under 200 lines
- Co-locate related components

### Naming Conventions
- Components: PascalCase
- Hooks: camelCase with 'use' prefix
- Utilities: camelCase
- Constants: UPPER_SNAKE_CASE
- Types/Interfaces: PascalCase with 'I' or 'T' prefix

### File Organization
- One component per file
- Index files for exports
- Group by feature, not file type
- Keep test files adjacent

## Git Workflow

### Branch Naming
```
feature/map-clustering
fix/bottom-sheet-gesture
refactor/marker-management
docs/api-integration
```

### Commit Messages
```
feat: add marker clustering support
fix: resolve bottom sheet scroll issue
refactor: optimize map render performance
docs: update MapGL integration guide
test: add mobile viewport tests
```

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Refactoring
- [ ] Documentation

## Testing
- [ ] Mobile iOS Safari
- [ ] Mobile Chrome
- [ ] Desktop Chrome
- [ ] Desktop Safari

## Screenshots
[Add mobile screenshots]
```

## MCP Servers Integration

### Fetching 2GIS Documentation
```bash
# Use context7 MCP to get examples
mcp context7 fetch https://docs.2gis.com/ru/mapgl/examples

# Get specific API documentation
mcp context7 fetch https://docs.2gis.com/ru/mapgl/reference
```

### Design Integration
```bash
# Connect to Figma designs
mcp figma get-code --node-id=123:456

# Get design tokens
mcp figma get-variables --node-id=123:456
```

### Visual Testing
```bash
# Test mobile viewport
mcp playwright browser_navigate --url=http://localhost:3000
mcp playwright browser_resize --width=375 --height=812
mcp playwright browser_snapshot
```

## Performance Optimization

### Map Loading
- Lazy load MapGL library
- Preload critical map tiles
- Use WebP format for custom markers
- Implement progressive tile loading

### Bottom Sheet
- Use CSS transforms for animations
- Implement will-change for smooth transitions
- Virtualize long content lists
- Debounce resize observers

### Bundle Optimization
- Dynamic imports for heavy components
- Tree-shake unused MapGL modules
- Optimize images with next/image
- Enable SWC minification

## Security

### API Key Management
- Never commit API keys
- Use environment variables
- Implement domain restrictions
- Monitor usage quotas

### Content Security Policy
```typescript
const csp = {
  'script-src': ["'self'", 'https://mapgl.2gis.com'],
  'style-src': ["'self'", "'unsafe-inline'", 'https://mapgl.2gis.com'],
  'img-src': ["'self'", 'data:', 'https://*.2gis.com'],
  'connect-src': ["'self'", 'https://*.api.2gis.com']
};
```

## Deployment

### Environment Variables
Required for production:
- `NEXT_PUBLIC_2GIS_API_KEY`
- `NEXT_PUBLIC_APP_URL`

### Build Commands
```bash
# Production build
npm run build

# Analyze bundle
npm run analyze

# Type check before deploy
npm run type-check

# Run all checks
npm run pre-deploy
```

### Monitoring
- Track map load times
- Monitor API quota usage
- Log gesture interactions
- Track bottom sheet usage patterns

## Troubleshooting

### Common Issues

#### Map not loading
- Check API key validity
- Verify network connectivity
- Check CSP headers
- Review browser console

#### Bottom sheet stuttering
- Reduce render complexity
- Implement throttling
- Check for layout thrashing
- Profile with DevTools

#### Touch gestures not working
- Verify touch-action CSS
- Check event listener options
- Test passive event listeners
- Review pointer events

## Resources

### Documentation
- [2GIS MapGL Docs](https://docs.2gis.com/en/mapgl/overview)
- [2GIS MapGL Examples](https://docs.2gis.com/en/mapgl/examples)
- [2GIS MapGL API Reference](https://docs.2gis.com/en/mapgl/reference)

### Support
- GitHub Issues: [Project Repository]
- 2GIS Support: https://help.2gis.com
- Community Forum: https://github.com/2gis/mapgl-js/discussions

## Quick Reference

### Essential MapGL Methods
```typescript
map.setCenter(coords, options?)     // Change center
map.setZoom(level, options?)        // Change zoom
map.fitBounds(bounds, options?)     // Fit to bounds
map.on(event, handler)               // Event listener
map.off(event, handler)              // Remove listener
map.getCenter()                      // Get current center
map.getZoom()                        // Get current zoom
map.getBounds()                      // Get visible bounds
map.project(lngLat)                  // Convert to pixels
map.unproject(point)                 // Convert to coords
```

### Marker Methods
```typescript
marker.setCoordinates(coords)       // Move marker
marker.setIcon(url)                  // Change icon
marker.show()                        // Show marker
marker.hide()                        // Hide marker
marker.destroy()                     // Remove marker
```

### Performance Tips
1. Limit active markers to < 100
2. Use clustering for large datasets
3. Debounce map move events
4. Lazy load off-screen content
5. Optimize marker icons (< 10KB)
6. Use requestAnimationFrame for animations
7. Implement virtual scrolling for lists
8. Cache geocoding results
9. Preload adjacent map tiles
10. Minimize re-renders with React.memo