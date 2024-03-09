import HomePage_PO from "../../support/pageObjects/webdriver-uni/HomePage_PO";
/// <reference types="Cypress" />
//^helps with the editor code

describe("Test Contact Us Form via WebdriverUni", () => {
    before(function () {
        cy.fixture("example").then(function(data) {
           //this.data = data; //json file initialized
           globalThis.data = data;
        }) //.json is not required, only filename
    });

    beforeEach(function () {
        //cy.visit(Cypress.env("webdriveruni_homepage") + "/Contact-Us/contactus.html")
        const homepage_PO = new HomePage_PO();
        homepage_PO.visitHomepage();
        homepage_PO.clickOn_ContactUs_Button();
    });

    it("Should be able to submit a successful submission via contact us form", () => {
        //cypress code
        //cy.visit("http://www.webdriveruniversity.com/Contact-Us/contactus.html");
        //new navigation without opening a new tab or having to go directly to the link
        //cy.visit('https://www.webdriveruniversity.com/');
        //click the 'CONTACT US' button
        //cy.get('#contact-us').invoke('removeAttr', 'target').click();//target="_blank" attribute in the button forces a new tab to be opened and this gives us troubles, so we remove it via a jQuery command - removeAttr
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8'); //we get the document window, HTML doc, and assert that it has the charset property, of value, and+eq, UTF-8
        cy.title().should('include', 'WebDriver | Contact Us'); //get the title property directly via the .title command, and assert that it includes the text value
        cy.url().should('include', 'contactus'); //get the current URL and verify that it contains 'contactus', may be good when we check/assert final pages in a flow

        //cy.get('#contact-us > .thumbnail').click({force: true}); //flaky
        /*cy.get('[name="first_name"]').type(data.first_name); //add the first name in the field
        cy.get('[name="last_name"]').type(data.last_name); //add the last name in the field

        cy.get('[name="email"]').type(data.email); //add the e-mail in the field

        cy.get('textarea.feedback-input').type("John's comment here"); //add a comment in the field field

        cy.get('[type="submit"]').click(); //click the submit button

        //cy.get('#contact_reply').contains("Thank You for your Message!");//check that the transition did occur and the confirmation message/page is displayed
        cy.get('h1').should('have.text', "Thank You for your Message!"); //better assertion check*/

        //replaced the above with a custom command
        cy.webDriverUni_ContactForm_Submission(data.first_name, data.last_name, data.email, "John's comment here", 'h1', "Thank You for your Message!")
    });

    it("Should not be able to submit a successful submission via contact us form as all fields are required", () => {
    //it.only("Should not be able to submit a successful submission via contact us form as all fields are required", () => { //the .only property makes it so that only this test is ran
        //cypress code
        //cy.visit("http://www.webdriveruniversity.com/Contact-Us/contactus.html");
        //new navigation without opening a new tab or having to go directly to the link
        cy.visit('https://www.webdriveruniversity.com/');
        //click the 'CONTACT US' button
        cy.get('#contact-us').invoke('removeAttr', 'target').click(); //target="_blank" attribute in the button forces a new tab to be opened and this gives us troubles, so we remove it via a jQuery command - removeAttr
        
        /*cy.get('[name="first_name"]').type(data.first_name); //add the first name in the field
        cy.get('[name="last_name"]').type(data.last_name); //add the last name in the field
        cy.get('textarea.feedback-input').type("John's comment here"); //add a comment in the field field
        cy.get('[type="submit"]').click(); //click the submit button
        //cy.get('body').contains("Error: all fields are required");
        //cy.get('body').should('have.text', "\n\n\n Error: all fields are required\n Error: Invalid email address\n\n\n"); //chai assertion
        cy.get('body').contains('Error: all fields are required');
        cy.get('body').contains('Error: Invalid email address');*/

        
        //replaced the above with a custom command
        cy.webDriverUni_ContactForm_Submission(data.first_name, data.last_name, " ", "John's comment here", 'body', 'Error: Invalid email address')
    });
})