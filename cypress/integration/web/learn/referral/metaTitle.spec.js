/// <reference types="cypress" />

describe('Meta title in referral', () => {

beforeEach(() => {
  cy.login('60196484491', '1234')
})

  it('Should see a dynamic year in the title on refer', () => {
    const targetYear = new Date().getFullYear()
    cy.visit('more/refer')
    cy.title().should('eq', 'SPEEDHOME Referral Program '+ targetYear + ' | Refer & Earn RM200')
})

  it('Should see a dynamic year in the title on refer FAQ', () => {
    const targetYear = new Date().getFullYear()
    cy.visit('more/refer/faq')
    cy.title().should('eq', 'FAQ - SPEEDHOME Referral Program ' + targetYear)
  })
})