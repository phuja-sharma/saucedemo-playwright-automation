const { expect } = require("@playwright/test");

async function checkoutStepOneSuccess(page) {
    await expect(page).toHaveURL(/checkout-step-one.html/);

    await page.locator('[data-test="firstName"]').fill('John');

    await page.locator('[data-test="lastName"]').fill('Smith');

    await page.locator('[data-test="postalCode"]').fill('1010');

    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-two.html/);
   
};

async function checkoutWithEmptyFirstName(page) {
    await expect(page).toHaveURL(/checkout-step-one.html/);

    await page.locator('[data-test="lastName"]').fill('Smith');

    await page.locator('[data-test="postalCode"]').fill('1010');

    await page.locator('[data-test="continue"]').click();
    
    await expect(
        page.locator('[data-test="error"]')
    ).toHaveText('Error: First Name is required');
};

async function completeCheckout(page) {
    await expect(page).toHaveURL(/checkout-step-two.html/);

    await expect(
        page.locator('[data-test="inventory-item-name"]')
    ).toHaveText('Sauce Labs Backpack');

    await page.locator('[data-test="finish"]').click();

    await expect(page).toHaveURL(/checkout-complete.html/);

    await expect(
        page.locator('[data-test="complete-header"]')
    ).toHaveText('Thank you for your order!');
    
};

module.exports = {
    checkoutStepOneSuccess,
    checkoutWithEmptyFirstName,
    completeCheckout
};