class CartPage {

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.cartProduct = page.locator("h3:has-text('ZARA COAT 3')");
        this.checkoutButton = page.getByText('Checkout');
    }

    async verifyProductInCart() {
        await this.expect(this.cartProduct).toBeVisible();
        this.expect(this.cartProduct).toBeTruthy();
        //Checkout button click
        await this.checkoutButton.click();
    }
}
module.exports = { CartPage };