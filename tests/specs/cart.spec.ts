import { test, expect } from '@playwright/test';
import { CartPage, CatalogPage, LoginPage, ProductPage } from '../pages';
import { products, users } from '../data/users';

test.describe('Sauce Demo — Cart (mobile)', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.valid.username, users.valid.password);
    await new CatalogPage(page).waitForLoaded();
  });

  test('should add a product to the cart', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await catalogPage.openProduct(products.backpack);
    await productPage.addToCart();
    expect(await productPage.getCartCount()).toBe('1');

    await productPage.openCart();
    await cartPage.waitForLoaded();
    expect(await cartPage.getProductName()).toBe(products.backpack);
  });

  test('should remove a product from the cart', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    const cartPage = new CartPage(page);

    await catalogPage.addProductToCart(products.backpack);
    await catalogPage.openCart();
    await cartPage.waitForLoaded();
    await cartPage.removeItem(products.backpack);

    expect(await cartPage.isEmpty()).toBe(true);
  });
});
