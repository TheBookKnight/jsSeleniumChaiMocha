/**
 * This is the Page Object file for the Home page.
 * It includes shortcut methods as well.
 *
 * @author Joshua Cadavez
 */

var Home = require("../base_page");
var Locator = require("./home_locators");

Home.prototype.requestBtn = function () {
  return this.find(Locator.requestBtn);
};
Home.prototype.alertSuccess = function () {
  return this.find(Locator.alertSuccess);
};
Home.prototype.adminDropdown = function () {
  return this.find(Locator.adminDropdown);
};
Home.prototype.adminDropdownItems = function () {
  return this.findAll(Locator.adminDropdownItems);
};
Home.prototype.emailInput = function () {
  return this.find(Locator.emailInput);
};

/**
 * Methods
 */
Home.prototype.typeEmailInput = function (text) {
  return this.find(Locator.emailInput).sendKeys(text);
};
Home.prototype.getOpacityForRequestBtn = function () {
  return this.find(Locator.requestBtn).getCssValue("opacity");
};
Home.prototype.waitOpacityForRequestBtn = function (target) {
  return this.find(Locator.requestBtn)
    .getCssValue("opacity")
    .then(function (opacity) {
      return opacity === target;
    });
};

module.exports = Home;
