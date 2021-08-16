import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Notify } from 'react-redux-notify'
import Cookies from 'js-cookie'
import { withRouter } from 'next/router'
import firebase from 'firebase/app'

import Navbar from './NavBar'
import Footer from './Footer'

import { connect } from 'react-redux'
import { authVerify, userLogined } from '../actions/authActions'

import { playStorePupUpRoute } from '../globalutilities/consts'
import {
  getDengageOpenWebDate,
  setClickId,
  setDengageOpenWebDate
} from '../globalutilities/helpers'
import { AUTH_SERVER } from '../env'
import {
  dengageCompareDate,
  dengageConvertedDate,
  getRefQueryParams,
  triggerDengageEvents
} from '../utils/utils'

const Layout = props => {
  const [isOpenPlayStore, setIsOpenPlayStore] = useState(false)
  const [isOpenMenuDropdown, setOpenMenuDropdown] = useState(false)

  useEffect(() => {
    const usingBlocker = checkAdBlocker()
    usingBlocker
      .then(res => {
        if (res) {
          Cookies.set('addBlock', 1)
        } else {
          Cookies.set('addBlock', 0)
        }
      })
      .catch(err => console.error(err))

    const playStorePopupClosingTime =
      Cookies.get('playStorePopupClosingTime') || 0

    const isOpenPlayStorePopup =
      window.innerWidth <= 480 &&
      playStorePupUpRoute.indexOf(props.router.asPath) !== -1 &&
      parseInt(playStorePopupClosingTime) < Date.now()
    if (isOpenPlayStorePopup) {
      setIsOpenPlayStore(true)
    } else {
      setIsOpenPlayStore(false)
    }
  }, [])

  useEffect(() => {
    if (props.router) {
      if (props.router.query.subid) {
        setClickId(props.router.query.subid)
      }
      // utm param handle
      const queryObj = props.router.query
      let p = localStorage.getItem('utmParam')
      var utmCookies = []
      if (p != null && p != '') {
        utmCookies = JSON.parse(p).split(',')
      }

      if (queryObj) {
        for (var key in queryObj) {
          switch (key) {
            case 'utm_source':
              var key = `utm_source=${queryObj[key]}`
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
              var key = `utm_medium=${queryObj[key]}`
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
              var key = `utm_campaign=${queryObj[key]}`
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
              var key = `rid=${queryObj[key]}`
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
              var key = `gclid=${queryObj[key]}`
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
  }, [props.router])

  useEffect(() => {
    if (
      window.location.pathname.includes('/setcookie') ||
      window.location.pathname.includes('/refresh')
    ) {
      return
    } else {
      const q = decodeURI(window.location.search)
        .replace('?', '')
        .split('&')
        .map(param => param.split('='))
        .reduce((values, [key, value]) => {
          values[key] = value
          return values
        }, {})

      const refParams = getRefQueryParams()

      if (q && q.token) {
        setQueryParms(q)
      } else if (props.auth.openLoginModal) {
        let currentPath = window.location.href
        if (props.auth.loginInfoArray.isCallFavApi) {
          const chatParam = props.auth.loginInfoArray.isCallFavApi
            ? `?isCallFavApi=${true}`
            : null
          window.location.href = `${AUTH_SERVER}?originType=SH&origin=${currentPath}${chatParam}${refParams}`
        } else if (props.auth.loginInfoArray.openChatModal) {
          const chatParam = props.auth.loginInfoArray.openChatModal
            ? `?openChatModal=${true}`
            : null
          window.location.href = `${AUTH_SERVER}?originType=SH&origin=${currentPath}${chatParam}${refParams}`
        } else {
          window.location.href = `${AUTH_SERVER}?originType=SH&origin=${currentPath}${refParams}`
        }
      } else {
        authRender(refParams)
      }
    }
  }, [props.router.pathname, props.auth.openLoginModal])

  useEffect(() => {
    if (props.user) {
      if (getDengageOpenWebDate()) {
        if (getDengageOpenWebDate() !== dengageCompareDate()) {
          setDengageOpenWebDate(dengageCompareDate())
          dengageEvent()
        }
      } else {
        setDengageOpenWebDate(dengageCompareDate())
        dengageEvent()
      }
    }
  }, [props.user])

  const dengageEvent = () => {
    triggerDengageEvents('open_web', {
      name: props.user ? props.user.name : '',
      email_address: props.user && props.user.email ? props.user.email : '',
      date_triggered: dengageConvertedDate()
    })
  }

  const setQueryParms = q => {
    const token = q.token

    props.authVerify(q.id ? q.id : null, token).then(res => {
      if (res.type === 'GET_USER_PROFILE') {
        Cookies.set('authToken', token)
        props.userLoggedIn(true)
        const deviceId = q.deviceid
        Cookies.set('xDeviceId', deviceId)
        Cookies.set('id', q.id ? q.id : res.payload.id)
        if (!_.isEmpty(checkIfHasOtherParams(q))) {
          const soretedQueryParams = checkIfHasOtherParams(q)
          props.router.push({
            pathname: window.location.pathname,
            query: { ...soretedQueryParams },
            shallow: true
          })
        } else {
          props.router.replace(window.location.pathname, undefined, {
            shallow: true
          })
        }
        if (window && typeof window !== 'undefined') {
          window.dengage('setContactKey', q.id ? q.id : res.payload.email)
          window.dengage('setDeviceId', deviceId)
        }
      }
    })
  }
  const checkIfHasOtherParams = oldParams => {
    let paramsClone = Object.assign({}, oldParams)
    if (paramsClone.id) {
      delete paramsClone.id
    }
    if (paramsClone.token) {
      delete paramsClone.token
    }
    if (paramsClone.deviceId) {
      delete paramsClone.deviceId
    }

    return paramsClone
  }
  const authRender = refParams => {
    if (
      !Cookies.get('authToken') &&
      window &&
      window.location &&
      [`/dashboard`, `/refer`, `/deal`, `/ramci/zero-deposit`].includes(
        window.location.pathname
      )
    ) {
      const currentPath = window.location.href
      const constructUrl = `${AUTH_SERVER}?originType=SH&origin=${currentPath}${refParams}`
      window.location.href = constructUrl
    }
  }

  function checkAdBlocker () {
    // Used to cache the result
    let isBlocked

    function tryRequest () {
      try {
        return fetch(
          new Request(
            'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
            {
              method: 'HEAD',
              mode: 'no-cors'
            }
          )
        )
          .then(function (response) {
            // Google Ads request succeeded, so likely no ad blocker
            isBlocked = false
            return isBlocked
          })
          .catch(function (e) {
            // Request failed, likely due to ad blocker
            isBlocked = true
            return isBlocked
          })
      } catch (error) {
        // fetch API error; possible fetch not supported (old browser)
        // Marking as a blocker since there was an error and so
        // we can prevent continued requests when this function is run
        isBlocked = true
        return isBlocked
      }
    }

    return isBlocked !== undefined ? isBlocked : tryRequest()
  }

  function getMessage () {
    const messaging = firebase.messaging()
    messaging.onMessage(message => {
      navigator.serviceWorker
        .getRegistration('/firebase-cloud-messaging-push-scope')
        .then(registration => {
          const notificationData = message.notification

          const notificationTitle = notificationData.title
          const notificationOptions = {
            body: notificationData.body,
            icon: '/img/logo@2x.png'
          }

          registration.showNotification(notificationTitle, notificationOptions)
        })
    })
  }

  const playstorePopupLayoutClose = () => {
    setIsOpenPlayStore(false)
  }
  if (
    props.router.asPath.includes('/setcookie') ||
    props.router.asPath.includes('/refresh')
  ) {
    return <>{props.children}</>
  } else {
    return (
      <div className='layout--container'>
        <Navbar
          isOpenMenuDropdown={isOpenMenuDropdown}
          setOpenMenuDropdown={setOpenMenuDropdown}
          isOpenPlayStore={isOpenPlayStore}
          playstorePopupLayoutClose={playstorePopupLayoutClose}
        />
        <div
          className='inner--container'
          onClick={() => setOpenMenuDropdown(false)}
        >
          {props.children}
          <Notify />
        </div>
        <Footer />
        <div id='wrapfabtest'>
          <div className='adBanner'></div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth,
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLoggedIn: loggedInState => dispatch(userLogined(loggedInState)),
    authVerify: (id, authToken) => dispatch(authVerify(id, authToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout))
