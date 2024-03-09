const { defineConfig } = require("cypress");
const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress\\config', `${file}.json`);

  if(!fs.existsSync(pathToConfigFile)) {
    console.log("No custom config file found.");
    return {

    };
  }

  return fs.readJson(pathToConfigFile);
}

module.exports = defineConfig({
  projectId: '57qgb8',
  e2e: {
    setupNodeEvents(on, config) {
      const file = config.env.configFile || '';

      return getConfigurationByFile(file);
    },
    baseUrl: "https://www.webdriveruniversity.com", //in code this would be called via cy.visit("/"); 
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    excludeSpecPattern: "cypress/e2e/other/*.js",
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    video: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json',
    },
    retries: {
      runMode: 0,
      openMode: 1
    },
    env: {
      first_name: "John", //can be used for passwords n such //env vars can also be modified per test basis by mentioning them in the command
      webdriveruni_homepage: "https://www.webdriveruniversity.com/"
    },
  },
});
