import {
  GET_PIN_BY_PHONE,
  GET_PIN_BY_PHONE_SUCCESS,
  GET_PIN_BY_PHONE_ERROR,
  GET_VERIFY_PIN_ERROR,
  GET_VERIFY_PASSWORD,
  GET_USER,
  UNSET_DETAILS_FOR_BANNED_USER,
  SHOW_BANNED_ERROR,
  HAS_FACEBOOK_CONNECT,
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  CLEAR_USER,
  CLEAR_LOGIN_DATA,
  SHOW_VERFIY_INFO_POPUP,
  CLOSE_VERFIY_INFO_POPUP,
  SHOW_SET_PASSWORD_POPUP,
  CLOSE_SET_PASSWORD_POPUP,
  IS_OPEN_PLAYSTORE,
  SET_EMAIL_POPUP,
  IS_FROM_FORGET_PASSWORD,
  REMOVE_IS_FROM_FORGET_PASSWORD,
  SHOW_LOCKED_MODAL,
  SERVER_ERROR,
  GET_USER_PROFILE,
  USER_LOGINED
} from './types'
import { API_HOST, PUBLIC_AUTH_TOKEN, X_OS_VERSION } from '../env'
import axios from 'axios'
import Cookies from 'js-cookie'
import Router from 'next/router'
import dayjs from 'dayjs'

import { generateUUID } from '../utils/utils'
import { admin_token } from '../globalutilities/consts'
import { getToken, getUserId, logOut } from '../globalutilities/helpers'
let ajReferralCode = Cookies.get('ajreferral')

export function clearUser () {
  return dispatch => {
    dispatch({ type: CLEAR_USER, payload: null })
  }
}

export function openLoginModal (val) {
  return dispatch => {
    dispatch({ type: OPEN_LOGIN_MODAL, payload: val })
  }
}

export const closeLoginModal = () => {
  return dispatch => {
    dispatch({ type: CLOSE_LOGIN_MODAL, payload: null })
  }
}

export function clearLoginData () {
  return dispatch => {
    dispatch({ type: CLEAR_LOGIN_DATA, payload: null })
  }
}

export function logoutUser () {
  return axios({
    url: `${API_HOST}logout`,
    headers: {
      Authorization: getToken()
    },
    data: {},
    method: 'post'
  }).catch(error => {})
}

export function getPinByPhone (phoneNo) {
  return dispatch => {
    dispatch({ type: GET_PIN_BY_PHONE })
    return axios({
      url: `${API_HOST}pin/request`,
      headers: {
        Authorization: PUBLIC_AUTH_TOKEN
      },
      method: 'post',
      data: {
        phoneNo: phoneNo
      }
    })
      .then(response => response.data)
      .then(json => {
        return { type: GET_PIN_BY_PHONE_SUCCESS, phoneNo: json.phoneNo }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 422) {
            return {
              type: GET_PIN_BY_PHONE_ERROR,
              error: 'Invalid mobile number'
            }
          } else {
            return {
              type: GET_PIN_BY_PHONE_ERROR,
              error: 'Something went wrong'
            }
          }
        }
      })
  }
}

