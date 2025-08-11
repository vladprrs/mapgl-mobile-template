'use client';

// Legacy hook - kept for backward compatibility with type exports
// All functionality is now handled by react-modal-sheet internally

export type SnapPoint = number;

export interface BottomSheetOptions {
  snapPoints?: [SnapPoint, SnapPoint, SnapPoint];
  initialSnap?: SnapPoint;
  onSnapChange?: (snap: SnapPoint) => void;
}

// This hook is no longer used but kept to prevent import errors
// Will be removed in next major version
export function useBottomSheet(options: BottomSheetOptions = {}) {
  const snapPoints = options.snapPoints ?? [10, 50, 90];
  const initialSnap = options.initialSnap ?? snapPoints[1];
  const maxSnap = Math.max(...snapPoints);
  
  // Return empty mock - the new BottomSheet component handles everything internally
  return {
    sheetRef: { current: null },
    contentRef: { current: null },
    isDragging: false,
    currentSnap: initialSnap,
    onHandlePointerDown: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    snapTo: (_snap?: any) => {},
    position: initialSnap,
    isExpanded: initialSnap >= maxSnap,
    currentSheetState: initialSnap <= Math.min(...snapPoints)
      ? 'collapsed' as const
      : initialSnap >= maxSnap
      ? 'expanded' as const
      : 'half' as const,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    handleDragStart: (_clientY?: any, _type?: any) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    handleDragMove: (_clientY?: any) => {},
    handleDragEnd: () => {},
  };
}