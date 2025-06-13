import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
    });

    // Decision Table Test Cases:
    // 1. Valid username + Valid password = Success
    // 2. Valid username + Invalid password = Failure
    // 3. Invalid username + Valid password = Failure
    // 4. Invalid username + Invalid password = Failure

    test('TC1: Login with valid credentials', async () => {
        await loginPage.login('valid_username', 'valid_password');
        const isLoggedIn = await loginPage.isLoggedIn();
        expect(isLoggedIn).toBeTruthy();
    });

    test('TC2: Login with valid username and invalid password', async () => {
        await loginPage.login('valid_username', 'invalid_password');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Invalid credentials');
    });

    test('TC3: Login with invalid username and valid password', async () => {
        await loginPage.login('invalid_username', 'valid_password');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Invalid credentials');
    });

    test('TC4: Login with invalid credentials', async () => {
        await loginPage.login('invalid_username', 'invalid_password');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Invalid credentials');
    });
}); 