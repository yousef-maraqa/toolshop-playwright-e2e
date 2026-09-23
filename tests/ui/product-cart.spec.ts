import { expect, test } from '../../src/fixtures/index.js';

test('API product data matches the UI and can be added to cart @ui @hybrid @smoke', async ({
  productsApi,
  productPage,
  cartPage,
}) => {
  const product = (await productsApi.list({ page: 1 })).data[0];

  await productPage.goto(product.id);
  await expect(productPage.title).toHaveText(product.name);
  await expect(productPage.price).toContainText(product.price.toFixed(2));

  await productPage.addProductToCart();
  await cartPage.goto();

  await expect(cartPage.productTitles).toContainText(product.name);
});
