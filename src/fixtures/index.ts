import { test as base } from '@playwright/test';

import { AuthApi } from '../api/AuthApi.js';
import { CartApi } from '../api/CartApi.js';
import { ProductsApi } from '../api/ProductsApi.js';
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
  cartApi: CartApi;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  homePage: HomePage;
  loginPage: LoginPage;
  productPage: ProductPage;
  productsApi: ProductsApi;
};

export const test = base.extend<ToolshopFixtures>({
  accountPage: async ({ page }, use) => use(new AccountPage(page)),
  authApi: async ({ request }, use) => use(new AuthApi(request, currentEnvironment.apiUrl)),
  cartApi: async ({ request, authApi }, use) => {
    const login = await authApi.login(
      requiredEnvironmentValue('TEST_CUSTOMER_EMAIL'),
      requiredEnvironmentValue('TEST_CUSTOMER_PASSWORD'),
    );

    await use(new CartApi(request, currentEnvironment.apiUrl, login.access_token));
  },
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  homePage: async ({ page }, use) => use(new HomePage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  productsApi: async ({ request }, use) => use(new ProductsApi(request, currentEnvironment.apiUrl)),
});

function requiredEnvironmentValue(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export { expect } from '@playwright/test';
