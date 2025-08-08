'use client';

import React from 'react';
import { useBottomSheet, type UseBottomSheetOptions } from '@/hooks/useBottomSheet';

interface BottomSheetWithDashboardProps extends UseBottomSheetOptions {
  children: React.ReactNode;
  className?: string;
}

export function BottomSheetWithDashboard({
  children,
  className = '',
  snapPoints = [10, 50, 90],
  onSnapChange,
}: BottomSheetWithDashboardProps) {
  const {
    position,
    isDragging,
    isExpanded,
    currentSheetState,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    sheetRef,
    contentRef,
  } = useBottomSheet({ snapPoints, onSnapChange });

  const transform = `translateY(${100 - position}%)`;

  return (
    <div
      ref={sheetRef}
      className={`
        fixed inset-x-0 bottom-0 z-50
        bg-white rounded-t-2xl shadow-2xl
        transition-transform duration-300 ease-out
        ${isDragging ? 'transition-none' : ''}
        ${currentSheetState === 'expanded' ? 'shadow-3xl' : ''}
        ${className}
      `}
      style={{
        transform,
        height: '100vh',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      data-testid="bottom-sheet"
      data-sheet-state={currentSheetState}
    >
      {/* Unified header: Drag handle + SearchBar container area must move together */}
      <div className="px-4">
        {/* Drag handle placement aligned with SearchBar top edge */}
        <div
          data-drag-handle
          className="pt-1.5 pb-1.5 flex items-center justify-center cursor-grab active:cursor-grabbing"
          onTouchStart={(e) => handleDragStart(e.touches[0].clientY, 'touch')}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
          onTouchEnd={handleDragEnd}
          onMouseDown={(e) => handleDragStart(e.clientY, 'drag')}
        >
          <div className="w-10 h-1 rounded-md pointer-events-none" style={{ backgroundColor: '#D1D5DB' }} />
        </div>
      </div>

      {/* Scrollable content area beneath the unified header */}
      <div
        ref={contentRef}
        className={`h-full ${isExpanded ? 'overflow-y-auto' : 'overflow-hidden'}`}
        data-testid="bottom-sheet-content"
        data-scrollable={isExpanded ? 'true' : undefined}
        style={{
          scrollBehavior: 'smooth',
          overscrollBehavior: isExpanded ? 'auto' : 'none',
          touchAction: isExpanded ? 'auto' : 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export type { BottomSheetWithDashboardProps };