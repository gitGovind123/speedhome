import { API_HOST, PUBLIC_AUTH_TOKEN, X_OS_VERSION } from '../../env'
import Cookies from 'js-cookie'
import { generateUUID } from '../../utils/utils'

Cypress.Commands.add('login', (phoneNo, code) => {
  cy.request({
    method: 'POST',
    url: `${API_HOST}pin/verify`,
    headers: {
      'X-OS-Version': X_OS_VERSION,
      'X-Device-ID': Cookies.get('xDeviceId')
        ? Cookies.get('xDeviceId')
        : generateUUID(),
      Authorization: PUBLIC_AUTH_TOKEN,
      'Content-Type': ' application/json;charset=UTF-8'
    },
    body: { code, phoneNo }
  }).then(response => {
    Cookies.set('id', response.body.userId)
    Cookies.set('authToken', response.body.token)
  })
})

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
