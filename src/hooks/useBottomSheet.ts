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
  startPosition: number; // Track the actual sheet position when gesture started
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
    startPosition: snapPoints[1], // Initialize with middle snap point
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
    
    // More robust boundary detection with proper thresholds
    const scrollBuffer = 3; // Increased buffer for better touch precision
    const maxScrollTop = scrollHeight - clientHeight;
    
    if (direction === 'up') {
      // Can scroll up if not at the bottom
      return scrollTop < maxScrollTop - scrollBuffer;
    } else {
      // Can scroll down if not at the top
      return scrollTop > scrollBuffer;
    }
  }, [currentSheetState]);

  // Handle scroll gestures (wheel and touch scroll)
  const handleScrollGesture = useCallback((deltaY: number, gestureType: SheetGestureType, velocity: number = 0) => {
    const scrollDirection = deltaY > 0 ? 'down' : 'up';
    const isExpanded = currentSheetState === 'expanded';
    const isHalf = currentSheetState === 'half';
    const isCollapsed = currentSheetState === 'collapsed';

    // Apply consistent threshold for all gesture types
    const threshold = 12;
    if (Math.abs(deltaY) < threshold) return 'ignore';

    // CRITICAL FIX: In expanded state, ALWAYS prioritize content scrolling first
    if (isExpanded) {
      const content = contentRef.current;
      if (!content) return 'sheet';

      const { scrollHeight, clientHeight, scrollTop } = content;
      const hasScrollableContent = scrollHeight > clientHeight;

      // For short content that doesn't scroll, only allow sheet movement with very deliberate gestures
      if (!hasScrollableContent) {
        const veryDeliberateMovement = Math.abs(deltaY) > 40 && (velocity > 1.5 || gestureType === 'wheel');
        if (scrollDirection === 'down' && veryDeliberateMovement) {
          snapTo(snapPoints[1]); // Collapse to half
          return 'sheet';
        }
        return 'ignore';
      }

      // CRITICAL: Check scroll boundaries with proper buffering
      const scrollBuffer = 8;
      const atTop = scrollTop <= scrollBuffer;
      const atBottom = scrollTop >= (scrollHeight - clientHeight - scrollBuffer);

      // For content that can scroll, be VERY conservative about sheet movement
      if (gestureType === 'touch') {
        // Only move sheet if at clear boundaries AND significant gesture
        if (scrollDirection === 'down' && atTop && Math.abs(deltaY) > 30 && velocity > 1.0) {
          snapTo(snapPoints[1]); // Collapse to half
          return 'sheet';
        }
        
        // Otherwise, always let content handle scrolling
        if (canContentScroll(scrollDirection)) {
          return 'content';
        }
      } else {
        // Wheel events: only move sheet when at clear scroll boundaries
        if (scrollDirection === 'down' && atTop && !canContentScroll('down')) {
          snapTo(snapPoints[1]);
          return 'sheet';
        }
        
        if (scrollDirection === 'up' && atBottom && !canContentScroll('up')) {
          // Allow content to handle upward scroll in expanded state
          return 'content';
        }
        
        // Let content scroll if it can
        if (canContentScroll(scrollDirection)) {
          return 'content';
        }
      }
    }

    // Non-expanded states: simple sheet movement
    if (isHalf) {
      if (scrollDirection === 'up') {
        snapTo(snapPoints[2]); // Expand to full
      } else {
        snapTo(snapPoints[0]); // Collapse
      }
      return 'sheet';
    }

    if (isCollapsed) {
      if (scrollDirection === 'up') {
        snapTo(snapPoints[1]); // Expand to half
      }
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
      startPosition: state.position, // CRITICAL FIX: Use current visual position, not snapPoint
    };
    
    setState(prev => ({
      ...prev,
      isDragging: true,
      velocity: 0,
    }));
  }, [state.position]);

  // Handle wheel events for desktop scroll with momentum handling
  const handleWheelGesture = useCallback((event: WheelEvent) => {
    // Clear previous timeout to prevent accumulation issues
    if (wheelTimeoutId.current) {
      clearTimeout(wheelTimeoutId.current);
      wheelTimeoutId.current = null;
    }
    
    // INVERTED: Direct handling with inverted deltaY for natural scroll direction
    const delta = -event.deltaY;
    
    // CRITICAL FIX: Process wheel events immediately to prevent erratic behavior
    const result = handleScrollGesture(delta, 'wheel');
    
    if (result === 'sheet') {
      event.preventDefault();
    }
    
    // Reset accumulator to prevent stale values
    wheelAccumulator.current = 0;
  }, [handleScrollGesture]);

  const handleDragMove = useCallback((clientY: number) => {
    if (!state.isDragging || !gestureState.current.isActive) return;

    const deltaY = gestureState.current.startY - clientY;
    const viewportHeight = window.innerHeight;
    const deltaPercent = (deltaY / viewportHeight) * 100;
    
    // CRITICAL FIX: Use startPosition instead of snapPoint to prevent position jumps
    let newPosition = gestureState.current.startPosition + deltaPercent;
    
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

    // Calculate velocity for smoother movement
    const now = Date.now();
    const timeDelta = Math.max(now - gestureState.current.startTime, 1); // Prevent division by zero
    const velocity = deltaPercent / timeDelta;

    gestureState.current.currentY = clientY;
    
    setState(prev => ({
      ...prev,
      position: newPosition,
      velocity,
    }));
  }, [state.isDragging, snapPoints]);

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
      startPosition: state.position, // CRITICAL FIX: Capture actual position at touch start
    };
  }, [state.position]);

  const handleContentTouchMove = useCallback((e: TouchEvent) => {
    if (!gestureState.current.isActive) return;
    
    const touch = e.touches[0];
    const deltaY = gestureState.current.startY - touch.clientY;
    gestureState.current.currentY = touch.clientY;
    
    // Calculate velocity for momentum detection
    const now = Date.now();
    
    // CRITICAL FIX: Use smaller movement threshold for initial touch to prevent jump
    const movementThreshold = state.isDragging ? 2 : 6; // Smaller threshold when not yet dragging
    if (Math.abs(deltaY) < movementThreshold) return;
    
    // CRITICAL FIX: For content touches, check if we should prioritize content scrolling over sheet dragging
    const isExpanded = currentSheetState === 'expanded';
    const shouldCheckContentScroll = isExpanded && !state.isDragging;
    
    if (shouldCheckContentScroll) {
      // Only in expanded state, check if content can scroll in the intended direction
      const scrollDirection = deltaY > 0 ? 'up' : 'down'; // Content scroll direction
      
      if (canContentScroll(scrollDirection)) {
        // Let content handle the scroll naturally
        return; // Don't preventDefault, allow natural scroll
      }
      
      // If content can't scroll in this direction, fall through to sheet dragging
    }
    
    // CRITICAL FIX: Handle as direct drag gesture, bypassing problematic scroll gesture logic
    e.preventDefault(); // Prevent default to handle sheet movement
    
    // Start dragging if not already
    if (!state.isDragging) {
      setState(prev => ({ ...prev, isDragging: true }));
      // Update startPosition to current position to maintain smooth transition  
      gestureState.current.startPosition = state.position;
      gestureState.current.startY = touch.clientY;
      gestureState.current.startTime = now;
      return; // Don't move on the very first frame to prevent jump
    }
    
    // Continue with drag movement
    handleDragMove(touch.clientY);
  }, [currentSheetState, canContentScroll, state.isDragging, state.position, handleDragMove]);

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
      // CRITICAL FIX: Use simplified wheel handling to prevent double processing
      handleWheelGesture(e);
    };

    element.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      element.removeEventListener('wheel', handleWheel);
      if (wheelTimeoutId.current) {
        clearTimeout(wheelTimeoutId.current);
      }
    };
  }, [handleWheelGesture]);

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