export function getVerifyUserPin (data, resetPasswordForm) {
  return (dispatch, getState) => {
    const goToReferPage = getState().auth.goToReferPage
    return axios({
      url: `${API_HOST}pin/verify`,
      headers: {
        'X-OS-Version': X_OS_VERSION,
        'X-Device-ID': Cookies.get('xDeviceId')
          ? Cookies.get('xDeviceId')
          : generateUUID(),
        Authorization: PUBLIC_AUTH_TOKEN
      },
      method: 'post',
      data: data
    })
      .then(response => response.data)
      .then(json => {
        Cookies.set('id', json.userId)
        Cookies.set('authToken', json.token)
        if (goToReferPage == true) {
          const url = '/more/refer'
          dispatch(autoLogin(json.userId, json.token, true))
          Router.push(url)
        } else if (ajReferralCode) {
          dispatch(is_referrals_exist(ajReferralCode, 'ISYNERGY', json.token))
        }
        dispatch(autoLogin(json.userId, json.token, true, resetPasswordForm))
      })
      .catch(error => {
        if (error.response && error.response.status !== 200) {
          if (
            error.response.status === 403 &&
            error.response.data.errorCode === 10100
          ) {
            return {
              type: SHOW_BANNED_ERROR,
              payload: {
                isNumberBanned: error.response.status === 401,
                isUserRestricted: error.response.status === 403
              }
            }
          } else if (
            error.response.status === 401 &&
            error.response.data.errorCode === 10020
          ) {
            return { type: GET_VERIFY_PIN_ERROR, payload: 'Wrong pin code' }
          } else {
            return { type: SERVER_ERROR, payload: error.response.data.message }
          }
        }
      })
  }
}
export function logInWithPassword (data) {
  return (dispatch, getState) => {
    const goToReferPage = getState().auth.goToReferPage
    return axios({
      url: `${API_HOST}login`,
      headers: {
        Authorization: PUBLIC_AUTH_TOKEN,
        'Content-Type': 'application/json'
      },
      method: 'post',
      data: data
    })
      .then(response => response.data)
      .then(json => {
        Cookies.set('id', json.userId)
        Cookies.set('authToken', json.token)
        if (goToReferPage == true) {
          const url = '/more/refer'
          dispatch(autoLogin(json.userId, json.token, true))
          Router.push(url)
        } else if (ajReferralCode) {
          dispatch(is_referrals_exist(ajReferralCode, 'ISYNERGY', json.token))
        }
        dispatch(autoLogin(json.userId, json.token, true))
      })
      .catch(error => {
        if (error.response && error.response.status !== 200) {
          if (
            error.response.status === 403 &&
            error.response.data.errorCode === 10100
          ) {
            return {
              type: SHOW_BANNED_ERROR,
              payload: {
                isNumberBanned: error.response.status === 401,
                isUserRestricted: error.response.status === 403
              }
            }
          } else if (
            error.response.status === 401 &&
            error.response.data.errorCode === 10010
          ) {
            return { type: GET_VERIFY_PASSWORD, payload: 'Wrong Password' }
          } else {
            return { type: SERVER_ERROR, payload: error.response.data.message }
          }
        }
      })
  }
}
export const getUserData = () => {
  return axios({
    url: `${API_HOST}users/${getUserId()}`,
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
      if (err && err.response && err.response.status === 401) {
        logOut()
      }
      return {
        type: 'FAIL'
      }
    })
}

export function autoLogin (userId, token, fromLogin, resetPasswordForm) {
  return dispatch => {
    if (userId && userId !== 'undefined' && token) {
      axios({
        url: `${API_HOST}users/${userId}`,
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        },
        data: {},
        method: 'get'
      })
        .then(response => response.data)
        .then(json => {
          dispatch({
            type: GET_USER,
            payload: json
          })
          if (resetPasswordForm == true) {
            dispatch(
              actionVerifyInfoPopUp(
                (json.name && json.name.toLowerCase() === 'guest') ||
                  json.email == null ||
                  json.email == '' ||
                  dayjs(new Date()).diff(
                    dayjs(json.stats.lastActivityDate),
                    'month',
                    true
                  ) +
                    1 >
                    6
              )
            )
          } else {
            if (fromLogin) {
              if (
                json.name &&
                json.name.toLowerCase() !== 'guest' &&
                json.email !== null &&
                json.email !== '' &&
                !json.passwordSet
              ) {
                dispatch(actionpasswordPopUp(!json.passwordSet))
              } else {
                dispatch(
                  actionVerifyInfoPopUp(
                    (json.name && json.name.toLowerCase() === 'guest') ||
                      json.email == null ||
                      json.email == '' ||
                      dayjs(new Date()).diff(
                        dayjs(json.stats.lastActivityDate),
                        'month',
                        true
                      ) +
                        1 >
                        6
                  )
                )
              }
            }
          }
        })
        .catch(error => {
          if (fromLogin) {
            if (error && error.response && error.response.status === 401) {
              dispatch({
                type: SHOW_BANNED_ERROR,
                payload: {
                  isNumberBanned: error.response.status === 401,
                  isUserRestricted: error.response.status === 403
                }
              })
            }
          }
        })
        .catch(error => {
          if (fromLogin) {
            if (error && error.response && error.response.status === 401) {
              dispatch({
                type: SHOW_BANNED_ERROR,
                payload: {
                  isNumberBanned: error.response.status === 401,
                  isUserRestricted: error.response.status === 403
                }
              })
            }
          }
        })
        .catch(error => {
          if (fromLogin) {
            if (error && error.response && error.response.status === 401) {
              dispatch({
                type: SHOW_BANNED_ERROR,
                payload: {
                  isNumberBanned: error.response.status === 401,
                  isUserRestricted: error.response.status === 403
                }
              })
            }
          }
        })
    }
  }
}

