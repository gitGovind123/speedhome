import axios from 'axios'
import Cookies from 'js-cookie'
import { API_HOST, X_OS_VERSION, PUBLIC_AUTH_TOKEN } from '../env'
import { admin_token } from '../globalutilities/consts'
import { getPropertyInfoAPI } from '../api/property'
import { getToken, getUserId, logOut } from '../globalutilities/helpers'

export const PROPERTY_LIST = 'PROPERTY_LIST'
export const PROPERTY_INFO = 'PROPERTY_INFO'

export const SET_DATE = 'SET_DATE'
export const SET_TIME = 'SET_TIME'
export const SET_VIEWING_DATE = 'SET_VIEWING_DATE'
export const GET_VIEWING_DATE = 'GET_VIEWING_DATE'
export const GET_VIEWING_TIME = 'GET_VIEWING_TIME'
export const CLEAR_SELECTED_PROPERTY = 'CLEAR_SELECTED_PROPERTY'
export const GET_PRESET_FILTER = 'GET_PRESET_FILTER'

export const setDate = date => {
  return {
    type: SET_DATE,
    payload: { date }
  }
}

export const setViewingDate = date => {
  Cookies.set('setViewingDate', JSON.stringify(date))
  return dispatch => {
    dispatch({
      type: SET_VIEWING_DATE,
      payload: date
    })
  }
}
export const getViewingDate = () => {
  const date = Cookies.get('setViewingDate')

  return {
    type: GET_VIEWING_DATE,
    payload: date ? JSON.parse(date) : null
  }
}

export const setTime = time => {
  Cookies.set('setViewingTime', JSON.stringify(time))

  return {
    type: SET_TIME,
    payload: time
  }
}
export const getViewingTime = () => {
  const time = Cookies.get('setViewingTime')

  return {
    type: GET_VIEWING_TIME,
    payload: time ? JSON.parse(time) : null
  }
}

export const getPropertyBySearch = keywords => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}properties/search`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || admin_token,
        'X-Device-ID': 'web_sajsjaks'
      },
      method: 'get',
      data: keywords
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

export function receivePropertyList (json) {
  return { type: PROPERTY_LIST, propertyList: json }
}

export function getPropertyList (data) {
  return dispatch => {
    return axios({
      url: `${API_HOST}properties/search`,
      headers: {
        Authorization: getToken() || admin_token
      },
      method: 'post',
      data
    })
      .then(response => response.data)
      .then(json => dispatch(receivePropertyList(json)))
      .catch(error => {
        if (
          getToken() &&
          error &&
          error.response &&
          error.response.status === 401
        ) {
          logOut()
        }
      })
  }
}

export const getDashboardProperties = async params => {
  try {
    const { pageNumber, pageSize, sort, status, active } = params
    const query =
      status !== 'SUSPENDED'
        ? `pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&status=${status}&active=${active}`
        : `pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&status=${status}`
    const response = await axios({
      url: `${API_HOST}users/${getUserId() || ''}/properties?${query}`,
      headers: {
        Authorization: getToken() || '',
        'Content-Type': 'application/json'
      },
      data: {},
      method: 'get'
    })
    return response.data || {}
  } catch (error) {
    if (
      getToken() &&
      error &&
      error.response &&
      error.response.status === 401
    ) {
      logOut()
    }
  }
}

export const updateProperty = async (propertyId, type) => {
  try {
    const res = await axios.post(
      `${API_HOST}properties/${propertyId}/${type}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken() || ''
        }
      }
    )
    return { success: true, data: res.data }
  } catch (err) {
    if (getToken() && err && err.response && err.response.status === 401) {
      logOut()
    }
    return { success: false, message: err.message }
  }
}

