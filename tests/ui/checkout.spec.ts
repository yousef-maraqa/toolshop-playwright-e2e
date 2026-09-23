import { expect, test } from '../../src/fixtures/index.js';
import { buildBillingAddress } from '../../src/data/factories.js';
import { deleteCartIfPresent } from '../../src/utils/cleanup.js';

test('customer can complete checkout with cash on delivery @ui @regression @smoke', async ({
  productsApi,
  cartApi,
  productPage,
  cartPage,
  checkoutPage,
}) => {
  test.setTimeout(60_000);
  const product = (await productsApi.list({ page: 1 })).data[0];
  await productPage.goto(product.id);
  await productPage.addProductToCart();
  const cartId = await productPage.getCartId();

  try {
    await cartPage.goto();
    await expect(cartPage.productTitles).toContainText(product.name);
    await cartPage.checkout();

    await checkoutPage.continueFromLogin();
    await checkoutPage.fillAddress(buildBillingAddress());
    await checkoutPage.continueFromAddress();
    await checkoutPage.selectPaymentMethod('cash-on-delivery');
    await checkoutPage.placeOrderNow();
    await expect(checkoutPage.paymentSuccess).toBeVisible();
  } finally {
    await deleteCartIfPresent(cartApi, cartId);
  }
});
