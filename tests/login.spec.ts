import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';
import { users } from '../utils/testData/users';

test.describe('User can login successfully', () => {
  users.forEach(user => {
    test(`login with ${user.emailAddress}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const accountPage = new AccountPage(page);

      await loginPage.navigateTo();
      await loginPage.assertLoaded();
      await loginPage.login(user.emailAddress, user.password);

      if (await loginPage.doesChallengeExist()) {
        test.skip(true, 'Challenge shown after submit; requires challenge-free test environment');
      }

      await accountPage.assertLoadedCorrectly(user.fullName);
    });
  });
});
