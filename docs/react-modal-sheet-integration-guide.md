# react-modal-sheet Integration Guide

## Executive Summary

This guide provides a comprehensive plan for migrating from our custom bottom sheet implementation to the `react-modal-sheet` library. The migration affects 3 core files, impacts approximately 24 files that reference bottom sheet functionality, and requires careful mapping of gesture behaviors and snap point logic to maintain the current user experience.

**Impact Analysis:**
- **Core Files to Replace:** 3 (BottomSheet.tsx, useBottomSheet.ts, types.ts)
- **Test Files to Update:** 10+ test files
- **Usage Points:** 1 main usage in app/page.tsx
- **Complexity:** Medium-High (due to custom gesture handling)
- **Estimated Effort:** 2-3 days for complete migration

## Current Implementation Analysis

### Components Structure

#### File: `/src/components/bottom-sheet/BottomSheet.tsx`
- **Purpose:** Main bottom sheet component with drag handle and content area
- **Key features:**
  - Custom drag handle with visual feedback
  - Header slot support
  - Content area with conditional scrolling
  - CSS-based animations with `translateY`
  - Data attributes for state tracking
- **Dependencies:** 
  - `useBottomSheet` hook for all logic
  - React 19 features
- **Public API:**
  ```typescript
  interface BottomSheetProps {
    className?: string;
    header?: React.ReactNode;
    children?: React.ReactNode;
    snapPoints?: [number, number, number];
    initialSnap?: number;
    onSnapChange?: (snap: number) => void;
  }
  ```

#### File: `/src/hooks/useBottomSheet.ts`
- **Purpose:** Complex gesture handling and state management
- **Key features:**
  - Pointer event handling for drag gestures
  - Content scroll boundary detection
  - Wheel event handling for desktop
  - Velocity-based snapping (implicit through drag distance)
  - Animation orchestration with transition events
  - Multi-touch gesture support
- **Dependencies:** React hooks only
- **Internal State:**
  - `positionPercentRef`: Current position (0-100)
  - `dragStartYRef`: Initial drag Y position
  - `dragStartPosRef`: Initial sheet position
  - `isDragging`: Dragging state
  - `currentSnap`: Current snap point

#### File: `/src/components/bottom-sheet/types.ts`
- **Purpose:** Type exports
- **Content:** Re-exports types from useBottomSheet hook

### State Management

**Current State Variables:**
```typescript
// In useBottomSheet.ts
positionPercentRef.current  // Actual position percentage (0-100)
dragStartYRef.current       // Starting Y coordinate of drag
dragStartPosRef.current     // Starting position when drag begins
isDragging                  // Boolean - is sheet being dragged
currentSnap                 // Current snap point value
```

**Computed States:**
```typescript
isExpanded = currentSnap >= Math.max(...snapPoints)
currentSheetState = 'collapsed' | 'half' | 'expanded'
position = currentSnap // Back-compat alias
```

### Event Handling

**Gesture Handlers:**
1. **onHandlePointerDown** (lines 98-131)
   - Captures pointer on drag handle
   - Tracks drag movement with pointer events
   - Snaps to nearest point on release

2. **Content Scroll Detection** (lines 133-189)
   - Detects when content is at scroll top
   - Initiates drag when pulling down at boundary
   - Prevents sheet collapse while scrolling content

3. **Wheel Handler** (lines 191-224)
   - Maps wheel events to snap changes
   - Direction: deltaY < 0 expands, deltaY > 0 collapses

## Integration Requirements

### 1. Dependencies Installation

```bash
# Install react-modal-sheet and its peer dependency
npm install react-modal-sheet motion

# Note: motion is required (not framer-motion)
```

### 2. File-by-File Change Matrix

| File Path | Current Implementation | Required Changes | Priority | Complexity |
|-----------|----------------------|------------------|----------|------------|
| `/src/components/bottom-sheet/BottomSheet.tsx` | Custom component with drag handle | Replace with Sheet compound components | High | Medium |
| `/src/hooks/useBottomSheet.ts` | Complex gesture logic | Remove most; keep snap calculation utility | High | Simple |
| `/src/components/bottom-sheet/types.ts` | Type re-exports | Update to match Sheet API | High | Simple |
| `/src/components/bottom-sheet/index.ts` | Export BottomSheet | Export new wrapper component | High | Simple |
| `/src/app/page.tsx` | Uses BottomSheet with props | Update to Sheet API | High | Simple |
| Test files (10+) | Mock useBottomSheet | Mock Sheet components | Medium | Medium |
| Documentation files | Reference old API | Update examples | Low | Simple |

