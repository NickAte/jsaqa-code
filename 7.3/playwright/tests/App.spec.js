const { test, expect } = require("@playwright/test");
const user = require('../user');

test.beforeEach(async ({ page }) => {
    await page.goto('https://netology.ru/?modal=sign_in');
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test.describe('Authorization on the website netology.ru ', () => {
    test('successful authorization', async ({ page }) => {
        await page.locator('[placeholder="Email"]').fill(user.userEmail);
        await page.locator('[placeholder="Пароль"]').fill(user.password);
        await page.locator('[data-testid="login-submit-btn"]').click();
        await expect(page.locator('h2')).toHaveText('Мои курсы и профессии');
        await page.screenshot({ path: './screenshot/ScreenSuccess.png' });
    });

    test('unsuccessful authorization', async ({ page }) => {
        await page.locator('[placeholder="Email"]').fill(user.invalidEmail);
        await page.locator('[placeholder="Пароль"]').fill(user.invalidPassword);
        await page.locator('[data-testid="login-submit-btn"]').click();
        await expect(page.locator('data-testid=login-error-hint')).toHaveText('Вы ввели неправильно логин или пароль');
        await page.screenshot({ path: './screenshot/ScreenError.png' });
    });
});