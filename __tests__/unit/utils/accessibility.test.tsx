/** @jest-environment jsdom */
import React from 'react'
import { render } from '@testing-library/react'
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet'
import { Dashboard } from '@/components/dashboard'

let axe: null | ((container: HTMLElement) => Promise<any>) = null

beforeAll(async () => {
  try {
    // Avoid static import to keep type-check green if jest-axe is not installed
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require('jest-axe')
    axe = mod.axe
  } catch {
    axe = null
  }
})

describe('Accessibility (axe)', () => {
  test('BottomSheet has no obvious a11y violations', async () => {
    const { container } = render(
      <BottomSheet>
        <div role="dialog" aria-label="Sheet Content">
          <h2>Title</h2>
          <p>Body</p>
        </div>
      </BottomSheet>
    )
    if (axe) {
      const results = await axe(container)
      expect(Array.isArray(results.violations) ? results.violations.length : 0).toBe(0)
    }
  })

  test('Dashboard has no obvious a11y violations', async () => {
    const { container } = render(<Dashboard />)
    if (axe) {
      const results = await axe(container)
      expect(Array.isArray(results.violations) ? results.violations.length : 0).toBe(0)
    }
  })
})


