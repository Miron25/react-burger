describe("App is available", function () {
  it("Should load ingredients on the home page", () => {
    cy.feedMock();

    cy.get('[data-test="Булки"]').should("have.length", 1);
    cy.get('[data-test="Соусы"]').should("have.length", 2);
    cy.get('[data-test="Начинки"]').should("have.length", 2);
  });
});
