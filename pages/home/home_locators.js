var webdriver = require("selenium-webdriver"),
  By = webdriver.By;
/**
 * This will make it easy to edit the Locators when needed
 */
module.exports = {
  requestBtn: By.css("button"),
  alertSuccess: By.css(".alert-success"),
  adminDropdown: By.id("ember20"),
  adminDropdownItems: By.css("#ember20__menu li"),
  emailInput: By.css("input")
};
