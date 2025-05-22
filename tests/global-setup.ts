import { FullConfig } from '@playwright/test';
import { mkdirSync } from 'fs';

/**
 * Global Setup for Stealth Browser Testing
 * Runs once before all tests
 */
async function globalSetup(config: FullConfig) {
  console.log('🔧 Setting up test environment...');

  // Create required directories
  const directories = [
    'test-results',
    'test-results/html-report',
    'test-results/artifacts',
    'screenshots'
  ];

  for (const dir of directories) {
    try {
      mkdirSync(dir, { recursive: true });
    } catch (error) {
      console.warn(`⚠️ Could not create directory ${dir}:`, error);
    }
  }

  console.log('✅ Test environment ready');
  console.log('📁 Test results will be saved to: test-results/');
  console.log('📸 Screenshots will be saved to: screenshots/');
}

export default globalSetup;