/// <reference types="cypress" />

describe('Chat list item ', () => {
  it('Should redirect to chat listing page after deleting chat', () => {
    cy.login('60196484491', '1234')

    cy.visit('/dashboard/chat')

    cy.get('[data-testId=chat__list-item__menu]')
      .first()
      .click()

    cy.get('[data-testId=chat__list-item__delete]').click()

    cy.get('[data-testId=chat__list-item__delete-confirm]').click()

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}dashboard/chat`)
  })
})
