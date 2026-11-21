import { test, expect } from '@playwright/test';

// spec: test-plans/greenkart-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Storefront and product selection', () => {
  test('Storefront loads with the product catalog and empty cart', async ({ page }) => {
    // 1. Open the storefront URL in a fresh browser session and wait for page load.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    await expect(page).toHaveTitle('GreenKart - veg and fruits kart');
    await expect(page.getByText('GREENKART', { exact: true })).toBeVisible();

    // 2. Inspect the header and product list.
    await expect(page.getByRole('searchbox', { name: 'Search for Vegetables and' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Top Deals' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'Cart' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 4 })).toHaveCount(30);
    await expect(page.getByRole('heading', { name: 'Brocolli - 1 Kg' })).toBeVisible();
    await expect(page.getByText('₹ 120', { exact: true })).toBeVisible();
    await expect(page.getByRole('spinbutton').first()).toHaveValue('1');
    await expect(page.getByRole('button', { name: 'ADD TO CART' }).first()).toBeVisible();
    await expect(page.getByRole('row', { name: /Items : 0/ })).toBeVisible();
    await expect(page.getByRole('row', { name: /Price : 0/ })).toBeVisible();
  });
});
