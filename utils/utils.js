import Cookies from 'js-cookie'
import { API_HOST, G_TAG_ID, X_OS_VERSION } from '../env'
import { admin_token } from '../globalutilities/consts'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)
import { getToken } from '../globalutilities/helpers'

import { parsePhoneNumberFromString } from 'libphonenumber-js/mobile'

export const trackPageView = url => {
  try {
    window.gtag('config', `${G_TAG_ID}`, {
      page_location: url
    })
  } catch (error) {
    // silences the error in dev mode
    // and/or if gtag fails to load
  }
}

export const generateUUID = () => {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
    c
  ) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  Cookies.set('xDeviceId', `web-${uuid}`)
  return `web-${uuid}`
}

export const pageview = url => {
  if (window && window.gtag) {
    window.gtag('config', G_TAG_ID, {
      page_path: url
    })
  }
}

export const triggerGTAG = object => {
  if (window && window.dataLayer) {
    window.dataLayer.push(object)
  }
}

export const triggerDengageEvents = (tableName, payload) => {
  if (window && typeof window !== 'undefined' && window.dengage) {
    window.dengage('sendDeviceEvent', tableName, payload)
  }
}

export const dengageConvertedDate = () => {
  return dayjs(new Date(), 'MM-DD-YYYY').format('ll')
}

export const dengageCompareDate = () => {
  return dayjs(new Date(), 'MM-DD-YYYY').format('YYYY-MM-DD')
}

export const setUTMQueries = queries => {
  if (queries) {
    for (var key in queries) {
      switch (key) {
        case 'utm_source':
          var key = `utm_source=${queries[key]}`
          var found = false
          for (var i = 0; i < utmCookies.length; i++) {
            if (utmCookies[i] == key) {
              utmCookies[i] = key
              found = true
            }
          }

          if (!found) {
            utmCookies.push(key)
          }
          break
        case 'utm_medium':
          var key = `utm_medium=${queries[key]}`
          var found = false
          for (var i = 0; i < utmCookies.length; i++) {
            if (utmCookies[i] == key) {
              utmCookies[i] = key
              found = true
            }
          }

          if (!found) {
            utmCookies.push(key)
          }
          break
        case 'utm_campaign':
          var key = `utm_campaign=${queries[key]}`
          var found = false
          for (var i = 0; i < utmCookies.length; i++) {
            if (utmCookies[i] == key) {
              utmCookies[i] = key
              found = true
            }
          }

          if (!found) {
            utmCookies.push(key)
          }
          break
        case 'rid':
          var key = `rid=${queries[key]}`
          var found = false
          for (var i = 0; i < utmCookies.length; i++) {
            if (utmCookies[i] == key) {
              utmCookies[i] = key
              found = true
            }
          }

          if (!found) {
            utmCookies.push(key)
          }
          break
        case 'gclid':
          var key = `gclid=${queries[key]}`
          var found = false
          for (var i = 0; i < utmCookies.length; i++) {
            if (utmCookies[i] == key) {
              utmCookies[i] = key
              found = true
            }
          }

          if (!found) {
            utmCookies.push(key)
          }
          break
        default:
          break
      }
    }
  }
  if (utmCookies.length > 0) {
    localStorage.setItem('utmParam', JSON.stringify(utmCookies.join(',')))
  }
}

// Regex from https://github.com/jquense/yup/blob/master/src/string.js#L7
// eslint-disable-next-line
export let emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
export const isValidEmail = email => emailRegex.test(email)

export const isAfterToday = date => {
  const myDate = dayjs(date).format('YYYY-MM-DD')
  return dayjs().isAfter(dayjs(myDate))
}

export const validatePhonenumber = value => {
  if (value && value.charAt(0) != '+') {
    value = '+' + value
  }
  try {
    return parsePhoneNumberFromString(value).isValid()
  } catch (e) {
    return false
  }
}

