# Stealth Browser Testing Suite

A sophisticated stealth browser automation suite built with TypeScript and [Patchright](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright) for bypassing anti-bot detection systems.

## 🎯 Overview

This project provides a comprehensive testing framework to validate browser stealth capabilities against modern detection systems. It's designed for security researchers, automation developers, and anyone interested in understanding browser fingerprinting techniques.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/november1306/casual-twitch-watcher.git
cd casual-twitch-watcher

# Install dependencies (requires Node.js 18+)
npm install

# Install Chromium browser for Patchright
npx patchright install chromium

# Run all detection tests
npm test
```

### Test Commands

```bash
# Run specific detection test suites
npm run test:browserscan   # Modern detection techniques
npm run test:sannysoft     # Classic automation detection
npm run test:incolumitas   # Behavioral analysis
npm run test:intoli        # Educational detection tests

# Run with visible browser for debugging
npm run test:headed
```

## 🧪 Detection Testing

### Test Sites

The suite validates stealth capabilities against:

- **browserscan.net** - Modern WebDriver, CDP, and behavioral detection
- **bot.sannysoft.com** - Classic automation markers and browser properties
- **bot.incolumitas.com** - Advanced behavioral analysis and timing attacks
- **intoli.com** - Educational detection demonstrations

### Success Criteria

- ✅ WebDriver properties properly concealed
- ✅ CDP (Chrome DevTools Protocol) not detected
- ✅ Navigator properties appear normal
- ✅ Overall status shows "Normal" (not "Robot")
- ✅ Clean, user-friendly test output with status indicators

## 🔧 Key Features

### Stealth Techniques

- **Patchright Integration** - Uses undetected Playwright patches
- **Browser-Level Patches** - Runtime.enable, Console.enable leak protection
- **Property Masking** - navigator.webdriver and automation flags hidden
- **Human-like Patterns** - Natural timing and interaction simulation

### Anti-Bot Bypass Compatibility

Based on Patchright capabilities, bypasses:
- Cloudflare, Kasada, Akamai, Shape/F5, Datadome, Fingerprint.com, and more

## 🛠️ Configuration

Customize stealth settings in `config/stealth-config.ts`:

```typescript
// Environment-specific configurations
const config = getStealthConfig('development');  // Visible browser
const config = getStealthConfig('production');   // Headless mode
const config = getStealthConfig('testing');      // Optimized for fingerprint tests
```

## 📊 Example Test Output

```
🌐 Browser launched → https://www.browserscan.net/bot-detection
📋 WebDriver: ✅ Normal
📋 WebDriver Advance: ✅ Normal
📋 navigator.webdriver: ✅ false
📋 CDP: ✅ Normal
🎯 Overall: ✅ Normal
```

*Note: If browser fails to launch, try `npx patchright install chromium --force`*

## ⚠️ Legal Notice

This tool is for **educational and research purposes only**. Users must:
- Respect website terms of service
- Follow applicable laws and regulations
- Use responsibly for legitimate testing purposes

## 📚 Resources

- [Patchright Documentation](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright)
- [Playwright Documentation](https://playwright.dev/)
- [Browser Fingerprinting Research](https://browserscan.net/bot-detection)

---

**Status**: ✅ Active | **Latest**: Comprehensive detection testing suite with clean logging
