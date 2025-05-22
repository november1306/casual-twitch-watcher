/**
 * Stealth Browser Configuration
 * Centralized settings for anti-detection automation
 */

export interface StealthConfig {
    browser: BrowserConfig;
    context: ContextConfig;
    behavior: BehaviorConfig;
    fingerprint: FingerprintConfig;
}

export interface BrowserConfig {
    headless: boolean;
    args: string[];
    slowMo?: number;
    timeout: number;
}

export interface ContextConfig {
    viewport: { width: number; height: number };
    userAgent: string;
    locale: string;
    timezoneId: string;
    geolocation?: { longitude: number; latitude: number };
    permissions: string[];
    extraHTTPHeaders?: Record<string, string>;
}

export interface BehaviorConfig {
    minDelay: number;
    maxDelay: number;
    navigationDelay: { min: number; max: number };
    actionDelay: { min: number; max: number };
    scrollSpeed: number;
}

export interface FingerprintConfig {
    enableJavaScript: boolean;
    enableImages: boolean;
    enableCSS: boolean;
    blockAds: boolean;
    spoofWebGL: boolean;
}

/**
 * Default stealth configuration optimized for bypassing detection
 */
export const defaultStealthConfig: StealthConfig = {
    browser: {
        headless: false, // Keep false for initial testing
        slowMo: 0, // No artificial slowdown
        timeout: 30000,
        args: [
            // Core stealth args (some redundant with Patchright patches)
            '--no-first-run',
            '--no-default-browser-check',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',

            // Window and display
            '--window-size=1366,768',
            '--start-maximized',

            // Memory and performance
            '--memory-pressure-off',
            '--max_old_space_size=4096',

            // Network and security
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            '--disable-field-trial-config',
            '--disable-ipc-flooding-protection',

            // User experience
            '--disable-background-networking',
            '--disable-default-apps',
            '--disable-sync',
            '--disable-translate',
            '--hide-scrollbars',
            '--mute-audio',

            // Additional stealth
            '--disable-logging',
            '--disable-plugins',
            '--disable-plugins-discovery',
            '--disable-preconnect'
        ]
    },

    context: {
        viewport: { width: 1366, height: 768 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        locale: 'en-US',
        timezoneId: 'America/New_York',
        geolocation: { longitude: -74.006, latitude: 40.7128 }, // NYC coordinates
        permissions: ['geolocation'],
        extraHTTPHeaders: {
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document'
        }
    },

    behavior: {
        minDelay: 500,
        maxDelay: 2000,
        navigationDelay: { min: 1000, max: 3000 },
        actionDelay: { min: 200, max: 800 },
        scrollSpeed: 100 // pixels per scroll
    },

    fingerprint: {
        enableJavaScript: true,
        enableImages: true,
        enableCSS: true,
        blockAds: false, // Don't block ads initially to avoid detection
        spoofWebGL: false // Patchright handles this
    }
};

/**
 * Production stealth configuration (more aggressive)
 */
export const productionStealthConfig: StealthConfig = {
    ...defaultStealthConfig,
    browser: {
        ...defaultStealthConfig.browser,
        headless: true, // Run headless in production
        slowMo: 50 // Slight delay to appear more human
    },
    behavior: {
        ...defaultStealthConfig.behavior,
        minDelay: 1000,
        maxDelay: 4000,
        navigationDelay: { min: 2000, max: 5000 },
        actionDelay: { min: 500, max: 1500 }
    }
};

/**
 * Testing configuration (for fingerprint tests)
 */
export const testingStealthConfig: StealthConfig = {
    ...defaultStealthConfig,
    browser: {
        ...defaultStealthConfig.browser,
        headless: false, // Keep visible for inspection
        slowMo: 100 // Slight delay for observation
    }
};

/**
 * Get configuration based on environment
 */
export function getStealthConfig(env: 'development' | 'production' | 'testing' = 'development'): StealthConfig {
    switch (env) {
        case 'production':
            return productionStealthConfig;
        case 'testing':
            return testingStealthConfig;
        default:
            return defaultStealthConfig;
    }
}

/**
 * Utility to generate random user agents (for future use)
 */
export const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
];

export function getRandomUserAgent(): string {
    return userAgents[Math.floor(Math.random() * userAgents.length)];
}