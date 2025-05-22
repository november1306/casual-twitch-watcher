import { FullConfig } from '@playwright/test';

/**
 * Global Teardown for Stealth Browser Testing
 * Runs once after all tests complete
 */
async function globalTeardown(config: FullConfig) {
  console.log('🧹 Cleaning up test environment...');

  // Any global cleanup can go here
  // For now, just log completion

  console.log('✅ Test cleanup completed');
  console.log('📊 Check test-results/html-report/index.html for detailed results');
}

export default globalTeardown;