import axios from 'axios'
import { API_HOST, X_OS_VERSION } from '../env'
import { getToken, logOut } from '../globalutilities/helpers'
import dayjs from 'dayjs'
import { admin_token } from '../globalutilities/consts'

export const RESET_POST = 'RESET_POST'
export const GET_POST = 'GET_POST'
export const UPLOAD_POST_IMAGE = 'UPLOAD_POST_IMAGE'
export const CREATE_POST = 'CREATE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const CREATION_FLOW = 'CREATION_FLOW'
export const UPDATE_POST_FOR_RENT = 'UPDATE_POST_FOR_RENT'

export function isInTheCreationFlow (data) {
  return dispatch => {
    dispatch({ type: CREATION_FLOW, payload: data })
  }
}

export function resetPostProperty () {
  return dispatch => {
    dispatch({ type: RESET_POST })
  }
}

export function getPostPropertySuccess (json) {
  return { type: GET_POST, payload: json }
}

export function getPostPropertyByRef (ref, token, deviceId) {
  return dispatch => {
    return axios({
      url: `${API_HOST}properties/${ref}`,
      headers: {
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-OS-Version': X_OS_VERSION,
        'X-Device-ID': deviceId
      },
      responseType: 'application/json',
      method: 'get',
      data: {}
    })
      .then(response => response.data)
      .then(json => {
        dispatch(getPostPropertySuccess(json))
      })
      .catch(e => {})
  }
}

export function createPostSuccess (json) {
  return { type: CREATE_POST, payload: json }
}

export function createPost (data) {
  return dispatch => {
    return axios({
      url: `${API_HOST}properties`,
      headers: {
        Authorization: getToken()
      },
      method: 'post',
      data
    })
      .then(response => response.data)
      .then(json => dispatch(createPostSuccess(json)))
      .catch(error => {
        if (error && error.response && error.response.status === 401) {
          logOut()
        }
      })
  }
}
export function updateCoverPhotoSuccess (json) {
  return { type: 'UPDATE_COVER_PHOTO', payload: json }
}
export function updateCoverPhoto (imageId, propertyId, data) {
  return dispatch => {
    return axios({
      url: `${API_HOST}properties/${propertyId}/images/${imageId}`,
      headers: {
        Authorization: getToken()
      },
      method: 'put',
      data
    })
      .then(response => response.data)
      .then(json => dispatch(updateCoverPhotoSuccess(json)))
      .catch(error => {
        if (error && error.response && error.response.status === 401) {
          logOut()
        }
      })
  }
}

export function updatePostSuccess (json) {
  return { type: UPDATE_POST, payload: json }
}

export function updatePost (propertyId, data) {
  if (data.availability) {
    data.availability =
      dayjs(data.availability).format('YYYY-MM-DDTHH:mm:ss.sss') + 'Z'
  }
  return dispatch => {
    return axios({
      url: `${API_HOST}properties/${propertyId}`,
      headers: {
        Authorization: getToken()
      },
      method: 'put',
      data
    })
      .then(response => response.data)
      .then(json => dispatch(updatePostSuccess(json)))
      .catch(error => {
        if (error && error.response && error.response.status === 401) {
          logOut()
        }
      })
  }
}

export function updatePostForRentSuccess (json) {
  return { type: UPDATE_POST_FOR_RENT, payload: json }
}

export function updatePostForRent (propertyId, data) {
  return dispatch => {
    return axios({
      url: `${API_HOST}properties/${propertyId}`,
      headers: {
        Authorization: getToken()
      },
      method: 'put',
      data
    })
      .then(response => response.data)
      .then(json => dispatch(updatePostForRentSuccess(json)))
      .catch(error => {
        if (error && error.response && error.response.status === 401) {
          logOut()
        }
      })
  }
}

export function uploadImageSuccess (json) {
  return { type: UPLOAD_POST_IMAGE, payload: json }
}

export function uploadPostImage (propertyid, data) {
  return dispatch => {
    return axios({
      url: `${API_HOST}properties/${propertyid}/images`,
      headers: {
        Authorization: getToken()
      },
      method: 'post',
      data
    })
      .then(response => response.data)
      .then(json => dispatch(uploadImageSuccess(json)))
      .catch(error => {
        if (error && error.response && error.response.status === 401) {
          logOut()
        }
      })
  }
}

export function deletePostImage (imageId) {
  return dispatch => {
    return axios({
      url: `${API_HOST}properties/images/${imageId}`,
      headers: {
        Authorization: getToken(),
        'Content-Type': 'application/json'
      },
      method: 'delete',
      data: {}
    })
      .then(response => response.data)
      .then(json => dispatch({ type: 'DELETE_POST_IMAGE', payload: json }))
      .catch(error => {
        if (error && error.response && error.response.status === 401) {
          logOut()
        }
      })
  }
}

export const registerReferalUser = async user => {
  try {
    const response = await axios({
      url: `https://www.ref-r.com/campaign/t1/settings?bid_e=D7CE74D55F5AE11877626EBEF2CCC3DE&bid=28548&t=420&event=register&email=${user &&
        user.email}&orderID=${user && user.id}&fname=${user && user.name}`,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*'
      },
      data: {},
      method: 'get'
    })
    return { success: true, data: response.data || {} }
  } catch (err) {
    return { success: false, message: err.message }
  }
}

export const submitFeedback = async payload => {
  try {
    const res = await axios.post(`${API_HOST}api/users/feedbacks`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      }
    })
    return { success: true, data: res.data }
  } catch (err) {
    if (err && err.response && err.response.status === 401) {
      logOut()
    } else {
      const { data } = err.response
      const errorMessage = data && data.message
      return { success: false, message: errorMessage }
    }
  }
}

export const getTestimonialList = async () => {
  try {
    const response = await axios({
      url: `${API_HOST}api/users/feedbacks/public`,
      headers: {
        Authorization: admin_token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*'
      },
      data: {},
      method: 'get'
    })
    return { success: true, data: response.data || [] }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export const createReferral = async body => {
  try {
    const response = await axios.post(`${API_HOST}referral/create`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || ''
      }
    })
    return { success: true, data: response.data || [] }
  } catch (error) {
    return { success: false, message: error.message }
  }
}
