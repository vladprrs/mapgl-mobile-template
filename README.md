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
                 └─ Dashboard (SearchBar, QuickAccessPanel, StoriesPanel, AdviceSection)
```

- **App layout** (`src/app/layout.tsx`): Sets viewport meta, disables page scroll, and locks the app to the viewport for mobile UX.
- **MapProvider** (`src/components/map/MapProvider.tsx`): React Context that exposes the 2GIS map instance and helpers: `addMarker`, `removeMarker`, `clearMarkers`, `centerOnLocation`, `centerOnMarker`.
  - Communicates with `MapContainer` via a small bridge (`window.__setMapInstance(map)`).
- **MapContainer** (`src/components/map/MapContainer.tsx`): Dynamically loads `@2gis/mapgl`, validates API key, and initializes the map using `MAP_CONFIG`.
- **Bottom sheet**
  - Presentational components: `BottomSheet`, `BottomSheetWithDashboard`
  - Logic: `useBottomSheet` hook handles drag/touch/wheel gestures, velocity, snap logic, and content-scroll boundary handling.
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
    test-*/page.tsx    # Dev/test demonstration pages
  components/
    bottom-sheet/      # BottomSheet components
    dashboard/         # Dashboard and blocks (advice, stories, search, quick actions)
    icons/             # Icon system
    map/               # MapProvider + MapContainer
    LocationList.tsx   # Example content
    PlaceDetails.tsx   # Example content
  hooks/
    useBottomSheet.ts  # Gesture and snap logic for the sheet
    useMapGL.ts        # Map context hook + types
  lib/
    config/env.ts      # Env getters + validation
    mapgl/config.ts    # Map defaults and helpers
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
- Coverage thresholds:
  - Global: 80%
  - `src/components/map/`: 100%
  - `src/hooks/`: 90%

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

See `src/app/test-*` routes for rich component demos.

## Accessibility, performance, and styling

- **Accessibility**: Keyboard focus handling in components; ARIA labels for interactive elements (ongoing).
- **Performance**: 60fps goal on interactions; `useBottomSheet` minimizes layout thrash and uses velocity/snap heuristics; map operations use animation settings from `MAP_CONFIG`.
- **Styling**: Tailwind CSS 4 via `@tailwindcss/postcss`. Utility classes are used throughout, with inline styles for dynamic values.

## Troubleshooting

- Map doesn’t load / errors in console
  - Ensure `.env.local` has `NEXT_PUBLIC_2GIS_API_KEY`.
  - Restart dev server after adding env vars.
- Bottom sheet scroll feels stuck
  - In expanded state, content scroll takes priority; sheet only moves at clear boundaries or with deliberate gestures (see `useBottomSheet`).
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
