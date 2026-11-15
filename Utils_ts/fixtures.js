const base = require('@playwright/test');
const {APIUtils} = require('./APIUtils.js');
const {request} = require('@playwright/test');
const loginPayload = {userEmail:"Ankitaanshika@gmail.com",userPassword:"Iamking@000"};
const orderPayload = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]}

exports.customtest = base.test.extend(
    {
        authenticatedPage: async ({ browser }, use) => {
            const email = "Ankitaanshika@gmail.com";
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto("https://rahulshettyacademy.com/client");
            await page.locator("#userEmail").fill(email);
            await page.locator("#userPassword").fill("Iamking@000");
            await page.locator("[value='Login']").click();
            await page.waitForLoadState('networkidle');
            await use(page);
            //TearDown
            await context.close();
        },

        createOrder: async ({ }, use) => {
            const apiContext = await request.newContext();
            const apiUtils = new APIUtils(apiContext, loginPayload);
            const response = await apiUtils.createOrder(orderPayload);
            await use(response);        
            await apiContext.dispose();            
        }
    }
)