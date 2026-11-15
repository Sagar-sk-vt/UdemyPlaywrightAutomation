//const {LoginPage} =  require('../PageObject/loginPage');
import {LoginPage} from '../PageObject_ts/loginPage';
//const {DashboardPage} =  require('../PageObject/DashboardPage');
import {DashboardPage} from '../PageObject_ts/DashboardPage';
//const {CartPage} =  require('../PageObject/CartPage');
import {CartPage} from '../PageObject_ts/CartPage';
//const {Checkoutpage} =  require('../PageObject/CheckoutPage');
import {Checkoutpage} from '../PageObject_ts/CheckoutPage';
import {Page, Expect} from '@playwright/test';


export class POManager {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    checkoutPage: Checkoutpage;
    page: Page;
    expect: Expect;

constructor(page: Page, expect: Expect) {
this.page = page;
this.expect = expect;
this.loginPage = new LoginPage(this.page);
this.dashboardPage = new DashboardPage(this.page);
this.cartPage = new CartPage(this.page, this.expect);
this.checkoutPage = new Checkoutpage(this.page, this.expect);

}

getLoginPage() {
    return this.loginPage;
}

getDashboardPage() {
    return this.dashboardPage;
}

getCartPage() {
    return this.cartPage;
}

getCheckoutPage() {
    return this.checkoutPage;
}
}
module.exports = { POManager };