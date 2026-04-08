import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('checkout demo happy path', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const productPage = new ProductPage(page);
  const checkoutPage = new CheckoutPage(page);

  await test.step('Load homepage and validate core elements', async () => {
    await loginPage.navigateTo();
    await loginPage.assertLoaded();
  });

  await test.step('Navigate to product catalog', async () => {
    await inventoryPage.assertLoaded();
  });

  await test.step('Click on first product (Grey jacket)', async () => {
    await inventoryPage.addFirstItemToCart();
    await productPage.assertLoaded('Grey jacket');
  });

  await test.step('Add product to cart and verify badge count', async () => {
    await productPage.addToCart();
    await productPage.verifyCartCount(1);
  });

  await test.step('Open cart and verify line item', async () => {
    // Navigate back to homepage where cart link is visible
    await page.goto('/');
    await checkoutPage.open();
    await checkoutPage.assertLoaded();
    await checkoutPage.assertCartIsNotEmpty();
    await checkoutPage.assertItemInCart('Grey jacket');
  });

  await test.step('Verify checkout CTA is available', async () => {
    await checkoutPage.assertCheckoutAvailable();
  });
});
