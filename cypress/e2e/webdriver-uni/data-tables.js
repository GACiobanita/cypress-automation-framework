/// <reference types="Cypress" />
describe("Handling data via WebDriverUni", () => {
    beforeEach(() => {
        cy.visit("https://webdriveruniversity.com/");
        cy.get("#data-table").invoke("removeAttr", "target").click({ force: true });
    }); //executed before each individual test
  
    it("Calculate and assert the total age of all users", () => {
        var userDetails = [];
        let numb = 0;

        cy.get('#thumbnail-1 td').each(($el, index, $list) => { //Iterate through an array like structure (arrays or objects with a length property).
            userDetails[index] = $el.text();
        }).then(() => {
            var i;

            for(i = 0; i < userDetails.length; i++) {
                if(Number(userDetails[i])) {
                    numb += Number(userDetails[i]); //only if it is a number, will it be added
                }
            }
            cy.log("Found total age: " + numb);
            expect(numb).to.eq(322);
        })
    });

    it("Calculate and assert the age of a given user based on last name", () => {
        cy.get('#thumbnail-1 tr td:nth-child(2)').each(($el, index, $list) => {
            const lastName = $el.text();
            
            if(lastName.includes("Woods")) {
                cy.get('#thumbnail-1 tr td:nth-child(2)').eq(index).next().then(function(age) { //went to the next element in the table row, which is the age element, and we extracted the age text
                    const userAge = age.text();
                    expect(userAge).to.eq("80");
                })
            }
        });
    });
  });
    