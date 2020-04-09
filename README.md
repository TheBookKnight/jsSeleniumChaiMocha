# JavaScript tutorial using Selenium, Chai, and Mocha.

> Will be testing on https://library-app.firebaseapp.com/

## Step 1: Download all necessary dependencies for Selenium

These dependencies should reflect on your 'package.json'
Visit tag '0001_setup'

1. Install Selenium

- npm install selenium-webdriver

If you face some sort of UnhandledPromiseRejectionWarning like I did, use the below commmand.

- npm install selenium-webdriver@3.6.0

2. Download standalone servers that implement WebDriver's wire protocol
   There's probably a way to download and use them local to the computer.

- sudo npm i chromedriver
- sudo npm i geckodriver, was unable to get this one working.

3. Create a sample JS file to sanity check if driver works

- see library.js file

4. Run **_node library.js_**

## Step 2: Script in Selenium

Some helpful resources:

- https://www.selenium.dev/selenium/docs/api/javascript/
- https://saucelabs.com/resources/articles/selenium-tips-css-selectors
