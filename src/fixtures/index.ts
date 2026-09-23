import { test as base } from '@playwright/test';

import { AuthApi } from '../api/AuthApi.js';
import { BrandsApi } from '../api/BrandsApi.js';
import { CartApi } from '../api/CartApi.js';
import { ProductsApi } from '../api/ProductsApi.js';
import { requiredEnvironmentValue } from '../config/env.js';
import { currentEnvironment } from '../config/environments.js';
import { AccountPage } from '../pages/AccountPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductPage } from '../pages/ProductPage.js';

export type ToolshopFixtures = {
  accountPage: AccountPage;
  authApi: AuthApi;
  brandsApi: BrandsApi;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  homePage: HomePage;
  loginPage: LoginPage;
  productPage: ProductPage;
  productsApi: ProductsApi;
};

type ToolshopWorkerFixtures = {
  cartApi: CartApi;
};

export const test = base.extend<ToolshopFixtures, ToolshopWorkerFixtures>({
  accountPage: async ({ page }, use) => use(new AccountPage(page)),
  authApi: async ({ request }, use) => use(new AuthApi(request, currentEnvironment.apiUrl)),
  brandsApi: async ({ request }, use) => {
    const authApi = new AuthApi(request, currentEnvironment.apiUrl);
    const login = await authApi.login(
      requiredEnvironmentValue('TEST_ADMIN_EMAIL'),
      requiredEnvironmentValue('TEST_ADMIN_PASSWORD'),
    );

    await use(new BrandsApi(request, currentEnvironment.apiUrl, login.access_token));
  },
  cartApi: [
    async ({ playwright }, use) => {
      const workerRequest = await playwright.request.newContext({
        baseURL: currentEnvironment.apiUrl,
      });
      const authApi = new AuthApi(workerRequest, currentEnvironment.apiUrl);
      const login = await authApi.login(
        requiredEnvironmentValue('TEST_CUSTOMER_EMAIL'),
        requiredEnvironmentValue('TEST_CUSTOMER_PASSWORD'),
      );

      await use(new CartApi(workerRequest, currentEnvironment.apiUrl, login.access_token));
      await workerRequest.dispose();
    },
    { scope: 'worker' },
  ],
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  homePage: async ({ page }, use) => use(new HomePage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  productsApi: async ({ request }, use) => use(new ProductsApi(request, currentEnvironment.apiUrl)),
});

export { expect } from '@playwright/test';
