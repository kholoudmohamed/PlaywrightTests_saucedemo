import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly addToCartButton = this.page.locator('input#add');
  readonly productName = this.page.locator('h1[itemprop="name"]');
  readonly cartBadge = this.page.locator('#cart-target-desktop');

  async assertLoaded(productName: string) {
    await expect(this.productName).toHaveText(new RegExp(productName, 'i'));
    await expect(this.addToCartButton).toBeVisible();
  }

  async addToCart() {
    await this.addToCartButton.click();
    await expect(this.cartBadge).toHaveText(/\(\d+\)/, { timeout: 10000 });
  }

  async verifyCartCount(expectedCount: number) {
    await expect(this.cartBadge).toHaveText(`(${expectedCount})`, { timeout: 10000 });
  }
}
