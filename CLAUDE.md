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

### Environment Setup & Security

#### Initial Setup

1. **Get your API key** from https://docs.2gis.com/en/mapgl/overview#how-to-get-an-api-key
2. **Copy the environment template**:
   ```bash
   cp .env.example .env.local
   ```
3. **Add your API key** to `.env.local`:
   ```env
   NEXT_PUBLIC_2GIS_API_KEY=your_actual_api_key_here
   ```

#### Security Best Practices

**⚠️ CRITICAL: Never commit API keys to version control**

1. **Local Development**
   - Store keys in `.env.local` (automatically gitignored)
   - Never commit `.env.local` to git
   - Use `.env.example` as a template for team members

2. **API Key Management**
   - The API key is validated at runtime using `src/lib/config/env.ts`
   - Access the key through the config module, not directly from `process.env`
   - The app will show helpful error messages if the key is missing or invalid

3. **Type Safety**
   - Environment variables are typed in `src/types/env.d.ts`
   - TypeScript will warn about missing variables during development

4. **Configuration Module Usage**
   ```typescript
   import { config } from '@/lib/config/env';
   
   // Safe access with validation
   const apiKey = config.mapgl.apiKey;
   ```

#### Environment-Specific Configuration

**Development** (`.env.local`):
```env
NEXT_PUBLIC_2GIS_API_KEY=your_dev_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Production** (set in hosting platform):
```env
NEXT_PUBLIC_2GIS_API_KEY=your_production_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

#### Deployment Configuration

**Vercel**:
1. Go to Project Settings → Environment Variables
2. Add `NEXT_PUBLIC_2GIS_API_KEY` with your production key
3. Select which environments should use this key (Production/Preview/Development)

**Other Platforms**:
- **Netlify**: Site Settings → Environment Variables
- **Railway**: Variables tab in project settings
- **Render**: Environment tab in service settings
- **AWS Amplify**: App Settings → Environment Variables

#### API Key Rotation

1. **Regular Rotation Schedule**
   - Rotate production keys every 90 days
   - Keep track of key expiration dates
   - Update keys during low-traffic periods

2. **Emergency Rotation**
   - If a key is compromised, rotate immediately
   - Update all deployment environments
   - Clear CDN caches after rotation

3. **Monitoring**
   - Monitor API usage in 2GIS dashboard
   - Set up alerts for unusual activity
   - Track which keys are used in which environments

#### Troubleshooting

**Error: "2GIS MapGL API key is not configured properly"**
- Check that `.env.local` exists and contains the key
- Ensure the key name is exactly `NEXT_PUBLIC_2GIS_API_KEY`
- Restart the development server after changing `.env.local`

**Error: "Missing required environment variables"**
- Run `cp .env.example .env.local` to create the file
- Add your API key to the new file
- Check that all required variables are set

**Map not loading in production**
- Verify the environment variable is set in your hosting platform
- Check that the production API key is valid and not expired
- Ensure the domain is whitelisted in 2GIS API settings

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

## Test-Driven Development (TDD) Workflow

### Core Principles

**Red-Green-Refactor Cycle:**
1. **RED**: Write a failing test first
2. **GREEN**: Write minimal code to make the test pass
3. **REFACTOR**: Improve the code while keeping tests green

### Test Structure

```
__tests__/
├── unit/
│   ├── utils/           # Utility function tests
│   └── hooks/           # Custom React hooks tests
├── integration/
│   ├── components/      # Component integration tests
│   └── interactions/    # Cross-component interaction tests
└── e2e/
    └── *.spec.ts        # End-to-end mobile tests
```

### TDD Commands

```bash
# Run tests in watch mode during development
npm run test:watch

# Run specific test file in watch mode
npm run test:watch MapContainer

# Check test coverage
npm run test:coverage

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run E2E tests for mobile viewports
npm run test:e2e:mobile

# Run all map-related tests
npm run test:map

# Run all bottom sheet tests
npm run test:sheet

# Run complete test suite
npm run test:all
```

### Writing Tests for New Features

#### 1. Start with a Failing Test
```typescript
// Write test BEFORE implementation
describe('NewFeature', () => {
  it('should perform expected behavior', () => {
    // Arrange
    const input = setupTestData()
    
    // Act
    const result = newFeature(input)
    
    // Assert
    expect(result).toBe(expectedOutput)
  })
})
```

#### 2. Verify Test Fails
```bash
npm run test:watch NewFeature
# ✗ Test should fail (RED)
```

#### 3. Implement Minimal Code
```typescript
// Write just enough code to pass
function newFeature(input) {
  return expectedOutput // Minimal implementation
}
```

#### 4. Verify Test Passes
```bash
# ✓ Test should pass (GREEN)
```

#### 5. Refactor with Confidence
```typescript
// Improve implementation while tests stay green
function newFeature(input) {
  // Better implementation
  return processInput(input)
}
```

### Testing 2GIS MapGL Components

