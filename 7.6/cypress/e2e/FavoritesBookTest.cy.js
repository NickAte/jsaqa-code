/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';
let bookData;

beforeEach(() => {
  cy.viewport(Cypress.env("viewportWidth"), Cypress.env("viewportHeight"));
  cy.visit("/");
  cy.login('test@test.com', 'test');
  (bookData = {
    title: faker.company.catchPhraseAdjective(),
    description: faker.company.catchPhrase(),
    author: faker.name.fullName(),
  })
})

describe('Favorite books testing', () => {
  it('Add book to favorite through "add new"', () => {
    cy.createFavoriteBook(bookData);
    cy.visit('/favorites');
    cy.get('.card-title')
      .should('contain', bookData.title);
  });

  it('Add book to favorite through "Book page"', () => {
    cy.addBookFavorite(bookData);
    cy.contains(bookData.title)
      .should('be.visible')
      .within(() => cy.get('.card-footer > .btn')
      .click({ force: true }));
    cy.visit('/favorites');
    cy.contains(bookData.title)
      .should('be.visible');
  });

	it('Delete book from favorite', () => {
		cy.createFavoriteBook(bookData);
    cy.visit('/favorites');
    cy.contains(bookData.title)
      .should('be.visible')
      .within(() => cy.get('.card-footer > .btn')
      .click({ force: true }));
    cy.contains(bookData.title)
      .should('not.exist');
  });
});