# BugBasket — Playwright E2E Tests

## About the Project

This repository contains automated end-to-end (E2E) tests for the [BugBasket](https://bugbasket-ref.vercel.app) e-commerce web application.

The project was created as part of QA Academy homework to practice UI test automation using Playwright and TypeScript.

## Tech Stack

- **Playwright** — E2E test automation framework
- **TypeScript** — programming language
- **Node.js / npm** — runtime and package management
- **Chromium** — browser used for testing
- **Git & GitHub** — version control
- **dotenv** — environment variable management

## Test Scenarios

The project covers the following six automated test scenarios:

1. **User Login** — Verify that a user can log in with valid credentials.
2. **Add Product to Cart** — Verify that a product can be added to the shopping cart.
3. **Cart Subtotal Update** — Verify that the subtotal updates correctly when the product quantity changes.
4. **Valid Promo Code** — Verify that the `SAVE100` promo code applies the correct discount.
5. **Invalid Promo Code** — Verify that an invalid promo code displays an error message and does not apply a discount.
6. **Search — No Results** — Verify that the application displays an appropriate message when no products match the search query.

## Project Structure

```text
bugbasket-playwright-tests/
├── tests/
│   ├── cart.spec.ts
│   ├── promo.spec.ts
│   └── search.spec.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

**Note:** The `.env` file is created locally and is not included in the repository.

## Installation

**1. Clone the repository**

```bash
git clone https://github.com/Yuliia-Chepak/bugbasket-playwright-tests.git
```

**2. Navigate to the project directory**

```bash
cd bugbasket-playwright-tests
```

**3. Install dependencies**

```bash
npm install
```

**4. Install Playwright browsers**

```bash
npx playwright install
```

## Environment Variables

Create a `.env` file in the project root and add your test account credentials:

```dotenv
TEST_EMAIL=your_test_email
TEST_PASSWORD=your_test_password
```

The `.env` file is excluded from Git version control to prevent sensitive credentials from being committed.

Use a dedicated test account when running automated tests.

## Running Tests

**Run all tests:**

```bash
npx playwright test
```

**Run tests in headed mode:**

```bash
npx playwright test --headed
```

**Run a specific test file:**

```bash
npx playwright test tests/promo.spec.ts
```

**Run tests sequentially:**

```bash
npx playwright test --workers=1
```

**Check test stability (10 repetitions):**

```bash
npx playwright test --repeat-each=10 --workers=1
```

**Check TypeScript for errors:**

```bash
npx tsc --noEmit
```

**Open the HTML test report:**

```bash
npx playwright show-report
```

## Test Configuration

- **Base URL:** https://bugbasket-ref.vercel.app
- **Browser:** Chromium
- **Test framework:** Playwright Test
- **Reporter:** HTML
- **Parallel execution:** Disabled
- **Workers:** 1
- **Retries:** 0
- **Credentials:** Environment variables (`.env`)
- **Screenshots:** Captured automatically on test failure
- **Traces:** Retained on test failure

## Test Execution Results

The test suite contains **6 automated E2E tests**.

The following results were obtained during local execution:

| Test Execution | Result |
|---|---|
| Standard test run | 6/6 passed |
| Stability check (10 repetitions) | 60/60 passed |
| Browser | Chromium |
| Failed tests in completed stability run | 0 |

All six tests passed during the standard execution and across ten consecutive repetitions.

These results demonstrate successful execution and repeatability under the tested conditions.

## Author

**Yuliia Chepak**

Aspiring QA Engineer