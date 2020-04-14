/**
 * These are the locators for the Books page.
 *
 * @author Joshua Cadavez
 */

var webdriver = require("selenium-webdriver"),
  By = webdriver.By;

module.exports = {
  authorNames: By.css("tr td:nth-of-type(1) span"),
  bookInfoRows: By.css("tbody tr"),
  authorDropdown: By.css("tr td:nth-of-type(1) .form-control"),
  authorCancelBtn: By.css("tr td:nth-of-type(1) .btn"),
};
