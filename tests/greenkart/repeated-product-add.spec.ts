import { test, expect } from '@playwright/test';

// spec: test-plans/greenkart-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Storefront and product selection', () => {
  test('Repeatedly adding the same product updates its cart quantity and total', async ({ page }) => {
    // 1. Start with an empty cart and add one Brocolli unit to the cart.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    const addToCart = page.getByRole('button', { name: 'ADD TO CART' }).first();
    await addToCart.click();
    await expect(page.getByRole('row', { name: /Items : 1/ })).toBeVisible();
    await expect(page.getByRole('row', { name: /Price : 120/ })).toBeVisible();

    // 2. Add one more Brocolli unit using the same product card's Add to Cart control.
    await addToCart.click();
    await expect(page.getByRole('row', { name: /Items : 1/ })).toBeVisible();
    await expect(page.getByRole('row', { name: /Price : 240/ })).toBeVisible();

    // 3. Open the cart preview.
    await page.getByRole('link', { name: 'Cart' }).click();
    const cartItems = page.getByRole('listitem');
    await expect(cartItems).toHaveCount(1);
    await expect(cartItems.first()).toContainText('Brocolli - 1 Kg');
    await expect(cartItems.first()).toContainText('2 Nos.');
    await expect(cartItems.first()).toContainText('₹ 240');
  });
});
