const {test, expect} = require (`@playwright/test`);

test(`tes login`, async ({page}) => {
    await page.goto(`https://www.saucedemo.com/`);

    await page.locator('#login-button').click();

    await expect(
        page.locator('[data-test="error"]')
    ).toHaveText("Epic sadface: Username is required");
});