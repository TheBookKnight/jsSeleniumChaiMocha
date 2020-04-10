var webdriver = require("selenium-webdriver"),
  By = webdriver.By,
  until = webdriver.until,
  chrome = require("selenium-webdriver/chrome"),
  path = require("chromedriver").path,
  o = new chrome.Options();
/**
 * when running tests, you want to disable the info
 */
o.addArguments("disable-infobars");
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

/**
 * Serves as the Basic template for all webpages.
 *
 * Handles driver setup and quitting
 * Locating elmeents with the driver
 * The waits that need driver
 */
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

  /**
   * These are some common methods that
   * each page might need:
   * sendKeys, getOpacity, waitForOpacity
   */
  this.type = function(po, text) {
    return po.sendKeys(text);
  };

  this.getOpacity = function(po) {
    return po.getCssValue("opacity");
  };

  this.waitForOpacity = function(po, target) {
    return this.getOpacity(po).then(function(opacity) {
      return opacity === target;
    });
  };
};

// exports the shortcuts to be used by other files
module.exports = BasePage;
