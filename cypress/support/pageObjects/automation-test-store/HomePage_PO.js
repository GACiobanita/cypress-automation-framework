class HomePage_PO {
    visitHomepage() {
        cy.visit("https://automationteststore.com/");
    }

    clickOn_HairCare_Link() {
        cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
    }
}
export default HomePage_PO;