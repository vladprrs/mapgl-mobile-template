## Bottom Sheet Architecture, Issues, and Improvement Plan

### Scope and Inputs

- **Analyzed files**:
  - **Core logic**: `src/hooks/useBottomSheet.ts`, `src/components/bottom-sheet/BottomSheet.tsx`, `src/components/bottom-sheet/BottomSheetWithDashboard.tsx`
  - **Layout components**: `src/components/dashboard/Dashboard.tsx`, `src/components/dashboard/QuickAccessPanel.tsx`, `src/components/dashboard/StoriesPanel.tsx`, `src/components/dashboard/advice/AdviceSection.tsx`
  - **Tests**: `src/__tests__/hooks/useBottomSheet.test.ts`, `__tests__/integration/components/*`, `src/__tests__/components/bottom-sheet/BottomSheet.test.tsx`, SSR/hydration tests under `__tests__/integration/components/`
- **Note**: The requested `__tests__/integration/bottom-sheet-integration.test.ts` was not found; closest coverage exists under `__tests__/integration/components/`.

---

### Current State Analysis

- **Sheet composition and positioning**
  - The sheet wrapper is `fixed` at the bottom with `height: 100vh` and a GPU-friendly translate transform derived from a percentage position.
  - Transform formula: `translateY(100 - position)%` where `position` is a percent of viewport height.
  - CSS classes: `transition-transform duration-300 ease-out`; while dragging, transitions are disabled via `transition-none`.

- **Snap points and states**
  - Defaults: `[10, 50, 90]` (percent). Initial snap and visible position: middle (50%).
  - Derived states based on `snapPoint`: `collapsed` (≤ first), `half` (≤ middle), `expanded` (otherwise).

- **Gesture handling**
  - Drag via `DragHandle`: React handlers for `touchstart/move/end` and `mousedown` drive `handleDragStart/Move/End`.
  - Content area: native touch listeners attached to `contentRef` to prioritize content scroll when expanded and to flip to sheet drag at scroll boundaries using a two-phase boundary lock.
  - Wheel: native `wheel` listener on the sheet wrapper (desktop support) with `passive: false`.

- **Scroll behavior**
  - Content is scrollable (`overflow-y-auto`) only when the sheet is `expanded`; otherwise, overflow is hidden.
  - Additional styles: `overscrollBehavior` toggled by expansion; `touchAction` is `auto` when expanded and `none` otherwise.

- **Snap evaluation and velocity**
  - While dragging, `position` updates based on `deltaY / window.innerHeight * 100`, with rubber-band clamping beyond min/max snap points.
  - On release, nearest snap point is chosen, biased by a simplistic velocity threshold; velocity is computed as average since drag start.

- **Dashboard variants**
  - `BottomSheet`: places all dashboard content (including a sticky search bar) inside the scroll container. This can desynchronize header motion from the sheet transform during transitions.
  - `BottomSheetWithDashboard`: elevates `SearchBar` and `QuickAccessPanel` into a unified header outside the scrollable content, so they move as part of the sheet transform, improving visual sync.

- **Tests overview**
  - Unit: defaults, snapping, state flags, refs available, basic momentum behavior.
  - Integration: structure, transforms, animation classes, overflow toggling, SSR/hydration stability.

---

### Identified Issues

- **Animation synchronization**
  - In the base `BottomSheet` + `Dashboard` arrangement, the sticky header inside the scroll container uses `position: sticky`, which is driven by scroll, not the sheet transform. During snap/drag transitions, this can momentarily fall out of sync with the wrapper transform.
  - Mixed placement across variants (some pages use `BottomSheetWithDashboard`, others the base `BottomSheet`) creates inconsistent motion and timing for top UI elements.

- **Visual separation during fast gestures**
  - Boundary-lock hysteresis introduces a deliberate delay between content reaching a limit and sheet movement, which feels like a gap or lag in motion.
  - Different buffers are used in different code paths (e.g., 3px vs. 8px), leading to inconsistent flip behavior.
  - The first frame after switching to sheet drag intentionally skips movement to avoid a jump, worsening perceived separation under quick swipes.

