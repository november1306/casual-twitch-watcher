import { test, expect } from '@playwright/test';
import { StealthBrowser } from '../../src/index';

/**
 * bot.incolumitas.com Detection Tests
 * Tests advanced behavioral analysis and machine learning detection
 */

let stealth: StealthBrowser;

test.beforeAll(async () => {
  stealth = new StealthBrowser();
  await stealth.launch();
  console.log('🚀 Stealth browser launched for incolumitas tests');
});

test.afterAll(async () => {
  if (stealth) {
    await stealth.close();
    console.log('🛑 Stealth browser closed');
  }
});

test('bot.incolumitas.com - Advanced Behavioral Analysis', async () => {
  console.log('🧪 Testing bot.incolumitas.com...');

  const page = stealth.getPage();
  await page.goto('https://bot.incolumitas.com/', { waitUntil: 'networkidle' });

  // Wait for all detection tests to complete
  await new Promise(resolve => setTimeout(resolve, 8000));

  const results = await page.evaluate(() => {
    const bodyText = document.body.textContent || '';

    // Look for behavioral score
    const scoreMatch = bodyText.match(/Your Behavioral Score:\s*([\d.]+)/);
    const behavioralScore = scoreMatch ? parseFloat(scoreMatch[1]) : null;

    // Look for classification result
    const classificationMatch = bodyText.match(/Classification:\s*([^\n]+)/);
    const classification = classificationMatch ? classificationMatch[1].trim() : null;

    // Extract detection results from tables
    const detections: Record<string, string> = {};
    const rows = document.querySelectorAll('tr');

    for (const row of rows) {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 2) {
        const key = cells[0].textContent?.trim();
        const value = cells[1].textContent?.trim();
        if (key && value) {
          detections[key] = value;
        }
      }
    }

    // Look for specific detection indicators
    const webdriverDetected = detections['WebDriver'] === 'true' ||
                            bodyText.toLowerCase().includes('webdriver detected');
    const cdpDetected = detections['CDP'] === 'true' ||
                       bodyText.toLowerCase().includes('cdp detected');
    const headlessDetected = detections['Headless Chrome'] === 'true' ||
                           bodyText.toLowerCase().includes('headless detected');

    return {
      behavioralScore,
      classification,
      detections,
      webdriverDetected,
      cdpDetected,
      headlessDetected,
      bodyText: bodyText.substring(0, 1500) // More text for analysis
    };
  });

  // Take screenshot for analysis
  await page.screenshot({
    path: 'screenshots/bot-incolumitas-test.png',
    fullPage: true
  });

  console.log('📊 bot.incolumitas.com Results:');

  // Behavioral Score Analysis
  if (results.behavioralScore !== null) {
    const scoreStatus = results.behavioralScore < 0.5 ? '🔴 BOT' : '🟢 HUMAN-LIKE';
    console.log(`   Behavioral Score: ${results.behavioralScore} (${scoreStatus})`);

    // Behavioral score should indicate human-like behavior
    expect(results.behavioralScore, 'Behavioral score should be human-like (>= 0.5)').toBeGreaterThanOrEqual(0.5);
  }

  // Classification Result
  if (results.classification) {
    console.log(`   Classification: ${results.classification}`);
  }

  // Core Detection Tests
  console.log('🔍 Core detection results:');
  console.log(`   WebDriver Detected: ${results.webdriverDetected ? '❌ YES' : '✅ NO'}`);
  console.log(`   CDP Detected: ${results.cdpDetected ? '❌ YES' : '✅ NO'}`);
  console.log(`   Headless Detected: ${results.headlessDetected ? '❌ YES' : '✅ NO'}`);

  // Critical assertions
  expect(results.webdriverDetected, 'WebDriver should not be detected').toBe(false);
  expect(results.cdpDetected, 'CDP should not be detected').toBe(false);

  // Log detailed detection results
  const keyTests = ['WebDriver', 'CDP', 'Navigator', 'Headless Chrome', 'Plugins', 'Languages'];
  console.log('📋 Detailed results:');
  for (const test of keyTests) {
    if (results.detections[test]) {
      console.log(`   ${test}: ${results.detections[test]}`);
    }
  }
});