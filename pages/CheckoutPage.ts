import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  protected readonly path = '/checkout';
  readonly payNowButton = this.page.getByText('Pay now', { exact: true });

  async assertPayNowButtonVisible() {
    await expect(this.payNowButton).toBeVisible();
  }
}
