/// <reference types="Cypress" />
//^helps with the editor code

describe("Handle js alerts", () => {
    it("Confirm js alert contains the correct text", () => {
        cy.visit('http://www.webdriveruniversity.com/');
        //click the 'CONTACT US' button
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click();//target="_blank" attribute in the button forces a new tab to be opened and this gives us troubles, so we remove it via a jQuery command - removeAttr
        
        cy.get('#button1').click();

        //cypress automatically accepts alerts, but we can still capture the string and check them
        cy.on('window:alert', (str) => {
            expect(str).to.equal('I am an alert box!')
        })
    });

    it("Validate js confirm alert box works correctly when clicking ok", () => {
        cy.visit('http://www.webdriveruniversity.com/');
        //click the 'CONTACT US' button
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click();//target="_blank" attribute in the button forces a new tab to be opened and this gives us troubles, so we remove it via a jQuery command - removeAttr
        
        cy.get('#button4').click();

        //cypress automatically accepts alerts, but we can still capture the string and check them
        cy.on('window:confirm', (str) => {
            return true;
        })

        cy.get('#confirm-alert-text').contains('You pressed OK!');
    });

    it("Validate js confirm alert box works correctly when clicking cancel", () => {
        cy.visit('http://www.webdriveruniversity.com/');
        //click the 'CONTACT US' button
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click();//target="_blank" attribute in the button forces a new tab to be opened and this gives us troubles, so we remove it via a jQuery command - removeAttr
        
        cy.get('#button4').click();

        //cypress automatically accepts alerts, but we can still capture the string and check them
        cy.on('window:confirm', (str) => {
            return false;
        })

        cy.get('#confirm-alert-text').contains('You pressed Cancel!');
    });

    it.only("Validate js confirm alert box using a stub", () => {
        cy.visit('http://www.webdriveruniversity.com/');
        //click the 'CONTACT US' button
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click();//target="_blank" attribute in the button forces a new tab to be opened and this gives us troubles, so we remove it via a jQuery command - removeAttr
        
        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('#button4').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Press a button!')
        }).then(() => {
            return true;
        }).then(() => {
            cy.get('#confirm-alert-text').contains('You pressed OK!');
        })
    });
})