const { test, expect } = require("@playwright/test");

const LoginPage = require('../pages/LoginPage');

const InventoryPage = require('../pages/InventoryPage');

const CartPage = require('../pages/CartPage');

test('Latihan POM', async ({page}) => {
    
    const loginPage = new LoginPage(page);

    //login
    await loginPage.goto();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);

    const inventoryPage = new InventoryPage(page);

    //add backpack
    await inventoryPage.addBackpackToCart();

    //add bike light
    await inventoryPage.addBikeLightToCart();

    await expect(
        page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('2');

    const cartPage = new CartPage(page);

    //open cart
    await cartPage.openCart();

    await expect(page).toHaveURL(/cart.html/);

    //remove backpack
    await cartPage.removeBackpack();

    await expect(
        page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('1');
});