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
├── config/                        # Configuration files
│   ├── config.json               # Application configuration
│   └── credentials.json          # Test credentials
│
├── utils/                         # Utility functions
│   └── config.ts                 # Configuration manager
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

## Configuration

The project uses JSON configuration files for managing test data and application settings:

1. `config/config.json`: Contains application settings like base URL and timeouts
2. `config/credentials.json`: Contains test credentials for valid and invalid users

To modify the test environment or credentials, update the respective JSON files.

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

## Configuration Management

The framework includes a `ConfigManager` utility class that handles:
- Loading and caching configuration files
- Providing access to application settings
- Managing test credentials

This ensures that sensitive data is kept separate from the test code and makes it easy to modify test data without changing the code.

## Configuration

The Playwright configuration can be found in `playwright.config.ts`. You can modify the following settings:
- Browser selection
- Test timeouts
- Viewport size
- Test retries
- Screenshot and video capture settings 