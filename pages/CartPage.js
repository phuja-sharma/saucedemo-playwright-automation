class CartPage {
    constructor(page) {
        this.page = page;
    }

    async openCart() {
        await this.page.locator(
            '[data-test="shopping-cart-link"]'
        ).click();

        //await expect ... di test
    }

    async removeBackpack() {
        await this.page.locator(
            '[data-test="remove-sauce-labs-backpack"]'
        ).click();

        //await expect ... di test
    }

    async clickCheckout() {
        await this.page.getByRole(
            'button', { name: 'Checkout'}
        ).click();

        //await expect ... di test
    }
}

module.exports = CartPage;