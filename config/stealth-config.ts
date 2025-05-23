/**
 * Advanced Stealth Browser Configuration
 *
 * Comprehensive settings for anti-detection automation with environment-specific
 * configurations optimized for different use cases.
 */

import { WebGLSpoofConfig } from '../src/webgl-spoof';

/**
 * Main stealth configuration interface
 */
export interface StealthConfig {
    browser: BrowserConfig;
    context: ContextConfig;
    behavior: BehaviorConfig;
    fingerprint: FingerprintConfig;
}

/**
 * Browser launch configuration
 */
export interface BrowserConfig {
    /** Whether to run in headless mode */
    headless: boolean;
    /** Chrome launch arguments for stealth operation */
    args: string[];
    /** Artificial delay between actions (milliseconds) */
    slowMo?: number;
    /** Browser launch timeout (milliseconds) */
    timeout: number;
}

/**
 * Browser context configuration
 */
export interface ContextConfig {
    /** Viewport dimensions */
    viewport: { width: number; height: number };
    /** User-Agent string to present */
    userAgent: string;
    /** Browser locale setting */
    locale: string;
    /** Timezone identifier */
    timezoneId: string;
    /** Geolocation coordinates (optional) */
    geolocation?: { longitude: number; latitude: number };
    /** Permissions to grant */
    permissions: string[];
    /** Additional HTTP headers */
    extraHTTPHeaders?: Record<string, string>;
}

/**
 * Behavioral simulation configuration
 */
export interface BehaviorConfig {
    /** Minimum delay between actions (milliseconds) */
    minDelay: number;
    /** Maximum delay between actions (milliseconds) */
    maxDelay: number;
    /** Enable mouse movement simulation */
    simulateMouseMovement: boolean;
    /** Enable typing delay simulation */
    simulateTypingDelay: boolean;
    /** Enable scroll behavior simulation */
    simulateScrolling: boolean;
}

/**
 * Fingerprinting configuration
 */
export interface FingerprintConfig {
    /** Enable JavaScript execution */
    enableJavaScript: boolean;
    /** Enable image loading */
    enableImages: boolean;
    /** Enable CSS loading */
    enableCSS: boolean;
    /** Block advertisements */
    blockAds: boolean;
    /** Enable WebGL spoofing */
    spoofWebGL: boolean;
    /** WebGL configuration to use (optional) */
    webglConfig?: WebGLSpoofConfig;
}

/**
 * Environment-specific configurations
 */
const configurations = {
    /**
     * Development configuration - Visible browser with debugging features
     */
    development: {
        browser: {
            headless: false,
            args: [
                // Core stealth arguments
                '--no-first-run',
                '--no-default-browser-check',
                '--disable-dev-shm-usage',
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

                // GPU and WebGL support
                '--enable-webgl',
                '--enable-accelerated-2d-canvas',
                '--disable-gpu-sandbox',

                // Network and security
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding',
                '--disable-features=TranslateUI',
                '--disable-component-extensions-with-background-pages',

                // Development specific
                '--remote-debugging-port=9222',
                '--enable-logging',
                '--v=1'
            ],
            slowMo: 100,
            timeout: 30000
        },
        context: {
            viewport: { width: 1366, height: 768 },
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            locale: 'en-US',
            timezoneId: 'America/New_York',
            geolocation: { longitude: -74.0060, latitude: 40.7128 }, // New York
            permissions: ['notifications', 'geolocation']
        },
        behavior: {
            minDelay: 100,
            maxDelay: 300,
            simulateMouseMovement: true,
            simulateTypingDelay: true,
            simulateScrolling: true
        },
        fingerprint: {
            enableJavaScript: true,
            enableImages: true,
            enableCSS: true,
            blockAds: false,
            spoofWebGL: true
        }
    },

    /**
     * Production configuration - Optimized for real-world stealth operation
     */
    production: {
        browser: {
            headless: true,
            args: [
                // Core stealth arguments
                '--no-first-run',
                '--no-default-browser-check',
                '--disable-dev-shm-usage',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor',

                // Window and display
                '--window-size=1920,1080',
                '--start-maximized',

                // Memory and performance
                '--memory-pressure-off',
                '--max_old_space_size=4096',

                // GPU and WebGL support
                '--enable-webgl',
                '--enable-accelerated-2d-canvas',
                '--disable-gpu-sandbox',

                // Network and security
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding',
                '--disable-features=TranslateUI',
                '--disable-component-extensions-with-background-pages',

                // Production optimizations
                '--disable-logging',
                '--silent',
                '--disable-extensions',
                '--disable-plugins'
            ],
            slowMo: 50,
            timeout: 60000
        },
        context: {
            viewport: { width: 1920, height: 1080 },
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            locale: 'en-US',
            timezoneId: 'America/New_York',
            permissions: ['notifications']
        },
        behavior: {
            minDelay: 50,
            maxDelay: 150,
            simulateMouseMovement: true,
            simulateTypingDelay: true,
            simulateScrolling: false
        },
        fingerprint: {
            enableJavaScript: true,
            enableImages: true,
            enableCSS: true,
            blockAds: true,
            spoofWebGL: true
        }
    },

    /**
     * Testing configuration - Fast and reliable for automated testing
     */
    testing: {
        browser: {
            headless: true,
            args: [
                // Core stealth arguments
                '--no-first-run',
                '--no-default-browser-check',
                '--disable-dev-shm-usage',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor',

                // Testing optimizations
                '--disable-extensions',
                '--disable-plugins',
                '--disable-images',
                '--disable-javascript',
                '--disable-logging',
                '--silent',

                // GPU and WebGL support
                '--enable-webgl',
                '--enable-accelerated-2d-canvas',
                '--disable-gpu-sandbox',

                // Memory and performance
                '--memory-pressure-off',
                '--max_old_space_size=2048'
            ],
            slowMo: 0,
            timeout: 30000
        },
        context: {
            viewport: { width: 1366, height: 768 },
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            locale: 'en-US',
            timezoneId: 'America/New_York',
            permissions: []
        },
        behavior: {
            minDelay: 0,
            maxDelay: 50,
            simulateMouseMovement: false,
            simulateTypingDelay: false,
            simulateScrolling: false
        },
        fingerprint: {
            enableJavaScript: true,
            enableImages: false,
            enableCSS: true,
            blockAds: false,
            spoofWebGL: true
        }
    }
};

/**
 * Gets the stealth configuration for the specified environment
 *
 * @param environment - The target environment
 * @returns Complete stealth configuration
 */
export function getStealthConfig(environment: keyof typeof configurations = 'development'): StealthConfig {
    const config = configurations[environment];

    if (!config) {
        throw new Error(`Unknown environment: ${environment}. Available: ${Object.keys(configurations).join(', ')}`);
    }

    return config;
}

/**
 * Gets available environment names
 *
 * @returns Array of available environment names
 */
export function getAvailableEnvironments(): string[] {
    return Object.keys(configurations);
}

/**
 * Validates a stealth configuration
 *
 * @param config - Configuration to validate
 * @returns True if valid, throws error if invalid
 */
export function validateStealthConfig(config: StealthConfig): boolean {
    // Basic validation
    if (!config.browser || !config.context || !config.behavior || !config.fingerprint) {
        throw new Error('Invalid configuration: missing required sections');
    }

    if (config.context.viewport.width < 1 || config.context.viewport.height < 1) {
        throw new Error('Invalid viewport dimensions');
    }

    if (config.behavior.minDelay < 0 || config.behavior.maxDelay < config.behavior.minDelay) {
        throw new Error('Invalid behavior delay configuration');
    }

    return true;
}