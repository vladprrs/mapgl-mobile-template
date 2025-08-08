# Bottom Sheet Architecture

Simple draggable bottom sheet for map overlay content.

## Structure

```
components/bottom-sheet/
├── BottomSheet.tsx       # Main component
├── DragHandle.tsx        # Draggable handle
└── index.ts             # Exports

hooks/
└── useBottomSheet.ts    # State + gestures
```

## Core Component

```typescript
interface BottomSheetProps {
  children: React.ReactNode;
  snapPoints?: [number, number, number]; // Default: [10, 50, 90]
  onSnapChange?: (snap: number) => void;
}

// Usage
<BottomSheet snapPoints={[10, 50, 90]}>
  {/* Your content goes here */}
</BottomSheet>
```

## Main Hook

```typescript
function useBottomSheet(snapPoints = [10, 50, 90]) {
  // State
  const [currentSnap, setCurrentSnap] = useState(10);
  const [isDragging, setIsDragging] = useState(false);
  
  // Actions
  const snapTo = (point: number) => { /* animate to snap point */ };
  const handleDrag = (deltaY: number) => { /* update position */ };
  
  return {
    currentSnap,
    isDragging,
    snapTo,
    handleDrag,
    isExpanded: currentSnap >= 90,
    sheetRef
  };
}
```

## Gesture Flow

```
Touch Start → Track Position → Calculate Velocity → Snap to Nearest Point
```

## Key Features

- **Snap Points**: 10% (collapsed), 50% (half), 90% (expanded)
- **Gestures**: Touch drag on handle + sheet content
- **Scrolling**: Only enabled when expanded (90%)
- **Animation**: CSS transforms with transitions

## Implementation Plan

1. Create `useBottomSheet` hook with state management
2. Build `BottomSheet` component with positioning
3. Add `DragHandle` with touch events
4. Test gesture interactions
5. Add content scrolling logic

## Types

```typescript
type SnapPoint = 10 | 50 | 90;

interface SheetState {
  position: number;     // Current Y position (%)
  snapPoint: SnapPoint; // Current snap point
  isDragging: boolean;
  velocity: number;     // For snap calculations
}
```