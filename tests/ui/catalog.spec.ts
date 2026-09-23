import { expect, test } from '../../src/fixtures/index.js';

test('catalog search renders matching products @ui @smoke', async ({ homePage }) => {
  await homePage.goto();
  await homePage.search('pliers');

  await expect(homePage.productCard(0).name).toContainText(/pliers/i);
});

test('catalog exposes sorting and pagination controls @ui @regression', async ({ homePage }) => {
  await homePage.goto();
  await homePage.filterSidebar.sort.selectOption({ label: 'Price (Low - High)' });

  await expect(homePage.nextPage).toBeVisible();
  await expect(homePage.previousPage).toBeVisible();
});
