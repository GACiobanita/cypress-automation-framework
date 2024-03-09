/// <reference types="Cypress" />

describe('hooks', function () {
    before(function () { //before all including beforeeach
        cy.log("runs once before all tests");
    });

    after(function () { //after all including the last aftereach
        cy.log("runs once after the last test");
    });

    beforeEach(function () {
        cy.log("runs before each test in this block");
    });

    afterEach(function () {
        cy.log("runs after each test in this block");
    });

    it("Example test1", () => {
        cy.log("Example test1!")
    });

    it("Example test2", () => {
        cy.log("Example test2!")
    });
});
