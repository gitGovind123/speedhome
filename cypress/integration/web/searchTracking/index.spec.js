/// <reference types="cypress" />

describe('Test Search Tracking', () => {
  const urls = [
    'rent/kl/?q=kl',
    'rent/kl/highrise/?q=kl',
    'buy/kl/?q=kl',
    'buy/kl/highrise/?q=kl',
    'rent/Eve Suite Ara Damansara?q=Eve Suite Ara Damansara&category=PROPERTY',
    'rent/Eve Suite Ara Damansara/highrise/?q=Eve Suite Ara Damansara&category=PROPERTY',
    'buy/Eve Suite Ara Damansara?q=Eve Suite Ara Damansara&category=PROPERTY',
    'buy/Eve Suite Ara Damansara/highrise/?q=Eve Suite Ara Damansara&category=PROPERTY'
  ]
  const changedUrls = [
    'rent/kl/highrise/?q=kl',
    'rent/cyberjaya/?q=cyberjaya',
    'buy/kl/highrise/?q=kl',
    'buy/cyberjaya/highrise/?q=cyberjaya',
    'rent/Eve Suite Ara Damansara/highrise?q=Eve Suite Ara Damansara&category=PROPERTY&lm=40WBHmsBXwKPmQ20fAwZ',
    'rent/Eve Suite Ara Damansara?q=Eve Suite Ara Damansara&category=PROPERTY&lm=40WBHmsBXwKPmQ20fAwZ',
    'buy/Eve Suite Ara Damansara/highrise/?q=Eve Suite Ara Damansara&category=PROPERTY&lm=40WBHmsBXwKPmQ20fAwZ',
    'buy/Eve Suite Ara Damansara/?q=Eve Suite Ara Damansara&category=PROPERTY&lm=40WBHmsBXwKPmQ20fAwZ'
  ]
  it('should register a searchSessionId and visitorId for anonymous user', () => {
    urls.forEach(url => {
      cy.visit(url)
      cy.getCookie('searchSessionId').should('exist')
      cy.getCookie('visitorId').should('exist')
      cy.clearCookies()
    })
  })

  it('should register a new searchSessionId when search query changes', () => {
    urls.forEach((url, index) => {
      cy.clearCookies()
      cy.visit(url)
      cy.getCookie('searchSessionId')
        .should('exist')
        .then(cookie => {
          const oldSearchSessionId = cookie.value
          cy.visit(changedUrls[index])
          cy.getCookie('searchSessionId')
            .should('exist')
            .then(cookie => {
              expect(cookie.value).to.be.not.equal(oldSearchSessionId)
            })
        })
    })
  })

  it('should not change the visitorId when search query changes', () => {
    urls.forEach((url, index) => {
      cy.clearCookies()
      cy.visit(url)
      cy.getCookie('visitorId')
        .should('exist')
        .then(cookie => {
          const oldVisitorId = cookie.value
          cy.visit(changedUrls[index])
          cy.getCookie('visitorId')
            .should('exist')
            .then(cookie => {
              expect(cookie.value).to.be.equal(oldVisitorId)
            })
        })
    })
  })

  it('should not have visitor id for logged in user', () => {
    urls.forEach(url => {
      cy.login('60175113150', '5850')
      cy.visit(url)
      cy.getCookie('visitorId').should('be.null')
      cy.clearCookies()
    })
  })

  it('should not change search session id when navigating to other pages', () => {
    urls.forEach(url => {
      cy.clearCookies()
      cy.visit(url)
      cy.getCookie('searchSessionId')
        .should('exist')
        .then(cookie => {
          const oldSearchSessionId = cookie.value
          cy.visit('/')
          cy.getCookie('searchSessionId')
            .should('exist')
            .then(cookie => {
              expect(cookie.value).to.be.equal(oldSearchSessionId)
            })
        })
    })
  })

  it('should not change the exisiting search session id after user logs in', () => {
    urls.forEach(url => {
      cy.clearCookies()
      cy.visit(url)
      cy.getCookie('searchSessionId')
        .should('exist')
        .then(cookie => {
          const oldSearchSessionId = cookie.value
          cy.login('60175113150', '5850')
          cy.visit('/')
          cy.getCookie('searchSessionId')
            .should('exist')
            .then(cookie => {
              expect(cookie.value).to.be.equal(oldSearchSessionId)
            })
        })
    })
  })
})
