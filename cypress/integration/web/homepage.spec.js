/// <reference types="cypress" />

describe('Test Homepage Elements', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show company name and registration number on the footer', () => {
    cy.get('[data-testId=company__registration__show]').should('exist')
  })
})
