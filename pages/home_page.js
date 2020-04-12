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
Home.prototype.adminDropdownItems = function() {
  return this.findAll(By.css("#ember20__menu li")).then(function(items) {
    return items;
  });
};
Home.prototype.emailInput = function() {
  return this.find(By.css("input"));
};

/**
 * Added methods since only typing and getting opacity
 * is restricted to only this Home page.
 */
Home.prototype.typeEmailInput = function(text) {
  return this.find(By.css("input")).then(function(obj) {
    return obj.sendKeys(text);
  });
};
Home.prototype.getOpacityForRequestBtn = function() {
  return this.find(By.css("button"))
    .getCssValue("opacity")
    .then(function(opacity) {
      return opacity;
    });
};
Home.prototype.waitOpacityForRequestBtn = function(target) {
  return this.find(By.css("button"))
    .getCssValue("opacity")
    .then(function(opacity) {
      return opacity === target;
    });
};

module.exports = Home;