### 3. Feature Mapping

| Current Feature | Current Implementation | react-modal-sheet Equivalent | Implementation Notes |
|-----------------|----------------------|------------------------------|---------------------|
| Snap Points (10/50/90%) | Array of percentages | Convert to decimal (0.1/0.5/0.9) | Simple conversion |
| Initial Snap | `initialSnap` prop defaults to middle | `initialSnap` index prop | Need index not value |
| Velocity Snapping | Implicit through drag distance | Built-in with configurable threshold | Use `dragVelocityThreshold` |
| Drag Handle | Custom div with styles | `<Sheet.Header />` component | Built-in, customizable |
| Content Scrolling | Manual boundary detection | `<Sheet.Scroller>` component | Much simpler |
| Wheel Support | Custom wheel handler | Not built-in | Need custom implementation |
| Animation | CSS transitions with easing | Motion library animations | Different API |
| State Tracking | `currentSnap`, `isDragging` | Access via ref to motion values | More complex |
| onSnapChange | Direct callback with value | onSnap callback with index | Convert index to value |
| Header Slot | `header` prop | Children in Sheet.Header | Structural change |
| CSS Classes | Tailwind on root div | Props on Sheet.Container | Different approach |
| Touch Action | Manual `touch-action: none` | Handled by library | Automatic |
| Safe Area | `paddingBottom: env()` | Apply to Sheet.Container | Same approach |
| Transform | Direct style manipulation | Motion values | Abstracted |
| Expanded Detection | Compare with max snap | Check current snap index | Logic change |

### 4. Code Changes by Component

#### A. BottomSheet.tsx

**Current code to remove (entire file):**
```typescript
// Remove all lines 1-73 from current BottomSheet.tsx
```

**New code to add:**
```typescript
'use client';

import React, { useRef, useImperativeHandle, forwardRef, useCallback, useEffect, useState } from 'react';
import { Sheet, SheetRef } from 'react-modal-sheet';
import './bottom-sheet.css'; // For custom styles

export interface BottomSheetProps {
  className?: string;
  header?: React.ReactNode;
  children?: React.ReactNode;
  snapPoints?: [number, number, number];
  initialSnap?: number;
  onSnapChange?: (snap: number) => void;
}

export const BottomSheet = forwardRef<
  { snapTo: (snap: number) => void },
  BottomSheetProps
>(function BottomSheet(
  { 
    className = '', 
    header, 
    children, 
    snapPoints = [10, 50, 90],
    initialSnap,
    onSnapChange,
    ...rest 
  },
  ref
) {
  const [isOpen, setOpen] = useState(true);
  const sheetRef = useRef<SheetRef>();
  
  // Convert percentage snap points to decimals for react-modal-sheet
  const sheetSnapPoints = snapPoints.map(p => p / 100);
  
  // Find initial snap index
  const initialSnapIndex = initialSnap 
    ? snapPoints.indexOf(initialSnap)
    : 1; // Default to middle

  // Track current snap for state management
  const [currentSnapIndex, setCurrentSnapIndex] = useState(initialSnapIndex);
  
  const handleSnap = useCallback((snapIndex: number) => {
    setCurrentSnapIndex(snapIndex);
    if (onSnapChange) {
      onSnapChange(snapPoints[snapIndex]);
    }
  }, [snapPoints, onSnapChange]);

  // Expose snapTo method
  useImperativeHandle(ref, () => ({
    snapTo: (snapValue: number) => {
      const index = snapPoints.indexOf(snapValue);
      if (index !== -1 && sheetRef.current) {
        sheetRef.current.snapTo(index);
      }
    }
  }), [snapPoints]);

  // Determine state for data attribute
  const isExpanded = currentSnapIndex === snapPoints.length - 1;
  const stateLabel = currentSnapIndex === 0
    ? 'collapsed'
    : currentSnapIndex < snapPoints.length - 1
    ? 'half'
    : 'expanded';

  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      snapPoints={sheetSnapPoints}
      initialSnap={initialSnapIndex}
      onSnap={handleSnap}
      disableDrag={false}
    >
      <Sheet.Container
        className={`bg-white rounded-t-2xl shadow-2xl ${className}`}
        data-testid="bottom-sheet"
        data-sheet-state={stateLabel}
        style={{
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <Sheet.Header>
          {/* Built-in drag handle */}
          <div className="flex justify-center py-2" data-testid="drag-handle">
            <div className="w-12 h-1 rounded-full bg-gray-300" />
          </div>
          {header && (
            <div className="bg-white" style={{ touchAction: 'manipulation' }}>
              {header}
            </div>
          )}
        </Sheet.Header>
        
        <Sheet.Scroller
          className={`px-4 pb-4 ${isExpanded ? 'overflow-y-auto' : 'overflow-hidden'}`}
          data-testid="bottom-sheet-content"
          draggableAt="top"
        >
          {children}
        </Sheet.Scroller>
      </Sheet.Container>
    </Sheet>
  );
});

export default BottomSheet;
```

