import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  protected readonly path = '/account/login';
  readonly emailAddress = this.page.locator('#customer_email');
  readonly password = this.page.locator('#customer_password');
  readonly signInButton = this.page.locator('.button[value="Sign In"]');
  readonly challengeFrame = this.page.frameLocator('iframe[src*="captcha"][scrolling]');
  readonly challengeHeader = this.challengeFrame.locator('.challenge-header');

  async assertLoaded() {
    await super.assertLoaded();
    await expect(this.emailAddress).toBeVisible();
  }

  async doesChallengeExist() {
    // TODO: Replace with more robust check
    await this.page.waitForTimeout(2000);
    return (await this.challengeHeader.count()) > 0;
  }

  async login(email: string, password: string) {
    await this.emailAddress.fill(email);
    await this.password.fill(password);
    await this.clickOnSignInButton();
  }

  async clickOnSignInButton() {
    await this.signInButton.waitFor({ state: 'attached' });
    await this.signInButton.click();
    if (await this.isSignInButtonVisibleAndAttached()) {
      await this.signInButton.click();
    }
  }
  async isSignInButtonVisibleAndAttached() {
    if ((await this.signInButton.count()) > 0) {
      await this.signInButton.waitFor({ state: 'attached' });
      return true;
    }
    return false;
  }
}
