const {test , expect, request} = require('@playwright/test');
const {APIUtils} = require('../Utils/APIUtils');

const loginPayload = {userEmail:"Ankitaanshika@gmail.com",userPassword:"Iamking@000"};
const orderPayload = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
const fakePayLoadOrder = {data:[],message:"No Orders"}
let response;

test.beforeAll(async()=>
    {
    //create context
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    })

test('Client Web App Order placement', async ({ page }) => {
        const email = "Ankitaanshika@gmail.com";
        await page.addInitScript(value => {
        window.localStorage.setItem("token", value);
        }, response.token);  

    await page.goto("https://rahulshettyacademy.com/client");
   const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    //route the payload
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
       async route =>
        {
            const response = await page.request.fetch(route.request()); 
            let body = JSON.stringify(fakePayLoadOrder);  
            route.fulfill(
            {
                response,
                body,
            }
         )   
        }
    )
    //Open my orders page
    const OrdersButton = page.getByRole('button', { name: 'ORDERS' });
    await OrdersButton.click();
    // Read the order ID from the orders page
    const table = page.locator("tbody");
    page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log("text: ", await page.locator(".mt-4").textContent());
});