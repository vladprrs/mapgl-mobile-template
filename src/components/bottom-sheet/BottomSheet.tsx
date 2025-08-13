'use client';

import React, { useRef, useImperativeHandle, forwardRef, useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Sheet, SheetRef } from 'react-modal-sheet';
import './bottom-sheet.css';
import type { BottomSheetProps, BottomSheetRef } from './BottomSheet.types';

export type { BottomSheetProps, BottomSheetRef } from './BottomSheet.types';

const BottomSheetComponent = forwardRef<
  BottomSheetRef,
  BottomSheetProps
>(function BottomSheet(
  { 
    className = '', 
    header, 
    stickyHeader,
    children, 
    snapPoints = [10, 50, 90],
    initialSnap,
    onSnapChange,
    headerBackground = 'white'
  },
  ref
) {
  const [isMounted, setIsMounted] = useState(false);
  const isOpen = true;
  const sheetRef = useRef<SheetRef | undefined>(undefined);
  
  // Convert percentage snap points to decimals
  const sheetSnapPoints = snapPoints.map(p => p / 100).reverse();
  
  // Find initial snap index
  const initialSnapValue = initialSnap ?? snapPoints[1];
  const originalIndex = snapPoints.indexOf(initialSnapValue);
  const initialSnapIndex = originalIndex !== -1 
    ? snapPoints.length - 1 - originalIndex
    : snapPoints.length - 2;
  
  const [currentSnapIndex, setCurrentSnapIndex] = useState(initialSnapIndex);
  
  const handleSnap = useCallback((snapIndex: number) => {
    setCurrentSnapIndex(snapIndex);
    const originalIndex = snapPoints.length - 1 - snapIndex;
    const snapValue = snapPoints[originalIndex];
    onSnapChange?.(snapValue);
  }, [snapPoints, onSnapChange]);
  
  useEffect(() => {
    setIsMounted(true);
    if (onSnapChange) {
      const originalIndex = snapPoints.length - 1 - initialSnapIndex;
      onSnapChange(snapPoints[originalIndex]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useImperativeHandle(ref, () => ({
    snapTo: (snapValue: number) => {
      const originalIndex = snapPoints.indexOf(snapValue);
      if (originalIndex !== -1 && sheetRef.current) {
        const reversedIndex = snapPoints.length - 1 - originalIndex;
        sheetRef.current.snapTo(reversedIndex);
      }
    }
  }), [snapPoints]);
  
  const originalSnapIndex = snapPoints.length - 1 - currentSnapIndex;
  const stateLabel = originalSnapIndex === 0
    ? 'collapsed'
    : originalSnapIndex < snapPoints.length - 1
    ? 'half'
    : 'expanded';
  
  // Render placeholder during SSR
  if (!isMounted) {
    return (
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 ${className}`}
        style={{
          height: `${snapPoints[initialSnapIndex ?? 1]}vh`,
          transform: 'translateY(0)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
        data-testid="bottom-sheet"
        data-sheet-state={stateLabel}
      >
        <div className="flex justify-center py-2" data-testid="drag-handle">
          <div 
            className="w-10 h-1 rounded-md" 
            style={{
              backgroundColor: 'rgba(137, 137, 137, 0.25)',
            }}
          />
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
        const minSnapIndex = sheetSnapPoints.length - 1;
        sheetRef.current?.snapTo(minSnapIndex);
      }}
      snapPoints={sheetSnapPoints}
      initialSnap={initialSnapIndex}
      onSnap={handleSnap}
      disableDrag={false}
      dragCloseThreshold={0.9}
      dragVelocityThreshold={1000}
    >
      <Sheet.Container
        className={`bg-white rounded-t-2xl ${className}`}
        data-testid="bottom-sheet"
        data-sheet-state={stateLabel}
        style={{
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <Sheet.Header>
          <div 
            className="w-full relative"
            style={{ 
              cursor: 'grab',
              backgroundColor: headerBackground,
            }}
            data-testid="drag-header-extended"
          >
            <div 
              className="flex justify-center pt-1.5 pb-1.5" 
              data-testid="drag-handle" 
              style={{ 
                backgroundColor: headerBackground,
              }}
            >
              <div 
                className="w-10 h-1 rounded-md" 
                style={{
                  backgroundColor: headerBackground === '#F1F1F1' 
                    ? 'rgba(137, 137, 137, 0.4)'
                    : 'rgba(137, 137, 137, 0.25)',
                }}
              />
            </div>
            
            {header && (
              <div 
                className="bg-transparent" 
                style={{ 
                  touchAction: 'manipulation',
                  backgroundColor: headerBackground,
                }}
              >
                {header}
              </div>
            )}
          </div>
        </Sheet.Header>
        
        {stickyHeader && (
          <div className="bg-white sticky top-0 z-10">
            {stickyHeader}
          </div>
        )}
        
        <Sheet.Content 
          className="bg-white"
          data-testid="bottom-sheet-content"
          style={{
            paddingBottom: 'env(safe-area-inset-bottom)',
            overflowY: stateLabel === 'expanded' ? 'auto' : 'hidden',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <Sheet.Scroller
            draggableAt="both"
            style={{
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            {children}
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
});

// Export with dynamic loading for SSR
export const BottomSheet = dynamic(
  () => Promise.resolve(BottomSheetComponent),
  {
    ssr: false,
    loading: () => (
      <div 
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50"
        style={{
          height: '50vh',
          transform: 'translateY(0)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
        data-testid="bottom-sheet-loading"
      >
        <div className="flex justify-center py-2">
          <div 
            className="w-10 h-1 rounded-md"
            style={{
              backgroundColor: 'rgba(137, 137, 137, 0.25)',
            }}
          />
        </div>
      </div>
    ),
  }
);

export default BottomSheet;