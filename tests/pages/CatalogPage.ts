import { expect, type Locator, type Page } from '@playwright/test';

export class CatalogPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryList: Locator;
  readonly productNames: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.inventoryList = page.locator('.inventory_list');
    this.productNames = page.locator('.inventory_item_name');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  async waitForLoaded() {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.title).toHaveText('Products');
    await expect(this.inventoryList).toBeVisible();
  }

  productByName(name: string) {
    return this.page.locator('.inventory_item_name', { hasText: name });
  }

  addToCartButton(name: string) {
    const slug = name.toLowerCase().replace(/ /g, '-');
    return this.page.locator(`[data-test="add-to-cart-${slug}"]`);
  }

  async getVisibleProductNames() {
    await this.waitForLoaded();
    return this.productNames.allTextContents();
  }

  async openProduct(name: string) {
    await this.productByName(name).click();
  }

  async addProductToCart(name: string) {
    await this.addToCartButton(name).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async getCartCount() {
    await expect(this.cartBadge).toBeVisible();
    return (await this.cartBadge.textContent())?.trim() ?? '';
  }

  async logout() {
    await this.menuButton.click();
    await expect(this.logoutLink).toBeVisible();
    await this.logoutLink.click();
  }
}
