# MapGL Mobile Bottom Sheet App

Mobile-first Next.js application that integrates 2GIS MapGL with a performant, gesture-driven Bottom Sheet and a dashboard UI (search, quick actions, stories, and advice blocks). Optimized for mobile devices with robust unit, integration, and E2E testing.

## Table of contents

- Overview
- Tech stack
- Architecture
- Directory structure
- Getting started
- Environment configuration
- Available scripts
- Testing
- Usage examples (Map, Bottom Sheet, Dashboard)
- Accessibility, performance, and styling
- Troubleshooting
- Roadmap and docs

## Overview

- **Goal**: Provide a mobile UX similar to native maps apps: full-screen map, draggable bottom sheet with snap points, and content dashboard.
- **Key features**:
  - 2GIS MapGL map with markers and programmatic camera controls
  - Draggable Bottom Sheet with snap points (10/50/90)
  - Dashboard blocks: Search Bar, Quick Access Panel, Stories, Advice section
  - Mobile gesture support (touch, wheel, drag) with strict scroll-boundary logic
  - Type-safe APIs and comprehensive automated tests

## Tech stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, TypeScript 5, Tailwind CSS 4
- **Maps**: 2GIS MapGL (`@2gis/mapgl`)
- **Bottom Sheet**: react-modal-sheet 4.4 (gesture-driven with snap points)
- **Screen Management**: Custom context-based navigation system with smooth transitions
- **Testing**: Jest 30 + Testing Library, Playwright for E2E
- **Linting**: ESLint 9 + Next presets, Prettier via lint-staged

## Architecture

High-level flow:

```text
App layout (src/app/layout.tsx)
  └─ Home page (src/app/page.tsx)
       └─ MapProvider (context)
            ├─ MapContainer (creates 2GIS Map)
            └─ BottomSheetWithDashboard
                 └─ ScreenManager (navigation context)
                      ├─ SearchBar (sticky header with back navigation)
                      └─ ScreenRenderer
                           ├─ Dashboard (default screen)
                           ├─ SearchSuggestions
                           └─ SearchResults
```

- **App layout** (`src/app/layout.tsx`): Sets viewport meta, disables page scroll, and locks the app to the viewport for mobile UX.
- **MapProvider** (`src/components/map/MapProvider.tsx`): React Context that exposes the 2GIS map instance and helpers: `addMarker`, `removeMarker`, `clearMarkers`, `centerOnLocation`, `centerOnMarker`.
  - Communicates with `MapContainer` via a small bridge (`window.__setMapInstance(map)`).
- **MapContainer** (`src/components/map/MapContainer.tsx`): Dynamically loads `@2gis/mapgl`, validates API key, and initializes the map using `MAP_CONFIG`.
- **Bottom sheet**
  - Main component: `BottomSheet` - uses react-modal-sheet for gesture handling
  - Client-only wrapper: `BottomSheetClient` - prevents SSR hydration issues
  - With Dashboard: `BottomSheetWithDashboard` - integrates screen management
  - Screen Manager: Context-based navigation between dashboard, search suggestions, and results
  - Legacy hook: `useBottomSheet` - minimal stub for backward compatibility
- **Dashboard** (`src/components/dashboard`): Composed UI (SearchBar, QuickAccessPanel, StoriesPanel, AdviceSection with card types `MetaItem`, `MetaItemAd`, `Cover`, `Interesting`, `RD`).
- **Configuration**
  - Env: `src/lib/config/env.ts` strongly validates `NEXT_PUBLIC_2GIS_API_KEY` and exposes getters.
  - Map defaults: `src/lib/mapgl/config.ts` (center, zoom, style, animation, markers, mobile settings).

### Data flow & state management

- Map state and operations are provided via React Context (`useMapGL`).
- Bottom sheet state is local to the sheet via `useBottomSheet`.
- No backend/API calls in this template; all demo data is local.

## Directory structure

```text
src/
  app/                 # Next.js App Router entrypoints
    layout.tsx         # Global layout/viewport
    page.tsx           # Home: Map + BottomSheet + Dashboard
  components/
    bottom-sheet/      # BottomSheet components
      BottomSheet.tsx  # Main sheet component using react-modal-sheet
      BottomSheetClient.tsx # Dynamic import wrapper for SSR
      BottomSheetWithDashboard.tsx # Integrated sheet with screen management
      bottom-sheet.css # Styles and overrides
      screens/         # Screen management system
        ScreenManagerContext.tsx # Navigation state management
        ScreenRenderer.tsx # Screen switching with transitions
        SearchSuggestions.tsx # Search suggestions screen
        SearchResults.tsx # Search results screen
        types.ts       # Screen types and interfaces
    dashboard/         # Dashboard and blocks (advice, stories, search, quick actions)
      advice/          # Advice section components (MetaItem, Cover, RD, etc.)
    icons/             # Icon system with Figma-extracted SVGs
    map/               # MapProvider + MapContainer
  hooks/
    useBottomSheet.ts  # Minimal stub for backward compatibility
    useMapGL.ts        # Map context hook + types
  lib/
    config/env.ts      # Env getters + validation
    mapgl/config.ts    # Map defaults and helpers
    icons/             # Icon definitions and constants
    logging.ts         # Debug logging utilities
  types/
    env.d.ts           # Env var typings
    mapgl.d.ts         # 2GIS MapGL global types

public/
  assets/...           # Static images and SVGs used by dashboard blocks

__tests__/
  unit/ integration/ e2e/ performance/  # Jest + Playwright tests
```

