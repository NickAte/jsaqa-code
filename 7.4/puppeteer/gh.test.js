let page;

beforeEach(async () => {
  page = await browser.newPage();
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
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 60000);
});

describe("Added three new tests - headers of other application page", () => {
  test("Click pricing", async () => {
    await page.goto("https://github.com/pricing");
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toContain("Pricing · Plans for every developer · GitHub");
  }, 60000);

  test("Click sponsors", async () => {
    await page.goto("https://github.com/sponsors");
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toContain("GitHub Sponsors · GitHub");
  }, 60000);

  test("Click enterprise", async () => {
    await page.goto("https://github.com/enterprise");
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toContain("Enterprise · A smarter way to work together · GitHub");
  }, 60000);
});