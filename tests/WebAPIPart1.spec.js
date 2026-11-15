const { test, expect, request } = require('@playwright/test');

const loginPayload = { userEmail: "Ankitaanshika@gmail.com", userPassword: "Iamking@000" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
let token;
let orderId;

test.beforeAll(async () => {
    //Login API
    const apiContext = await request.newContext();
    const loginResponce = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        })
    expect(loginResponce.ok()).toBeTruthy();
    const loginResponceJson = await loginResponce.json();
    token = loginResponceJson.token;
    userId = loginResponceJson.userId;
    console.log(token);
    console.log(userId);

    // Order Placment API   
    const OrderResponce = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                "Authorization": token,
                "Content-type": "application/json"
            },
        })
    const orderResponceJson = await OrderResponce.json();
    orderId = orderResponceJson.orders[0];
    console.log(orderId);
    console.log(orderResponceJson);
})



test('Client Web App Order placement', async ({ page }) => {

    const email = "Ankitaanshika@gmail.com";
    await page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    //Open my orders page
    const OrdersButton = page.getByRole('button', { name: 'ORDERS' });
    await OrdersButton.click();

    // Read the order ID from the orders page
    const table = page.locator("tbody");
    await table.waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    // Read the order ID from the order details page 
    const orderDetailsId = page.locator(".col-text");
    // await expect(orderDetailsId).toHaveText(orderId);
    expect(orderId.includes(await orderDetailsId.textContent())).toBeTruthy();
    console.log("Order ID on Order Details page:", await orderDetailsId.textContent());
});