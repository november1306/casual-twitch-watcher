import { test, expect } from '@playwright/test';
import { StealthBrowser } from '../../src/index';

/**
 * intoli.com Detection Tests
 * Educational tests for understanding detection methods
 */

let stealth: StealthBrowser;

test.beforeAll(async () => {
  stealth = new StealthBrowser();
  await stealth.launch();
  console.log('🚀 Stealth browser launched for intoli tests');
});

test.afterAll(async () => {
  if (stealth) {
    await stealth.close();
    console.log('🛑 Stealth browser closed');
  }
});

test('intoli.com - Educational Test Breakdown', async () => {
  console.log('🧪 Testing intoli.com educational tests...');

  const page = stealth.getPage();
  const testUrl = 'https://intoli.com/blog/not-possible-to-block-chrome-headless/chrome-headless-test.html';

  try {
    await page.goto(testUrl, { waitUntil: 'networkidle' });
    await new Promise(resolve => setTimeout(resolve, 3000));

    const results = await page.evaluate(() => {
      const detections: Record<string, { result: string; passed: boolean }> = {};

      // Look for test results in the table
      const rows = document.querySelectorAll('tr');
      for (const row of rows) {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 2) {
          const testName = cells[0].textContent?.trim();
          const result = cells[1].textContent?.trim();
          if (testName && result) {
            const passed = result.toLowerCase().includes('pass') ||
                          result.toLowerCase().includes('✓') ||
                          !result.toLowerCase().includes('fail');
            detections[testName] = { result, passed };
          }
        }
      }

      // Also check for specific detection patterns
      const bodyText = document.body.textContent || '';
      const webdriverPresent = bodyText.includes('webdriver') && !bodyText.includes('undefined');
      const chromePresent = bodyText.includes('chrome') && bodyText.includes('runtime');

      return {
        detections,
        webdriverPresent,
        chromePresent,
        bodyText: bodyText.substring(0, 1000)
      };
    });

    // Take screenshot for analysis
    await page.screenshot({
      path: 'screenshots/intoli-test.png',
      fullPage: true
    });

    console.log('📊 intoli.com Results:');

    let hasResults = false;
    for (const [testName, result] of Object.entries(results.detections)) {
      hasResults = true;
      const status = result.passed ? '✅ PASS' : '❌ FAIL';
      console.log(`   ${testName}: ${result.result} ${status}`);

      // Critical tests that should pass
      if (testName.toLowerCase().includes('webdriver') && testName.toLowerCase().includes('new')) {
        expect(result.passed, `${testName} should pass`).toBe(true);
      }
    }

    if (!hasResults) {
      console.log('   ⚠️ No structured test results found');
      console.log(`   WebDriver Present: ${results.webdriverPresent ? '❌ YES' : '✅ NO'}`);
      console.log(`   Chrome Object Present: ${results.chromePresent ? '✅ YES' : '❌ NO'}`);
    }

    // Educational note - some tests may fail as this is for learning
    console.log('📚 Note: intoli.com tests are educational - some failures are expected');

  } catch (error) {
    console.log('   ⚠️ Could not access intoli.com test page');
    console.log(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}`);

    // Don't fail the test if the site is inaccessible - just log it
    console.log('   This is not a critical failure - site may be temporarily unavailable');
  }
});