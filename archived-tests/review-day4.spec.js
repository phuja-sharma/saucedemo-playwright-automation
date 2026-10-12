const {test, expect} = require (`@playwright/test`);

test('review hari ke-4', async ({page}) => {
    await page.goto(`https://www.saucedemo.com/`);

    await page.locator(`[data-test="username"]`).fill('standard_user');

    await page.locator(`[data-test="password"]`).fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory.html/);

    await expect(
        page.getByText('Sauce Labs Backpack')
    ).toBeVisible();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(
        page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('1');
});