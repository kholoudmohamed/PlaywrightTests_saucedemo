import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('homepage load demo', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo();
  await loginPage.assertLoaded();
});
