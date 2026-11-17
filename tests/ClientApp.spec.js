const {test, expect} = require('@playwright/test');
const { isContext } = require('node:vm');

test('Radio button Playwright Test page', async ({page})=> {
    // Test code here
   // Test code here
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

const username = page.locator("#username");
const password = page.locator("#password");
const signInButton = page.locator("#signInBtn");

// Dropdown Test
const dropDown = page.locator("select.form-control");
// Radio Button Test
const UserTypeRaddioButton = page.locator(".radiotextsty");

//Popup confimation
const UserAccessPopup = page.locator("#okayBtn");

// Checkbox 
const AgreeCheckbox = page.locator("#terms");

// Test steps
await username.fill("rahulshettyacademy");
await password.fill("Learning@830$3mK2");

// Dropdown Test
await dropDown.selectOption("consult");
// await signInButton.click();

// Radio Button Test
await UserTypeRaddioButton.last().click();
await UserAccessPopup.click();
console.log(await UserTypeRaddioButton.last().isChecked());
await expect(UserTypeRaddioButton.last()).toBeChecked();

// Agree Checkbox Test
await AgreeCheckbox.click();    
await expect(AgreeCheckbox).toBeChecked();

await AgreeCheckbox.uncheck();
// expect(await AgreeCheckbox).isChecked().toBeFalsy();
 await expect(AgreeCheckbox).not.toBeChecked();

// await page.pause();
// await signInButton.click();
});

test('Blinking Playwright Test page', async ({page})=> {
    // Test code here
   // Test code here
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

const BlinkingTest = page.locator("[href*='documents-request']");
await expect(BlinkingTest).toHaveAttribute("class", "blinkingText");

});

test('Window Handle Playwright Test page', async ({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage();
    // Test code here
   // Test code here
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

const username = page.locator("#username");

const BlinkingTest = page.locator("[href*='documents-request']");
await expect(BlinkingTest).toHaveAttribute("class", "blinkingText");

const [NewPage] = await Promise.all([
context.waitForEvent('page'),
BlinkingTest.click(),    
])

const TextOnNewPage = await NewPage.locator(".red").textContent();
const ArrayText = TextOnNewPage.split("@");
const Domain = ArrayText[1].split(" ")[0];
console.log(Domain);

await username.fill(Domain);
console.log(await username.inputValue());
console.log(await username.textContent);

});


test('Client App login', async ({ page }) => {

    
    const email = "Ankitaanshika@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const AllProducts = page.locator(".card-body");
    const ProductName = "ZARA COAT 3";
    const ProductCount = await AllProducts.count(); 

    for (let i =0; i<ProductCount; i++){
        if (await AllProducts.nth(i).locator("b").textContent() === ProductName){
            await AllProducts.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    // Cart Page
    const cartButton = page.locator("//button[@routerlink='/dashboard/cart']");
    await cartButton.click();
    const waitForCartPage = page.locator("div li");
    await waitForCartPage.first().waitFor();

    // Check if the product is in the cart
    const cartProduct = page.locator("h3:has-text('ZARA COAT 3')");
    await expect(cartProduct).toBeVisible();
   // await expect(cartProduct).isVisible();
    expect (cartProduct).toBeTruthy();

   //Checkout button click
   const checkoutButton = page.getByText('Checkout'); 
   await checkoutButton.click();

   // Checkout page 
   const selectCountry = page.getByRole('textbox', { name: 'Select Country' });
   await selectCountry.pressSequentially("Ind", {delay: 100});

   // Wait for the dropdown to appear and select the country
   const countryOption = page.locator(".ta-results");
   await countryOption.waitFor();   
   
   const countryCount = await countryOption.locator("button").count();
  // await countryCount.count();

    for (let i=0; i<countryCount; i++){
       const CountryText = await countryOption.locator("button").nth(i).textContent();
        if(CountryText === " India"){
            await countryOption.locator("button").nth(i).click();
            break;
        }
    }

    // Email veificiation
    const userEmail = page.locator("label[type='text']");
    await expect(userEmail).toHaveText(email);

    // Place Order button click
    const PlaceOrderButton = page.locator('a:has-text("PLACE ORDER")');
    await PlaceOrderButton.click();

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

        for(let i=0; i< await rows.count(); i++){
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderIDText.includes(rowOrderId))
            {
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