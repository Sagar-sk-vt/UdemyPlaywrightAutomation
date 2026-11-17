const {test, expect} = require('@playwright/test');
const { isContext } = require('node:vm');

test('Client App End to End Test', async ({ page }) => {

    
    const email = "Ankitaanshika@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole('button').click();
    await page.waitForLoadState('networkidle'); 

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const ProductName = "ZARA COAT 3";
      
    await page.locator(".card-body").filter({hasText: ProductName})
    .getByRole('button', { name: 'Add To Cart' }).click();


    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})