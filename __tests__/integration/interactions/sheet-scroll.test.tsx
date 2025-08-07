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

  it('should expand sheet when scrolling up in collapsed state', async () => {
    const { container } = render(
      <BottomSheet
        snapPoints={[0.1, 0.5, 0.9]}
        defaultSnapPoint={0}
        onSnapChange={mockOnSnapChange}
      >
        <TestContent />
      </BottomSheet>
    );

    const content = container.querySelector('.overflow-y-auto');
    expect(content).toBeInTheDocument();

    // Simulate scroll up (finger moving up) to expand
    fireEvent.wheel(content!, { deltaY: -100 });

    await waitFor(() => {
      expect(mockOnSnapChange).toHaveBeenCalledWith(1);
    });
  });

  it('should collapse sheet when scrolling down in half-expanded state', async () => {
    const { container } = render(
      <BottomSheet
        snapPoints={[0.1, 0.5, 0.9]}
        defaultSnapPoint={1}
        onSnapChange={mockOnSnapChange}
      >
        <TestContent />
      </BottomSheet>
    );

    const content = container.querySelector('.overflow-y-auto');
    expect(content).toBeInTheDocument();

    // Simulate scroll down (finger moving down) to collapse
    fireEvent.wheel(content!, { deltaY: 100 });

    await waitFor(() => {
      expect(mockOnSnapChange).toHaveBeenCalledWith(0);
    });
  });

  it('should scroll content normally when fully expanded', async () => {
    const { container } = render(
      <BottomSheet
        snapPoints={[0.1, 0.5, 0.9]}
        defaultSnapPoint={2} // Fully expanded
        onSnapChange={mockOnSnapChange}
      >
        <TestContent />
      </BottomSheet>
    );

    const content = container.querySelector('.overflow-y-auto') as HTMLElement;
    expect(content).toBeInTheDocument();

    // Set initial scroll position
    Object.defineProperty(content, 'scrollTop', {
      writable: true,
      value: 100,
    });
    Object.defineProperty(content, 'scrollHeight', {
      writable: true,
      value: 2000,
    });
    Object.defineProperty(content, 'clientHeight', {
      writable: true,
      value: 500,
    });

    // Simulate scrolling within content
    const initialScrollTop = content.scrollTop;
    fireEvent.scroll(content, { target: { scrollTop: 200 } });

    // Should not trigger snap change when scrolling within content
    expect(mockOnSnapChange).not.toHaveBeenCalled();
  });

  it('should collapse sheet when scrolling down at top of content', async () => {
    const { container } = render(
      <BottomSheet
        snapPoints={[0.1, 0.5, 0.9]}
        defaultSnapPoint={2} // Fully expanded
        onSnapChange={mockOnSnapChange}
      >
        <TestContent />
      </BottomSheet>
    );

    const content = container.querySelector('.overflow-y-auto') as HTMLElement;
    expect(content).toBeInTheDocument();

    // Set scroll at top
    Object.defineProperty(content, 'scrollTop', {
      writable: true,
      value: 0,
    });

    // Simulate strong downward scroll to collapse
    fireEvent.wheel(content, { deltaY: 60 });

    await waitFor(() => {
      expect(mockOnSnapChange).toHaveBeenCalledWith(1);
    });
  });

  it('should handle touch gestures on mobile', async () => {
    const { container } = render(
      <BottomSheet
        snapPoints={[0.1, 0.5, 0.9]}
        defaultSnapPoint={0}
        onSnapChange={mockOnSnapChange}
      >
        <TestContent />
      </BottomSheet>
    );

    const content = container.querySelector('.overflow-y-auto');
    expect(content).toBeInTheDocument();

    // Simulate upward swipe
    fireEvent.touchStart(content!, {
      touches: [{ clientY: 500 }] as any,
    });
    fireEvent.touchMove(content!, {
      touches: [{ clientY: 400 }] as any,
    });
    fireEvent.touchEnd(content!);

    await waitFor(() => {
      expect(mockOnSnapChange).toHaveBeenCalledWith(1);
    });
  });

  it('should prevent overscroll bounce', async () => {
    const { container } = render(
      <BottomSheet
        snapPoints={[0.1, 0.5, 0.9]}
        defaultSnapPoint={2} // Fully expanded
        onSnapChange={mockOnSnapChange}
      >
        <TestContent />
      </BottomSheet>
    );

    const content = container.querySelector('.overflow-y-auto') as HTMLElement;
    expect(content).toBeInTheDocument();

    // Set scroll at top
    Object.defineProperty(content, 'scrollTop', {
      writable: true,
      value: 0,
    });

    // Try to scroll beyond top (overscroll)
    const scrollEvent = new Event('scroll', { cancelable: true });
    Object.defineProperty(scrollEvent, 'target', {
      value: { scrollTop: -10 },
      writable: false,
    });

    fireEvent(content, scrollEvent);

    // Should prevent default and not allow negative scroll
    expect(content.scrollTop).toBe(0);
  });

  it('should handle momentum scrolling', async () => {
    const { container } = render(
      <BottomSheet
        snapPoints={[0.1, 0.5, 0.9]}
        defaultSnapPoint={1}
        onSnapChange={mockOnSnapChange}
      >
        <TestContent />
      </BottomSheet>
    );

    const content = container.querySelector('.overflow-y-auto');
    expect(content).toBeInTheDocument();

    // Simulate momentum scroll upward (to expand) with multiple events
    fireEvent.wheel(content!, { deltaY: -30 });
    fireEvent.wheel(content!, { deltaY: -40 });
    fireEvent.wheel(content!, { deltaY: -50 });

    await waitFor(() => {
      // Should snap to fully expanded due to momentum
      expect(mockOnSnapChange).toHaveBeenCalledWith(2);
    });
  });

  it('should not interfere with handle dragging', async () => {
    const { container } = render(
      <BottomSheet
        snapPoints={[0.1, 0.5, 0.9]}
        defaultSnapPoint={1}
        onSnapChange={mockOnSnapChange}
      >
        <TestContent />
      </BottomSheet>
    );

    const handle = container.querySelector('.cursor-grab');
    const content = container.querySelector('.overflow-y-auto');
    
    expect(handle).toBeInTheDocument();
    expect(content).toBeInTheDocument();

    // Start dragging handle
    fireEvent.pointerDown(handle!, { clientY: 300 });
    
    // Try to scroll while dragging - should be ignored
    fireEvent.wheel(content!, { deltaY: -100 });
    
    // Complete drag
    fireEvent.pointerMove(window, { clientY: 200 });
    fireEvent.pointerUp(window);

    // Should only respond to drag, not scroll
    await waitFor(() => {
      expect(mockOnSnapChange).toHaveBeenCalledTimes(1);
    });
  });
});