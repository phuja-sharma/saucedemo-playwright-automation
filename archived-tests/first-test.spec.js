const {test, expect} = require(`@playwright/test`);

test(`Membuka halaman example domain`, async ({ page }) => {
    
    await page.goto(`https://example.com`);
    
    //Memeriksa judul halaman browser
    await expect(page).toHaveTitle(`Example Domain`);

    //Memeriksa apakah elemen heading terlihat di halaman website. 
    await expect(
        //Mencari elemen heading bernama Example Domain
        page.getByRole('heading', { name: 'Example Domain' })
    ).toBeVisible();

    
});