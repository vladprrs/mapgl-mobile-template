'use client';

import React, { useRef, useImperativeHandle, forwardRef, useCallback, useEffect, useState } from 'react';
import { Sheet, SheetRef } from 'react-modal-sheet';
import './bottom-sheet.css';

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
    onSnapChange
  },
  ref
) {
  // Only render the sheet after client-side hydration to prevent mismatches
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setOpen] = useState(true);
  const sheetRef = useRef<SheetRef | undefined>(undefined);
  
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
  
  // Ensure component only renders on client to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    // Call onSnapChange with initial value after mount
    if (onSnapChange) {
      onSnapChange(snapPoints[initialSnapIndex ?? 1]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
  
  // Add custom wheel handler for desktop support
  useEffect(() => {
    const handleWheel = (e: Event) => {
      const wheelEvent = e as WheelEvent;
      if (!sheetRef.current) return;
      
      // Ignore small movements
      if (Math.abs(wheelEvent.deltaY) < 20) return;
      
      wheelEvent.preventDefault();
      
      // Determine direction: deltaY < 0 expands, deltaY > 0 collapses
      const shouldExpand = wheelEvent.deltaY < 0;
      
      if (shouldExpand && currentSnapIndex < snapPoints.length - 1) {
        sheetRef.current.snapTo(currentSnapIndex + 1);
      } else if (!shouldExpand && currentSnapIndex > 0) {
        sheetRef.current.snapTo(currentSnapIndex - 1);
      }
    };
    
    // Add wheel listener to the sheet container
    const container = document.querySelector('[data-rsbs-root]');
    if (container) {
      container.addEventListener('wheel', handleWheel as EventListener, { passive: false });
      return () => {
        container.removeEventListener('wheel', handleWheel as EventListener);
      };
    }
  }, [currentSnapIndex, snapPoints.length]);
  
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
        <div className="overflow-hidden p-4" data-testid="bottom-sheet-content">
          {children}
        </div>
      </div>
    );
  }

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
          className={`${isExpanded ? 'overflow-y-auto' : 'overflow-hidden'}`}
          data-testid="bottom-sheet-content"
        >
          {children}
        </Sheet.Scroller>
      </Sheet.Container>
    </Sheet>
  );
});

export default BottomSheet;