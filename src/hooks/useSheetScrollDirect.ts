'use client';

import { useEffect, useCallback, useRef } from 'react';

interface UseSheetScrollDirectProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  currentSnapIndex: number;
  snapPoints: number[];
  onSnapChange: (index: number) => void;
  isDragging: boolean;
  setDragY: (y: number) => void;
  getSnapHeight: (index: number) => number;
}

export function useSheetScrollDirect({
  containerRef,
  currentSnapIndex,
  snapPoints,
  onSnapChange,
  isDragging,
  setDragY,
  getSnapHeight,
}: UseSheetScrollDirectProps) {
  
  const accumulatedDelta = useRef(0);
  const scrollTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  const startHeight = useRef(0);
  const isScrolling = useRef(false);
  
  const findClosestSnapIndex = useCallback((height: number) => {
    if (typeof window === 'undefined') return 0;
    
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
    
    return closestIndex;
  }, [snapPoints]);
  
  const handleWheel = useCallback((e: WheelEvent) => {
    // Prevent if dragging
    if (isDragging) return;
    
    // Check if we're at full expansion and content is scrollable
    const isFullyExpanded = currentSnapIndex === snapPoints.length - 1;
    const content = e.target as HTMLElement;
    const isContentScrollable = content.scrollHeight > content.clientHeight;
    
    // If fully expanded with scrollable content
    if (isFullyExpanded && isContentScrollable) {
      // If scrolled into content, let it scroll normally
      if (content.scrollTop > 0) {
        return;
      }
      // At top of content - only respond to scroll up (deltaY < 0) to collapse
      // INVERTED: deltaY < 0 (scroll up) should collapse (opposite of normal)
      if (e.deltaY > 0) {
        // Scrolling down at top - let content scroll if it can
        return;
      }
    }
    
    // Always prevent default to stop page scroll when controlling sheet
    e.preventDefault();
    e.stopPropagation();
    
    const { deltaY } = e;
    
    // Start scrolling session
    if (!isScrolling.current) {
      isScrolling.current = true;
      startHeight.current = getSnapHeight(currentSnapIndex);
      accumulatedDelta.current = 0;
    }
    
    // INVERTED: deltaY > 0 (scroll down) = expand, deltaY < 0 (scroll up) = collapse
    // Accumulate delta (inverted)
    accumulatedDelta.current -= deltaY * 0.5; // Multiply by factor to control sensitivity
    
    // Calculate new drag position
    const newDragY = accumulatedDelta.current;
    
    // Apply boundaries
    const currentHeight = startHeight.current + newDragY;
    const maxHeight = window.innerHeight * snapPoints[snapPoints.length - 1];
    const minHeight = window.innerHeight * snapPoints[0];
    
    if (currentHeight > maxHeight) {
      accumulatedDelta.current = maxHeight - startHeight.current;
    } else if (currentHeight < minHeight) {
      accumulatedDelta.current = minHeight - startHeight.current;
    }
    
    // Update drag position for immediate visual feedback
    setDragY(accumulatedDelta.current);
    
    // Clear existing timer
    clearTimeout(scrollTimer.current);
    
    // Set timer to snap when scrolling stops
    scrollTimer.current = setTimeout(() => {
      // Find closest snap point
      const finalHeight = startHeight.current + accumulatedDelta.current;
      const closestIndex = findClosestSnapIndex(finalHeight);
      
      // Snap to closest point
      onSnapChange(closestIndex);
      setDragY(0);
      
      // Reset
      isScrolling.current = false;
      accumulatedDelta.current = 0;
    }, 150); // Snap after 150ms of no scrolling
    
  }, [currentSnapIndex, snapPoints, onSnapChange, isDragging, setDragY, getSnapHeight, findClosestSnapIndex]);

  // Touch handling with direct movement
  const touchStartY = useRef<number>(0);
  const touchStartHeight = useRef<number>(0);
  const isTouching = useRef(false);
  const touchDelta = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (isDragging) return;
    touchStartY.current = e.touches[0].clientY;
    touchStartHeight.current = getSnapHeight(currentSnapIndex);
    isTouching.current = true;
    touchDelta.current = 0;
  }, [isDragging, currentSnapIndex, getSnapHeight]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isTouching.current || isDragging) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const touch = e.touches[0];
    const deltaY = touchStartY.current - touch.clientY;
    
    // INVERTED: finger up (deltaY > 0) = collapse, finger down (deltaY < 0) = expand
    // Direct movement (inverted)
    touchDelta.current = -deltaY; // Invert the direction
    
    // Apply boundaries
    const currentHeight = touchStartHeight.current + touchDelta.current;
    const maxHeight = window.innerHeight * snapPoints[snapPoints.length - 1];
    const minHeight = window.innerHeight * snapPoints[0];
    
    if (currentHeight > maxHeight) {
      touchDelta.current = maxHeight - touchStartHeight.current;
    } else if (currentHeight < minHeight) {
      touchDelta.current = minHeight - touchStartHeight.current;
    }
    
    // Update position immediately
    setDragY(touchDelta.current);
    
  }, [snapPoints, isDragging, setDragY]);

  const handleTouchEnd = useCallback(() => {
    if (!isTouching.current) return;
    
    // Find closest snap point
    const finalHeight = touchStartHeight.current + touchDelta.current;
    const closestIndex = findClosestSnapIndex(finalHeight);
    
    // Snap to closest point
    onSnapChange(closestIndex);
    setDragY(0);
    
    // Reset
    isTouching.current = false;
    touchStartY.current = 0;
    touchDelta.current = 0;
  }, [findClosestSnapIndex, onSnapChange, setDragY]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add event listeners
    container.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    container.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true, capture: true });

    return () => {
      container.removeEventListener('wheel', handleWheel, { capture: true });
      container.removeEventListener('touchstart', handleTouchStart, { capture: true });
      container.removeEventListener('touchmove', handleTouchMove, { capture: true });
      container.removeEventListener('touchend', handleTouchEnd, { capture: true });
      
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, [containerRef, handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return null;
}