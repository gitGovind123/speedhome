/// <reference types="cypress" />
import moment from 'moment'

describe('Test Search Tracking For Chat Request', () => {
  it('should contain source_type and ssid in headers in chat request api', () => {
    cy.login('60196484491', '1234')
    cy.intercept('POST', '**/chat/request', { success: true }).as('chatRequest')
    cy.visit('rent/kl/?q=kl')
    cy.get('[data-testid=propertyListItemWrapper]')
      .last()
      .should('have.attr', 'href')
      .then(href => {
        cy.visit(href)
        cy.getCookie('searchSessionId')
          .should('exist')
          .then(cookie => {
            const searchSessionId = cookie.value
            cy.get('#btnChatWithOwner2').click({ force: true })
            cy.get('#moveInDate').type(
              moment()
                .add(10, 'days')
                .calendar()
            )
            cy.get('#occupation').type('Web developer at speedhome')
            cy.get('#nationality')
              .click()
              .focused()
              .type('{enter}', { force: true })
            cy.get('#budget').type(200000)
            cy.get('#tenance_duration')
              .click()
              .focused()
              .type('{enter}', { force: true })
            cy.get('#btnSubmitChatRequest').click()
            cy.wait('@chatRequest').then(interception => {
              expect(
                interception.request.headers['x-search-session-id']
              ).to.be.equal(searchSessionId)
              expect(interception.request.headers['x-source-type']).to.be.equal(
                'web_result'
              )
            })
          })
      })
  })
  it('should contain source_type, source_ref and ssid in headers in chat request api', () => {
    cy.login('60196484491', '1234')
    cy.intercept('POST', '**/chat/request', { success: true }).as('chatRequest')
    cy.visit('rent/kl/?q=kl')
    cy.get('[data-testid=propertyListItemWrapper]')
      .last()
      .should('have.attr', 'href')
      .then(link => {
        cy.visit(link)
        cy.get('[data-testid=propertyListItemWrapper]')
          .first()
          .should('have.attr', 'href')
          .then(href => {
            cy.visit(href)
            cy.getCookie('searchSessionId')
              .should('exist')
              .then(cookie => {
                const searchSessionId = cookie.value
                const ref = href
                  .split('?')
                  .pop()
                  .split('&')
                  .pop()
                  .split('=')[1]
                cy.get('#btnChatWithOwner2').click({ force: true })
                cy.get('#moveInDate').type(
                  moment()
                    .add(10, 'days')
                    .calendar()
                )
                cy.get('#occupation').type('Web developer at speedhome')
                cy.get('#nationality')
                  .click()
                  .focused()
                  .type('{enter}', { force: true })
                cy.get('#budget').type(200000)
                cy.get('#tenance_duration')
                  .click()
                  .focused()
                  .type('{enter}', { force: true })
                cy.get('#btnSubmitChatRequest').click()
                cy.wait('@chatRequest').then(interception => {
                  expect(
                    interception.request.headers['x-search-session-id']
                  ).to.be.equal(searchSessionId)
                  expect(
                    interception.request.headers['x-source-type']
                  ).to.be.equal('recommendation_listing_page')
                  expect(
                    interception.request.headers['x-source-ref']
                  ).to.be.equal(ref)
                })
              })
          })
      })
  })
})