- **Scroll boundary detection inconsistencies**
  - Direction naming and semantics differ across functions, making it easy to misapply top/bottom boundary logic.
  - Bottom boundary path often returns early, blocking sheet expansion when content is pinned at bottom and user swipes up.
  - Content scroll eligibility is only considered for `expanded` state, which can make transitions from `half` to `expanded` feel sticky when content is already at its top.

- **Velocity and snapping**
  - Average-since-start velocity underestimates flicks and produces suboptimal snap choices after long drags followed by quick releases.

- **Performance concerns**
  - Transform updates during drag are driven by React state updates on every move, risking re-render jank and missing 60fps on mobile.
  - `scrollBehavior: smooth` on content competes with sheet transitions and adds main-thread work.
  - No explicit layer promotion hints; inconsistent event models (React vs. native) complicate hot-path optimization.

---

### Root Cause Analysis

- **Desynchronization between header and transform plane**
  - Sticky headers inside the scroll container rely on scroll position while the sheet wrapper moves via transform. During transitions, these systems can disagree for a frame, causing visible misalignment.
  - Only `BottomSheetWithDashboard` avoids this by pulling header UI outside the scroll container and into the transform plane.

- **Split gesture pipelines with asymmetric thresholds**
  - Handle drag and content touch use different detection paths and thresholds. The two-phase boundary lock adds delay and is asymmetric between top and bottom, creating cases where neither content nor sheet moves immediately.

- **Render-driven motion under heavy input**
  - Per-move React state updates propagate through the component tree. Without `requestAnimationFrame` batching and direct transform writes, frames can be dropped, especially on less powerful devices.

---

### Proposed Architecture

- **Single animation plane with unified header**
  - Always render header elements (e.g., `SearchBar`, `QuickAccessPanel`, drag handle) as children of the sheet wrapper but outside the scroll container. This guarantees that all visible chrome moves together via the same transform.
  - Remove reliance on `position: sticky` for header within the scroll container when inside the sheet.

- **Interaction state machine**
  - States: `Idle`, `DraggingSheet`, `ScrollingContent`, `ArmedAtTopBoundary`, `ArmedAtBottomBoundary`, `Snapping`.
  - Transitions:
    - If expanded and content can scroll in intended direction → `ScrollingContent`.
    - On boundary hit → `Armed*Boundary` with symmetric post-boundary threshold (e.g., 10px) to flip to `DraggingSheet`.
    - On drag end → `Snapping` → nearest snap based on distance and recent velocity.

- **Unified gesture model**
  - Use Pointer Events for both handle and content. Normalize deltas in pixels, convert to percent only for final position updates.
  - `touch-action` policy:
    - Sheet wrapper/handle: `none` (we fully manage vertical touch/pan).
    - Content (expanded): `pan-y`.
    - Horizontal scrollers (`QuickAccessPanel`, `StoriesPanel`): `pan-x` to avoid vertical gesture capture.

- **Boundary detection and hysteresis**
  - A single helper computes `isAtTop`, `isAtBottom`, and `canScroll(direction)` with one epsilon across the app (e.g., 3px).
  - Apply symmetric post-boundary distance to flip from content scroll to sheet drag at both top and bottom.

- **Performance and animation**
  - Drag path: apply transform via `requestAnimationFrame` directly to the DOM style of the sheet wrapper; update React state only on drag start/end and snap completion.
  - Promote the sheet wrapper to its own composited layer via `will-change: transform`, `transform: translateZ(0)`, `contain: layout paint size`.
  - Remove `scrollBehavior: smooth` from the scroll container to avoid double animations.
  - Use a recent-delta velocity estimator (track last N frames) for better flick detection.
  - Dynamic snap duration based on travel distance (clamped, e.g., 180–350ms) with a single easing (e.g., easeOutCubic). Respect `prefers-reduced-motion`.

