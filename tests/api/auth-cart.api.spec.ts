import { expect, test } from '../../src/fixtures/index.js';
import { requiredEnvironmentValue } from '../../src/config/env.js';

test('authenticated API supports login and cart lifecycle @api @regression', async ({
  authApi,
  productsApi,
  cartApi,
}) => {
  const login = await authApi.login(
    requiredEnvironmentValue('TEST_CUSTOMER_EMAIL'),
    requiredEnvironmentValue('TEST_CUSTOMER_PASSWORD'),
  );
  expect(login.access_token).toBeTruthy();
  const product = (await productsApi.list({ page: 1 })).data[0];
  const cart = await cartApi.createCart();

  try {
    const addedItem = await cartApi.addItem(cart.id, product.id, 2);
    expect(addedItem.result).toBe('item added or updated');

    const loadedCart = await cartApi.getCart(cart.id);
    expect(loadedCart.cart_items?.some((item) => item.product_id === product.id)).toBe(true);
  } finally {
    await cartApi.deleteCart(cart.id);
  }
});
