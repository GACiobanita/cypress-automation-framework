/// <reference types="cypress" />

describe("Test mouse actions webdriveruniversity", () => {
    it("Scroll element into view", () => {
        cy.visit("https://www.webdriveruniversity.com");
        cy.get('#actions').scrollIntoView().invoke('removeAttr', 'target').click({force:true});
    });

    it("I should be able to drag and drop a draggable item", () => {
        cy.visit("https://www.webdriveruniversity.com");
        cy.get('#actions').scrollIntoView().invoke('removeAttr', 'target').click({force:true});
        
        cy.get('#draggable').trigger('mousedown', {which: 1}); //trigger() -> Trigger an event on a DOM element. e.g. mouse button presses
        
        cy.get('#droppable').trigger('mousemove').trigger('mouseup', {force: true}) //force action skipping waiting for actionability
    });

    it("I should be able to perform a double mouse click", () => {
        cy.visit("https://www.webdriveruniversity.com");
        cy.get('#actions').scrollIntoView().invoke('removeAttr', 'target').click({force:true});
        
        cy.get('#double-click').dblclick();
    });

    it("I should be able to hold down the left mouse click button on a given item", () => {
        cy.visit("https://www.webdriveruniversity.com");
        cy.get('#actions').scrollIntoView().invoke('removeAttr', 'target').click({force:true});
        
        cy.get('#click-box').trigger('mousedown', {which: 1}).then(($element) => {
            expect($element).to.have.css('background-color', 'rgb(0, 255, 0)') //background-color css attribute check
        });
    });
})