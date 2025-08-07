import { useState, useRef, useCallback, useEffect } from 'react';

type SnapPoint = number;

interface SheetState {
  position: number;
  snapPoint: SnapPoint;
  isDragging: boolean;
  velocity: number;
  isContentScrolling: boolean;
}

interface UseBottomSheetOptions {
  snapPoints?: [SnapPoint, SnapPoint, SnapPoint];
  onSnapChange?: (snap: SnapPoint) => void;
}

type SheetGestureType = 'drag' | 'wheel' | 'touch';

interface GestureState {
  type: SheetGestureType;
  startY: number;
  currentY: number;
  startTime: number;
  isActive: boolean;
}

export function useBottomSheet({
  snapPoints = [10, 50, 90],
  onSnapChange,
}: UseBottomSheetOptions = {}) {
  const [state, setState] = useState<SheetState>({
    position: snapPoints[1], // Start at middle snap point (50% by default)
    snapPoint: snapPoints[1], // Start at middle snap point (50% by default)
    isDragging: false,
    velocity: 0,
    isContentScrolling: false,
  });

  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gestureState = useRef<GestureState>({
    type: 'touch',
    startY: 0,
    currentY: 0,
    startTime: 0,
    isActive: false,
  });
  const wheelAccumulator = useRef<number>(0);
  const wheelTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const snapTo = useCallback((targetSnap: SnapPoint) => {
    if (!snapPoints.includes(targetSnap)) return;

    setState(prev => ({
      ...prev,
      position: targetSnap,
      snapPoint: targetSnap,
      isDragging: false,
      velocity: 0,
    }));

    onSnapChange?.(targetSnap);
  }, [snapPoints, onSnapChange]);

  // Determine sheet state based on snap point
  const getSheetState = useCallback((snapPoint: SnapPoint) => {
    const [collapsed, half] = snapPoints;
    if (snapPoint <= collapsed) return 'collapsed';
    if (snapPoint <= half) return 'half';
    return 'expanded';
  }, [snapPoints]);

  const currentSheetState = getSheetState(state.snapPoint);

  const findNearestSnapPoint = useCallback((position: number, velocity: number): SnapPoint => {
    const velocityThreshold = 0.5;
    
    if (Math.abs(velocity) > velocityThreshold) {
      const direction = velocity > 0 ? 1 : -1;
      const currentIndex = snapPoints.findIndex(point => point === state.snapPoint);
      const nextIndex = currentIndex + direction;
      
      if (nextIndex >= 0 && nextIndex < snapPoints.length) {
        return snapPoints[nextIndex];
      }
    }

    return snapPoints.reduce((nearest, point) => 
      Math.abs(point - position) < Math.abs(nearest - position) ? point : nearest
    );
  }, [snapPoints, state.snapPoint]);

  // Check if content can scroll in current direction
  const canContentScroll = useCallback((direction: 'up' | 'down'): boolean => {
    if (currentSheetState !== 'expanded') return false;
    
    const content = contentRef.current;
    if (!content) return false;

    const { scrollTop, scrollHeight, clientHeight } = content;
    
    // Edge case: If content is shorter than container, no scrolling needed
    const hasScrollableContent = scrollHeight > clientHeight;
    if (!hasScrollableContent) return false;
    
    if (direction === 'up') {
      return scrollTop < scrollHeight - clientHeight - 1; // -1 for rounding errors
    } else {
      return scrollTop > 1; // Small threshold for touch precision
    }
  }, [currentSheetState]);

  // Handle scroll gestures (wheel and touch scroll)
  const handleScrollGesture = useCallback((deltaY: number, gestureType: SheetGestureType) => {
    const scrollDirection = deltaY > 0 ? 'down' : 'up';
    const isExpanded = currentSheetState === 'expanded';
    const isHalf = currentSheetState === 'half';
    const isCollapsed = currentSheetState === 'collapsed';

    // Apply threshold to prevent tiny movements
    const threshold = gestureType === 'wheel' ? 10 : 5;
    if (Math.abs(deltaY) < threshold) return 'ignore';

    // In expanded state, check if we should scroll content or move sheet
    if (isExpanded) {
      const content = contentRef.current;
      if (!content) return 'sheet';

      const { scrollHeight, clientHeight } = content;
      const hasScrollableContent = scrollHeight > clientHeight;

      // Edge case: Short content - always move sheet
      if (!hasScrollableContent) {
        if (scrollDirection === 'down') {
          snapTo(snapPoints[1]); // Collapse to half
          return 'sheet';
        }
        return 'sheet'; // Can't scroll up further
      }

      // Normal scrollable content
      if (scrollDirection === 'up' && canContentScroll('up')) {
        return 'content'; // Let content scroll
      }
      
      if (scrollDirection === 'down' && canContentScroll('down')) {
        return 'content'; // Let content scroll
      }
      
      // If scrolling down and at top of content, collapse to half
      if (scrollDirection === 'down' && !canContentScroll('down')) {
        snapTo(snapPoints[1]); // Collapse to half
        return 'sheet';
      }
    }

    // In half state
    if (isHalf) {
      if (scrollDirection === 'up') {
        snapTo(snapPoints[2]); // Expand to full
        return 'sheet';
      } else {
        snapTo(snapPoints[0]); // Collapse
        return 'sheet';
      }
    }

    // In collapsed state
    if (isCollapsed) {
      if (scrollDirection === 'up') {
        snapTo(snapPoints[1]); // Expand to half
        return 'sheet';
      }
      // Can't go lower than collapsed - but add rubber band effect
      return 'sheet';
    }

    return 'sheet';
  }, [currentSheetState, canContentScroll, snapTo, snapPoints, contentRef]);

  const handleDragStart = useCallback((clientY: number, type: SheetGestureType = 'touch') => {
    gestureState.current = {
      type,
      startY: clientY,
      currentY: clientY,
      startTime: Date.now(),
      isActive: true,
    };
    
    setState(prev => ({
      ...prev,
      isDragging: true,
      velocity: 0,
    }));
  }, []);

  // Handle wheel events for desktop scroll with momentum handling
  const handleWheelGesture = useCallback((event: WheelEvent) => {
    // INVERTED: Accumulate inverted wheel delta for natural scroll direction
    wheelAccumulator.current += -event.deltaY;
    
    // Clear previous timeout
    if (wheelTimeoutId.current) {
      clearTimeout(wheelTimeoutId.current);
    }
    
    // Set timeout with different delays based on scroll speed
    const scrollSpeed = Math.abs(event.deltaY);
    const delay = scrollSpeed > 50 ? 25 : 50; // Faster response for rapid scrolling
    
    wheelTimeoutId.current = setTimeout(() => {
      const delta = wheelAccumulator.current;
      wheelAccumulator.current = 0;
      
      // Handle momentum - larger deltas get processed even if accumulated
      if (Math.abs(delta) > 5) {
        const result = handleScrollGesture(delta, 'wheel');
        
        if (result === 'sheet') {
          event.preventDefault();
        }
      }
    }, delay);
  }, [handleScrollGesture]);

  const handleDragMove = useCallback((clientY: number) => {
    if (!state.isDragging || !gestureState.current.isActive) return;

    const deltaY = gestureState.current.startY - clientY;
    const viewportHeight = window.innerHeight;
    const deltaPercent = (deltaY / viewportHeight) * 100;
    
    let newPosition = state.snapPoint + deltaPercent;
    
    // Clamp position with rubber band effect
    const minSnap = Math.min(...snapPoints);
    const maxSnap = Math.max(...snapPoints);
    
    if (newPosition < minSnap) {
      const excess = minSnap - newPosition;
      newPosition = minSnap - (excess * 0.3);
    } else if (newPosition > maxSnap) {
      const excess = newPosition - maxSnap;
      newPosition = maxSnap + (excess * 0.3);
    }

    // Calculate velocity
    const now = Date.now();
    const timeDelta = now - gestureState.current.startTime;
    const velocity = timeDelta > 0 ? deltaPercent / timeDelta : 0;

    gestureState.current.currentY = clientY;
    
    setState(prev => ({
      ...prev,
      position: newPosition,
      velocity,
    }));
  }, [state.isDragging, state.snapPoint, snapPoints]);

  const handleDragEnd = useCallback(() => {
    if (!state.isDragging || !gestureState.current.isActive) return;

    const targetSnap = findNearestSnapPoint(state.position, state.velocity);
    snapTo(targetSnap);
    
    gestureState.current.isActive = false;
  }, [state.isDragging, state.position, state.velocity, findNearestSnapPoint, snapTo]);

  // Native touch event handlers for content area (with proper passive: false)
  const handleContentTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    gestureState.current = {
      type: 'touch',
      startY: touch.clientY,
      currentY: touch.clientY,
      startTime: Date.now(),
      isActive: true,
    };
  }, []);

  const handleContentTouchMove = useCallback((e: TouchEvent) => {
    if (!gestureState.current.isActive) return;
    
    const touch = e.touches[0];
    const deltaY = gestureState.current.startY - touch.clientY;
    gestureState.current.currentY = touch.clientY;
    
    // Calculate velocity for momentum detection
    const now = Date.now();
    const timeDelta = now - gestureState.current.startTime;
    const velocity = timeDelta > 0 ? Math.abs(deltaY) / timeDelta : 0;
    
    // Fast gesture threshold for quick swipes
    const isFastGesture = velocity > 1 && Math.abs(deltaY) > 30;
    
    // Determine if this should be a scroll gesture
    const result = handleScrollGesture(deltaY, 'touch');
    
    if (result === 'sheet' || isFastGesture) {
      // Prevent default to handle sheet movement
      e.preventDefault();
      
      // Start drag if not already dragging
      if (!state.isDragging) {
        setState(prev => ({ ...prev, isDragging: true }));
      }
      
      handleDragMove(touch.clientY);
    } else if (result === 'ignore') {
      // Ignore tiny movements to prevent jitter
      return;
    }
    // If result === 'content', let the natural scroll happen
  }, [handleScrollGesture, state.isDragging, handleDragMove]);

  const handleContentTouchEnd = useCallback(() => {
    if (gestureState.current.isActive) {
      const deltaY = gestureState.current.startY - gestureState.current.currentY;
      const timeDelta = Date.now() - gestureState.current.startTime;
      const velocity = timeDelta > 0 ? deltaY / timeDelta : 0;
      
      // Handle momentum for quick swipes
      // INVERTED: Positive velocity = expand, Negative velocity = collapse
      if (Math.abs(velocity) > 0.8 && Math.abs(deltaY) > 20) {
        const direction = velocity > 0 ? 'expand' : 'collapse';
        const currentIndex = snapPoints.findIndex(point => point === state.snapPoint);
        
        // INVERTED: expand = go to higher snap point, collapse = go to lower snap point
        if (direction === 'expand' && currentIndex < snapPoints.length - 1) {
          snapTo(snapPoints[currentIndex + 1]);
        } else if (direction === 'collapse' && currentIndex > 0) {
          snapTo(snapPoints[currentIndex - 1]);
        }
      }
      
      if (state.isDragging) {
        handleDragEnd();
      }
    }
    
    gestureState.current.isActive = false;
  }, [state.isDragging, state.snapPoint, snapPoints, snapTo, handleDragEnd]);

  // Handle touch events on the drag handle (always moves sheet)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientY, 'touch');
  }, [handleDragStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    // Handle drag move for drag handle only
    handleDragMove(e.touches[0].clientY);
  }, [handleDragMove]);

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Mouse event handlers for desktop support (handle only)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    handleDragStart(e.clientY, 'drag');
  }, [handleDragStart]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (state.isDragging && gestureState.current.type === 'drag') {
      e.preventDefault();
      handleDragMove(e.clientY);
    }
  }, [state.isDragging, handleDragMove]);

  const handleMouseUp = useCallback(() => {
    if (state.isDragging && gestureState.current.type === 'drag') {
      handleDragEnd();
    }
  }, [state.isDragging, handleDragEnd]);

  // Add/remove mouse event listeners
  useEffect(() => {
    if (state.isDragging && gestureState.current.type === 'drag') {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [state.isDragging, handleMouseMove, handleMouseUp]);

  // Add wheel event listener for scroll gestures
  useEffect(() => {
    const element = sheetRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      // Check if we should handle this wheel event
      // INVERTED: Invert wheel deltaY for natural scroll direction
      const result = handleScrollGesture(-e.deltaY, 'wheel');
      if (result === 'sheet') {
        e.preventDefault();
      }
      
      handleWheelGesture(e);
    };

    element.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      element.removeEventListener('wheel', handleWheel);
      if (wheelTimeoutId.current) {
        clearTimeout(wheelTimeoutId.current);
      }
    };
  }, [handleWheelGesture, handleScrollGesture]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (wheelTimeoutId.current) {
        clearTimeout(wheelTimeoutId.current);
      }
    };
  }, []);

  // Add native touch event listeners with proper passive configuration
  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleContentTouchStart, { passive: false });
    element.addEventListener('touchmove', handleContentTouchMove, { passive: false });
    element.addEventListener('touchend', handleContentTouchEnd, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleContentTouchStart);
      element.removeEventListener('touchmove', handleContentTouchMove);
      element.removeEventListener('touchend', handleContentTouchEnd);
    };
  }, [handleContentTouchStart, handleContentTouchMove, handleContentTouchEnd]);

  return {
    // State
    currentSnap: state.snapPoint,
    position: state.position,
    isDragging: state.isDragging,
    isExpanded: state.snapPoint >= 90,
    currentSheetState,
    
    // Actions
    snapTo,
    
    // Event handlers for drag handle
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    
    // Refs
    sheetRef,
    contentRef,
  };
}

export type { SnapPoint, UseBottomSheetOptions };