'use client';

import React, { forwardRef } from 'react';

interface SheetContentProps {
  children: React.ReactNode;
  isExpanded: boolean;
}

export const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(
  ({ children, isExpanded }, ref) => {
    return (
      <div 
        ref={ref}
        className="flex-1 overflow-y-auto px-4 pb-4"
        style={{
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
          pointerEvents: 'auto',
          paddingBottom: 'env(safe-area-inset-bottom, 16px)',
          // Enable scrolling only when fully expanded
          overflowY: isExpanded ? 'auto' : 'hidden',
        }}
      >
        {children}
      </div>
    );
  }
);

SheetContent.displayName = 'SheetContent';