**Additional CSS file (bottom-sheet.css):**
```css
/* Override react-modal-sheet defaults to match current styles */
[data-rsbs-root] {
  z-index: 50 !important;
}

[data-rsbs-header] {
  cursor: grab;
}

[data-rsbs-header]:active {
  cursor: grabbing;
}
```

#### B. useBottomSheet.ts

**Can be completely removed:** NO
**What needs to be preserved:**
- Snap point calculation utilities (if needed elsewhere)
- Type definitions that other code depends on

**Minimal preservation approach:**
```typescript
"use client";

// This file is largely deprecated after react-modal-sheet migration
// Keeping minimal exports for backward compatibility

export type SnapPoint = number; // percent, 0-100

export interface BottomSheetOptions {
  snapPoints?: [SnapPoint, SnapPoint, SnapPoint];
  initialSnap?: SnapPoint;
  onSnapChange?: (snap: SnapPoint) => void;
}

// Utility function if needed elsewhere
export function nearestSnapPoint(
  current: number, 
  snapPoints: number[]
): number {
  return snapPoints.reduce((nearest, p) =>
    Math.abs(p - current) < Math.abs(nearest - current) ? p : nearest,
    snapPoints[0]
  );
}

// Deprecated hook - returns mock for compatibility
export function useBottomSheet(options: BottomSheetOptions = {}) {
  console.warn('useBottomSheet is deprecated. Use react-modal-sheet directly.');
  
  // Return minimal mock structure for tests
  return {
    sheetRef: { current: null },
    contentRef: { current: null },
    isDragging: false,
    currentSnap: options.initialSnap ?? 50,
    onHandlePointerDown: () => {},
    snapTo: () => {},
    position: options.initialSnap ?? 50,
    isExpanded: false,
    currentSheetState: 'half' as const,
    handleDragStart: () => {},
    handleDragMove: () => {},
    handleDragEnd: () => {},
  };
}
```

### 5. Style and CSS Changes

#### Current Styles to Migrate
**Tailwind Classes:**
- `fixed inset-x-0 bottom-0 z-50` → Handled by Sheet
- `bg-white rounded-t-2xl shadow-2xl` → Apply to Sheet.Container
- `transition-transform duration-300 ease-out` → Handled by Motion
- `px-4 pb-4` → Apply to Sheet.Scroller
- `cursor-grab active:cursor-grabbing` → Apply to Sheet.Header

**Inline Styles:**
- `transform: translateY()` → Handled by Motion
- `height: 100vh` → Handled by Sheet
- `touchAction: none` → Handled by library
- `paddingBottom: env(safe-area-inset-bottom)` → Keep on Container

#### react-modal-sheet Style Requirements
- Import method: No required CSS imports
- Custom styles via className props on components
- Motion handles all animations

### 6. Testing Updates

#### Test Files to Update

| Test File | Changes Needed | New Mocks Required |
|-----------|---------------|-------------------|
| `/src/__tests__/components/bottom-sheet/BottomSheet.test.tsx` | Mock Sheet components instead of hook | Sheet, Sheet.Container, Sheet.Header, Sheet.Scroller |
| `/src/__tests__/hooks/useBottomSheet.test.ts` | Can be deleted or simplified | None |
| `/__tests__/integration/components/BottomSheet.test.tsx` | Update selectors and expectations | Motion values mock |
| `/__tests__/integration/interactions/sheet-scroll.test.tsx` | Update scroll interaction tests | Sheet.Scroller behavior |
| `/__tests__/integration/components/BottomSheet.hydration.test.tsx` | Verify SSR compatibility | Sheet SSR mock |
| `/__tests__/integration/components/BottomSheet.ssr.test.tsx` | Update for Sheet API | Sheet SSR mock |

