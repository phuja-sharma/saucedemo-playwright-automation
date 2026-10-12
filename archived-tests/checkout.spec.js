const {test, expect} = require ('@playwright/test');

const {
    addBackpackToCart,
    openCartAndVerifyBackpack
} = require ('../helpers/cartHelper');

const {
    checkoutStepOneSuccess,
    checkoutWithEmptyFirstName,
    completeCheckout
} = require ('../helpers/checkoutHelper');


test.describe('Checkout Feature', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`https://www.saucedemo.com/`);

        await page.locator('[data-test="username"]').fill('standard_user');

        await page.locator('[data-test="password"]').fill('secret_sauce');

        await page.getByRole('button', {name: "Login"}).click();

        await expect(page).toHaveURL(/inventory.html/);

    });

    test('TC-CHECKOUT-001 - checkout berhasil dengan data valid', async ({page}) => {
        await addBackpackToCart(page);

        await openCartAndVerifyBackpack(page);

        await page.locator('[data-test="checkout"]').click();

        await checkoutStepOneSuccess(page);

        await completeCheckout(page);
    });

    test('TC-CHECKOUT-002 - checkout gagal ketika first name kosong', async ({page}) => {
        await addBackpackToCart(page);

        await openCartAndVerifyBackpack(page);

        await page.locator('[data-test="checkout"]').click();

        await checkoutWithEmptyFirstName(page);
    });

    test('TC-CHECKOUT-003 - checkout gagal ketika postal code dikosongkan', async ({page}) => {
        await addBackpackToCart(page);

        await openCartAndVerifyBackpack(page);

        await page.locator('[data-test="checkout"]').click();

        await page.locator(`[data-test="firstName"]`).fill('John');

        await page.locator(`[data-test="lastName"]`).fill('Black');

        await page.locator(`[data-test="continue"]`).click();

        await expect(
            page.locator(`[data-test="error"]`)
        ).toHaveText('Error: Postal Code is required');
    })
});
