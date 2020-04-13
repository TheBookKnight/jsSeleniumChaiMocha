var webdriver = require("selenium-webdriver"),
  By = webdriver.By,
  until = webdriver.until,
  chrome = require("selenium-webdriver/chrome"),
  path = require("chromedriver").path,
  o = new chrome.Options();

o.addArguments("disable-infobars");
// This will allow you to run 'headless'
// or run your tests without rendering UI Browser
o.addArguments("headless");
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var BasePage = function() {
  this.driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions(o)
    .build();
  var driver = this.driver;

  this.goToUrl = function(url) {
    return driver.get(url);
  };

  this.endSession = function() {
    return driver.quit();
  };

  this.find = function(element) {
    driver.wait(until.elementLocated(element), 5000);
    return driver.findElement(element);
  };

  this.findAll = function(element) {
    driver.wait(until.elementLocated(element), 5000);
    return driver.findElements(element);
  };
};

module.exports = BasePage;
