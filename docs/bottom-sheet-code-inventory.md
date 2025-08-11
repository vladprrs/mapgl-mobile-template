# Bottom Sheet Code Inventory

## useBottomSheet.ts Function Inventory

### Core Functions

| Function Name | Line # | Purpose | Can Replace with Library? | Preservation Strategy |
|--------------|--------|---------|---------------------------|---------------------|
| `useBottomSheet` | 32-251 | Main hook entry point | YES - Sheet component | Create wrapper for compatibility |
| `applyTransform` | 46-50 | Sets translateY CSS transform | YES - Motion handles | Not needed |
| `nearestSnap` | 52-59 | Finds closest snap point | PARTIAL - onSnap gives index | Keep as utility if needed |
| `animateTo` | 61-88 | Animates to target with easing | YES - Motion animations | Not needed |
| `snapTo` | 90-96 | Public API to snap programmatically | YES - sheetRef.snapTo() | Wrap in new API |
| `onHandlePointerDown` | 98-131 | Drag handle gesture handler | YES - Sheet.Header | Not needed |

### Internal Event Handlers

| Function Name | Line # | Purpose | Can Replace with Library? | Preservation Strategy |
|--------------|--------|---------|---------------------------|---------------------|
| Content `onDown` | 140-143 | Pointer down in content | YES - Sheet.Scroller | Not needed |
| Content `onMove` | 145-180 | Detect scroll boundary drag | YES - Sheet.Scroller draggableAt | Not needed |
| Content `moveWhileDragging` | 156-168 | Continue drag from content | YES - Built-in | Not needed |
| Content `upWhileDragging` | 169-176 | End drag from content | YES - Built-in | Not needed |
| Wheel `onWheel` | 197-220 | Mouse wheel snap changes | NO - Not supported | Custom implementation needed |

### State Management Functions

| Function Name | Purpose | Library Equivalent |
|--------------|---------|-------------------|
| `setIsDragging` | Track dragging state | Motion value subscription |
| `setCurrentSnap` | Track current snap point | onSnap callback |

### Ref Management

| Ref Name | Purpose | Library Equivalent |
|----------|---------|-------------------|
| `sheetRef` | DOM reference to sheet | Sheet ref prop |
| `contentRef` | DOM reference to content | Not needed (internal) |
| `positionPercentRef` | Current position tracking | Motion y value |
| `dragStartYRef` | Drag start coordinate | Internal to library |
| `dragStartPosRef` | Drag start position | Internal to library |

## BottomSheet.tsx Component Inventory

### Props Interface

| Prop Name | Type | Default | Purpose | Library Mapping |
|-----------|------|---------|---------|-----------------|
| `className` | string | '' | Custom CSS classes | Sheet.Container className |
| `header` | ReactNode | undefined | Header content slot | Children in Sheet.Header |
| `children` | ReactNode | undefined | Main content | Children in Sheet.Scroller |
| `snapPoints` | [number, number, number] | [10, 50, 90] | Snap percentages | Convert to decimals for snapPoints |
| `initialSnap` | number | snapPoints[1] | Starting position | Convert to index for initialSnap |
| `onSnapChange` | (snap: number) => void | undefined | Snap callback | Wrap onSnap to pass value |

### Component Structure

| Element | Lines | Purpose | Library Replacement |
|---------|-------|---------|-------------------|
| Root div | 24-42 | Container with transforms | `<Sheet>` component |
| Drag handle div | 43-49 | Visual handle and grab area | `<Sheet.Header>` with custom content |
| Header wrapper | 51-55 | Optional header area | Part of `<Sheet.Header>` |
| Content div | 57-68 | Scrollable content area | `<Sheet.Scroller>` |

### Data Attributes

| Attribute | Values | Purpose | Preserve? |
|-----------|--------|---------|-----------|
| `data-testid="bottom-sheet"` | - | Test selector | YES - Add to Sheet.Container |
| `data-sheet-state` | 'collapsed', 'half', 'expanded' | State tracking | YES - Calculate from snap index |
| `data-testid="drag-handle"` | - | Test selector | YES - Add to handle wrapper |
| `data-testid="bottom-sheet-content"` | - | Test selector | YES - Add to Sheet.Scroller |

