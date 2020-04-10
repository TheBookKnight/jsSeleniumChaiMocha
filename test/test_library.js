var webdriver = require("selenium-webdriver"),
  { describe, it, after, before } = require("selenium-webdriver/testing"),
  By = webdriver.By,
  until = webdriver.until,
  assert = require("assert");
var chrome = require("selenium-webdriver/chrome");
var path = require("chromedriver").path;
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);
var driver;

// describe gives structure to your test suite
describe("Library App Test Suite", function() {
  // need to define a timeout for your tests
  // NOTE: Mocha was designed for Unit Tests, so although it may pass,
  // the times will show in red meaning it's not running fast enough
  this.timeout(10000);

  // 'beforeEach' runs before each test
  beforeEach(function() {
    driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .build();
    driver.get("https://library-app.firebaseapp.com/");
  });

  // 'it' is used in each testcase
  it("Given the Admin dropdown, when clicked, then it SHOULD display three items.", function() {
    driver.findElement(By.id("ember20")).click();
    driver.findElements(By.css("#ember20__menu li")).then(function(elements) {
      // used Node's Assert, note it has limited functionality
      // Assert.equal(actual, expected, message)
      assert.equal(
        elements.length,
        3,
        "The Admin dropdown has " + elements.length + " items."
      );
    });
  });

  it("Given no text in Email input, when you click the 'Request Invtation' button, then the button's opacity should be 0.65.", function() {
    driver
      .findElement(By.css("button"))
      .getCssValue("opacity")
      .then(function(opacity) {
        assert.equal(opacity, "0.65", "The button opacity is : " + opacity);
      });
  });

  it("Given text in Email input, when you click the 'Request Invitation' button, then it SHOULD display a confirmation message.", function() {
    driver.findElement(By.css("input")).sendKeys("practice@stuff.com");
    driver.wait(function() {
      return driver
        .findElement(By.xpath("//button"))
        .getCssValue("opacity")
        .then(function(result) {
          return result === "1";
        });
    }, 1000);
    driver.findElement(By.xpath("//button")).click();
    driver
      .wait(until.elementLocated(By.css(".alert-success"), 5000))
      .getText()
      .then(function(txt) {
        assert.equal(
          txt.substring(0, 38),
          "Thank you! We saved your email address",
          "The Alert Text displayed : " + txt.substring(0, 38)
        );
      });
  });

  // 'afterEach' runs after each test
  afterEach(function() {
    driver.quit();
  });
});
