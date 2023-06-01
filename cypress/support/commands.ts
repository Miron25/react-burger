/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("feedMock", () => {
  cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
    fixture: "ingredients",
  });
  cy.visit("/");
});

Cypress.Commands.add("userMock", () => {
  cy.intercept("GET", "https://norma.nomoreparties.space/api/auth/user", {
    fixture: "user",
  });
  window.localStorage.setItem(
    "user",
    JSON.stringify({ email: "test@mail.ru", name: "TestUser" })
  );

  Cypress.Commands.add("orderMock", () => {
    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
      fixture: "createdorder",
    });
  });
});
