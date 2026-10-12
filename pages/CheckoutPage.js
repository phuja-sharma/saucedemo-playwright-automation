class CheckoutPage {
    constructor(page) {
        this.page = page;
    }

    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.page.locator(
            '[data-test="firstName"]'
        ).fill(firstName);

        await this.page.locator(
            '[data-test="lastName"]'
        ).fill(lastName);

        await this.page.locator(
            '[data-test="postalCode"]'
        ).fill(postalCode);
    }

    async clickContinue() {
        await this.page.getByRole('button', 
            { name: 'Continue'}
        ).click();

        //await expect ... di test
    }

    async clickFinish() {
        await this.page.getByRole('button',
            { name: 'Finish'}
        ).click();
    }
}

module.exports = CheckoutPage;