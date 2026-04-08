import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly cartLink = this.page.locator('a.checkout');
  readonly cartTable = this.page.locator('table.cart');
  readonly checkoutButton = this.page.locator('#checkout');

  async open() {
    await this.cartLink.click();
    await this.page.waitForURL(/.*\/cart/);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/.*\/cart/);
    await expect(this.page.getByRole('heading', { name: 'My Cart' })).toBeVisible();
  }

  async assertItemInCart(productName: string) {
    await expect(this.page.locator('h3:has-text("' + productName + '")').nth(1)).toBeVisible({ timeout: 10000 });
  }

  async assertCheckoutAvailable() {
    await expect(this.checkoutButton).toBeVisible({ timeout: 10000 });
  }

  async assertCartIsNotEmpty() {
    await expect(this.page.getByText('Your cart is currently empty')).not.toBeVisible({ timeout: 10000 });
  }
}
