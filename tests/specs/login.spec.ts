import { test, expect } from '@playwright/test';
import { CatalogPage, LoginPage } from '../pages';
import { users } from '../data/users';

test.describe('Sauce Demo — Login (mobile)', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);

    await loginPage.login(users.valid.username, users.valid.password);
    await catalogPage.waitForLoaded();
    await expect(catalogPage.title).toBeVisible();
  });

  test('should show error for locked-out user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(users.locked.username, users.locked.password);
    const message = await loginPage.getErrorText();
    expect(message).toContain('Sorry, this user has been locked out');
  });

  test('should show validation when username is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('', users.valid.password);
    const message = await loginPage.getErrorText();
    expect(message).toContain('Username is required');
  });
});
