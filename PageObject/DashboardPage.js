class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("//button[@routerlink='/dashboard/cart']");
        this.waitForCartPage = page.locator("div li");

    }

    async SearchProduct(productName) {
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