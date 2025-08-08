/*
  SheetController: Encapsulates bottom sheet interaction state machine, boundary detection, velocity
  estimation, and RAF-driven transform updates. Components should not manipulate transforms directly; this
  controller writes the transform to the sheet element for high-frequency drag updates and calls back to
  the host to notify about snap changes and state transitions.
*/

import { canScroll, isAtBottom, isAtTop, type ScrollDirection } from './boundary-utils';
import { VelocityEstimator } from './velocity-estimator';

export enum SheetState {
  Idle = 'Idle',
  DraggingSheet = 'DraggingSheet',
  ScrollingContent = 'ScrollingContent',
  ArmedAtTopBoundary = 'ArmedAtTopBoundary',
  ArmedAtBottomBoundary = 'ArmedAtBottomBoundary',
  Snapping = 'Snapping',
}

export interface SheetControllerOptions {
  snapPoints: [number, number, number];
  initialSnap?: number; // percent
  onSnapChange?: (snap: number) => void;
  getContentElement: () => HTMLElement | null;
  getSheetElement: () => HTMLElement | null;
  getViewportHeight: () => number; // used to convert pixels to percent
  debug?: boolean;
}

export class SheetController {
  private options: SheetControllerOptions;
  private state: SheetState = SheetState.Idle;
  private positionPercent: number; // visual position (percent of viewport height)
  private currentSnap: number;
  private rafId: number | null = null;
  private pendingTransform: string | null = null;
  private velocityEstimator = new VelocityEstimator(8);
  private draggingStartPercent = 0;
  private draggingStartY = 0;
  private boundaryArmedY = 0;

  constructor(options: SheetControllerOptions) {
    this.options = options;
    const initial = options.initialSnap ?? options.snapPoints[1];
    this.positionPercent = initial;
    this.currentSnap = initial;
  }

  getState(): SheetState {
    return this.state;
  }

  getPositionPercent(): number {
    return this.positionPercent;
  }

  getCurrentSnap(): number {
    return this.currentSnap;
  }

  setPositionImmediately(percent: number) {
    this.positionPercent = percent;
    this.scheduleTransform();
  }

  private log(...args: unknown[]) {
    if (this.options.debug) {
      // eslint-disable-next-line no-console
      console.debug('[SheetController]', ...args);
    }
  }

  // Public API: snapping
  snapTo(targetSnap: number) {
    if (!this.options.snapPoints.includes(targetSnap)) return;
    this.currentSnap = targetSnap;
    this.state = SheetState.Snapping;
    this.animateTo(targetSnap, () => {
      this.state = SheetState.Idle;
      this.options.onSnapChange?.(targetSnap);
    });
  }

  // Event handlers (normalized for touch/mouse/pointer)
  handleDragStart(clientY: number) {
    this.log('drag start', clientY);
    this.state = SheetState.DraggingSheet;
    this.draggingStartY = clientY;
    this.draggingStartPercent = this.positionPercent;
    this.velocityEstimator.reset();
    this.velocityEstimator.addSample(this.positionPercent);
  }

  handleDragMove(clientY: number) {
    if (this.state !== SheetState.DraggingSheet) return;
    const viewportHeight = Math.max(1, this.options.getViewportHeight());
    const deltaY = this.draggingStartY - clientY;
    const deltaPercent = (deltaY / viewportHeight) * 100;
    let newPosition = this.draggingStartPercent + deltaPercent;

    const minSnap = Math.min(...this.options.snapPoints);
    const maxSnap = Math.max(...this.options.snapPoints);
    if (newPosition < minSnap) {
      const excess = minSnap - newPosition;
      newPosition = minSnap - excess * 0.3;
    } else if (newPosition > maxSnap) {
      const excess = newPosition - maxSnap;
      newPosition = maxSnap + excess * 0.3;
    }

    this.positionPercent = newPosition;
    this.velocityEstimator.addSample(this.positionPercent);
    this.scheduleTransform();
  }

  handleDragEnd() {
    if (this.state !== SheetState.DraggingSheet) return;
    const v = this.velocityEstimator.getVelocity(); // percent/ms
    const target = this.findNearestSnapPoint(this.positionPercent, v);
    this.log('drag end → snap', { v, target });
    this.snapTo(target);
  }

