import { AxeBuilder } from '@axe-core/playwright';
import { type Page } from '@playwright/test';
import { expect } from '../../src/fixtures/index.js';
import { test } from '../../src/fixtures/index.js';

test.use({ storageState: { cookies: [], origins: [] } });

async function expectNoSeriousViolations(page: Page): Promise<void> {
  const results = await new AxeBuilder({ page }).analyze();
  const seriousViolations = results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  );

  expect(seriousViolations).toEqual([]);
}

test('home page has no serious accessibility violations @a11y @regression', async ({ page }) => {
  await page.goto('/');
  await expectNoSeriousViolations(page);
});

test('product page has no serious accessibility violations @a11y @regression', async ({
  page,
  productsApi,
}) => {
  const product = (await productsApi.list({ page: 1 })).data[0];
  await page.goto(`/product/${product.id}`);
  await expectNoSeriousViolations(page);
});

test('login page has no serious accessibility violations @a11y @regression', async ({ page }) => {
  await page.goto('/auth/login');
  await expectNoSeriousViolations(page);
});

test('checkout page has no serious accessibility violations @a11y @regression', async ({
  page,
}) => {
  await page.goto('/checkout');
  await expectNoSeriousViolations(page);
});
