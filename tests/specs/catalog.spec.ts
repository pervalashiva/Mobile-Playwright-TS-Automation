import { test, expect } from '@playwright/test';
import { CatalogPage, LoginPage, ProductPage } from '../pages';
import { products, users } from '../data/users';

test.describe('Sauce Demo — Catalog (mobile)', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.valid.username, users.valid.password);
    await new CatalogPage(page).waitForLoaded();
  });

  test('should display products on the catalog screen', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    const names = await catalogPage.getVisibleProductNames();

    expect(names.length).toBeGreaterThan(0);
    expect(names).toContain(products.backpack);
  });

  test('should open a product detail screen', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    const productPage = new ProductPage(page);

    await catalogPage.openProduct(products.backpack);
    await expect(await productPage.getTitle()).toBe(products.backpack);
  });
});
