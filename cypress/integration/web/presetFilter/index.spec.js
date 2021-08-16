/// <reference types="cypress" />

describe('Test Preset Filter', () => {
  it('should redirect the search without keyword (kuala-lumpur) to preset filter', () => {
    cy.visit('more/tenant')
    cy.get('#searchButton').click({ force: true })
    cy.url().should('contain', 'presetFilter=true')
  })
})
