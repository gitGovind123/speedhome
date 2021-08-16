import React, { useEffect, useState } from 'react'
import { CloseRounded, Send, Photo, VideoLibrary } from '@material-ui/icons'
import Select from 'react-select'
import { MentionsInput, Mention } from 'react-mentions'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import ReportProblemIcon from '@material-ui/icons/ReportProblem'
import { ClipLoader } from 'react-spinners'
import {
  getBackendChatConversationId,
  getUserId
} from '../../../globalutilities/helpers'
import { getPropertyInfo } from '../../../actions/chatAction'
import Button from '@material-ui/core/Button/Button'
import OutsideClickHandler from 'react-outside-click-handler'
import Swal from 'sweetalert2'

const WriteChat = props => {
  const {
    styles,
    onChangeMessageText,
    onTextAreaKeyPress,
    messageInput,
    onSendButtonPress,
    imageUrls,
    videoUrls,
    videoPreviewUrl,
    isUploadingVideo,
    removeVideoPreviewUrl,
    imgPreviewUrl,
    removePreviewUrl,
    users,
    videoStatus,
    sessionUser,
    selectChange,
    isPrivateChatPossible,
    replyProps,
    setReplyProps,
    urgentConversation,
    isSendVideo,
    isMobile
  } = props

  const [conversationId, setConversationId] = useState('')
  const [isLandlord, setIsLandlord] = useState(false)
  const [urgentChat, setUrgentChat] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isSupport, setSupport] = useState(false)

  const urgentOptions = isLandlord
    ? [
        'I want to fix an appointment to view the unit',
        'I want to proceed with renting this unit'
      ]
    : [
        'Tenant wants to set an appointment to view this unit',
        'Tenant wants to proceed with renting this unit'
      ]

  const taggableUsers = users
    .filter(user => user.id !== sessionUser.id)
    .map(user => ({ id: user.id, display: user.name.split(' ')[0] }))

  const options = ['Everyone', 'Alicia'].map(ele => ({
    label: ele,
    value: ele
  }))
  const callback = (status, response) => {
    if (status === 'success') {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: response.message || 'Your request has been received',
        text: 'We will assist you as soon as possible',
        showConfirmButton: true,
        allowOutsideClick: true
      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: response.message || 'Something went wrong!',
        text: 'Please try again',
        showConfirmButton: true,
        allowOutsideClick: true
      })
    }
    setLoading(false)
  }
  const handelUrgent = option => {
    setLoading(true)
    setUrgentChat(false)
    urgentConversation(conversationId, option, callback)
  }

  useEffect(() => {
    if (
      props.activeChat &&
      props.activeChat.members &&
      props.activeChat.members.length <= 2 &&
      props.activeChat.members.find(e => e.id == '1')
    ) {
      setSupport(true)
    } else {
      setSupport(false)
      getInitialProfileData()
    }
  }, [props.activeChat])

  const getInitialProfileData = () => {
    setConversationId('')
    setIsLandlord(false)
    if (props.activeChat) {
      const conversationId = getBackendChatConversationId(props.activeChat)
      if (conversationId) {
        setConversationId(conversationId)
        getPropertyInfo(conversationId).then(json => {
          const mainUserId = getUserId() || ''
          if (
            parseInt(mainUserId) ===
            parseInt(json.data && json.data.user && json.data.user.id)
          ) {
            setIsLandlord(true)
          }
        })
      }
    }
  }

  return (
    <div className={styles['write-container']}>
      {isPrivateChatPossible && (
        <div className={`${styles['to-container']} to-container`}>
          <span>To: &nbsp;&nbsp;</span>
          <Select
            options={options}
            defaultValue={options[0]}
            classNamePrefix='to-select'
            onChange={selectChange}
            isSearchable={false}
            menuPlacement='top'
          />
        </div>
      )}

      {replyProps && (
        <div className={styles['reply-container']}>
          <div>
            <div>
              Replying to{' '}
              <span className={styles['bold']}>
                {replyProps && replyProps.sender && replyProps.sender.name}
              </span>
            </div>
            <div className={styles['reply-text']}>
              {replyProps && replyProps.htmlText}
            </div>
          </div>
          <div>
            <IconButton
              aria-label='close reply'
              size='small'
              onClick={() => setReplyProps(null)}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      )}

      {imgPreviewUrl ? (
        <div className={styles['preview-view']}>
          <CloseRounded
            onClick={removePreviewUrl}
            className={styles['closeBtn']}
          />
          <img loading='lazy' src={imgPreviewUrl} />
        </div>
      ) : null}
      {videoPreviewUrl && !isSendVideo ? (
        <div className={styles['preview-view']}>
          <div className={styles['preview-video']}>
            <CloseRounded
              onClick={removeVideoPreviewUrl}
              className={styles['closeBtn_video']}
            />
            {isUploadingVideo ? (
              <ClipLoader
                color='#4885ed'
                className={styles['video_Upload_load']}
              />
            ) : null}
          </div>
          <video controls>
            <source loading='lazy' src={videoPreviewUrl} type='video/mp4' />
          </video>
        </div>
      ) : null}

      {(videoPreviewUrl && videoStatus === 'SUBMITTED') ||
      videoStatus === 'PROGRESSING' ? (
        <div className={styles['preview-view']}>
          <label className={styles['video-chat-status']}>
            We are processing the video...
          </label>
        </div>
      ) : null}
      {videoStatus === 'ERROR' || videoStatus === 'CANCELED' ? (
        <div className={styles['preview-view']}>
          <label
            className={styles['video-chat-status']}
            style={{ color: 'red' }}
          >
            {' '}
            Error processing video{' '}
          </label>
        </div>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className={styles['avatar-list']}>
          {!isSupport && (
            <div className={styles['avatar-edit']}>
              {isLoading ? (
                <div className={styles['loader-urgent']}>
                  <ClipLoader size={25} color='#4885ed' />
                </div>
              ) : (
                <>
                  <ReportProblemIcon
                    color={'#606060'}
                    onClick={() => setUrgentChat(true)}
                  />
                  {urgentChat ? (
                    <OutsideClickHandler
                      onOutsideClick={() => setUrgentChat(false)}
                    >
                      <div
                        className={`${styles['tooltip-urgent']} tooltip-urgent`}
                      >
                        {urgentOptions.map((option, index) => {
                          return (
                            <Button
                              key={`menu-urgent-options-${index}`}
                              size='small'
                              style={{
                                width: index === 0 ? 'max-content' : '100%',
                                justifyContent: 'left'
                              }}
                              onClick={() => handelUrgent(option)}
                            >
                              {option}
                            </Button>
                          )
                        })}
                      </div>
                    </OutsideClickHandler>
                  ) : null}
                </>
              )}
            </div>
          )}
          {!imgPreviewUrl ? (
            <div className={styles['avatar-edit']}>
              <input
                onChange={imageUrls}
                type='file'
                id='imageUpload'
                accept='.png, .jpg, .jpeg'
              />
              <label htmlFor='imageUpload'>
                <Photo />
              </label>
            </div>
          ) : null}
          {!videoPreviewUrl ? (
            <div className={styles['avatar-edit']}>
              <input
                onChange={videoUrls}
                type='file'
                id='videoUpload'
                accept='.3gp, .mp4, .avi'
              />
              <label htmlFor='videoUpload'>
                <VideoLibrary />
              </label>
            </div>
          ) : null}
        </div>
        <div className={styles['input-container']}>
          <div className={styles['mentionContainer']}>
            <MentionsInput
              value={messageInput}
              onChange={onChangeMessageText}
              allowSuggestionsAboveCursor
              onKeyPress={onTextAreaKeyPress}
              className={styles['mention']}
              allowSpaceInQuery
              style={{
                control: { padding: isMobile ? '10px' : '14px' },
                input: {
                  backgroundImage: !messageInput
                    ? 'url(../../../img/placeholder-chat.webp)'
                    : 'none'
                }
              }}
            >
              <Mention
                trigger='@'
                data={taggableUsers}
                markup='@__display__'
                // markup='@<a href="https://link (user:__id__)" target="_blank">__display__</a>'
                renderSuggestion={(suggestion, search, highlightedDisplay) => (
                  <div className={styles['user']}>{highlightedDisplay}</div>
                )}
                displayTransform={username => `@${username}`}
                appendSpaceOnAdd
              />
            </MentionsInput>
          </div>
          <div className={styles['sendBtnContainer']}>
            <Send
              className={styles['sendMessageBtn']}
              onClick={onSendButtonPress}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WriteChat
