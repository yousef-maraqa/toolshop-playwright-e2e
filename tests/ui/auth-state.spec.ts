import { expect, test } from '@playwright/test';

import { AccountPage } from '../../src/pages/AccountPage.js';
import { authStateFiles } from '../../src/config/auth.js';

test.use({ storageState: authStateFiles.customer });

test('customer storage state opens the account page @ui @smoke', async ({ page }) => {
  const accountPage = new AccountPage(page);

  await accountPage.goto();
  await expect(accountPage.pageTitle).toHaveText('My account');
});
