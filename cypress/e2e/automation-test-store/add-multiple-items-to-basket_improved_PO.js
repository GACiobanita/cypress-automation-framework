import HomePage_PO from "../../support/pageObjects/automation-test-store/HomePage_PO";
import HairCare_PO from "../../support/pageObjects/automation-test-store/HairCarePage_PO";
/// <reference types="Cypress" />

describe("Add multiple items to basket", () => {
    const homepage_PO = new HomePage_PO();
    const haircare_PO = new HairCare_PO();

    before(function () {
        cy.fixture("products").then(function (data) {
            globalThis.data = data;
        })
    });

    beforeEach(function () {
        homepage_PO.visitHomepage();
        homepage_PO.clickOn_HairCare_Link();
    });

    it("Add specific items to basket", () => {
        haircare_PO.addHairCareProductsToBasket();
    });
});