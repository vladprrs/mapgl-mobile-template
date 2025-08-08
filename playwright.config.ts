import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
// NOTE: E2E tests are currently removed. Keep this config as a template.
// When reintroducing E2E tests, update projects, baseURL, and server settings
// per docs/e2e-testing-strategy.md.
export default defineConfig({
  testDir: './__tests__/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video on failure */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers and mobile viewports */
  projects: [
    /* Mobile Viewports - Primary Testing Focus */
    {
      name: 'Mobile iPhone SE',
      use: {
        ...devices['iPhone SE'],
        hasTouch: true,
        isMobile: true,
        viewport: { width: 375, height: 667 },
      },
    },
    {
      name: 'Mobile iPhone 12',
      use: {
        ...devices['iPhone 12'],
        hasTouch: true,
        isMobile: true,
        viewport: { width: 390, height: 844 },
      },
    },
    {
      name: 'Mobile iPhone 14 Pro Max',
      use: {
        ...devices['iPhone 14 Pro Max'],
        hasTouch: true,
        isMobile: true,
        viewport: { width: 430, height: 932 },
      },
    },
    {
      name: 'Mobile Pixel 5',
      use: {
        ...devices['Pixel 5'],
        hasTouch: true,
        isMobile: true,
        viewport: { width: 393, height: 851 },
      },
    },
    {
      name: 'Mobile Galaxy S21',
      use: {
        hasTouch: true,
        isMobile: true,
        viewport: { width: 384, height: 854 },
        userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-G991B) AppleWebKit/537.36',
      },
    },
    /* Tablet Viewports */
    {
      name: 'iPad Mini',
      use: {
        ...devices['iPad Mini'],
        hasTouch: true,
        isMobile: true,
      },
    },
    {
      name: 'iPad Pro',
      use: {
        ...devices['iPad Pro'],
        hasTouch: true,
        isMobile: true,
      },
    },
    /* Desktop for comparison */
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})