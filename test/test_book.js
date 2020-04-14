/**
 * This is the test file for the Books page.
 *
 * @author Joshua Cadavez
 */

var { describe, it, after, before } = require("selenium-webdriver/testing"),
  assert = require("assert");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var should = chai.should();
var Books = require("../pages/books/books_page");
chai.use(chaiAsPromised);
var book_page;

describe("Books Test Suite", function () {
  this.timeout(10000);

  beforeEach(function () {
    book_page = new Books();
    book_page.goToUrl("https://library-app.firebaseapp.com/books");
  });

  it("Given the Books list, then it SHOULD display at least one row of Book Information.", function () {
    book_page.getAllBookInfoRows().should.eventually.have.length.above(1);
  });

  it("Given the Authors names are clickable, when you click them, then it SHOULD display the Cancel btn and Admin dropdown.", function () {
    book_page.clickAuthorName(1);
    book_page.authorDropdown().should.eventually.exist;
    book_page.authorCancelBtn().should.eventually.exist;
  });

  afterEach(function () {
    book_page.endSession();
  });
});
