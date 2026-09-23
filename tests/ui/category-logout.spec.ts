import { expect, test } from '../../src/fixtures/index.js';

test('catalog category navigation opens the category view @ui @regression', async ({
  page,
  homePage,
}) => {
  await homePage.goto();
  await page.goto('/category/hand-tools');

  await expect(page).toHaveURL(/category\/hand-tools/);
  await expect(page.locator('div[data-test="filters"]')).toBeVisible();
});

test('customer can log out from the navigation menu @ui @regression', async ({ accountPage }) => {
  await accountPage.goto();
  await accountPage.navBar.logout();

  await expect(accountPage.navBar.accountLink).toBeHidden();
});
