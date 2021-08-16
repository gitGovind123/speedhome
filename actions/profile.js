import axios from 'axios'
import { GET_TEST_LIST } from './types'
import { API_HOST, X_OS_VERSION, PUBLIC_AUTH_TOKEN } from '../env'
import { getToken, getUserId,logOut } from '../globalutilities/helpers'

export const getUserProfile = async () => {
  if (getUserId()) {
    try {
      const response = await axios({
        url: `${API_HOST}users/${getUserId()}/profile`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken() || ''
        },
        data: {},
        method: 'get'
      })
      return { success: true, data: response.data || {} }
    } catch (err) {
      if (err && err.response && err.response.status === 401) {          
        logOut(); 
        }else{
          return { success: false, message: err.message }

        }
    }
  } else {
    return { success: false, message: 'unauthorised' }
  }
}

export const submitUserProfile = async payload => {
  try {
    const res = await axios.put(
      `${API_HOST}users/${getUserId()}/profile`,
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
        logOut(); 
      }else{
        const { data } = err.response
        const errorMessage = data && data.message
        return { success: false, message: errorMessage }
      }

  }
}
export const registerUser = async payload => {
  try {
    const res = await axios.post(
      `${API_HOST}users/${getUserId()}/profile`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken(),
          'X-Device-ID': PUBLIC_AUTH_TOKEN,
          'X-OS-Version': X_OS_VERSION
        }
      }
    )
    return { success: true, data: res.data }
  } catch (err) {
    if (err && err.response && err.response.status === 401) {
        logOut();
      }else{
        const { data } = err.response
        const errorMessage = data && data.message
        return { success: false, message: errorMessage }
      }

  }
}
export const resetPassword = async payload => {
  try {
    const res = await axios.post(
      `${API_HOST}users/${getUserId()}/reset-password`,
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
      logOut(); 
    }else{
    const  data  = err.response
    const errorMessage = data && data.data.message    
    return { success: false, message: errorMessage }
    }
  }
}
export const getList = payload => async dispatch => {
  try {
    dispatch({
      type: GET_TEST_LIST,
      payload
    })
  } catch (err) {}
}
