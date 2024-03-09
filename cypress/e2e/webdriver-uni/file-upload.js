/// <reference types="cypress" />

describe("Test file upload via webdriver uni", () => {
    beforeEach(() => {
        cy.visit("https://www.webdriveruniversity.com");
        cy.get('#file-upload').invoke('removeAttr', 'target').click({force:true});
    }); //executed before each individual test

    it("Upload a file", () => {
        cy.get("#myFile").selectFile("cypress/fixtures/laptop.png");
        cy.get("#submit-button").click();
        //add alert box assertion
    });

    it("Upload no file", () => {
        cy.get("#submit-button").click();
        //add alert box assertion
    });
})