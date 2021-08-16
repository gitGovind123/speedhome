import axios from 'axios'

import { getToken, logOut } from '../globalutilities/helpers'
import { API_HOST, CHAT_VIDEO_UPLOAD_URL } from '../env'
import { BANNER_TEXT } from './types'

export const CHAT_UNREAD_COUNT = 'CHAT_UNREAD_COUNT'
export const CHAT_UNREAD_FORCE = 'CHAT_UNREAD_FORCE'

export const getPropertyInfo = async conversationId => {
  try {
    const response = await axios({
      url: `${API_HOST}chat-conversations/${conversationId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || ''
      },
      data: null,
      method: 'get'
    })
    return { success: true, data: response.data || {} }
  } catch (err) {
    if (err && err.response && err.response.status === 401) {
      logOut()
    } else {
      return { success: false, message: err.message }
    }
  }
}
export const getProfileDetails = async userId => {
  try {
    const response = await axios({
      url: `${API_HOST}users/${userId || ''}/profile/view`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || ''
      },
      data: null,
      method: 'get'
    })
    return { success: true, data: response.data || {} }
  } catch (err) {
    if (err && err.response && err.response.status === 401) {
      logOut()
    } else {
      return { success: false, message: err.message }
    }
  }
}

export const getAppointmentsByChatConversationId = async backendChatConversationId => {
  try {
    const response = await axios({
      url: `${API_HOST}appointments/chats/${backendChatConversationId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || ''
      },
      data: null,
      method: 'get'
    })
    return { success: true, data: response.data || {} }
  } catch (err) {
    if (getToken() && err && err.response && err.response.status === 401) {
      logOut()
    } else {
      return { success: false, message: err.message }
    }
  }
}

export const getBannerTextByChatConversationId = conversationId => async dispatch => {
  try {
    let response = await axios({
      url: `${API_HOST}chat-conversations/${conversationId}/banner`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || ''
      },
      data: null,
      method: 'get'
    })
    dispatch({ type: BANNER_TEXT, payload: response.data.bannerText })
    return { success: true, data: response.data || {} }
  } catch (e) {
    if (getToken() && e && e.response && e.response.status === 401) {
      logOut()
    } else {
      dispatch({ type: BANNER_TEXT, payload: null })
      return { success: false, message: e.message }
    }
  }
}

export const chatUnreadForceRemove = data => {
  return dispatch => {
    dispatch({
      type: CHAT_UNREAD_FORCE,
      payload: data
    })
  }
}

export function getChatUnreadMsg (token) {
  return dispatch => {
    return axios({
      url: `${API_HOST}chat-conversations/unread/count`,
      headers: {
        Authorization: token || getToken(),
        'Content-Type': 'application/json'
      },
      data: null,
      method: 'get'
    })
      .then(response => response.data)
      .then(json => {
        if (json || json == 0) {
          dispatch({ type: CHAT_UNREAD_COUNT, payload: json })
        }
      })
      .catch(error => {
        if (error && error.response && error.response.status === 401) {
          logOut()
        }
      })
  }
}
export const getPreSignedUrl = (conversationId, file, callBack) => {
  axios({
    url:
      CHAT_VIDEO_UPLOAD_URL + `${conversationId}/media/generate/presigned-url`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken() || ''
    },
    data: null,
    method: 'get'
  })
    .then(response => {
      if (response.data && response.data.preSignedUrl) {
        // uploading video to AWS s3 with the presignedUrl
        axios
          .put(response.data.preSignedUrl, file, {
            headers: {
              'Content-Type': file.type
            }
          })
          .then(upload_video_response => {
            if (upload_video_response && upload_video_response.status == 200) {
              // starting AWS Elemental MediaConvert Job
              callBack(response.data)
            }
          })
      }
    })
    .catch(err => {
      if (err && err.response && err.response.status === 401) {
        logOut()
      }
    })
}
