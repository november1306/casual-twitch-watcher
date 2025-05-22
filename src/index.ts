import { chromium, Browser, Page, BrowserContext } from 'patchright';
import { getStealthConfig, StealthConfig } from '../config/stealth-config';

/**
 * Stealth Browser Manager for undetected automation
 * Focused on browser setup and detection testing
 */
export class StealthBrowser {
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private page: Page | null = null;
    private config: StealthConfig;

    constructor(environment: 'development' | 'production' | 'testing' = 'development') {
        this.config = getStealthConfig(environment);
    }

    /**
     * Launch stealth browser with anti-detection settings
     */
    async launch(): Promise<void> {
        console.log('🚀 Launching stealth browser with Patchright...');

        try {
            // Launch browser with stealth settings from config
            this.browser = await chromium.launch({
                headless: this.config.browser.headless,
                args: this.config.browser.args,
                slowMo: this.config.browser.slowMo,
                timeout: this.config.browser.timeout
            });

            // Create new context with user-like settings from config
            this.context = await this.browser.newContext({
                viewport: this.config.context.viewport,
                userAgent: this.config.context.userAgent,
                locale: this.config.context.locale,
                timezoneId: this.config.context.timezoneId,
                geolocation: this.config.context.geolocation,
                permissions: this.config.context.permissions,
                extraHTTPHeaders: this.config.context.extraHTTPHeaders
            });

            // Create new page
            this.page = await this.context.newPage();

            console.log('✅ Stealth browser launched successfully');
        } catch (error) {
            console.error('❌ Failed to launch stealth browser:', error);
            throw error;
        }
    }

    /**
     * Get current page instance for testing
     */
    getPage(): Page {
        if (!this.page) {
            throw new Error('Browser not launched. Call launch() first.');
        }
        return this.page;
    }

    /**
     * Close the browser
     */
    async close(): Promise<void> {
        console.log('🔒 Closing browser...');

        if (this.browser) {
            await this.browser.close();
            this.browser = null;
            this.context = null;
            this.page = null;
            console.log('✅ Browser closed');
        }
    }
}