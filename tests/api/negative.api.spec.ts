import { expect, test } from '../../src/fixtures/index.js';

import { AuthApi } from '../../src/api/AuthApi.js';
import { ProductsApi } from '../../src/api/ProductsApi.js';
import { currentEnvironment } from '../../src/config/environments.js';

test('invalid credentials return an API error @api @regression', async ({ request }) => {
  const authApi = new AuthApi(request, currentEnvironment.apiUrl);

  await expect(
    authApi.login(requiredEnvironmentValue('TEST_CUSTOMER_EMAIL'), 'invalid-password'),
  ).rejects.toMatchObject({ status: 401 });
});

test('unknown product IDs return not found @api @regression', async ({ request }) => {
  const productsApi = new ProductsApi(request, currentEnvironment.apiUrl);

  await expect(productsApi.getById('00000000000000000000000000')).rejects.toMatchObject({
    status: 404,
  });
});

test('protected user endpoint rejects requests without a bearer token @api @regression', async ({
  request,
}) => {
  const response = await request.get(`${currentEnvironment.apiUrl}/users/me`);

  expect(response.status()).toBe(401);
});

function requiredEnvironmentValue(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}
