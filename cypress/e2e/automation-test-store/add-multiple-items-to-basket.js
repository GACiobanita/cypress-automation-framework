/// <reference types="Cypress" />

describe("Add multiple items to basket", () => {

    before(function () {
        cy.fixture("products").then(function (data) {
            globalThis.data = data;
        })
    });

    beforeEach(function () {
        cy.visit("https://automationteststore.com/");
        cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
    });

    it("Add specific items to basket", () => {
        globalThis.data.productName.forEach(function(element) {
            cy.addProductToBasket(element);
        });
        cy.get('.block_7 > .nav > .dropdown > .dropdown-toggle').click()
    });
});