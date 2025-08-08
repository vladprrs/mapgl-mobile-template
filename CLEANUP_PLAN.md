## Codebase Cleanup and Improvement Plan

This document tracks cleanup items, their current status, completion notes, and next steps. It reflects the repository state as of 2025-08-08 and preserves the original intent while updating priorities.

Legend: ✅ Done · 🔄 In Progress · ⏳ Pending · ❌ Blocked

### Scope
- App: `src/app/*`
- Components: `src/components/*`
- Hooks: `src/hooks/*`
- Lib/Config: `src/lib/*`
- Public assets: `public/*`
- Tests and tooling: `__tests__/*`, `jest.*`, `playwright.*`

---

## Findings (unchanged context)

### 1) Code Duplication

- **Advice card family (UI duplication)**: `MetaItem`, `MetaItemAd`, `Interesting`, `Cover`, `RD` share card container patterns (rounded, shadow, image + title/subtitle, click handler). Extract shared primitives:
  - `AdviceCardContainer` (padding, radius, hover, layout)
  - `AdviceCardTitle`, `AdviceCardSubtitle`, `AdviceCardBadge`
  - Centralize shared spacing and typography.

- **Inline color tokens duplicated**:
  - Repeated `bg-[#F1F1F1]` in `Dashboard`, `test-*` pages. Use `COLORS` or Tailwind theme token.

- **Icon mapping duplication/misalignment**:
  - `src/components/icons/Icon.tsx` contains inline SVGs for `search`, `menu`, `home`, `work`, `bookmark`, `location`.
  - `src/lib/icons/index.ts` defines `ICONS` and `ICON_SVGS` paths but `Icon` does not consume `ICON_SVGS`.
  - Some `ICONS` entries exist without SVGs in `Icon` (`traffic-*`).

- **Test instrumentation repeats env checks**:
  - `process.env.NEXT_PUBLIC_ENABLE_TEST_HOOKS === 'true'` blocks repeated in `MapContainer`, `MapProvider`. Consider a small helper `isTestHooksEnabled()`.

### 2) CSS/Styling Duplication

- **Repeated colors**:
  - `#F1F1F1` hardcoded in multiple places (`Dashboard`, `test-advice`, `test-stories`). Add Tailwind theme color or reuse `COLORS`.
  - Text grays (e.g., `text-gray-600`) appear repeatedly; consider aliasing via Tailwind theme extensions where design requires stability.

- **Global CSS minimal**: Only theme vars and dark-scheme media query exist in `globals.css`. Most styling is Tailwind-based. Prefer tokens over one-off hex values.

### 3) Logic Duplication

- **Click logging across many components**:
  - `Dashboard`, `Advice*` components, and dev pages all log with `console.log` for click handlers. Gate behind a feature flag or remove in production builds.

- **Map init/destroy patterns**:
  - Safe-destroy logic repeated with try/catch in `MapContainer`. If needed in other modules later, extract to a small utility.

### 4) Unused Code and Components

- **Removed unused runtime components**:
  - `LocationList` and `PlaceDetails` were referenced only in docs/tests and have been deleted.

- **Dev-only pages** (removed):
  - `src/app/test-advice/page.tsx`
  - `src/app/test-icons/page.tsx`
  - `src/app/test-stories/page.tsx`
  - Deleted for production readiness.

- **Unused icon mappings**:
  - `ICON_SVGS` exported but not used by `Icon`.
  - `ICONS.TRAFFIC_*` exist without corresponding inline SVG support; used only in dev page for color showcase.

### 5) Unused Assets (likely)

- `public/assets` contains 150+ files. Only a subset is referenced under `src/*` (e.g., advice/stories). Many advice icons appear unused.
- Action: generate unused-assets report (see plan) and prune with review.

### 6) Dead Code Paths

- No unreachable branches detected in code scan, but many handlers are dev logs only.
- `__tests__/integration/interactions/map-sheet-sync.test.tsx.skip` is skipped (test never runs). Decide to fix or delete.

### 7) Development Artifacts

- **Console statements** in production code:
  - Examples: `src/components/map/MapContainer.tsx`, `src/components/dashboard/*`, `src/components/dashboard/advice/*`.
  - Replace with `debug()` helper gated by env, or remove.

- **Mock/test data in production bundle path**:
  - `src/components/dashboard/advice/mockData.ts` used by `Dashboard`. Consider moving to `src/__mocks__/` or a dev-only provider.

- **Dev-only pages** under `src/app/test-*` (see above).

