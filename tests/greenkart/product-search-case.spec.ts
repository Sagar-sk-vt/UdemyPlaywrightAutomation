import { test, expect } from '@playwright/test';

// spec: test-plans/greenkart-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Storefront and product selection', () => {
  test('Product search handles different letter casing', async ({ page }) => {
    // 1. Start on the fresh storefront and search for “apple” in lowercase.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    const search = page.getByRole('searchbox', { name: 'Search for Vegetables and' });
    await search.fill('apple');
    await expect(page.getByRole('heading', { name: 'Apple - 1 Kg' })).toBeVisible();

    // 2. Replace the query with “APPLE” in uppercase.
    await search.fill('APPLE');
    await expect(page.getByRole('heading', { name: 'Apple - 1 Kg' })).toBeVisible();
  });
});
