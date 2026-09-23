import { expect, test } from '@playwright/test';

test('Toolshop home page loads @smoke @ui', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Practice Software Testing - Toolshop/i);
});
