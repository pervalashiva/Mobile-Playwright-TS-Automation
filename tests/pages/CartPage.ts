import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartItems: Locator;
  readonly productNames: Locator;
  readonly continueShopping: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.continueShopping = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async waitForLoaded() {
    await expect(this.page).toHaveURL(/.*cart\.html/);
    await expect(this.title).toHaveText('Your Cart');
  }

  removeButtonFor(name: string) {
    const slug = name.toLowerCase().replace(/ /g, '-');
    return this.page.locator(`[data-test="remove-${slug}"]`);
  }

  async getProductNames() {
    return this.productNames.allTextContents();
  }

  async getProductName() {
    await expect(this.productNames.first()).toBeVisible();
    return (await this.productNames.first().textContent())?.trim() ?? '';
  }

  async removeItem(name: string) {
    await this.removeButtonFor(name).click();
  }

  async isEmpty() {
    return (await this.cartItems.count()) === 0;
  }
}
