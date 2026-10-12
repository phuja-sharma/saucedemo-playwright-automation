const {expect} = require('@playwright/test');

//dipakai ulang saat diperlukan
async function addBackpackToCart(page) {
    //add Sauce Labs Backpack
    await page.locator(`[data-test="add-to-cart-sauce-labs-backpack"]`).click();
   
}

async function expectOneBadge(page) {
    await expect(
        page.locator(`[data-test="shopping-cart-badge"]`)
    ).toHaveText('1'); 
}

async function expectTwoBadge(page) {
    await expect(
        page.locator(`[data-test="shopping-cart-badge"]`)
    ).toHaveText('2'); 
}

async function openCartAndVerifyBackpack(page) {
    //buka cart
    await page.locator(`[data-test="shopping-cart-link"]`).click();

    await expect(page).toHaveURL(/cart.html/);

    await expect(
        page.locator(`[data-test="item-4-title-link"]`)
    ).toHaveText('Sauce Labs Backpack');    
}

async function addBikeLightToCart(page) {
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
}

module.exports = {
    addBackpackToCart,
    openCartAndVerifyBackpack,
    addBikeLightToCart,
    expectOneBadge,
    expectTwoBadge
};