/// <reference types="Cypress" />
describe("Traversing DOM elements in Cypress", () => {
    beforeEach(() => {
      cy.visit("https://webdriveruniversity.com/");
      cy.get("#data-table").invoke("removeAttr", "target").click({ force: true });
    }); //executed before each individual test

    it("children() to get the children of DOM elements", () => {
      cy.get('.traversal-breadcrumb').children('.active').should('contain', 'Contact Us'); //children() can take a selector used to filter matching DOM elements.
    });
  
    //closest ancestor - Get the first DOM element that matches the selector (whether it be itself or one of its ancestors).
    it("closest() to validate the closest ancestor DOM element", () => {
      cy.get('.traversal-badge').closest('ul').should('have.class', 'list-group'); //locate element then look for the closest element which is an unordered list - ul HTML tag
    });
  
    it("eq() to retrieve a specific element based on index", () => {
      cy.get('.traversal-drinks-list > *').eq(2).should('contain', 'Milk'); //Get A DOM element at a specific index in an array of elements.
    });
  
    it("filter() to retrieve DOM elements that match a specific selector", () => {
      cy.get('.btn-group-toggle > *').filter('.active').should('contain', 'Button-1') //filter() - Get the DOM elements that match a specific selector.
      //cy.get('.btn-group-toggle').children('.active').should('contain', 'Button-1'); //the above can be replicate using the .childen() function as well
    });
  
    it("find() to retrieve DOM elements of a given selector", () => {
      cy.get('.traversal-pagination').find('li').find('a').should('have.length', 7); //find all items in traversal-pagination using the tag 'li' then for each list item 'li' find again all the elements 'a', verify the length of the list of found items
    });
  
    it("first() to retrieve the first DOM element within elements ", () => {
      cy.get('.traversal-table > tbody > tr >td').first().should('contain', 'Andy'); //the selector here is very interesting, going from the highest to the lower one by 1 (and even if there are 3 tbodies, it would have gotten the tr(ow) from all of them)
    });
  
    it("last() to retrieve the last DOM element within elements", () => {
      cy.get('.traversal-table > tbody > tr >td').last().should('contain', 'Scott');
    });
  
    it("nextAll() to get all of the next sibling DOM elements within elements", () => {
      cy.get('.traversal-drinks-list').contains('Tea').nextAll().should('have.length', '3'); //only the following siblings, no elements prior/previous to it will be considered
    });
  
    it("nextUntil() to get all of the next sibling DOM elements within elements until, but not including, another element (mentioned one)", () => {
      cy.get('#coffee').nextUntil('#milk');
    });
  
    it("not() to remove DOM element(s) from the set of elements", () => {
      cy.get('.traversal-button-states >button').not('.disabled').should('not.have.class', 'disabled'); //should class check should not have '.'
      //cy.get('.traversal-button-states >button').should('not.have.class', 'disabled'); //this will fail
    });
  
    it("parent() To get parent DOM element of elements", () => {
      cy.get('.traversal-mark').parent().should('contain', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,');
    });
  
    it("parents() to get parents DOM element of elements", () => {
      cy.get('.traversal-cite').parents().should('match', 'blockquote');
    });
  
    it("prev() to get the previous sibling DOM element within elements", () => {
      cy.get('#sugar').prev().contains('Espresso');
    });
  
    it("prevAll() to get all previous sibling DOM elements within elements", () => {
      cy.get('.sales').prevAll().should('have.length', '2');
    });
  
    it("prevUntil() to get all previous sibling DOM elements within elements until, but not including, the other element is reached", () => {
      cy.get('#veggie').prevUntil('#fruits').should('have.length', '5');
    });
  
    it.only("siblings() To get all sibling DOM elements of elements", () => {
      cy.get('.traversal-button-other-states .active').siblings().should('have.length', '3');
    });
});
  