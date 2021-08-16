import io from 'socket.io-client'
import { SOCKET_ENDPOINT, CHAT_IMAGE_UPLOAD_URL, CHAT_VIDEO_UPLOAD_URL } from '../../env'
import { SUBSCRIBE, TOPIC_TOKEN } from './socket-events'

export const IMAGE_UPLOAD_URL = CHAT_IMAGE_UPLOAD_URL
export const VIDEO_UPLOAD_URL = CHAT_VIDEO_UPLOAD_URL

export const connectSocket = token => {
  const socket = io(`${SOCKET_ENDPOINT}/chat?token=${token}`, {
    reconnection: true,
    reconnectionDelay: 500,
    jsonp: false,
    reconnectionAttempts: Infinity,
    transports: ['websocket']
  })
  const randomId = 'rand_' + Math.floor(Math.random() * 1000000 + 1)

  subscribe(socket, TOPIC_TOKEN + randomId)

  return socket
}

export const subscribe = (socket, channel) => {
  socket.emit(SUBSCRIBE, channel)
}
