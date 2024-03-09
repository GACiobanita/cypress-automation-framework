/// <reference types="Cypress" />
/// <reference types="@cypress/xpath" /> //see cy.xpth command

//^helps with the editor code

describe("Iterate over elements", () => {
    beforeEach(function() {
        cy.visit("https://automationteststore.com/");
        cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
    });
    
    it("Log information of all hair care products", () => {
        // $el is a jQuery element so we can use .text() for example
        cy.get('.fixed_wrapper .prdocutname').each(($el, index, $list) => {
            cy.log("index: " + index + " : " + $el.text());
        });
    });

    it("Add specific product to basket", () => {
       // $el is a jQuery element so we can use .text() for example
        /*cy.get('.fixed_wrapper .prdocutname').each(($el, index, $list) => {
            if ($el.text().includes('Curls to straight Shampoo')) {
                cy.wrap($el).click();
                cy.get('.cart').click();
            }
        });*/

        cy.selectProduct('Curls to straight Shampoo'); //were using a custom command with the above code
    });

    it("Add another specific product to basket", () => {
        cy.selectProduct('Seaweed Conditioner'); //were using a custom command with the above code
    });

    it("Add another specific product to basket", () => {
        cy.selectProduct('Seaweed Conditioner'); //were using a custom command with the above code
    });

    it("Add another specific product to basket", () => {
       cy.selectProduct('Pantene Pro-V Conditioner, Classic Care'); //were using a custom command with the above code
    });
});