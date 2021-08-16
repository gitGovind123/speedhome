/// <reference types="cypress" />
describe('Test Listing Page Action Logs', () => {
  it('should send action as entry on listing page visit', () => {
    cy.login('60196484491', '1234')
    cy.visit(
      'rent/Eve-Suite-Ara-Damansara?q=Eve%20Suite,%20Ara%20Damansara&category=PROPERTY&lm=40WBHmsBXwKPmQ20fAwZ'
    )
    let ssid = null
    cy.getCookie('searchSessionId').then(cookie => (ssid = cookie.value))

    cy.get('[data-testid=propertyListItemWrapper]')
      .first()
      .should('have.attr', 'data-href')
      .then(href => {
        cy.intercept('POST', '**/actionLog', {}).as('actionLog')
        cy.visit(href)
        // Entry
        cy.wait('@actionLog').then(interception => {
          expect(interception.request.headers['x-source-type']).to.be.equal(
            'web_result'
          )
          expect(
            interception.request.headers['x-search-session-id']
          ).to.be.equal(ssid)
          expect(interception.request.body).to.have.property('action', 'entry')
        })
        // Recommendation Click
        cy.get('[data-testid=propertyListItemWrapper]')
          .last()
          .click()
        cy.wait('@actionLog').then(interception => {
          expect(interception.request.headers['x-source-type']).to.be.equal(
            'web_result'
          )
          expect(
            interception.request.headers['x-search-session-id']
          ).to.be.equal(ssid)
          expect(interception.request.body).to.have.property(
            'action',
            'recommendations_click'
          )
          expect(interception.request.body).to.have.property('recommendedRef')
        })
        // Map View Click
        cy.get('[data-testId=listingPageMap]').click()
        cy.wait('@actionLog').then(interception => {
          expect(interception.request.headers['x-source-type']).to.be.equal(
            'web_result'
          )
          expect(
            interception.request.headers['x-search-session-id']
          ).to.be.equal(ssid)
          expect(interception.request.body).to.have.property(
            'action',
            'mapviewclick'
          )
        })
        // Cr click
        cy.get('#btnChatWithOwner2').click({ force: true })
        cy.wait('@actionLog').then(interception => {
          expect(interception.request.headers['x-source-type']).to.be.equal(
            'web_result'
          )
          expect(
            interception.request.headers['x-search-session-id']
          ).to.be.equal(ssid)
          expect(interception.request.body).to.have.property(
            'action',
            'crclick'
          )
        })
      })
    // Image Click
    cy.get('[data-testId=propertyDetailCarouselImage]')
      .find('img')
      .first()
      .click({ force: true })
    cy.wait('@actionLog').then(interception => {
      expect(interception.request.headers['x-source-type']).to.be.equal(
        'web_result'
      )
      expect(interception.request.headers['x-search-session-id']).to.be.equal(
        ssid
      )
      expect(interception.request.body).to.have.property(
        'action',
        'picture_click'
      )
    })
  })
})