- **Skipped test**: `map-sheet-sync.test.tsx.skip`.

---

## Status Overview (as of 2025-08-08)

### ✅ Done
- Remove dev-only pages (`src/app/test-*`) — 2025-08-08 (commit: 6bba7b1)
  - Removed `test-advice`, `test-icons`, `test-stories`; verified clean type-check and production build.
- Remove unused components and skipped test — 2025-08-08 (commit: 42d4965)
  - Deleted `LocationList`, `PlaceDetails` and removed the skipped map-sheet test.
- DRY test-hooks helper — 2025-08-08 (commit: 52beedb)
  - Introduced `isTestHooksEnabled()` and replaced inline checks in `MapContainer`/`MapProvider`.
- Asset usage analysis and pruning — 2025-08-08 (commits: cc89d85, 4e4c5e9, 2dec3f5, 0a4252e)
  - Stories: pruned to 4 used; Advice: kept 10 used files; Icons: kept only `ICON_SVGS`-mapped; restored one mis-moved asset.
- Icon system alignment — 2025-08-08 (commits: 093a2ed, 2dec3f5)
  - `Icon.tsx` renders canonical inline SVGs with `ICON_SVGS` fallback; dead assets removed.
- Advice UI primitives extracted — 2025-08-08 (commit: 093a2ed)
  - `src/components/dashboard/advice/primitives/*` created and adopted.
- Map lifecycle safe cleanup — 2025-08-08 (commit: 6f5f9df)
  - Introduced `safeDestroyMap` in `src/lib/mapgl/lifecycle.ts` and integrated in `MapContainer`.

### 🔄 In Progress
- Centralize colors/tokens for muted backgrounds
  - Status: `--bg-muted` variable added; component replacements completed; follow-up to mirror tokens into Tailwind theme utilities.

### ⏳ Pending / Backlog
- Add CI checks (unit/integration, TS, ESLint) via GitHub Actions
  - Accept: basic CI green run on PRs and default branch.
- Bundle guard/log stripping
  - Current: `debugLog` disabled in production via env helper; finalize by removing remaining `console.log` in runtime code.
- Tailwind design tokens
  - Mirror `COLORS` into Tailwind config for class-based usage.
- Map instance wiring (optional)
  - Replace `window.__setMapInstance` with context/event emitter if feasible.
- E2E reintroduction
  - Scripts currently no-op; follow `docs/e2e-testing-strategy.md` when reinstating.

### New cleanup opportunities (not in original plan)
- Define `--bg-muted` CSS variable in `globals.css` and replace raw `#F1F1F1` usages (including Tailwind arbitrary colors) with the variable or Tailwind token.
- Align README coverage statements with current Jest thresholds (presently set to 30% in `jest.config.js`).
- Commit staged asset deletions observed in working tree (root-level `public/assets/*` duplicates) and keep `docs/unused-assets-analysis.md` updated.

Notes/Lessons learned
- Gating logs via `config.app.debugLoggingEnabled` keeps production clean while enabling dev observability.
- Asset pruning is safest when driven by a generated usage list with conservative restores.

---

## Updated Prioritized Action Plan

### Phase 0 — Safety net
- **Add CI checks**: run unit + integration + e2e; TypeScript; ESLint.
- **Add bundle guard**: ensure dev pages and console logs are stripped in `production`.

### Phase 1 — High-impact, low-risk

1. Remove or guard dev-only pages
   - Deleted: `src/app/test-advice/page.tsx`, `src/app/test-icons/page.tsx`, `src/app/test-stories/page.tsx`.
   - Acceptance: no routes exposed in production.

2. Replace console.* in runtime code
   - Create `src/lib/log.ts` with `debug/info/warn/error` gated by `NEXT_PUBLIC_DEBUG === 'true'`.
   - Refactor occurrences in `MapContainer`, `MapProvider`, `Dashboard`, advice components.
   - Acceptance: zero raw `console.log` in `src/components/**`.

3. Move mock data to dev scope
   - `src/components/dashboard/advice/mockData.ts` → `src/__mocks__/advice/mockData.ts`.
   - For `Dashboard`, introduce a prop `items?: AdviceItem[]` and pass `mockAdviceItems` only in dev/demo pages.
   - Acceptance: production `Dashboard` does not import mocks.

4. Align Icon system
   - Option A: Make `Icon` consume `ICON_SVGS` via `<img>`/`<svg>` fetch or inline via SVGR.
   - Option B: Remove `ICON_SVGS` and keep inline canonical SVGs in `Icon` + complete missing icons or remove dead names from `ICONS` (traffic-*).
   - Acceptance: `ICONS` names match actual renderable icons; no dead names.

