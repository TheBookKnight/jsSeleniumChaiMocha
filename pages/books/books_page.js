var Books = require("../base_page");
var Locator = require("./books_locators");

Books.prototype.authorDropdown = function() {
  return this.find(Locator.authorDropdown);
};

Books.prototype.authorCancelBtn = function() {
  return this.find(Locator.authorCancelBtn);
};

/**
 * Methods
 */
Books.prototype.clickAuthorName = function(authNum) {
  return this.findAll(Locator.authorNames).then(function(authors) {
    return authors[authNum].click();
  });
};

Books.prototype.getAllAuthorNames = function() {
  return this.findAll(Locator.authorNames);
};

Books.prototype.getAllBookInfoRows = function() {
  return this.findAll(Locator.bookInfoRows);
};

module.exports = Books;