export const getPropertyFromRef = async (propertyRef, cookies) => {
  try {
    const response = await axios({
      url: `${API_HOST}properties/${propertyRef}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: cookies.authToken || '',
        'X-Device-ID': cookies.xDeviceId || '',
        'X-OS-Version': X_OS_VERSION
      },
      data: {},
      method: 'get'
    })
    return response.data || {}
  } catch (err) {
    if (getToken() && err && err.response && err.response.status === 401) {
      logOut()
    }
    return {}
  }
}

export const getPropertyInfo = propertyId => {
  return dispatch => {
    return getPropertyInfoAPI(propertyId)
      .then(response => {
        dispatch(setPropertyInfo(response))
      })
      .catch(error => error)
  }
}

export const setPropertyInfo = json => {
  return { type: PROPERTY_INFO, propertyInfo: json }
}

export const getRecommendedProperties = async (body, searchTracking) => {
  try {
    const response = await axios.post(`${API_HOST}properties/similar`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: admin_token,
        'X-Search-Session-ID': Cookies.get('searchSessionId') || 'null',
        'X-Visitor-ID': Cookies.get('visitorId') || 'null',
        'X-Source-Type': 'listing_page',
        'X-Source-Ref': searchTracking?.source_ref
      }
    })
    return { success: true, data: response.data || [] }
  } catch (err) {
    return { success: false, message: err.message }
  }
}

export const getRecommendedSmartProperties = async (
  data,
  token,
  searchTracking
) => {
  try {
    const response = await axios({
      url: `${API_HOST}properties/recommend/smart`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token || '',
        'X-Search-Session-ID': Cookies.get('searchSessionId') || 'null',
        'X-Source-Type': 'listing_page',
        'X-Source-Ref': searchTracking?.source_ref
      },
      data: data,
      method: 'get'
    })
    return { success: true, data: response.data || {} }
  } catch (err) {
    return { success: false, message: err.message }
  }
}

export const getTenantSearchChatReq = async (body, cookies) => {
  try {
    const response = await axios.post(
      `${API_HOST}chat/tenant-search/list`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: cookies.authToken || ''
        }
      }
    )
    return { success: true, data: response.data || [] }
  } catch (err) {
    if (getToken() && err && err.response && err.response.status === 401) {
      logOut()
    } else {
      return { success: false, message: err.message }
    }
  }
}

export const sentChatRequestToOwner = async body => {
  try {
    const response = await axios.post(
      `${API_HOST}chat/tenant-search/submit`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken() || ''
        }
      }
    )
    return { success: true, data: response.data || [] }
  } catch (err) {
    if (getToken() && err && err.response && err.response.status === 401) {
      logOut()
    } else {
      const { data } = err.response
      const errorMessage = data.message
      return { success: false, message: errorMessage }
    }
  }
}

export const extendedPropertyListingExpirary = async (
  propertyId,
  tokenFromUrl
) => {
  try {
    const response = await axios.post(
      `${API_HOST}properties/${propertyId}/extensions`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken() || tokenFromUrl
        }
      }
    )
    return { success: true, data: response.data || [] }
  } catch (err) {
    if (getToken() && err && err.response && err.response.status === 401) {
      logOut()
    } else {
      const { data } = err.response
      return { success: false, message: 'errorMessage' }
    }
  }
}

export const getSearchPresetFilter = _ => {
  return dispatch => {
    axios({
      url: `${API_HOST}properties/search/filters`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || admin_token,
        'X-Device-ID': PUBLIC_AUTH_TOKEN,
        'X-OS-Version': X_OS_VERSION
      },
      method: 'get',
      data: {}
    })
      .then(response => {
        dispatch({ type: GET_PRESET_FILTER, payload: response.data })
      })
      .catch(error => {
        if (
          getToken() &&
          error &&
          error.response &&
          error.response.status === 401
        ) {
          logOut()
        }
      })
  }
}

export const reactivateProperty = async propertyId => {
  try {
    const data = await axios({
      url: `${API_HOST}properties/${propertyId}/activate`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || admin_token,
        'X-Device-ID': Cookies.get('xDeviceId') || generateUUID(),
        'X-OS-Version': X_OS_VERSION
      },
      data: {},
      method: 'POST'
    })

    return data || {}
  } catch (err) {
    return {}
  }
}
