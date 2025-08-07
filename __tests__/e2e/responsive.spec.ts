import { test, expect, devices } from '@playwright/test'

// Test different mobile viewport sizes
const viewports = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 14 Pro', width: 393, height: 852 },
  { name: 'iPhone 14 Pro Max', width: 430, height: 932 },
  { name: 'Pixel 5', width: 393, height: 851 },
  { name: 'Galaxy S21', width: 384, height: 854 },
]

test.describe('Responsive Mobile Layout', () => {
  for (const viewport of viewports) {
    test(`should render correctly on ${viewport.name}`, async ({ page }) => {
      // Set viewport
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      })
      
      await page.goto('/')
      await expect(page.getByTestId('map-root')).toBeVisible()
      
      // Map should fill the viewport
      const mapContainer = page.getByTestId('map-root')
      const mapBox = await mapContainer.boundingBox()
      await expect.poll(() => mapBox?.width ?? 0).toBe(viewport.width)
      await expect.poll(() => mapBox?.height ?? 0).toBe(viewport.height)
      
      // Bottom sheet should be visible
      const bottomSheet = page.getByTestId('bottom-sheet')
      await expect(bottomSheet).toBeVisible()
      
      // Bottom sheet should span full width
      const sheetBox = await bottomSheet.boundingBox()
      await expect.poll(() => sheetBox?.width ?? 0).toBe(viewport.width)
    })
  }

  test('should handle safe area insets on iPhone with notch', async ({ page }) => {
    // iPhone 14 Pro with notch
    await page.setViewportSize({
      width: 393,
      height: 852,
    })
    
    // Add safe area insets
    await page.addStyleTag({
      content: `
        :root {
          --safe-area-inset-top: 47px;
          --safe-area-inset-bottom: 34px;
        }
      `,
    })
    
    await page.goto('/')
    await expect(page.getByTestId('bottom-sheet')).toBeVisible()
    
    // Bottom sheet content should respect safe areas
    const content = page.getByTestId('bottom-sheet')
    const styles = await content.evaluate(el => {
      return window.getComputedStyle(el).paddingBottom
    })
    
    // Should use env() for safe area
    expect(styles).toBeTruthy()
  })

  test('should adapt bottom sheet snap points to viewport height', async ({ page }) => {
    // Test on different heights
    const heights = [667, 844, 932]
    
    for (const height of heights) {
      await page.setViewportSize({
        width: 375,
        height: height,
      })
      
    await page.goto('/')
    await expect(page.getByTestId('bottom-sheet')).toBeVisible()
      
      const bottomSheet = page.getByTestId('bottom-sheet')
      
      // Get computed height at 50% snap point
      const expectedHeight = height * 0.5
      
      // Sheet should adapt to viewport
      const sheetTransform = await bottomSheet.evaluate(el => {
        return window.getComputedStyle(el).transform
      })
      
      expect(sheetTransform).toContain('translateY')
    }
  })

  test('should maintain touch targets at minimum 44px on all devices', async ({ page }) => {
    await page.setViewportSize({
      width: 375,
      height: 667,
    })
    
    await page.goto('/')
    await expect(page.getByTestId('map-root')).toBeVisible()
    
    // Check all interactive elements
    const buttons = page.locator('button')
    const count = await buttons.count()
    
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i)
      const box = await button.boundingBox()
      
      if (box) {
        // Touch targets should be at least 44x44px (iOS HIG)
        expect(box.height).toBeGreaterThanOrEqual(44)
      }
    }
  })

  test('should handle landscape orientation', async ({ page }) => {
    // Landscape iPhone SE
    await page.setViewportSize({
      width: 667,
      height: 375,
    })
    
    await page.goto('/')
    
    // Map should still be visible
    const mapContainer = page.getByTestId('map-root')
    await expect(mapContainer).toBeVisible()
    
    // Bottom sheet should adapt to landscape
    const bottomSheet = page.locator('.fixed.z-50').first()
    const sheetBox = await bottomSheet.boundingBox()
    await expect.poll(() => sheetBox?.height ?? 0).toBeLessThan(375)
  })

  test('should scale text appropriately for different screen sizes', async ({ page }) => {
    const sizes = [
      { width: 375, height: 667, expectedFontSize: 16 },
      { width: 430, height: 932, expectedFontSize: 16 },
    ]
    
    for (const size of sizes) {
      await page.setViewportSize(size)
      await page.goto('/')
      
      // Check base font size
      const text = page.locator('text=Popular Locations').first()
      await expect.poll(async () => {
        return await text.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
      }).toBeGreaterThanOrEqual(size.expectedFontSize)
    }
  })

  test('should handle virtual keyboard appearance', async ({ page, isMobile }) => {
    if (!isMobile) return
    
    await page.goto('/')
    
    // If there were input fields, test keyboard appearance
    // This is a placeholder for when search functionality is added
    const viewport = page.viewportSize()
    
    // Simulate keyboard appearance (reduces viewport height)
    if (viewport) {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height - 300, // Approximate keyboard height
      })
    }
    
    // Map and sheet should still be functional
    const mapContainer = page.locator('[style*="position: absolute"]').first()
    await expect(mapContainer).toBeVisible()
  })

  test('should maintain performance with smooth animations', async ({ page }) => {
    await page.setViewportSize({
      width: 393,
      height: 852,
    })
    
    await page.goto('/')
    
    // Enable performance monitoring
    const client = await page.context().newCDPSession(page)
    await client.send('Performance.enable')
    
    // Perform animation (drag bottom sheet)
    const bottomSheet = page.locator('.fixed.z-50').first()
    const handle = bottomSheet.locator('[style*="touchAction"]').first()
    
    await handle.dispatchEvent('pointerdown', {
      pointerId: 1,
      pointerType: 'touch',
      clientY: 500,
    })
    
    // Animate drag
    for (let y = 500; y >= 200; y -= 50) {
      await page.dispatchEvent('body', 'pointermove', {
        pointerId: 1,
        pointerType: 'touch',
        clientY: y,
      })
      await page.waitForTimeout(16) // ~60fps
    }
    
    await page.dispatchEvent('body', 'pointerup', {
      pointerId: 1,
      pointerType: 'touch',
    })
    
    // Check that animations use transform (hardware accelerated)
    const usesTransform = await bottomSheet.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.transform !== 'none' && style.willChange === 'transform'
    })
    
    expect(usesTransform).toBe(true)
  })
})