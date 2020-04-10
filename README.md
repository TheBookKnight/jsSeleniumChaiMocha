# JavaScript tutorial using Selenium, Chai, and Mocha.

> Will be testing on https://library-app.firebaseapp.com/

## Step 0: Setup Tools

1. Used NodeJS and NPM. Helpful resource: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2. Setup your editor or IDE. I used _Visual Studio Code_
3. _Optional_ I downloaded HomeBrew (since NPM might not downloaded the packages correctly)

## Step 1: Download all necessary dependencies for Selenium

These dependencies should reflect on your 'package.json'
Visit tag **'0001_setup'**.

1. Install Selenium

- **_"npm install selenium-webdriver"_**

If you face some sort of UnhandledPromiseRejectionWarning like I did, use the below commmand.

- **_"npm install selenium-webdriver@3.6.0"_**

2. Download standalone servers that implement WebDriver's wire protocol
   There's probably a way to download and use them local to the computer.

- **_"sudo npm i chromedriver"_**
- **_"sudo npm i geckodriver, was unable to get this one working."_**

3. Create a sample JS file to sanity check if driver works

- see _library.js_ file

4. Run **_node library.js_**

## Step 2: Automate web elements with Selenium

Visit tag **'0002_findWebElements'** to identify web elements.
Visit tag **'0003_sendKeysClickWaits'** for web element actions.
See _library.js_ file.

Some helpful resources:

- https://www.selenium.dev/selenium/docs/api/javascript/
- https://saucelabs.com/resources/articles/selenium-tips-css-selectors
- https://www.browserstack.com/guide/css-selectors-in-selenium

## Step 3: Adding Mocha

The _library.js_ file is renamed to _test_library.js_ and added to the _test_ module.
Visit tag **'0004_mocha'** for mocha implementation.

1. Install _Mocha_ globally
   **_"npm install --global mocha"_**

2. Setup hooks for test run cycle
   https://mochajs.org/#run-cycle-overview

3. Add asserts using Node.js
   https://nodejs.org/api/assert.html

## Step 4: Adding Mochawesome (as the Report)

Visit tag **'0005_Mochawesome'** for mocha implementation.

1. Install _Mochawesome_
   **_"npm install --save-dev mochawesome"_**

2. Run command to show Test Report
   **_"mocha test --reporter mochawesome --reporter-options autoOpen=true"_**

## Step 5: Implementing Page Object Model

1. Create a Base template for all webpages. See _base_page.js_

2. Create Page Object templates extending from the Base Page. See _home_page.js_

3. Use the page objects to make your tests readable. See _test_library.js_

4. Use NodeJS Assertions to verify test. See _test_library.js_
   https://nodejs.org/api/assert.html
