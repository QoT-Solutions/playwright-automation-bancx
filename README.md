# Playwright Automation Framework for BancX

This project contains automated UI and API tests for the BancX customer portal using Playwright with TypeScript.

## Project Structure

```
playwright-automation-bancX/
│
├── tests/                         # Test cases
│   ├── ui/                        # UI Test cases
│   │   └── login.spec.ts         # Login test scenarios
│   └── api/                       # API Test cases
│       └── loan.spec.ts          # Loan application API tests
│
├── pages/                         # Page Object Model classes
│   └── loginPage.ts              # Login page object
│
├── config/                        # Configuration files
│   ├── config.json               # Application configuration
│   ├── credentials.json          # Test credentials
│   └── api.config.json           # API configuration
│
├── utils/                         # Utility functions
│   ├── config.ts                 # Configuration manager
│   └── apiClient.ts              # API client utility
│
├── types/                         # TypeScript type definitions
│   └── api.types.ts              # API request/response types
│
├── playwright.config.ts          # Playwright configuration
├── package.json                  # Node.js dependencies
└── README.md                     # Project documentation
```

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/QoT-Solutions/playwright-automation-bancx.git
cd playwright-automation-bancx
```

2. Install dependencies:
```bash
npm install
```

## Configuration

The project uses JSON configuration files for managing test data and application settings:

1. `config/config.json`: Contains application settings like base URL and timeouts
2. `config/credentials.json`: Contains test credentials for valid and invalid users
3. `config/api.config.json`: Contains API endpoints, headers, and test data

To modify the test environment or credentials, update the respective JSON files.

## Running Tests

### UI Tests
To run all UI tests:
```bash
npx playwright test tests/ui/
```

### API Tests
To run all API tests:
```bash
npx playwright test tests/api/
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

### UI Tests
The login tests are implemented using decision table testing technique with the following scenarios:

1. Valid username + Valid password = Success
2. Valid username + Invalid password = Failure
3. Invalid username + Valid password = Failure
4. Invalid username + Invalid password = Failure

### API Tests
The API tests cover the following scenarios:

1. Authentication token retrieval
2. Loan application creation with valid data
3. Error handling for invalid loan application data
4. Token expiration handling

## Page Object Model

The framework uses the Page Object Model design pattern to maintain the test code. The `LoginPage` class encapsulates all the login page-specific locators and actions.

## API Testing

The framework includes a robust API testing structure:

1. **API Client**: A reusable client for making API requests
2. **Type Definitions**: TypeScript interfaces for request/response types
3. **Configuration**: Centralized API configuration
4. **Test Cases**: Comprehensive API test scenarios

### API Client Features
- Automatic token management
- Request/response type safety
- Error handling
- Cleanup utilities

## Configuration Management

The framework includes a `ConfigManager` utility class that handles:
- Loading and caching configuration files
- Providing access to application settings
- Managing test credentials

This ensures that sensitive data is kept separate from the test code and makes it easy to modify test data without changing the code.

## Git Workflow

### Making Changes

1. Add your changes to the staging area:
```bash
git add .
```

2. Commit your changes with a descriptive message:
```bash
git commit -m "Your descriptive commit message"
```

3. Push your changes to the remote repository:
```bash
git push origin master
```

### Best Practices

- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Pull latest changes before making new changes
- Create feature branches for major changes
- Review changes before committing

### Repository Information

- Repository URL: https://github.com/QoT-Solutions/playwright-automation-bancx.git
- Main branch: master