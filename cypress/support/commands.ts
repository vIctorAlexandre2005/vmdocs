/// <reference types="cypress" />

Cypress.Commands.add("register", (user) => {
  cy.contains("Registre-se").click();
  cy.get('[data-cy="input-full-name"]').type(user.full_name);
  cy.get('[data-cy="input-user"]').type(user.login);
  cy.get('[data-cy="input-email"]').type(user.email);
  cy.get('[data-cy="input-password"]').type(user.password);
  cy.get('[data-cy="input-confirm-password"]').type(user.confirmPassword);
  cy.get('[data-cy="button-register"]').click();
});