#### Mock Setup
```typescript
// Always mock MapGL for unit tests
jest.mock('@2gis/mapgl', () => ({
  load: jest.fn().mockResolvedValue({
    Map: jest.fn().mockImplementation(() => ({
      setCenter: jest.fn(),
      setZoom: jest.fn(),
      on: jest.fn(),
      destroy: jest.fn(),
    })),
    Marker: jest.fn(),
    ZoomControl: jest.fn(),
    GeoControl: jest.fn(),
  }),
}))
```

#### Testing Map Initialization
```typescript
describe('Map Initialization', () => {
  it('should initialize with mobile settings', async () => {
    render(<MapContainer />)
    
    await waitFor(() => {
      expect(mockMap).toHaveBeenCalledWith(
        expect.any(HTMLElement),
        expect.objectContaining({
          pitch: 0,
          rotation: 0,
          cooperativeGestures: false,
          maxZoom: 18,
        })
      )
    })
  })
})
```

### Testing Mobile Interactions

#### Touch Gesture Testing
```typescript
describe('Touch Gestures', () => {
  it('should handle drag on bottom sheet', async () => {
    const { container } = render(<BottomSheet />)
    const handle = container.querySelector('[data-testid="sheet-handle"]')
    
    // Simulate touch drag
    fireEvent.pointerDown(handle, {
      clientY: 500,
      pointerType: 'touch',
    })
    
    fireEvent.pointerMove(window, {
      clientY: 200,
      pointerType: 'touch',
    })
    
    fireEvent.pointerUp(window)
    
    // Assert sheet moved
    expect(onSnapChange).toHaveBeenCalledWith(2)
  })
})
```

#### E2E Mobile Testing
```typescript
// playwright.config.ts devices
test('should work on iPhone SE', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('/')
  
  // Test mobile-specific behavior
  const sheet = page.locator('.bottom-sheet')
  await sheet.dragTo({ y: 200 })
  
  await expect(sheet).toHaveCSS('transform', /translateY/)
})
```

### Coverage Requirements

```javascript
// jest.config.js thresholds
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80,
  },
  './src/components/map/': {
    branches: 100,  // Critical path: 100% coverage
    functions: 100,
    lines: 100,
    statements: 100,
  },
}
```

### TDD Rules for This Project

1. **No Implementation Without Tests**
   - Every feature starts with a failing test
   - Tests define the expected behavior

2. **Tests First, Code Second**
   - Write the test
   - See it fail (RED)
   - Then implement (GREEN)

3. **Mobile-First Testing**
   - All tests consider mobile constraints
   - Test touch gestures and viewport sizes

4. **Mock External Dependencies**
   ```typescript
   // Mock 2GIS MapGL in unit tests
   jest.mock('@2gis/mapgl')
   
   // Use real map only in E2E tests
   test.use({ baseURL: 'http://localhost:3000' })
   ```

5. **Separate Test Commits**
   ```bash
   # Commit 1: Add failing tests
   git commit -m "test: add tests for marker clustering"
   
   # Commit 2: Add implementation
   git commit -m "feat: implement marker clustering"
   ```

### Common Testing Patterns

#### Testing Async Map Operations
```typescript
it('should load map asynchronously', async () => {
  render(<MapContainer />)
  
  // Wait for async load
  await waitFor(() => {
    expect(screen.getByTestId('map-container')).toBeInTheDocument()
  })
  
  // Verify map instance
  expect(mapInstance).toBeDefined()
})
```

#### Testing State Updates
```typescript
it('should update markers when location selected', async () => {
  const { rerender } = render(<LocationList />)
  
  // Select location
  await userEvent.click(screen.getByText('Red Square'))
  
  // Verify state update
  await waitFor(() => {
    expect(mockAddMarker).toHaveBeenCalledWith(
      expect.objectContaining({
        coordinates: [37.6173, 55.7558],
      })
    )
  })
})
```

#### Testing Error Scenarios
```typescript
it('should handle API key errors gracefully', async () => {
  // Mock error
  mockConfig.mapgl.apiKey = undefined
  
  render(<MapContainer />)
  
  // Should show error message
  expect(screen.getByText(/API key not configured/)).toBeInTheDocument()
  
  // App should not crash
  expect(screen.getByRole('main')).toBeInTheDocument()
})
```

### Debugging Failed Tests

```bash
# Run single test with debugging
npm run test:watch -- --verbose MapContainer

# Run with coverage to find untested code
npm run test:coverage

# Debug E2E tests with headed browser
npx playwright test --headed --debug

# Generate E2E test report
npx playwright show-report
```

### Pre-commit Testing

```json
// .husky/pre-commit
"npm run test:unit -- --findRelatedTests"
"npm run lint"
"npm run type-check"
```

### CI/CD Testing Strategy

1. **On Every Push**
   - Run unit tests
   - Run integration tests
   - Check coverage thresholds

2. **On Pull Requests**
   - Full test suite
   - E2E tests on multiple viewports
   - Performance benchmarks

3. **Before Deploy**
   - Complete test suite
   - Visual regression tests
   - Load testing

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