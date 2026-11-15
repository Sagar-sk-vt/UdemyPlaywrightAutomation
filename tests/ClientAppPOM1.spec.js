const { test, expect } = require('@playwright/test');
const { isContext } = require('node:vm');
const { POManager } = require('../PageObject/POManager');
const dataset = JSON.parse(JSON.stringify(require('../Utils/orderPlaceTestData.json')));

test.only('Client App login', async ({ page }) => {
    
    const poManager = new POManager(page, expect);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage();

    // Login Page 
    await loginPage.goTo();
    await loginPage.validLogin(dataset.email, dataset.password);

    // Dashboard page
    await dashboardPage.SearchProduct(dataset.ProductName);
    await dashboardPage.goToCart();

    // Check if the product is in the cart
    await cartPage.verifyProductInCart();

    // Checkout page with order placement operation 
    await checkoutPage.selectCountryFromDropdown();

    // Place Order button click
    await checkoutPage.placeOrder(dataset.email);

    // Order Confirmation page
    const SuccessMessage = page.locator('.hero-primary');
    await expect(SuccessMessage).toHaveText(" Thankyou for the order. ");

    // Order ID
    const orderID = page.locator('label.ng-star-inserted');
    const orderIDText = await orderID.textContent();
    console.log("Order ID:", orderIDText);

    //Open my orders page

    const OrdersButton = page.getByRole('button', { name: 'ORDERS' });
    await OrdersButton.click();

    // Read the order ID from the orders page
    const table = page.locator("tbody");
    await table.waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderIDText.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }

    }
    // Read the order ID from the order details page 
    const orderDetailsId = page.locator(".col-text");
    // await expect(orderDetailsId).toHaveText(orderIDText);
    expect(orderIDText.includes(await orderDetailsId.textContent())).toBeTruthy();
    console.log("Order ID on Order Details page:", await orderDetailsId.textContent());
});