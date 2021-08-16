/// <reference types="cypress"/>

describe('Test Mark Favorite and Unmark Favorite On Search Listing', () => {

    beforeEach(() => {
        cy.visit('http://speedhome.local:1000/rent/Eve-Suite-Ara-Damansara?q=Eve%20Suite,%20Ara%20Damansara&category=PROPERTY&lm=40WBHmsBXwKPmQ20fAwZ')
    })

    it('Check Favorite button Exists', () => {
      cy.get('svg')
        .should('have.class', 'fav_common')
    })
  })