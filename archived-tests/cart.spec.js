const {test, expect} = require (`@playwright/test`);

const {
    addBackpackToCart,
    openCartAndVerifyBackpack,
    addBikeLightToCart,
    expectOneBadge,
    expectTwoBadge
} = require('../helpers/cartHelper');

//mengelompokkan test yang masih satu fitur
test.describe('cart feature', () => {

    //selalu dijalankan sebelum setiap test
    test.beforeEach(async ({page}) => {
        await page.goto(`https://www.saucedemo.com/`);

        //login
        await page.locator(`[data-test="username"]`).fill('standard_user');

        await page.locator(`[data-test="password"]`).fill('secret_sauce');

        await page.getByRole('button', {name: "Login"}).click();

        await expect(page).toHaveURL(/inventory.html/);
    })

    test('TC-CART-001 - menambahkan Backpack ke cart', async ({page}) => {

        await addBackpackToCart(page);

        await expectOneBadge(page);

        await openCartAndVerifyBackpack(page);

    });

    test('TC-CART-002 - hapus item dari cart', async ({page}) => {

        await addBackpackToCart(page);

        await expectOneBadge(page);

        await openCartAndVerifyBackpack(page);

        //hapus produk
        await page.locator(`[data-test="remove-sauce-labs-backpack"]`).click();

        await expect(
            page.locator(`[data-test="item-4-title-link"]`)
        ).not.toBeVisible();

        await expect(
            page.locator(`[data-test="shopping-cart-badge"]`)
        ).not.toBeVisible();
    });

    test('TC-CART-003 - tambah 2 produk', async ({page}) => {

        await addBackpackToCart(page);

        await expectOneBadge(page);

        await addBikeLightToCart(page);

        await expectTwoBadge(page);
    });
});

