import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backButton: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('[data-test="inventory-item-name"]');
    this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
    this.removeButton = page.locator('[data-test^="remove"]');
    this.backButton = page.locator('[data-test="back-to-products"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async waitForLoaded() {
    await expect(this.page).toHaveURL(/.*inventory-item\.html/);
    await expect(this.productTitle).toBeVisible();
  }

  async getTitle() {
    await this.waitForLoaded();
    return (await this.productTitle.textContent())?.trim() ?? '';
  }

  async addToCart() {
    await this.waitForLoaded();
    await this.addToCartButton.click();
    await expect(this.removeButton).toBeVisible();
  }

  async getCartCount() {
    await expect(this.cartBadge).toBeVisible();
    return (await this.cartBadge.textContent())?.trim() ?? '';
  }

  async openCart() {
    await this.cartLink.click();
  }
}
