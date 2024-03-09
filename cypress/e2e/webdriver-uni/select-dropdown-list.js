/// <reference types="cypress" />

describe("Interact with dropdown lists via webdriveruni", () => {
    it("Select specific values via select dropdown lists", () => {
        cy.visit("https://www.webdriveruniversity.com")
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click({force:true})

        //selection based on attribute values
        cy.get('#dropdowm-menu-1').select('c#') //simply passing the list value (this is from the attribute 'value' inside the element)
        cy.get('#dropdowm-menu-2').select('testng').should('have.value','testng') //value assertion
        //selection based on text value
        cy.get('#dropdowm-menu-3').select('JQuery').contains('JQuery') //text assertion

        cy.get('#dropdowm-menu-2').select('maven').should('have.value', 'maven')
        cy.get('#dropdowm-menu-2').select('TestNG').contains('TestNG') //btw this guy doesn't know how to write 'down' reason why my test failed because I was writing it correctly as 'down'
    });
})