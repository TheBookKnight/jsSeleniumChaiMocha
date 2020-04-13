# JavaScript tutorial using Selenium, Chai, and Mocha.

> Will be testing on https://library-app.firebaseapp.com/ from a [EmberJS tutorial](https://yoember.com/).

## Step 0: Setup Tools

1. Used NodeJS and NPM.
   Helpful resource: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2. Setup your editor or IDE. I used _Visual Studio Code_
3. _Optional_ I downloaded HomeBrew (since NPM might not downloaded the packages correctly)

## Step 1: Download all necessary dependencies for Selenium

These dependencies should reflect on your 'package.json'
Visit tag **'0001_setup'**.

1. Install Selenium

> **_npm install selenium-webdriver_**

If you face some sort of UnhandledPromiseRejectionWarning like I did, use the below commmand.

> **_npm install selenium-webdriver@3.6.0_**

2. Download standalone servers that implement WebDriver's wire protocol
   There's probably a way to download and use them local to the computer.

> **_sudo npm i chromedriver_**

> **_sudo npm i geckodriver_** // I used Chromedriver. But, this is how to install one for FireFox.

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

   > **_npm install --global mocha_**

2. If not there, add **"test_libary": "mocha"** to the _package.json_.
   It allows you to run your test scripts with Mocha.
   See mine as an example.

3. Setup hooks for test run cycle
   https://mochajs.org/#run-cycle-overview

4. Add asserts using Node.js
   https://nodejs.org/api/assert.html

## Step 4: Adding Mochawesome (as the Report)

Visit tag **'0005_Mochawesome'** for mocha implementation.

1. Install _Mochawesome_

   > **_npm install --save-dev mochawesome_**

2. Run command to show Test Report
   > **_mocha test --reporter mochawesome --reporter-options autoOpen=true_**

## Step 5: Implementing Page Object Model (POM)

Visit tag **'0006_pom'** for POM implementation.
Optional: Visit tag **'0007_pommethods'** for POM method shortcuts.

1. Create a Base template for all webpages. See _base_page.js_

2. Create Page Object templates extending from the Base Page. See _home_page.js_

3. Use the page objects to make your tests readable. See _test_library.js_

4. Use NodeJS Assertions to verify test. See _test_library.js_
   https://nodejs.org/api/assert.html

5. Optional: Add shortcut POM methods.

## Step 6: Chai

Visit tag **'0008_chai'** for chai implementation.

1. Install 'Chai' and 'Chai-as-Promise'

   > **_npm install chai --save_**

   > **_npm install chai-as-promised_**

2. Use any methods needed based off ChaiJS models
   https://www.chaijs.com/guide/styles/

## Optional: Implement Locators

Visit tag **'0009_locators'** for chai implementation.

1. Moved _home_page.js_ to the newly created **home** folder.

2. Created _home_locators.js_ file and moved the locators to that file.

## Step 7: Implement Headless Browser Testing (and Parallel Testing)

This is a great [blog post](https://www.awesome-testing.com/2019/04/headless-browser-testing-with-selenium.html) why it's better to implement Headless Browser testing. Note, be wary because I heard cases that headless isn't as [fast as expected](https://watirmelon.blog/2015/12/08/real-vs-headless-browsers-for-automated-acceptance-tests/).

1. Add 'headless' to Chrome options

> o.addArguments("headless");
