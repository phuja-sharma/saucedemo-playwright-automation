const { test, expect } = require("@playwright/test");

const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

async function goToCheckoutStepOne(page) {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await expect(page).toHaveURL(/inventory.html/);

    await inventoryPage.addBackpackToCart();

    await expect(
        page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('1');

    await cartPage.openCart();

    await expect(page).toHaveURL(/cart.html/);

    await expect(
        page.locator('[data-test="item-4-title-link"]')
    ).toHaveText('Sauce Labs Backpack')

    await cartPage.clickCheckout();

    await expect(page).toHaveURL(/checkout-step-one.html/);
    
}

test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login('standard_user', 'secret_sauce');
});

test('TC-CHECKOUT-001 - checkout berhasil dengan data valid', async ({page}) => {
    const checkoutPage = new CheckoutPage(page);

    await goToCheckoutStepOne(page);

    await checkoutPage.fillCheckoutInformation(
        'Jhon',
        'Bob',
        '1234'
    );

    await checkoutPage.clickContinue();

    await expect(page).toHaveURL(/checkout-step-two.html/);

    await expect(
        page.locator('[data-test="inventory-item-name"]')
    ).toHaveText('Sauce Labs Backpack');

    await checkoutPage.clickFinish();

    await expect(page).toHaveURL(/checkout-complete.html/);

    await expect(
        page.locator('[data-test="complete-header"]')
    ).toHaveText('Thank you for your order!');
});

test('TC-CHECKOUT-002 - checkout gagal ketika last name kosong', async ({page}) => {
    const checkoutPage = new CheckoutPage(page);

    await goToCheckoutStepOne(page);

    await checkoutPage.fillCheckoutInformation(
        'John',
        '',
        '11234'
    );

    await checkoutPage.clickContinue();

    await expect(
        page.locator('[data-test="error"]')
    ).toHaveText('Error: Last Name is required');
})

test('TC-CHECKOUT-003 - Checkout gagal ketika semua field informasi dikosongkan', async ({page}) => {
    const checkoutPage = new CheckoutPage(page);
    
    await goToCheckoutStepOne(page);

    await checkoutPage.fillCheckoutInformation(
        '',
        '',
        ''
    );

    await checkoutPage.clickContinue();

    await expect(
        page.locator('[data-test="error"]')
    ).toHaveText('Error: First Name is required');

    await expect(page).toHaveURL(/checkout-step-one.html/);    
});