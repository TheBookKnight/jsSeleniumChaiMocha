// Imports needed from base template
var Home = require("./base_page");
var webdriver = require("selenium-webdriver"),
  By = webdriver.By;

/**
 * Defining each page object that can be understood
 * at business-level.
 */
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

// Exports template to be used in tests
module.exports = Home;
