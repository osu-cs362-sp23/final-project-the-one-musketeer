// ***********************************************
// This example commands.js shows you how to
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
require("@testing-library/cypress/add-commands")

Cypress.Commands.add('confirmSameInfo', function () {
    cy.get("#chart-title-input").should("have.value", "Apples vs. Oranges")
    cy.get("#x-label-input").should("have.value", "Apples")
    cy.get("#y-label-input").should("have.value", "Oranges")
    cy.get(".x-value-input").should("have.value", "4")
    cy.get(".y-value-input").should("have.value", "5")
})