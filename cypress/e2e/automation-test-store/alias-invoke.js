/// <reference types="Cypress" />
/// <reference types="@cypress/xpath" /> //see cy.xpth command

//^helps with the editor code

describe("Alias and invoke", () => {
    it("Validate a specific hair care product", () => {
        cy.visit("https://automationteststore.com/");
        cy.get("a[href*='product/category&path=']").contains("Hair Care").click();

        //isolated the first header from the list of headers, 0 - jQuery, from which we invoked the text() function and gave its result an alias
        cy.get('.fixed_wrapper .prdocutname').eq(0).invoke('text').as('productThumbnail');
        //verify that the product name, string, is longer than 5 characters
        cy.get('@productThumbnail').its('length').should('be.gt', 5);
        cy.get('@productThumbnail').should('include', 'Seaweed Conditioner');
    });

    it("Validate number of product thumbnails", () => {
        cy.visit("https://automationteststore.com/");
        //you can even give full lists of elements an alias, making it your reference list
        cy.get('.thumbnail').as('productThumbnails');
        cy.get('@productThumbnails').should('have.length', 16);
    });

    it("Validate cart icon exists", () => {
        cy.visit("https://automationteststore.com/");
        //you can even give full lists of elements an alias, making it your reference list
        cy.get('.thumbnail').as('productThumbnails');
        //.find, look inside the thumbnail element and find the descendant/child element '.productcart', and once you found the element, I want to invoke the 'title' attribute and verify that it is correct
        cy.get('@productThumbnails').find('.productcart').invoke('attr', 'title').should('include', 'Add to Cart');
    });

    it.only("Calculate total of normal and sale products", () => {
        cy.visit("https://automationteststore.com/");
        //you can even give full lists of elements an alias, making it your reference list
        cy.get('.thumbnail').as('productThumbnails');
        //can be done better
        /* cy.get('@productThumbnails').find('.oneprice').each(($el, index, $list) => { //from the list of productThumbnails we get a list of .oneprice headers through which we iterate, .oneprice contains the price text in the web view
            cy.log($el.text());
        }); */
        cy.get('.thumbnail').find('.oneprice').invoke('text').as('itemPrice'); //from all thumbnails, extract the price text and give the list the alias itemPrice, this also only gets item prices that are NOT on sale, as sales have a different div
        cy.get('.thumbnail').find('.pricenew').invoke('text').as('saleItemPrice'); //this one gets only items prices that are on sale

        var itemsTotal = 0;
        //make a promise so we can iterate, on items that are not on sale
        cy.get('@itemPrice').then($linkText => {
            var itemsPriceTotal = 0;
            var itemPrice = $linkText.split('$'); //splits a string into an array of substrings via '$',also removes the '$' symbol
            var i;
            for(i = 0; i < itemPrice.length; i++) {
                cy.log(itemPrice[i]);
                itemsPriceTotal += Number(itemPrice[i]); //convert any string into a number - Number(str)
            }
            itemsTotal += itemsPriceTotal;
            cy.log("Non sale price items total: " + itemsPriceTotal);
        });

        //this is for items that are on sale
        cy.get('@saleItemPrice').then($linkText => {
            var saleItemsPrice = 0;
            var saleItemPrice = $linkText.split('$');
            var i;
            for(i = 0; i < saleItemPrice.length; i++) {
                cy.log(saleItemPrice[i]);
                saleItemsPrice += Number(saleItemPrice[i]); //convert any string into a number - Number(str)
            }
            itemsTotal += saleItemsPrice;
            cy.log("Sale price items total: " + saleItemsPrice);
        }).then(() => { //after running the above cy.get, assert whether the total is correct
            cy.log("The total of all products: " + itemsTotal);
            expect(itemsTotal).to.equal(660.5); //assert the item price is correct - via Chai 
        });
    });
});