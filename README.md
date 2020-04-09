# JavaScript tutorial using Selenium, Chai, and Mocha.

> Will be testing on https://library-app.firebaseapp.com/

## Step 0: Setup Tools

1. Used NodeJS and NPM. Helpful resource: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2. Setup your editor or IDE. I used _Visual Studio Code_
3. (optional) I downloaded HomeBrew

## Step 1: Download all necessary dependencies for Selenium

These dependencies should reflect on your 'package.json'
Visit tag '0001_setup'

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

## Step 2: Script in Selenium

Some helpful resources:

- https://www.selenium.dev/selenium/docs/api/javascript/
- https://saucelabs.com/resources/articles/selenium-tips-css-selectors
