import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

import Avatar from 'react-avatar'

import Button from '@material-ui/core/Button'
import ReactHtmlParser from 'react-html-parser'
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import OutsideClickHandler from 'react-outside-click-handler'
import React, { useState } from 'react'
import DeleteChatModal from './DeleteChatModal'

import { CONVERSATION_ARCHIVE } from '../../../api/socketIo/socket-events'
import {
  getUserIdFromMessageText,
  getNameFromMsgUrl
} from '../../../globalutilities/helpers'

const ChatListItem = props => {
  const {
    styles,
    chat,
    activeChat,
    setActiveChat,
    getLeftChatImageUrl,
    socket,
    isSupport,
    setPinnedChatId
  } = props
  const [optionsVisible, setOptionsVisible] = useState(false)
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)

  const getHtmlMsg = msg => {
    let isHtml = false
    if (/<\/?[^>]*>/.test(msg)) {
      isHtml = true
    }

    if (isHtml) {
      let msgString = msg
      if (msgString.includes('<url')) {
        let firstReplace = ''
        if (msgString.includes('<url:chat_profile:')) {
          const getIdFromLink = getUserIdFromMessageText(msgString)
          if (msgString.indexOf('name:') > 0) {
            firstReplace = msgString.replace(
              `<url:chat_profile:${getIdFromLink},name:${getNameFromMsgUrl(
                msgString
              )}>`,
              `<a metaUserId="${getIdFromLink}">${getNameFromMsgUrl(
                msgString
              ).replace('%20', ' ')}`
            )
          } else {
            firstReplace = msgString.replace(
              `<url:chat_profile:${getIdFromLink}>`,
              `<a metaUserId="${getIdFromLink}">the Tenant`
            )
          }
        } else if (msgString.includes('<url:post')) {
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
        }

        const finalReplace = firstReplace.replace('</url', '</a')
        msgString = finalReplace
      } else {
        msgString = msgString.replace(
          /(<color:red)|(<color:blue)|(<color:green)|(<color:grey)|(<color:yellow)|(<color:orange)|(<color:brown)|(<color:purple)/g,
          function (str, p1, p2, p3, p4, p5, p6, p7, p8) {
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

      return ReactHtmlParser(msgString)
    } else {
      return <>{msg ? msg.substring(0, 35) : ''}</>
    }
  }

  const archiveConversation = () => {
    if (chat && chat.id) {
      socket.emit(CONVERSATION_ARCHIVE, chat.id, () => {
        props.sendArchievedId(chat.id)
      })
    }
  }
  const pinConversation = () => {
    socket.emit(
      chat.pinned ? 'CONVERSATION_UNPIN' : 'CONVERSATION_PIN',
      chat.id
    )
    setOptionsVisible(false)
    setPinnedChatId(chat.id)
  }

  const isValidImageSrc =
    chat.lastMessage && chat.lastMessage.text.length > 0
      ? null
      : getLeftChatImageUrl(chat.lastMessage)
  return (
    <div
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
    >
      <li
        key={chat.id}
        className={
          activeChat && activeChat.id === chat.id
            ? `${styles['conversation__list--item']} ${styles['active--item']}`
            : styles['conversation__list--item']
        }
        onClick={() => setActiveChat(chat)}
      >
        <Avatar
          className={styles['conversation__list--item--image']}
          name={chat.subject ? chat.subject.substring(0, 2) : ''}
        />
        <div className={styles['conversation__list--item--conversation-info']}>
          <span
            className={`${styles['username']} ${chat.unReadMsgCount > 0 &&
              styles['username--unread']}`}
          >
            {chat.subject ? chat.subject.substring(0, 32) : ''}
            {chat.subject && chat.subject.length > 32 && '...'}
          </span>
          {chat.lastMessage && chat.lastMessage.text.length > 0 ? (
            <span
              className={`${styles['latest-message']} ${chat.unReadMsgCount >
                0 && styles['latest-message--unread']}`}
            >
              {getHtmlMsg(chat.lastMessage.text.substring(0, 30))}
            </span>
          ) : isValidImageSrc ? (
            <img
              loading='lazy'
              className={styles['conversation__list--item--img']}
              src={isValidImageSrc}
            />
          ) : null}
        </div>
        <div
          className={`${
            styles['conversation__list--item--conversation-time']
          } ${chat.unReadMsgCount > 0 &&
            styles['conversation__list--item--conversation-time--unread']}`}
        >
          <span>
            {chat.lastMessage && chat.lastMessage.dateCreated
              ? dayjs(chat.lastMessage.dateCreated).format('ll')
              : dayjs(chat.dateCreated).format('ll')}
          </span>
          {chat.unReadMsgCount > 0 ? (
            <span className={styles['count']}>{chat.unReadMsgCount}</span>
          ) : null}
          <div>
            {chat.pinned && (
              <img
                style={{ width: '1em', marginRight: '5px', color: '#606060' }}
                src={'/img/icons/pinned.svg'}
              />
            )}
            {!isSupport && (
              <IconButton
                aria-label='options'
                size='small'
                onClick={e => {
                  setOptionsVisible(true)
                  e.stopPropagation()
                }}
                data-testId='chat__list-item__menu'
                style={{ outline: 'none' }}
              >
                <MoreHorizIcon style={{ color: '#606060' }} />
                {optionsVisible ? (
                  <OutsideClickHandler
                    onOutsideClick={() => setOptionsVisible(false)}
                  >
                    <div className={styles['tooltip']}>
                      <Button
                        size='small'
                        style={{ width: '100%' }}
                        onClick={e => {
                          e.stopPropagation()
                          setDeleteConfirmationModal(true)
                        }}
                        data-testId='chat__list-item__delete'
                      >
                        Delete
                      </Button>
                      <Button
                        size='small'
                        style={{ width: '100%' }}
                        onClick={e => {
                          e.stopPropagation()
                          pinConversation()
                        }}
                      >
                        {chat.pinned ? 'UNPIN' : 'PIN'}
                      </Button>
                    </div>
                  </OutsideClickHandler>
                ) : null}
              </IconButton>
            )}
          </div>
        </div>
      </li>
      <DeleteChatModal
        styles={styles}
        displayStatus={deleteConfirmationModal}
        setDeleteConfirmationModal={setDeleteConfirmationModal}
        archiveConversation={archiveConversation}
      />
    </div>
  )
}

export default ChatListItem
