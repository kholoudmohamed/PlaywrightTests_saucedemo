import { test } from '../fixtures/fixtures';
import { Cart } from '../../components/CartDrawer';
import type { SelectedProductOptions } from '../../pages/ProductPage';

test('checkout demo happy path - one product', async ({
  inventoryPage,
  productPage,
  checkoutPage,
  cartPage,
  page,
}) => {
  let selectedProductTitle = '';
  let selectedProductOptions: SelectedProductOptions = {};

  await test.step('Navigate to product catalog', async () => {
    await inventoryPage.navigate();
  });

  await test.step('Click on random available product', async () => {
    selectedProductTitle = await inventoryPage.openRandomAvailableProductAndReturnTitle();
    await productPage.assertLoaded(selectedProductTitle);
  });

  await test.step('Add product to cart and verify badge count', async () => {
    const cart = new Cart(page);
    selectedProductOptions = await productPage.addToCart();
    console.log('Selected product options:', selectedProductOptions);
    await cart.assertCartCountInHeader(1);
  });

  await test.step('Open cart and verify line item', async () => {
    await cartPage.navigate();
    await cartPage.assertCartIsNotEmpty();
  });

  await test.step('Verify checkout CTA is available', async () => {
    await checkoutPage.navigate();
  });
});
