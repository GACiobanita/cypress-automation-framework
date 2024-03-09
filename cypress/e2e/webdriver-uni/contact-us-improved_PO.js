import HomePage_PO from "../../support/pageObjects/webdriver-uni/HomePage_PO";
import Contact_Us_PO from "../../support/pageObjects/webdriver-uni/Contact_Us_PO";
/// <reference types="Cypress" />
//can run this test also via the following command
//./node_modules/.bin/cypress run --browser chrome --spec cypress/e2e/webdriver-uni/contact-us.js --env first_name=Bill

describe("Test Contact Us Form via WebdriverUni", () => {
    Cypress.config('defaultCommandTimeout', 20000) //custom defaultCommandTimeout setting for this test suite ONLY
    const homepage_PO = new HomePage_PO();
    const contact_us_PO = new Contact_Us_PO();

    before(function () {
        cy.fixture("example").then(function(data) {
           globalThis.data = data;
        })
    });

    beforeEach(function () {
        homepage_PO.visitHomepage();
        cy.wait(3000);
        homepage_PO.clickOn_ContactUs_Button();
        //cy.pause();
    });

    it("Should be able to submit a successful submission via contact us form", () => {
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
        cy.title().should('include', 'WebDriver | Contact Us');
        cy.url().should('include', 'contactus');
        contact_us_PO.contactForm_Submission(Cypress.env("first_name"), data.last_name, data.email, "John's comment here", 'h1', "Thank You for your Message!");
    });

    it("Should not be able to submit a successful submission via contact us form as all fields are required", () => {
        contact_us_PO.contactForm_Submission(data.first_name, data.last_name, " ", "John's comment here", 'body', 'Error: Invalid email address');
    });
})