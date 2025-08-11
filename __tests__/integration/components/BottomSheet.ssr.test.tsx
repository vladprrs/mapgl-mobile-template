/**
 * @jest-environment node
 */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet'

describe('BottomSheet SSR', () => {
  describe('Server-side rendering', () => {
    it('should render without window or document references', () => {
      const html = renderToString(
        <BottomSheet>
          <div>Test Content</div>
        </BottomSheet>
      )
      
      expect(html).toContain('Test Content')
      expect(html).not.toContain('undefined')
    })

    it('should use CSS classes for initial positioning', () => {
      const html = renderToString(
        <BottomSheet snapPoints={[0.1, 0.5, 0.9]}>
          <div>Content</div>
        </BottomSheet>
      )
      
      // Should not contain calculated pixel values
      expect(html).not.toMatch(/translateY\(\d+\.?\d*px\)/)
      // Should use percentage or CSS class-based positioning
      expect(html).toMatch(/translate-y-|translateY\([\d.]+%\)|translateY\(100%\)/)
    })

    it('should render consistent HTML structure', () => {
      const html = renderToString(
        <BottomSheet>
          <div data-testid="content">Content</div>
        </BottomSheet>
      )
      
      expect(html).toContain('data-testid="content"')
      // Should have sheet structure
      expect(html).toContain('fixed')
      expect(html).toContain('bottom-0')
    })

    it('should not include client-specific event handlers in markup', () => {
      const html = renderToString(
        <BottomSheet>
          <div>Content</div>
        </BottomSheet>
      )
      
      // Event handlers should be attached client-side only
      expect(html).not.toContain('onPointerDown')
      expect(html).not.toContain('onPointerMove')
    })
  })
})