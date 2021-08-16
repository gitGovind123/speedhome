import React, { useState, useRef, useEffect } from 'react'
import { getAreaByPostcode } from '../../globalutilities/helpers'

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export const getLongDate = dateString => {
  let splittedDate = (dateString || '').split('-')
  return `${splittedDate[2]} ${monthNames[splittedDate[1] - 1]} ${
    splittedDate[0]
  }`
}

export const getDataFromValue = (data, val) => {
  let tempVal = isNaN(val) ? (val ? val : '') : val

  const result = data.filter(obj => {
    return obj.value === tempVal
  })
  if (result) {
    return result[0]
  }
  return null
}

export const addDaysTODate = daysToAdd => {
  const selectDate = new Date()
  return selectDate.setDate(selectDate.getDate() + daysToAdd)
}
const CENTERPOINT = {
  lat: 3.139,
  lng: 101.6869
}
export const radiOusCheckeer = (checkPoint, km) => {
  var ky = 40000 / 360
  var kx = Math.cos((Math.PI * CENTERPOINT.lat) / 180.0) * ky
  var dx = Math.abs(CENTERPOINT.lng - checkPoint.lng) * kx
  var dy = Math.abs(CENTERPOINT.lat - checkPoint.lat) * ky
  const isValid = Math.sqrt(dx * dx + dy * dy) <= km
  return isValid
}

export const getBase64FromImageUrl = url =>
  fetch(url, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
    )
    .catch(err => {
      return {
        errStatus: 'imgError'
      }
    })

export const getPropertyNameLink = (str = '') => {
  return str
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s\s+/g, ' ')
    .replace(/[, ]+/g, '-')
}

const getPropertyTypeForPropertyDetailsSEO = propertyType => {
  let propertyTypeIs = ''
  if (propertyType === 'HIGHRISE') {
    propertyTypeIs = 'Condo'
  } else if (propertyType === 'LANDED') {
    propertyTypeIs = 'House'
  } else if (propertyType === 'ROOM') {
    propertyTypeIs = 'Room'
  }

  return propertyTypeIs
}

export const getPropertyDetailsSEOTitle = (
  isSale,
  propertyInfo,

  router
) => {
  let hTitle = ''
  if (router) {
    if (router.lcoale === 'my') {
      hTitle = isSale
        ? 'Rumah Untuk Dibeli _NAME | Kondo untuk Dibeli _NAME'
        : '_NAME untuk disewa | sewa _PROPERTY_TYPE dari SPEEDHOME'
    } else if (router.lcoale === 'zh') {
      hTitle = isSale
        ? '在_NAME卖房|  _NAME卖公寓'
        : '_NAME 出租 | SPEEDHOME _PROPERTY_TYPE 无中介出租'
    } else {
      hTitle = isSale
        ? 'House For Sale _NAME | Condo For Sale _NAME'
        : '_NAME available to rent | Rent _PROPERTY_TYPE on SPEEDHOME.'
    }
  }
  if (hTitle) {
    hTitle = hTitle.replace(/_NAME/g, propertyInfo.name)
    hTitle = hTitle.replace(
      /_PROPERTY_TYPE/g,
      getPropertyTypeForPropertyDetailsSEO(propertyInfo.type)
    )
  }

  return hTitle
}

