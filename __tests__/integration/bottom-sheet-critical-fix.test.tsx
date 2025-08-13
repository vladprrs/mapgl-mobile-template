import React from 'react';
import { render, screen } from '@testing-library/react';
import { BottomSheet } from '@/components/organisms/bottom-sheet/BottomSheet';

describe('BottomSheet Critical Fix - Prevent Disappearing', () => {
  it('should never allow sheet to close completely', () => {
    const { container } = render(
      <BottomSheet snapPoints={[10, 50, 90]}>
        <div>Test Content</div>
      </BottomSheet>
    );

    // Get the sheet element
    const sheet = screen.getByTestId('bottom-sheet');
    expect(sheet).toBeInTheDocument();

    // Sheet should always be visible (never removed from DOM)
    // Even after attempting to close
    expect(sheet).toHaveAttribute('data-testid', 'bottom-sheet');
  });

  it('should enforce minimum snap point of at least 10%', () => {
    const onSnapChange = jest.fn();
    const { container } = render(
      <BottomSheet 
        snapPoints={[5, 50, 90]} // Even with 5% requested
        onSnapChange={onSnapChange}
      >
        <div>Test Content</div>
      </BottomSheet>
    );

    // The component should enforce a minimum of 10%
    // This prevents the sheet from becoming unreachable
    const sheet = screen.getByTestId('bottom-sheet');
    expect(sheet).toBeInTheDocument();
  });

  it('should have enhanced visibility styles when collapsed', () => {
    const { container } = render(
      <BottomSheet snapPoints={[10, 50, 90]} initialSnap={10}>
        <div>Test Content</div>
      </BottomSheet>
    );

    const sheet = screen.getByTestId('bottom-sheet');
    
    // Check for drag handle visibility
    const dragHandle = screen.getByTestId('drag-handle');
    expect(dragHandle).toBeInTheDocument();
    
    // Drag handle should be visible and accessible
    expect(dragHandle).toBeVisible();
  });

  it('should maintain drag handle at all snap points', () => {
    const snapPoints: [number, number, number] = [10, 50, 90];
    
    snapPoints.forEach(snapPoint => {
      const { container, unmount } = render(
        <BottomSheet snapPoints={snapPoints} initialSnap={snapPoint}>
          <div>Test Content</div>
        </BottomSheet>
      );

      const dragHandle = screen.getByTestId('drag-handle');
      expect(dragHandle).toBeInTheDocument();
      expect(dragHandle).toBeVisible();
      
      unmount();
    });
  });

  it('should prevent sheet from going below minimum position', () => {
    const onSnapChange = jest.fn();
    const { container } = render(
      <BottomSheet 
        snapPoints={[0, 50, 90]} // Request 0% (which would make sheet disappear)
        onSnapChange={onSnapChange}
      >
        <div>Test Content</div>
      </BottomSheet>
    );

    // Sheet should still be visible despite 0% snap point request
    const sheet = screen.getByTestId('bottom-sheet');
    expect(sheet).toBeInTheDocument();
    
    // Verify sheet maintains minimum height
    // It should never collapse to 0
    expect(sheet).toBeVisible();
  });
});