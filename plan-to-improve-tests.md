## Testing Improvement Plan

### Goals and success criteria

- Improve reliability and signal of tests across unit, integration, and E2E
- Reduce flakiness in gesture and map scenarios
- Raise and enforce coverage on critical paths
- Add accessibility and visual regression checks for UI fidelity
- Ship CI that fails fast with actionable artifacts

Success criteria:
- E2E runs are selector-stable, no style/class selectors, no arbitrary timeouts
- 0 accessibility violations on core screens (mobile profiles)
- Visual diffs catch layout regressions on dashboard blocks
- Coverage thresholds met (global ≥ 85%, hooks ≥ 90%, map components = 100%)
- CI matrix runs Jest and Playwright, publishes coverage, HTML report, traces/videos

### Current state (summary)

- Jest 30 + Testing Library (jsdom), Playwright 1.54 for E2E
- Good coverage of BottomSheet hook/SSR/hydration, MapContainer init/cleanup, dashboard parts
- E2E relies on fragile locators (style/class fragments) and "defined" assertions
- a11y/visual regression not yet implemented
- MSW installed but not used; future data flows untested

---

## Phase 1 (1–2 days): Stabilize and add a11y + core coverage

### 1) Stabilize E2E selectors and assertions

- Add `data-testid` to key nodes:
  - Map root: `data-testid="map-root"` in `MapContainer`
  - Bottom sheet root: `data-testid="bottom-sheet"`
  - Bottom sheet content: `data-testid="sheet-content"`
  - Drag handle: `data-testid="drag-handle"`
  - Marker elements (when rendered): `data-testid="map-marker"`
- Update Playwright tests to use `page.getByTestId(...)` and `locator.getByTestId(...)`
- Replace `waitForTimeout` with:
  - `await expect(locator).toBeVisible()` / `toHaveCSS('transform', ...)`
  - `await expect.poll(() => page.evaluate(...)).toEqual(...)`

Acceptance:
- No E2E selectors use style/class fragments
- No unconditional `waitForTimeout` remaining

### 2) Add test instrumentation flag for E2E

- Env flag: `NEXT_PUBLIC_ENABLE_TEST_HOOKS=true`
- Gate test-only globals (in browser only):
  - `window.__map = { getCenter, getZoom }`
  - `window.__markers = { count, visible, lastClicked }`
- Use these in Playwright assertions (no "defined" placeholders)

Acceptance:
- E2E asserts concrete center/zoom/marker count changes using the test hooks

### 3) Accessibility checks

- Unit/integration: add `jest-axe` and a basic a11y test for `BottomSheet` and `Dashboard`
- E2E: integrate `@axe-core/playwright` and scan `/` for mobile projects

Acceptance:
- a11y tests run and pass locally; CI gate configured to fail on violations (allow list if unavoidable)

### 4) Cover env/config and MapProvider behaviors

- Add unit tests for `src/lib/config/env.ts`:
  - Missing key -> throws `ConfigError`
  - URL fallback logic
  - `env` detection
- Add tests for `MapProvider`:
  - `addMarker` replaces by id; `clearMarkers` removes all; `centerOnMarker` no-ops safely when missing

Acceptance:
- New tests added; coverage for these modules ≥ 90%

---

## Phase 2 (1–2 weeks): Visual regression, performance, and dashboard depth

### 5) Visual regression testing

- Approach A (Playwright snapshots):
  - Per-device snapshots for key states: collapsed/half/expanded sheet; StoriesPanel; AdviceSection (all card types); QuickAccessPanel
  - Configure per-project thresholds and snapshot directories
- Approach B (Storybook + Chromatic):
  - Publish components to Storybook; use Chromatic or Playwright screenshots for diffing

Acceptance:
- Snapshot baselines created; PRs show diffs on UI changes

### 6) Performance and animation budgets (browser-based)

- Use Playwright + CDP to measure:
  - Frame timing during drag/expand collapse
  - Duration of animations; ensure transforms used (GPU-friendly)
