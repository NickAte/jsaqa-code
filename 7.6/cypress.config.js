const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    retries: {
      openMode: 2,
    }
	},
	env: {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});