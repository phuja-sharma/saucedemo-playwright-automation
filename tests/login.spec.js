const {test, expect} = require(`@playwright/test`);

test.describe(`Login Feature`, () =>{

    test.beforeEach(async ({page}) => {
        await page.goto(`https://www.saucedemo.com/`);
    });

    test(`TC-LOGIN-001 - tes login kredensial valid`, async ({page}) => {

        await page.locator(`#user-name`).fill(`standard_user`);

        await page.locator(`#password`).fill(`secret_sauce`);

        await page.locator(`#login-button`).click();

        await expect(page).toHaveURL(/inventory.html/);
    });

    test(`TC-LOGIN-002 - tes login dengan password salah`, async ({page}) => {

        await page.locator(`#user-name`).fill(`standard_user`);

        await page.locator(`#password`).fill(`password_salah`);

        await page.locator(`#login-button`).click();

        await expect(
            page.locator(`[data-test="error"]`)
        ).toHaveText("Epic sadface: Username and password do not match any user in this service");
    });

    test(`TC-LOGIN-003 - tes login dengan username kosong`, async ({page}) => {

        await page.locator(`#password`).fill(`secret_sauce`);

        await page.locator(`#login-button`).click();

        await expect(page).toHaveURL('https://www.saucedemo.com/');

        await expect(
            page.locator(`[data-test="error"]`)
        ).toHaveText("Epic sadface: Username is required");
    });

    test(`TC-LOGIN-004 - tes login dengan password kosong`, async ({page}) => {

        await page.locator(`#user-name`).fill(`standard_user`);

        await page.locator(`#login-button`).click();

        await expect(page).toHaveURL('https://www.saucedemo.com/');

        await expect(
            page.locator(`[data-test="error"]`)
        ).toHaveText("Epic sadface: Password is required");
    });
})


