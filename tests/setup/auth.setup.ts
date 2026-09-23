import { expect, test as setup } from '@playwright/test';

import { AuthApi } from '../../src/api/AuthApi.js';
import { authStateFiles } from '../../src/config/auth.js';
import { requiredEnvironmentValue } from '../../src/config/env.js';
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

const requestedRoles = new Set(
  (process.env.AUTH_ROLES ?? 'customer').split(',').map((role) => role.trim()),
);
const selectedRoles = roles.filter((role) => requestedRoles.has(role.name));

if (selectedRoles.length === 0) {
  throw new Error('AUTH_ROLES must include at least one supported role: admin or customer');
}

for (const role of selectedRoles) {
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
