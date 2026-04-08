import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly productTiles = this.page.locator('div.four.columns');
  readonly cartBadge = this.page.locator('.cart .count');
  readonly firstProductLink = this.page.locator('a#product-1');

  async assertLoaded() {
    await expect(this.page).toHaveTitle(/Sauce Demo/i);
    const count = await this.productTiles.count();
    expect(count).toBeGreaterThan(0);
  }

  async addFirstItemToCart() {
    // Click on the first product link to go to product detail page
    await this.firstProductLink.click();
  }

  async getCartCount() {
    const countText = await this.cartBadge.textContent();
    return parseInt(countText || '0');
  }
}
