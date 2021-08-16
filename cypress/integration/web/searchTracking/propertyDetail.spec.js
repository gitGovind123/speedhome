/// <reference types="cypress" />

describe('Test Search Tracking For Property View Count', () => {
  it('should contain source_type in url in property list items', () => {
    cy.visit('rent/kl/?q=kl')
    cy.get('[data-testid=propertyListItemWrapper]')
      .first()
      .should('have.attr', 'href')
      .and('include', '?source_type=web_result')
  })

  it('should contain source_type and source_ref in url in recommended property list items', () => {
    cy.login('60196484491', '1234')
    cy.visit('rent/kl/?q=kl')
    cy.get('[data-testid=propertyListItemWrapper]')
      .first()
      .should('have.attr', 'href')
      .then(href => {
        cy.visit(href)
        const ref = href
          .split('/')
          .pop()
          .split('-')
          .pop()
          .split('?')[0]
        cy.get('[data-testid=propertyListItemWrapper]')
          .first()
          .should('have.attr', 'href')
          .and(
            'include',
            `?source_type=recommendation_listing_page&source_ref=${ref}`
          )
      })
  })

  it('should send appropriate headers to the smart recommend api', () => {
    cy.login('60196484491', '1234')
    cy.intercept('GET', '**/properties/recommend/smart').as(
      'smartRecommendation'
    )
    cy.visit('rent/kl/?q=kl')
    cy.getCookie('searchSessionId')
      .should('exist')
      .then(cookie => {
        const searchSessionId = cookie.value
        cy.get('[data-testid=propertyListItemWrapper]')
          .first()
          .should('have.attr', 'href')
          .then(href => {
            cy.visit(href)
            const ref = href
              .split('/')
              .pop()
              .split('-')
              .pop()
              .split('?')[0]
            cy.wait('@smartRecommendation').then(interception => {
              expect(
                interception.request.headers['x-search-session-id']
              ).to.be.equal(searchSessionId)
              expect(interception.request.headers['x-source-type']).to.be.equal(
                'listing_page'
              )
              expect(interception.request.headers['x-source-ref']).to.be.equal(
                ref
              )
            })
          })
      })
  })
})