**Mock Implementation Example:**
```typescript
// __mocks__/react-modal-sheet.tsx
import React from 'react';

export const Sheet = React.forwardRef(({ children, onSnap, snapPoints, initialSnap, ...props }, ref) => {
  React.useImperativeHandle(ref, () => ({
    snapTo: jest.fn(),
  }));
  
  React.useEffect(() => {
    // Simulate initial snap
    if (onSnap && typeof initialSnap === 'number') {
      onSnap(initialSnap);
    }
  }, []);
  
  return <div data-testid="mocked-sheet" {...props}>{children}</div>;
});

Sheet.Container = ({ children, ...props }) => (
  <div data-testid="bottom-sheet" {...props}>{children}</div>
);

Sheet.Header = ({ children }) => (
  <div data-testid="sheet-header">{children}</div>
);

Sheet.Scroller = ({ children, ...props }) => (
  <div data-testid="bottom-sheet-content" {...props}>{children}</div>
);

Sheet.Backdrop = () => null;
```

### 7. Usage Pattern Changes

#### Before (Current):
```typescript
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';

<BottomSheet
  snapPoints={[10, 50, 90]}
  initialSnap={50}
  onSnapChange={(snap) => console.log('Snapped to:', snap)}
  header={<div>Custom Header</div>}
  className="custom-class"
>
  <Dashboard />
</BottomSheet>
```

#### After (With react-modal-sheet wrapper):
```typescript
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';

// API remains the same with our wrapper!
<BottomSheet
  snapPoints={[10, 50, 90]}
  initialSnap={50}
  onSnapChange={(snap) => console.log('Snapped to:', snap)}
  header={<div>Custom Header</div>}
  className="custom-class"
>
  <Dashboard />
</BottomSheet>
```

#### Direct Library Usage (Alternative):
```typescript
import { Sheet } from 'react-modal-sheet';

const [isOpen, setOpen] = useState(true);
const snapPoints = [0.9, 0.5, 0.1]; // Inverted decimals

<Sheet
  isOpen={isOpen}
  onClose={() => setOpen(false)}
  snapPoints={snapPoints}
  initialSnap={1} // Index, not value
  onSnap={(index) => console.log('Snapped to:', snapPoints[index])}
>
  <Sheet.Container className="bg-white rounded-t-2xl shadow-2xl">
    <Sheet.Header>
      <div className="flex justify-center py-2">
        <div className="w-12 h-1 rounded-full bg-gray-300" />
      </div>
      <div>Custom Header</div>
    </Sheet.Header>
    <Sheet.Scroller className="px-4 pb-4">
      <Dashboard />
    </Sheet.Scroller>
  </Sheet.Container>
</Sheet>
```

### 8. Migration Risks and Mitigations

| Risk | Impact | Mitigation Strategy |
|------|--------|-------------------|
| Wheel event support missing | High | Implement custom wheel handler on Sheet.Scroller |
| Different animation feel | Medium | Tune Motion spring config to match current easing |
| Snap point index vs value confusion | Medium | Wrapper component handles conversion |
| Test suite breakage | High | Comprehensive mocks before implementation |
| SSR/Hydration issues | Medium | Test in Next.js dev and production modes |
| Performance regression | Low | Motion is highly optimized, likely improvement |
| Gesture direction differences | Medium | Test thoroughly on mobile devices |
| Lost custom behaviors | Medium | Document all current behaviors first |
| Content scroll detection changes | High | Sheet.Scroller handles differently, needs testing |

### 9. Rollback Plan

1. **Keep old implementation in parallel:**
   - Rename current files with `.old` suffix
   - Create new implementation alongside
   - Use feature flag to switch

2. **Feature flag approach:**
   ```typescript
   const USE_NEW_SHEET = process.env.NEXT_PUBLIC_USE_NEW_SHEET === 'true';
   
   export const BottomSheet = USE_NEW_SHEET 
     ? NewBottomSheet 
     : OldBottomSheet;
   ```

3. **Rollback steps:**
   - Set feature flag to false
   - Revert package.json changes
   - Remove react-modal-sheet dependency
   - Restore old file names

