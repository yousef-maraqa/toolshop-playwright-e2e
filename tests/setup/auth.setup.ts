import { expect, test as setup } from '@playwright/test';

import { AuthApi } from '../../src/api/AuthApi.js';
import { authStateFiles } from '../../src/config/auth.js';
import { currentEnvironment } from '../../src/config/environments.js';

const roles = [
  {
    name: 'admin',
    emailVariable: 'TEST_ADMIN_EMAIL',
    passwordVariable: 'TEST_ADMIN_PASSWORD',
    stateFile: authStateFiles.admin,
  },
  {
    name: 'customer',
    emailVariable: 'TEST_CUSTOMER_EMAIL',
    passwordVariable: 'TEST_CUSTOMER_PASSWORD',
    stateFile: authStateFiles.customer,
  },
] as const;

function requiredEnvironmentValue(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

for (const role of roles) {
  setup(`${role.name} authentication`, async ({ page, request }) => {
    const authApi = new AuthApi(request, currentEnvironment.apiUrl);
    const login = await authApi.login(
      requiredEnvironmentValue(role.emailVariable),
      requiredEnvironmentValue(role.passwordVariable),
    );
    expect(login.access_token).toBeTruthy();

    await page.goto('/');
    await page.evaluate(([tokenKey, token]) => localStorage.setItem(tokenKey, token), [
      'auth-token',
      login.access_token,
    ] as const);
    await page.context().storageState({ path: role.stateFile });
  });
}
