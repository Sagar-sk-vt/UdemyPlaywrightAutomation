class Checkoutpage {

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.selectCountry = page.getByRole('textbox', { name: 'Select Country' });
        this.countryOption = page.locator(".ta-results");
        this.userEmail = page.locator("label[type='text']");
        this.PlaceOrderButton = page.locator('a:has-text("PLACE ORDER")');
    }

    async selectCountryFromDropdown() {
        // Checkout page 
        await this.selectCountry.pressSequentially("Ind", { delay: 100 });

        // Wait for the dropdown to appear and select the country
        await this.countryOption.waitFor();

        const countryCount = await this.countryOption.locator("button").count();
        // await countryCount.count();

        for (let i = 0; i < countryCount; i++) {
            const CountryText = await this.countryOption.locator("button").nth(i).textContent();
            if (CountryText === " India") {
                await this.countryOption.locator("button").nth(i).click();
                break;
            }
        }
    }

    async placeOrder(email) {
        // Email veificiation
        await this.expect(this.userEmail).toHaveText(email);
        // Place Order button click
        await this.PlaceOrderButton.click();

    }
}
module.exports = { Checkoutpage };