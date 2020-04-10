var { describe, it, after, before } = require("selenium-webdriver/testing"),
  assert = require("assert");
// implements readable template for Home page
var Home = require("../pages/home_page");
var home_page;

/**
 * Implement the page objects. You can tell it's
 * more readable now.
 */
describe("Library App Test Suite", function() {
  this.timeout(10000);

  beforeEach(function() {
    home_page = new Home();
    home_page.goToUrl("https://library-app.firebaseapp.com/");
  });

  it("Given the Admin dropdown, when clicked, then it SHOULD display three items.", function() {
    home_page.adminDropdown().click();
    home_page.adminDropdownItems().then(function(items) {
      assert.equal(
        items.length,
        3,
        "The Admin dropdown has " + items.length + " items."
      );
    });
  });

  it("Given no text in Email input, when you click the 'Request Invtation' button, then the button's opacity should be 0.65.", function() {
    home_page.getOpacity(home_page.requestBtn()).then(function(opacity) {
      assert.equal(opacity, "0.65", "The button opacity is : " + opacity);
    });
  });

  it("Given text in Email input, when you click the 'Request Invitation' button, then it SHOULD display a confirmation message.", function() {
    home_page.type(home_page.emailInput(), "practice@stuff.com");
    home_page.waitForOpacity(home_page.requestBtn(), "1");
    home_page.requestBtn().click();
    home_page
      .alertSuccess()
      .getText()
      .then(function(txt) {
        assert(
          txt.includes("Thank you! We saved your email address"),
          "The Alert Text displayed : " + txt
        );
      });
  });

  afterEach(function() {
    home_page.endSession();
  });
});
