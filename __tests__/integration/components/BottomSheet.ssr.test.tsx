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
        <BottomSheet snapPoints={[10, 50, 90]}>
          <div>Content</div>
        </BottomSheet>
      )
      
      // Should not contain calculated pixel values
      expect(html).not.toMatch(/translateY\(\d+\.?\d*px\)/)
      // react-modal-sheet handles positioning internally
      expect(html).toContain('data-rsbs-root')
    })

    it('should render consistent HTML structure', () => {
      const html = renderToString(
        <BottomSheet>
          <div data-testid="content">Content</div>
        </BottomSheet>
      )
      
      expect(html).toContain('data-testid="content"')
      // Should have sheet structure (react-modal-sheet uses different classes)
      expect(html).toContain('bg-white')
      expect(html).toContain('rounded-t-2xl')
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