export const getRefQueryParams = () => {
  let utmParam = localStorage.getItem('utmParam')
  let ajreferral = Cookies.get('ajreferral')
  let rrid = Cookies.get('rrid')

  let queryParams =
    ajreferral && rrid && utmParam
      ? `rrid=${rrid}&utmParam=${utmParam}&ajreferral=${ajreferral}`
      : ajreferral && rrid
      ? `ajreferral=${ajreferral}&rrid=${rrid}`
      : ajreferral && utmParam
      ? `ajreferral=${ajreferral}&utmParam=${utmParam}`
      : rrid && utmParam
      ? `rrid=${rrid}&utmParam=${utmParam}`
      : ajreferral
      ? `ajreferral=${ajreferral}`
      : utmParam
      ? `utmParam=${utmParam}`
      : rrid
      ? `rrid=${rrid}`
      : ''
  const currentPath = window.location.href
  queryParams = currentPath.includes('?')
    ? `&referralrUrl=true&${queryParams}`
    : `?referralrUrl=true&${queryParams}`

  return queryParams
}

export const generateHeadersForRentAndBuyPages = (
  user,
  searchSessionId,
  visitorId,
  cookies,
  req
) => {
  const forwarded = req.headers['x-forwarded-for']
  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
  let headers = {
    'Content-Type': 'application/json',
    Authorization: user.authToken || admin_token,
    'X-Search-Session-ID': searchSessionId || null,
    'X-OS-VERSION': X_OS_VERSION,
    'X-Device-ID': cookies.xDeviceId ? cookies.xDeviceId : generateUUID(),
    'X-User-IP': ip
  }
  if (visitorId && !user.authToken) headers['X-Visitor-ID'] = visitorId
  return headers
}

export const checkAndSetSearchSessionID = (
  res,
  cookie,
  authToken,
  resHeader,
  currentSSID,
  visitorId
) => {
  let updatedSSID = null,
    updatedVisitorId = null
  const responseSearchSessionId = resHeader.get('x-search-session-id')
  const responseVisitorId = resHeader.get('x-visitor-id')
  if (responseSearchSessionId != currentSSID)
    updatedSSID = responseSearchSessionId
  if (!authToken && responseVisitorId != visitorId)
    updatedVisitorId = responseVisitorId
  let cookies = []
  if (updatedSSID)
    cookies.push(
      cookie.serialize('searchSessionId', updatedSSID, { path: '/' })
    )
  if (updatedVisitorId) {
    cookies.push(cookie.serialize('visitorId', updatedVisitorId, { path: '/' }))
  } else if (authToken && visitorId) {
    cookies.push(
      cookie.serialize('visitorId', updatedVisitorId, { maxAge: -1, path: '/' })
    )
  }
  res.setHeader('Set-Cookie', cookies)
}

export const sendSearchTrackingActionLog = (
  action,
  propertyRef,
  routerQuery,
  ref = null
) => {
  //ref only used for recommendations_click
  const authToken = getToken()
  let headers = {
    'Content-Type': 'application/json',
    Authorization: authToken || admin_token,
    'X-Search-Session-ID': Cookies.get('searchSessionId') || null,
    'X-Source-Type': routerQuery?.source_type || null,
    'X-Source-Ref': routerQuery?.source_ref || null
  }
  if (!authToken) headers['X-Visitor-ID'] = Cookies.get('visitorId') || null
  let payload = { action }
  if (ref) payload['recommendedRef'] = ref
  fetch(`${API_HOST}properties/${propertyRef}/actionLog`, {
    method: 'post',
    headers: headers,
    body: JSON.stringify(payload)
  })
}

export const getFlashSalesDetails = async () => {
  const authToken = Cookies.get('authToken')
  const data = await fetch(`${API_HOST}flashevent`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken || admin_token,
      'X-Device-ID': Cookies.get('xDeviceId') || generateUUID(),
      'X-OS-Version': X_OS_VERSION
    }
  })
  const resultData = await data.json()
  return resultData
}

export const handleInstantViewPopupClose = (
  closePopup,
  propertyInfo,
  openPopup,
  state
) => {
  closePopup('showInstantViewPopup')
  if (!propertyInfo.type.toLowerCase().includes('_sale')) {
    openPopup('showProfileInfoModal', {
      isShowProfileInfoModal: true
    })
  } else if (state.recommendedPropertiesForChatReq.length >= 2) {
    openPopup('showMultiChatRequestPopup', {
      isMultiChatRequestSuccess: true
    })
  } else {
    openPopup('showChatRequestSuccessPopup', {
      isChatRequestSuccess: true
    })
  }
}
