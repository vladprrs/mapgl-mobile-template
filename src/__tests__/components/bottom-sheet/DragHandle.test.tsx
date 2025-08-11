import React from 'react';
import { render } from '@testing-library/react';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';

describe('DragHandle (inline in BottomSheet)', () => {
  it('renders with default styling', () => {
    const { getByTestId } = render(<BottomSheet><div /></BottomSheet>);
    const handle = getByTestId('drag-handle');
    expect(handle).toHaveClass('flex', 'justify-center', 'py-2');
    // react-modal-sheet handles cursor styling internally
  });

  it('has proper sheet structure', () => {
    const { getByTestId } = render(<BottomSheet><div /></BottomSheet>);
    const sheet = getByTestId('bottom-sheet');
    // react-modal-sheet handles touch-action internally
    expect(sheet).toBeInTheDocument();
    expect(sheet).toHaveClass('bg-white', 'rounded-t-2xl', 'shadow-2xl');
  });
});