var Home = require("./base_page");
var webdriver = require("selenium-webdriver"),
  By = webdriver.By;

Home.prototype.requestBtn = function() {
  return this.find(By.css("button"));
};
Home.prototype.alertSuccess = function() {
  return this.find(By.css(".alert-success"));
};
Home.prototype.adminDropdown = function() {
  return this.find(By.id("ember20"));
};
// Removed '.then' since Chai's 'Eventually' takes care of promises
Home.prototype.adminDropdownItems = function() {
  return this.findAll(By.css("#ember20__menu li"));
};
Home.prototype.emailInput = function() {
  return this.find(By.css("input"));
};

/**
 * Methods
 */
// Removed '.then' since Chai's 'Eventually' takes care of promises
Home.prototype.typeEmailInput = function(text) {
  return this.find(By.css("input")).sendKeys(text);
};
// Removed '.then' since Chai's 'Eventually' takes care of promises
Home.prototype.getOpacityForRequestBtn = function() {
  return this.find(By.css("button")).getCssValue("opacity");
};
// '.then' still needed here
Home.prototype.waitOpacityForRequestBtn = function(target) {
  return this.find(By.css("button"))
    .getCssValue("opacity")
    .then(function(opacity) {
      return opacity === target;
    });
};

module.exports = Home;
