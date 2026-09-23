import { expect, test } from '../../src/fixtures/index.js';
import { requiredEnvironmentValue } from '../../src/config/env.js';

test('catalog category navigation opens the category view @ui @regression', async ({
  page,
  homePage,
  categoriesApi,
  productsApi,
}) => {
  const category = (await categoriesApi.list()).find(({ slug }) => slug === 'pliers');
  expect(category).toBeDefined();
  const categoryProducts = await productsApi.filterByCategory(category!.id);

  await homePage.goto();
  await page.getByTestId('nav-categories').click();
  await page.getByTestId('nav-hand-tools').click();

  await expect(page).toHaveURL(/category\/hand-tools/);
  await expect(page.locator('div[data-test="filters"]')).toBeVisible();
  await expect(page.getByTestId(`product-${categoryProducts.data[0].id}`)).toBeVisible();
});

test.describe('isolated logout', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('customer can log out from the navigation menu @ui @regression', async ({
    loginPage,
    accountPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(
      requiredEnvironmentValue('TEST_CUSTOMER_EMAIL'),
      requiredEnvironmentValue('TEST_CUSTOMER_PASSWORD'),
    );
    await accountPage.goto();
    await accountPage.navBar.logout();

    await expect(accountPage.navBar.accountLink).toBeHidden();
  });
});
