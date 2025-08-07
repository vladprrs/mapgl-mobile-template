'use client';

import React, { useMemo } from 'react';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { SheetHandle } from './SheetHandle';
import { SheetContent } from './SheetContent';

interface BottomSheetProps {
  children: React.ReactNode;
  snapPoints?: number[];
  defaultSnapPoint?: number;
  onSnapChange?: (index: number) => void;
  className?: string;
}

export function BottomSheet({
  children,
  snapPoints = [0.1, 0.5, 0.9],
  defaultSnapPoint = 0,
  onSnapChange,
  className = '',
}: BottomSheetProps) {
  const {
    containerRef,
    currentSnapIndex,
    isDragging,
    dragY,
    handlePointerDown,
    getSnapHeight,
  } = useBottomSheet({
    snapPoints,
    defaultSnapPoint,
    onSnapChange,
  });

  const currentHeight = useMemo(() => {
    const snapHeight = getSnapHeight(currentSnapIndex);
    return snapHeight + dragY;
  }, [currentSnapIndex, dragY, getSnapHeight]);

  const transform = useMemo(() => {
    if (typeof window === 'undefined') return 'translateY(100%)';
    const translateY = window.innerHeight - currentHeight;
    return `translateY(${translateY}px)`;
  }, [currentHeight]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl ${className}`}
      style={{
        transform,
        transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '100vh',
        willChange: 'transform',
        touchAction: 'none',
      }}
    >
      <SheetHandle onPointerDown={handlePointerDown} />
      <SheetContent isExpanded={currentSnapIndex === snapPoints.length - 1}>
        {children}
      </SheetContent>
    </div>
  );
}