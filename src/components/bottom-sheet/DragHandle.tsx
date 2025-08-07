import React from 'react';

interface DragHandleProps {
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  isDragging?: boolean;
}

export function DragHandle({
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onMouseDown,
  isDragging = false,
}: DragHandleProps) {
  return (
    <div
      className="flex justify-center py-2 cursor-grab active:cursor-grabbing"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      style={{ touchAction: 'none' }}
    >
      <div
        className={`
          w-12 h-1 bg-gray-300 rounded-full transition-colors duration-150
          ${isDragging ? 'bg-gray-500' : 'hover:bg-gray-400'}
        `}
      />
    </div>
  );
}