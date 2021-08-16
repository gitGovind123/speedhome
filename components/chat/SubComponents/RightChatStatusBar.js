import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { KeyboardArrowLeft } from '@material-ui/icons'
import Avatar from 'react-avatar'
import Button from '@material-ui/core/Button'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import ReportModal from './ReportModal'
import DeleteChatModal from './DeleteChatModal'

const RightChatStatusBar = props => {
  const {
    styles,
    state,
    mobileViewChatChange,
    openProfileDiv,
    openContactDropDown,
    closeContactDropDown,
    openSettingsDropDown,
    closeSettingsDropDown,
    aliciaId,
    isSupport,
    activeChat,
    reportConversation,
    socket,
    reportMsg,
    pinnedChat,
    archiveConversation,
    isMobile
  } = props

  const [show, setShow] = useState(false)
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)

  const getUserByUserId = (userList, userId) => {
    if (userId) {
      let user = userList.filter(obj => {
        return obj.id === userId
      })

      if (user.length > 0) {
        return user[0].name
      } else {
        return 'someone '
      }
    }
    return null
  }
  return (
    <>
      <ReportModal
        show={show}
        handleClose={() => setShow(false)}
        reportConversation={reportConversation}
        reportMsg={reportMsg}
      />
      <div className={styles['top']}>
        {!state.activeChat ? (
          <div className={styles['selectConversation']}>
            Select conversation in the left menu
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span
              className={styles['show-backBtn']}
              onClick={mobileViewChatChange}
            >
              <KeyboardArrowLeft />
            </span>
            <div className={styles['top-profile']}>
              <div
                className={styles['chat-property-heading']}
                onClick={openProfileDiv}
              >
                <Avatar
                  className={styles['conversation__list--item--image']}
                  style={{
                    marginRight: '.5rem'
                  }}
                  name={
                    state.activeChat.subject
                      ? state.activeChat.subject.substring(0, 2)
                      : ''
                  }
                />
                {/* <img loading="lazy" src='https://s3-us-west-2.amazonaws.com/files.geekgirlauthority.com/wp-content/uploads/2017/07/The-Batman-1-e1499286675298.jpg' /> */}
                <div className={styles['chat-property-text']}>
                  <span className={styles['name']}>
                    {state.activeChat.subject}
                  </span>
                  {!state.isSomeoneTypingStatus ? (
                    <span className={styles['member']}>
                      {state.activeChat.members.map((item, index) => {
                        return (
                          <slot key={index}>
                            {(index ? ', ' : '') + item.name}
                          </slot>
                        )
                      })}
                    </span>
                  ) : (
                    <span className={`${styles['member']} ${styles['typing']}`}>
                      {getUserByUserId(
                        state.activeChat.members,
                        state.isSomeoneTypingUserId
                      ) + ' is typing'}
                    </span>
                  )}
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                {state.activeChat &&
                state.appointMentData &&
                state.appointMentData.status ? (
                  <img
                    style={{
                      height: '20px',
                      width: '20px',
                      position: 'absolute',
                      right: '22px',
                      top: '7px'
                    }}
                    src={'/img/icons/ic_contact_us-24px.svg'}
                    onClick={openContactDropDown}
                  />
                ) : null}

                {state.openContact ? (
                  <OutsideClickHandler onOutsideClick={closeContactDropDown}>
                    <div className={styles['tooltip-down1']}>
                      <div style={{ fontSize: '15px', padding: '15px' }}>
                        <p>
                          {' '}
                          {state.appointMentData.contacts[0].name}:
                          {state.appointMentData.contacts[0].phone}
                        </p>
                        <p style={{ margin: '0 0 15px' }}>
                          {' '}
                          {state.appointMentData.contacts[1].name}:
                          {state.appointMentData.contacts[1].phone}
                        </p>
                      </div>
                    </div>
                  </OutsideClickHandler>
                ) : null}
                {/* <img
                className='conversation__list--item--image'
                
                src={AliciaIcon}
                onClick={() => selectedUser(message)}
              /> */}
                <MoreHorizIcon
                  onClick={openSettingsDropDown}
                  style={{ fontSize: isMobile ? '16px' : '28px' }}
                />
                {state.openSetting ? (
                  <OutsideClickHandler onOutsideClick={closeSettingsDropDown}>
                    <div className={styles['tooltip-down']}>
                      <Button
                        size='small'
                        style={{
                          width: '100%',
                          padding:
                            Boolean(aliciaId) && !isSupport ? '0px' : '5px 50px'
                        }}
                        onClick={e => {
                          e.stopPropagation()
                          openProfileDiv()
                          closeSettingsDropDown()
                        }}
                      >
                        View Profile
                      </Button>
                      {Boolean(aliciaId) && !isSupport && (
                        <Button
                          size='small'
                          style={{ width: '100%' }}
                          onClick={e => {
                            e.stopPropagation()
                            setDeleteConfirmationModal(true)
                            closeSettingsDropDown()
                          }}
                        >
                          Delete
                        </Button>
                      )}
                      {Boolean(aliciaId) && !isSupport && (
                        <Button
                          size='small'
                          style={{ width: '100%' }}
                          onClick={() => {
                            setShow(true)
                            closeSettingsDropDown()
                          }}
                        >
                          Report
                        </Button>
                      )}
                      {Boolean(aliciaId) && !isSupport && (
                        <Button
                          size='small'
                          style={{ width: '100%' }}
                          onClick={() => {
                            socket.emit(
                              activeChat.pinned
                                ? 'CONVERSATION_UNPIN'
                                : 'CONVERSATION_PIN',
                              activeChat.id
                            )
                            closeSettingsDropDown()
                          }}
                        >
                          {(pinnedChat && pinnedChat === activeChat.id) ||
                          activeChat.pinned
                            ? 'UNPIN CHAT'
                            : 'PIN CHAT'}
                        </Button>
                      )}
                    </div>
                  </OutsideClickHandler>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
      <DeleteChatModal
        styles={styles}
        displayStatus={deleteConfirmationModal}
        setDeleteConfirmationModal={setDeleteConfirmationModal}
        archiveConversation={archiveConversation}
      />
    </>
  )
}

export default RightChatStatusBar
