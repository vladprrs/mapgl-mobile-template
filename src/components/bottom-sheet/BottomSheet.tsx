'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  // Track if component has mounted on client
  const [isClient, setIsClient] = useState(false);
  
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

  // Set isClient to true after mount to enable client-side calculations
  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentHeight = useMemo(() => {
    if (!isClient) return 0; // Return 0 during SSR
    const snapHeight = getSnapHeight(currentSnapIndex);
    return snapHeight + dragY;
  }, [isClient, currentSnapIndex, dragY, getSnapHeight]);

  // Calculate transform with SSR safety
  const transform = useMemo(() => {
    // During SSR or before client mount, use CSS percentage
    if (!isClient) {
      // Use percentage based on snap point for initial positioning
      const snapPercentage = (1 - snapPoints[defaultSnapPoint]) * 100;
      return `translateY(${snapPercentage}%)`;
    }
    
    // After hydration, use precise pixel calculations
    const translateY = window.innerHeight - currentHeight;
    return `translateY(${translateY}px)`;
  }, [isClient, currentHeight, snapPoints, defaultSnapPoint]);

  // Determine transition based on client state
  const transition = useMemo(() => {
    if (!isClient) {
      // Use CSS transition during SSR
      return 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    // After client mount, control transition based on drag state
    return isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  }, [isClient, isDragging]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl ${className}`}
      style={{
        transform,
        transition,
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