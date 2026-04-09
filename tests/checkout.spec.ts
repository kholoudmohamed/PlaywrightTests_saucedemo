import { test } from './fixtures/fixtures';
import { Cart } from '../components/Cart';

test('checkout demo happy path', async ({
  loginPage,
  inventoryPage,
  productPage,
  checkoutPage,
  page,
}) => {
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
    const cart = new Cart(page);

    await productPage.addToCart();
    await cart.assertCartCountInHeader(1);
  });

  await test.step('Open cart and verify line item', async () => {
    // Navigate back to homepage where cart link is visible
    // await page.goto('/');
    await checkoutPage.open();
    await checkoutPage.assertLoaded();
    await checkoutPage.assertCartIsNotEmpty();
    await checkoutPage.assertItemInCart('Grey jacket');
  });

  await test.step('Verify checkout CTA is available', async () => {
    await checkoutPage.assertCheckoutAvailable();
  });
});