- Add assertions with reasonable device-specific budgets

Acceptance:
- At least one E2E asserts transform-based animation and completes within budget

### 7) Dashboard and blocks breadth/edge cases

- Add tests for:
  - Stories viewed/unviewed, focus ring, long labels, RTL
  - AdviceSection: single/double/triple/mixed, column balancing; all card props variants
  - QuickAccessPanel gradients and scroll boundaries with many items

Acceptance:
- Dashboard component coverage ≥ 85%; critical UX paths validated

### 8) MSW-backed data tests (prep for future API)

- Introduce MSW in Jest and Playwright (route interception) for future search/content APIs

Acceptance:
- Example integration test demonstrates MSW usage (ready for real APIs)

---

## Phase 3 (2–4 weeks): CI hardening and cross-platform

### 9) CI pipeline and gates

- GitHub Actions matrix:
  - Node LTS; jobs: lint, type-check, Jest (coverage), Playwright (selected mobile + desktop)
  - Upload artifacts: Jest HTML coverage, Playwright HTML report, traces/videos
- Gates:
  - Coverage: global ≥ 85%, hooks ≥ 90%, map components = 100%
  - a11y: zero violations on `/` for iPhone + Android profiles

Acceptance:
- CI fails on violations; artifacts attached to runs

### 10) Flake reduction & maintenance

- Adopt patterns:
  - Prefer `expect.poll`/`toHave*` over timeouts
  - Stable `data-testid` only; no style/class fragments
  - Minimize global test hooks; gate by env flag
- Add a "Flaky test triage" doc and a weekly audit (optional)

Acceptance:
- Flake rate materially reduced (track retries/failures in CI)

### 11) Optional: Playwright Component Testing

- Use PW Component Testing for BottomSheet gesture/scroll boundary behaviors in a real browser, with faster feedback than full E2E

Acceptance:
- At least one CT suite validating BottomSheet transforms and content scroll locks

---

## Task checklist (actionable)

- [x] Add `data-testid` to `MapContainer`, `BottomSheet`, handle, content, markers
- [x] Replace Playwright selectors and remove `waitForTimeout`
- [x] Add `NEXT_PUBLIC_ENABLE_TEST_HOOKS` and expose `window.__map` / `window.__markers` only when enabled
- [x] Update E2E to assert actual center/zoom/marker counts
- [x] Add `jest-axe` tests for `BottomSheet` and `Dashboard`
- [ ] Add `@axe-core/playwright` scan on `/` for mobile profiles
- [x] Add tests for `src/lib/config/env.ts` and `MapProvider` behaviors
- [ ] Introduce visual snapshot tests for key UI states
- [ ] Add at least one Playwright performance/animation assertion using CDP
- [ ] Expand dashboard tests: stories, advice cards, quick actions edge cases
- [ ] Set up GH Actions: Jest + coverage, Playwright matrix, publish artifacts
- [ ] Enforce coverage and a11y gates in CI

## Changes to code/config (summary)

- Components: add `data-testid` props
- Map instrumentation (test-only): guard in `MapContainer`/`MapProvider` to attach stable test hooks to `window`
- Playwright tests: use `getByTestId`, `expect.poll`, remove time-based waits
- DevDeps:
  - `jest-axe`, `@axe-core/playwright`
  - Optional: Storybook + Chromatic or Playwright snapshot config
- CI: new workflow with jobs for lint, type-check, Jest (coverage), Playwright (matrix), artifact uploads

## Risks and mitigations

- Test hooks pollute prod: strictly gate with `NEXT_PUBLIC_ENABLE_TEST_HOOKS`
- Visual diffs flaky across devices: lock device projects and thresholds; use per-project snapshots
- Performance budgets too strict: start relaxed, tighten over time based on flake telemetry

## Ownership & sequencing

Order of work within Phase 1:
1) Test IDs + selector rewrite
2) Instrumentation flag + stable assertions
3) a11y checks
4) Env/MapProvider tests

These unlock Phase 2 visual/perf additions and Phase 3 CI gates.


