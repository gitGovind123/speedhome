import axios from 'axios'
import { API_HOST, X_OS_VERSION, PUBLIC_AUTH_TOKEN } from '../env'
import { getToken, getUserId, logOut } from '../globalutilities/helpers'

export function sendAuctionBidAPI (auctionId, payload) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}properties/auction/${auctionId}/submit`,
      headers: {
        Authorization: getToken() || '',
        'Content-Type': 'application/json',
        'X-Device-ID': PUBLIC_AUTH_TOKEN,
        'X-OS-Version': X_OS_VERSION
      },
      method: 'post',
      data: payload
    })
      .then(response => response.data)
      .then(json => resolve(json))
      .catch(error => {
        if (
          getToken() &&
          error &&
          error.response &&
          error.response.status === 401
        ) {
          logOut()
        } else {
          reject(error)
        }
      })
  })
}

export function sendChatRequestAPI (payload) {
  const searchSessionId = payload.search_session_id
  const source_type = payload.source_type
  const source_ref = payload.source_ref
  const visitor_id = payload.visitor_id
  delete payload.search_session_id
  delete payload.visitor_id
  delete payload.source_type
  delete payload.source_ref
  let headers = {
    Authorization: getToken() || '',
    'Content-Type': 'application/json',
    'X-Device-ID': PUBLIC_AUTH_TOKEN,
    'X-OS-Version': X_OS_VERSION,
    'X-Search-Session-ID': searchSessionId,
    'X-Source-Type': source_type,
    'X-Source-Ref': source_ref
  }
  if (visitor_id) headers['X-Visitor-ID'] = visitor_id
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}chat/request`,
      headers: headers,
      method: 'post',
      data: payload
    })
      .then(response => response.data)
      .then(json => resolve(json))
      .catch(error => {
        if (
          getToken() &&
          error &&
          error.response &&
          error.response.status === 401
        ) {
          logOut()
        } else {
          reject(error)
        }
      })
  })
}

export function sendChatRequestForSellAPI (payload) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}chat/request`,
      headers: {
        Authorization: getToken() || '',
        'Content-Type': 'application/json',
        'X-Device-ID': PUBLIC_AUTH_TOKEN,
        'X-OS-Version': X_OS_VERSION
      },
      method: 'post',
      data: payload
    })
      .then(response => response.data)
      .then(json => resolve(json))
      .catch(error => {
        if (
          getToken() &&
          error &&
          error.response &&
          error.response.status === 401
        ) {
          logOut()
        } else {
          reject(error)
        }
      })
  })
}
export function subscribeListingAlert (payload) {
  return new Promise((resolve, reject) => {
    if (getToken()) {
      axios({
        url: `${API_HOST}properties/alerts`,
        headers: {
          Authorization: getToken() || PUBLIC_AUTH_TOKEN,
          'Content-Type': 'application/json'
        },
        method: 'post',
        data: payload
      })
        .then(response => response.data)
        .then(json => resolve(json))
        .catch(error => {
          if (
            getToken() &&
            error &&
            error.response &&
            error.response.status === 401
          ) {
            logOut()
          } else {
            reject(error)
          }
        })
    }
  })
}

export function checkAppointment (propertyId) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}appointments/properties/${propertyId}`,
      headers: {
        Authorization: getToken() || '',
        'Content-Type': 'application/json'
      },
      method: 'get',
      data: null
    })
      .then(response => response.data)
      .then(json => resolve(json))
      .catch(error => {
        if (
          getToken() &&
          error &&
          error.response &&
          error.response.status === 401
        ) {
          logOut()
        } else {
          reject(error)
        }
      })
  })
}

export function updateInstantViewTime (payload) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}appointments/submit`,
      headers: {
        Authorization: getToken() || '',
        'Content-Type': 'application/json'
      },
      method: 'post',
      data: payload
    })
      .then(response => response.data)
      .then(json => resolve(json))
      .catch(error => {
        if (
          getToken() &&
          error &&
          error.response &&
          error.response.status === 401
        ) {
          logOut()
        } else {
          reject(error)
        }
      })
  })
}

export function updateInstallSource (payload) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}users/${getUserId()}/install-source`,
      headers: {
        Authorization: getToken() || '',
        'Content-Type': 'application/json'
      },
      method: 'post',
      data: payload
    })
      .then(response => response.data)
      .then(json => resolve(json))
      .catch(error => {
        if (
          getToken() &&
          error &&
          error.response &&
          error.response.status === 401
        ) {
          logOut()
        } else {
          reject(error)
        }
      })
  })
}