export const getPropertyDetailsSEODesc = (isSale, propertyInfo, router) => {
  let hdesc = ''
  let propertyArea = ''

  if (propertyInfo.postcode) {
    propertyArea = getAreaByPostcode(propertyInfo.postcode)
  }

  if (router) {
    if (router.locale === 'my') {
      hdesc = isSale
        ? 'Beli Rumah di _NAME di SPEEDHOME.'
        : propertyInfo.postcode
        ? 'Sewa _PROPERTY_TYPE cepat dan dilindungi, Tidak Perlu Deposit, Berurusan Dengan Tuan Rumah, Sewa _PROPERTY_TYPE di _PROPERTY_AREA'
        : 'Sewa _PROPERTY_TYPE cepat dan dilindungi, Tidak Perlu Deposit, Berurusan Dengan Tuan Rumah'
    } else if (router.locale === 'zh') {
      hdesc = isSale
        ? '在SPEEDHOME上寻找_NAME卖房子。SPEEDHOME让租客和屋主直接沟通的房屋买卖平台。'
        : propertyInfo.postcode
        ? '零头期_PROPERTY_TYPE出租， 方便快捷，用app即可，无中介的房东广告， _PROPERTY_AREA 吉屋出租.'
        : '零头期_PROPERTY_TYPE出租， 方便快捷，用app即可，无中介的房东广告.'
    } else {
      hdesc = isSale
        ? 'Find an House for Sale at SPEEDHOME in _NAME.'
        : propertyInfo.postcode
        ? 'Rent _PROPERTY_TYPE fast and secured with Zero deposit. Deal direct with owner, rent _PROPERTY_TYPE in _PROPERTY_AREA.'
        : 'Rent _PROPERTY_TYPE fast and secured with Zero deposit. Deal direct with owner.'
    }
  }
  if (hdesc) {
    hdesc = hdesc.replace(
      /_PROPERTY_TYPE/g,
      getPropertyTypeForPropertyDetailsSEO(propertyInfo.type)
    )
    if (propertyInfo.postcode) {
      hdesc = hdesc.replace(/_PROPERTY_AREA/g, propertyArea)
    }
  }

  return hdesc
}
export const getPropertyDetailsSEOKeywords = (isSale, propertyName, router) => {
  let hkeywords = ''
  if (router) {
    if (router.locale === 'my') {
      hkeywords = isSale
        ? 'Iklan rumah untuk Dibeli _NAME, Kondo untuk Dibeli _NAME, Beli Apartment _NAME, Beli Rumah _NAME'
        : 'Iklan rumah untuk Disewa _NAME, Kondo untuk Disewa _NAME, Apartment Sewa _NAME, Rumah Sewa _NAME'
    } else if (router.locale === 'zh') {
      hkeywords = isSale
        ? '_NAME 卖套房_NAME组屋有待租、_NAME卖房'
        : '_NAME 套房出租_NAME组屋有待租、_NAME空房出租'
    } else {
      hkeywords = isSale
        ? 'House for Sale _NAME, Condo for Sale _NAME, Apartment For Sale _NAME, Beli Rumah _NAME'
        : 'House for Rent _NAME, Condo for Rent _NAME, Apartment For Rent _NAME, Rumah Sewa _NAME'
    }
  }
  if (hkeywords) {
    hkeywords = hkeywords.replace(/_NAME/g, propertyName)
  }

  return hkeywords
}

export const removeDuplicateObjects = array => {
  return [...new Set(array.map(s => JSON.stringify(s)))].map(s => JSON.parse(s))
}

export const array_move = (arr, old_index, new_index) => {
  const old_index_check = old_index < 0 ? 0 : old_index
  new_index = ((new_index % arr.length) + arr.length) % arr.length
  arr.splice(new_index, 0, arr.splice(old_index_check, 1)[0])
  return arr // for testing
}

export const useStateCallback = initialState => {
  const [state, setState] = useState(initialState)
  const cbRef = useRef(null) // mutable ref to store current callback

  const setStateCallback = (state, cb) => {
    cbRef.current = cb // store passed callback to ref
    setState(state)
  }

  useEffect(() => {
    // cb.current is `null` on initial render, so we only execute cb on state *updates*
    if (cbRef.current) {
      cbRef.current(state)
      cbRef.current = null // reset callback after execution
    }
  }, [state])

  return [state, setStateCallback]
}

export const propertyDetailsRedirect = router => {
  if (!router.asPath.includes('/rental-bidding')) {
    if (router.asPath.includes('/details') && router.locale === 'my') {
      router.push(router.asPath.replace('/details', '/iklan'))
    } else if (router.asPath.includes('/ads') && router.locale === 'my') {
      router.push(router.asPath.replace('/ads', '/iklan'))
    } else if (router.asPath.includes('/guanggao') && router.locale === 'my') {
      router.push(router.asPath.replace('/guanggao', '/iklan'))
    } else if (router.asPath.includes('/details') && router.locale === 'zh') {
      router.push(router.asPath.replace('/details', '/guanggao'))
    } else if (router.asPath.includes('/ads') && router.locale === 'zh') {
      router.push(router.asPath.replace('/ads', '/guanggao'))
    } else if (router.asPath.includes('/iklan') && router.locale === 'zh') {
      router.push(router.asPath.replace('/iklan', '/guanggao'))
    } else if (router.asPath.includes('/iklan') && router.locale === 'en') {
      router.push(router.asPath.replace('/iklan', '/details'))
    } else if (router.asPath.includes('/guanggao') && router.locale === 'en') {
      router.push(router.asPath.replace('/guanggao', '/details'))
    }
  }
}

export const getLocalStorageForCr = (sendChatRequest, propertyInfo) => {
  const crData = localStorage.getItem('originClickCR')
  if (crData) {
    const parsedData = JSON.parse(crData)
    if (propertyInfo && propertyInfo.id === parsedData.id) {
      setTimeout(() => {
        localStorage.removeItem('originClickCR')
      }, 10)
      sendChatRequest(
        parsedData.chatRequestPayload,
        parsedData.countryData,
        parsedData.phoneNo,
        parsedData.subscribeListing
      )
    }
  }
}
