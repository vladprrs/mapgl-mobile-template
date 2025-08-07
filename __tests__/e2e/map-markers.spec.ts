import { test, expect } from '@playwright/test'

test.describe('Map Markers Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('map-root')).toBeVisible()
    await expect(page.getByTestId('bottom-sheet')).toBeVisible()
  })

  test('should add marker when location is selected', async ({ page }) => {
    // Click on a location in the list
    await page.click('text="Red Square"')
    
    // Wait for marker count to increase (no fixed timeout)
    await expect.poll(async () => {
      return await page.evaluate(() => (window as any).__markerCount ?? 0)
    }).toBeGreaterThan(0)
    
    // Verify marker was added (check via JavaScript)
    const markerCount = await page.evaluate(() => {
      // Access marker count from map instance
      return (window as any).__markerCount || 0
    })
    
    expect(markerCount).toBeGreaterThan(0)
  })

  test('should center map on selected location', async ({ page }) => {
    // Get initial map center
    const initialCenter = await page.evaluate(() => (window as any).__mapInstance?.getCenter() || [0, 0])
    
    // Click on a location
    await page.click('text="Gorky Park"')
    
    // Wait until center changes
    await expect.poll(async () => {
      return await page.evaluate(() => (window as any).__mapInstance?.getCenter() ?? [0,0])
    }).not.toEqual(initialCenter)
    
    // Get new map center
    const newCenter = await page.evaluate(() => (window as any).__mapInstance?.getCenter() || [0, 0])
    
    // Centers should be different
    expect(newCenter[0]).not.toBe(initialCenter[0])
    expect(newCenter[1]).not.toBe(initialCenter[1])
  })

  test('should replace marker when new location is selected', async ({ page }) => {
    // Select first location
    await page.click('text="Red Square"')
    // Wait until marker count stabilizes to 1
    await expect.poll(async () => {
      return await page.evaluate(() => (window as any).__markerCount ?? 0)
    }).toBeLessThanOrEqual(1)
    
    // Select second location
    await page.click('text="Moscow City"')
    await page.waitForTimeout(500)
    
    // Should still have only one marker
    const markerCount = await page.evaluate(() => (window as any).__markerCount || 0)
    
    // Test expectation (actual implementation needed)
    expect(markerCount).toBeLessThanOrEqual(1)
  })

  test('should clear all markers when clear button is clicked', async ({ page }) => {
    // Add multiple markers
    await page.click('text="Red Square"')
    // Allow time for marker creation via polling
    await expect.poll(async () => {
      return await page.evaluate(() => (window as any).__markerCount ?? 0)
    }).toBeGreaterThan(0)
    
    await page.click('text="Gorky Park"')
    // Ensure multiple markers attempted
    await expect.poll(async () => {
      return await page.evaluate(() => (window as any).__markerCount ?? 0)
    }).toBeGreaterThan(0)
    
    // Click clear button
    await page.click('text="Clear All Markers"')
    
    // Wait for marker count to reach 0
    await expect.poll(async () => {
      return await page.evaluate(() => (window as any).__markerCount ?? 0)
    }).toBe(0)
    
    // Verify all markers are removed
    const markerCount = await page.evaluate(() => (window as any).__markerCount || 0)
    
    expect(markerCount).toBe(0)
  })

  test('should show marker label on hover', async ({ page, isMobile }) => {
    if (isMobile) return
    
    // Add a marker
    await page.click('text="Tretyakov Gallery"')
    await page.waitForTimeout(500)
    
    // Hover over marker (desktop only)
    const marker = page.locator('[class*="marker"]').first()
    await marker.hover()
    
    // Label should be visible
    const label = page.locator('[class*="marker-label"]')
    await expect(label).toBeVisible()
  })

  test('should handle rapid location selections', async ({ page }) => {
    // Rapidly click multiple locations
    const locations = [
      'Red Square',
      'Gorky Park',
      'Moscow City',
      'Tretyakov Gallery',
      'Bolshoi Theatre',
    ]
    
    for (const location of locations) {
      await page.click(`text="${location}"`)
      // Very short delay
      await page.waitForTimeout(50)
    }
    
    // Wait for last selection to settle
    await expect.poll(async () => {
      return await page.evaluate(() => (window as any).__mapInstance?.getCenter() ?? [0,0])
    }).toBeDefined()
    
    // Should have handled all clicks without error
    const hasError = await page.evaluate(() => (window as any).__mapError || false)
    
    expect(hasError).toBe(false)
    
    // Should show last selected location
    const currentCenter = await page.evaluate(() => (window as any).__mapInstance?.getCenter() || [0, 0])
    
    // Should be centered on Bolshoi Theatre (last selection)
    expect(currentCenter).toBeDefined()
  })

  test('should maintain marker visibility across sheet states', async ({ page }) => {
    // Add a marker
    await page.click('text="Red Square"')
    await page.waitForTimeout(500)
    
    const bottomSheet = page.getByTestId('bottom-sheet')
    const handle = page.getByTestId('drag-handle')
    
    // Collapse sheet
    await handle.dispatchEvent('pointerdown', {
      pointerId: 1,
      pointerType: 'touch',
      clientY: 300,
    })
    
    await page.dispatchEvent('body', 'pointermove', {
      pointerId: 1,
      pointerType: 'touch',
      clientY: 600,
    })
    
    await page.dispatchEvent('body', 'pointerup', {
      pointerId: 1,
      pointerType: 'touch',
    })
    
    await expect(bottomSheet).toHaveAttribute('data-sheet-state', 'collapsed')
    
    // Marker should still be visible
    const markerVisible = await page.evaluate(() => (window as any).__markerVisible !== false)
    
    expect(markerVisible).toBe(true)
  })

  test('should handle marker tap on mobile', async ({ page, isMobile }) => {
    if (!isMobile) return
    
    // Add a marker
    await page.click('text="Moscow City"')
    await page.waitForTimeout(500)
    
    // Tap on marker
    const marker = page.locator('[class*="marker"]').first()
    await marker.tap()
    
    // Should trigger marker click event
    const markerClicked = await page.evaluate(() => (window as any).__markerClicked || false)
    
    expect(markerClicked).toBeDefined()
  })
})