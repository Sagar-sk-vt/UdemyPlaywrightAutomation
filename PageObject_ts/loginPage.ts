import {Page, Expect, Locator} from '@playwright/test';
export class LoginPage {
    page: Page;
    siginButton: Locator;
    userName: Locator;
    password: Locator;

    constructor(page: Page) {
        this.page = page;
        this.siginButton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(email: string, password: string) {
        await this.userName.fill(email);
        await this.password.fill(password);
        await this.siginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { LoginPage };