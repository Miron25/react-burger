describe("Testing drag-n-drop functionality", function () {
  beforeEach(() => {
    cy.feedMock();
  });

  it("Should drag-n-drop a bun and an ingredient", () => {
    cy.get('[data-test="Булки"]').contains("Булка 1").trigger("dragstart");
    cy.get("[data-test=drop-area]").trigger("drop");
    cy.get("[data-test=top-bun]").contains("Булка 1 (верх)").should("exist");
    cy.get("[data-test=bottom-bun]").contains("Булка 1 (низ)").should("exist");

    cy.get('[data-test="Начинки"]').contains("Начинка 2").trigger("dragstart");
    cy.get("[data-test=drop-area]").trigger("drop");
    cy.get('[data-test="Соусы"]').contains("Соус 1").trigger("dragstart");
    cy.get("[data-test=drop-area]").trigger("drop");
    cy.get("[data-test=ingredients-area]")
      .contains("Начинка 2")
      .should("exist");
    cy.get("[data-test=ingredients-area]").contains("Соус 1").should("exist");
  });
});
