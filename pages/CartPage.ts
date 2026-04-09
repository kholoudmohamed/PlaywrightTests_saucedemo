import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  protected readonly path = '/cart';
  readonly checkoutButton = this.page.locator('#checkout');

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
}
