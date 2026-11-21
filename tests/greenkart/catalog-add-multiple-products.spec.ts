import { test, expect } from '@playwright/test';

// spec: test-plans/greenkart-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Storefront and product selection', () => {
  test('Add multiple products and calculate cart totals', async ({ page }) => {
    // 1. Start with an empty cart; add one unit of two different products with known displayed prices.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    const addToCart = page.getByRole('button', { name: 'ADD TO CART' });
    await addToCart.nth(0).click();
    await addToCart.nth(1).click();

    // 2. Open the cart preview and compare quantities and amounts with the catalog prices.
    await page.getByRole('link', { name: 'Cart' }).click();
    const cartItems = page.getByRole('listitem');
    await expect(cartItems).toHaveCount(2);
    await expect(cartItems.nth(0)).toContainText('Brocolli - 1 Kg');
    await expect(cartItems.nth(0)).toContainText('1 No.');
    await expect(cartItems.nth(0)).toContainText('₹ 120');
    await expect(cartItems.nth(1)).toContainText('Cauliflower - 1 Kg');
    await expect(cartItems.nth(1)).toContainText('1 No.');
    await expect(cartItems.nth(1)).toContainText('₹ 60');
    await expect(page.getByRole('row', { name: /Price : 180/ })).toBeVisible();
  });
});
