/// <reference types="Cypress" />
/// <reference types="@cypress/xpath" /> //see cy.xpth command
//^helps with the editor code

describe("Test Contact Us Form via AutomationTestStore", () => {
    before(function() {
        //cy.viewport(550, 750),
        cy.fixture("userDetails").as("user") //gave it an alias via .as command
    });

    it("Should be able to submit a successful submission via contact us form", {
        retries: {
            runMode: 2,
            openMode: 2
        }
    }, () => {
        cy.visit("https://automationteststore.com/");
        //cy.get('.info_links_footer > :nth-child(5) > a').click(); //this selector can be improved, if 5 was changed to a 4, this breaks the test
        //cy.xpath("//a[contains(@href, 'contact')]").click(); 
        cy.get("a[href$='contact']").click().then(function(buttonName) {
            cy.log("The button name is: " + buttonName.text());
        }); //better css selector, targets 1 obj
        cy.get("@user").then((user) => {
            cy.get('#ContactUsFrm_email').type(user.email);
            cy.get('#ContactUsFrm_first_name').type(user.first_name); //all these # are unique ids, which is ideal for our selectors
        })
        cy.get('#ContactUsFrm_email').should('have.attr', 'name', 'email');
        cy.get('#ContactUsFrm_enquiry').type("This is my enquiry text");
        //cy.get('.col-md-6 > .btn').click();
        cy.get("button[title='Submit']").click(); //optimized css selector
        //cy.get('.mb40 > :nth-child(3)').contains("Your enquiry has been successfully sent to the store owner!"); //can I improve this? Assertions lecture
        cy.get('.mb40 > :nth-child(3)').should('have.text', 'Your enquiry has been successfully sent to the store owner!');
        cy.log("Test has completed!"); //remember
    });
});