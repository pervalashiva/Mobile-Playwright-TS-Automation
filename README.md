# Mobile Playwright TypeScript Automation

Playwright + **TypeScript** framework for **mobile** UI automation against [Sauce Demo](https://www.saucedemo.com/) — the web counterpart to Sauce Labs My Demo App used in the Appium/Java reference suites.

| Item | Choice |
|------|--------|
| Tool | Playwright |
| Language | TypeScript |
| Pattern | Page Object Model |
| Mobile strategy | Official device descriptors (touch, viewport, UA, DPR) |
| Devices | Pixel 7, Pixel 7 landscape, iPhone 14 (Chromium), iPhone 14 (WebKit) |
| App under test | https://www.saucedemo.com |

This mirrors the login / catalog / cart coverage from:

- [Mobile-Appium-Automation](https://github.com/pervalashiva/Mobile-Appium-Automation) (WebdriverIO + Appium)
- [Mobile-Selenium-Java-Automation](https://github.com/pervalashiva/Mobile-Selenium-Java-Automation) (Java + Selenium + Appium)

---

## Prerequisites

- Node.js 18+
- npm 9+

---

## Setup

```bash
git clone https://github.com/pervalashiva/Mobile-Playwright-TS-Automation.git
cd Mobile-Playwright-TS-Automation
npm install
npx playwright install chromium webkit
```

---

## Run tests

```bash
# All mobile projects
npm test

# Single device profile
npm run test:android
npm run test:ios

# Suites
npm run test:login
npm run test:catalog
npm run test:cart

# Headed (watch mobile chrome)
npm run test:headed -- --project=pixel-7
```

HTML report:

```bash
npm run report
```

---

## Test coverage

| Spec | Coverage |
|------|----------|
| `login.spec.ts` | Valid login, locked user, empty username validation |
| `catalog.spec.ts` | Products list, open product detail |
| `cart.spec.ts` | Add to cart, remove from cart |

### Demo credentials

| User | Username | Password |
|------|----------|----------|
| Valid | `standard_user` | `secret_sauce` |
| Locked | `locked_out_user` | `secret_sauce` |

---

## Project structure

```
Mobile-Playwright-TS-Automation/
├── playwright.config.ts       # Mobile device projects
├── package.json
└── tests/
    ├── data/users.ts
    ├── pages/                 # Page Objects
    └── specs/                 # Specs (login / catalog / cart)
```

---

## Why Playwright for mobile?

Playwright does not drive native Android/iOS apps the way Appium does. This project automates the **mobile web** experience using Playwright device emulation (and real mobile browser engines), which is the recommended Playwright approach for responsive / mobile browser QA.

For native APK/IPA automation, use the Appium or Java Selenium repos linked above.

---

## License

ISC
