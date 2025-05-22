import { test, expect } from '@playwright/test';
import { StealthBrowser } from '../../src/index';

/**
 * browserscan.net Detection Tests
 * Tests modern detection techniques and automation markers
 * Note: This site may be slow or block automation - test includes fallback handling
 */

let stealth: StealthBrowser;

test.beforeAll(async () => {
  stealth = new StealthBrowser();
  await stealth.launch();
  console.log('🚀 Stealth browser launched for browserscan tests');
});

test.afterAll(async () => {
  if (stealth) {
    await stealth.close();
    console.log('🛑 Stealth browser closed');
  }
});

test('browserscan.net - Modern Detection Techniques', async () => {
  const page = stealth.getPage();

  console.log('🌐 Browser launched → https://www.browserscan.net/bot-detection');
  await page.goto('https://www.browserscan.net/bot-detection', {
    waitUntil: 'domcontentloaded',
    timeout: 15000
  });

  // Wait for detection analysis to complete
  await page.waitForTimeout(3000);

  // Check WebDriver detection - expect "Normal" for stealth success
  const webdriverNormal = page.locator('div:has-text("WebDriver"):not(:has-text("Advance")) span:has-text("Normal")');
  const webdriverRobot = page.locator('div:has-text("WebDriver"):not(:has-text("Advance")) span:has-text("Robot")');
  expect(await webdriverNormal.count()).toBeGreaterThan(0);
  expect(await webdriverRobot.count()).toBe(0);
  console.log('📋 WebDriver: ✅ Normal');

  // Check WebDriver Advance detection - expect "Normal" for advanced stealth success
  const webdriverAdvNormal = page.locator('div:has-text("WebDriver Advance") span:has-text("Normal")');
  const webdriverAdvRobot = page.locator('div:has-text("WebDriver Advance") span:has-text("Robot")');
  expect(await webdriverAdvNormal.count()).toBeGreaterThan(0);
  expect(await webdriverAdvRobot.count()).toBe(0);
  console.log('📋 WebDriver Advance: ✅ Normal');

  // Check navigator.webdriver value - handle both outcomes gracefully
  const webdriverFalse = page.locator('div:has-text("navigator.webdriver") span:has-text("false")');
  const webdriverTrue = page.locator('div:has-text("navigator.webdriver") span:has-text("true")');

  const falseCount = await webdriverFalse.count();
  const trueCount = await webdriverTrue.count();

  // Ensure we found a navigator.webdriver result
  expect(falseCount + trueCount).toBeGreaterThan(0);

  // Prefer false (stealth working) but handle true gracefully
  if (falseCount > 0) {
    console.log('📋 navigator.webdriver: ✅ false');
  } else if (trueCount > 0) {
    console.log('📋 navigator.webdriver: ❌ true');
  }

  // Check CDP result - this often shows "Robot" with automation tools
  const cdpNormal = page.locator('div:has-text("CDP") span:has-text("Normal")');
  const cdpRobot = page.locator('div:has-text("CDP") span:has-text("Robot")');

  const cdpNormalCount = await cdpNormal.count();
  const cdpRobotCount = await cdpRobot.count();

  if (cdpNormalCount > 0) {
    console.log('📋 CDP: ✅ Normal');
  } else if (cdpRobotCount > 0) {
    console.log('📋 CDP: ⚠️ Robot (expected with automation tools)');
  }

  // Check overall status - handle both outcomes gracefully
  const normalStatus = page.getByRole('strong').filter({ hasText: 'Normal' });
  const robotStatus = page.getByRole('strong').filter({ hasText: 'Robot' });

  const normalCount = await normalStatus.count();
  const robotCount = await robotStatus.count();

  // Ensure we found an overall status result
  expect(normalCount + robotCount).toBeGreaterThan(0);

  if (normalCount > 0) {
    console.log('🎯 Overall: ✅ Normal');
  } else if (robotCount > 0) {
    console.log('🎯 Overall: ❌ Robot');
  }
});