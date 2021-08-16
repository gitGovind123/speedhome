import { roomTypesConst, postCodes } from './consts'
import Cookies from 'js-cookie'
import moment from 'moment'

export const getToken = () => Cookies.get('authToken')
export const getUserId = () => Cookies.get('id')
export const getDeviceId = () => Cookies.get('xDeviceId')
export const getCrInfoBudget = () => Cookies.get('crInfo_budget')
export const getCrInfoMovinDate = () => Cookies.get('crInfo_moveInDate')
export const getClickId = () => Cookies.get('atClickId')
export const getDengageOpenWebDate = () =>
  Cookies.get('dengage_open_web_date') || false

export const setCrInfoBudget = budget => Cookies.set('crInfo_budget', budget)
export const setCrInfoMoveInDate = moveInDate =>
  Cookies.set('crInfo_moveInDate', moveInDate)
export const setClickId = subId =>
  Cookies.set('atClickId', subId, { expires: 30 })
export const setDengageOpenWebDate = date =>
  Cookies.set('dengage_open_web_date', date)

export const removeCrInfoBudget = () => Cookies.remove('crInfo_budget')
export const removeCrInfoMoveInDate = () => Cookies.remove('crInfo_moveInDate')

export const getShowLinkFromProfile = () => Cookies.get('showLinkFromProfile')
import * as authActions from '../actions/authActions'
import { SPEED_MANAGE } from '../env'
export const setShowLinkFromProfile = val =>
  Cookies.set('showLinkFromProfile', val)

export const hasAdds = () => {
  const val = Cookies.get('addBlock')
  if (parseInt(val) === 1) {
    return true
  } else {
    return false
  }
}

export const logOut = async () => {
  await authActions.logoutUser()
  authActions.clearUser()
  Cookies.remove('id')
  Cookies.remove('authToken')
  Cookies.remove('xDeviceId')
  localStorage.removeItem('posData')
  localStorage.removeItem('originClickCR')

  const constructUrl = `${SPEED_MANAGE}refresh?originType=SH`
  window.location.href = constructUrl
}

export const getRoomTypeLabel = roomTypeValue => {
  let roomType = ''

  if (roomTypeValue && roomTypeValue !== '') {
    let typeData = roomTypesConst.find(
      type => type.value === roomTypeValue.toLowerCase()
    )
    if (typeData) {
      roomType = typeData.label
    }
  }

  return roomType
}

export const getBase64 = (file, cb) => {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    cb(reader.result)
  }
  reader.onerror = error => {}
}

export const convertToBlob = url => {
  return new Promise(function (resolve, reject) {
    try {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.responseType = 'blob'
      xhr.onerror = function () {
        reject('Network error.')
      }
      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject('Loading error:' + xhr.statusText)
        }
      }
      xhr.send()
    } catch (err) {
      reject(err.message)
    }
  })
}

export const priceSplit = data => {
  let price = Number.prototype.toFixed.call(parseFloat(data) || 0, 0)
  price = price.replace(/(\D)/g, ',')
  price = price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  return price
}

export const getAreaByPostcode = postcode => {
  let cityByPostcode = 'Kuala Lumpur'
  postCodes.map(areas => {
    areas.postcodes.map(city => {
      city.postcodes.indexOf(postcode) >= 0 ||
      city.postcodes.indexOf(Number(postcode)) >= 0
        ? (cityByPostcode = city.city)
        : null
    })
  })
  return cityByPostcode
}

export const getBackendChatConversationId = activeChat => {
  const userToken = getToken() || ''
  const userId = getUserId() || ''
  if (userToken && userId) {
    if (activeChat && activeChat.custom.length > 0) {
      const backendCustomArray = activeChat.custom.filter(
        x => x.key === 'backend_chat_conversation_id'
      )
      if (backendCustomArray.length > 0) {
        return backendCustomArray[0].value
      }
    }
  }
  return
}

export const getRefLinkFromMessageText = msg => {
  return msg
    .substring(
      msg.indexOf('<url:key_collection'),
      msg.indexOf('>', msg.indexOf('<url:key_collection'))
    )
    .replace('<url:key_collection:', '')
}

export const getUserIdFromMessageText = msg => {
  const getOnlyElementFromString = msg
    .substring(msg.indexOf('<url:'))
    .substr(0, msg.indexOf('</url>') + 1)
  return parseInt(
    getOnlyElementFromString
      .replace('<url:chat_profile:', '')
      .replace('></url>', '')
  )
}

export const getNameFromMsgUrl = msg => {
  let m = msg.substring(msg.indexOf('<url:'))
  const arr = m
    .substr(0, m.indexOf('></url>'))
    .replace('<url:chat_profile:', '')
    .replace('></url>', '')
    .replace(',', '')
    .split(':')
  if (arr.length > 1) {
    return arr[1]
  }
  return 'the Tenant'
}

// nav helpers

