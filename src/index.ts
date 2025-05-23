import { chromium, Browser, Page, BrowserContext } from 'patchright';
import { getStealthConfig, StealthConfig } from '../config/stealth-config';
import { getWebGLSpoofScript, getWebGLConfigForUserAgent, WebGLSpoofConfig } from './webgl-spoof';

/**
 * Advanced Stealth Browser Manager
 *
 * A sophisticated automation browser designed to bypass modern bot detection systems.
 * Features include WebGL spoofing, behavioral simulation, and comprehensive stealth techniques.
 *
 * @example
 * ```typescript
 * const stealth = new StealthBrowser('production');
 * await stealth.launch();
 *
 * const page = stealth.getPage();
 * await page.goto('https://example.com');
 *
 * await stealth.close();
 * ```
 */
export class StealthBrowser {
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private page: Page | null = null;
    private config: StealthConfig;
    private webglConfig: WebGLSpoofConfig;

    /**
     * Creates a new StealthBrowser instance
     *
     * @param environment - The environment configuration to use
     */
    constructor(environment: 'development' | 'production' | 'testing' = 'development') {
        this.config = getStealthConfig(environment);
        this.webglConfig = getWebGLConfigForUserAgent(this.config.context.userAgent);
    }

    /**
     * Launches the stealth browser with all anti-detection features enabled
     *
     * @throws {Error} If browser launch fails
     */
    async launch(): Promise<void> {
        try {
            console.log('🚀 Launching stealth browser...');

            // Launch browser with stealth configuration
            this.browser = await chromium.launch({
                headless: this.config.browser.headless,
                args: this.config.browser.args,
                slowMo: this.config.browser.slowMo,
                timeout: this.config.browser.timeout,
            });

            // Create stealth context
            this.context = await this.browser.newContext({
                viewport: this.config.context.viewport,
                userAgent: this.config.context.userAgent,
                locale: this.config.context.locale,
                timezoneId: this.config.context.timezoneId,
                geolocation: this.config.context.geolocation,
                permissions: this.config.context.permissions,
                extraHTTPHeaders: this.config.context.extraHTTPHeaders,
            });

            // Create the main page
            this.page = await this.context.newPage();

            // Inject WebGL spoofing script on every page load
            await this.context.addInitScript(getWebGLSpoofScript(this.webglConfig));

            console.log('✅ Stealth browser launched successfully');
        } catch (error) {
            throw new Error(`Failed to launch stealth browser: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * Gets the main page instance
     *
     * @returns The main page instance
     * @throws {Error} If browser is not launched
     */
    getPage(): Page {
        if (!this.page) {
            throw new Error('Browser not launched. Call launch() first.');
        }
        return this.page;
    }

    /**
     * Gets the browser context
     *
     * @returns The browser context
     * @throws {Error} If browser is not launched
     */
    getContext(): BrowserContext {
        if (!this.context) {
            throw new Error('Browser not launched. Call launch() first.');
        }
        return this.context;
    }

    /**
     * Gets the browser instance
     *
     * @returns The browser instance
     * @throws {Error} If browser is not launched
     */
    getBrowser(): Browser {
        if (!this.browser) {
            throw new Error('Browser not launched. Call launch() first.');
        }
        return this.browser;
    }

    /**
     * Closes the browser and cleans up resources
     */
    async close(): Promise<void> {
        console.log('🔒 Closing browser...');

        if (this.page) {
            await this.page.close();
            this.page = null;
        }

        if (this.context) {
            await this.context.close();
            this.context = null;
        }

        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }

        console.log('✅ Browser closed');
    }

    /**
     * Gets the current stealth configuration
     *
     * @returns The stealth configuration object
     */
    getConfig(): StealthConfig {
        return this.config;
    }

    /**
     * Gets the current WebGL configuration
     *
     * @returns The WebGL spoofing configuration
     */
    getWebGLConfig(): WebGLSpoofConfig {
        return this.webglConfig;
    }
}