import { expect, test } from '../../src/fixtures/index.js';
import { faker } from '@faker-js/faker';

test('admin-created brand appears in the UI @hybrid @regression', async ({ page, brandsApi }) => {
  const name = `Portfolio ${faker.company.name()}`;
  const slug = faker.helpers.slugify(name).toLowerCase();
  const brand = await brandsApi.create(name, slug);

  try {
    await page.goto('/admin/brands');
    await page.getByTestId('brand-search-query').fill(name);
    await page.getByTestId('brand-search-submit').click();
    await expect(page.getByText(name, { exact: true })).toBeVisible();
  } finally {
    await brandsApi.delete(brand.id);
  }
});
