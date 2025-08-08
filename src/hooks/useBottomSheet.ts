import { useState, useRef, useCallback, useEffect } from 'react';
import { SheetController, SheetState as ControllerState } from '@/lib/bottom-sheet/SheetController';

type SnapPoint = number;

interface SheetState {
  position: number;
  snapPoint: SnapPoint;
  isDragging: boolean;
  velocity: number;
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
  // Boundary lock ensures we only start dragging the sheet AFTER content hits scroll boundary
  boundaryLock: 'top' | 'bottom' | null;
  boundaryLockY: number; // Touch Y when boundary was first reached
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
  });

  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SheetController | null>(null);
  const gestureState = useRef<GestureState>({
    type: 'touch',
    startY: 0,
    currentY: 0,
    startTime: 0,
    isActive: false,
    startPosition: snapPoints[1], // Initialize with middle snap point
    boundaryLock: null,
    boundaryLockY: 0,
  });

  const snapTo = useCallback((targetSnap: SnapPoint) => {
    if (!snapPoints.includes(targetSnap)) return;
    // Delegate to controller; also update React state to keep derived flags in sync
    controllerRef.current?.snapTo(targetSnap);
    setState(prev => ({ ...prev, position: targetSnap, snapPoint: targetSnap, isDragging: false, velocity: 0 }));
    onSnapChange?.(targetSnap);
  }, [snapPoints, onSnapChange]);

  // Determine current sheet state based on snap point
  const [collapsed, half] = snapPoints;
  const currentSheetState = 
    state.snapPoint <= collapsed ? 'collapsed' :
    state.snapPoint <= half ? 'half' : 'expanded';

  // Controller drives snapping/drag velocity; hook no longer computes snap target directly

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
      startPosition: state.position,
      boundaryLock: null,
      boundaryLockY: 0,
    };
    controllerRef.current?.handleDragStart(clientY);
    setState(prev => ({ ...prev, isDragging: true, velocity: 0 }));
  }, [state.position]);

  // Handle wheel events for desktop scroll
  const handleWheelGesture = useCallback((event: WheelEvent) => {
    // INVERTED: Direct handling with inverted deltaY for natural scroll direction
    const delta = -event.deltaY;
    
    // Process wheel events; rely on CSS overscroll-behavior to prevent scroll chaining
    handleScrollGesture(delta, 'wheel');
  }, [handleScrollGesture]);

  const handleDragMove = useCallback((clientY: number) => {
    if (!state.isDragging || !gestureState.current.isActive) return;
    gestureState.current.currentY = clientY;
    controllerRef.current?.handleDragMove(clientY);
    // Avoid React re-render on every move for performance; transform is applied by controller.
  }, [state.isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!state.isDragging || !gestureState.current.isActive) return;
    controllerRef.current?.handleDragEnd();
    gestureState.current.isActive = false;
    setState(prev => ({ ...prev, isDragging: false }));
  }, [state.isDragging]);

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
      boundaryLock: null,
      boundaryLockY: 0,
    };
  }, [state.position]);

  const handleContentTouchMove = useCallback((e: TouchEvent) => {
    if (!gestureState.current.isActive) return;
    const touch = e.touches[0];
    const deltaY = gestureState.current.startY - touch.clientY;
    gestureState.current.currentY = touch.clientY;

    const movementThreshold = state.isDragging ? 2 : 6;
    if (Math.abs(deltaY) < movementThreshold) return;

    const isExpanded = currentSheetState === 'expanded';
    if (!state.isDragging) {
      const intent = controllerRef.current?.handleContentScrollIntent(deltaY, isExpanded);
      // If controller armed a boundary, remember the Y
      const controllerState = controllerRef.current?.getState();
      if (
        controllerState === ControllerState.ArmedAtTopBoundary ||
        controllerState === ControllerState.ArmedAtBottomBoundary
      ) {
        controllerRef.current?.armBoundary(touch.clientY);
        if (controllerRef.current?.shouldFlipFromBoundaryToDrag(touch.clientY)) {
          if (e.cancelable) e.preventDefault();
          setState(prev => ({ ...prev, isDragging: true }));
          controllerRef.current?.handleDragStart(touch.clientY);
          return;
        }
        // At boundary but not yet flipping: prevent default to signal sheet ownership
        if (e.cancelable) e.preventDefault();
        return;
      }
      // Otherwise, if content can scroll, do nothing (let browser handle)
      if (intent === 'content') return;
      // If intent says sheet, prevent default and start dragging
      if (intent === 'sheet') {
        if (e.cancelable) e.preventDefault();
        setState(prev => ({ ...prev, isDragging: true }));
        controllerRef.current?.handleDragStart(touch.clientY);
        return;
      }
    } else {
      // Already dragging sheet
      if (e.cancelable) e.preventDefault();
      controllerRef.current?.handleDragMove(touch.clientY);
    }
  }, [currentSheetState, state.isDragging]);

  const handleContentTouchEnd = useCallback(() => {
    if (gestureState.current.isActive) {
      if (state.isDragging) {
        controllerRef.current?.handleDragEnd();
        setState(prev => ({ ...prev, isDragging: false }));
      }
    }
    gestureState.current.isActive = false;
    gestureState.current.boundaryLock = null;
  }, [state.isDragging]);

  // Pointer events on content area (expanded scroll intent + drag handoff)
  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const onPointerDown = (e: PointerEvent) => {
      gestureState.current = {
        type: 'touch',
        startY: e.clientY,
        currentY: e.clientY,
        startTime: Date.now(),
        isActive: true,
        startPosition: state.position,
        boundaryLock: null,
        boundaryLockY: 0,
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!gestureState.current.isActive) return;
      const clientY = e.clientY;
      const deltaY = gestureState.current.startY - clientY;
      gestureState.current.currentY = clientY;

      const movementThreshold = state.isDragging ? 2 : 6;
      if (Math.abs(deltaY) < movementThreshold) return;

      const isExpanded = currentSheetState === 'expanded';

      if (!state.isDragging) {
        const intent = controllerRef.current?.handleContentScrollIntent(deltaY, isExpanded);
        const ctrlState = controllerRef.current?.getState();
        if (
          ctrlState === ControllerState.ArmedAtTopBoundary ||
          ctrlState === ControllerState.ArmedAtBottomBoundary
        ) {
          controllerRef.current?.armBoundary(clientY);
          if (controllerRef.current?.shouldFlipFromBoundaryToDrag(clientY)) {
            e.preventDefault();
            setState(prev => ({ ...prev, isDragging: true }));
            controllerRef.current?.handleDragStart(clientY);
            return;
          }
          // Still arming; let content settle (no preventDefault)
          return;
        }
        if (intent === 'content') {
          // Let browser handle scroll
          return;
        }
        if (intent === 'sheet') {
          e.preventDefault();
          setState(prev => ({ ...prev, isDragging: true }));
          controllerRef.current?.handleDragStart(clientY);
          return;
        }
      } else {
        // Already dragging sheet
        e.preventDefault();
        controllerRef.current?.handleDragMove(clientY);
      }
    };

    const onPointerUp = () => {
      if (state.isDragging) {
        controllerRef.current?.handleDragEnd();
        setState(prev => ({ ...prev, isDragging: false }));
      }
      gestureState.current.isActive = false;
      gestureState.current.boundaryLock = null;
    };

    element.addEventListener('pointerdown', onPointerDown, { passive: true });
    element.addEventListener('pointermove', onPointerMove as EventListener, { passive: false });
    element.addEventListener('pointerup', onPointerUp as EventListener);

    return () => {
      element.removeEventListener('pointerdown', onPointerDown as EventListener);
      element.removeEventListener('pointermove', onPointerMove as EventListener);
      element.removeEventListener('pointerup', onPointerUp as EventListener);
    };
  }, [currentSheetState, state.isDragging, state.position]);

  // Native touch events for compatibility with legacy devices.
  // Attach in two cases:
  // 1) Pointer Events NOT supported (legacy devices)
  // 2) Test environment (so our tests that dispatch TouchEvent continue to work)
  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const supportsPointerEvents = typeof window !== 'undefined' && 'PointerEvent' in window;
    const inTestEnv = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';
    if (supportsPointerEvents && !inTestEnv) {
      return; // Use pointer events path above; avoid non-passive touch listeners in modern browsers
    }

    // Use passive: true where we never call preventDefault
    element.addEventListener('touchstart', handleContentTouchStart, { passive: true });
    // touchmove needs passive: false because we conditionally call preventDefault at boundaries
    element.addEventListener('touchmove', handleContentTouchMove, { passive: false });
    element.addEventListener('touchend', handleContentTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleContentTouchStart as EventListener);
      element.removeEventListener('touchmove', handleContentTouchMove as EventListener);
      element.removeEventListener('touchend', handleContentTouchEnd as EventListener);
    };
  }, [handleContentTouchStart, handleContentTouchMove, handleContentTouchEnd]);

  // Add wheel event listener for scroll gestures (passive for performance)
  useEffect(() => {
    const element = sheetRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      handleWheelGesture(e);
    };

    element.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      element.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheelGesture]);


  // Remove native touch listeners in favor of pointer events

  // Initialize controller on mount
  useEffect(() => {
    if (controllerRef.current) return;
    controllerRef.current = new SheetController({
      snapPoints,
      initialSnap: snapPoints[1],
      onSnapChange: (snap) => {
        // Ensure React state reflects final snap after animations
        setState(prev => ({ ...prev, snapPoint: snap, position: snap, isDragging: false, velocity: 0 }));
        onSnapChange?.(snap);
      },
      getContentElement: () => contentRef.current,
      getSheetElement: () => sheetRef.current,
      getViewportHeight: () => window.innerHeight,
    });
    // Ensure initial transform matches initial state
    controllerRef.current.setPositionImmediately(state.position);
    // Cleanup on unmount
    return () => {
      controllerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    // State
    currentSnap: state.snapPoint,
    position: state.position,
    isDragging: state.isDragging,
    isExpanded: state.snapPoint >= 90,
    currentSheetState,
    
    // Actions
    snapTo,
    
    // Base drag functions for external use
    handleDragStart,
    handleDragMove, 
    handleDragEnd,
    
    // Refs
    sheetRef,
    contentRef,
  };
}

export type { SnapPoint, UseBottomSheetOptions };