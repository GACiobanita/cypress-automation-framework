/// <reference types="cypress" />

describe("Verify autocomplete dropdown lists via webdriveruni", () => {
    it("Select Avacado & Grapes product via autocomplete list", () => {
        cy.visit("https://www.webdriveruniversity.com")
        cy.get('#autocomplete-textfield').invoke('removeAttr', 'target').click({force:true})

        cy.get('#myInput').type('A')

        //get all elements tied to the list and iterate through each one
        cy.get('#myInputautocomplete-list > *').each(($el, index, $list) => {
            const prod = $el.text();
            const productToSelect = 'Avacado';

            if(prod === productToSelect) {
                //$el.click(); //deprecated
                $el.trigger("click");

                cy.get('#submit-button').click();
                cy.url().should('include', productToSelect);
            }
        }).then(() => { //execute the then block if the previous block is successful
            cy.get('#myInput').type('G')

            //get all elements tied to the list and iterate through each one
            cy.get('#myInputautocomplete-list > *').each(($el, index, $list) => {
                const prod = $el.text();
                const productToSelect = 'Grapes';
    
                if(prod === productToSelect) {
                    //$el.click(); //deprecated
                    $el.trigger("click");
    
                    cy.get('#submit-button').click();
                    cy.url().should('include', productToSelect);
                }
            })
        })
    });
})