import { defineConfig } from '@playwright/test';

/**
 * Playwright Test Configuration for Stealth Browser Testing
 * Uses our custom StealthBrowser with Patchright instead of default Playwright browsers
 */
export default defineConfig({
  // Test directory
  testDir: './tests',

  // Test files pattern
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],

  // Global timeout for tests (longer for stealth testing)
  timeout: 20000,

  // Expect timeout
  expect: {
    timeout: 5000,
  },

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // No retries for stealth testing (to avoid detection patterns)
  retries: 0,

  // Single worker to avoid detection issues and resource conflicts
  workers: 1,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list'], // Console output
  ],

  // Output directory
  outputDir: 'test-results/artifacts',

  // Global setup/teardown
  globalSetup: './tests/global-setup.ts',
  globalTeardown: './tests/global-teardown.ts',

  // Test configuration
  use: {
    // Don't use Playwright's built-in browsers - we use our StealthBrowser
    // Set to null to prevent Playwright from launching its own browser
    // @ts-ignore
    browser: null,

    // Screenshot settings
    screenshot: 'only-on-failure',

    // Video settings
    video: 'retain-on-failure',

    // Trace settings
    trace: 'retain-on-failure',
  },

  // We don't define projects since we're using our custom StealthBrowser
  // instead of Playwright's built-in browser management
});