# Sauce Demo - Playwright Test Automation

## 🎯 Overview

A comprehensive Playwright TypeScript test automation demo for the Sauce Demo Shopify site (https://sauce-demo.myshopify.com). This project demonstrates QA practices including Page Object Model, clean test structure, and reliable e2e testing for interview purposes.

## �🚀 Quick Start

### Prerequisites

- **Node.js 18+**
- **npm** (comes with Node.js)
- **Git** (for cloning)

### Installation

```bash
# Clone repository
git clone https://github.com/kholoudmohamed/PlaywrightTests_saucedemo.git
cd PlaywrightTests_saucedemo

# Install dependencies
npm install
```

### Running Tests

```bash
# Run all tests (headless)
npm test

# Run tests in headed mode (visual)
npx playwright test --headed

# Run specific test file
npx playwright test tests/checkout.spec.ts

# Run with specific browser
npx playwright test --project=chromium

# Generate and view HTML report
npx playwright show-report
```

## 🛠 Framework Architecture

### Technology Stack

- **Playwright 1.59.1**: Cross-browser automation with TypeScript support
- **TypeScript**: Type-safe test development
- **Node.js**: Runtime environment
- **Page Object Model**: Maintainable test structure

### Project Structure

```
PlaywrightTests_saucedemo/
├── pages/                          # Page Object classes
├── tests/                         # Test specifications
```

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)

- Base URL: `https://sauce-demo.myshopify.com`
- Chromium-only execution
- 10-second action timeouts
- HTML reporting enabled
- Screenshot and video capture on failure

### Page Objects

Each page class extends `BasePage` and includes:

- Element locators
- Action methods
- Assertion methods
- Proper error handling

## 📊 Reports

Test results are automatically generated in `test-results/` and `playwright-report/` directories. Use `npx playwright show-report` to view detailed HTML reports with screenshots and traces.

## 📈 Continuous Integration

### CircleCI Pipeline

The project includes a complete CircleCI configuration (`.circleci/config.yml`) for automated testing:
[View CircleCI Pipeline](https://app.circleci.com/pipelines/github/kholoudmohamed/PlaywrightTests_saucedemo)

#### Pipeline Setup

- **Docker Image**: `cimg/node:18.20.4-browsers` (includes Node.js and pre-installed browsers)
- **Browser Tools**: CircleCI browser-tools orb for Playwright browser dependencies
- **Caching**: npm dependencies cached for faster builds

#### Pipeline Steps

1. **Checkout**: Source code retrieval
2. **Dependencies**: `npm ci` with caching
3. **Browser Setup**: `npx playwright install --with-deps`
4. **Code Quality**: ESLint linting
5. **Test Execution**: Full test suite run
6. **Artifacts**: Test results and reports stored

#### Pipeline Features

- **Automatic Triggers**: Every push and pull request to all branches
- **Test Results**: Native CircleCI test dashboard integration
- **Artifact Storage**: Test results, screenshots, and HTML reports (30-day retention)
- **Parallel Execution**: Optimized for fast feedback
- **Cross-Platform**: Docker-based execution ensures consistency

#### Local vs CI Parity

The CI environment mirrors local development:
- Same Node.js version and dependencies
- Identical Playwright configuration
- Same test execution commands
- Consistent browser environments

> **Note**: Pipeline access may be restricted. Test reports and results are available as downloadable artifacts from the CircleCI dashboard.


## � Code Quality & Formatting

This project maintains high code quality standards with automated formatting and linting:

### Tools Configured

- **Prettier**: Code formatting with consistent style rules
- **ESLint**: TypeScript-aware linting with quality rules
- **EditorConfig**: Cross-editor formatting consistency

### Code Quality Commands

```bash
# Format all code files
npm run format

# Check formatting without changes
npm run format:check

# Lint TypeScript files
npm run lint

# Auto-fix linting issues
npm run lint:fix
```
