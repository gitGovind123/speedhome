import axios from 'axios'
import { API_HOST, X_OS_VERSION } from '../env'
export const SUBMIT_VIEWING = 'SUBMIT_VIEWING'
import { getToken, logOut } from '../globalutilities/helpers'

export function submitViewingySuccess (json) {
  return { type: SUBMIT_VIEWING, payload: true }
}

export function homeRunnerCollectKey (data) {
  return dispatch => {
    return axios({
      url: `${API_HOST}homerunner/key`,
      headers: {
        Authorization: getToken(),
        'Content-Type': 'application/json',
        'X-OS-Version': X_OS_VERSION
      },
      method: 'put',
      data
    })
      .then(response => {
        return {
          type: 'SUCCESS',
          val: response.data
        }
      })
      .catch(error => {
        if (error && error.response && error.response.status === 401) {
          logOut()
        } else {
          return {
            type: 'FAIL'
          }
        }
      })
  }
}

export function homeRunnerReturnKey (data) {
  return dispatch => {
    return axios({
      url: `${API_HOST}homerunner/key/return`,
      headers: {
        Authorization: getToken(),
        'Content-Type': 'application/json',
        'X-OS-Version': X_OS_VERSION
      },
      method: 'put',
      data
    })
      .then(response => {
        return {
          type: 'SUCCESS',
          val: response.data
        }
      })
      .catch(error => {
        if (error && error.response && error.response.status === 401) {
          logOut()
        }
        return {
          type: 'FAIL'
        }
      })
  }
}

export function validatePostalCodeforActivePropertyAPI (postalCodeData) {
  return dispatch => {
    return axios({
      url: `${API_HOST}homerunner/area-cover`,
      headers: {
        Authorization: getToken(),
        'Content-Type': 'application/json',
        'X-OS-Version': X_OS_VERSION
      },
      method: 'POST',
      data: postalCodeData
    })
      .then(response => response.data)
      .then(json => {
        return {
          type: 'SUCCESS',
          value: json
        }
      })
      .catch(error => {
        if (error && error.response && error.response.status === 401) {
          logOut()
        } else {
          return {
            type: 'FAIL'
          }
        }
      })
  }
}
