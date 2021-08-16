import { withRouter } from 'next/router'
import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { SPEED_MANAGE, AUTH_SERVER } from '../../env'
import Image from 'next/image'
import { Button, Spinner } from 'react-bootstrap'

const ClearCookies = props => {
  useEffect(() => {
    let timer1 = null

    if (props.router && props.router.query) {
      Cookies.remove('id')
      Cookies.remove('authToken')
      Cookies.remove('xDeviceId')
      localStorage.removeItem('posData')
      localStorage.removeItem('originClickCR')

      timer1 = setTimeout(() => {
        let constructUrl = ''

        if (props.router.query.originType == 'AS') {
          constructUrl = `${SPEED_MANAGE}refresh?originType=AS`
        } else {
          constructUrl = `${AUTH_SERVER}logout?originType=SM`
        }
        window.location.href = constructUrl
      }, 100)
    }
    return () => {
      clearTimeout(timer1)
    }
  }, [props.router])

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

export default withRouter(ClearCookies)