### 10. Validation Checklist

**Before Integration:**
- [x] All current features documented
- [x] All test cases identified
- [ ] Performance baseline recorded (current FPS, render times)
- [ ] Create feature flag infrastructure

**During Integration:**
- [ ] Install dependencies (react-modal-sheet, motion)
- [ ] Create wrapper component maintaining current API
- [ ] Update all imports to use wrapper
- [ ] Implement custom wheel handler
- [ ] Update all test mocks
- [ ] Fix TypeScript errors
- [ ] Run existing tests
- [ ] Manual testing on mobile devices

**After Integration:**
- [ ] All snap points working (10/50/90%)
- [ ] Gesture responsiveness maintained
- [ ] Mobile performance at 60fps
- [ ] No visual regressions
- [ ] All tests passing
- [ ] Wheel events working on desktop
- [ ] Content scrolling works when expanded
- [ ] SSR/Hydration working correctly
- [ ] Header slot rendering correctly
- [ ] Safe area insets applied

## Appendix A: Current Feature Specifications

### Gesture Behaviors
1. **Drag Handle**: 48x4px visual indicator, grabbable cursor
2. **Snap Points**: 10% (collapsed), 50% (half), 90% (expanded)
3. **Initial State**: Starts at 50% (half) position
4. **Scroll Direction**: 
   - Scroll DOWN/Swipe DOWN = EXPAND (natural push)
   - Scroll UP/Swipe UP = COLLAPSE (natural pull)
5. **Content Scrolling**: Only enabled when fully expanded (90%)
6. **Boundary Detection**: Pull down at scroll top initiates collapse
7. **Animation**: 260ms cubic-bezier(0.22, 1, 0.36, 1)
8. **State Labels**: 'collapsed', 'half', 'expanded' data attributes

### Visual Design
- Background: White (#FFFFFF)
- Border Radius: Top 16px (rounded-t-2xl)
- Shadow: 2xl depth
- Z-index: 50
- Drag Handle: Gray (#D3D3D3), changes to darker when dragging

### Touch Interactions
- Pointer capture for smooth dragging
- Passive event listeners where appropriate
- Touch-action CSS for gesture control
- Safe area padding for iOS devices

## Appendix B: react-modal-sheet API Reference

### Key Components
- `<Sheet>`: Root container, manages state
- `<Sheet.Container>`: Visual container with styles
- `<Sheet.Header>`: Draggable area with handle
- `<Sheet.Content>`: Static content area
- `<Sheet.Scroller>`: Scrollable content area
- `<Sheet.Backdrop>`: Optional background overlay

### Key Props
- `isOpen`: Boolean for visibility
- `onClose`: Callback when closed
- `snapPoints`: Array of positions (0-1 decimals)
- `initialSnap`: Starting snap index
- `onSnap`: Callback with snap index
- `disableDrag`: Disable all dragging
- `dragVelocityThreshold`: Sensitivity tuning

### Motion Values
- Access via ref: `sheetRef.current.y`
- Subscribe to changes for advanced use

## Appendix C: Decision Log

| Decision | Rationale | Alternatives Considered |
|----------|-----------|------------------------|
| Create wrapper component | Maintains existing API, easier migration | Direct replacement (more work) |
| Keep percentage snap points in API | Consistency with current code | Switch to decimals everywhere |
| Implement custom wheel handler | Feature parity required | Drop wheel support |
| Use motion not framer-motion | Library requirement | None |
| Preserve data attributes | Tests depend on them | Update all tests |
| Feature flag for rollback | Safe deployment | Direct replacement (risky) |

## Implementation Notes

### Critical Success Factors
1. **Maintain exact gesture directions** - Users expect current behavior
2. **Preserve 60fps performance** - No regression allowed
3. **Keep current API** - Minimize code changes
4. **Support all current features** - Including wheel events

### Known Challenges
1. **Wheel Event Support**: Not native to library, needs custom implementation
2. **Snap Value vs Index**: Library uses indices, we use values
3. **State Tracking**: More complex with Motion values
4. **Test Mocking**: Motion library is complex to mock

### Recommended Approach
1. Start with wrapper component approach
2. Implement in parallel with feature flag
3. Test extensively on real devices
4. Gradual rollout with monitoring
5. Keep old code for 2-3 sprints post-deployment