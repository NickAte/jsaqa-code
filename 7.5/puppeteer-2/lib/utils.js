module.exports = {
	generateData: function () {
		const minDay = 2;
		const maxDay = 7;
		return Math.floor(Math.random() * (maxDay - minDay + 1)) + minDay;
	}
}