import React, { useEffect, useState, useMemo } from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

import _ from 'lodash'
import { DoneAll } from '@material-ui/icons'
import ReplyIcon from '@material-ui/icons/Reply'
import IconButton from '@material-ui/core/IconButton'
import Avatar from 'react-avatar'
import Button from '@material-ui/core/Button'
import { findPhoneNumbersInText } from 'libphonenumber-js'
import ExpandLessRounded from '@material-ui/icons/ExpandLessRounded'
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser'
import getUrls from 'get-urls'
import Linkify from 'linkifyjs/react'
import {
  getUserIdFromMessageText,
  getNameFromMsgUrl,
  getMapLinkFromMessageText,
  getRefLinkFromMessageText
} from '../../../globalutilities/helpers'

import PromoteAppDownloadModal from './PromoteAppDownloadModal'

const YOUTUBE_REGEX_CHECK = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/

const app_download = 'https://speedhome.app.link/joinappnow'
const Messages = props => {
  const [convoMesgLit, setConvoMsgList] = useState([])
  const {
    styles,
    sessionUser,
    openImageModal,
    selectedUser,
    scrollChat,
    setReplyProps,
    hasNewMessage,
    isMobile
  } = props

  const [unreadMsgCount, setUnreadCount] = useState(0)
  const [showAppDownloadModal, setShowAppDownloadModal] = useState(false)
  useEffect(() => {
    if (!props.scrolledToTop) {
      scrollChat()
    }
  }, [convoMesgLit])

  useEffect(() => {
    if (props.activeChat && props.activeChat.hasOwnProperty('unReadMsgCount')) {
      setUnreadCount(props.activeChat.unReadMsgCount)
    }
    let allMessage = JSON.parse(JSON.stringify(props.chatMessages))
    let sentMessage = hasNewMessage
      ? allMessage.find(val => val.id === hasNewMessage.lastMessage.id)
      : null
    if (
      !sentMessage &&
      hasNewMessage &&
      props.activeChat.id === hasNewMessage.id
    ) {
      allMessage.push(hasNewMessage && hasNewMessage.lastMessage)
    }
    allMessage.forEach(function (data, index) {
      data['bubbleTime'] = data && data.dateCreated
      data['unread'] = !(
        data.readBy &&
        data.readBy.find(i => i.userId === sessionUser.id && i.status > 1)
      )

      data['groupDate'] = dayjs(data.dateCreated).format('L')
    })
    let grouped = _.mapValues(_.groupBy(allMessage, 'groupDate'), clist =>
      clist.map(car => _.omit(car, null))
    )
    let groupedMessage = orderGroupMessage(grouped)
    setConvoMsgList(groupedMessage)
  }, [props.chatMessages, hasNewMessage])
  let linkProps = {
    // Click handler for links
    onClick: () => confirm('Are you sure you want to leave this page?')
  }

  const orderGroupMessage = grouped => {
    const orderedGroupMessage = {}
    let keys = []
    for (let key in grouped) {
      keys.push(key)
    }
    for (let i = keys.length - 1; i >= 0; i--) {
      orderedGroupMessage[keys[i]] = grouped[keys[i]]
    }
    return orderedGroupMessage
  }
  const getEmbededUrl = link => {
    if (link) {
      const url = link.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
      const videoId =
        url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0]
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      } else {
        return null
      }
    }

    return null
  }

  const htmlParserTransform = (node, index) => {
    if (node.type == 'tag' && node.name == 'a') {
      // a tag named a
      const { href } = node.attribs // extract the actual url
      if (node.attribs.metauserid) {
        return (
          <a
            href={'#'} // show it as the actual url, e.g. when hovered over, ..
            onClick={event => {
              selectedUser({
                name: 'USER',
                backendUserId: node.attribs.metauserid,
                specificUserFromMessageLink: true
              })
            }}
          >
            <span pointerEvents='none'>
              {convertNodeToElement(node, index, htmlParserTransform)}
            </span>
          </a>
        )
      } else {
        return (
          <a
            href={'#'} // show it as the actual url, e.g. when hovered over, ..
            onClick={event => {
              event.preventDefault() // .. but prevent the default behaviour
              //	now, do whatever you want with href, for example:
              window.open(href, '_blank')
            }}
          >
            <span pointerEvents='none'>
              {convertNodeToElement(node, index, htmlParserTransform)}
            </span>
          </a>
        )
      }
    } else {
      return convertNodeToElement(node, index, () => {})
    }
  }
  const renderMessageImg = imgUrl => {
    return (
      <img
        loading='lazy'
        src={imgUrl}
        className={styles['bubbleImg']}
        style={{
          height: 'auto',
          width: '100%',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={() => openImageModal(imgUrl)}
      />
    )
  }

  const renderMessageVideo = message => {
    const preSingedUrl = message.custom.find(m => m.key === 'MEDIA_URL')[
      'value'
    ]
    const preSingedUrl_c = preSingedUrl.replace('-converted', '')
    return (
      <video controls height='100%' width='100%'>
        <source loading='lazy' src={preSingedUrl_c} type='video/mp4' />
      </video>
    )
  }
  const getYoutubeLinkFromString = msg => {
    const GET_LINK = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi
    const youtube_link_arr = msg.match(GET_LINK)
    if (youtube_link_arr && youtube_link_arr.length > 0) {
      return youtube_link_arr
    }
  }
  const renderYoutubeUrl = (msg, embededUrl) => {
    if (embededUrl) {
      return (
        <>
          <Linkify options={{ attributes: linkProps, nl2br: true }}>
            {msg}
          </Linkify>
          <iframe
            width='100%'
            height='100%'
            allowfullscreen='0'
            src={embededUrl}
          ></iframe>
        </>
      )
    }
  }

  const makeStructureOfFromArray = string => {
    const convertToArray = string.split(',')

    let obj = {}
    if (convertToArray && convertToArray.length > 0) {
      convertToArray.forEach(res => {
        const temp = res.split(':')

        obj[temp[0]] = temp[1]
      })
    }
    return obj
  }
  const isIncludesImgUrl = msg => {
    const imgChecker = ['.png', '.jpeg', '.jpg']
    const hasImgUrl = msg.match(
      new RegExp('\\b(' + imgChecker.join('|') + ')\\b', 'ig')
    )
    const imgUrlArr = Array.from(getUrls(msg))

    return {
      hasImgUrl: hasImgUrl,
      imgUrlArr: imgUrlArr
    }
  }

  const returnMessageText = (userName, msg, isHtml) => {
    const phoneNumbers = findPhoneNumbersInText(msg)
    if (phoneNumbers && phoneNumbers.length > 0) {
      phoneNumbers.forEach(number => {
        if (number && number.number && number.number.number) {
          if (msg.includes(number.number.number)) {
            msg = msg.replace(
              number.number.number,
              `<a href="tel:${number.number.number}">${number.number.number}</a>`
            )
          }
        }
      })
    }
    if (isHtml) {
      let msgString = msg

      if (msgString.includes('@')) {
        let totalArrayOfMsg = msgString.replace(/\n/g, ' ').split(' ')
        let tagSupportmsg = msgString
        if (totalArrayOfMsg && totalArrayOfMsg.length > 0) {
          totalArrayOfMsg.map(msgArr => {
            if (msgArr !== '@' && msgArr.length && msgArr[0] === '@') {
              tagSupportmsg = tagSupportmsg.replace(
                msgArr,
                `<b style="color:#ffe100">${msgArr}</b>`
              )
            }
          })
        }
        msgString = tagSupportmsg
      }
      if (msgString.includes('<url')) {
        let firstReplace = ''
        if (msgString.includes('<url:post')) {
          const locationName = window.location.origin + '/post'
          firstReplace = msgString.replace(
            '<url:post',
            `<a href=${locationName}`
          )
        } else if (msgString.includes('<url:profile')) {
          const locationName =
            window.location.origin + '/dashboard/profile' + '?q=' + true
          firstReplace = msgString
            .replace('<url:profile', `<a href=${locationName}`)
            .replace('</url:profile', '</a')
        } else if (msgString.includes('<url:ads-')) {
          const pref = msgString.replace('<url:ads-', '').replace('>', '#')
          const ref = pref.substring(0, pref.indexOf('#'))
          const locationName = window.location.origin + `/ads/-${ref}`
          firstReplace = msgString.replace(
            `<url:ads-${ref}`,
            `<a href=${locationName}`
          )
        } else if (msgString.includes('<url:chat_profile:')) {
          const getIdFromLink = getUserIdFromMessageText(msgString)
          if (msgString.indexOf('name:') > 0) {
            const getNameFromLink = getNameFromMsgUrl(msgString)
            firstReplace = msgString.replace(
              `<url:chat_profile:${getIdFromLink},name:${getNameFromLink}>`,
              `<a metaUserId="${getIdFromLink}">${getNameFromLink.replace(
                /%20/g,
                ' '
              )}`
            )
          } else {
            firstReplace = msgString.replace(
              `<url:chat_profile:${getIdFromLink}>`,
              `<a metaUserId="${getIdFromLink}">the Tenant`
            )
          }
        } else if (msgString.includes('<url:key_collection:')) {
          const getRefLink = getRefLinkFromMessageText(msgString)
          const locPropRef = window.location.origin + '/post/homerunner/'
          firstReplace = msgString
            .replace(
              `<url:key_collection:${getRefLink}>`,
              `<a href=${locPropRef + getRefLink}>`
            )
            .replace('</url:key_collection', '</a')
        } else if (msgString.includes('<url:map')) {
          const locationMap = getMapLinkFromMessageText(msgString)
          firstReplace = msgString.replace('<url:map', `<a href=${locationMap}`)
        }
        msgString = firstReplace.replace('</url', '</a')
      } else {
        msgString = msgString.replace(
          /(<color:red)|(<color:blue)|(<color:green)|(<color:grey)|(<color:yellow)|(<color:orange)|(<color:brown)|(<color:purple)/g,
          function (p1, p2, p3, p4, p5, p6, p7, p8) {
            if (p1) return '<color:red style="color:red"'
            if (p2) return '<color:blue style="color:#4885ed"'
            if (p3) return '<color:green style="color:#3cb371"'
            if (p4) return '<color:grey style="color:#555d50"'
            if (p5) return '<color:yellow style="color:#eee600"'
            if (p6) return '<color:orange style="color:#ffa812"'
            if (p7) return '<color:brown style="color:#8b4513"'
            if (p8) return '<color:purple style="color:#bf94e4"'
          }
        )
      }
      let message = ReactHtmlParser(
        msgString, // or whatever
        { transform: htmlParserTransform }
      )
      return returnLinkifyMsg(message)
    }

    if (
      userName === 'Alicia' &&
      isIncludesImgUrl(msg).hasImgUrl &&
      isIncludesImgUrl(msg).imgUrlArr &&
      isIncludesImgUrl(msg).imgUrlArr.length > 0
    ) {
      let message = ReactHtmlParser(
        msg, // or whatever
        { transform: htmlParserTransform }
      )
      return (
        <>
          {returnLinkifyMsg(message)}
          <br></br>
          {renderMessageImg(isIncludesImgUrl(msg).imgUrlArr[0])}
        </>
      )
    }
    if (userName === 'Alicia' && msg && /\r|\n/.exec(msg)) {
      const splitArr = msg.split('\n')
      if (splitArr && splitArr.length > 0) {
        let newTextWithLineBreak = ''
        let youtubeUrl = ''
        splitArr.map(words => {
          newTextWithLineBreak = newTextWithLineBreak + `${words} \n`
          if (YOUTUBE_REGEX_CHECK.exec(words)) {
            if (getYoutubeLinkFromString(words)) {
              youtubeUrl = getEmbededUrl(getYoutubeLinkFromString(words)[0])
            }
          }
        })
        if (newTextWithLineBreak && youtubeUrl) {
          return renderYoutubeUrl(newTextWithLineBreak, youtubeUrl)
        }
      }
    }
    if (userName === 'Alicia' && msg && YOUTUBE_REGEX_CHECK.exec(msg)) {
      if (getYoutubeLinkFromString(msg)) {
        const embededUrl = getEmbededUrl(getYoutubeLinkFromString(msg)[0])
        return renderYoutubeUrl(msg, embededUrl)
      }
    }

    let finalMsg = ReactHtmlParser(msg)
    return returnLinkifyMsg(finalMsg)
  }

  const returnLinkifyMsg = msg => {
    return (
      <Linkify options={{ attributes: linkProps, nl2br: true }}>{msg}</Linkify>
    )
  }

  const getRepliedNameText = message => {
    const quotedMessage = message.quotedMessage
    const currentUser = props.sessionUser
    const currentMessageSender = message.sender

    let repliedNameText = ''
    if (currentUser.id === currentMessageSender.id) {
      repliedNameText += 'You'
    } else {
      repliedNameText += currentMessageSender.name
    }

    repliedNameText += ' replied'

    if (quotedMessage.sender.id !== currentUser.id) {
      repliedNameText += ' to ' + quotedMessage.sender.name
    }

    repliedNameText = message.private
      ? repliedNameText + ' (Private) '
      : repliedNameText

    return repliedNameText
  }

  const isMessageHtml = text => {
    if (/<\/?[^>]*>/.test(text)) {
      return true
    } else if (text.includes('@')) {
      return true
    }
    return false
  }

  const openAppDownloadModal = () => {
    setShowAppDownloadModal(true)
  }
  const GetMessage = ({ message, prev, classUnread }) => {
    const [optionsVisible, setOptionsVisible] = useState(false)

    const senderId = message.sender.id
    const type = message.type
    const isPrivate = message.private

    const bubbleClass =
      type === 'SYSTEM_MESSAGE'
        ? styles['system']
        : senderId === sessionUser.id
        ? styles['me']
        : styles['you']
    let url = null
    if (message.custom.length > 0) {
      const imageUrlFiltered = message.custom.filter(x => x.key === 'IMAGE_URL')
      if (imageUrlFiltered.length > 0) {
        url = imageUrlFiltered[0].value
      }
    }
    const isHtml = isMessageHtml(message.text)

    let userMsg = message.text

    let backgroundColor = 'none'
    if (
      props.isPrivateChatPossible &&
      isPrivate &&
      bubbleClass === styles['you']
    )
      backgroundColor = '#EFEFEF'
    else if (
      props.isPrivateChatPossible &&
      isPrivate &&
      bubbleClass === styles['me']
    )
      backgroundColor = '#606060'
    else if (bubbleClass === styles['you']) backgroundColor = '#EFEFEF'
    else if (bubbleClass === styles['me']) backgroundColor = '#606060'

    const showName =
      (!prev ||
        message.dateCreated - prev.dateCreated > 60000 ||
        prev.private !== message.private) &&
      !message.quotedMessage

    return (
      <>
        <div
          key={message.id}
          className={`${styles['bubble']} ${bubbleClass} ${classUnread}`}
          style={{ marginBottom: '2.7rem' }}
        >
          {bubbleClass === styles['you'] && message.sender.name === 'Alicia' ? (
            <img
              className={styles['conversation__list--item--image']}
              style={{
                position: 'absolute',
                left: '-56px',
                top: '-7px'
              }}
              src={'/img/alicia_icon.png'}
              onClick={() => {
                selectedUser({ ...message, specificUserFromMessageLink: false })
              }}
            />
          ) : null}

          {bubbleClass === styles['you'] && message.sender.name !== 'Alicia' ? (
            <Avatar
              className={styles['conversation__list--item--image']}
              style={{
                position: 'absolute',
                left: '-56px',
                top: '-7px'
              }}
              name={
                message.sender.name ? message.sender.name.substring(0, 2) : ''
              }
              onClick={() =>
                selectedUser({ ...message, specificUserFromMessageLink: false })
              }
            />
          ) : null}
          {type !== 'SYSTEM_MESSAGE' && message.quotedMessage ? (
            <div className={styles['replied']}>
              {getRepliedNameText(message)}
            </div>
          ) : null}
          {type !== 'SYSTEM_MESSAGE' ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginLeft:
                  bubbleClass === styles['you'] && !isMobile ? '20px' : '-15px',
                flexDirection:
                  bubbleClass === styles['you'] ? 'row' : 'row-reverse'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor,
                  borderRadius: '10px',
                  alignItems:
                    bubbleClass === styles['me'] ? 'flex-end' : 'flex-start'
                }}
              >
                {type !== 'SYSTEM_MESSAGE' && message.quotedMessage ? (
                  <>
                    <div className={styles['reply-message']}>
                      {returnMessageText(
                        message.quotedMessage.sender.name,
                        message.quotedMessage.text,
                        isMessageHtml(message.quotedMessage.text)
                      )}
                    </div>
                  </>
                ) : null}
                <div
                  className={styles['bubble']}
                  style={{
                    padding:
                      message.mediaType === 'IMAGE' ||
                      message.mediaType === 'VEDIO' ||
                      message.type === 'SYSTEM_MESSAGE'
                        ? '0'
                        : '5px 14px',
                    boxShadow:
                      message.mediaType === 'IMAGE' ||
                      message.mediaType === 'VEDIO'
                        ? '0 2px 2px #1a1a1a'
                        : 'none',
                    backgroundColor,
                    color: bubbleClass === styles['me'] ? '#ffffff' : '#000000',
                    // wordBreak: 'break-word',
                    border: 'none',
                    borderTopRightRadius:
                      type !== 'SYSTEM_MESSAGE' && message.quotedMessage
                        ? '0px'
                        : '10px',
                    borderTopLeftRadius:
                      type !== 'SYSTEM_MESSAGE' && message.quotedMessage
                        ? '0px'
                        : '10px'
                  }}
                >
                  {message.mediaType === 'IMAGE' ? (
                    renderMessageImg(url)
                  ) : (
                    <>
                      {returnMessageText(message.sender.name, userMsg, isHtml)}
                    </>
                  )}
                  {message.mediaType === 'VIDEO'
                    ? renderMessageVideo(message)
                    : null}
                  {type !== 'SYSTEM_MESSAGE' ? (
                    <div
                      className={`${bubbleClass} ${styles['info']}`}
                      style={{
                        bottom: '-1.3rem',
                        position: 'initial',
                        justifyContent:
                          bubbleClass === styles['you']
                            ? 'flex-start'
                            : 'flex-end'
                      }}
                    >
                      <span
                        style={{
                          whiteSpace: 'nowrap',
                          color:
                            bubbleClass === styles['me']
                              ? '#ffffff'
                              : '#000000',
                          fontWeight: '400',
                          lineHeight: 1.5
                        }}
                      >
                        {dayjs(message.dateCreated).format('LT')}
                      </span>
                      {bubbleClass === styles['you'] &&
                      message.sender.name !== 'Alicia' &&
                      type !== 'SYSTEM_MESSAGE' &&
                      !message.sender.email.includes('homerunner') ? (
                        <span
                          style={{
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <a
                            href={isMobile ? app_download : null}
                            onClick={
                              isMobile ? null : () => openAppDownloadModal()
                            }
                            target='_blank'
                            style={{
                              textDecoration: 'underline',
                              color: '#2C76EC',
                              fontWeight: '400',
                              lineHeight: 1.5
                            }}
                          >
                            Sent via Mobile App
                          </a>
                        </span>
                      ) : null}

                      {bubbleClass === styles['me'] ? (
                        <span>
                          <DoneAll
                            style={{
                              height: isMobile ? '.8rem' : '1.2rem',
                              width: isMobile ? '.8rem' : '1.2rem',
                              color: '#ffffff'
                            }}
                          />
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <IconButton
                  aria-label='reply'
                  size='small'
                  color='#606060'
                  onClick={() =>
                    setReplyProps({
                      ...message,
                      htmlText: returnMessageText(
                        message.sender.name,
                        userMsg,
                        isHtml
                      )
                    })
                  }
                >
                  <ReplyIcon />
                </IconButton>

                {/* <IconButton
                aria-label='options'
                size='small'
                onClick={() => setOptionsVisible(true)}
                style={{ outline: 'none' }}
              >
                <MoreHorizIcon color='action' />
                {optionsVisible ? (
                  <OutsideClickHandler
                    onOutsideClick={() => setOptionsVisible(false)}
                  >
                    <div className="tooltip">
                      <Button size='small' style={{ width: '100%' }}>
                        Delete
                      </Button>
                      <Button size='small' style={{ width: '100%' }}>
                        Reply Privately
                      </Button>
                    </div>
                  </OutsideClickHandler>
                ) : null}
              </IconButton> */}
              </div>
            </div>
          ) : (
            <p>{returnMessageText(message.sender.name, userMsg, isHtml)}</p>
          )}
          {/* {type !== 'SYSTEM_MESSAGE' ? (
            <div
              className={`${bubbleClass} ${styles['info']}`}
              style={{
                bottom: '-1.3rem'
              }}
            >
              <span style={{ whiteSpace: 'nowrap' }}>
                {dayjs(message.dateCreated).format('LT')}
              </span>
              {bubbleClass === styles['me'] ? (
                <span>
                  <DoneAll
                    style={{
                      height: '.8rem',
                      width: '.8rem'
                    }}
                  />
                </span>
              ) : null}
            </div>
          ) : null} */}
          {bubbleClass === styles['you'] &&
          type !== 'SYSTEM_MESSAGE' &&
          showName ? (
            <div
              className={`${bubbleClass} ${styles['info']}`}
              style={{
                top: isMobile ? '-1.3rem' : '-1.85rem',
                marginLeft:
                  bubbleClass === styles['you'] && !isMobile ? '20px' : '-15px'
              }}
            >
              <span
                style={{
                  whiteSpace: 'nowrap',
                  color: '#000'
                }}
              >
                {message.sender.name}
                {message.private && (
                  <span style={{ color: '#000000' }}>
                    &nbsp;to you (Private):
                  </span>
                )}
              </span>
            </div>
          ) : null}

          {bubbleClass === styles['me'] &&
          type !== 'SYSTEM_MESSAGE' &&
          showName ? (
            <div
              className={`${bubbleClass} ${styles['info']}`}
              style={{
                top: isMobile ? '-1.3rem' : '-1.85rem'
              }}
            >
              <span
                style={{
                  color: '#000000',
                  whiteSpace: 'nowrap'
                }}
              >
                {isPrivate ? 'To Alicia (Private)' : 'To everyone'}
              </span>
            </div>
          ) : null}
        </div>
      </>
    )
  }

  const OnUnreadButtonClick = () => {
    const bannerDiv = document.getElementById('default-banner-div')
    const chat = document.getElementById('chatContainerId')
    const getClass = document.getElementsByClassName('unread-msg-convoMesgLit')
    let scrollHeight = 0
    for (let x = 0; x < getClass.length; x++) {
      scrollHeight += getClass[x].offsetHeight
    }
    chat.scrollTop =
      chat.scrollHeight - (scrollHeight + bannerDiv.offsetHeight + 280)
    let activeChat = props.activeChat
    activeChat.unReadMsgCount = 0
    props.setActiveChat(activeChat)
    setUnreadCount(0)
  }

  const isUnreadButton = () => {
    if (unreadMsgCount > 0) {
      const chat = document.getElementById('chatContainerId')
      const bannerDiv = document.getElementById('default-banner-div')
      const getClass = document.getElementsByClassName(
        'unread-msg-convoMesgLit'
      )
      let scrollHeight = 0
      if (chat && getClass && bannerDiv) {
        for (let x = 0; x < getClass.length; x++) {
          scrollHeight += getClass[x].offsetHeight
        }
        if (chat.offsetHeight < scrollHeight + bannerDiv.offsetHeight + 260) {
          return (
            <Button
              className={styles['unread-msg-button']}
              onClick={() => OnUnreadButtonClick()}
            >
              <ExpandLessRounded />
              {unreadMsgCount} unread messages
            </Button>
          )
        }
      }
    }
    return ''
  }

  const getMessages = useMemo(() => {
    let groupedMsg = []
    let i = 0,
      classUnread = '',
      j = 0
    for (const key in convoMesgLit) {
      i++
      groupedMsg.push(
        <div key={key + i} className={i + classUnread}>
          <div className={styles['conversation-start']}>
            <span>{dayjs(key).format('ll')}</span>
          </div>
          {convoMesgLit[key]
            .sort((d1, d2) => d1.dateCreated - d2.dateCreated)
            .map((message, ind, arr) => {
              if (j === 0 && message.unread) {
                j = i + 1
                classUnread = styles['unread-msg-convoMesgLit']
              }
              return (
                <GetMessage
                  classUnread={i < j ? classUnread : ''}
                  key={message.id}
                  message={message}
                  prev={ind === 0 ? null : arr[ind - 1]}
                />
              )
            })}
        </div>
      )
    }
    groupedMsg.push(
      <div
        id={'default-banner-div'}
        className={
          props.bannerText ? styles['banner-div'] : styles['banner-less-div']
        }
      />
    )
    return groupedMsg
  }, [convoMesgLit])
  return (
    <>
      {isUnreadButton()}
      {getMessages}
      {showAppDownloadModal ? (
        <PromoteAppDownloadModal
          show={showAppDownloadModal}
          onClose={() => {
            setShowAppDownloadModal(false)
          }}
        />
      ) : null}
    </>
  )
}

export default Messages
