/// <reference types="cypress" />

describe('LandLord FAQ', () => {
  it('What to do at viewing appointment faq must contain appropriate image', () => {
    const languages = ['en', 'my', 'zh']
    const viewingAppointmentImages = [
      '/img/llfaq1.png',
      '/img/llfaq1_malay.png',
      '/img/llfaq1_chinese.png'
    ]
    languages.forEach((language, index) => {
      cy.visit(
        language == 'en'
          ? '/learn/landlord-faq'
          : `${language}/learn/landlord-faq`
      )
      cy.get('[data-testId=landlordfaq_tab]')
        .click({ force: true })
        .get('[data-testId=faq_what_to_do_at_viewing_appointment]')
        .click({ force: true })
        .siblings('img')
        .should('have.attr', 'src', viewingAppointmentImages[index])
    })
  })
})
