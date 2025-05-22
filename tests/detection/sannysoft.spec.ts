import { test, expect } from '@playwright/test';
import { StealthBrowser } from '../../src/index';

/**
 * bot.sannysoft.com Detection Tests
 * Tests classic automation detection markers
 */

let stealth: StealthBrowser;

test.beforeAll(async () => {
  stealth = new StealthBrowser();
  await stealth.launch();
  console.log('🚀 Stealth browser launched for sannysoft tests');
});

test.afterAll(async () => {
  if (stealth) {
    await stealth.close();
    console.log('🛑 Stealth browser closed');
  }
});

test('bot.sannysoft.com - Classic Detection Tests', async () => {
  console.log('🧪 Testing bot.sannysoft.com...');

  const page = stealth.getPage();
  await page.goto('https://bot.sannysoft.com/', { waitUntil: 'networkidle' });

  // Wait for tests to complete
  await new Promise(resolve => setTimeout(resolve, 5000));

  const results = await page.evaluate(() => {
    const detections: Record<string, string> = {};

    // Extract from the main detection table
    const rows = document.querySelectorAll('tr');
    for (const row of rows) {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 2) {
        const key = cells[0].textContent?.trim();
        const value = cells[1].textContent?.trim();
        if (key && value && !key.includes('Test Name')) {
          detections[key] = value;
        }
      }
    }

    return detections;
  });

  // Take screenshot
  await page.screenshot({
    path: 'screenshots/bot-sannysoft-test.png',
    fullPage: true
  });

  console.log('📊 bot.sannysoft.com Results:');

  // Define critical tests that must pass
  const criticalTests = [
    'WebDriver (New)',
    'WebDriver Advanced',
    'Chrome (New)',
    'Permissions (New)'
  ];

  for (const testName of criticalTests) {
    if (results[testName]) {
      const passed = !results[testName].toLowerCase().includes('fail');
      const status = passed ? '✅' : '❌';
      console.log(`   ${testName}: ${results[testName]} ${status}`);

      // Playwright assertion
      expect(passed, `${testName} should pass`).toBe(true);
    }
  }

  // Log all other results for analysis
  console.log('📋 Additional results:');
  for (const [test, result] of Object.entries(results)) {
    if (!criticalTests.includes(test)) {
      console.log(`   ${test}: ${result}`);
    }
  }
});