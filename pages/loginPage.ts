import { Page } from '@playwright/test';
import { ConfigManager } from '../utils/config';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private usernameInput = 'input[name="username"]';
    private passwordInput = 'input[name="password"]';
    private loginButton = '*[type="submit"]';
    private errorMessage = '.error-message';

    // Actions
    async navigateToLoginPage() {
        await this.page.goto(ConfigManager.getBaseUrl());
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