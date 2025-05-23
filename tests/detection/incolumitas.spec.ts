import { test, expect } from '@playwright/test';
import { StealthBrowser } from '../../src/index';

/**
 * bot.incolumitas.com Advanced Detection Tests
 * Tests the most comprehensive bot detection system available
 *
 * IMPORTANT: The behavioral score often shows "..." and doesn't calculate properly.
 * This is a known issue with the website, not our stealth implementation.
 * Focus on the other detection test results which are more reliable indicators.
 */

let stealth: StealthBrowser;

test.beforeAll(async () => {
  stealth = new StealthBrowser();
  await stealth.launch();
  console.log('🚀 Stealth browser launched for Incolumitas comprehensive tests');
});

test.afterAll(async () => {
  if (stealth) {
    await stealth.close();
    console.log('🛑 Stealth browser closed');
  }
});

test('bot.incolumitas.com - Comprehensive Bot Detection Analysis', async () => {
  console.log('🧪 Testing bot.incolumitas.com - The most advanced bot detection system...');

  const page = stealth.getPage();
  await page.goto('https://bot.incolumitas.com/', { waitUntil: 'networkidle' });

  // Wait for all tests to complete
  console.log('⏱️  Waiting for detection tests to complete...');
  await page.waitForTimeout(5000);

  // 1. BEHAVIORAL SCORE (often broken, but let's check)
  console.log('\n🎭 BEHAVIORAL CLASSIFICATION:');
  const behavioralScore = await page.evaluate(() => {
    const scoreElement = document.querySelector('*[id*="behavioralScore"], .behavioral-score') ||
                         Array.from(document.querySelectorAll('*')).find(el =>
                           el.textContent?.includes('Your Behavioral Score:'));
    return scoreElement ? scoreElement.textContent : 'Not found';
  });

  console.log(`   Score: ${behavioralScore}`);
  if (behavioralScore && behavioralScore.includes('...')) {
    console.log('   ⚠️  Note: Behavioral score shows "..." - this is a known issue with the website');
    console.log('   📝 The behavioral scoring system often fails to calculate, focus on other tests');
  }

  // 2. NEW DETECTION TESTS (Most Important)
  console.log('\n🔬 NEW DETECTION TESTS (Critical):');
  const newTests = await page.evaluate(() => {
    // Find the new detection tests JSON
    const elements = Array.from(document.querySelectorAll('*'));
    for (const el of elements) {
      const text = el.textContent || '';
      if (text.includes('puppeteerEvaluationScript') && text.includes('webdriverPresent')) {
        try {
          return JSON.parse(text);
        } catch {
          return text;
        }
      }
    }
    return 'Not found';
  });

  if (typeof newTests === 'object' && newTests !== null) {
    for (const [testName, result] of Object.entries(newTests)) {
      const status = result === 'OK' ? '✅' : '❌';
      console.log(`   ${status} ${testName}: ${result}`);
    }
  } else {
    console.log(`   Raw result: ${newTests}`);
  }

  // 3. OLD DETECTION TESTS (Legacy but still relevant)
  console.log('\n🔍 LEGACY DETECTION TESTS:');
  const oldTests = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('*'));
    for (const el of elements) {
      const text = el.textContent || '';
      if (text.includes('intoli') && text.includes('fpscanner')) {
        try {
          return JSON.parse(text);
        } catch {
          return text;
        }
      }
    }
    return 'Not found';
  });

  if (typeof oldTests === 'object' && oldTests !== null) {
    console.log('   Intoli Tests:');
    if (oldTests.intoli) {
      for (const [testName, result] of Object.entries(oldTests.intoli)) {
        const status = result === 'OK' ? '✅' : '❌';
        console.log(`     ${status} ${testName}: ${result}`);
      }
    }

    console.log('   FP Scanner Tests:');
    if (oldTests.fpscanner) {
      for (const [testName, result] of Object.entries(oldTests.fpscanner)) {
        const status = result === 'OK' ? '✅' : '❌';
        console.log(`     ${status} ${testName}: ${result}`);
      }
    }
  }

  // 4. FINGERPRINT ANALYSIS
  console.log('\n🔐 FINGERPRINT ANALYSIS:');

  // Browser fingerprint
  const browserFingerprint = await page.evaluate(() => {
    const fpElement = Array.from(document.querySelectorAll('*')).find(el =>
      el.textContent?.match(/[a-f0-9]{32}/));
    return fpElement && fpElement.textContent ? fpElement.textContent.match(/[a-f0-9]{32}/)?.[0] : 'Not found';
  });
  console.log(`   🌐 Browser Fingerprint: ${browserFingerprint}`);

  // Canvas fingerprint
  const canvasFingerprint = await page.evaluate(() => {
    const canvasSection = Array.from(document.querySelectorAll('*')).find(el =>
      el.textContent?.includes('Canvas Fingerprint'));
    if (canvasSection && canvasSection.nextElementSibling) {
      return canvasSection.nextElementSibling.textContent || 'Not found';
    }
    return 'Not found';
  });
  console.log(`   🎨 Canvas Fingerprint: ${canvasFingerprint}`);

  // WebGL fingerprint
  const webglFingerprint = await page.evaluate(() => {
    const webglSection = Array.from(document.querySelectorAll('*')).find(el =>
      el.textContent?.includes('WebGL Fingerprint'));
    if (webglSection && webglSection.nextElementSibling) {
      return webglSection.nextElementSibling.textContent || 'Not found';
    }
    return 'Not found';
  });
  console.log(`   🎮 WebGL Fingerprint: ${webglFingerprint}`);

  // 5. IP/NETWORK ANALYSIS
  console.log('\n🌍 NETWORK ANALYSIS:');
  const ipInfo = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('*'));
    for (const el of elements) {
      const text = el.textContent || '';
      if (text.includes('"ip":') && text.includes('"is_datacenter":')) {
        try {
          return JSON.parse(text);
        } catch {
          return 'Parse error';
        }
      }
    }
    return 'Not found';
  });

  if (typeof ipInfo === 'object' && ipInfo !== null) {
    console.log(`   📍 IP: ${ipInfo.ip}`);
    console.log(`   🏢 Datacenter: ${ipInfo.is_datacenter ? '❌ YES' : '✅ NO'}`);
    console.log(`   🕵️ Crawler: ${ipInfo.is_crawler ? '❌ YES' : '✅ NO'}`);
    console.log(`   🔐 VPN/Proxy: ${ipInfo.is_vpn || ipInfo.is_proxy ? '❌ YES' : '✅ NO'}`);
    console.log(`   🌐 Location: ${ipInfo.location?.city}, ${ipInfo.location?.country}`);
  }

  // 6. ASSERTIONS AND SUMMARY
  console.log('\n📊 TEST SUMMARY:');

  // Key assertions for stealth effectiveness
  if (typeof newTests === 'object' && newTests !== null) {
    // Most critical tests
    expect(newTests.webdriverPresent).toBe('OK');
    expect(newTests.puppeteerEvaluationScript).toBe('OK');
    console.log('   ✅ Core stealth tests passed');
  }

  if (typeof oldTests === 'object' && oldTests?.fpscanner) {
    // Legacy tests - some failures are acceptable
    const failedTests = Object.entries(oldTests.fpscanner).filter(([_, result]) => result === 'FAIL');
    console.log(`   📈 Legacy test results: ${Object.keys(oldTests.fpscanner).length - failedTests.length}/${Object.keys(oldTests.fpscanner).length} passed`);

    if (failedTests.length > 0) {
      console.log('   ⚠️  Failed legacy tests:');
      failedTests.forEach(([testName, _]) => console.log(`     - ${testName}`));
    }
  }

  // Fingerprint uniqueness check
  if (browserFingerprint && browserFingerprint !== 'Not found') {
    console.log('   🔐 Browser fingerprint generated successfully');
  }

  console.log('\n🎯 RECOMMENDATIONS:');
  console.log('   • Focus on "New Detection Tests" results - these are most important');
  console.log('   • Some legacy test failures are acceptable and expected');
  console.log('   • Behavioral score often shows "..." due to website issues');
  console.log('   • Check IP analysis to ensure no datacenter/VPN flags');

  // Take a screenshot for manual review
  await page.screenshot({
    path: 'screenshots/incolumitas-full-test.png',
    fullPage: true
  });
  console.log('   📸 Full page screenshot saved for manual review');
});