const { test, expect } = require("@playwright/test");

const LoginPage = require('../pages/LoginPage');

const InventoryPage = require('../pages/InventoryPage');

const CartPage = require('../pages/CartPage');

test.describe('latihan cart pom', () => {

    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory.html/);
    });

    test('TC-CART-001 - menambahkan Backpack ke cart', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.addBackpackToCart();

        await expect(
            page.locator('[data-test="shopping-cart-badge"]')
        ).toHaveText('1');

        await cartPage.openCart();

        await expect(page).toHaveURL(/cart.html/);

        await expect(
            page.locator('[data-test="item-4-title-link"]')
        ).toBeVisible();
    });

    test('TC-CART-002 - hapus item dari cart', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.addBackpackToCart();

        await expect(
            page.locator('[data-test="shopping-cart-badge"]')
        ).toHaveText('1');

        await cartPage.openCart();

        await expect(page).toHaveURL(/cart.html/);

        await expect(
            page.locator('[data-test="item-4-title-link"]')
        ).toBeVisible();

        await cartPage.removeBackpack();

        await expect(
            page.locator('[data-test="item-4-title-link"]')
        ).not.toBeVisible();

        await expect(
            page.locator('[data-test="shopping-cart-badge"]')
        ).not.toBeVisible();
    });
});