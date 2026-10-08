import { expect, test } from '../../src/fixtures/index.js';
import { readCustomerCredentials } from '../../src/config/testAccount.js';

test('catalog category navigation opens the category view @ui @regression', async ({
  page,
  homePage,
}) => {
  await homePage.goto();
  await page.getByTestId('nav-categories').click();
  await page.getByTestId('nav-hand-tools').click();

  await expect(page).toHaveURL(/category\/hand-tools/);
  await expect(page.locator('div[data-test="filters"]')).toBeVisible();
  // The category view aggregates its subcategories; assert it renders products
  // rather than a specific id, which pagination and sort order make brittle.
  await expect(page.locator('a[data-test^="product-"]').first()).toBeVisible();
});

test.describe('isolated logout', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('customer can log out from the navigation menu @ui @regression', async ({
    loginPage,
    accountPage,
  }) => {
    const customer = readCustomerCredentials();
    await loginPage.goto();
    await loginPage.login(customer.email, customer.password);
    await accountPage.goto();
    await accountPage.navBar.logout();

    await expect(accountPage.navBar.signInLink).toBeVisible();
    await expect(accountPage.navBar.menu).toBeHidden();
  });
});
