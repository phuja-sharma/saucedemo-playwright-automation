class InventoryPage {
    constructor(page) {
        this.page = page;
    }

    async addBackpackToCart() {
        await this.page.locator(
            '[data-test="add-to-cart-sauce-labs-backpack"]'
        ).click();
    }

    async addBikeLightToCart() {
        await this.page.locator(
            '[data-test="add-to-cart-sauce-labs-bike-light"]'
        ).click();
    }
}

module.exports = InventoryPage;