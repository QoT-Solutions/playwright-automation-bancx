import { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private usernameInput = 'input[name="username"]';
    private passwordInput = 'input[name="password"]';
    private loginButton = 'button[type="submit"]';
    private errorMessage = '.error-message';

    // Actions
    async navigateToLoginPage() {
        await this.page.goto('https://dt004-customer-portal-avbob.aro1.radixcloud.software/');
    }

    async login(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async getErrorMessage() {
        return await this.page.textContent(this.errorMessage);
    }

    async isLoggedIn() {
        // Add appropriate selector to verify successful login
        return await this.page.isVisible('text=Dashboard');
    }
} 