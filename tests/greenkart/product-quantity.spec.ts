import { test, expect } from '@playwright/test';

// spec: test-plans/greenkart-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Storefront and product selection', () => {
  test('Product quantity controls respect the lower bound and set cart quantity', async ({ page }) => {
    // 1. On the fresh storefront, locate Brocolli and note its default quantity.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    const quantity = page.getByRole('spinbutton').first();
    await expect(quantity).toHaveValue('1');

    // 2. Click the decrement control once while quantity is 1.
    await page.getByRole('link', { name: '–' }).first().click();
    await expect(quantity).toHaveValue('1');

    // 3. Click the increment control once and add the product to the cart.
    await page.getByRole('link', { name: '+' }).first().click();
    await expect(quantity).toHaveValue('2');
    await page.getByRole('button', { name: 'ADD TO CART' }).first().click();

    // 4. Open the cart preview.
    await expect(page.getByRole('row', { name: /Price : 240/ })).toBeVisible();
    await page.getByRole('link', { name: 'Cart' }).click();
    const cartItem = page.getByRole('listitem');
    await expect(cartItem).toContainText('Brocolli - 1 Kg');
    await expect(cartItem).toContainText('2 Nos.');
    await expect(cartItem).toContainText('₹ 240');
  });
});
