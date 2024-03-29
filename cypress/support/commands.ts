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

import '@4tw/cypress-drag-drop';
import 'cypress-localstorage-commands';

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', (userEmail, userPassword) => {
  const email = 'kgavrilkov@yandex.ru';
  const password = 'ABQR@888debt';
  cy.visit('http://localhost:3000/login');
  cy.wait(2000);
  cy.get('[data-cy="email"]').type(`${email}{enter}`);
  cy.get('[data-cy="password"]').type(`${password}{enter}`);
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/auth/login',
    failOnStatusCode: false,
    body: {
      user: {
        email: userEmail,
        password: userPassword
      }
    }
  })
    .its('body')
    .then((body) => {
      cy.setLocalStorage('accessToken', body.accessToken);
      cy.setLocalStorage('refreshToken', body.refreshToken);
    });
});