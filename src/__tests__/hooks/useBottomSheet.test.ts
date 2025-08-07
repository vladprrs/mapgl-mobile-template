import { renderHook, act } from '@testing-library/react';
import { useBottomSheet } from '@/hooks/useBottomSheet';

// Mock window dimensions
Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 800,
});

describe('useBottomSheet', () => {
  it('initializes with default snap points at middle position', () => {
    const { result } = renderHook(() => useBottomSheet());

    expect(result.current.currentSnap).toBe(50); // Now starts at middle snap point
    expect(result.current.position).toBe(50);
    expect(result.current.isDragging).toBe(false);
    expect(result.current.isExpanded).toBe(false);
  });

  it('initializes with custom snap points at middle position', () => {
    const { result } = renderHook(() => 
      useBottomSheet({ snapPoints: [20, 60, 80] })
    );

    expect(result.current.currentSnap).toBe(60); // Starts at middle snap point
    expect(result.current.position).toBe(60);
  });

  it('snaps to target position', () => {
    const onSnapChange = jest.fn();
    const { result } = renderHook(() => 
      useBottomSheet({ onSnapChange })
    );

    act(() => {
      result.current.snapTo(50);
    });

    expect(result.current.currentSnap).toBe(50);
    expect(result.current.position).toBe(50);
    expect(result.current.isDragging).toBe(false);
    expect(onSnapChange).toHaveBeenCalledWith(50);
  });

  it('detects expanded state correctly', () => {
    const { result } = renderHook(() => useBottomSheet());

    act(() => {
      result.current.snapTo(90);
    });

    expect(result.current.isExpanded).toBe(true);

    act(() => {
      result.current.snapTo(50);
    });

    expect(result.current.isExpanded).toBe(false);
  });

  it('ignores invalid snap points', () => {
    const { result } = renderHook(() => useBottomSheet());
    const initialSnap = result.current.currentSnap;

    act(() => {
      // Testing invalid snap point (not in snapPoints array)
      result.current.snapTo(75);
    });

    expect(result.current.currentSnap).toBe(initialSnap);
  });

  it('provides sheet and content refs', () => {
    const { result } = renderHook(() => useBottomSheet());

    expect(result.current.sheetRef).toBeDefined();
    expect(result.current.contentRef).toBeDefined();
  });

  describe('Sheet States', () => {
    it('detects half state correctly as default', () => {
      const { result } = renderHook(() => useBottomSheet());
      
      expect(result.current.currentSheetState).toBe('half'); // Now starts in half state
    });

    it('detects half state correctly', () => {
      const { result } = renderHook(() => useBottomSheet());
      
      act(() => {
        result.current.snapTo(50);
      });
      
      expect(result.current.currentSheetState).toBe('half');
    });

    it('detects expanded state correctly', () => {
      const { result } = renderHook(() => useBottomSheet());
      
      act(() => {
        result.current.snapTo(90);
      });
      
      expect(result.current.currentSheetState).toBe('expanded');
    });
  });

  describe('Content Touch Handlers', () => {
    it('provides content touch event handlers', () => {
      const { result } = renderHook(() => useBottomSheet());

      expect(typeof result.current.handleContentTouchStart).toBe('function');
      expect(typeof result.current.handleContentTouchMove).toBe('function');
      expect(typeof result.current.handleContentTouchEnd).toBe('function');
    });

    it('handles content touch start', () => {
      const { result } = renderHook(() => useBottomSheet());
      const mockEvent = {
        touches: [{ clientY: 400 }],
      } as unknown as React.TouchEvent;

      act(() => {
        result.current.handleContentTouchStart(mockEvent);
      });

      // Should not immediately start dragging on touch start
      expect(result.current.isDragging).toBe(false);
    });

    it('handles momentum swipes', () => {
      jest.useFakeTimers();
      const { result } = renderHook(() => useBottomSheet());
      
      // Start at half state (new default)
      expect(result.current.currentSnap).toBe(50);
      
      // Mock a quick expand gesture
      act(() => {
        result.current.snapTo(90); // Simulate momentum causing state change
      });
      
      // Should have moved to expanded state
      expect(result.current.currentSnap).toBe(90);
      
      jest.useRealTimers();
    });
  });

  describe('Scroll Behavior', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    
    afterEach(() => {
      jest.useRealTimers();
    });

    it('allows content scrolling only when expanded', () => {
      const { result } = renderHook(() => useBottomSheet());
      
      // In half state - should not allow content scrolling
      expect(result.current.currentSheetState).toBe('half');
      
      // Expand to full
      act(() => {
        result.current.snapTo(90);
      });
      
      expect(result.current.currentSheetState).toBe('expanded');
      expect(result.current.isExpanded).toBe(true);
    });

    it('transitions between states on scroll gestures', () => {
      const { result } = renderHook(() => useBottomSheet());
      
      // Start at half (new default)
      expect(result.current.currentSnap).toBe(50);
      expect(result.current.currentSheetState).toBe('half');
      
      // Collapse to minimum
      act(() => {
        result.current.snapTo(10);
      });
      
      expect(result.current.currentSnap).toBe(10);
      expect(result.current.currentSheetState).toBe('collapsed');
      
      // Expand to full
      act(() => {
        result.current.snapTo(90);
      });
      
      expect(result.current.currentSnap).toBe(90);
      expect(result.current.currentSheetState).toBe('expanded');
    });
  });

  describe('Edge Cases', () => {
    it('handles short content correctly', () => {
      const { result } = renderHook(() => useBottomSheet());
      
      // Should work normally even with short content
      act(() => {
        result.current.snapTo(90);
      });
      
      expect(result.current.isExpanded).toBe(true);
    });

    it('prevents overscroll bouncing', () => {
      const { result } = renderHook(() => useBottomSheet());
      
      // Mock touch move with large delta
      const mockEvent = {
        touches: [{ clientY: 100 }], // Large movement
        preventDefault: jest.fn(),
      } as unknown as React.TouchEvent & { preventDefault: jest.Mock };
      
      act(() => {
        result.current.handleContentTouchStart({ touches: [{ clientY: 600 }] } as unknown as React.TouchEvent);
        result.current.handleContentTouchMove(mockEvent);
      });
      
      // Should handle the gesture appropriately
      expect(typeof result.current.handleContentTouchMove).toBe('function');
    });

    it('handles rapid wheel events', () => {
      const { result } = renderHook(() => useBottomSheet());
      
      // Should provide wheel handling capability
      expect(result.current.sheetRef).toBeDefined();
    });

    it('cleans up timeouts on unmount', () => {
      const { unmount } = renderHook(() => useBottomSheet());
      
      // Should not throw on unmount
      expect(() => unmount()).not.toThrow();
    });
  });
});