export const actionpasswordPopUp = value => {
  return {
    type: SHOW_SET_PASSWORD_POPUP,
    payload: value
  }
}
export const actionVerifyInfoPopUp = value => {
  return {
    type: SHOW_VERFIY_INFO_POPUP,
    payload: value
  }
}
export const closePasswordPopUp = dispatch => {
  return {
    type: CLOSE_SET_PASSWORD_POPUP,
    payload: false
  }
}
export const closeVerifyInfoPopUp = dispatch => {
  return {
    type: CLOSE_VERFIY_INFO_POPUP,
    payload: false
  }
}

export const unSetUser = () => async dispatch => {
  try {
    dispatch({
      type: UNSET_DETAILS_FOR_BANNED_USER,
      payload: {
        user: null,
        phoneNo: '',
        pinError: '',
        error: '',
        showRegistrationModal: false
      }
    })
  } catch (err) {}
}
export function pre_checked (phoneNo) {
  return dispatch => {
    return axios({
      url: `${API_HOST}pin/pre-check`,
      headers: {
        Authorization: admin_token,
        'Content-Type': 'application/json'
      },
      data: {
        phoneNo: phoneNo
      },
      method: 'post'
    })
      .then(response => response.data)
      .then(json => {
        return json
      })
  }
}

export function isConnectedWithFacebook (phoneNo) {
  return dispatch => {
    return axios({
      url: `${API_HOST}pin/facebookconnect`,
      headers: {
        Authorization: admin_token,
        'Content-Type': 'application/json'
      },
      data: {
        phoneNo: phoneNo
      },
      method: 'post'
    })
      .then(response => response.data)
      .then(json => {
        return {
          type: HAS_FACEBOOK_CONNECT,
          payload: {
            isAuthorised: json.isAuthorised,
            phoneNo: phoneNo
          }
        }
      })
  }
}

export function verifyFacebookConnect (data) {
  return dispatch => {
    return axios({
      url: `${API_HOST}pin/facebookconnect/verify`,
      headers: {
        Authorization: admin_token,
        'Content-Type': 'application/json'
      },
      data,
      method: 'post'
    })
      .then(response => response.data)
      .then(json => {
        Cookies.set('id', json.userId)
        Cookies.set('authToken', json.token)

        dispatch(autoLogin(json.userId, json.token, true))
      })
      .catch(err => err)
  }
}
export const resetPasswordByPhone = async (payload, phoneNum) => {
  try {
    const res = await axios.post(
      `${API_HOST}users/reset-password/by-phone/${phoneNum}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken()
        }
      }
    )
    return { success: true, data: res.data }
  } catch (err) {
    if (err && err.response && err.response.status === 401) {
      logOut()
    } else {
      if (err && err.response && err.response.status === 422) {
        const data = err.response
        const errorMessage = data && data.message
        return {
          success: false,
          message: errorMessage,
          status: err.response.status
        }
      } else {
        const data = err.response
        const errorMessage = data && data.message
        return { success: false, message: errorMessage }
      }
    }
  }
}
export function isOpenPlayStorePopup (data) {
  return {
    type: IS_OPEN_PLAYSTORE,
    payload: data
  }
}

export function setEmailPopup (payload) {
  return {
    type: SET_EMAIL_POPUP,
    payload
  }
}

export function is_referrals_exist (referralCode, source, admin_token) {
  return dispatch => {
    return axios({
      url: `${API_HOST}referrals`,
      headers: {
        Authorization: admin_token,
        'Content-Type': 'application/json'
      },
      data: {
        referralCode: referralCode,
        source: source
      },
      method: 'post'
    })
      .then(response => response.data)
      .then(json => {
        return json
      })
  }
}

export function setIsFromForgotPassword (isFromForgetPass) {
  return {
    type: IS_FROM_FORGET_PASSWORD,
    payload: isFromForgetPass
  }
}

export function removeSetIsFromForgetPassword () {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: REMOVE_IS_FROM_FORGET_PASSWORD })
      resolve({
        type: REMOVE_IS_FROM_FORGET_PASSWORD
      })
    })
  }
}

export function showWarningModal (val) {
  return dispatch => {
    dispatch({ type: SHOW_LOCKED_MODAL, payload: val })
  }
}

export const userLogined = open => {
  return { type: USER_LOGINED, payload: open }
}

export const authVerify = (id, authToken) => {
  return dispatch => {
    const API_URL = id ? `${API_HOST}users/${id}` : `${API_HOST}users/profile`

    return axios({
      url: API_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken
      },
      data: {},
      method: 'get'
    })
      .then(response =>
        dispatch({ type: GET_USER_PROFILE, payload: response.data })
      )
      .catch(error => {
        return error
      })
  }
}
