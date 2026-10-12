class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username, password) {
        await this.page.locator('[data-test="username"]').fill(username);
        await this.page.locator('[data-test="password"]').fill(password);
        await this.page.getByRole('button', {name: 'Login'}).click();
    }
}

module.exports = LoginPage;