import { expect, test } from '@playwright/test';

import { ProductsApi } from '../../src/api/ProductsApi.js';
import { currentEnvironment } from '../../src/config/environments.js';

test('products API supports list, detail, search, and category filtering @api @smoke', async ({
  request,
}) => {
  const productsApi = new ProductsApi(request, currentEnvironment.apiUrl);
  const products = await productsApi.list({ page: 1 });
  const firstProduct = products.data[0];

  expect(products.data.length).toBeGreaterThan(0);
  expect(firstProduct).toBeDefined();

  const product = await productsApi.getById(firstProduct.id);
  expect(product.name).toBe(firstProduct.name);
  expect(product.price).toBe(firstProduct.price);

  const searchResults = await productsApi.search(firstProduct.name);
  expect(searchResults.data.some((result) => result.id === firstProduct.id)).toBe(true);

  const categoryResults = await productsApi.filterByCategory(firstProduct.category.id);
  expect(
    categoryResults.data.every((result) => result.category.id === firstProduct.category.id),
  ).toBe(true);
});
