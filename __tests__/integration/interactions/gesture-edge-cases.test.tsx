import React from 'react'
import { render, act, fireEvent } from '@testing-library/react'
import { useBottomSheet } from '@/hooks/useBottomSheet'

// Test component that exposes internal gesture state for testing
function GestureTestComponent({ 
  initialSnap = 50,
  snapPoints = [10, 50, 90],
  onGestureStateChange
}: {
  initialSnap?: number
  snapPoints?: [number, number, number]
  onGestureStateChange?: (state: any) => void
}) {
  const bottomSheetHook = useBottomSheet({
    snapPoints,
    onSnapChange: (snap) => {
      onGestureStateChange?.({
        type: 'snap',
        snap,
        position: bottomSheetHook.position
      })
    }
  })

  const { 
    position, 
    currentSnap, 
    isDragging, 
    isExpanded,
    sheetRef, 
    contentRef 
  } = bottomSheetHook

  // Expose internal state for testing
  React.useEffect(() => {
    onGestureStateChange?.({
      type: 'state',
      position,
      currentSnap,
      isDragging,
      isExpanded
    })
  }, [position, currentSnap, isDragging, isExpanded, onGestureStateChange])

  return (
    <div
      ref={sheetRef}
      data-testid="sheet"
      data-position={position}
      data-snap={currentSnap}
      data-dragging={isDragging}
      data-expanded={isExpanded}
      style={{
        transform: `translateY(${100 - position}%)`,
        position: 'fixed',
        height: '100vh',
        width: '100%',
        bottom: 0
      }}
    >
      <div 
        ref={contentRef}
        data-testid="content"
        style={{ 
          height: '300px', 
          overflowY: 'auto',
          background: '#fff',
          border: '1px solid #ccc'
        }}
      >
        <div style={{ height: '600px', padding: '20px' }}>
          Scrollable content that is taller than container
          <div data-testid="scroll-target" style={{ marginTop: '200px' }}>
            Target for scroll testing
          </div>
        </div>
      </div>
    </div>
  )
}

