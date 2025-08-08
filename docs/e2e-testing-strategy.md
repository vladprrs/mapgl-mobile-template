# E2E Testing Strategy (Mobile-first, Map + Bottom Sheet)

This document outlines how to rebuild robust, low-flake E2E tests for the mobile map app using Playwright.

## Scope and goals
- Validate core user flows on mobile devices first; desktop is secondary.
- Cover map interactions (2GIS MapGL), gesture-driven bottom sheet, and dashboard actions.
- Keep tests resilient by relying on app-level instrumentation and stable testids rather than brittle CSS/DOM.

## What was tested previously (now removed)
- Map markers management: adding/replacing/clearing markers; centering camera on selection; hover/tap behavior; rapid selections.
- Mobile gestures: pinch-to-zoom, sheet drags and swipes, preventing map interaction during sheet drag, scrolling content when expanded.
- Responsive layout: multiple mobile viewports, landscape handling, safe-area insets, touch target minimum sizes, animation smoothness.

See former files (now deleted) that captured these scenarios:
- `__tests__/e2e/map-markers.spec.ts`
- `__tests__/e2e/mobile-gestures.spec.ts`
- `__tests__/e2e/responsive.spec.ts`

## Architecture references
- Map context: `src/components/map/MapProvider.tsx` and `src/components/map/MapContainer.tsx`
- Bottom sheet logic: `src/hooks/useBottomSheet.ts`, UI in `src/components/bottom-sheet/*`
- Dashboard blocks: `src/components/dashboard/*` (SearchBar, QuickAccessPanel, StoriesPanel, Advice blocks)

## Recommended Playwright configuration
- Keep `playwright.config.ts` as a template, using:
  - `webServer` to start Next.js dev server
  - Mobile device projects (`iPhone 14 Pro`, `Pixel 5`) with `hasTouch: true` and realistic viewports
  - HTML reporter, traces/videos on failure only
  - `fullyParallel: true`, `retries: 1..2` on CI
- Prefer `test.use({ baseURL })` and `page.goto('/')` with server reuse locally.

## Environment & API keys
- MapGL requires `NEXT_PUBLIC_2GIS_API_KEY`. Use one of:
  - Test key from a staging 2GIS account
  - Local mocks via service worker or patching mapgl load when running E2E in CI
- Ensure `NEXT_PUBLIC_APP_URL` is set for links and absolute URLs.

## Instrumentation to reduce flakiness
Add test hooks that expose minimal, read-only state during E2E:
- Map
  - `window.__mapInstance` (already wired) for verifying `getCenter`, `getZoom`
  - `window.__mapClickCount` increments on click handlers
- Markers
  - `window.__markerCount` to assert creation/removal
- Bottom sheet
  - `data-sheet-state` attribute on the sheet root (collapsed/half/expanded)
  - `data-testid` on handle (`drag-handle`) and content (`sheet-content`)
These exist today; keep them stable and documented.

## Page Objects
Create page object helpers under `__tests__/e2e/page-objects/`:
- AppPage
  - `gotoHome()` navigates to `/` and waits for map + sheet
- MapPage
  - `getZoom()`, `getCenter()`, `clickAt(x, y)`, `pinchZoom(...)` (or fallback to programmatic zoom if native pinch is unreliable)
- BottomSheetPage
  - `dragTo(state)`, `swipe(direction)`, `isState(state)`, `contentScroll(delta)`
- DashboardPage
  - `search(query)`, `clickQuickAction(name)`, `openStory(id)`, `selectAdvice(id)`

## Core scenarios and test cases

### MapGL integration
- Marker placement: selecting a location adds one marker and updates `__markerCount`.
- Replace marker: adding a new location replaces the previous marker.
- Centering: selecting a location updates camera center; verify via `getCenter()`.
- Camera controls: programmatic `setZoom`, `setCenter` reflected in instance state.
- Map click events: increment `__mapClickCount` and don’t fire during active sheet drag.

### Bottom Sheet interactions
- Snap points: drag handle to collapsed/half/expanded; verify `data-sheet-state`.
- Swipe gestures: quick swipe up/down snaps appropriately.
- Scroll boundaries: when expanded, content scroll takes priority; when collapsed/half, gestures control the sheet.
- Touch-action: handle has `touch-action: none`; content toggles appropriately.

### Dashboard components
- SearchBar: input, submit, action buttons (voice/menu) are visible and clickable.
- QuickAccessPanel: buttons are visible, have >=44px touch targets, and invoke handlers.
- StoriesPanel: horizontal scroll present; clicking a story triggers callback.
- Advice blocks (`MetaItem`, `MetaItemAd`, `RD`): click interactions and visual expectations.

### Mobile-specific/responsive
- Viewports: iPhone SE, iPhone 14 Pro, Pixel 5 primary; tablets optional.
- Orientation: landscape layouts keep map + sheet usable.
- Safe-area insets: bottom sheet and controls respect `env(safe-area-inset-*)`.
- Touch-only behaviors: skip desktop-only hover assertions.

## Gesture testing guidelines
- Prefer pointer events for dragging (`pointerdown`/`pointermove`/`pointerup`) rather than synthesizing multi-touch, which is flaky across browsers.
- For pinch-to-zoom, consider programmatic zoom assertions or limited WebKit runs where touch APIs behave predictably. Mark others as `fixme`.
- Avoid `waitForTimeout`; use `expect.poll` against instrumented state.

## Test data and selectors
- Use `data-testid` across interactive elements: `map-root`, `bottom-sheet`, `drag-handle`, `sheet-content`.
- Keep list items (e.g., locations) accessible via role/name where possible; otherwise standardize visible text.

## CI considerations
- Install Playwright browsers in CI (`npx playwright install --with-deps`).
- Run with fewer projects (one phone + desktop) to keep time low; expand locally.
- Artifacts: collect HTML report, traces, and videos only on failures.

## Migration plan
1. Restore `__tests__/e2e/` with page objects and a small happy-path suite for one mobile device.
2. Add flake-resistant helpers (drag, swipe, poll for state) and refactor tests to use them.
3. Broaden to additional devices and scenarios incrementally.
4. Re-enable `test:e2e` scripts once the new suite is stable.

---

Status: E2E tests removed in this commit. Use this guide to rebuild them.
