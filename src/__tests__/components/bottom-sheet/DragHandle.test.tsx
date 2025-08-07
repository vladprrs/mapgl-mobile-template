import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { DragHandle } from '@/components/bottom-sheet/DragHandle';

describe('DragHandle', () => {
  it('renders with default styling', () => {
    const { container } = render(<DragHandle />);
    
    const handle = container.firstChild as HTMLElement;
    expect(handle).toHaveClass('flex', 'justify-center', 'py-2');
    expect(handle).toHaveClass('cursor-grab');
    
    const bar = handle.querySelector('div');
    expect(bar).toHaveClass('w-12', 'h-1', 'bg-gray-300', 'rounded-full');
  });

  it('shows dragging state', () => {
    const { container } = render(<DragHandle isDragging={true} />);
    
    const handle = container.firstChild as HTMLElement;
    expect(handle).toHaveClass('active:cursor-grabbing');
    
    const bar = handle.querySelector('div');
    expect(bar).toHaveClass('bg-gray-500');
  });

  it('calls touch event handlers', () => {
    const mockTouchStart = jest.fn();
    const mockTouchMove = jest.fn();
    const mockTouchEnd = jest.fn();
    
    const { container } = render(
      <DragHandle
        onTouchStart={mockTouchStart}
        onTouchMove={mockTouchMove}
        onTouchEnd={mockTouchEnd}
      />
    );
    
    const handle = container.firstChild as HTMLElement;
    
    fireEvent.touchStart(handle);
    expect(mockTouchStart).toHaveBeenCalled();
    
    fireEvent.touchMove(handle);
    expect(mockTouchMove).toHaveBeenCalled();
    
    fireEvent.touchEnd(handle);
    expect(mockTouchEnd).toHaveBeenCalled();
  });

  it('calls mouse event handlers', () => {
    const mockMouseDown = jest.fn();
    
    const { container } = render(<DragHandle onMouseDown={mockMouseDown} />);
    
    const handle = container.firstChild as HTMLElement;
    
    fireEvent.mouseDown(handle);
    expect(mockMouseDown).toHaveBeenCalled();
  });

  it('has touch-action none for gesture handling', () => {
    const { container } = render(<DragHandle />);
    
    const handle = container.firstChild as HTMLElement;
    expect(handle.style.touchAction).toBe('none');
  });
});