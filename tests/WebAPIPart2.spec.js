const {test, expect} = require("@playwright/test");
let webContext;
const email = "Ankitaanshika@gmail.com";

test.beforeAll(async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});

}
)

test('Client App login', async ({}) => {

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
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