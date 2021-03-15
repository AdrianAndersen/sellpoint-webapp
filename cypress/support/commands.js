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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add("login", (username, password) => {
  cy.logout();
  cy.log("Ready to log in");
  cy.getBySel("loginBtn").click();
  cy.get("input[name=email]").type(username);
  cy.get("input[name=password]").type(password + "{enter}");
});

Cypress.Commands.add("logout", () => {
  // eslint-disable-next-line promise/catch-or-return
  cy.getBySel("loginBtn")
    .invoke("text")
    .then((btn) => {
      // eslint-disable-next-line promise/always-return
      if (btn.includes("Logg ut")) {
        cy.getBySel("loginBtn").click();
      }
    });
});
