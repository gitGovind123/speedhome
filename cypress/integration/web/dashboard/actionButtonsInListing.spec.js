/// <reference types="cypress" />

describe('Test Action buttons in dashboard listing', () => {

  beforeEach(() => {

    cy.login('60177230711', '1112')
    cy.visit('/dashboard/listings')

  })

  it('should not show three dot action buttons in Listings', () => {

    cy.get('[data-testId=propertyListItemDropdownMenu]').should('not.exist')

  })
  
  it('should show action buttons in Listings', () => {

    cy.get('[data-testId=dashboard_action_button]').should('exist')

  })

})