export const transLatedUrlForRentPage = (wantedlang, url, currentLang, t) => {
  let translatedUrl = ''
  if (currentLang === 'zh') {
    if (wantedlang === 'en') {
      if (url.includes('/guanggao')) {
        translatedUrl = url.replace(
          '/guanggao',
          hasAdds() ? t('link_adBlock') : t('link_ads')
        )
      } else {
        translatedUrl = url
      }
    } else if (wantedlang === 'my') {
      if (url.includes('/rent')) {
        translatedUrl = url.replace('/rent', '/sewa')
      } else if (url.includes('/buy')) {
        translatedUrl = url.replace('/buy', '/beli')
      } else if (url.includes('/guanggao')) {
        translatedUrl = url.replace('/guanggao', '/iklan')
      }
    }
  } else if (currentLang === 'my') {
    if (wantedlang === 'en') {
      if (url.includes('/sewa')) {
        translatedUrl = url.replace('/sewa', '/rent')
      } else if (url.includes('/beli')) {
        translatedUrl = url.replace('/beli', '/buy')
      } else if (url.includes('/iklan')) {
        translatedUrl = url.replace(
          '/iklan',
          hasAdds() ? t('link_adBlock') : t('link_ads')
        )
      } else {
        translatedUrl = url
      }
    } else if (wantedlang === 'zh') {
      if (url.includes('/sewa')) {
        translatedUrl = url.replace('/sewa', '/rent')
      } else if (url.includes('/beli')) {
        translatedUrl = url.replace('/beli', '/buy')
      } else if (url.includes('/iklan')) {
        translatedUrl = url.replace('/iklan', '/guanggao')
      } else {
        translatedUrl = url
      }
    }
  } else {
    //english to my or zh
    if (wantedlang === 'zh') {
      if (url.includes('/ads')) {
        translatedUrl = url.replace('/ads', '/guanggao')
      } else if (url.includes('/details')) {
        translatedUrl = url.replace('/details', '/guanggao')
      } else {
        translatedUrl = url
      }
    } else if (wantedlang === 'my') {
      if (url.includes('/ads')) {
        translatedUrl = url.replace('/ads', '/iklan')
      } else if (url.includes('/details')) {
        translatedUrl = url.replace('/details', '/iklan')
      } else if (url.includes('/rent')) {
        translatedUrl = url.replace('/rent', '/sewa')
      } else if (url.includes('/buy')) {
        translatedUrl = url.replace('/buy', '/beli')
      }
    } else {
      translatedUrl = url
    }
  }

  return translatedUrl ? translatedUrl : url
}

export const getLangShortName = router => {
  if (router.locale) {
    if (router.locale === 'my') {
      return 'bm'
    } else if (router.locale === 'zh') {
      return 'ch'
    } else {
      return 'en'
    }
  } else {
    return 'en'
  }
}
export const getMapLinkFromMessageText = msg => {
  return msg
    .substring(msg.indexOf('<url:'), msg.indexOf('</url>'))
    .replace('<url:map>', '')
    .replace('</url>', '')
}

// ID94->SDM: Verify that Postal code exists in following 4 areas
// Klang valley ( Klang , Kuala Lumpur , Petaling Jaya , CyberJaya )

export const FOR_CHINEASE = [
  {
    id: 0,
    name: '一房式单位',
    link: 'studio'
  },
  {
    id: 1,
    name: '公寓',
    link: 'apartment'
  },
  {
    id: 2,
    name: '共管公寓',
    link: 'condo'
  },
  {
    id: 3,
    name: '房间',
    link: 'room'
  },
  {
    id: 4,
    name: '房屋',
    link: 'house'
  },
  {
    id: 5,
    name: '排屋',
    link: 'terrace'
  }
]
export const FOR_MALAYSIA = [
  {
    id: 0,
    name: 'Studio',
    link: 'studio'
  },
  {
    id: 1,
    name: 'Pangsapuri',
    link: 'apartment'
  },
  {
    id: 2,
    name: 'Kondominium ',
    link: 'condo'
  },
  {
    id: 3,
    name: 'Bilik',
    link: 'room'
  },
  {
    id: 4,
    name: 'Rumah',
    link: 'house'
  },
  {
    id: 5,
    name: 'Teres',
    link: 'terrace'
  }
]

export const APPLE_STORE =
  'https://itunes.apple.com/my/app/speedrent-property-rental/id998232868?mt=8'
export const PLAY_STORE =
  'https://play.google.com/store/apps/details?id=com.speedrent&amp;hl=en'
export const TERMS_POLICY =
  'https://speedhome.com/blog/terms-of-use?__hstc=204954831.02e7744fa236493d634ac1cdd2c45478.1558001790971.1567703742834.1567708973730.140&amp;__hssc=204954831.1.1567708973730&amp;__hsfp=245832401'
export const FACEBOOK_URL = 'https://www.facebook.com/speedhomeapp'
export const LINKEDIN_URL = 'https://www.linkedin.com/company/speedrent-com'
export const INSTA_URL = 'https://www.instagram.com/speedhomeapp'
export const TWITTER_URL = 'https://twitter.com/speedhomemy'
export const YOUTUBE_URL =
  'https://www.youtube.com/channel/UChgzJvn4ky8hjByQdMgJf3A'

export const getPopularAreasPath = (type, language) => {
  if (type === 'main') {
    if (language === 'en') {
      return '/rent/[loc]'
    } else {
      if (language === 'zh') {
        return '/rent/[loc]'
      } else {
        return '/sewa/[loc]'
      }
    }
  } else {
    if (language === 'en') {
      return '/rent/[loc]/[types]'
    } else {
      if (language === 'zh') {
        return '/rent/[loc]/[types]'
      } else {
        return '/sewa/[loc]/[types]'
      }
    }
  }
}

export const momentConvert = (date, time) => {
  const mainDate = moment(date).format('DD/MM/YYYY')
  const mainTime = moment(
    mainDate + ' ' + time,
    'DD/MM/YYYY HH:mm:ss a'
  ).format('DD-MM-YYYY hh:mm:ss a')

  return mainTime
}

export const isRentProperty = propertyType => {
  if (!propertyType) {
    return false
  }

  const sanitisedVar = propertyType.toLowerCase()

  if (sanitisedVar.includes('sale')) {
    return false
  }

  return true
}