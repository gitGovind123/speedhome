import React, { useState, useEffect } from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import TableOfContent from './ChatHelpSlider/TableOfContent'
import L1Content from './ChatHelpSlider/L1Content'
import L2Content from './ChatHelpSlider/L2Content'
import styles from '../chatHelp.module.scss'
import { getPropertyInfo } from '../../../actions/chatAction'
import {
  tableOfContent as TOCData,
  levelOneSliderContent,
  levelTwoSliderContent
} from './ChatHelpSlider/data'
import {
  getUserId,
  getBackendChatConversationId
} from '../../../globalutilities/helpers'
import { triggerGTAG } from '../../../utils/utils'

const ChatHelpSlider = props => {
  const { activeChat, profileSidebar, mobileRightChat, sessionUser } = props

  const [displayStatus, setDisplayStatus] = useState(false)
  const [isLandLord, setIsLandLord] = useState(false)
  const [currentLevel, setCurrentLevel] = useState(0)
  const [contentKey, setContentKey] = useState(null)
  const [levelFrom, setLevelFrom] = useState(null)
  const [isSupportChat, setIsSupportChat] = useState(true)

  useEffect(() => {
    if (profileSidebar || !mobileRightChat || activeChat) {
      reset()
    }
    checkConditionForRender && checkIsLandLord()
  }, [activeChat, profileSidebar, mobileRightChat])

  const toggleSlider = () => {
    if (displayStatus) {
      setDisplayStatus(false)
    } else {
      setDisplayStatus(true)
      triggerGTAG({
        event: isLandLord ? 'Web_IP_LL_Help' : 'Web_IP_TT_Help'
      })
    }
  }

  const checkIsLandLord = _ => {
    const mainUserId = getUserId() || ''
    const conversationId = getBackendChatConversationId(activeChat)
    if (conversationId) {
      getPropertyInfo(conversationId).then(res => {
        if (
          res.data &&
          res.data.conversationType &&
          res.data.conversationType === 'DEFAULT'
        ) {
          const isLandLord =
            res.data &&
            res.data.property &&
            res.data.property.user.id === parseInt(mainUserId)
          isLandLord ? setIsLandLord(true) : setIsLandLord(false)
          setIsSupportChat(false)
        } else {
          setIsSupportChat(true)
        }
      })
    }
  }

  const setCurrentLevelAndContentKey = (level, key, lfrom) => {
    setCurrentLevel(level)
    setContentKey(key)
    lfrom && setLevelFrom(lfrom)
  }

  const reset = _ => {
    setCurrentLevel(0)
    setDisplayStatus(false)
  }

  const checkConditionForRender =
    activeChat &&
    activeChat.members &&
    activeChat.members.filter(user => user.name === 'Alicia').length >= 1 &&
    !profileSidebar &&
    mobileRightChat

  return (
    <>
      {checkConditionForRender && !isSupportChat ? (
        <ClickAwayListener
          onClickAway={() => {
            reset()
          }}
        >
          <div
            className={
              displayStatus
                ? `${styles['helpSlider']} ${styles['helpSlider--open']}`
                : styles['helpSlider']
            }
          >
            <div className={styles['helpSliderContentWrapper']}>
              <div
                onClick={toggleSlider}
                className={styles['helpSliderToggleButton']}
              >
                {displayStatus && (
                  <div
                    onClick={() => {
                      reset()
                    }}
                    className={styles['cross']}
                  ></div>
                )}
                <div className={styles['helpSliderToggleButton__help']}>
                  Help
                </div>
              </div>
              <div className={styles['helpSliderContent']}>
                {
                  {
                    0: (
                      <TableOfContent
                        styles={styles}
                        tableOfContent={
                          isLandLord ? TOCData['TOC_LL'] : TOCData['TOC_TT']
                        }
                        sessionUser={sessionUser}
                        checkIsLandLord={isLandLord}
                        setCurrentLevelAndContentKey={
                          setCurrentLevelAndContentKey
                        }
                      />
                    ),
                    1: (
                      <L1Content
                        styles={styles}
                        isLandLord={isLandLord}
                        data={levelOneSliderContent[contentKey]}
                        setCurrentLevelAndContentKey={
                          setCurrentLevelAndContentKey
                        }
                        contentKey={contentKey}
                      />
                    ),
                    2: (
                      <L2Content
                        styles={styles}
                        setCurrentLevelAndContentKey={
                          setCurrentLevelAndContentKey
                        }
                        isLandLord={isLandLord}
                        contentKey={contentKey}
                        levelFrom={levelFrom}
                        data={levelTwoSliderContent[contentKey]}
                      />
                    )
                  }[currentLevel]
                }
              </div>
            </div>
          </div>
        </ClickAwayListener>
      ) : null}
      {mobileRightChat && displayStatus && (
        <div className={styles['helpSlider__backdrop']}></div>
      )}
    </>
  )
}

export default ChatHelpSlider
