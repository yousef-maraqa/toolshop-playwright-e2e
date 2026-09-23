import { expect, test } from '../../src/fixtures/index.js';

import { requiredEnvironmentValue } from '../../src/config/env.js';

test('invalid credentials return an API error @api @regression', async ({ authApi }) => {
  await expect(
    authApi.login(requiredEnvironmentValue('TEST_CUSTOMER_EMAIL'), 'invalid-password'),
  ).rejects.toMatchObject({ status: 401 });
});

test('unknown product IDs return not found @api @regression', async ({ productsApi }) => {
  await expect(productsApi.getById('00000000000000000000000000')).rejects.toMatchObject({
    status: 404,
  });
});

test('protected user endpoint rejects requests without a bearer token @api @regression', async ({
  request,
}) => {
  const response = await request.get('/users/me');

  expect(response.status()).toBe(401);
});
