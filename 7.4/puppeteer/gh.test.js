let page;

beforeEach(async () => {
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
    page.close();
});

describe("Github page tests", () => {
    beforeEach(async () => {
        await page.goto("https://github.com/team");
    });

    test("The h1 header content'", async () => {
        const firstLink = await page.$("header div div a");
        await firstLink.click();
        await page.waitForSelector('h1', {
            timeout: 60000
        });
        const title2 = await page.title();
        expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
    });

    test("The first link attribute", async () => {
        const actual = await page.$eval("a", link => link.getAttribute('href', {
            timeout: 60000
        }));
        expect(actual).toEqual("#start-of-content");
    });

    test("The page contains Sign in button", async () => {
        const btnSelector = ".btn-large-mktg.btn-mktg";
        await page.waitForSelector(btnSelector, {
            visible: true,
            timeout: 60000
        });
        const actual = await page.$eval(btnSelector, link => link.textContent);
        expect(actual).toContain("Sign up for free");
    });
});

describe("Github page contains tests", () => {
    beforeEach(async () => {
        await page.goto("https://github.com");
    });
    test("The h1 should contain 'enterprise'", async () => {
        const enterpriseLink = await page.$("header nav > ul > li:nth-child(3) > a");
        await enterpriseLink.click();

        await page.waitForNavigation()

        await page.waitForSelector("h1", {
            timeout: 60000
        });
        const title3 = await page.title();
        expect(title3).toEqual("Enterprise · A smarter way to work together · GitHub");
    }, 80000);

    test("The h1 should contain 'marketplace'", async () => {
        const marketplaceLink = await page.$("nav > ul > li:nth-child(5) > a");
        await marketplaceLink.click();

        await page.waitForNavigation()

        await page.waitForSelector("h1", {
            timeout: 60000
        });
        const title4 = await page.title();
        expect(title4).toEqual("GitHub Marketplace · to improve your workflow · GitHub");
    }, 80000);

    test("The h1 should contain search", async () => {
        const searchLink = await page.$("[placeholder='Search GitHub']");
        await searchLink.type("puppeteer");
        await page.keyboard.press("Enter");
        await page.waitForNavigation({
            timeout: 60000
        });
        await page.waitForSelector("h2", {
            timeout: 60000
        });
        const title5 = await page.title();
        expect(title5).toEqual("Search · puppeteer · GitHub");
    }, 60000);
});