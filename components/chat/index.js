import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'

import LeftChat from './SubComponents/LeftChat'
import RightChat from './SubComponents/RightChatHook'
import Profile from './SubComponents/Profile'
import ChatHelpSlider from './SubComponents/ChatHelpSlider'

import { disableFooter } from '../../actions/disableFooter'
import { removeDuplicateObjects } from '../Common/Helper'
import Loader from '../Common/Loader'

import {
  CONVERSATION_LIST,
  CONVERSATIONS_LIST_SINGLE,
  CONVERSATION
} from '../../api/socketIo/socket-events'

import styles from './chat.module.scss'

const ChatLanding = props => {
  const [socket, setSocket] = useState(null)
  const [sessionUser, setsessionUser] = useState('')

  const [activeChatId, setActiveChatId] = useState('')
  const [activeChat, setActiveChatState] = useState(null)
  const [archivedId, setArchiveId] = useState('')
  const [shouldArchive, setShouldArchive] = useState(false)
  const [openMobileLeftChat, setopenMobileLeftChat] = useState(true)
  const [openMobileRightChat, setopenMobileRightChat] = useState(false)
  const [openProfileSideBarState, setopenProfileSideBarState] = useState(false)
  const [selectedUserInfo, setselectedUserInfo] = useState(null)

  // left chat state
  const [conversationList, setconversationList] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const [curPage, setcurPage] = useState(0)
  const [searchText, setsearchText] = useState('')
  const [searchValue, setsearchValue] = useState(false)
  const [isSomeoneTypingStatus, setisSomeoneTypingStatusState] = useState(false)
  const [isSomeoneTypingUserId, setisSomeoneTypingUserIdState] = useState('')
  const [NotificationPermisson, setNotificationPermisson] = useState(false)
  const [totalPages, settotalPages] = useState(0)

  const [hasNewMessage, sethasNewMessage] = useState(null)
  const [playstorePopUp, setPlaystorePopup] = useState(false)
  const [removeUnreadMessageChatId, setRemoveUnreadMessageChatId] = useState('')
  const [pinnedChat, setPinnedChat] = useState('')

  useEffect(() => {
    props.disableFooter(true)
    return () => {
      props.disableFooter(false)
    }
  }, [])

  useEffect(() => {
    setPlaystorePopup(props.isOpenPlaystorePopup)
  }, [props.isOpenPlaystorePopup])

  useEffect(() => {
    if (props.sessionUser) {
      setsessionUser(props.sessionUser)
    }
  }, [props.sessionUser])

  useEffect(() => {
    if (props.socket) {
      // single chat
      props.socket.on(CONVERSATIONS_LIST_SINGLE, data => {
        sethasNewMessage(data.data)
      })
    }
  }, [props.socket])

  useEffect(() => {
    if (props.user) {
      setSocket(props.socket)
      if (props.router.query && props.router.query.chatId && props.user) {
        setActiveChatId(props.router.query.chatId)
        props.socket.emit(CONVERSATION, props.router.query.chatId)
        props.socket.on(CONVERSATION, data => {
          if (data) {
            // const checkUseID = obj => {
            //   return obj.phone == props.user.phoneNumber
            // }

            // const existsChat = data.data.members.some(checkUseID)
            const existsChat = data?.data?.members?.length
            if (existsChat) {
              setActiveChatMethod(data.data)
            } else {
              const href = '/dashboard/chat'
              Router.push(href, href, { shallow: true })
            }
          }
        })
        fetchList(true, props.router.query.chatId)
      } else {
        fetchList()
      }
    }
  }, [props.user])
  const fetchList = (load = true, chatId = ' ') => {
    const subject = searchText.length > 0 ? searchText : '*'
    if (searchText.length > 0) {
    } else {
      if (load) {
        setisLoading(true)
      }
    }
    props.socket.emit(CONVERSATION_LIST, curPage, 20, subject)
    props.socket.on(CONVERSATION_LIST, list => {
      const data = list.data.content.content
      // setActiveChatMethod(data[0])
      if (searchText.length > 0) {
        if (data) {
          setconversationList(data)
          setisLoading(false)
          setsearchValue(true)
        } else {
          setisLoading(false)
          setsearchValue(true)
        }
      } else {
        if (data) {
          if (conversationList) {
            const concatConversation = [...conversationList, ...data]
            setconversationList(removeDuplicateObjects(concatConversation))
            setisLoading(false)
            setsearchValue(false)
          } else {
            setconversationList(data)
            setisLoading(false)
            setsearchValue(false)
          }
        }
      }
    })
  }
  const setConversationListMethod = list => {
    setconversationList(list)
  }
  const openProfileSideBarMethod = (selectedUser = null) => {
    setopenProfileSideBarState(true)
    setopenMobileLeftChat(false)
    setopenMobileRightChat(false)
    setselectedUserInfo(selectedUser ? selectedUser : null)
  }

  const closeProfileSideBar = () => {
    setopenProfileSideBarState(false)
    setopenMobileLeftChat(false)
    setopenMobileRightChat(true)
    setselectedUserInfo(null)
  }

  const setActiveChatMethod = chat => {
    setActiveChatState(chat)
    setopenMobileLeftChat(false)
    setopenMobileRightChat(true)
    setopenProfileSideBarState(false)
    setselectedUserInfo(null)

    const href = `/dashboard/chat?chatId=${chat.id}`
    Router.push(href, href, { shallow: true })
    // props.router.push(``)
  }
  const changeChatView = () => {
    setopenMobileLeftChat(true)
    setopenMobileRightChat(false)
    setopenProfileSideBarState(false)
  }

  const removeArchiveChat = id => {
    setArchiveId(id)
    setShouldArchive(true)
    setActiveChatState(null)
    if (conversationList && conversationList.length > 0) {
      const newChatList = conversationList.filter(c => c.id !== id)
      setconversationList(newChatList)
      let hasLang = false
      if (props.router.locale === 'my' || props.router.locale === 'zh') {
        hasLang = true
      }
      Router.push('/dashboard/chat')
    }
  }

  const updateArchiveState = () => {
    setArchiveId('')
    setShouldArchive(false)
  }
  const selectedUser = message => {
    if (message.specificUserFromMessageLink) {
      openProfileSideBarMethod(message)
    } else {
      openProfileSideBarMethod(message.sender)
    }
  }

  const handleLeftChatScroll = e => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
      setcurPage(curPage + 1)
      setTimeout(() => {
        if (!searchText) {
          fetchList(false)
        }
      }, 200)
    }
  }

  const searchTextChangeInput = e => {
    const text = e.target.value
    setsearchText(text)
  }

  const onTextKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      submitSearchFilter()
    }
  }
  const submitSearchFilter = () => {
    if (searchText) {
      setcurPage(0)
      setconversationList(null)
      fetchList()
    }
  }
  const resetSearch = () => {
    setcurPage(0)
    setsearchValue(false)
    setsearchText('')
    setconversationList(null)
    fetchList()
  }
  const getLeftChatImageUrl = message => {
    let imageUrl = null
    if (message && message.custom.length > 0) {
      const imageUrlFiltered = message.custom.filter(x => x.key === 'IMAGE_URL')
      if (imageUrlFiltered.length > 0) {
        imageUrl = imageUrlFiltered[0].value
      }
    }
    return imageUrl
  }
  const removeUnreadMessages = chat => {
    if (chat && chat.id) {
      setRemoveUnreadMessageChatId(chat.id)
    }
  }
  const setPinnedChatId = id => {
    setPinnedChat(id)
  }

  const mobileViewRightChatDisplay = openMobileRightChat
    ? styles['open-right-chat']
    : styles['close-right-chat']
  const mobileViewLeftChatDisplay = openMobileLeftChat
    ? styles['open-left-chat']
    : styles['close-left-chat']

  let marginCls = ''
  if (parseInt(playstorePopUp) === 0) {
    marginCls = 'extraMartingTop'
  }

  let isSupport = false
  if (activeChat) {
    isSupport = activeChat.members.find(e => e.id == '1')
  }

  return (
    <React.Fragment>
      {/* <BreadCrumb breadCrumb={CONST.dashboardMylisting}/> */}
      <div>
        <div className={`${styles['showConversation']} ${marginCls}`}>
          {socket ? (
            <div className={styles['chatrow']}>
              <div
                className={`${styles['left-container']} ${mobileViewLeftChatDisplay}`}
              >
                <LeftChat
                  styles={styles}
                  sessionUser={sessionUser}
                  activeChatId={activeChatId}
                  setActiveChat={setActiveChatMethod}
                  activeChat={activeChat}
                  archivedId={archivedId}
                  shouldArchive={shouldArchive}
                  updateArchiveState={updateArchiveState}
                  //after update
                  isLoading={isLoading}
                  conversationList={conversationList}
                  curPage={curPage}
                  searchText={searchText}
                  searchValue={searchValue}
                  isSomeoneTypingStatus={isSomeoneTypingStatus}
                  isSomeoneTypingUserId={isSomeoneTypingUserId}
                  NotificationPermisson={NotificationPermisson}
                  totalPages={totalPages}
                  setConversationListMethod={setConversationListMethod}
                  setShouldArchiveMethod={value => setShouldArchive(value)}
                  handleLeftChatScroll={handleLeftChatScroll}
                  searchTextChangeInput={searchTextChangeInput}
                  onTextKeyPress={onTextKeyPress}
                  resetSearch={resetSearch}
                  getLeftChatImageUrl={getLeftChatImageUrl}
                  submitSearchFilter={submitSearchFilter}
                  // /has new messages
                  hasNewMessage={hasNewMessage}
                  connectSocket={socket}
                  sendArchievedId={removeArchiveChat}
                  setPinnedChatId={setPinnedChatId}
                />
              </div>
              <div
                className={`${styles['right-container']} ${mobileViewRightChatDisplay}`}
              >
                {/* {this.state.activeChat ? ( */}
                <RightChat
                  styles={styles}
                  connectSocket={socket}
                  sessionUser={sessionUser}
                  activeChat={activeChat}
                  setActiveChat={setActiveChatMethod}
                  openProfileSideBar={openProfileSideBarMethod}
                  mobileViewChatChange={changeChatView}
                  sendArchievedId={removeArchiveChat}
                  selectedUser={selectedUser}
                  removeUnreadMessages={removeUnreadMessages}
                  closeProfileSideBar={closeProfileSideBar}
                  selectedUserInfo={selectedUserInfo}
                  openProfileSideBarState={openProfileSideBarState}
                  setConversationListMethod={setConversationListMethod}
                  isSupport={isSupport}
                  pinnedChat={pinnedChat}
                  hasNewMessage={hasNewMessage}
                />
                {/* ) : null} */}
              </div>
              {openProfileSideBarState ? (
                <div className={styles['right-profile']}>
                  <Profile
                    styles={styles}
                    sessionUser={sessionUser}
                    activeChat={activeChat}
                    closeProfileSideBar={closeProfileSideBar}
                    selectedUserInfo={selectedUserInfo}
                  />
                </div>
              ) : null}
              <ChatHelpSlider
                mobileRightChat={openMobileRightChat}
                profileSidebar={openProfileSideBarState}
                activeChat={activeChat}
                sessionUser={sessionUser}
              />
            </div>
          ) : (
            <div className='loading-overlay--post'>
              <Loader />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

function mapStateToProps ({ auth }) {
  return {
    isOpenPlaystorePopup: auth.isOpenPlaystorePopup,
    user: auth.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    disableFooter: val => dispatch(disableFooter(val))
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChatLanding)
)
