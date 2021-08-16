/// <reference types="cypress" />

describe('Dropdown menu in listing', () => {
  it('Should be open and top of stack when icon is clicked', () => {
    cy.login('60143287865', '8786')

    cy.visit('/dashboard/listings')

    cy.get('[data-testId=propertyListItemDropdown]')
      .first()
      .click({ force: true })

    cy.get('[data-testId=propertyListItemDropdownMenu]').should('be.visible')
  })
})
