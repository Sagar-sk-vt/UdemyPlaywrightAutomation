const { test, expect } = require('@playwright/test');

test('Abort Network call', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    //page.route('**/*.{jpg,png,jpeg}', route => route.abort());
    page.on('request', request => console.log("Request : ", request.url()));
    page.on('response', response => console.log("Response : ",response.url(), response.status()));

    // Test code here
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    const username = page.locator("#username");
    const password = page.locator("#password");
    const signInButton = page.locator("#signInBtn");

    // Dropdown Test
    const dropDown = page.locator("select.form-control");

    // Test steps
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await dropDown.selectOption("consult");
    await signInButton.click();

    const products = page.locator(':text("iphone X")');
    const productName = await page.locator('.card-body a');
    await productName.first().waitFor();
    //await page.pause();
    console.log("All product Titles: ", await productName.allTextContents());

})