import React, { useEffect, useRef, useReducer, useState } from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

import WriteChat from './WriteChat'
import {
  IMAGE_UPLOAD_URL,
  VIDEO_UPLOAD_URL
} from '../../../api/socketIo/socket'
import axios from 'axios'
import withSizes from 'react-sizes'

import {
  CONVERSATION_MESSAGES,
  TYPING,
  USER_MESSAGE,
  MESSAGE,
  CONVERSATION_ARCHIVE
} from '../../../api/socketIo/socket-events'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import { reducer, initState } from './reducer'
import MessageList from './Messages'
import {
  getAppointmentsByChatConversationId,
  getBannerTextByChatConversationId,
  getPropertyInfo,
  getPreSignedUrl
} from '../../../actions/chatAction'

import { ClipLoader } from 'react-spinners'
import Swal from 'sweetalert2'
import { API_HOST } from '../../../env'
import {
  getToken,
  getBackendChatConversationId,
  getUserId
} from '../../../globalutilities/helpers'
import RightChatStatusBar from './RightChatStatusBar'

const RightChat = props => {
  const { styles } = props

  const chatContainer = useRef(null)

  const socket = props.connectSocket
  const [state, dispatch] = useReducer(reducer, initState)
  const [convId, setConvId] = useState(() => null)
  const [isChrome, setIsChrome] = useState(false)
  const [sentTo, setSentTo] = useState('Everyone')
  const [scrolledToTop, setScrolledToTop] = useState(false)
  const [reportMsg, setReportMsg] = useState('')
  const [replyProps, setReplyProps] = useState(null)
  const [videoStatus, setVideoStatus] = useState('')
  const [isSendVideo, setSendVideo] = useState(false)
  const [isPrivateChatPossible, setIsPrivateChatPossible] = useState(false)
  const [aliciaId, setAliciaId] = useState('')

  // let aliciaId = ''
  // let isPrivateChatPossible = false
  // if (state && state.activeChat && state.activeChat.members) {
  //   aliciaId = (state.activeChat.members || []).filter(
  //     ele => ele.name === 'Alicia' && ele.email === 'noreply@speedhome.com'
  //   )
  //   if (aliciaId && !!aliciaId.length) {
  //     aliciaId = aliciaId[0].id
  //   } else {
  //     aliciaId = ''
  //   }

  //   isPrivateChatPossible = aliciaId && state.activeChat.members.length > 2
  // }

  let bannerText = props.bannerText

  useEffect(() => {
    const isChrome =
      !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)
    setIsChrome(isChrome)
  }, [])
  useEffect(() => {
    const fetchMessageList = data => {
      const message = data.data
      if (message) {
        dispatch({
          type: 'UPDATE_CONVERSATION_MESSAGES',
          payload: {
            message
          }
        })
      }
    }

    socket.on(CONVERSATION_MESSAGES, fetchMessageList)

    return () => {
      socket.off(CONVERSATION_MESSAGES, fetchMessageList)
    }
  }, [state.conversationMessages])

  useEffect(() => {
    setReplyProps(null)
    setSentTo('Everyone')
    if (!props.activeChat) {
      dispatch({
        type: 'SET_INIT_STATE',
        payload: {
          activeChat: null,
          sessionUser: null
        }
      })
    } else {
      let chatId = props.activeChat.id
      socket.emit(CONVERSATION_MESSAGES, chatId)
      dispatch({
        type: 'SET_INIT_STATE',
        payload: {
          activeChat: props.activeChat,
          sessionUser: props.sessionUser
        }
      })
      onRemoveImage()
      onRemoveVideo()

      let conversationId = ''
      const backendCustomArray = props.activeChat.custom.filter(
        x => x.key === 'backend_chat_conversation_id'
      )
      if (backendCustomArray.length > 0) {
        conversationId = backendCustomArray[0].value
      }
      props.removeUnreadMessages(props.activeChat)
      getAppointmentsByChatConversationId(conversationId)
        .then(res => {
          if (res && res.success) {
            dispatch({
              type: 'SET_APPOINTMENT_DATA',
              payload: res.data
            })
          } else {
            dispatch({
              type: 'SET_APPOINTMENT_DATA',
              payload: null
            })
          }
        })
        .then(() => setConvId(conversationId))
    }
  }, [props.activeChat])

  useEffect(() => {
    setPrivateChat()
  }, [props.activeChat, sentTo])

  const setPrivateChat = () => {
    if (props && props.activeChat && props.activeChat.members) {
      let aliciaId = (props.activeChat.members || []).filter(
        ele => ele.name === 'Alicia' && ele.email === 'noreply@speedhome.com'
      )
      if (aliciaId && !!aliciaId.length) {
        setAliciaId(aliciaId[0].id)
      } else {
        setAliciaId('')
      }
      setIsPrivateChatPossible(aliciaId && props.activeChat.members.length > 2)
    }
  }
  useEffect(() => {
    if (convId) props.getBannerTextByChatConversationId(convId)
  }, [convId])

  useEffect(() => {
    const updateMsgData = data => {
      const message = data.data
      const msgChannel = data.channel
      let isInGroup = false
      const chatId = parseInt(msgChannel.replace(/^\D+/g, ''))
      if (message) {
        const filterMembers = state.activeChat.members.filter(
          member => member.id === message.sender.id
        )
        if (filterMembers && filterMembers.length > 0) {
          isInGroup = true
        }

        if (isInGroup && chatId === state.activeChat.id) {
          dispatch({
            type: 'SET_NEW_MESSAGE',
            payload: {
              message
            }
          })
        }
      }
    }

    socket.on(MESSAGE, updateMsgData)
    return () => socket.off(MESSAGE, updateMsgData)
  })

  const selectChange = data => {
    setSentTo(data.value)
  }

  useEffect(() => {
    const updateTypingData = data => {
      const userId = data.data.userId
      const sessionUserId = props.sessionUser.id
      if (sessionUserId !== userId) {
        dispatch({
          type: 'SET_TYPING',
          payload: {
            isSomeoneTypingStatus: true,
            isSomeoneTypingUserId: userId
          }
        })
        setTimeout(() => {
          dispatch({
            type: 'SET_TYPING',
            payload: {
              isSomeoneTypingStatus: false,
              isSomeoneTypingUserId: ''
            }
          })
        }, 4000)
      }
    }
    socket.on(TYPING, updateTypingData)

    return () => socket.off('on', updateTypingData)
  }, [])

  const changeMessageText = e => {
    const msg = e.target.value
    if (msg !== '\n') {
      dispatch({
        type: 'UPDATE_MESSAGE_INPUT',
        payload: {
          msg
        }
      })
    }
  }

  const onTextAreaKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      onSendButtonPress()
    } else {
      socket.emit(TYPING, state.activeChat.id)
    }
  }

  const onSendButtonPress = () => {
    if (state.messageInput.length > 0) {
      let incomingMessage = {
        text: state.messageInput,
        type: USER_MESSAGE,
        sender: {
          id: state.sessionUser.id
        }
      }

      if (sentTo === 'Alicia' && aliciaId) {
        incomingMessage = {
          ...incomingMessage,
          readBy: [
            {
              userId: aliciaId
            }
          ]
        }
      }

      if (replyProps) {
        incomingMessage = {
          ...incomingMessage,
          quotedMessage: {
            id: replyProps.id
          }
        }
        setReplyProps(null)
      }

      socket.emit(MESSAGE, state.activeChat.id, incomingMessage)
      dispatch({
        type: 'SET_MESSAGE_INPUT'
      })
      if (chatContainer.current.scrollTop === 0) {
        scrollChat()
      }
      if (state.imgPreviewUrl.length > 0) {
        sendImage()
      }
      if (state.preSignedPayload) {
        setSendVideo(true)
      }
    } else if (state.imgPreviewUrl.length > 0) {
      sendImage()
    } else if (state.preSignedPayload) {
      setSendVideo(true)
    }
  }

  useEffect(() => {
    if (
      !state.isUploadingVideo &&
      isSendVideo &&
      (videoStatus !== 'ERROR' || videoStatus === 'CANCELED')
    ) {
      setTimeout(() => {
        const token = Cookies.get('authToken')
        const user = state.sessionUser
        const payload = {
          text: '',
          sender: {
            id: user.id,
            token: token
          },
          mediaType: 'VIDEO',
          custom: [
            {
              key: 'MEDIA_ID',
              value: state.preSignedPayload.mediaId
            }
          ]
        }
        socket.emit(MESSAGE, state.activeChat.id, payload)
        onRemoveVideo()
      }, 0)
    }
  }, [state.isUploadingVideo, isSendVideo, videoStatus])

  const sendVideo = preSignedPayload => {
    dispatch({
      type: 'SET_PRE_SIGNED_URL',
      payload: {
        preSignedPayload: preSignedPayload
      }
    })
    let apiUrl =
      VIDEO_UPLOAD_URL +
      `${state.activeChat.id}/media/${preSignedPayload.mediaId}`
    const token = Cookies.get('authToken')
    const user = state.sessionUser
    const payload = {
      text: '',
      sender: {
        id: user.id,
        token: token
      },
      mediaType: 'VIDEO',
      custom: [
        {
          key: 'MEDIA_ID',
          value: preSignedPayload.mediaId
        }
      ]
    }
    axios
      .post(
        apiUrl,
        { ...payload },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(() => {
        checkVideoStatus(apiUrl, token, payload)
      })
      .catch(() => {
        onRemoveVideo()
      })
  }

  const checkVideoStatus = (apiUrl, token, payload) => {
    axios({
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      data: null,
      method: 'get'
    })
      .then(res => {
        if (res.data.status === 'COMPLETE') {
          setVideoStatus('COMPLETE')
          dispatch({ type: 'SET_REMOVE_VIDEO_URL_LOADER' })
        } else if (
          res.data.status === 'SUBMITTED' ||
          res.data.status === 'PROGRESSING'
        ) {
          setVideoStatus('SUBMITTED')
          setTimeout(() => {
            checkVideoStatus(apiUrl, token, payload)
          }, 2000)
        } else {
          setVideoStatus('ERROR')
          onRemoveVideo()
        }
      })
      .catch(e => {
        setVideoStatus('ERROR')
        onRemoveVideo()
      })
  }

  const onRemoveVideo = () => {
    setSendVideo(false)
    dispatch({
      type: 'SET_REMOVE_VIDEO_URL'
    })
    setTimeout(() => {
      setVideoStatus('')
    }, 4000)
  }

  const videoUrls = e => {
    let file = e.target.files[0]
    if (file) {
      dispatch({ type: 'UPLOAD_VIDEO_BEGIN' })
      getPreSignedUrl(state.activeChat.id, file, payload => sendVideo(payload))
      let reader = new FileReader()
      reader.onloadend = () => {
        dispatch({
          type: 'SET_ADD_VIDEO_URL',
          payload: {
            videoPreviewUrl: reader.result
          }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const sendImage = () => {
    let apiUrl = IMAGE_UPLOAD_URL + `${state.activeChat.id}/add`
    let image = {
      base64: state.imgPreviewUrl.substr(state.imgPreviewUrl.indexOf(',') + 1),
      filename: state.file.name
        ? state.file.name
        : `${Math.random()
            .toString(36)
            .slice(-5)}.jpg`
    }
    const token = Cookies.get('authToken')
    const user = state.sessionUser
    dispatch({
      type: 'UPLOAD_IMAGE_BEGIN'
    })
    axios
      .post(
        apiUrl,
        {
          fileName: image.filename,
          uploadingFile: image.base64
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
        const message = {
          text: '',
          sender: {
            id: user.id,
            token: token
          },
          mediaType: 'IMAGE',
          custom: [
            {
              key: 'IMAGE_ID',
              value: res.data.id
            }
          ]
        }
        socket.emit(MESSAGE, state.activeChat.id, message)
        dispatch({
          type: 'SET_REMOVE_IMAGE_URL'
        })
      })
      .catch(() => {
        dispatch({
          type: 'SET_REMOVE_IMAGE_URL'
        })
      })
  }

  const onRemoveImage = () => {
    dispatch({
      type: 'SET_REMOVE_IMAGE_URL'
    })
  }

  const imageUrls = e => {
    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      dispatch({
        type: 'SET_ADD_IMAGE_URL',
        payload: {
          file: file,
          imgPreviewUrl: reader.result
        }
      })
    }
    reader.readAsDataURL(file)
  }

  const handleScroll = () => {
    let notScrolled = false
    setScrolledToTop(false)
    if (chatContainer.current.scrollTop > 0) {
      notScrolled = false
    }

    if (chatContainer.current.scrollTop === 0 && !notScrolled) {
      // send request only if conversation at the top of page and it's not just opened
      onLoadEarlier()
    }
  }

  const onLoadEarlier = () => {
    const { conversationMessages, activeChat, lastMessageID } = state
    setScrolledToTop(true)
    const lastMessage = conversationMessages[0].id
    if (lastMessageID !== lastMessage) {
      socket.emit(CONVERSATION_MESSAGES, activeChat.id, lastMessage)
      dispatch({
        type: 'LAST_MESSAGE_ID',
        payload: {
          lastMessageID: lastMessage
        }
      })
    }
  }
  const openImageModal = url => {
    dispatch({
      type: 'SET_OPEN_IMAGE_MODAL',
      payload: {
        openImageModal: true,
        messageImage: url
      }
    })
  }
  const openSettingsDropDown = () => {
    dispatch({
      type: 'SET_SETTINGS_MODAL_OPEN',
      payload: true
    })
  }
  const openContactDropDown = () => {
    dispatch({
      type: 'SET_Contacts_MODAL_OPEN',
      payload: true
    })
  }
  const closeContactDropDown = () => {
    dispatch({
      type: 'SET_Contacts_MODAL_CLOSE',
      payload: false
    })
  }
  const closeSettingsDropDown = () => {
    dispatch({
      type: 'SET_SETTINGS_MODAL_CLOSE',
      payload: false
    })
  }
  const archiveConversation = () => {
    const id = state.activeChat.id
    if (id) {
      socket.emit(CONVERSATION_ARCHIVE, id, () => {
        props.sendArchievedId(id)
        closeSettingsDropDown()
        chatBoxMobile()
      })
    }
  }
  const chatBoxMobile = () => {
    const isMobile = window.innerWidth <= 500
    if (isMobile) {
      props.mobileViewChatChange()
    }
  }
  let chatClass = styles['chat']

  const openProfileDiv = () => {
    if (
      state.activeChat &&
      state.activeChat.members &&
      state.activeChat.members.length <= 2 &&
      state.activeChat.members.find(e => e.id == '1')
    ) {
      props.openProfileSideBar({
        email: 'hello@speedhome.com',
        name: 'Alicia',
        phone: '60187777650',
        specificUserFromMessageLink: false
      })
    } else {
      const currentUserID = getUserId()
      const otherUser = state.activeChat.members.find(
        e => e.id !== currentUserID && e.email === 'finance@speedhome.com'
      )
      props.openProfileSideBar(otherUser)
    }
  }
  const scrollChat = () => {
    let chat = document.getElementById('chatContainerId')
    chat.scrollTop = chat.scrollHeight
  }

  const reportConversation = async reason => {
    if (state.activeChat) {
      // the one to get reported
      let reporteeId = ''
      let isLoggedInUserIsLandlord = false
      // removing alicia from the list

      // backend conversatio Id
      const conversationId = getBackendChatConversationId(state.activeChat)
      if (conversationId) {
        // get the property related to the chat
        const propertyInfo = await getPropertyInfo(conversationId)

        if (
          parseInt(getUserId()) ===
          parseInt(
            propertyInfo.data &&
              propertyInfo.data.user &&
              propertyInfo.data.user.id
          )
        ) {
          isLoggedInUserIsLandlord = true
          // tenant backendId
          reporteeId =
            propertyInfo.data.property &&
            propertyInfo.data.property.user &&
            propertyInfo.data.property.user.id
        } else {
          // landlord backendId
          reporteeId =
            propertyInfo.data &&
            propertyInfo.data.user &&
            propertyInfo.data.user.id
        }
      }

      if (reporteeId) {
        const payload = {
          reporteeId,
          reason
        }

        // move this axios call in chatAction Creator
        try {
          setReportMsg('')
          const res = await axios.post(
            `${API_HOST}chat-conversations/${conversationId}/report`,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: getToken()
              }
            }
          )
          setReportMsg(
            'Thank you for your report. We at Speedhome takes your report very seriously and will investigate on this matter.'
          )
        } catch (err) {
          if (err.response.status === 429) {
            setReportMsg('You have already reported this.')
          }
        }
      }
    }
  }

  const urgentConversation = async (conversationId, context, callback) => {
    if (state.activeChat) {
      if (conversationId && conversationId !== '') {
        const payload = { context }
        try {
          const response = await axios.post(
            `${API_HOST}chat-conversations/${conversationId}/urgent`,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: getToken()
              }
            }
          )
          callback('success', response)
        } catch (err) {
          callback('failed', err)
        }
      }
    }
  }

  const openBannerInModal = bannerText => {
    Swal.fire({
      position: 'center',
      icon: 'success',

      text: bannerText,
      showConfirmButton: true,
      allowOutsideClick: true
    })
  }
  return (
    <div className='right'>
      <RightChatStatusBar
        styles={styles}
        socket={socket}
        state={state}
        mobileViewChatChange={props.mobileViewChatChange}
        openProfileDiv={openProfileDiv}
        openContactDropDown={openContactDropDown}
        closeContactDropDown={closeContactDropDown}
        openSettingsDropDown={openSettingsDropDown}
        closeSettingsDropDown={closeSettingsDropDown}
        aliciaId={aliciaId}
        isSupport={props.isSupport}
        reportConversation={reportConversation}
        reportMsg={reportMsg}
        activeChat={props.activeChat}
        pinnedChat={props.pinnedChat}
        archiveConversation={archiveConversation}
        isMobile={props.isMobile}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <div className={styles['conversation-container']}>
          {state.activeChat &&
          state.activeChat.members.find(member => {
            return member.name.toLowerCase() == 'alicia'
          }) ? (
            state.appointMentData &&
            (state.appointMentData.status || bannerText) && (
              <div className={styles['appointment--container']}>
                <div className={styles['infobox']}>
                  <div
                    className={styles['img-box']}
                    style={{
                      width: !props.isSupport && aliciaId ? '4rem' : '0rem'
                    }}
                  >
                    {state.appointMentData.propertyDto &&
                      state.appointMentData.propertyDto.images &&
                      state.appointMentData.propertyDto.images.map(allImg => {
                        if (allImg.coverPhoto) {
                          return <img src={allImg.url} />
                        }
                      })}
                  </div>
                  {bannerText && !/^viewing appointment$/i.test(bannerText) ? (
                    <div
                      className={styles['chat__banner--text']}
                      onClick={() =>
                        props.isMobile ? openBannerInModal(bannerText) : null
                      }
                    >
                      {bannerText}
                    </div>
                  ) : (
                    <div className={styles['info']}>
                      <span className={styles['head']}>
                        Viewing Appointment
                      </span>
                      <span className={styles['date']}>
                        {dayjs(state.appointMentData.dateTime).format('lll')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          ) : (
            // no alicia
            <div className={styles['appointment--container']}>
              <div className={styles['infobox']}>
                <div className={styles['info']}>
                  <span className={styles['head']}>
                    Kindly AVOID transacting outside of SPEEDHOME. Please reach
                    out to +60187777650 for further assistance.
                  </span>
                </div>
              </div>
            </div>
          )}

          {state.activeChat &&
          state.conversationMessages &&
          state.conversationMessages.length > 0 ? (
            <>
              <div
                id='chatContainerId'
                className={chatClass}
                style={{
                  height: state.imgPreviewUrl
                    ? 'calc(92% - 100px)'
                    : isPrivateChatPossible
                    ? '78%'
                    : '92%'
                }}
                ref={chatContainer}
                data-chat='person2'
                onScroll={handleScroll}
              >
                {state.isUploadingImg ? (
                  <div
                    className='preloader text-center'
                    style={{ width: '100%' }}
                  >
                    <ClipLoader color='#fff' />
                    <span>Uploading image</span>
                  </div>
                ) : null}
                <MessageList
                  styles={styles}
                  activeChat={state.activeChat}
                  setActiveChat={props.setActiveChat}
                  chatMessages={state.conversationMessages}
                  sessionUser={state.sessionUser}
                  openImageModal={openImageModal}
                  selectedUser={props.selectedUser}
                  isPrivateChatPossible={isPrivateChatPossible}
                  scrollChat={scrollChat}
                  scrolledToTop={scrolledToTop}
                  bannerText={bannerText}
                  setReplyProps={setReplyProps}
                  hasNewMessage={props.hasNewMessage}
                  isMobile={props.isMobile}
                />
              </div>
              <WriteChat
                styles={styles}
                socket={socket}
                sessionUser={state.sessionUser}
                activeChat={state.activeChat}
                messageInput={state.messageInput}
                onChangeMessageText={changeMessageText}
                onTextAreaKeyPress={onTextAreaKeyPress}
                onSendButtonPress={onSendButtonPress}
                imageUrls={imageUrls}
                imgPreviewUrl={state.imgPreviewUrl}
                removePreviewUrl={onRemoveImage}
                videoUrls={videoUrls}
                videoPreviewUrl={state.videoPreviewUrl}
                isUploadingVideo={state.isUploadingVideo}
                removeVideoPreviewUrl={onRemoveVideo}
                selectChange={selectChange}
                isPrivateChatPossible={isPrivateChatPossible}
                users={state.activeChat.members}
                replyProps={replyProps}
                setReplyProps={setReplyProps}
                urgentConversation={urgentConversation}
                videoStatus={videoStatus}
                isSendVideo={isSendVideo}
                isMobile={props.isMobile}
              />
            </>
          ) : null}
        </div>
      </div>
      <Modal
        show={state.openImageModal}
        onHide={() => {
          dispatch({
            type: 'SET_CLOSE_IMAGE_MODAL',
            payload: {
              openImageModal: false
            }
          })
        }}
        animation
        className='custModal'
        centered
      >
        <Modal.Body>
          <img src={state.messageImage} fluid />
        </Modal.Body>
      </Modal>
    </div>
  )
}
const mapStateToProps = state => ({
  bannerText: state.bannerTextReducer.bannerText
})

const mapDispatchToProps = {
  getBannerTextByChatConversationId
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 767
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSizes(mapSizesToProps)(RightChat))