## CSS Classes and Styles

### Tailwind Classes

| Location | Classes | Purpose | Apply To |
|----------|---------|---------|----------|
| Root | `fixed inset-x-0 bottom-0 z-50` | Positioning | Handled by Sheet |
| Root | `bg-white rounded-t-2xl shadow-2xl` | Visual style | Sheet.Container |
| Root | `transition-transform duration-300 ease-out` | Animation | Handled by Motion |
| Handle wrapper | `flex justify-center py-2` | Handle layout | Custom in Sheet.Header |
| Handle wrapper | `cursor-grab active:cursor-grabbing` | Cursor feedback | Sheet.Header or custom CSS |
| Handle bar | `w-12 h-1 rounded-full` | Handle size | Custom in Sheet.Header |
| Handle bar | `bg-gray-300` / `bg-gray-500` | Handle color | Custom with state |
| Content | `h-full px-4 pb-4` | Content spacing | Sheet.Scroller |
| Content | `overflow-y-auto` / `overflow-hidden` | Scroll control | Handled by Sheet.Scroller |

### Inline Styles

| Location | Style | Purpose | Library Handling |
|----------|-------|---------|-----------------|
| Root | `transform: translateY(X%)` | Position | Motion values |
| Root | `height: 100vh` | Full height | Automatic |
| Root | `paddingBottom: env(safe-area-inset-bottom)` | iOS safe area | Apply to Container |
| Root | `willChange: transform` | Performance hint | Automatic |
| Root | `contain: layout paint size` | Performance | Not needed |
| Root | `backfaceVisibility: hidden` | Performance | Not needed |
| Root | `touchAction: none` | Touch handling | Automatic |
| Header | `touchAction: manipulation` | Touch handling | Automatic |
| Content | `overscrollBehavior` | Scroll behavior | Handled internally |
| Content | `touchAction: pan-y / none` | Touch control | Handled by draggableAt |
| Content | `scrollBehavior: auto` | Scroll type | Default |

## Hook Return Values

| Field | Type | Purpose | Used By | Library Equivalent |
|-------|------|---------|---------|-------------------|
| `sheetRef` | RefObject | DOM reference | Tests | Sheet ref |
| `contentRef` | RefObject | Content DOM ref | Internal | Not exposed |
| `isDragging` | boolean | Dragging state | UI feedback | Motion value |
| `currentSnap` | number | Current snap value | State logic | Calculate from index |
| `onHandlePointerDown` | Function | Drag initiator | Handle element | Not needed |
| `snapTo` | Function | Programmatic snap | External control | sheetRef.snapTo |
| `position` | number | Back-compat alias | Tests | Same as currentSnap |
| `isExpanded` | boolean | Expanded check | Scroll control | Check snap index |
| `currentSheetState` | string | State label | Tests | Calculate from index |
| `handleDragStart` | Function | Legacy handler | Tests (unused) | Remove |
| `handleDragMove` | Function | Legacy handler | Tests (unused) | Remove |
| `handleDragEnd` | Function | Legacy handler | Tests (unused) | Remove |

## Test Dependencies

### Mocked Functions

| Function | Used In Tests | Purpose | New Mock Approach |
|----------|--------------|---------|-------------------|
| `useBottomSheet` entire hook | All component tests | Isolate component | Mock Sheet components |
| `snapTo` | Snap tests | Test programmatic control | Mock sheetRef.snapTo |
| `onSnapChange` | Callback tests | Verify events | Mock onSnap |

### Test Selectors

| Selector | Type | Count | Purpose |
|----------|------|-------|---------|
| `[data-testid="bottom-sheet"]` | data-testid | 15+ | Find sheet container |
| `[data-testid="drag-handle"]` | data-testid | 5+ | Find drag handle |
| `[data-testid="bottom-sheet-content"]` | data-testid | 10+ | Find content area |
| `.fixed` | class | 8+ | Find sheet by class |
| `.cursor-grab` | class | 3+ | Find handle by cursor |
| `.px-4` | class | 5+ | Find content by padding |
| `.w-12` | class | 2+ | Find handle bar |
| `[data-sheet-state]` | attribute | 5+ | Check state |

