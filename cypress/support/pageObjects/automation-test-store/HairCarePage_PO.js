class HairCare_PO {
    addHairCareProductsToBasket() {
        globalThis.data.productName.forEach(function(element) {
            cy.addProductToBasket(element).then(() => { 
                //debugger
            });
        });
        cy.get('.block_7 > .nav > .dropdown > .dropdown-toggle').click().debug();
    }
}
export default HairCare_PO;