## Getting started

### Prerequisites

- Node.js 18+ (recommended 20+)
- npm 9+ (or pnpm/yarn/bun) 

### Install

```bash
npm install
```

### Configure environment

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_2GIS_API_KEY=your_mapgl_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Get an API key: see 2GIS MapGL docs (`https://docs.2gis.com/en/mapgl/overview#how-to-get-an-api-key`).

### Bottom Sheet Implementation

The application uses react-modal-sheet for the bottom sheet component, providing:
- Native-like gesture handling with snap points
- Smooth 60fps animations
- Proper scroll boundary detection
- SSR-safe rendering with hydration support
- Mobile-optimized touch and wheel event handling

### Run dev server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available scripts

- `dev`: Start Next.js with Turbopack
- `build`: Production build
- `start`: Start production server
- `lint`: ESLint
- `type-check`: TypeScript type checking
- `test`: Run all Jest tests
- `test:unit`, `test:integration`: Scoped Jest runs
- `test:e2e`: Run Playwright tests
- `test:e2e:mobile`: Playwright on mobile projects
- `test:e2e:ui`: Playwright UI runner
- `test:coverage`: Jest coverage
- `test:map`, `test:sheet`: Filtered Jest runs

## Testing

### Unit/Integration (Jest + Testing Library)

```bash
npm run test          # all
npm run test:unit     # unit only
npm run test:integration
npm run test:coverage
```

Key config: `jest.config.js`
- DOM mocks: `jest.setup.js` (IntersectionObserver, ResizeObserver, matchMedia, geolocation)
- 2GIS MapGL is mocked for deterministic tests
- Coverage thresholds (current):
  - Global: 30%
  - `src/components/map/`: 30%
  - `src/hooks/`: 30%

### End-to-end (Playwright)

E2E tests are temporarily removed while we redesign them for mobile map + gesture scenarios.

- Current status: disabled scripts (`test:e2e*`) return a no-op message
- Config: `playwright.config.ts` is retained as a template
- Strategy doc: see `docs/e2e-testing-strategy.md`

## Usage examples

### Map context

```tsx
// Access map operations
import { useMapGL } from '@/hooks/useMapGL'

const Demo = () => {
  const { addMarker, clearMarkers, centerOnLocation } = useMapGL()
  return (
    <button onClick={async () => {
      clearMarkers()
      await addMarker('id-1', [37.6173, 55.7558])
      centerOnLocation([37.6173, 55.7558], 16)
    }}>Drop marker</button>
  )
}
```

### Bottom sheet

```tsx
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet'

<BottomSheet snapPoints={[10, 50, 90]} onSnapChange={(s) => console.log(s)}>
  {/* your content */}
</BottomSheet>
```

### Dashboard

```tsx
import { Dashboard } from '@/components/dashboard'

<Dashboard onSearch={(q) => console.log('search:', q)} />
```

Example demos were previously under `src/app/test-*` routes but have been removed for production readiness.

## Accessibility, performance, and styling

- **Accessibility**: Keyboard focus handling in components; ARIA labels for interactive elements (ongoing).
- **Performance**: 60fps goal on interactions; `useBottomSheet` minimizes layout thrash and uses velocity/snap heuristics; map operations use animation settings from `MAP_CONFIG`.
- **Styling**: Tailwind CSS 4 via `@tailwindcss/postcss`. Utility classes are used throughout, with inline styles for dynamic values.

## Troubleshooting

- **Map doesn't load / errors in console**
  - Ensure `.env.local` has `NEXT_PUBLIC_2GIS_API_KEY`.
  - Restart dev server after adding env vars.
- **Bottom sheet scroll feels stuck**
  - In expanded state (90%), content scroll takes priority
  - Sheet only moves when content is at scroll boundaries
  - This is expected behavior for mobile UX consistency
- **Layout shift on initial load**
  - Fixed: CSS ensures consistent padding between SSR and client renders
  - If persists, check for dynamic content loading in useEffect
- **White borders flash on dashboard**
  - Fixed: react-modal-sheet scroller padding removed via CSS overrides
  - Ensure `bottom-sheet.css` is imported
- **Snap points assertion error**
  - react-modal-sheet expects descending order [0.9, 0.5, 0.1]
  - The component automatically converts from our API [10, 50, 90]
- Hydration warnings
  - Use `BottomSheetClient` for dynamic import if needed
  - Component includes SSR placeholder to prevent mismatches
- E2E tests time out
  - Verify dev server started; Playwright will launch it, but port conflicts can break tests.
  - Run `npx playwright install` if browsers are missing.

## Roadmap and docs

- Product/architecture docs:
  - `docs/bottom-sheet-architecture.md`
  - `docs/bottom-sheet-prd.md`
  - `docs/bottomsheet-dashboard-prd.md`

Planned enhancements (from PRDs):
- Real-time search suggestions, richer stories, dynamic advice content, and advanced map interactions.

---

© 2025. Built with Next.js, React, Tailwind, and 2GIS MapGL.