## Usage Patterns

### Direct Usage in App

```typescript
// app/page.tsx - Lines 29-38
<BottomSheet
  snapPoints={[10, 50, 90]}
  header={<div className="bg-white">{/* content */}</div>}
>
  <Dashboard items={devItems} showSearchBar={false} showQuickAccess={false} />
</BottomSheet>
```

### Common Test Patterns

```typescript
// Basic render test
render(<BottomSheet><div>Content</div></BottomSheet>)

// With props test
render(
  <BottomSheet 
    snapPoints={[10, 50, 90]}
    onSnapChange={mockFn}
    className="custom"
  >
    <div>Content</div>
  </BottomSheet>
)

// Ref access test
const ref = useRef();
render(<BottomSheet ref={ref} />);
ref.current.snapTo(90);
```

## Configuration Constants

| Constant | Value | Location | Purpose | Keep? |
|----------|-------|----------|---------|-------|
| `EASING` | "cubic-bezier(0.22, 1, 0.36, 1)" | useBottomSheet:29 | Animation curve | NO - Motion handles |
| `ANIMATION_MS` | 260 | useBottomSheet:30 | Animation duration | NO - Motion handles |
| Default snaps | [10, 50, 90] | Multiple | Default positions | YES - In wrapper |
| Velocity threshold | 6 (implicit) | useBottomSheet:152 | Drag sensitivity | Configure in library |
| Wheel threshold | 20 | useBottomSheet:199 | Wheel sensitivity | Keep for custom handler |

## Import/Export Analysis

### Current Exports

```typescript
// components/bottom-sheet/index.ts
export { BottomSheet, type BottomSheetProps } from './BottomSheet';

// components/bottom-sheet/types.ts  
export type { SnapPoint, BottomSheetOptions } from '@/hooks/useBottomSheet';

// hooks/useBottomSheet.ts
export function useBottomSheet(options?: BottomSheetOptions): InternalAPI;
export type SnapPoint = number;
export interface BottomSheetOptions { ... }
```

### Import Locations

| File | Imports | Usage |
|------|---------|-------|
| app/page.tsx | `BottomSheet` | Main app usage |
| 10+ test files | `BottomSheet`, `useBottomSheet` | Testing |
| Documentation | Examples only | Reference |

## Performance Considerations

| Current Optimization | Purpose | Library Equivalent |
|---------------------|---------|-------------------|
| `translateZ(0)` | GPU acceleration | Handled by Motion |
| `will-change: transform` | Browser hint | Automatic |
| `contain: layout paint size` | Containment | Not needed |
| `backface-visibility: hidden` | Prevent flicker | Not needed |
| No-op transitions during drag | Smooth dragging | Handled by Motion |
| RAF-based animations | 60fps | Motion optimized |
| Passive event listeners | Scroll performance | Library optimized |

## Migration Impact Summary

### Files Requiring Changes
- **Direct changes:** 3 files (BottomSheet.tsx, useBottomSheet.ts, types.ts)
- **Import updates:** 1 file (app/page.tsx)
- **Test updates:** 10+ files
- **Documentation updates:** 3+ files

### Code to Preserve
1. Snap point percentage values (10, 50, 90)
2. State calculation logic ('collapsed', 'half', 'expanded')
3. Test selectors (data-testid attributes)
4. Public API shape (props interface)
5. Wheel event handling (custom implementation)

### Code to Remove
1. All manual gesture handling (150+ lines)
2. Transform calculations (20+ lines)
3. Animation orchestration (30+ lines)
4. Event listener management (40+ lines)
5. Ref manipulations (15+ lines)

### New Code Required
1. Wrapper component (~100 lines)
2. Custom wheel handler (~30 lines)
3. Test mocks (~50 lines)
4. Type definitions (~20 lines)
5. CSS overrides (~10 lines)