import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  readonly userFullName = this.page.locator('.customer-name');

  async navigateTo() {
    await this.navigate('/account');
  }
  async assertLoadedCorrectly(fullName: string) {
    await expect(this.page).toHaveTitle('Account – Sauce Demo');
    await expect(this.userFullName).toBeVisible();
    await expect(this.userFullName).toContainText(fullName);
  }
}
