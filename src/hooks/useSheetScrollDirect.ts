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
    
    // Check if we're at full expansion (index 2 = 90% expanded)
    const isFullyExpanded = currentSnapIndex === snapPoints.length - 1;
    
    // If fully expanded, check if we should let content scroll
    if (isFullyExpanded) {
      // Check if the event target is within scrollable content
      const target = e.target as HTMLElement;
      const scrollableContent = target.closest('.overflow-y-auto') as HTMLElement;
      
      if (scrollableContent && scrollableContent.scrollHeight > scrollableContent.clientHeight) {
        // Content is scrollable
        const atTop = scrollableContent.scrollTop === 0;
        const atBottom = scrollableContent.scrollTop >= scrollableContent.scrollHeight - scrollableContent.clientHeight - 1;
        
        // Check if we should let content scroll
        const shouldContentScroll = 
          (e.deltaY < 0 && !atBottom) || // Scrolling up and not at bottom
          (e.deltaY > 0 && !atTop);      // Scrolling down and not at top
        
        if (shouldContentScroll) {
          // Clear any existing timer to prevent unwanted snapping
          clearTimeout(scrollTimer.current);
          isScrolling.current = false;
          accumulatedDelta.current = 0;
          return; // Let the content handle scrolling
        }
        
        // At this point, we're at a boundary and should consider collapsing
        if (e.deltaY > 0 && atTop) {
          // Scrolling down at top - collapse the sheet
          // Fall through to sheet movement
        } else {
          // Any other boundary case - let content handle it
          clearTimeout(scrollTimer.current);
          isScrolling.current = false;
          accumulatedDelta.current = 0;
          return;
        }
      }
    }
    
    // Prevent default to control sheet movement
    e.preventDefault();
    e.stopPropagation();
    
    const { deltaY } = e;
    
    // Start scrolling session
    if (!isScrolling.current) {
      isScrolling.current = true;
      startHeight.current = getSnapHeight(currentSnapIndex);
      accumulatedDelta.current = 0;
    }
    
    // Natural Scrolling: deltaY < 0 (fingers UP) = expand, deltaY > 0 (fingers DOWN) = collapse
    // Direct movement - sheet follows finger direction
    accumulatedDelta.current += deltaY * 0.8; // Just inverted the sign
    
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
    
    // Natural touch: finger up (deltaY > 0) = expand, finger down (deltaY < 0) = collapse
    // Direct movement - sheet follows finger
    touchDelta.current = deltaY; // Direct movement, no inversion
    
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

    // Add event listeners - don't use capture when expanded to allow content scrolling
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, [containerRef, handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return null;
}