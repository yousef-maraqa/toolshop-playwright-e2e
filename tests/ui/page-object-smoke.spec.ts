import { expect, test } from '../../src/fixtures/index.js';

test('page objects expose the catalog and account surfaces @ui @smoke', async ({
  homePage,
  accountPage,
}) => {
  await homePage.goto();
  await expect(homePage.searchInput).toBeVisible();

  await accountPage.goto();
  await expect(accountPage.pageTitle).toBeVisible();
});
