# Stealth Twitch Bot

A sophisticated stealth automation bot built with TypeScript and [Patchright](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright) for undetected web browsing and interaction.

## 🎯 Project Goals

- Create undetectable browser automation for Twitch interaction
- Bypass anti-bot systems using advanced stealth techniques
- Maintain human-like browsing patterns and behavior
- Achieve Bot Risk Score < 50 on fingerprint detection tests

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Windows/macOS/Linux
- Git

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd casual-twitch-watcher

# Install dependencies
npm install

# Install Chromium browser for Patchright
npx patchright install chromium
```

### Basic Usage

```bash
# Run all detection tests
npm test

# Run specific detection tests
npm run test:sannysoft     # Classic detection tests
npm run test:browserscan   # Modern detection tests
npm run test:incolumitas   # Behavioral analysis
npm run test:intoli        # Educational tests

# Build TypeScript to JavaScript
npm run build

# Run with visible browser for debugging
npm run test:headed
```

## 🧪 Testing Stealth Capabilities

### Detection Testing Suite

Our comprehensive testing approach evaluates browser properties across multiple services:

```bash
npm test  # Run all detection tests
```

This will test against:
1. **bot.sannysoft.com** - Classic automation detection
2. **browserscan.net** - Modern detection techniques
3. **bot.incolumitas.com** - Behavioral analysis
4. **intoli.com** - Educational detection tests

### Success Criteria

- ✅ WebDriver not detected across all services
- ✅ CDP (Chrome DevTools Protocol) not detected
- ✅ Behavioral scores ≥ 0.5 (human-like)
- ✅ Browser properties appear normal
- ✅ No automation flags present

## 🔧 Configuration

### Stealth Settings

Modify `config/stealth-config.ts` to adjust:

- Browser launch arguments
- User agent strings
- Viewport dimensions
- Timing delays
- HTTP headers

### Environment Modes

```typescript
// Development (visible browser)
const config = getStealthConfig('development');

// Production (headless)
const config = getStealthConfig('production');

// Testing (optimized for fingerprint tests)
const config = getStealthConfig('testing');
```

## 🛠️ Architecture

### Core Components

```
src/
├── index.ts              # Main StealthBrowser class
config/
└── stealth-config.ts     # Configuration management
tests/
├── detection/            # Organized detection tests
│   ├── sannysoft.spec.ts    # Classic detection
│   ├── browserscan.spec.ts  # Modern detection
│   ├── incolumitas.spec.ts  # Behavioral analysis
│   └── intoli.spec.ts       # Educational tests
├── global-setup.ts       # Test environment setup
└── global-teardown.ts    # Test cleanup
docs/
├── README.md            # Documentation
└── testing-overview.md  # Comprehensive testing guide
```

### Key Features

- **Patchright Integration**: Uses undetected Playwright patches
- **Human-like Behavior**: Random delays and natural interaction patterns
- **Advanced Stealth**: Multiple anti-detection techniques
- **TypeScript**: Type-safe development with modern tooling

## 🔍 Stealth Techniques Used

### Browser-Level Patches (via Patchright)

- ✅ Runtime.enable leak patching
- ✅ Console.enable leak protection
- ✅ Command flag optimization
- ✅ General automation leak fixes
- ✅ Closed shadow root interaction

### Custom Stealth Enhancements

- 🎭 Custom user agent management
- ⏱️ Human-like timing patterns
- 🌍 Realistic geolocation and timezone
- 📱 Natural viewport and screen settings
- 🔒 HTTP header normalization

## 📊 Anti-Bot System Compatibility

Based on Patchright documentation, this setup bypasses:

- ✅ Cloudflare
- ✅ Kasada
- ✅ Akamai
- ✅ Shape/F5
- ✅ Datadome
- ✅ Fingerprint.com
- ✅ And many others...

## 🐛 Troubleshooting

### Common Issues

**Browser fails to launch:**
```bash
# Reinstall browser
npx patchright install chromium --force
```

**High bot risk score:**
- Check browser arguments in `stealth-config.ts`
- Verify Patchright is working correctly
- Test with different user agent strings

**TypeScript compilation errors:**
```bash
# Clean and rebuild
npm run clean
npm run build
```

## 📝 Development Notes

### Task Tracking

See `TODO.md` for current progress and upcoming features.

### Code Style

- TypeScript with strict mode
- ESLint and Prettier (future)
- Comprehensive error handling
- Detailed logging for debugging

## ⚠️ Legal Disclaimer

This tool is for **educational and testing purposes only**. Users are responsible for:

- Complying with website terms of service
- Respecting rate limits and usage policies
- Following applicable laws and regulations
- Not engaging in harmful or malicious activities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📚 References

- [Patchright GitHub](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright)
- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Fingerprint Testing Site](https://fingerprint-scan.com/)

---

**Status**: 🚧 Active Development | **Version**: 1.0.0 | **Last Updated**: $(date)