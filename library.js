var webdriver = require("selenium-webdriver"),
  By = webdriver.By,
  until = webdriver.until;
var chrome = require("selenium-webdriver/chrome");
var path = require("chromedriver").path;
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();

driver.get("https://library-app.firebaseapp.com/");

// Opens the Admin dropdown, then we display the text of each child item
driver.findElement(By.id("ember20")).click();
driver.findElements(By.css("#ember20__menu li")).then(function(elements) {
  elements.map(function(element) {
    element.getText().then(function(txt) {
      console.log("The dropdown opened and has this element: " + txt);
    });
  });
});

// Send text to input bar
driver.findElement(By.css("input")).sendKeys("practice@stuff.com");

// custom explicit wait until button opacity is '1'
driver.wait(function() {
  return driver
    .findElement(By.xpath("//button"))
    .getCssValue("opacity")
    .then(function(result) {
      return result === "1";
    });
}, 1000);

// click the button
driver.findElement(By.xpath("//button")).click();

// explicit wait until alert success is displayed
driver
  .wait(until.elementLocated(By.css(".alert-success"), 5000))
  .getText()
  .then(function(txt) {
    console.log("Alert success text displayed.");
  });

driver.findElements(By.css("nav li")).then(function(elements) {
  elements.map(function(element) {
    element.getText().then(function(txt) {
      console.log("The text of each nav bar element is: " + txt);
    });
  });
});

driver.findElement(By.partialLinkText("Library"));

driver.sleep(3000);
driver.quit();
