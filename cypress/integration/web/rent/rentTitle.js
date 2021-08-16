/// <reference types="cypress" />

import dayjs from 'dayjs'

describe('USP Titles on Rent queries', () => {

  it('Should see an updated meta title and description on every language', () => {
    const languages = ['en', 'my', 'zh']
    const searches = 'Kuala Lumpur'
    const searchesDate = dayjs(new Date()).format('MMM YYYY')
    const title = [
      searches + ', Zero Deposit Property For Rent [' + searchesDate + '] | SPEEDHOME',
      searches + ', Rumah Tanpa Deposit Untuk Disewa [' + searchesDate + '] | SPEEDHOME',
      searches + ', 零押金房屋出租 [' + searchesDate + '] | SPEEDHOME'
    ]
    const description = [
      'Over 3000+ Zero Deposit listings! List of ' + searches.toUpperCase() + ' studio apartment, house, condo for rent. Fully furnished/semi furnished home near LRT & Pet friendly.',
      'Lebihi 3000+ rumah Tanpa Deposit! ' + searches.toUpperCase() + ' bilik, studio apartment, rumah, condo untuk disewa. Rumah fully furnished/semi-furnished & dekat LRT. Sewa di sini!',
      '超过3000多间的零押金房屋供出租! ' + searches.toUpperCase() + ' 一室公寓, 房屋, condo 公寓供出租. 家具齐全/半齐全的房子, 附近 LRT & 宠物友好.'
    ]

    languages.forEach((language, index) => {
      cy.visit(
        language == 'en'
          ? '/rent'
          : `${language}/rent`
      )
      cy.get('#type_in_area').type(searches)
      cy.get('#searchButton').click()
      cy.title().should('eq', title[index])
      cy.get('head meta[name="description"]').should(
        'have.attr',
        'content',
        description[index]
      )
    })
  })

  it('When room filter is turned on, you should see an updated meta title and description on every languages', () => {
    const languages = ['en', 'my', 'zh']
    const searches = 'Kuala Lumpur'
    const searchesDate = dayjs(new Date()).format('MMM YYYY')
    const title = [
      searches + ', Zero Deposit Room For Rent [' + searchesDate + '] | SPEEDHOME',
      searches + ', Bilik Tanpa Deposit Untuk Disewa [' + searchesDate + '] | SPEEDHOME',
      searches + ', 零押金房屋出租 [' + searchesDate + '] | SPEEDHOME'
    ]
    const description = [
      'Over 3000+ Zero Deposit listings! List of ' + searches.toUpperCase() + ' studio apartment, master room, medium room for rent. Fully/semi-furnished room, wifi/internet room near LRT.',
      'Lebihi 3000+ rumah Tanpa Deposit! ' + searches.toUpperCase() + ' bilik, studio apartment, rumah, condo untuk disewa. Fully/semi-furnished, bilik dengan wifi/internet & dekat LRT. Sewa di sini!',
      '超过3000多间的零押金房屋供出租! ' + searches.toUpperCase() + ' 一室公寓, 主人房, 中房, 小房供出租. 家具齐全/半齐全的房间, 附近 LRT & 宠物友好.'
    ]

    languages.forEach((language, index) => {
      cy.visit(
        language == 'en'
          ? '/rent/Kuala-Lumpur/room'
          : `${language}/rent/${searches}/room`
      )
      cy.title().should('eq', title[index])
      cy.get('head meta[name="description"]').should(
        'have.attr',
        'content',
        description[index]
      )
    })
  })
})