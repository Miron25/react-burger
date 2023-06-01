describe("Testing modals with ingredient details", function () {
  beforeEach(() => {
    cy.feedMock();
  });

  it("Should open and close modals", () => {
    cy.get('[data-test="Начинки"]').contains("Начинка 1").click();
    cy.get("[data-test=details-title]").contains("Детали ингредиента");
    cy.get("#react-modals").contains("Начинка 1");
    cy.wait(2000);
    cy.get("[data-test=close-btn]").click(); // Close on button click on modal

    cy.get('[data-test="Соусы"]').contains("Соус 2").click();
    cy.get("[data-test=details-title]").contains("Детали ингредиента");
    cy.get("#react-modals").contains("Соус 2");
    cy.wait(2000);
    cy.get("[data-test=modal-overlay]").parent().click({ force: true }); // Close on overlay click

    cy.get('[data-test="Булки"]').contains("Булка 1").click();
    cy.get("[data-test=details-title]").contains("Детали ингредиента");
    cy.get("#react-modals").contains("Булка 1");
    cy.wait(2000);
    cy.focused().type("{esc}"); // Close on pressing Esc button on keyboard
  });
});
