import { test, expect } from '@playwright/test';

// spec: test-plans/greenkart-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Storefront and product selection', () => {
  test('Search filters products and recovers from no matches', async ({ page }) => {
    // 1. Start on the fresh storefront and enter “Apple” in the product search field.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    const search = page.getByRole('searchbox', { name: 'Search for Vegetables and' });
    await search.fill('Apple');
    await expect(page.getByRole('heading', { name: 'Apple - 1 Kg' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Brocolli - 1 Kg' })).toHaveCount(0);

    // 2. Replace the query with a string that does not match any product.
    await search.fill('zzzz-not-found');
    await expect(page.getByRole('heading', { name: 'Sorry, no products matched' })).toBeVisible();

    // 3. Clear the query.
    await search.fill('');
    await expect(page.getByRole('heading', { name: 'Brocolli - 1 Kg' })).toBeVisible();
  });
});
