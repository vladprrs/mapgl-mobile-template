'use client';

import React from 'react';

interface SheetHandleProps {
  onPointerDown: (e: React.PointerEvent) => void;
}

export function SheetHandle({ onPointerDown }: SheetHandleProps) {
  return (
    <div
      className="relative w-full h-6 flex items-center justify-center cursor-grab active:cursor-grabbing"
      onPointerDown={onPointerDown}
      style={{ touchAction: 'none' }}
    >
      <div className="absolute inset-0" />
      <div className="w-12 h-1 bg-gray-300 rounded-full" />
    </div>
  );
}