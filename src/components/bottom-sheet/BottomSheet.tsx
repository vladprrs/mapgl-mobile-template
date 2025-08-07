'use client';

import React from 'react';
import { useBottomSheet, type UseBottomSheetOptions } from '@/hooks/useBottomSheet';
import { DragHandle } from './DragHandle';

interface BottomSheetProps extends UseBottomSheetOptions {
  children: React.ReactNode;
  className?: string;
}

export function BottomSheet({
  children,
  className = '',
  snapPoints = [10, 50, 90],
  onSnapChange,
}: BottomSheetProps) {
  const {
    position,
    isDragging,
    isExpanded,
    currentSheetState,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleContentTouchStart,
    handleContentTouchMove,
    handleContentTouchEnd,
    sheetRef,
    contentRef,
  } = useBottomSheet({ snapPoints, onSnapChange });

  // Calculate transform based on position
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
      data-sheet-state={currentSheetState}
    >
      {/* Drag Handle */}
      <DragHandle
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        isDragging={isDragging}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className={`
          h-full px-4 pb-4
          ${isExpanded ? 'overflow-y-auto' : 'overflow-hidden'}
        `}
        data-scrollable={isExpanded ? 'true' : undefined}
        onTouchStart={handleContentTouchStart}
        onTouchMove={handleContentTouchMove}
        onTouchEnd={handleContentTouchEnd}
        style={{
          // Smooth scrolling when expanded
          scrollBehavior: 'smooth',
          // Prevent overscroll bounce when not expanded
          overscrollBehavior: isExpanded ? 'auto' : 'none',
          // Ensure proper touch handling
          touchAction: isExpanded ? 'auto' : 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export type { BottomSheetProps };