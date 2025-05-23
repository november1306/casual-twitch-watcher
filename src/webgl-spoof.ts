/**
 * WebGL Spoofing Module for Anti-Bot Detection
 *
 * This module provides sophisticated WebGL fingerprint spoofing capabilities to bypass
 * modern bot detection systems that rely on WebGL renderer fingerprinting.
 *
 * Key features:
 * - Realistic GPU configurations
 * - Comprehensive WebGL parameter overrides
 * - WEBGL_debug_renderer_info extension spoofing
 * - Multiple preset configurations for different scenarios
 */

/**
 * WebGL spoofing configuration interface
 */
export interface WebGLSpoofConfig {
  /** Basic WebGL vendor (usually "WebKit") */
  vendor: string;
  /** Basic WebGL renderer (usually "WebKit WebGL") */
  renderer: string;
  /** WebGL version string */
  version: string;
  /** GLSL version string */
  shadingLanguageVersion: string;
  /** Unmasked vendor from WEBGL_debug_renderer_info extension */
  unmaskedVendor: string;
  /** Unmasked renderer from WEBGL_debug_renderer_info extension */
  unmaskedRenderer: string;
}

/**
 * Predefined realistic WebGL configurations
 * These configurations are based on real hardware to avoid detection
 */
export const webglConfigs = {
  /** NVIDIA RTX 3060 - Popular gaming GPU */
  nvidia_rtx_3060: {
    vendor: "WebKit",
    renderer: "WebKit WebGL",
    version: "WebGL 1.0 (OpenGL ES 2.0 Chromium)",
    shadingLanguageVersion: "WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)",
    unmaskedVendor: "NVIDIA Corporation",
    unmaskedRenderer: "NVIDIA GeForce RTX 3060/PCIe/SSE2"
  },

  /** Intel Iris Graphics - Common in laptops */
  intel_iris: {
    vendor: "WebKit",
    renderer: "WebKit WebGL",
    version: "WebGL 1.0 (OpenGL ES 2.0 Chromium)",
    shadingLanguageVersion: "WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)",
    unmaskedVendor: "Intel Inc.",
    unmaskedRenderer: "Intel(R) Iris(R) Xe Graphics"
  },

  /** AMD Radeon RX 6600 - Popular mid-range GPU */
  amd_rx_6600: {
    vendor: "WebKit",
    renderer: "WebKit WebGL",
    version: "WebGL 1.0 (OpenGL ES 2.0 Chromium)",
    shadingLanguageVersion: "WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)",
    unmaskedVendor: "ATI Technologies Inc.",
    unmaskedRenderer: "AMD Radeon RX 6600 Series"
  },

  /** NVIDIA GTX 1660 - Widely used gaming GPU */
  nvidia_gtx_1660: {
    vendor: "WebKit",
    renderer: "WebKit WebGL",
    version: "WebGL 1.0 (OpenGL ES 2.0 Chromium)",
    shadingLanguageVersion: "WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)",
    unmaskedVendor: "NVIDIA Corporation",
    unmaskedRenderer: "NVIDIA GeForce GTX 1660/PCIe/SSE2"
  },

  /** Intel UHD Graphics - Common integrated graphics */
  intel_uhd: {
    vendor: "WebKit",
    renderer: "WebKit WebGL",
    version: "WebGL 1.0 (OpenGL ES 2.0 Chromium)",
    shadingLanguageVersion: "WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)",
    unmaskedVendor: "Intel Inc.",
    unmaskedRenderer: "Intel(R) UHD Graphics 630"
  },
} as const;

/**
 * Selects an appropriate WebGL configuration based on User-Agent
 *
 * @param userAgent - The browser's User-Agent string
 * @returns A WebGL configuration that matches the apparent system
 */
export function getWebGLConfigForUserAgent(userAgent: string): WebGLSpoofConfig {
  // Analyze User-Agent to pick realistic GPU config
  const ua = userAgent.toLowerCase();

  // High-end systems indicators
  if (ua.includes('windows nt 10.0') && ua.includes('x64')) {
    // Windows 10/11 64-bit - could have gaming GPU
    return webglConfigs.nvidia_rtx_3060;
  }

  // Mac systems
  if (ua.includes('macintosh') || ua.includes('mac os x')) {
    return webglConfigs.intel_iris;
  }

  // Linux systems
  if (ua.includes('linux')) {
    return webglConfigs.amd_rx_6600;
  }

  // Older Windows or unknown systems
  if (ua.includes('windows')) {
    return webglConfigs.intel_uhd;
  }

  // Default fallback
  return webglConfigs.nvidia_gtx_1660;
}

/**
 * Generates the WebGL spoofing injection script
 *
 * This script completely overrides WebGL fingerprinting methods to return
 * our spoofed values instead of the real hardware information.
 *
 * @param config - The WebGL configuration to use
 * @returns JavaScript code to inject into pages
 */
