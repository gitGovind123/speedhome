import { withRouter } from 'next/router'
import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { SPEED_MANAGE } from '../../env'
import Image from 'next/image'
import { Button, Spinner } from 'react-bootstrap'

const SetCookie = props => {
  useEffect(() => {
    const q = decodeURI(window.location.search)
      .replace('?', '')
      .split('&')
      .map(param => param.split('='))
      .reduce((values, [key, value]) => {
        values[key] = value
        return values
      }, {})

    let timer1 = null

    if (q && q.token) {
      const token = q.token
      Cookies.set('authToken', token)
      Cookies.set('id', q.id)
      if (q.deviceId) {
        Cookies.set('xDeviceId', q.deviceId)
      }

      // remove the / from the last charecter
      const sm = SPEED_MANAGE.slice(0, -1)
      const path = decodeURIComponent(q.path)
      timer1 = setTimeout(() => {
        if (q.originType == 'AS') {
          const redirectUrl = `${SPEED_MANAGE}setcookie?id=${q.id}&token=${token}&deviceId=${q.deviceId}&path=${path}&originType=AS`

          window.location.href = redirectUrl
        } else {
          const isFreeAgreement = q.isFreeAgreement
            ? q.isFreeAgreement
            : 'false'
          const redirectUrl = `${sm}${path}?id=${q.id}&token=${token}&deviceId=${q.deviceId}&isFreeAgreement=${isFreeAgreement}`

          if (
            redirectUrl.includes('/dashboard/properties/collect-rent') &&
            isFreeAgreement === 'true'
          ) {
            const newUrl = `${sm}/dashboard/agreements/compose-agreement?id=${q.id}&token=${token}&deviceId=${q.deviceId}&isFreeAgreement=${isFreeAgreement}`
            window.location.href = newUrl
          } else {
            window.location.href = redirectUrl
          }
        }
      }, 100)
    }
    return () => {
      clearTimeout(timer1)
    }
  }, [])

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Image
        src='/img/SPEEDHOME_ICON.svg'
        alt='Speedhome icon'
        height={100}
        width={100}
      />
      <Button
        style={{
          backgroundColor: 'transparent',
          color: '#333',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '1rem',
          fontSize: '14px'
        }}
        disabled
      >
        <Spinner
          as='span'
          animation='grow'
          size='sm'
          role='status'
          aria-hidden='true'
        />
        Loading...
      </Button>
    </div>
  )
}

export default withRouter(SetCookie)
