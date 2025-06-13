# Playwright Automation Framework for BancX

This is an automated testing framework built with Playwright for BancX application testing.

## Features

- API Testing
- UI Testing with multiple browsers (Chromium, Firefox, WebKit)
- Page Object Model design pattern
- Environment-based configuration
- GitHub Actions CI/CD integration

## Setup

1. Clone the repository
```bash
git clone <repository-url>
cd playwright-automation-bancX
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
- Copy `.env.example` to `.env`
- Update the values in `.env` with your credentials

4. Install Playwright browsers
```bash
npx playwright install
```

## Running Tests

### API Tests
```bash
npx playwright test --project=api
```

### UI Tests
```bash
# Run in all browsers
npx playwright test --project=chromium --project=firefox --project=webkit

# Run in specific browser
npx playwright test --project=chromium
```

## Project Structure

```
playwright-framework/
├── tests/                         # Test cases
│   ├── ui/                        # UI Test cases
│   └── api/                       # API Test cases
├── pages/                         # Page Object Model classes
├── locators/                      # Organized selectors
├── utils/                         # Utility functions/helpers
├── fixtures/                      # Custom fixtures and test hooks
├── reports/                       # Test reports
└── test-results/                 # Test execution results
```

## CI/CD

The project uses GitHub Actions for continuous integration. On each push or pull request to main/develop:
- Installs dependencies
- Sets up environment
- Runs all tests
- Uploads test reports as artifacts

## Contributing

1. Create a feature branch from develop
2. Make your changes
3. Create a pull request to develop
4. Ensure all tests pass
5. Get code review and approval
