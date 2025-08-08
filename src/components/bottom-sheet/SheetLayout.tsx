'use client';

import React from 'react';

interface SheetLayoutProps {
  header?: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
  contentClassName?: string;

  // State-driven styling
  isDragging: boolean;
  isExpanded: boolean;
  currentSheetState: string;

  // Positioning
  transform: string;

  // Refs for gesture/scroll wiring
  sheetRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

export function SheetLayout({
  header,
  content,
  className = '',
  contentClassName = '',
  isDragging,
  isExpanded,
  currentSheetState,
  transform,
  sheetRef,
  contentRef,
}: SheetLayoutProps) {
  return (
    <div
      ref={sheetRef}
      className={`
        fixed inset-x-0 bottom-0 z-50
        bg-white rounded-t-2xl shadow-2xl
        transition-transform duration-300 ease-out
        ${isDragging ? 'transition-none' : ''}
        ${currentSheetState === 'expanded' ? 'shadow-3xl' : ''}
        ${className}
      `}
      style={{
        transform: `${transform} translateZ(0)`,
        height: '100vh',
        paddingBottom: 'env(safe-area-inset-bottom)',
        willChange: 'transform',
        // Important: do NOT set touchAction: 'none' on the whole sheet,
        // as it would also disable horizontal scrolling in children like QuickAccessPanel.
        // Drag areas (e.g., handle) and the content area manage their own touch-action.
        overscrollBehaviorY: 'none',
        contain: 'layout paint size',
        backfaceVisibility: 'hidden',
      }}
      data-testid="bottom-sheet"
      data-sheet-state={currentSheetState}
    >
      {/* Unified non-scrolling header area that moves with sheet transform */}
      {header && (
        <div className="bg-white" style={{ touchAction: 'manipulation' }}>
          {header}
        </div>
      )}

      {/* Scrollable content area */}
      <div
        ref={contentRef}
        className={`h-full ${isExpanded ? 'overflow-y-auto' : 'overflow-hidden'} ${contentClassName}`}
        data-testid="bottom-sheet-content"
        data-scrollable={isExpanded ? 'true' : undefined}
        style={{
          // Keep smooth scrolling off by default to avoid double animations during snaps
          // Consumers can enable where appropriate
          overscrollBehavior: isExpanded ? 'auto' : 'none',
          // Allow horizontal scrollers (e.g., StoriesPanel) to work inside content
          touchAction: isExpanded ? 'auto' : 'none',
          scrollBehavior: 'auto',
        }}
      >
        {content}
      </div>
    </div>
  );
}

export type { SheetLayoutProps };


