import { defineConfig, devices } from '@playwright/test';

/**
 * Mobile-first Playwright config.
 * Uses official device descriptors (viewport, userAgent, touch, DPR)
 * to exercise Sauce Demo on Android/iOS-like browsers.
 */
export default defineConfig({
  testDir: './tests/specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: 'pixel-7',
      use: {
        ...devices['Pixel 7'],
      },
    },
    {
      name: 'pixel-7-landscape',
      use: {
        ...devices['Pixel 7 landscape'],
      },
    },
    {
      name: 'iphone-14',
      use: {
        ...devices['iPhone 14'],
      },
    },
  ],
});
