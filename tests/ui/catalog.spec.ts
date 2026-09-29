import { expect, test } from '../../src/fixtures/index.js';

test('catalog search renders matching products @ui @smoke', async ({ homePage }) => {
  await homePage.goto();
  await homePage.search('pliers');

  await expect(homePage.searchTerm).toHaveText('pliers');
  await expect
    .poll(async () => {
      const names = await homePage.productNames.allTextContents();

      return names.length > 0 && names.every((name) => /pliers/i.test(name));
    })
    .toBe(true);
});

test('catalog sorts prices and advances pagination @ui @regression', async ({ homePage }) => {
  await homePage.goto();
  await homePage.filterSidebar.sort.selectOption({ label: 'Price (Low - High)' });

  await expect
    .poll(async () => {
      const prices = await homePage.productPrices.allTextContents();
      const numericPrices = prices.map((price) => Number.parseFloat(price.replace(/[^\d.]/g, '')));

      return (
        numericPrices.length > 0 &&
        numericPrices.every((price, index) => index === 0 || numericPrices[index - 1] <= price)
      );
    })
    .toBe(true);
  await expect(homePage.nextPage).toBeVisible();
  await expect(homePage.previousPage).toBeVisible();
  const firstPageProduct = await homePage.productCard(0).name.textContent();
  await homePage.goToNextPage();
  await expect(homePage.productCard(0).name).not.toHaveText(firstPageProduct ?? '');
});
