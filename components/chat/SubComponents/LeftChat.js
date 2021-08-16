import React, { useEffect, useMemo, memo } from 'react'
import withSizes from 'react-sizes'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import { ClipLoader } from 'react-spinners'
import { reduce, set, concat, map, uniqBy } from 'lodash/fp'
import { Search, CloseRounded } from '@material-ui/icons'

import * as chatActions from '../../../actions/chatAction'

import ChatListItem from './ChatListItem'

const ConnectedLeftChat = props => {
  const {
    styles,
    setActiveChat,
    activeChat,

    updateArchiveState,
    //after update
    isLoading,
    conversationList,
    searchText,
    searchValue,
    setConversationListMethod,
    setShouldArchiveMethod,
    handleLeftChatScroll,
    searchTextChangeInput,
    onTextKeyPress,
    resetSearch,
    getLeftChatImageUrl,
    submitSearchFilter,
    connectSocket
  } = props

  const socket = connectSocket

  useEffect(() => {
    socket.on('CONVERSATION_PIN', res => {
      if (!(res && res.data && res.data.success)) return
      let convId = res.data.id
      let newConvList = map(conv => {
        if (conv.id === convId) return set('pinned', true, conv)
        return conv
      }, conversationList)
      setConversationListMethod(newConvList)
    })
    socket.on('CONVERSATION_UNPIN', res => {
      if (!(res && res.data && res.data.success)) return
      let convId = res.data.id
      setConversationListMethod(
        map(conv => {
          if (conv.id === convId) return set('pinned', false, conv)
          return conv
        }, conversationList)
      )
    })
  }, [conversationList])

  useEffect(() => {
    if (props.activeChat) {
      if (props.conversationList) {
        let cloneList = JSON.parse(JSON.stringify(props.conversationList))
        const objIndex = props.conversationList.findIndex(
          obj => obj.id === props.activeChat.id
        )
        if (objIndex >= 0) {
          props.chatActions.chatUnreadForceRemove(
            cloneList[objIndex].unReadMsgCount
          )
          cloneList[objIndex].unReadMsgCount = 0
          setConversationListMethod(cloneList)
        }
      }
    }
  }, [props.activeChat])

  useEffect(() => {
    if (props.hasNewMessage && props.conversationList) {
      let copyConversationList = [...props.conversationList]
      let msgToUpdate = props.hasNewMessage

      if (msgToUpdate.id === props.activeChat.id) {
        msgToUpdate.unReadMsgCount = 0
      }

      addOrReplace(copyConversationList, msgToUpdate)
      const sortedList = copyConversationList
        .slice()
        .sort((a, b) => b.dateUpdated - a.dateUpdated)
      setConversationListMethod(sortedList)
    }
  }, [props.hasNewMessage])

  useEffect(() => {
    props.chatActions.getChatUnreadMsg()
  }, [props.hasNewMessage])

  useEffect(() => {
    if (props.shouldArchive) {
      if (props.archivedId) {
        //remove hero1
        const updatedConversationList = conversationList.filter(
          item => item.id !== props.archivedId
        )
        setConversationListMethod(
          updatedConversationList ? updatedConversationList : null
        )
        setShouldArchiveMethod(false)
        updateArchiveState()
      }
    }
  }, [props.shouldArchive])

  function addOrReplace (array, item) {
    // (1)
    const i = array.findIndex(_item => _item.id === item.id)
    if (i > -1) array[i] = item
    // (2)
    else array.push(item)
  }

  const groupedConversationList = useMemo(
    () =>
      reduce(
        (acc, conv) => {
          let now = acc
          const support =
            conv.members.find(e => e.id == '1') ||
            conv.custom.find(
              val =>
                val.value === 'SPEEDMANAGE_SUPPORT' ||
                val.value === 'SPEEDHOME_SUPPORT'
            )
          if (conv.pinned && !support)
            now = set('pinned', concat(now.pinned, conv), now)
          if (support)
            now = set(
              'support',
              concat(now.support, { ...conv, pinned: false }),
              now
            )
          if (!conv.pinned && !support)
            now = set('others', concat(now.others, conv), now)
          return now
        },
        { pinned: [], support: [], others: [] },
        uniqBy('id', conversationList)
      ),
    [conversationList]
  )
  return (
    <div className='left'>
      <div className={styles['top']}>
        <div className={styles['search-Container']}>
          <input
            className={`form-control ${styles['search-input']}`}
            value={searchText}
            placeholder='Search conversation'
            onChange={searchTextChangeInput}
            onKeyPress={onTextKeyPress}
          />
          {searchValue ? (
            <CloseRounded
              className={styles['search-Btn']}
              style={{
                color: '#ff0055'
              }}
              onClick={resetSearch}
            />
          ) : (
            <Search
              disabled={!searchText}
              className={styles['search-Btn']}
              style={{ color: searchText ? '#000' : '#e6e6e6' }}
              onClick={submitSearchFilter}
            />
          )}
        </div>
      </div>
      <div
        className={styles['conversation__list--container']}
        onScroll={handleLeftChatScroll}
      >
        <ul className={styles['conversation__list']}>
          {isLoading ? (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <ClipLoader color='#4885ed' />
            </div>
          ) : (
            <>
              {conversationList && conversationList.length > 0 ? (
                <>
                  {groupedConversationList.support.length > 0 ? (
                    <div className={styles['support']}>
                      <h2>Support</h2>
                      {groupedConversationList.support.map(chat => (
                        <ChatListItem
                          styles={styles}
                          key={chat.id}
                          chat={chat}
                          socket={socket}
                          isSupport={true}
                          activeChat={activeChat}
                          setActiveChat={setActiveChat}
                          getLeftChatImageUrl={getLeftChatImageUrl}
                          sendArchievedId={props.sendArchievedId}
                          setPinnedChatId={props.setPinnedChatId}
                        />
                      ))}
                      <div
                        className={styles['conversatation__border-bottom']}
                      />
                    </div>
                  ) : null}

                  {groupedConversationList.pinned.length > 0 ? (
                    <div className={styles['pinned']}>
                      <h2>Pinned</h2>
                      {groupedConversationList.pinned.map(chat => (
                        <ChatListItem
                          styles={styles}
                          key={chat.id}
                          chat={chat}
                          socket={socket}
                          isSupport={false}
                          activeChat={activeChat}
                          setActiveChat={setActiveChat}
                          getLeftChatImageUrl={getLeftChatImageUrl}
                          sendArchievedId={props.sendArchievedId}
                          setPinnedChatId={props.setPinnedChatId}
                        />
                      ))}
                      <div
                        className={styles['conversatation__border-bottom']}
                      />
                    </div>
                  ) : null}

                  {groupedConversationList.others ? (
                    <div className='others'>
                      {groupedConversationList.others.map(chat => (
                        <ChatListItem
                          styles={styles}
                          key={chat.id}
                          chat={chat}
                          socket={socket}
                          isSupport={false}
                          activeChat={activeChat}
                          setActiveChat={setActiveChat}
                          getLeftChatImageUrl={getLeftChatImageUrl}
                          sendArchievedId={props.sendArchievedId}
                          setPinnedChatId={props.setPinnedChatId}
                        />
                      ))}
                    </div>
                  ) : null}
                </>
              ) : (
                <div
                  className={styles['conversation__list--item']}
                  style={{
                    height: '50vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  You don&lsquo;t have any conversation yet.
                </div>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    chatActions: bindActionCreators(chatActions, dispatch)
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 767
})

export default withSizes(mapSizesToProps)(
  withRouter(connect(null, mapDispatchToProps)(memo(ConnectedLeftChat)))
)
