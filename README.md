# JavaScript tutorial using Selenium Webdriver, Chai, and Mocha.

> By: Joshua Cadavez

Will be testing on https://library-app.firebaseapp.com/ from the [EmberJS tutorial](https://yoember.com/).

This goes over the basic features of Selenium Webdriver, Chai, and Mocha.

- [Selenium Webdriver](https://www.selenium.dev/documentation/en/webdriver/)

  > a simple and concise programming interface that drives the browser via object-oriented API.

- [Chai](https://www.chaijs.com/)

  > a BDD/TDD assertion library for node and paired usually with the JavaScript testing framework.

- [Mocha](https://mochajs.org/)

  > a JavaScript test framework that runs on NodeJS. It's best used for async testing and runs serially.

This tutorial was done on Mac OS. I don't have an explicit tutorial for Windows. But, I'll post a YouTube playlist where viewers suggest alternatives.

Concepts covered:

- Implementing Page Object Model.
- Implementing Selenium Webdriver to perform actions on web element.
- Implementing Mocha as the test framework and Mochawesome as the test reporter
- Implement Chai for better assertions
- Implement parallel testing with Mocha
- Implement headless browser

Scenarios for demonstration:

1. Home Page

   1. Given the Admin dropdown, when clicked, then it SHOULD display three items.
   2. Given no text in Email input, when you click 'Request Invitation' button, then the button's opacity should be 0.65.
   3. Given text in Email input, when you click 'Request Invitation' button, then there SHOULD be a confirmation message.

2. Books Page

   1. Given the Books list, then it SHOULD display at least one row of Book Information
   2. Given the Authors names are clickable, when you click them, then it SHOULD display the Cancel btn and Admin dropdown.

## Step 0: Setup Tools

1. Used NodeJS and NPM.
   Helpful resource: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2. Setup your editor or IDE. I used _Visual Studio Code_
3. An extension to find Web elements. I used [ChroPath](https://chrome.google.com/webstore/detail/chropath/ljngjbnaijcbncmcnjfhigebomdlkcjo)
4. _Optional_ I downloaded HomeBrew (since NPM might not downloaded the packages correctly)

## Step 1: Download all necessary dependencies for Selenium

These dependencies should reflect on your 'package.json'
Visit tag **'0001_setup'**.

1. Start a new project with below Terminal command

> **_npm init_**

2. Install Selenium

> **_npm install selenium-webdriver_**

If you face some sort of UnhandledPromiseRejectionWarning like I did, use the below commmand.

> **_npm install selenium-webdriver@3.6.0_**

3. Download standalone servers that implement WebDriver's wire protocol
   There's probably a way to download and use them local to the computer.

> **_sudo npm i chromedriver_**

> **_sudo npm i geckodriver_** // I used Chromedriver. But, this is how to install one for FireFox.

4. Create a sample JS file to sanity check if driver works

- see _library.js_ file

5. Run **_node library.js_**

## Step 2: Automate web elements with Selenium

Visit tag **'0002_findWebElements'** to identify web elements. Also, in this tag, I gave several examples:

- xpath
- css
- id
- partialLinkText

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

2. Optional: if you want to run Mocha tests via NPM, modify the scripts **"test": "..."** in the _package.json_.

   > **_npm run test_**

3. Setup hooks for test run cycle
   https://mochajs.org/#run-cycle-overview

4. Add asserts using Node.js
   https://nodejs.org/api/assert.html

## Step 4: Adding Mochawesome (as the Report)

Visit tag **'0005_Mochawesome'** for mocha implementation.

1. Install _Mochawesome_

   > **_npm install --save-dev mochawesome_**

2. Run command to show Test Report.

   > **_mocha test --reporter mochawesome --reporter-options autoOpen=true_**

3. It's optional to add the above command to the _package.json_ file in the scripts section.

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

Visit tag **'0009_locators'** for how to organize locators.

1. Moved _home_page.js_ to the newly created **home** folder.

2. Created _home_locators.js_ file and moved the locators to that file.

## Step 7: Implement Headless Browser Testing

This is a great [blog post](https://www.awesome-testing.com/2019/04/headless-browser-testing-with-selenium.html) why it's better to implement Headless Browser testing. Note, be wary because I heard cases that headless isn't as [fast as expected](https://watirmelon.blog/2015/12/08/real-vs-headless-browsers-for-automated-acceptance-tests/).

Visit tag **'0010_headless'** for headless implementation.

1. Add 'headless' to Chrome options.

> o.addArguments("headless");

## Step 8: Implement Parallel Testing

You need at least two test files to see parallel testing. Visit tag **'0011_tests_books'** for another test example with the Books tab.

1. Install **mocha-parallel-tests** to run tests in parallel.

> npm install --save-dev mocha mocha-parallel-tests

2. Edit the _package.json_'s NPM script to point to the 'test' folder. Also, include the 'mocha-parallel-tests' parameter.

> mocha-parallel-tests test --reporter mochawesome --reporter-options autoOpen=true

3. To run them all via CLI

> npm run test

Visit tag **'0012_parallel'** for parallel testing implementation.
