const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
	Given,
	When,
	Then,
	Before,
	After,
	setDefaultTimeout
} = require("@cucumber/cucumber");
const {
	clickElement,
	getText,
	clickDay,
	clickMoviTime,
	clickSeat,
	clickSeatVip,
	checkCodeQR,
} = require("../../lib/commands.js");
setDefaultTimeout(60000);

Before(async function () {
	const browser = await puppeteer.launch({ headless: false, slowMo: 400 });
	const page = await browser.newPage();
	this.browser = browser;
	this.page = page;
});

After(async function () {
	if (this.browser) {
		await this.browser.close();
	}
});

Given("user is on start page {string}", async function (string) {
	return await this.page.goto(string);
});

When('user chooses day {string} of the week', async function (string) {
	return await clickDay(this.page, string);
});

When("user chooses movie {string} and time {string}", async function (movi, time) {
	return await clickMoviTime(this.page, movi, time);
});

When("user chooses seat {string} and {string}", async function (row, seat) {
	return await clickSeat(this.page, row, seat);
});

When("user chooses Vip seat {string}", async function (number) {
	return await clickSeatVip(this.page, number);
});

When("user click on button 'Забронировать'", async function () {
	return await clickElement(this.page, ".acceptin-button");
});

When("user click on button 'Получить код бронирования'", async function () {
	return await clickElement(this.page, ".acceptin-button");
});

Then("user can see QR code", async function () {
	return await checkCodeQR(this.page);
})

Then("user sees the header 'Электронный билет'", async function() {
	const actual = await getText(this.page, "h2");
	expect(actual).contain("Электронный билет");
});

Then("button 'Забронировать' not active", async function () {
	const actual = await this.page.$eval(
		".acceptin-button",
		(button) => button.disabled
	);
	expect(actual).equal(true);
});