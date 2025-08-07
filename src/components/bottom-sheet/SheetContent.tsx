'use client';

import React from 'react';

interface SheetContentProps {
  children: React.ReactNode;
  isExpanded: boolean;
}

export function SheetContent({ children, isExpanded }: SheetContentProps) {
  return (
    <div 
      className="flex-1 overflow-y-auto px-4 pb-4"
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        pointerEvents: isExpanded ? 'auto' : 'none',
        paddingBottom: 'env(safe-area-inset-bottom, 16px)',
      }}
    >
      {children}
    </div>
  );
}