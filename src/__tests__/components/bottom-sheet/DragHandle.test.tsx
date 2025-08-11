import React from 'react';
import { render } from '@testing-library/react';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';

describe('DragHandle (inline in BottomSheet)', () => {
  it('renders with default styling', () => {
    const { getByTestId } = render(<BottomSheet><div /></BottomSheet>);
    const handle = getByTestId('drag-handle');
    expect(handle).toHaveClass('flex', 'justify-center', 'py-2');
    expect(handle).toHaveClass('cursor-grab');
  });

  it('has touch-action none on the sheet wrapper', () => {
    const { getByTestId } = render(<BottomSheet><div /></BottomSheet>);
    const sheet = getByTestId('bottom-sheet') as HTMLElement;
    expect(sheet.style.touchAction).toBe('none');
  });
});