  // Content touch handling: pass in deltaY and expanded flag
  handleContentScrollIntent(deltaY: number, isExpanded: boolean) {
    const content = this.options.getContentElement();
    if (!isExpanded || !content) {
      return 'sheet' as const;
    }
    const direction: ScrollDirection = deltaY > 0 ? 'up' : 'down';

    if (canScroll(content, direction)) {
      this.state = SheetState.ScrollingContent;
      return 'content' as const;
    }

    // At boundary → arm lock symmetrically
    if (direction === 'down') {
      // finger moved down → user intends to collapse sheet; boundary at top
      if (this.state !== SheetState.ArmedAtTopBoundary) {
        this.state = SheetState.ArmedAtTopBoundary;
        return 'content' as const;
      }
    } else {
      // direction up → boundary at bottom
      if (this.state !== SheetState.ArmedAtBottomBoundary) {
        this.state = SheetState.ArmedAtBottomBoundary;
        return 'content' as const;
      }
    }

    return 'sheet' as const;
  }

  armBoundary(clientY: number) {
    this.boundaryArmedY = clientY;
  }

  shouldFlipFromBoundaryToDrag(clientY: number): boolean {
    const postBoundaryDistance = Math.abs(clientY - this.boundaryArmedY);
    return postBoundaryDistance >= 10; // px threshold, symmetric
  }

  // Internal helpers
  private findNearestSnapPoint(position: number, velocity: number): number {
    const velocityThreshold = 0.001; // percent/ms ≈ 1% per 1s; tuned for recent-frame estimator
    if (Math.abs(velocity) > velocityThreshold) {
      const direction = velocity > 0 ? 1 : -1;
      const currentIndex = this.options.snapPoints.findIndex((p) => p === this.currentSnap);
      const nextIndex = currentIndex + direction;
      if (nextIndex >= 0 && nextIndex < this.options.snapPoints.length) {
        return this.options.snapPoints[nextIndex];
      }
    }
    return this.options.snapPoints.reduce((nearest, p) =>
      Math.abs(p - position) < Math.abs(nearest - position) ? p : nearest,
    this.options.snapPoints[0]);
  }

  private scheduleTransform() {
    const sheet = this.options.getSheetElement();
    if (!sheet) return;
    this.pendingTransform = `translateY(${100 - this.positionPercent}%)`;
    if (this.rafId != null) return;
    this.rafId = requestAnimationFrame(() => {
      if (this.pendingTransform && sheet) {
        sheet.style.transform = this.pendingTransform;
      }
      this.pendingTransform = null;
      this.rafId = null;
    });
  }

  private animateTo(targetPercent: number, onComplete: () => void) {
    const sheet = this.options.getSheetElement();
    if (!sheet) {
      this.positionPercent = targetPercent;
      onComplete();
      return;
    }
    // Dynamic duration based on distance, clamped between 180ms and 350ms.
    const distance = Math.abs(targetPercent - this.positionPercent);
    const normalized = Math.min(1, Math.max(0, distance / 100));
    let durationMs = Math.round(180 + (350 - 180) * normalized);
    // Respect prefers-reduced-motion
    const prefersReduced = typeof window !== 'undefined' &&
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      durationMs = Math.min(120, durationMs); // shorten significantly
    }
    // Apply timing via inline style to avoid class churn; use consistent easing.
    const prevTransition = sheet.style.transition;
    sheet.style.transition = prefersReduced
      ? `transform ${durationMs}ms linear`
      : `transform ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1)`; // easeOutCubic-ish

    this.positionPercent = targetPercent;
    this.scheduleTransform();

    const cleanup = () => {
      sheet.style.transition = prevTransition;
      onComplete();
    };

    const onEnd = (ev: TransitionEvent) => {
      if (ev.propertyName === 'transform') {
        sheet.removeEventListener('transitionend', onEnd);
        cleanup();
      }
    };
    sheet.addEventListener('transitionend', onEnd);
    // Safety timeout in case transitionend doesn't fire
    window.setTimeout(() => {
      sheet.removeEventListener('transitionend', onEnd);
      cleanup();
    }, durationMs + 60);
  }
}


