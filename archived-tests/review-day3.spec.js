const { test, expect } = require('@playwright/test');

test(`gabungan login-add cart-cek badge`, async ({ page }) => {

    await page.goto(`https://www.saucedemo.com/`);

    await page.locator(`[data-test="username"]`).fill('standard_user');

    await page.locator(`#password`).fill(`secret_sauce`);

    await page.locator(`#login-button`).click();

    await page.locator(
        `[data-test="add-to-cart-sauce-labs-backpack"]`
    ).click();

    await expect(
        page.locator(`[data-test="shopping-cart-badge"]`)
    ).toHaveText('1');

    await page.locator(`[data-test="shopping-cart-link"]`).click();

    await expect(page).toHaveURL(/cart.html/);

    await expect(
        page.locator(`[data-test="item-4-title-link"]`)
    ).toHaveText('Sauce Labs Backpack');
});