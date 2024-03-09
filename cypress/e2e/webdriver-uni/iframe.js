/// <reference types="cypress" />

//can't inspect iframe steps in runner
describe("Handling IFrame & Modals", () => {
    it("Handle webdriveruni iframe and modal", () => {
        cy.visit("/")
        cy.get('#iframe').invoke('removeAttr', 'target').click({force:true})

        cy.get('#frame').then($iframe => {
            const body = $iframe.contents().find('body')
            cy.wrap(body).as('iframe')
        })

        cy.get('@iframe').find('#button-find-out-more').click()
        cy.get('@iframe').find('#myModal').as('modal') //giving it an alias to run cypress commands on it
        cy.get('@modal').should(($expectedText) => { //grabbed our modal
            const text = $expectedText.text() //grabbed our modal text
            expect(text).to.include('Welcome to webdriveruniversity.com we sell a wide range of electrical good'); 
        })

        cy.get('@modal').contains('Close').click() //get our modal, and if it contains the text Close, click
    });
})