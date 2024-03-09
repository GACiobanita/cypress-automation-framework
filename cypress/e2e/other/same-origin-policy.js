/// <reference types="Cypress" />

//^helps with the editor code

describe("Cypress web security", () => {
    it.skip("Validate visiting two different domains", () => {
        cy.visit('http://www.webdriveruniversity.com/');
        cy.visit('https://automationteststore.com/'); //this will cause an error as it is a different super domain from the one we visited
    });

    //what if a button leads us a different super domain url, still fails, however the setup can be configured to allow this, by adding chromeWebSecurity: false in our cypress.config.js file
    it("Validate visiting two different domains via user actions", () => {
        cy.visit('http://www.webdriveruniversity.com/');
        cy.get('#automation-test-store').invoke('removeAttr', 'target').click(); //we click the button we find via it's own id, and we remove the 'target' attribute so it doesn't open a new tab
    });

    //this will need the experimentalSessionAndOrigin setting true in our cypress.config.js file
    it('Origin command', () => {
        cy.origin('webdriveruniversity.com', () => {
            cy.visit("/");
        });

        cy.origin('automationteststore.com', () => {
            cy.visit("/");
        });

        cy.visit('http://www.webdriveruniversity.com/');
        cy.visit("https://selectors.webdriveruniversity.com/"); //can still visit domains of the same origin;

    });
})