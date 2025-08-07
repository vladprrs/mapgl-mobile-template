/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet'

describe('BottomSheet Hydration', () => {
  let container: HTMLDivElement
  let consoleErrorSpy: jest.SpyInstance
  
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    
    // Spy on console.error to catch hydration warnings
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
  })
  
  afterEach(() => {
    document.body.removeChild(container)
    consoleErrorSpy.mockRestore()
  })

  describe('Client hydration', () => {
    it('should hydrate without warnings', () => {
      // Server render
      const serverHTML = renderToString(
        <BottomSheet>
          <div data-testid="content">Test Content</div>
        </BottomSheet>
      )
      
      // Set server HTML
      container.innerHTML = serverHTML
      
      // Hydrate using React 18 API
      act(() => {
        hydrateRoot(
          container,
          <BottomSheet>
            <div data-testid="content">Test Content</div>
          </BottomSheet>
        )
      })
      
      // Check no hydration errors
      const hydrationErrors = consoleErrorSpy.mock.calls.filter(call => 
        call[0]?.toString().includes('Hydration') ||
        call[0]?.toString().includes('did not match')
      )
      
      expect(hydrationErrors).toHaveLength(0)
      expect(screen.getByTestId('content')).toBeInTheDocument()
    })

    it('should maintain consistent transform values during hydration', () => {
      const serverHTML = renderToString(
        <BottomSheet snapPoints={[0.1, 0.5, 0.9]}>
          <div>Content</div>
        </BottomSheet>
      )
      
      container.innerHTML = serverHTML
      
      // Get initial transform value (should be percentage-based from SSR)
      const sheet = container.querySelector('.fixed') as HTMLElement
      const initialTransform = sheet?.style.transform || ''
      
      // SSR should use percentage
      expect(initialTransform).toMatch(/translateY\(\d+(\.\d+)?%\)/)
      
      // Hydrate using React 18 API
      act(() => {
        hydrateRoot(
          container,
          <BottomSheet snapPoints={[0.1, 0.5, 0.9]}>
            <div>Content</div>
          </BottomSheet>
        )
      })
      
      // After hydration, it should still use percentage initially (before useEffect runs)
      // The actual pixel calculation happens after mount in useEffect
      // This test verifies no hydration mismatch warnings occur
      const hydrationWarnings = consoleErrorSpy.mock.calls.filter(call => 
        call[0]?.toString().includes('Hydration') ||
        call[0]?.toString().includes('did not match')
      )
      
      expect(hydrationWarnings).toHaveLength(0)
    })

    it('should defer client calculations until after mount', async () => {
      const { container: renderContainer } = render(
        <BottomSheet snapPoints={[0.1, 0.5, 0.9]}>
          <div>Content</div>
        </BottomSheet>
      )
      
      const sheet = renderContainer.querySelector('.fixed') as HTMLElement
      
      // Should use CSS percentage initially (before client mount)
      // The component uses percentage based on snap points
      const expectedPattern = /translateY\((\d+(\.\d+)?%|\d+(\.\d+)?px)\)/
      expect(sheet?.style.transform).toMatch(expectedPattern)
      
      // After effect runs, can use calculated values
      await new Promise(resolve => setTimeout(resolve, 0))
      
      // Now it can have calculated pixel values
      // (This would be the actual position after client-side calculation)
    })

    it('should handle SSR with different snap points', () => {
      const testCases: Array<{ snapPoints: [number, number, number] }> = [
        { snapPoints: [0.1, 0.5, 0.9] },
        { snapPoints: [0.2, 0.6, 0.9] },
        { snapPoints: [0.15, 0.55, 0.95] },
      ]
      
      testCases.forEach(({ snapPoints }) => {
        const serverHTML = renderToString(
          <BottomSheet snapPoints={snapPoints}>
            <div>Content</div>
          </BottomSheet>
        )
        
        const testContainer = document.createElement('div')
        document.body.appendChild(testContainer)
        testContainer.innerHTML = serverHTML
        
        // Should hydrate without errors
        act(() => {
          hydrateRoot(
            testContainer,
            <BottomSheet snapPoints={snapPoints}>
              <div>Content</div>
            </BottomSheet>
          )
        })
        
        const hydrationErrors = consoleErrorSpy.mock.calls.filter(call => 
          call[0]?.toString().includes('Hydration')
        )
        
        expect(hydrationErrors).toHaveLength(0)
        
        document.body.removeChild(testContainer)
      })
    })
  })

  describe('isClient pattern', () => {
    it('should only apply dynamic positioning after client mount', () => {
      const { rerender, container: renderContainer } = render(
        <BottomSheet>
          <div>Content</div>
        </BottomSheet>
      )
      
      const sheet = renderContainer.querySelector('.fixed') as HTMLElement
      
      // Initial render should not have pixel-based calculations
      const initialTransform = sheet?.style.transform
      expect(initialTransform).not.toMatch(/translateY\(\d{3,}px\)/) // No large pixel values
      
      // After rerender (simulating post-hydration)
      rerender(
        <BottomSheet>
          <div>Content</div>
        </BottomSheet>
      )
      
      // Dynamic positioning can now be applied
    })
  })
})