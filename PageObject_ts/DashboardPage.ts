import {Page, Expect, Locator} from '@playwright/test';
export class DashboardPage {
    page: Page;
    products: Locator;
    productsText: Locator;
    cart: Locator;
    waitForCartPage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("//button[@routerlink='/dashboard/cart']");
        this.waitForCartPage = page.locator("div li");

    }

    async SearchProduct(productName: string) {
        const titles = await this.productsText.allTextContents();
        console.log(titles);
        const ProductCount = await this.products.count();
        console.log("Total Products:", ProductCount);

        for (let i = 0; i < ProductCount; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async goToCart() {
        await this.cart.click();
        await this.waitForCartPage.first().waitFor();
    }
}
module.exports = { DashboardPage };