import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  protected readonly path = '/account';
  readonly userFullName = this.page.locator('.customer-name');

  async assertLoadedCorrectly(fullName: string) {
    await super.assertLoaded();
    await expect(this.userFullName).toBeVisible();
    await expect(this.userFullName).toContainText(fullName);
  }
}
