import {test as baseTest} from '@playwright/test';

interface TestDataForOrder {
    email: string;
    password: string;
    ProductName: string;
}

export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}> (
    {
    testDataForOrder :
    {
    email : "Ankitaanshika@gmail.com",
    password : "Iamking@000",
    ProductName : "ZARA COAT 3"
    }
}
)