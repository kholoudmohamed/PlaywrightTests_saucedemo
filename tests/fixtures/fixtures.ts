import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AccountPage } from '../../pages/AccountPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';

type MyFixtures = {
  loginPage: LoginPage;
  accountPage: AccountPage;
  checkoutPage: CheckoutPage;
  inventoryPage: InventoryPage;
  productPage: ProductPage;
  cartPage: CartPage;
};
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});
export { expect } from '@playwright/test';
