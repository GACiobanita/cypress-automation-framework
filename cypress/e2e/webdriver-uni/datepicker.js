/// <reference types="cypress" />

describe("Test datepicker via Webdriveruni", () => {
    it("Select date from the date picker", () => {
        cy.visit("https://www.webdriveruniversity.com");
        cy.get('#datepicker').invoke('removeAttr', 'target').click({force:true});
        cy.get('#datepicker').click();

        /*let date = new Date();
        cy.log(date.getDate()) //get current day i.e. 22

        let date2 = new Date();
        cy.log(date2.getDate() + 5) //current day + 5*/

        var date = new Date();
        date.setDate(date.getDate() + 365);

        var futureYear = date.getFullYear();
        var futureMonth = date.toLocaleDateString("default", {month: "long"});
        var futureDay = date.getDate();

        cy.log("Future year to select: " + futureYear);
        cy.log("Future month to selector: " + futureMonth);
        cy.log("Future day to selecto: " + futureDay);

        function selectMonthAndYear() {
            cy.get('.datepicker-dropdown').find('.datepicker-switch').first().then(currentDate => {
                if(!currentDate.text().includes(futureYear)) {
                    cy.get('.next').first().click();
                    selectMonthAndYear();
                }
            }).then(() => {
                cy.get('.datepicker-dropdown').find('.datepicker-switch').first().then(currentDate => {
                    if(!currentDate.text().includes(futureMonth)) {
                        cy.get('.next').first().click();
                        selectMonthAndYear();
                    }
                })
            })
        }

        function selectFutureDay() {
            cy.get('[class="day"]').contains(futureDay).click(); //search all the elements returned via the selector, and click the one that has it
        }

        selectMonthAndYear();
        selectFutureDay();

    });
})