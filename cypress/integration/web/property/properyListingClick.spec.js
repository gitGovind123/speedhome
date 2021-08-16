/// <reference types="cypress" />
import moment from 'moment'

describe('Opening property item from search list', () => {
  it('should open property details page in new tab', () => {
    cy.visit('/rent/kl?q=kl')
    cy.get('[data-testId=propertyListItemWrapper]')
      .first()
      .should('have.attr', 'target', '_blank')
      .and('not.have.attr', 'href', 'undefined')
  })
})

describe('Creating Chat Request', () => {
  it.only('should ', () => {
    cy.login('60196484491', '1234')
    cy.visit('/rent/ara?q=ara')
    cy.get('[data-testId=ChatRequestBtn]')
      .first()
      .then($btn => {
        let txt = $btn.text().toLowerCase()
        if (txt === 'book appointment' || txt === 'chat with owner') {
          cy.get('[data-testId=ChatRequestBtn]')
            .first()
            .click({ force: true })

          cy.get('[data-testId=ChatRequestPopUp]')

          cy.get('#moveInDate').type(
            moment()
              .add(10, 'days')
              .calendar()
          )

          cy.get('#budget').type(200000)

          cy.get('#tenance_duration')
            .click()
            .focused()
            .type('{enter}', { force: true })

          cy.get('[data-testId=ChatRequestOccupation]').type('developer')

          cy.get('#nationality')
            .click()
            .focused()
            .type('{enter}', { force: true })

          cy.get('#btnSubmitChatRequest').click()

          cy.get('#instantViewRequestModal', { timeout: 10000 })

          cy.get('#timeSelection').select('11:00 a.m.')

          cy.get('#moveInDate').type(
            moment()
              .add(10, 'days')
              .calendar()
          )

          cy.get('[data-testId=instantViewRequestImage]').click()

          cy.get('#btnSubmitChatAppointment').click()

          cy.get('#profileInfoModal')

          cy.get('#btnSubmitChatProfile').click()

          cy.get('[data-testId=ChatRequestSentButton]').click()

          cy.visit('/rent/ara?q=ara')
          cy.get('[data-testId=ChatRequestBtn]')
            .first()
            .click()
          cy.wait(500)
          cy.url().should('contain', '/dashboard/chat?chatId=')
        } else {
          cy.get('[data-testId=ChatRequestBtn]')
            .first()
            .click()
          cy.wait(500)
          cy.url().should('contain', '/dashboard/chat?chatId=')
        }
      })
  })
})
