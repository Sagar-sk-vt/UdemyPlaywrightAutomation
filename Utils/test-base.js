const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testDataForOrder :
    {
    email : "Ankitaanshika@gmail.com",
    password : "Iamking@000",
    ProductName : "ZARA COAT 3"
    }
})