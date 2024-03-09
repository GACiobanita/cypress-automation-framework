/// <reference types="Cypress" />
//can run this test also via the following command
//./node_modules/.bin/cypress run --browser chrome --spec cypress/e2e/webdriver-uni/contact-us.js --env first_name=Bill

describe("Test Contact Us Form via WebdriverUni", () => {
    before(function () {
        cy.fixture("example").then(function(data) {
           globalThis.data = data;
        })
    });

    beforeEach(function() {
        cy.visit(Cypress.env('webdriveruni_homepage') + 'Contact-Us/contactus.html');
    });

    it("Should be able to submit a successful submission via contact us form", () => {
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
        cy.title().should('include', 'WebDriver | Contact Us');
        cy.url().should('include', 'contactus');
        cy.webDriverUni_ContactForm_Submission(Cypress.env("first_name"), data.last_name, data.email, "John's comment here", 'h1', "Thank You for your Message!")
    });

    it("Should not be able to submit a successful submission via contact us form as all fields are required", () => {
        cy.webDriverUni_ContactForm_Submission(data.first_name, data.last_name, " ", "John's comment here", 'body', 'Error: Invalid email address')
    });
})