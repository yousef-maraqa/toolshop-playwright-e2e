import { expect, test } from '@playwright/test';

import { AuthApi } from '../../src/api/AuthApi.js';
import { CartApi } from '../../src/api/CartApi.js';
import { ProductsApi } from '../../src/api/ProductsApi.js';
import { currentEnvironment } from '../../src/config/environments.js';

function requiredEnvironmentValue(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

test('authenticated API supports login and cart lifecycle @api @regression', async ({
  request,
}) => {
  const authApi = new AuthApi(request, currentEnvironment.apiUrl);
  const login = await authApi.login(
    requiredEnvironmentValue('TEST_CUSTOMER_EMAIL'),
    requiredEnvironmentValue('TEST_CUSTOMER_PASSWORD'),
  );
  const productsApi = new ProductsApi(request, currentEnvironment.apiUrl, login.access_token);
  const cartApi = new CartApi(request, currentEnvironment.apiUrl, login.access_token);
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
