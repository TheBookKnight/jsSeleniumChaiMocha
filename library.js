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

// find elements based on id, css, partial Link, Link, or xpath
driver.findElement(By.id("ember20"));
driver.findElement(By.css("input"));

// whitespace ("parent child"), this also gets navbar elements
driver.findElements(By.css("nav li")).then(function(elements) {
  elements.map(function(element) {
    element.getText().then(function(txt) {
      console.log("The text of each nav bar element is: " + txt);
    });
  });
});
driver.findElement(By.partialLinkText("Library"));
driver
  .findElement(By.xpath("//button"))
  .getText()
  .then(function(txt) {
    console.log("The text of the button is: " + txt);
  });

driver.sleep(3000);
driver.quit();
