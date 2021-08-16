import axios from 'axios'
import { API_HOST, X_OS_VERSION } from '../env'
import { admin_token } from '../globalutilities/consts'
import { getToken, logOut } from '../globalutilities/helpers'

export const getPropertyAuction = auctionId => {
  return axios({
    url: `${API_HOST}properties/auction/${auctionId}`,
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json',
      'X-OS-Version': X_OS_VERSION
    },
    method: 'get',
    data: null
  })
    .then(response => response.data)
    .catch(error => {
      if (error && error.response && error.response.status === 401) {
      }
    })
}

export const getPropertyStatsTenantList = auctionId => {
  return axios({
    url: `${API_HOST}properties/auction/${auctionId}/bids`,
    headers: {
      Authorization: getToken() || admin_token,
      'Content-Type': 'application/json',
      'X-OS-Version': X_OS_VERSION
    },
    method: 'get',
    data: null
  })
    .then(response => response.data)
    .catch(error => {
      if (error && error.response && error.response.status === 401) {
      }
    })
}

export const submitCrForBids = bidId => {
  return axios({
    url: `${API_HOST}properties/auction/bid/${bidId}/chat`,
    headers: {
      Authorization: getToken() || admin_token,
      'Content-Type': 'application/json',
      'X-OS-Version': X_OS_VERSION
    },
    method: 'post',
    data: null
  })
    .then(response => response.data)
    .catch(error => {
      if (error && error.response && error.response.status === 401) {
        logOut()
      }
      console.error('auction error', error)
    })
}
