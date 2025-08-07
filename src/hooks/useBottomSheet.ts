'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface UseBottomSheetProps {
  snapPoints: number[];
  defaultSnapPoint?: number;
  onSnapChange?: (snapPoint: number) => void;
}

export function useBottomSheet({
  snapPoints,
  defaultSnapPoint = 0,
  onSnapChange,
}: UseBottomSheetProps) {
  const [currentSnapIndex, setCurrentSnapIndex] = useState(defaultSnapPoint);
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);
  const velocityRef = useRef(0);
  const lastYRef = useRef(0);
  // For future animation frame management
  // const animationFrameRef = useRef<number | undefined>(undefined);

  const getSnapHeight = useCallback((index: number) => {
    if (typeof window === 'undefined') return 0;
    return window.innerHeight * snapPoints[index];
  }, [snapPoints]);

  const findClosestSnapIndex = useCallback((height: number) => {
    const windowHeight = window.innerHeight;
    const currentRatio = height / windowHeight;
    
    let closestIndex = 0;
    let minDistance = Math.abs(currentRatio - snapPoints[0]);
    
    for (let i = 1; i < snapPoints.length; i++) {
      const distance = Math.abs(currentRatio - snapPoints[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    
    // Consider velocity for more natural snapping
    if (Math.abs(velocityRef.current) > 0.5) {
      if (velocityRef.current > 0 && closestIndex > 0) {
        closestIndex--;
      } else if (velocityRef.current < 0 && closestIndex < snapPoints.length - 1) {
        closestIndex++;
      }
    }
    
    return closestIndex;
  }, [snapPoints]);

  const snapTo = useCallback((index: number) => {
    if (index < 0 || index >= snapPoints.length) return;
    
    setCurrentSnapIndex(index);
    setDragY(0);
    onSnapChange?.(index);
  }, [snapPoints.length, onSnapChange]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!containerRef.current) return;
    
    setIsDragging(true);
    startYRef.current = e.clientY;
    startHeightRef.current = getSnapHeight(currentSnapIndex);
    lastYRef.current = e.clientY;
    velocityRef.current = 0;
    
    // Prevent text selection
    e.preventDefault();
  }, [currentSnapIndex, getSnapHeight]);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging) return;
    
    const deltaY = startYRef.current - e.clientY;
    
    // Calculate velocity
    velocityRef.current = e.clientY - lastYRef.current;
    lastYRef.current = e.clientY;
    
    // Apply rubber band effect at boundaries
    let newDragY = deltaY;
    const currentHeight = startHeightRef.current + deltaY;
    const maxHeight = window.innerHeight * snapPoints[snapPoints.length - 1];
    const minHeight = window.innerHeight * snapPoints[0];
    
    if (currentHeight > maxHeight) {
      const overflow = currentHeight - maxHeight;
      newDragY = deltaY - overflow * 0.5;
    } else if (currentHeight < minHeight) {
      const underflow = minHeight - currentHeight;
      newDragY = deltaY + underflow * 0.5;
    }
    
    setDragY(newDragY);
  }, [isDragging, snapPoints]);

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    const currentHeight = startHeightRef.current + dragY;
    const closestIndex = findClosestSnapIndex(currentHeight);
    
    snapTo(closestIndex);
  }, [isDragging, dragY, findClosestSnapIndex, snapTo]);

  // Global event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointercancel', handlePointerUp);
      
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        window.removeEventListener('pointercancel', handlePointerUp);
      };
    }
  }, [isDragging, handlePointerMove, handlePointerUp]);

  return {
    containerRef,
    currentSnapIndex,
    isDragging,
    dragY,
    snapTo,
    handlePointerDown,
    getSnapHeight,
  };
}