5. Centralize colors
   - Add Tailwind theme tokens (extend colors) for background and text neutrals.
   - Replace hard-coded `#F1F1F1` and repeated grays with tokens or `COLORS`.
   - Acceptance: no raw `#F1F1F1` in components.

6. Unused assets report and pruning
   - Script: scan `public/assets/**/*` and grep references in `src/**`. Produce `scripts/unused-assets.json`.
   - Manually review and delete assets not used.
   - Acceptance: `public/assets` reduced to referenced files only.

### Phase 2 — Structural cleanup

7. Extract Advice UI primitives
   - Create `src/components/dashboard/advice/primitives/*` with shared container, title, badge, image wrappers.
   - Refactor `MetaItem`, `MetaItemAd`, `Interesting`, `Cover`, `RD` to use primitives.
   - Acceptance: reduced duplicate JSX and classNames across advice family; smaller diffs for future changes.

8. DRY test-hooks checks
   - Add `src/lib/testHooks.ts`:
     - `export const isTestHooksEnabled = () => process.env.NEXT_PUBLIC_ENABLE_TEST_HOOKS === 'true'`.
     - Replace repeated literals in `MapContainer`, `MapProvider`.
   - Acceptance: single source of truth for test hook gating.

9. (Done) Remove `LocationList` and `PlaceDetails`
   - Deleted files and cleaned up documentation references.
   - Acceptance: no unused exports in production bundle path.

10. Re-enable or remove skipped test
   - `__tests__/integration/interactions/map-sheet-sync.test.tsx.skip` → fix and enable, or delete.
   - Acceptance: no skipped tests in CI.

### Phase 3 — Optional enhancements

11. Map instance wiring
   - Replace `window.__setMapInstance` handshake with context or event emitter under the provider, if feasible.
   - Acceptance: no global window mutation for core flow.

12. Tailwind design tokens
   - Mirror `COLORS` into Tailwind config for class-based usage instead of inline styles.
   - Acceptance: consistent token usage across utility classes and inline styles.

---

## Concrete Tasks Checklist

- [x] Guard or remove dev pages: `src/app/test-*` (6bba7b1, 2025-08-08)
- [x] Replace raw `console.log` in runtime code with `debugLog` (MapContainer click handler) (2025-08-08)
- [x] Move `mockData.ts` to `src/__mocks__/advice/` and decouple `Dashboard` from mocks (2025-08-08)
- [x] Align Icon system and mappings (093a2ed, 2dec3f5)
- [x] Add `--bg-muted` and replace hard-coded `#F1F1F1` in components (2025-08-08)
- [x] Implement asset usage analysis and prune unreferenced files (cc89d85, 4e4c5e9, 2dec3f5, 0a4252e)
- [x] Extract `advice/primitives/*`; refactor card components (093a2ed)
- [x] Add `isTestHooksEnabled()` helper; use in map components (52beedb)
- [x] Remove `LocationList` and `PlaceDetails` (42d4965)
- [x] Remove skipped test (42d4965)
- [x] Add CI (TS, ESLint, unit+integration) workflows (2025-08-08)
- [x] Align README coverage docs with current Jest thresholds (2025-08-08)
- [ ] Finalize and commit remaining staged asset deletions under `public/assets/`

---

## References (examples)

```25:94:src/components/map/MapContainer.tsx
            console.warn('Failed to destroy existing map instance:', error);
...
             console.log('Map clicked at:', mapEvent.lngLat);
```

```21:24:src/components/dashboard/Dashboard.tsx
  const handleSearch = (query: string) => {
    debugLog('Search query:', query);
    onSearch?.(query);
  };
```

```14:45:src/components/dashboard/advice/mockData.ts
export const mockAdviceItems: AdviceItem[] = [
  // Figma-derived data
```

```38:76:src/lib/icons/index.ts
export const ICON_SVGS = {
  SEARCH: '/assets/icons/78b4...svg',
  MENU: '/assets/icons/249a...svg',
}
```

---

## Rollout Notes

- Phase 1 items can be completed with small PRs: logging cleanup (MapContainer), mock decoupling, color token introduction.
- Schedule Phase 2 and Phase 3 after a tag/release; ensure visual regressions are covered by tests.
- Keep `docs/unused-assets-analysis.md` in sync when removing assets.


