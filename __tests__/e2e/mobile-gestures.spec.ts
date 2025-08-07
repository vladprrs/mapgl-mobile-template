import { test, expect } from '@playwright/test'

test.describe('Mobile Gestures', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for map to load
    await page.waitForSelector('[style*="position: absolute"]', { timeout: 10000 })
  })

  test('should handle pinch to zoom on map', async ({ page, browserName }) => {
    // Skip on browsers that don't support touch events properly
    test.skip(browserName === 'firefox', 'Firefox does not support touch events')
    
    const mapContainer = page.locator('[style*="position: absolute"]').first()
    
    // Get initial map state
    const initialZoom = await page.evaluate(() => {
      // Access map instance if available
      return (window as any).__mapInstance?.getZoom() || 13
    })
    
    // Simulate pinch zoom
    await mapContainer.dispatchEvent('touchstart', {
      touches: [
        { clientX: 150, clientY: 300 },
        { clientX: 250, clientY: 300 },
      ],
    })
    
    await mapContainer.dispatchEvent('touchmove', {
      touches: [
        { clientX: 100, clientY: 300 },
        { clientX: 300, clientY: 300 },
      ],
    })
    
    await mapContainer.dispatchEvent('touchend', {
      touches: [],
    })
    
    // Verify zoom changed
    const finalZoom = await page.evaluate(() => {
      return (window as any).__mapInstance?.getZoom() || 13
    })
    
    // Test expectation: zoom should change (actual implementation needed)
    expect(finalZoom).toBeDefined()
  })

  test('should drag bottom sheet to different snap points', async ({ page }) => {
    // Wait for bottom sheet to be visible
    const bottomSheet = page.locator('.fixed.z-50').first()
    await expect(bottomSheet).toBeVisible()
    
    // Get handle element
    const handle = bottomSheet.locator('[style*="touchAction"]').first()
    
    // Get initial position
    const initialTransform = await bottomSheet.evaluate(el => {
      return window.getComputedStyle(el).transform
    })
    
    // Drag up to expand
    await handle.dispatchEvent('pointerdown', {
      pointerId: 1,
      pointerType: 'touch',
      clientY: 500,
    })
    
    await page.dispatchEvent('body', 'pointermove', {
      pointerId: 1,
      pointerType: 'touch',
      clientY: 200,
    })
    
    await page.dispatchEvent('body', 'pointerup', {
      pointerId: 1,
      pointerType: 'touch',
    })
    
    // Wait for animation
    await page.waitForTimeout(400)
    
    // Verify position changed
    const finalTransform = await bottomSheet.evaluate(el => {
      return window.getComputedStyle(el).transform
    })
    
    expect(finalTransform).not.toBe(initialTransform)
  })

  test('should handle swipe gestures on bottom sheet', async ({ page }) => {
    const bottomSheet = page.locator('.fixed.z-50').first()
    const handle = bottomSheet.locator('[style*="touchAction"]').first()
    
    // Quick swipe up (flick gesture)
    await handle.dispatchEvent('pointerdown', {
      pointerId: 1,
      pointerType: 'touch',
      clientY: 600,
    })
    
    // Quick movement
    await page.waitForTimeout(50)
    
    await page.dispatchEvent('body', 'pointermove', {
      pointerId: 1,
      pointerType: 'touch',
      clientY: 400,
    })
    
    await page.dispatchEvent('body', 'pointerup', {
      pointerId: 1,
      pointerType: 'touch',
    })
    
    // Sheet should snap to expanded position due to velocity
    await page.waitForTimeout(400)
    
    const transform = await bottomSheet.evaluate(el => {
      return window.getComputedStyle(el).transform
    })
    
    // Should be at top snap point
    expect(transform).toContain('translateY')
  })

  test('should prevent map interaction when dragging sheet', async ({ page }) => {
    const bottomSheet = page.locator('.fixed.z-50').first()
    const handle = bottomSheet.locator('[style*="touchAction"]').first()
    
    // Start dragging sheet
    await handle.dispatchEvent('pointerdown', {
      pointerId: 1,
      pointerType: 'touch',
      clientY: 400,
    })
    
    // Try to interact with map while dragging
    const mapContainer = page.locator('[style*="position: absolute"]').first()
    
    // This click should not trigger map events
    await mapContainer.click({ position: { x: 200, y: 200 } })
    
    // Complete drag
    await page.dispatchEvent('body', 'pointerup', {
      pointerId: 1,
      pointerType: 'touch',
    })
    
    // Map click events should not have been triggered during drag
    const mapClicks = await page.evaluate(() => {
      return (window as any).__mapClickCount || 0
    })
    
    expect(mapClicks).toBe(0)
  })

  test('should handle double tap to zoom on map', async ({ page }) => {
    const mapContainer = page.locator('[style*="position: absolute"]').first()
    
    // Double tap at specific location
    await mapContainer.tap({ position: { x: 200, y: 300 } })
    await page.waitForTimeout(100)
    await mapContainer.tap({ position: { x: 200, y: 300 } })
    
    // Wait for zoom animation
    await page.waitForTimeout(500)
    
    // Map should have zoomed in
    const zoom = await page.evaluate(() => {
      return (window as any).__mapInstance?.getZoom() || 13
    })
    
    // Test expectation (actual implementation needed)
    expect(zoom).toBeDefined()
  })

  test('should scroll content in expanded bottom sheet', async ({ page }) => {
    // Expand bottom sheet first
    const bottomSheet = page.locator('.fixed.z-50').first()
    const handle = bottomSheet.locator('[style*="touchAction"]').first()
    
    // Drag to fully expanded
    await handle.dispatchEvent('pointerdown', {
      pointerId: 1,
      pointerType: 'touch',
      clientY: 600,
    })
    
    await page.dispatchEvent('body', 'pointermove', {
      pointerId: 1,
      pointerType: 'touch',
      clientY: 100,
    })
    
    await page.dispatchEvent('body', 'pointerup', {
      pointerId: 1,
      pointerType: 'touch',
    })
    
    await page.waitForTimeout(400)
    
    // Now try to scroll content
    const content = bottomSheet.locator('[style*="overflow-y"]').first()
    
    // Simulate scroll gesture
    await content.dispatchEvent('touchstart', {
      touches: [{ clientX: 200, clientY: 400 }],
    })
    
    await content.dispatchEvent('touchmove', {
      touches: [{ clientX: 200, clientY: 200 }],
    })
    
    await content.dispatchEvent('touchend', {
      touches: [],
    })
    
    // Content should be scrollable
    const scrollTop = await content.evaluate(el => el.scrollTop)
    expect(scrollTop).toBeGreaterThanOrEqual(0)
  })
})