export function getWebGLSpoofScript(config: WebGLSpoofConfig): string {
  return `
(function() {
  'use strict';

  // WebGL spoofing configuration
  const config = ${JSON.stringify(config)};

  // WebGL constants from the specification
  const GL_CONSTANTS = {
    VENDOR: 0x1F00,
    RENDERER: 0x1F01,
    VERSION: 0x1F02,
    SHADING_LANGUAGE_VERSION: 0x8B8C,
    UNMASKED_VENDOR_WEBGL: 0x9245,
    UNMASKED_RENDERER_WEBGL: 0x9246
  };

  // Store original functions before any modifications
  const originalGetContext = HTMLCanvasElement.prototype.getContext;

  /**
   * Override HTMLCanvasElement.getContext to intercept WebGL context creation
   */
  HTMLCanvasElement.prototype.getContext = function(contextType, ...args) {
    const context = originalGetContext.apply(this, [contextType, ...args]);

    // Only modify WebGL contexts
    if (context && (contextType === 'webgl' || contextType === 'experimental-webgl' || contextType === 'webgl2')) {
      return createStealthWebGLContext(context);
    }

    return context;
  };

  /**
   * Creates a stealth WebGL context that returns spoofed values
   */
  function createStealthWebGLContext(originalContext) {
    // Store original methods
    const originalGetParameter = originalContext.getParameter.bind(originalContext);
    const originalGetExtension = originalContext.getExtension.bind(originalContext);

    // Override getParameter method
    originalContext.getParameter = function(parameter) {
      switch (parameter) {
        case GL_CONSTANTS.VENDOR:
          return config.vendor;
        case GL_CONSTANTS.RENDERER:
          return config.renderer;
        case GL_CONSTANTS.VERSION:
          return config.version;
        case GL_CONSTANTS.SHADING_LANGUAGE_VERSION:
          return config.shadingLanguageVersion;
        case GL_CONSTANTS.UNMASKED_VENDOR_WEBGL:
          return config.unmaskedVendor;
        case GL_CONSTANTS.UNMASKED_RENDERER_WEBGL:
          return config.unmaskedRenderer;
        default:
          return originalGetParameter(parameter);
      }
    };

    // Override getExtension to control debug renderer info
    originalContext.getExtension = function(name) {
      const extension = originalGetExtension(name);

      if (name === 'WEBGL_debug_renderer_info' && extension) {
        // Create a proxy for the debug renderer info extension
        return createDebugRendererInfoProxy(extension, originalContext);
      }

      return extension;
    };

    return originalContext;
  }

  /**
   * Creates a proxy for WEBGL_debug_renderer_info extension
   */
  function createDebugRendererInfoProxy(extension, context) {
    return new Proxy(extension, {
      get(target, property) {
        // Override the constants to return our spoofed values
        if (property === 'UNMASKED_VENDOR_WEBGL') {
          return GL_CONSTANTS.UNMASKED_VENDOR_WEBGL;
        }
        if (property === 'UNMASKED_RENDERER_WEBGL') {
          return GL_CONSTANTS.UNMASKED_RENDERER_WEBGL;
        }

        return target[property];
      }
    });
  }

  // Also override at the prototype level for WebGL2
  if (typeof WebGL2RenderingContext !== 'undefined') {
    const originalWebGL2GetParameter = WebGL2RenderingContext.prototype.getParameter;
    WebGL2RenderingContext.prototype.getParameter = function(parameter) {
      switch (parameter) {
        case GL_CONSTANTS.VENDOR:
          return config.vendor;
        case GL_CONSTANTS.RENDERER:
          return config.renderer;
        case GL_CONSTANTS.VERSION:
          return config.version;
        case GL_CONSTANTS.SHADING_LANGUAGE_VERSION:
          return config.shadingLanguageVersion;
        case GL_CONSTANTS.UNMASKED_VENDOR_WEBGL:
          return config.unmaskedVendor;
        case GL_CONSTANTS.UNMASKED_RENDERER_WEBGL:
          return config.unmaskedRenderer;
        default:
          return originalWebGL2GetParameter.call(this, parameter);
      }
    };
  }

  // Override at the WebGLRenderingContext prototype level as well
  if (typeof WebGLRenderingContext !== 'undefined') {
    const originalWebGLGetParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function(parameter) {
      switch (parameter) {
        case GL_CONSTANTS.VENDOR:
          return config.vendor;
        case GL_CONSTANTS.RENDERER:
          return config.renderer;
        case GL_CONSTANTS.VERSION:
          return config.version;
        case GL_CONSTANTS.SHADING_LANGUAGE_VERSION:
          return config.shadingLanguageVersion;
        case GL_CONSTANTS.UNMASKED_VENDOR_WEBGL:
          return config.unmaskedVendor;
        case GL_CONSTANTS.UNMASKED_RENDERER_WEBGL:
          return config.unmaskedRenderer;
        default:
          return originalWebGLGetParameter.call(this, parameter);
      }
    };
  }

  console.log('[WebGL Spoofing] Initialized with vendor:', config.unmaskedVendor, 'renderer:', config.unmaskedRenderer);
})();
`;
}