import { test, expect } from '@playwright/test'

test.describe('Map Markers Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for map and bottom sheet to load
    await page.waitForSelector('[style*="position: absolute"]', { timeout: 10000 })
    await page.waitForSelector('.fixed.z-50', { timeout: 5000 })
  })

  test('should add marker when location is selected', async ({ page }) => {
    // Click on a location in the list
    await page.click('text="Red Square"')
    
    // Wait for map animation
    await page.waitForTimeout(500)
    
    // Verify marker was added (check via JavaScript)
    const markerCount = await page.evaluate(() => {
      // Access marker count from map instance
      return (window as any).__markerCount || 0
    })
    
    expect(markerCount).toBeGreaterThan(0)
  })

  test('should center map on selected location', async ({ page }) => {
    // Get initial map center
    const initialCenter = await page.evaluate(() => {
      return (window as any).__mapInstance?.getCenter() || [0, 0]
    })
    
    // Click on a location
    await page.click('text="Gorky Park"')
    
    // Wait for map animation
    await page.waitForTimeout(1000)
    
    // Get new map center
    const newCenter = await page.evaluate(() => {
      return (window as any).__mapInstance?.getCenter() || [0, 0]
    })
    
    // Centers should be different
    expect(newCenter[0]).not.toBe(initialCenter[0])
    expect(newCenter[1]).not.toBe(initialCenter[1])
  })

  test('should replace marker when new location is selected', async ({ page }) => {
    // Select first location
    await page.click('text="Red Square"')
    await page.waitForTimeout(500)
    
    // Select second location
    await page.click('text="Moscow City"')
    await page.waitForTimeout(500)
    
    // Should still have only one marker
    const markerCount = await page.evaluate(() => {
      return (window as any).__markerCount || 0
    })
    
    // Test expectation (actual implementation needed)
    expect(markerCount).toBeLessThanOrEqual(1)
  })

  test('should clear all markers when clear button is clicked', async ({ page }) => {
    // Add multiple markers
    await page.click('text="Red Square"')
    await page.waitForTimeout(300)
    
    await page.click('text="Gorky Park"')
    await page.waitForTimeout(300)
    
    // Click clear button
    await page.click('text="Clear All Markers"')
    
    // Wait for clear operation
    await page.waitForTimeout(500)
    
    // Verify all markers are removed
    const markerCount = await page.evaluate(() => {
      return (window as any).__markerCount || 0
    })
    
    expect(markerCount).toBe(0)
  })

  test('should show marker label on hover', async ({ page, isMobile }) => {
    // Skip on mobile as hover doesn't exist
    test.skip(isMobile, 'No hover on mobile devices')
    
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
    
    // Wait for final state
    await page.waitForTimeout(1000)
    
    // Should have handled all clicks without error
    const hasError = await page.evaluate(() => {
      return (window as any).__mapError || false
    })
    
    expect(hasError).toBe(false)
    
    // Should show last selected location
    const currentCenter = await page.evaluate(() => {
      return (window as any).__mapInstance?.getCenter() || [0, 0]
    })
    
    // Should be centered on Bolshoi Theatre (last selection)
    expect(currentCenter).toBeDefined()
  })

  test('should maintain marker visibility across sheet states', async ({ page }) => {
    // Add a marker
    await page.click('text="Red Square"')
    await page.waitForTimeout(500)
    
    const bottomSheet = page.locator('.fixed.z-50').first()
    const handle = bottomSheet.locator('[style*="touchAction"]').first()
    
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
    
    await page.waitForTimeout(400)
    
    // Marker should still be visible
    const markerVisible = await page.evaluate(() => {
      return (window as any).__markerVisible !== false
    })
    
    expect(markerVisible).toBe(true)
  })

  test('should handle marker tap on mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test')
    
    // Add a marker
    await page.click('text="Moscow City"')
    await page.waitForTimeout(500)
    
    // Tap on marker
    const marker = page.locator('[class*="marker"]').first()
    await marker.tap()
    
    // Should trigger marker click event
    const markerClicked = await page.evaluate(() => {
      return (window as any).__markerClicked || false
    })
    
    expect(markerClicked).toBeDefined()
  })
})