import { test, expect } from '@playwright/test';

// spec: test-plans/greenkart-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Storefront and product selection', () => {
  test('Adding a product from filtered search adds only the matching product', async ({ page }) => {
    // 1. Start with an empty cart and search for “Apple”.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    await page.getByRole('searchbox', { name: 'Search for Vegetables and' }).fill('Apple');
    await expect(page.getByRole('heading', { name: 'Apple - 1 Kg' })).toBeVisible();

    // 2. Add the visible product to the cart and open the cart preview.
    await page.getByRole('button', { name: 'ADD TO CART' }).click();
    await page.getByRole('link', { name: 'Cart' }).click();
    const cartItems = page.getByRole('listitem');
    await expect(cartItems).toHaveCount(1);
    await expect(cartItems.first()).toContainText('Apple - 1 Kg');
    await expect(cartItems.first()).toContainText('1 No.');
    await expect(cartItems.first()).toContainText('₹ 72');
  });
});
