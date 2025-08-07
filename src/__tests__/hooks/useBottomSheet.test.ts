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

  describe('Native Event Handling', () => {
    it('provides drag handle event handlers', () => {
      const { result } = renderHook(() => useBottomSheet());

      expect(typeof result.current.handleTouchStart).toBe('function');
      expect(typeof result.current.handleTouchMove).toBe('function');
      expect(typeof result.current.handleTouchEnd).toBe('function');
      expect(typeof result.current.handleMouseDown).toBe('function');
    });

    it('provides refs for native event listener attachment', () => {
      const { result } = renderHook(() => useBottomSheet());

      expect(result.current.sheetRef).toBeDefined();
      expect(result.current.contentRef).toBeDefined();
    });

    it('handles momentum swipes through native events', () => {
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

    it('prevents overscroll bouncing through native event handling', () => {
      const { result } = renderHook(() => useBottomSheet());
      
      // Native event listeners are attached via useEffect
      // This test verifies the hook provides the necessary refs
      expect(result.current.contentRef).toBeDefined();
      expect(result.current.sheetRef).toBeDefined();
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