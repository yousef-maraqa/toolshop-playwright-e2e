import { expect, test } from '../src/fixtures/index.js';

test('Toolshop home page loads @smoke @ui', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Practice Software Testing - Toolshop/i);
});
