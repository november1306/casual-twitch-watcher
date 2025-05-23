import { test, expect } from '@playwright/test';
import { StealthBrowser } from '../../src/index';

/**
 * bot.sannysoft.com Detection Tests
 * Tests classic automation detection markers including WebGL spoofing
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

  // Verify WebGL spoofing is working
  const webglInfo = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;

    if (!gl) return { error: 'WebGL not supported' };

    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    return {
      vendor: gl.getParameter(gl.VENDOR),
      renderer: gl.getParameter(gl.RENDERER),
      unmaskedVendor: ext ? gl.getParameter((ext as any).UNMASKED_VENDOR_WEBGL) : null,
      unmaskedRenderer: ext ? gl.getParameter((ext as any).UNMASKED_RENDERER_WEBGL) : null
    };
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

  // Verify WebGL spoofing
  console.log('🎭 WebGL Spoofing Verification:');
  if ('error' in webglInfo) {
    console.log(`   ❌ ${webglInfo.error}`);
  } else {
    console.log(`   Vendor: ${webglInfo.vendor} ✅`);
    console.log(`   Renderer: ${webglInfo.renderer} ✅`);
    console.log(`   Unmasked Vendor: ${webglInfo.unmaskedVendor} ✅`);
    console.log(`   Unmasked Renderer: ${webglInfo.unmaskedRenderer} ✅`);

    // Verify spoofed values are being returned
    expect(webglInfo.vendor).toBe('WebKit');
    expect(webglInfo.renderer).toBe('WebKit WebGL');
    expect(webglInfo.unmaskedVendor).toBeTruthy();
    expect(webglInfo.unmaskedRenderer).toBeTruthy();

    // The important verification: check what Sannysoft actually sees
    const webglVendorFromPage = results['WebGL Vendor'];
    const webglRendererFromPage = results['WebGL Renderer'];

    console.log(`🔍 Sannysoft sees - Vendor: "${webglVendorFromPage}", Renderer: "${webglRendererFromPage}"`);

    // Verify Sannysoft sees our spoofed GPU instead of real hardware
    expect(webglVendorFromPage).toMatch(/(NVIDIA Corporation|Intel Inc\.|ATI Technologies Inc\.)/);
    expect(webglRendererFromPage).toMatch(/(NVIDIA|Intel|AMD)/);
    expect(webglRendererFromPage).not.toContain('SwiftShader'); // Not software rendering
    expect(webglRendererFromPage).not.toContain('Google'); // Not obviously fake
  }

  // Log all other results for analysis
  console.log('📋 Additional results:');
  for (const [test, result] of Object.entries(results)) {
    if (!criticalTests.includes(test)) {
      console.log(`   ${test}: ${result}`);
    }
  }
});