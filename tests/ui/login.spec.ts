import { expect, test } from '../../src/fixtures/index.js';
import { requiredEnvironmentValue } from '../../src/config/env.js';

test.use({ storageState: { cookies: [], origins: [] } });

test('customer can log in through the UI @ui @regression', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(
    requiredEnvironmentValue('TEST_CUSTOMER_EMAIL'),
    requiredEnvironmentValue('TEST_CUSTOMER_PASSWORD'),
  );

  await expect(loginPage.page).toHaveURL(/account/);
});

test('invalid credentials show a login error @ui @regression', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(requiredEnvironmentValue('TEST_CUSTOMER_EMAIL'), 'invalid-password');

  await expect(loginPage.page.getByText(/invalid email or password|unauthorized/i)).toBeVisible();
});

test('empty login fields show validation state @ui @regression', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.submit.click();

  await expect(loginPage.email).toHaveClass(/is-invalid/);
  await expect(loginPage.password).toHaveClass(/is-invalid/);
});
