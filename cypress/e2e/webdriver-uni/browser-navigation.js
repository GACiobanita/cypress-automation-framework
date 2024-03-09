/// <reference types="Cypress" />
//^helps with the editor code

describe("Validate webdriveruni homepage links", () => {
    it("Confirm links redirect to the correct pages", () => {
        //new navigation without opening a new tab or having to go directly to the link
        cy.visit('http://www.webdriveruniversity.com/');
        //click the 'CONTACT US' button
        cy.get('#contact-us').invoke('removeAttr', 'target').click();
        cy.url().should('include', 'contactus');

        cy.go('back'); //web browser back
        cy.reload(); //refresh the current view
        cy.url().should('include', 'http://www.webdriveruniversity.com/');
        //cy.reload(true); //reload the page without using cache

        cy.go('forward');
        cy.url().should('include', 'contactus');

        cy.go('back');
        cy.get('#login-portal').invoke('removeAttr', 'target').click();
        cy.url().should('include', 'Login-Portal');

        cy.go('back');
        cy.get('#to-do-list').invoke('removeAttr', 'target').click();
        cy.url().should('include', 'To-Do-List');

        cy.go('back');
    });
})