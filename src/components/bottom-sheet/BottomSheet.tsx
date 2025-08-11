'use client';

import React, { useRef, useImperativeHandle, forwardRef, useCallback, useEffect, useState } from 'react';
import { Sheet, SheetRef } from 'react-modal-sheet';
import './bottom-sheet.css';

export interface BottomSheetProps {
  className?: string;
  header?: React.ReactNode;
  stickyHeader?: React.ReactNode;
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
    stickyHeader,
    children, 
    snapPoints = [10, 50, 90],
    initialSnap,
    onSnapChange
  },
  ref
) {
  // Only render the sheet after client-side hydration to prevent mismatches
  const [isMounted, setIsMounted] = useState(false);
  // CRITICAL: Sheet must ALWAYS remain open to prevent disappearing off-screen
  // We handle "closing" by snapping to minimum position instead
  const isOpen = true; // Always true - never allow complete closure
  const sheetRef = useRef<SheetRef | undefined>(undefined);
  
  // Convert percentage snap points to decimals for react-modal-sheet
  // react-modal-sheet expects snap points where:
  // - Values between 0-1 represent percentages (0.5 = 50% of sheet height)
  // - Prefer using 1 for fully visible sheet (not 0.9)
  // Our API: [10, 50, 90] -> react-modal-sheet: [0.9, 0.5, 0.1]
  const sheetSnapPoints = snapPoints.map(p => {
    // 90% visible = 0.9, 50% = 0.5, 10% = 0.1
    return p / 100;
  }).reverse(); // Reverse for descending order
  
  // Find initial snap index (accounting for reversed array)
  const initialSnapValue = initialSnap ?? snapPoints[1]; // Default to middle
  const originalIndex = snapPoints.indexOf(initialSnapValue);
  const initialSnapIndex = originalIndex !== -1 
    ? snapPoints.length - 1 - originalIndex // Reverse the index
    : snapPoints.length - 2; // Default to middle in reversed array
  
  // Track current snap for state management
  const [currentSnapIndex, setCurrentSnapIndex] = useState(initialSnapIndex);
  
  const handleSnap = useCallback((snapIndex: number) => {
    setCurrentSnapIndex(snapIndex);
    // Convert back to original snap point value
    const originalIndex = snapPoints.length - 1 - snapIndex;
    if (onSnapChange) {
      onSnapChange(snapPoints[originalIndex]);
    }
  }, [snapPoints, onSnapChange]);
  
  // Ensure component only renders on client to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    // Call onSnapChange with initial value after mount
    if (onSnapChange) {
      const originalIndex = snapPoints.length - 1 - initialSnapIndex;
      onSnapChange(snapPoints[originalIndex]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Expose snapTo method
  useImperativeHandle(ref, () => ({
    snapTo: (snapValue: number) => {
      const originalIndex = snapPoints.indexOf(snapValue);
      if (originalIndex !== -1 && sheetRef.current) {
        // Convert to reversed index for react-modal-sheet
        const reversedIndex = snapPoints.length - 1 - originalIndex;
        sheetRef.current.snapTo(reversedIndex);
      }
    }
  }), [snapPoints]);
  
  // Determine state for data attribute (based on original snap point values)
  const originalSnapIndex = snapPoints.length - 1 - currentSnapIndex;
  const stateLabel = originalSnapIndex === 0
    ? 'collapsed'
    : originalSnapIndex < snapPoints.length - 1
    ? 'half'
    : 'expanded';
  
  
  // Render placeholder during SSR to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 ${className}`}
        style={{
          height: `${snapPoints[initialSnapIndex ?? 1]}vh`,
          transform: 'translateY(0)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
        data-testid="bottom-sheet"
        data-sheet-state={stateLabel}
      >
        <div className="flex justify-center py-2" data-testid="drag-handle">
          <div className="w-12 h-1 rounded-full bg-gray-300" />
        </div>
        {header && (
          <div className="bg-white" style={{ touchAction: 'manipulation' }}>
            {header}
          </div>
        )}
        {stickyHeader && (
          <div className="bg-white sticky top-0 z-10">
            {stickyHeader}
          </div>
        )}
        <div className="overflow-hidden" data-testid="bottom-sheet-content">
          {children}
        </div>
      </div>
    );
  }

  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      onClose={() => {
        // CRITICAL FIX: Never close the sheet, snap to minimum position instead
        // This prevents the sheet from disappearing off-screen
        const minSnapIndex = sheetSnapPoints.length - 1; // Last index is minimum position
        sheetRef.current?.snapTo(minSnapIndex);
      }}
      snapPoints={sheetSnapPoints}
      initialSnap={initialSnapIndex}
      onSnap={handleSnap}
      disableDrag={false}
      // Make it harder to trigger close by increasing thresholds
      dragCloseThreshold={0.9} // Must drag 90% off screen to trigger close (which we prevent)
      dragVelocityThreshold={1000} // Require very fast swipe to trigger close
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
          {/* Custom drag handle - 6px from top per Figma */}
          <div className="flex justify-center pt-1.5 pb-1.5" data-testid="drag-handle">
            <div className="w-12 h-1 rounded-full bg-gray-300" />
          </div>
        </Sheet.Header>
        
        {/* Custom headers outside of Sheet.Content */}
        {header && (
          <div className="bg-white" style={{ touchAction: 'manipulation' }}>
            {header}
          </div>
        )}
        
        {stickyHeader && (
          <div className="bg-white sticky top-0 z-10">
            {stickyHeader}
          </div>
        )}
        
        <Sheet.Content>
          <Sheet.Scroller 
            draggableAt="both" 
            autoPadding
            disableScroll={snapPoints[snapPoints.length - 1 - currentSnapIndex] !== 90}
          >
            <div data-testid="bottom-sheet-content">
              {children}
            </div>
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
});

export default BottomSheet;