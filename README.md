# Playwright Automation Framework for BancX

This project contains automated UI tests for the BancX customer portal using Playwright with TypeScript.

## Project Structure

```
playwright-automation-bancX/
│
├── tests/                         # Test cases
│   └── login.spec.ts             # Login test scenarios
│
├── pages/                         # Page Object Model classes
│   └── loginPage.ts              # Login page object
│
├── playwright.config.ts          # Playwright configuration
├── package.json                  # Node.js dependencies
└── README.md                     # Project documentation
```

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running Tests

To run all tests:
```bash
npx playwright test
```

To run tests in UI mode:
```bash
npx playwright test --ui
```

To run tests in debug mode:
```bash
npx playwright test --debug
```

To run tests on a specific browser:
```bash
npx playwright test --project=chromium
```

## Test Cases

The login tests are implemented using decision table testing technique with the following scenarios:

1. Valid username + Valid password = Success
2. Valid username + Invalid password = Failure
3. Invalid username + Valid password = Failure
4. Invalid username + Invalid password = Failure

## Page Object Model

The framework uses the Page Object Model design pattern to maintain the test code. The `LoginPage` class encapsulates all the login page-specific locators and actions.

## Configuration

The Playwright configuration can be found in `playwright.config.ts`. You can modify the following settings:
- Browser selection
- Test timeouts
- Viewport size
- Test retries
- Screenshot and video capture settings 