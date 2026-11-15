const {test, expect} = require('@playwright/test');

test('First Playwright Test browser', async ({browser})=> {
    // Test code here
const context = await browser.newContext(); 
const page = await context.newPage(); 
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
console.log(await page.title());
});

test('First Playwright Test page', async ({page})=> {
    // Test code here
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
console.log(await page.title());    
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

const username = page.locator("#username");
await username.fill("rahulshettyacademy");

const password = page.locator("#password");
await password.fill("Learning@2000$3mK2)");

const signInButton = page.locator("#signInBtn");
await signInButton.click();
// await page.locator(':text-is("Empty username/password.")').textContent();
const errorMessage = await page.locator('[style*=block]').textContent();
console.log("Error Message on Login: ", errorMessage);

await password.fill("");
await password.fill("Learning@830$3mK2");
await signInButton.click();

const products = page.locator(':text("iphone X")');
//await expect(products).toHaveText("iphone X");
//await expect(products).toContainText("iphone X");

const productName = await page.locator('.card-body a');
await productName.first().waitFor();

//console.log (await productName.nth(1).textContent());
//console.log (await productName.first().textContent());
//console.log (await productName.last().textContent());

console.log (" All product Titles: ", await productName.allTextContents());

});

test('Dropdown Test page', async ({page})=> {
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

});