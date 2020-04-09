// install what By and until modules from Selenium
var webdriver = require("selenium-webdriver"),
  By = webdriver.By,
  until = webdriver.until;
// sets up chromedriver capabilities
var chrome = require("selenium-webdriver/chrome");
var path = require("chromedriver").path;
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

// builds the Chrome webdriver
var driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();

// access the Library app
driver.get("https://library-app.firebaseapp.com/");

// sleep so you can see it open
driver.sleep(3000);

// ends the session
driver.quit();
