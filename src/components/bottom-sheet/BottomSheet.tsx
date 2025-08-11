'use client';

import React from 'react';
import { useBottomSheet, type BottomSheetOptions } from '@/hooks/useBottomSheet';

export interface BottomSheetProps extends BottomSheetOptions {
  className?: string;
  header?: React.ReactNode;
  children?: React.ReactNode;
}

export function BottomSheet({ className = '', header, children, ...opts }: BottomSheetProps) {
  const { sheetRef, contentRef, isDragging, currentSnap, onHandlePointerDown } = useBottomSheet(opts);

  const snaps = opts.snapPoints ?? [10, 50, 90];
  const isExpanded = currentSnap >= Math.max(...snaps);
  const stateLabel = currentSnap <= Math.min(...snaps)
    ? 'collapsed'
    : currentSnap < Math.max(...snaps)
    ? 'half'
    : 'expanded';

  return (
    <div
      ref={sheetRef}
      className={
        `fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl ` +
        `${isDragging ? 'transition-none' : 'transition-transform duration-300 ease-out'} ` +
        `${className}`
      }
      style={{
        transform: 'translateY(50%) translateZ(0)',
        height: '100vh',
        paddingBottom: 'env(safe-area-inset-bottom)',
        willChange: 'transform',
        contain: 'layout paint size',
        backfaceVisibility: 'hidden',
        touchAction: 'none',
      }}
      data-testid="bottom-sheet"
      data-sheet-state={stateLabel}
    >
      <div
        data-testid="drag-handle"
        onPointerDown={onHandlePointerDown}
        className="flex justify-center py-2 cursor-grab active:cursor-grabbing"
      >
        <div className={`w-12 h-1 rounded-full ${isDragging ? 'bg-gray-500' : 'bg-gray-300'}`} />
      </div>

      {header && (
        <div className="bg-white" style={{ touchAction: 'manipulation' }}>
          {header}
        </div>
      )}

      <div
        ref={contentRef}
        className={`h-full pb-4 ${isExpanded ? 'overflow-y-auto' : 'overflow-hidden'}`}
        data-testid="bottom-sheet-content"
        style={{
          overscrollBehavior: isExpanded ? 'auto' : 'none',
          touchAction: isExpanded ? 'pan-y' : 'none',
          scrollBehavior: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default BottomSheet;