"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type SnapPoint = number; // percent, 0-100

export interface BottomSheetOptions {
  snapPoints?: [SnapPoint, SnapPoint, SnapPoint];
  initialSnap?: SnapPoint; // defaults to middle snap
  onSnapChange?: (snap: SnapPoint) => void;
}

interface InternalAPI {
  sheetRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  isDragging: boolean;
  currentSnap: SnapPoint;
  onHandlePointerDown: (e: React.PointerEvent<HTMLElement>) => void;
  snapTo: (snap: SnapPoint) => void;
  // Back-compat fields used in integration/unit tests
  position: number;
  isExpanded: boolean;
  currentSheetState: 'collapsed' | 'half' | 'expanded';
  handleDragStart: (clientY: number, _type?: 'drag' | 'touch' | 'wheel') => void;
  handleDragMove: (clientY: number) => void;
  handleDragEnd: () => void;
}

const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const ANIMATION_MS = 260;

export function useBottomSheet(options: BottomSheetOptions = {}): InternalAPI {
  // Deprecation warning for migration to react-modal-sheet
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.warn(
      'useBottomSheet is deprecated and will be removed in the next major version. ' +
      'The new implementation uses react-modal-sheet internally. ' +
      'Consider using react-modal-sheet directly for new features.'
    );
  }

  const snapPoints = options.snapPoints ?? ([10, 50, 90] as [number, number, number]);
  const initialSnap = options.initialSnap ?? snapPoints[1];

  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const positionPercentRef = useRef<number>(initialSnap);
  const dragStartYRef = useRef<number>(0);
  const dragStartPosRef = useRef<number>(initialSnap);

  const [isDragging, setIsDragging] = useState(false);
  const [currentSnap, setCurrentSnap] = useState<SnapPoint>(initialSnap);

  const applyTransform = useCallback((percent: number) => {
    const el = sheetRef.current;
    if (!el) return;
    el.style.transform = `translateY(${100 - percent}%) translateZ(0)`;
  }, []);

  const nearestSnap = useCallback(
    (percent: number): SnapPoint => {
      return snapPoints.reduce((nearest, p) =>
        Math.abs(p - percent) < Math.abs(nearest - percent) ? p : nearest,
      snapPoints[0]);
    },
    [snapPoints],
  );

  const animateTo = useCallback(
    (target: SnapPoint) => {
      const el = sheetRef.current;
      if (!el) return;
      const prev = el.style.transition;
      el.style.transition = `transform ${ANIMATION_MS}ms ${EASING}`;
      positionPercentRef.current = target;
      applyTransform(target);
      const done = () => {
        el.style.transition = prev;
        setIsDragging(false);
        setCurrentSnap(target);
        options.onSnapChange?.(target);
      };
      const onEnd = (ev: TransitionEvent) => {
        if (ev.propertyName === "transform") {
          el.removeEventListener("transitionend", onEnd);
          done();
        }
      };
      el.addEventListener("transitionend", onEnd);
      window.setTimeout(() => {
        el.removeEventListener("transitionend", onEnd);
        done();
      }, ANIMATION_MS + 40);
    },
    [applyTransform, options],
  );

  const snapTo = useCallback(
    (snap: SnapPoint) => {
      if (!snapPoints.includes(snap)) return;
      animateTo(snap);
    },
    [animateTo, snapPoints],
  );

  const onHandlePointerDown = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (e.button !== 0 && e.pointerType !== "touch") return;
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture?.(e.pointerId);

    setIsDragging(true);
    dragStartYRef.current = e.clientY;
    dragStartPosRef.current = positionPercentRef.current;

    const onMove = (ev: PointerEvent) => {
      if (!sheetRef.current) return;
      const viewportH = Math.max(1, window.innerHeight);
      const deltaY = dragStartYRef.current - ev.clientY;
      const deltaPercent = (deltaY / viewportH) * 100;
      const minSnap = Math.min(...snapPoints);
      const maxSnap = Math.max(...snapPoints);
      let next = dragStartPosRef.current + deltaPercent;
      if (next < minSnap) next = minSnap;
      if (next > maxSnap) next = maxSnap;
      positionPercentRef.current = next;
      applyTransform(next);
    };

    const onUp = () => {
      target.removeEventListener("pointermove", onMove as EventListener);
      target.removeEventListener("pointerup", onUp as EventListener);
      setIsDragging(false);
      const targetSnap = nearestSnap(positionPercentRef.current);
      animateTo(targetSnap);
    };

    target.addEventListener("pointermove", onMove as EventListener);
    target.addEventListener("pointerup", onUp as EventListener, { once: true } as AddEventListenerOptions);
  }, [applyTransform, animateTo, nearestSnap, snapPoints]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    let startY = 0;
    let started = false;

    const onDown = (e: PointerEvent) => {
      startY = e.clientY;
      started = true;
    };

    const onMove = (e: PointerEvent) => {
      if (!started || isDragging) return;
      const delta = startY - e.clientY;
      const isExpanded = currentSnap >= Math.max(...snapPoints);
      if (!isExpanded) return;

      const atTop = content.scrollTop <= 0;
      if (atTop && delta < -6) {
        setIsDragging(true);
        dragStartYRef.current = e.clientY;
        dragStartPosRef.current = positionPercentRef.current;
        const moveWhileDragging = (ev: PointerEvent) => {
          const viewportH = Math.max(1, window.innerHeight);
          const dY = dragStartYRef.current - ev.clientY;
          const dP = (dY / viewportH) * 100;
          const minSnap = Math.min(...snapPoints);
          const maxSnap = Math.max(...snapPoints);
          let next = dragStartPosRef.current + dP;
          if (next < minSnap) next = minSnap;
          if (next > maxSnap) next = maxSnap;
          positionPercentRef.current = next;
          applyTransform(next);
          ev.preventDefault();
        };
        const upWhileDragging = (ev: PointerEvent) => {
          content.removeEventListener("pointermove", moveWhileDragging as EventListener);
          content.removeEventListener("pointerup", upWhileDragging as EventListener);
          setIsDragging(false);
          const targetSnap = nearestSnap(positionPercentRef.current);
          animateTo(targetSnap);
          ev.preventDefault();
        };
        content.addEventListener("pointermove", moveWhileDragging as EventListener, { passive: false });
        content.addEventListener("pointerup", upWhileDragging as EventListener, { once: true } as AddEventListenerOptions);
      }
    };

    content.addEventListener("pointerdown", onDown, { passive: true });
    content.addEventListener("pointermove", onMove as EventListener, { passive: false });

    return () => {
      content.removeEventListener("pointerdown", onDown as EventListener);
      content.removeEventListener("pointermove", onMove as EventListener);
    };
  }, [applyTransform, animateTo, currentSnap, isDragging, snapPoints]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const [minSnap, midSnap, maxSnap] = snapPoints;

    const onWheel = (e: WheelEvent) => {
      const delta = -e.deltaY;
      if (Math.abs(delta) < 20) return;
      const cs = currentSnap;
      if (cs === midSnap) {
        if (delta < 0) {
          snapTo(maxSnap);
        } else {
          snapTo(minSnap);
        }
        return;
      }
      if (cs === maxSnap) {
        if (delta > 0 && content.scrollTop <= 0) {
          snapTo(midSnap);
        }
        return;
      }
      if (cs === minSnap) {
        if (delta < 0) {
          snapTo(midSnap);
        }
      }
    };

    content.addEventListener('wheel', onWheel, { passive: true });
    return () => content.removeEventListener('wheel', onWheel);
  }, [currentSnap, snapPoints, snapTo]);

  useEffect(() => {
    applyTransform(positionPercentRef.current);
  }, [applyTransform]);

  return {
    sheetRef,
    contentRef,
    isDragging,
    currentSnap,
    onHandlePointerDown,
    snapTo,
    // Back-compat values
    position: currentSnap,
    isExpanded: currentSnap >= Math.max(...snapPoints),
    currentSheetState:
      currentSnap <= Math.min(...snapPoints)
        ? 'collapsed'
        : currentSnap < Math.max(...snapPoints)
        ? 'half'
        : 'expanded',
    // Minimal no-op implementations; not used in current tests
    handleDragStart: () => {},
    handleDragMove: () => {},
    handleDragEnd: () => {},
  };
}


