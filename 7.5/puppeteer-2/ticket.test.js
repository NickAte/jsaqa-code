let page;

const {
	clickElement,
	getText,
	clickDay,
	clickMoviTime,
	clickSeat,
	clickSeatVip,
	checkCodeQR,
} = require("./lib/commands");

const {
	generateData,
} = require("./lib/utils");

beforeEach(async() => {
	page = await browser.newPage();
});

afterEach(() => {
	page.close();
});

describe("Ticket booking", () => {
	beforeEach(async() => {
		await page.goto("http://qamid.tmweb.ru/client/index.php");
	});

	test("Positive - Should book one seat", async () => {
		const data = generateData();
		const moviNumber = 2;
		const timeNumber = 2;
		await clickDay(page, data);
		await clickMoviTime(page, moviNumber, timeNumber);
		await page.waitForSelector("h1");
		await clickSeat(page);
		await clickElement(page, ".acceptin-button");
		await page.waitForSelector("h1");
		await clickElement(page, ".acceptin-button");
		await checkCodeQR(page);
		const actual = await getText(page, "h2");
		expect(actual).toContain("Электронный билет");
	});

	test("Positive - Should book VIP seat", async () => {
		const data = generateData();
		const moviNumber = 1;
		const timeNumber = 2;
		await clickDay(page, data);
		await clickMoviTime(page, moviNumber, timeNumber);
		await page.waitForSelector("h1");
		await clickSeatVip(page);
		await clickElement(page, ".acceptin-button");
		await page.waitForSelector("h1");
		await clickElement(page, ".acceptin-button");
		await page.waitForSelector("h1");
		await checkCodeQR(page);
		const actual = await getText(page, "h2");
		expect(actual).toContain("Электронный билет");
	});

	test("Positive - Should book two seats", async() => {
		const data = generateData();
		const moviNumber = 2;
		const timeNumber = 2;
		await clickDay(page, data);
		await clickMoviTime(page, moviNumber, timeNumber);
		await page.waitForSelector("h1");
		await clickSeat(page);
		await clickSeat(page);
		await clickElement(page, ".acceptin-button");
		await page.waitForSelector("h1");
		await clickElement(page, ".acceptin-button");
		await page.waitForSelector("h1");
		await checkCodeQR(page);
		const actual = await getText(page, "h2");
		expect(actual).toContain("Электронный билет");
	});

	test("Negative - Should not book any seats", async () => {
		const data = generateData();
		const moviNumber = 2;
		const timeNumber = 2;
		await clickDay(page, data);
		await clickMoviTime(page, moviNumber, timeNumber);
		await page.waitForSelector("h1");
		await clickElement(page, ".acceptin-button");
		const actual = await page.$eval(
			".acceptin-button",
			(button) => button.hasAttribute("disabled")
		);
		expect(actual).toBe(true);
	});
});