- **Code organization**
  - Extract a `SheetController` module that encapsulates the state machine, boundary utilities, velocity estimation, and RAF-based transform writing.
  - Keep `useBottomSheet` as a thin React bridge that:
    - Wires refs and lifecycles
    - Subscribes to controller events
    - Exposes public handlers and state required by components
  - Provide a canonical `SheetLayout` with explicit `header` and `content` slots to enforce structure across variants.

---

### Implementation Roadmap

- **Phase 0: Safety scaffold**
  - Introduce a feature flag (e.g., `sheetControllerV2`) and a prop override to enable the new path per-instance. Default off.

- **Phase 1: Structural unification**
  - Create `SheetLayout` to enforce a unified, non-scrolling header plus scrollable content.
  - Update `BottomSheet` to use this layout, aligning it with `BottomSheetWithDashboard`.
  - Deprecate sticky header usage inside `Dashboard` when rendered within the sheet; use the header slot instead.

- **Phase 2: Controller extraction**
  - Implement `SheetController` with:
    - Interaction state machine
    - Unified boundary detection helpers and constants
    - Recent-delta velocity estimator
    - RAF-driven transform updates and snap animations
  - Adapt `useBottomSheet` to delegate logic to the controller.

- **Phase 3: Input normalization**
  - Migrate to Pointer Events for drag/touch across handle/content.
  - Apply `touch-action` policies: sheet/handle `none`, content `pan-y` when expanded, horizontal scrollers `pan-x`.
  - Consolidate wheel handling to route through the controller/state machine.

- **Phase 4: Animation polish**
  - Add dynamic duration and one easing for snapping; respect reduced motion.
  - Add layer promotion CSS to the wrapper; remove `scrollBehavior: smooth` from content.

- **Phase 5: Rollout and cleanup**
  - Keep both paths under the flag for one release cycle.
  - Ship telemetry for boundary flips and snap outcomes to catch regressions early (if permissible).
  - Remove legacy divergent paths once stable.

- **Rollback per phase**
  - Feature flag acts as a global kill switch.
  - Separate `useUnifiedHeader` flag to revert structural changes independently if needed.

---

### Testing Strategy

- **Unit tests**
  - State machine transitions: content vs. sheet at boundaries with symmetric thresholds.
  - Boundary helpers: accurate `isAtTop`/`isAtBottom` with epsilon.
  - Velocity estimator: recent-frame flicks vs. slow drags.

- **Integration tests**
  - Header and content move in lockstep with the sheet during drags and snap transitions.
  - Expanded content: scrolling does not move the sheet; at boundaries, extra motion beyond hysteresis flips to sheet drag.
  - Horizontal scrollers do not block vertical sheet drag (verify `touch-action: pan-x`).
  - Wheel events respect boundaries and state machine on desktop.

- **Performance tests**
  - Emulate mid/low-end devices; verify ≤16ms per frame on drag; ensure no layout reads in hot path.
  - Confirm wrapper is on its own composited layer during motion.

- **SSR/Hydration**
  - Initial transforms remain percentage-based to avoid mismatches.
  - No hydration warnings with or without the feature flag.

- **Regression matrix**
  - Rapid successive drags/flicks, direction changes mid-drag, short-content scenarios (no scroll), large-content scenarios, and boundary edge cases.

---

### Actionable Changes Checklist

- **Structure**
  - Migrate to unified header slot across all sheet usages.
  - Remove sticky header usage inside `Dashboard` when inside the sheet.

- **Controller**
  - Implement `SheetController` with RAF-driven updates, unified thresholds, recent-delta velocity.
  - Delegate `useBottomSheet` to the controller; keep API stable.

- **Styling & performance**
  - Add `will-change: transform`, `transform: translateZ(0)`, `contain: layout paint size` to the sheet wrapper.
  - Remove `scrollBehavior: smooth` from the content scroll container.

- **Input semantics**
  - Apply `touch-action`: wrapper/handle `none`, content `pan-y` when expanded, horizontal scrollers `pan-x`.

- **Animation**
  - Use dynamic, distance-based snap duration and consistent easing curve; honor reduced motion.

- **Rollout**
  - Gate with `sheetControllerV2` and `useUnifiedHeader`; maintain rollback paths; stage telemetry.


