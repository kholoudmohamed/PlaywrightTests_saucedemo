import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import type { SelectedProductOptions } from './ProductPage';

export class CartPage extends BasePage {
  protected readonly path = '/cart';
  readonly checkoutButton = this.page.locator('#checkout');
  readonly itemsPriceRows = this.page.locator('#cart .row>div.price');
  readonly itemsQuantityRows = this.page.locator('#cart .row>div.quantity');
  readonly itemsTotalRows = this.page.locator('#cart .row>div.total>span');
  readonly itemsRemoveRows = this.page.locator('#cart .row>div.remove');
  readonly itemsDescriptionRows = this.page.locator('#cart .row>div.description');
  readonly itemLinks = this.itemsDescriptionRows.locator('a');

  async assertLoaded() {
    await super.assertLoaded();
    await expect(this.checkoutButton).toBeVisible();
  }

  async assertCartIsNotEmpty() {
    await expect(
      this.page.getByText('It appears that your cart is currently empty! ')
    ).not.toBeVisible({
      timeout: 10000,
    });
  }
  async assertCorrectNumberOfProductsIsDisplayed(expectedCount: number) {
    await expect(this.itemsPriceRows).toHaveCount(expectedCount);
    await expect(this.itemsQuantityRows).toHaveCount(expectedCount);
    await expect(this.itemsTotalRows).toHaveCount(expectedCount);
    await expect(this.itemsRemoveRows).toHaveCount(expectedCount);
    await expect(this.itemsDescriptionRows).toHaveCount(expectedCount);
  }

  async assertProductWithSelectedOptionsIsDisplayed(
    productName: string,
    selectedOptions: SelectedProductOptions
  ) {
    const productRow = this.itemsDescriptionRows.filter({
      has: this.page.locator('a', { hasText: productName }),
    });
    const productLink = productRow.locator('a').first();

    await expect(productRow).toHaveCount(1);
    await expect(productLink).toBeVisible();

    const productText = await productLink.textContent();
    const normalizedProductText = productText?.replace(/\s+/g, ' ').trim() ?? '';

    expect(normalizedProductText).toContain(productName);

    for (const selectedOption of Object.values(selectedOptions)) {
      expect(normalizedProductText).toContain(selectedOption);
    }
  }
}
