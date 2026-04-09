import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  protected readonly path = '/collections/all';
  readonly allProductsLinks = this.page.locator('.product-grid>div>a');
  readonly availableProductsLinks = this.allProductsLinks.filter({
    hasNot: this.page.locator('.sold-out'),
  });

  async assertLoaded() {
    await super.assertLoaded();
    const count = await this.allProductsLinks.count();
    expect(count).toBeGreaterThan(0);
  }

  async openRandomAvailableProductAndReturnTitle() {
    const productCount = await this.availableProductsLinks.count();
    if (productCount <= 0) {
      throw new Error('No available products to open');
    }

    const randomIndex = Math.floor(Math.random() * productCount);
    const selectedProduct = this.availableProductsLinks.nth(randomIndex);
    const productTitle = (await selectedProduct.locator('h3').textContent())?.trim();

    if (!productTitle) {
      throw new Error(`Could not read product title at index ${randomIndex}`);
    }

    await selectedProduct.click();
    return productTitle;
  }
}
