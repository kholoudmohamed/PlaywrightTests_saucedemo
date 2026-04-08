import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  async navigateTo() {
    await this.navigate('/');
  }

  async assertLoaded() {
    await expect(this.page).toHaveTitle(/Sauce Demo/i);
    await expect(this.page.getByText('Just a demo site showing off what Sauce can do.')).toBeVisible();
  }
}
