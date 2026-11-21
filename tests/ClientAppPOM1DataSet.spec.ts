//const { test, expect } = require('@playwright/test');
import {test, expect} from '@playwright/test';
//const {customtest} = require('../Utils/test-base');
import {customTest} from '../Utils_ts/test-base';
//const { isContext } = require('node:vm');
import {isContext} from 'node:vm';
//const { POManager } = require('../PageObject/POManager');
import { POManager} from '../PageObject_ts/POManager';
const dataset = JSON.parse(JSON.stringify(require('../Utils/orderPlaceTestData.json')));

for (const data of dataset) 
    {
test(`Client App login ${data.ProductName}`, async ({ page }) => {
    
    const poManager = new POManager(page, expect);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage();   

    // Login Page 
    await loginPage.goTo();
    await loginPage.validLogin(data.email, data.password);

    // Dashboard page
    await dashboardPage.SearchProduct(data.ProductName);
    await dashboardPage.goToCart();

    // Check if the product is in the carta
    await cartPage.verifyProductInCart();

    // Checkout page with order placement operation 
    await checkoutPage.selectCountryFromDropdown();

    // Place Order button click
    await checkoutPage.placeOrder(data.email);

    // Order Confirmation page
    const SuccessMessage = page.locator('.hero-primary');
    await expect(SuccessMessage).toHaveText(" Thankyou for the order. ");

    // Order ID
    const orderID = page.locator('label.ng-star-inserted');
    let orderIDText:any;
    orderIDText = await orderID.textContent();
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
}


customTest(`Client App login`, async ({ page, testDataForOrder }) => {
    
    const poManager = new POManager(page, expect);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage();   

    // Login Page 
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.email, testDataForOrder.password);

    // Dashboard page
    await dashboardPage.SearchProduct(testDataForOrder.ProductName);
    await dashboardPage.goToCart();

    // Check if the product is in the cart
    await cartPage.verifyProductInCart();

    // Checkout page with order placement operation 
    await checkoutPage.selectCountryFromDropdown();

    // Place Order button click
    await checkoutPage.placeOrder(testDataForOrder.email);
    console.log("I am running from test file and testDataForOrder is:", testDataForOrder);

    // Order Confirmation page
    const SuccessMessage = page.locator('.hero-primary');
    await expect(SuccessMessage).toHaveText(" Thankyou for the order. ");

    // Order ID
   let orderIDText:any;
    const orderID = page.locator('label.ng-star-inserted');
    orderIDText = await orderID.textContent();
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