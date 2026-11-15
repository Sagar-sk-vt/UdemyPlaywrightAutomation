const { test, expect, request } = require('@playwright/test');
const { customtest } = require("../Utils/fixtures.js");

customtest('Fixture demo', async ({ authenticatedPage, createOrder }) => {

    await authenticatedPage.goto("https://rahulshettyacademy.com/client");

    //Open my orders page
    const OrdersButton = authenticatedPage.getByRole('button', { name: 'ORDERS' });
    await OrdersButton.click();

    // Read the order ID from the orders page
    const table = authenticatedPage.locator("tbody");
    await table.waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
    
})