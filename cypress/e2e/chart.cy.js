it("test", function () {
    cy.visit("/")
    cy.contains("Line").click()
})