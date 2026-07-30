import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('[data-test="username"]');
    this.passwordField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('/');
    await this.waitForLoaded();
  }

  async waitForLoaded() {
    await expect(this.usernameField).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.waitForLoaded();
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async getErrorText() {
    await expect(this.errorMessage).toBeVisible();
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }
}
