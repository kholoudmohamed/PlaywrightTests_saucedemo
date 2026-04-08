import { defineConfig, devices } from '@playwright/test';
/**
 * Playwright config is evaluated in Node. Declare process to satisfy TS checks in this workspace.
 */
declare const process: { env: Record<string, string | undefined> };
const isCI = typeof process !== 'undefined' ? Boolean(process.env.CI) : false;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: [['html', { open: isCI ? 'never' : 'on-failure' }]],
  timeout: 120_000,
  expect: { timeout: 12_000 },
  use: {
    baseURL: 'https://sauce-demo.myshopify.com',
    viewport: { width: 1280, height: 800 },
    actionTimeout: 10_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Configure project for Chromium only */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});
