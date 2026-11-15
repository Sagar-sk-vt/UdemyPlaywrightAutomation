const {LoginPage} =  require('../PageObject/loginPage');
const {DashboardPage} =  require('../PageObject/DashboardPage');
const {CartPage} =  require('../PageObject/CartPage');
const {Checkoutpage} =  require('../PageObject/CheckoutPage');

class POManager {

constructor(page, expect) {
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