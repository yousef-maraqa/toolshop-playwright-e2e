import { authStateFiles } from '../../src/config/auth.js';
import { expect, test } from '../../src/fixtures/index.js';

test.use({ storageState: authStateFiles.customer });

test('customer storage state opens the account page @ui @smoke', async ({ accountPage }) => {
  await accountPage.goto();
  await expect(accountPage.pageTitle).toHaveText('My account');
});
