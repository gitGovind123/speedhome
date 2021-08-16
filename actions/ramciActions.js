import { REMOVE_RAMCI_ERROR } from './types'
import axios from 'axios'
import { API_HOST } from '../env'
import { getToken, logOut } from '../globalutilities/helpers'

export function removeRamciError () {
  return dispatch => {
    dispatch({
      type: REMOVE_RAMCI_ERROR
    })
  }
}

export function submitRamciNewWay (data) {
  return dispatch => {
    const submitData = {
      email: data.email,
      name: data.name,
      nric: data.nric,
      phone: data.phone
    }

    return axios({
      url: `${API_HOST}ramci/submit`,
      headers: {
        Authorization: getToken(),
        'Content-Type': 'application/json'
      },
      data: submitData,
      method: 'post'
    })
      .then(response => response.data)
      .then(json => {
        return {
          type: 'SUCCESS',
          payload: json
        }
      })
      .catch(err => {
        if (getToken() && err && err.response && err.response.status === 401) {
          logOut()
        } else {
          return {
            type: 'FAIL'
          }
        }
      })
  }
}

export function updateConsentNewWay (data) {
  return dispatch => {
    const updateConsentData = {
      icBack: data.icBack,
      icFront: data.icFront,
      nric: data.nric
    }
    return axios({
      url: `${API_HOST}ramci/update-consent`,
      headers: {
        Authorization: getToken(),
        'Content-Type': 'application/json'
      },
      data: updateConsentData,
      method: 'post'
    })
      .then(response => response.data)
      .then(json => {
        return {
          type: 'SUCCESS',
          payload: json
        }
      })
      .catch(err => {
        if (getToken() && err && err.response && err.response.status === 401) {
          logOut()
        } else {
          return {
            type: 'FAIL'
          }
        }
      })
  }
}

export function getRamciStatus () {
  return dispatch => {
    return axios({
      url: `${API_HOST}ramci/status`,
      headers: {
        Authorization: getToken(),
        'Content-Type': 'application/json'
      },
      data: {},
      method: 'get'
    })
      .then(response => response.data)
      .then(json => {
        return {
          type: 'SUCCESS',
          payload: json
        }
      })
      .catch(err => {
        if (getToken() && err && err.response && err.response.status === 401) {
          logOut()
        } else {
          dispatch({
            type: 'FAIL'
          })
        }
      })
  }
}
