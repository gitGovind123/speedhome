import React, { useEffect, useState } from 'react'
import { withRouter } from 'next/router'

import { subscribe, connectSocket } from '../../../api/socketIo/socket'
import { TOPIC_USER, SESSION_USER } from '../../../api/socketIo/socket-events'

import Head from '../../../components/Common/Head'
import Chat from '../../../components/chat'
import { getToken } from '../../../globalutilities/helpers'

const ChatPage = props => {
  const [socket, setSocket] = useState(null)
  const [sessionUser, setSessionUser] = useState(null)

  useEffect(() => {
    if (getToken()) {
      const token = getToken()
      const socket = connectSocket(token)
      socket.on('connect', () => {
        setSocket(socket)
        socket.on(SESSION_USER, res => {
          const sessionUser = res.data
          setSessionUser(sessionUser)
          subscribe(
            socket,
            TOPIC_USER + sessionUser.sessionId + '/conversation'
          )
        })
      })
    } else {
      if (props.router.locale === 'my') {
        props.router.push('/my/dashboard')
      } else if (props.router.locale === 'zh') {
        props.router.push('/zh/dashboard')
      } else {
        props.router.push('/dashboard')
      }
    }
  }, [])
  // handle
  return (
    <>
      <Head title={'Dashboard | Chat'} />

      {socket ? <Chat socket={socket} sessionUser={sessionUser} /> : null}
    </>
  )
}

export async function getServerSideProps () {
  return {}
}

export default withRouter(ChatPage)
