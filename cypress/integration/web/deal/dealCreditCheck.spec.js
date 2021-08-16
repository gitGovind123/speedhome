/// <reference types="cypress" />

describe('Test Deal link credit check page not failed to proceed once it refreshed', () => {

  beforeEach(() => {
    cy.visit('http://speedhome.local:1000/deal/creditCheck')
    cy.login('60177230711', '1112')
  })

  it('should show Logo', () => {

    cy.visit('http://speedhome.local:1000/deal/creditCheck')

    cy.get('img')
      .should('have.attr', 'alt', 'Speedhome logo')

  })

  it('should show Login Status', () => {

    // auth cookie should be present
      cy.getCookie('id').should('exist')

  })

})