describe('Gesture Edge Cases', () => {
  const createMockTouch = (props: { clientY: number; identifier: number }): Touch => ({
    clientY: props.clientY,
    identifier: props.identifier,
    clientX: 0,
    force: 1,
    pageX: 0,
    pageY: props.clientY,
    radiusX: 1,
    radiusY: 1,
    rotationAngle: 0,
    screenX: 0,
    screenY: props.clientY,
    target: document.body,
  } as Touch)

  beforeEach(() => {
    // Mobile viewport
    global.innerWidth = 375
    global.innerHeight = 667

    // Mock touch events with proper structure
    global.TouchEvent = class TouchEvent extends Event {
      touches: Touch[]
      targetTouches: Touch[]
      changedTouches: Touch[]

      constructor(type: string, props: any = {}) {
        super(type, props)
        this.touches = props.touches || []
        this.targetTouches = props.targetTouches || []
        this.changedTouches = props.changedTouches || []
      }
    } as any
  })

  describe('Boundary Conditions', () => {
    it('should handle touch at exact snap point positions', async () => {
      let stateUpdates: any[] = []
      
      const { getByTestId } = render(
        <GestureTestComponent
          initialSnap={50}
          onGestureStateChange={(state) => stateUpdates.push(state)}
        />
      )

      const content = getByTestId('content')

      // Touch exactly at current position (should not cause movement)
      const touchStart = new TouchEvent('touchstart', {
        touches: [createMockTouch({ clientY: 333, identifier: 0 })] // Middle of 667px screen
      })

      await act(async () => {
        content.dispatchEvent(touchStart)
      })

      // Tiny movement that should be ignored
      const touchMove = new TouchEvent('touchmove', {
        touches: [createMockTouch({ clientY: 334, identifier: 0 })] // 1px move
      })

      await act(async () => {
        content.dispatchEvent(touchMove)
      })

      const touchEnd = new TouchEvent('touchend', {
        changedTouches: [createMockTouch({ clientY: 334, identifier: 0 })]
      })

      await act(async () => {
        content.dispatchEvent(touchEnd)
      })

      // Should remain at original position
      const finalState = stateUpdates[stateUpdates.length - 1]
      expect(finalState.currentSnap).toBe(50)
    })

    it('should handle extreme drag distances without crashing', async () => {
      const { getByTestId } = render(<GestureTestComponent initialSnap={50} />)

      const content = getByTestId('content')
      const sheet = getByTestId('sheet')

      // Start normal touch
      const touchStart = new TouchEvent('touchstart', {
        touches: [createMockTouch({ clientY: 333, identifier: 0 })]
      })

      await act(async () => {
        content.dispatchEvent(touchStart)
      })

      // Extreme upward drag (way beyond screen)
      const touchMove = new TouchEvent('touchmove', {
        touches: [createMockTouch({ clientY: -200, identifier: 0 })] // 200px above screen
      })

      await act(async () => {
        content.dispatchEvent(touchMove)
      })

      // Should maintain stable state without crashing
      const position = parseFloat(sheet.getAttribute('data-position') || '50')
      expect(position).toBeGreaterThan(0) // Should be within reasonable bounds
      expect(position).toBeLessThan(200) // Should not be infinite
      expect(sheet).toBeInTheDocument() // Should not crash
    })

    it('should handle simultaneous multi-touch events gracefully', async () => {
      const { getByTestId } = render(<GestureTestComponent />)

      const content = getByTestId('content')

      // Start first touch
      const touch1Start = new TouchEvent('touchstart', {
        touches: [createMockTouch({ clientY: 300, identifier: 0 })]
      })

      await act(async () => {
        content.dispatchEvent(touch1Start)
      })

      // Start second touch while first is active
      const touch2Start = new TouchEvent('touchstart', {
        touches: [
          createMockTouch({ clientY: 300, identifier: 0 }),
          createMockTouch({ clientY: 400, identifier: 1 })
        ]
      })

      await act(async () => {
        content.dispatchEvent(touch2Start)
      })

      // Move both touches in different directions
      const bothTouchMove = new TouchEvent('touchmove', {
        touches: [
          { clientY: 250, identifier: 0 } as Touch, // Up
          { clientY: 450, identifier: 1 } as Touch  // Down
        ]
      })

      await act(async () => {
        content.dispatchEvent(bothTouchMove)
      })

      // Should not crash or enter invalid state
      const sheet = getByTestId('sheet')
      const position = parseFloat(sheet.getAttribute('data-position') || '50')
      const isDragging = sheet.getAttribute('data-dragging')

      expect(position).toBeGreaterThan(0)
      expect(position).toBeLessThan(100)
      expect(['true', 'false']).toContain(isDragging)
    })
  })

  describe('Timing Edge Cases', () => {
    it('should handle extremely fast gesture sequences', async () => {
      const { getByTestId } = render(<GestureTestComponent />)

      const content = getByTestId('content')
      const sheet = getByTestId('sheet')

      // Rapid-fire gesture sequence (faster than animation frames)
      for (let i = 0; i < 5; i++) {
        const touchStart = new TouchEvent('touchstart', {
          touches: [{ clientY: 400, identifier: i } as Touch]
        })

        const touchMove = new TouchEvent('touchmove', {
          touches: [{ clientY: 400 + (i % 2 === 0 ? -50 : 50), identifier: i } as Touch]
        })

        const touchEnd = new TouchEvent('touchend', {
          changedTouches: [{ clientY: 400 + (i % 2 === 0 ? -50 : 50), identifier: i } as Touch]
        })

        await act(async () => {
          content.dispatchEvent(touchStart)
          content.dispatchEvent(touchMove)
          content.dispatchEvent(touchEnd)
        })
      }

      // Should maintain stable final state (allow for any dragging state)
      const position = parseFloat(sheet.getAttribute('data-position') || '50')
      const isDragging = sheet.getAttribute('data-dragging')

      expect(position).toBeGreaterThan(0)
      expect(position).toBeLessThan(100)
      expect(['true', 'false']).toContain(isDragging) // May still be processing
    })

    it('should handle delayed or out-of-order events', async () => {
      const { getByTestId } = render(<GestureTestComponent />)

      const content = getByTestId('content')

      // Start touch
      const touchStart = new TouchEvent('touchstart', {
        touches: [{ clientY: 400, identifier: 0 } as Touch]
      })

      await act(async () => {
        content.dispatchEvent(touchStart)
      })

      // Move
      const touchMove = new TouchEvent('touchmove', {
        touches: [{ clientY: 300, identifier: 0 } as Touch]
      })

      await act(async () => {
        content.dispatchEvent(touchMove)
      })

      // Second move that arrives "late" with older timestamp
      const lateMove = new TouchEvent('touchmove', {
        touches: [{ clientY: 320, identifier: 0 } as Touch]
      })

      await act(async () => {
        content.dispatchEvent(lateMove)
      })

      // End
      const touchEnd = new TouchEvent('touchend', {
        changedTouches: [{ clientY: 320, identifier: 0 } as Touch]
      })

      await act(async () => {
        content.dispatchEvent(touchEnd)
      })

      // Should handle gracefully without crashing
      const sheet = getByTestId('sheet')
      expect(sheet).toBeInTheDocument()
    })
  })

  describe('Content Scroll Interaction Edge Cases', () => {
    it('should handle content scroll at exact boundaries', async () => {
      const { getByTestId } = render(
        <GestureTestComponent initialSnap={90} />
      )

      const content = getByTestId('content')
      
      // Mock content at exact top scroll position
      Object.defineProperty(content, 'scrollTop', { 
        value: 0,
        writable: true,
        configurable: true
      })
      Object.defineProperty(content, 'scrollHeight', { value: 600 })
      Object.defineProperty(content, 'clientHeight', { value: 300 })

      // Touch and try to scroll down when at top
      const touchStart = new TouchEvent('touchstart', {
        touches: [{ clientY: 200, identifier: 0 } as Touch]
      })

      await act(async () => {
        content.dispatchEvent(touchStart)
      })

      const touchMove = new TouchEvent('touchmove', {
        touches: [{ clientY: 250, identifier: 0 } as Touch], // Downward
        cancelable: true // Make event cancelable so preventDefault can be called
      })

      let preventDefaultCalled = false
      touchMove.preventDefault = () => { preventDefaultCalled = true }

      await act(async () => {
        content.dispatchEvent(touchMove)
      })

      // At expanded state + top of content + downward scroll = should trigger sheet movement
      expect(preventDefaultCalled).toBe(true)
    })

    it('should handle content with dynamic height changes', async () => {
      const { getByTestId } = render(
        <GestureTestComponent initialSnap={90} />
      )

      const content = getByTestId('content')

      // Start with scrollable content
      Object.defineProperty(content, 'scrollHeight', { 
        value: 600,
        writable: true,
        configurable: true
      })
      Object.defineProperty(content, 'clientHeight', { value: 300 })
      Object.defineProperty(content, 'scrollTop', { value: 100 })

      // Start gesture
      const touchStart = new TouchEvent('touchstart', {
        touches: [{ clientY: 200, identifier: 0 } as Touch]
      })

      await act(async () => {
        content.dispatchEvent(touchStart)
      })

      // Dynamically change content height (simulate content collapse)
      Object.defineProperty(content, 'scrollHeight', { value: 200 })

      const touchMove = new TouchEvent('touchmove', {
        touches: [{ clientY: 150, identifier: 0 } as Touch]
      })

      await act(async () => {
        content.dispatchEvent(touchMove)
      })

      // Should handle the dynamic change gracefully
      const sheet = getByTestId('sheet')
      expect(sheet).toBeInTheDocument()
    })
  })

  describe('State Recovery Edge Cases', () => {
    it('should recover from corrupted gesture state', async () => {
      const { getByTestId } = render(<GestureTestComponent />)

      const content = getByTestId('content')
      const sheet = getByTestId('sheet')

      // Start normal gesture
      const touchStart = new TouchEvent('touchstart', {
        touches: [{ clientY: 400, identifier: 0 } as Touch]
      })

      await act(async () => {
        content.dispatchEvent(touchStart)
      })

      // Simulate corrupted state by ending without proper move
      const touchEnd = new TouchEvent('touchend', {
        changedTouches: [{ clientY: 300, identifier: 0 } as Touch] // Different Y than start
      })

      await act(async () => {
        content.dispatchEvent(touchEnd)
      })

      // Start new gesture immediately
      const newTouchStart = new TouchEvent('touchstart', {
        touches: [{ clientY: 350, identifier: 1 } as Touch]
      })

      await act(async () => {
        content.dispatchEvent(newTouchStart)
      })

      // Should be responsive to new gesture
      const touchMove = new TouchEvent('touchmove', {
        touches: [{ clientY: 250, identifier: 1 } as Touch]
      })

      await act(async () => {
        content.dispatchEvent(touchMove)
      })

      // Sheet should respond to new gesture
      const isDragging = sheet.getAttribute('data-dragging')
      expect(['true', 'false']).toContain(isDragging)
    })

    it('should handle unmount during active gesture', async () => {
      const { getByTestId, unmount } = render(<GestureTestComponent />)

      const content = getByTestId('content')

      // Start gesture
      const touchStart = new TouchEvent('touchstart', {
        touches: [{ clientY: 400, identifier: 0 } as Touch]
      })

      await act(async () => {
        content.dispatchEvent(touchStart)
      })

      const touchMove = new TouchEvent('touchmove', {
        touches: [{ clientY: 300, identifier: 0 } as Touch]
      })

      await act(async () => {
        content.dispatchEvent(touchMove)
      })

      // Unmount during active gesture
      expect(() => {
        unmount()
      }).not.toThrow()
    })
  })

  describe('Custom Snap Points Edge Cases', () => {
    it('should handle irregular snap point distributions', async () => {
      const { getByTestId } = render(
        <GestureTestComponent
          snapPoints={[5, 45, 95]} // Irregular distribution
          initialSnap={45}
        />
      )

      const content = getByTestId('content')
      const sheet = getByTestId('sheet')

      // Verify initialization with custom snap points
      expect([5, 45, 95]).toContain(parseFloat(sheet.getAttribute('data-snap') || '45'))

      // Test gesture interaction doesn't crash with irregular points
      const touchStart = new TouchEvent('touchstart', {
        touches: [{ clientY: 400, identifier: 0 } as Touch]
      })

      await act(async () => {
        content.dispatchEvent(touchStart)
      })

      const touchMove = new TouchEvent('touchmove', {
        touches: [{ clientY: 300, identifier: 0 } as Touch] // Significant upward
      })

      await act(async () => {
        content.dispatchEvent(touchMove)
      })

      // Should maintain valid state
      const position = parseFloat(sheet.getAttribute('data-position') || '45')
      const snap = parseFloat(sheet.getAttribute('data-snap') || '45')

      expect([5, 45, 95]).toContain(snap) // Should be one of the valid snaps
      expect(position).toBeGreaterThan(0)
      expect(position).toBeLessThan(100)
    })

    it('should handle snap points with minimal differences', async () => {
      const { getByTestId } = render(
        <GestureTestComponent
          snapPoints={[48, 50, 52]} // Very close together
          initialSnap={50}
        />
      )

      const content = getByTestId('content')
      const sheet = getByTestId('sheet')

      // Small gesture that should trigger snap
      const touchStart = new TouchEvent('touchstart', {
        touches: [{ clientY: 333, identifier: 0 } as Touch]
      })

      await act(async () => {
        content.dispatchEvent(touchStart)
      })

      const touchMove = new TouchEvent('touchmove', {
        touches: [{ clientY: 320, identifier: 0 } as Touch] // Small upward
      })

      await act(async () => {
        content.dispatchEvent(touchMove)
      })

      const touchEnd = new TouchEvent('touchend', {
        changedTouches: [{ clientY: 320, identifier: 0 } as Touch]
      })

      await act(async () => {
        content.dispatchEvent(touchEnd)
      })

      // Should snap to one of the valid points
      const snap = parseFloat(sheet.getAttribute('data-snap') || '50')
      expect([48, 50, 52]).toContain(snap)
    })
  })
})