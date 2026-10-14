# SauceDemo UI Automation Testing

Automated UI testing project for [SauceDemo](https://www.saucedemo.com/) using Playwright and JavaScript.

## Tech Stack

- Playwright
- JavaScript
- Node.js
- Git & GitHub
- GitHub Actions (CI)

## Test Coverage

This project covers the following features:

**Login**
- Valid login
- Invalid login credentials
- Empty username and password validation

**Cart**
- Add product to cart
- Remove product from cart
- Add multiple products and remove one item

**Checkout**
- Successful checkout
- Required field validation

## Project Structure

```text
pages/        Page Object Model classes
tests/        Automated test cases
helpers/      Reusable testing flows
archived-tests/ Previous learning exercises
.github/workflows/ GitHub Actions configuration
```

## How to Run Tests

Install dependencies:

```bash
npm ci
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Open HTML report:

```bash
npx playwright show-report
```

## Cross-Browser Testing

Tests run on Chromium, Firefox, and WebKit.

## Continuous Integration

GitHub Actions automatically runs the Playwright test suite on pushes and pull requests targeting the `main` branch. HTML test reports are saved as workflow artifacts.