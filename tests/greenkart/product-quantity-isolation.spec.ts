import { test, expect } from '@playwright/test';

// spec: test-plans/greenkart-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Storefront and product selection', () => {
  test('Changing one product quantity does not affect other products', async ({ page }) => {
    // 1. Start with an empty cart and locate the Brocolli and Cauliflower cards.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    const quantities = page.getByRole('spinbutton');
    await expect(quantities.nth(0)).toHaveValue('1');
    await expect(quantities.nth(1)).toHaveValue('1');

    // 2. Increase Brocolli's quantity twice and inspect both product cards.
    await page.getByRole('link', { name: '+' }).first().click();
    await page.getByRole('link', { name: '+' }).first().click();
    await expect(quantities.nth(0)).toHaveValue('3');
    await expect(quantities.nth(1)).toHaveValue('1');

    // 3. Add both products to the cart.
    const addToCart = page.getByRole('button', { name: 'ADD TO CART' });
    await addToCart.nth(0).click();
    await addToCart.nth(1).click();
    await page.getByRole('link', { name: 'Cart' }).click();
    const cartItems = page.getByRole('listitem');
    await expect(cartItems).toHaveCount(2);
    await expect(cartItems.nth(0)).toContainText('Brocolli - 1 Kg');
    await expect(cartItems.nth(0)).toContainText('3 Nos.');
    await expect(cartItems.nth(0)).toContainText('₹ 360');
    await expect(cartItems.nth(1)).toContainText('Cauliflower - 1 Kg');
    await expect(cartItems.nth(1)).toContainText('1 No.');
    await expect(cartItems.nth(1)).toContainText('₹ 60');
    await expect(page.getByRole('row', { name: /Price : 420/ })).toBeVisible();
  });
});
