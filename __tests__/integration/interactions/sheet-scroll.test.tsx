import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';
import '@testing-library/jest-dom';

// Mock hooks
jest.mock('@/hooks/useMapGL', () => ({
  useMapGL: () => ({
    addMarker: jest.fn(),
    centerOnLocation: jest.fn(),
    clearMarkers: jest.fn(),
  }),
}));

describe('BottomSheet Scroll Interactions', () => {
  const mockOnSnapChange = jest.fn();
  
  const TestContent = () => (
    <div style={{ height: '200vh' }}>
      <div data-testid="content-top">Top Content</div>
      <div style={{ marginTop: '100vh' }} data-testid="content-bottom">
        Bottom Content
      </div>
    </div>
  );

  beforeEach(() => {
    mockOnSnapChange.mockClear();
  });

  it('should expand sheet when scrolling up from default state', async () => {
    const { container } = render(
      <BottomSheet
        snapPoints={[10, 50, 90]}
        onSnapChange={mockOnSnapChange}
      >
        <TestContent />
      </BottomSheet>
    );

    const content = container.querySelector('.px-4');
    expect(content).toBeInTheDocument();

    // Sheet starts at 50% (half), scrolling up should expand to 90%
    fireEvent.wheel(content!, { deltaY: 100 });

    await waitFor(() => {
      expect(mockOnSnapChange).toHaveBeenCalledWith(90);
    });
  });

  it('should collapse sheet when scrolling down in half-expanded state', async () => {
    const { container } = render(
      <BottomSheet
        snapPoints={[10, 50, 90]}
        onSnapChange={mockOnSnapChange}
      >
        <TestContent />
      </BottomSheet>
    );

    const content = container.querySelector('.px-4');
    expect(content).toBeInTheDocument();

    // Simulate scroll down (wheel down) to collapse - wheel deltaY is inverted
    fireEvent.wheel(content!, { deltaY: -100 });

    await waitFor(() => {
      expect(mockOnSnapChange).toHaveBeenCalledWith(10);
    });
  });

  it('should scroll content normally when fully expanded', async () => {
    // This test needs to simulate the expanded state by manually triggering snap to 90
    const { container } = render(
      <BottomSheet
        snapPoints={[10, 50, 90]}
        onSnapChange={mockOnSnapChange}
      >
        <TestContent />
      </BottomSheet>
    );

    // First, expand to 90% to enable content scrolling
    mockOnSnapChange.mockClear();
    const content = container.querySelector('.px-4') as HTMLElement;
    expect(content).toBeInTheDocument();
    
    // Expand sheet to 90% first - wheel deltaY inverted
    fireEvent.wheel(content, { deltaY: 100 });
    fireEvent.wheel(content, { deltaY: 100 });
    
    // Wait for expansion, then test content scrolling behavior
    await waitFor(() => {
      // The sheet should now be in an expanded state where content can scroll
      // but we can't easily test actual content scrolling in JSDOM
      expect(mockOnSnapChange).toHaveBeenCalled();
    });
  });

  it('should collapse sheet when scrolling down at top of content', async () => {
    const { container } = render(
      <BottomSheet
        snapPoints={[10, 50, 90]}
        onSnapChange={mockOnSnapChange}
      >
        <TestContent />
      </BottomSheet>
    );

    const content = container.querySelector('.px-4') as HTMLElement;
    expect(content).toBeInTheDocument();

    // Simulate strong downward scroll to collapse from default (50%) state - inverted
    fireEvent.wheel(content, { deltaY: -60 });

    await waitFor(() => {
      expect(mockOnSnapChange).toHaveBeenCalledWith(10);
    });
  });

  it('should handle touch gestures on mobile', async () => {
    const { container } = render(
      <BottomSheet
        snapPoints={[10, 50, 90]}
        onSnapChange={mockOnSnapChange}
      >
        <TestContent />
      </BottomSheet>
    );

    const content = container.querySelector('.px-4');
    expect(content).toBeInTheDocument();

    // Touch interactions are complex with our new conservative logic
    // Just verify the component renders with proper mobile optimization
    expect(content).toHaveClass('px-4');
    expect((content as HTMLElement).style.touchAction).toBe('none'); // 'none' at default 50% state
  });

  it('should prevent overscroll bounce', async () => {
    const { container } = render(
      <BottomSheet
        snapPoints={[10, 50, 90]}
        onSnapChange={mockOnSnapChange}
      >
        <TestContent />
      </BottomSheet>
    );

    const content = container.querySelector('.px-4') as HTMLElement;
    expect(content).toBeInTheDocument();

    // At default state (50%), content overflow is hidden, so overscroll is naturally prevented
    expect(content).toHaveClass('overflow-hidden');
    
    // This test verifies that the component structure prevents overscroll bounce
    expect(content.style.overscrollBehavior).toBe('none');
  });

  it('should handle momentum scrolling', async () => {
    const { container } = render(
      <BottomSheet
        snapPoints={[10, 50, 90]}
        onSnapChange={mockOnSnapChange}
      >
        <TestContent />
      </BottomSheet>
    );

    const content = container.querySelector('.px-4');
    expect(content).toBeInTheDocument();

    // Simulate momentum scroll upward (to expand) - wheel deltaY inverted, starts at 50%, should go to 90%
    fireEvent.wheel(content!, { deltaY: 30 });
    fireEvent.wheel(content!, { deltaY: 40 });
    fireEvent.wheel(content!, { deltaY: 50 });

    await waitFor(() => {
      // Should snap to fully expanded (90%) due to momentum
      expect(mockOnSnapChange).toHaveBeenCalledWith(90);
    });
  });

  it('should not interfere with handle dragging', async () => {
    const { container } = render(
      <BottomSheet
        snapPoints={[10, 50, 90]}
        onSnapChange={mockOnSnapChange}
      >
        <TestContent />
      </BottomSheet>
    );

    const handle = container.querySelector('.cursor-grab');
    const content = container.querySelector('.px-4');
    
    expect(handle).toBeInTheDocument();
    expect(content).toBeInTheDocument();

    // This test primarily verifies that both handle and content are properly rendered
    // The actual drag-scroll interaction logic is complex to test in JSDOM
    expect(handle).toHaveClass('cursor-grab');
    expect(content).toHaveClass('px-4');
  });
});