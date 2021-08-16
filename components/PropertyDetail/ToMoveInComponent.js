import React, { useState, useEffect } from 'react'
import TodayIcon from '@material-ui/icons/Today'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ChatIcon from '@material-ui/icons/Message'
import FavoriteFullIcon from '@material-ui/icons/Favorite'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import PhoneIcon from '@material-ui/icons/Phone'
import ShareIcon from '@material-ui/icons/Share'
import { Button } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'

import { withRouter } from 'next/router'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import * as auctionActions from '../../actions/auctionActions'
import Image from 'next/image'
import { getDeviceId, getToken, getUserId } from '../../globalutilities/helpers'
import PropertyApprovalStatus from '../Common/PropertyApprovalStatus'

import Countdown from 'react-countdown'

import dayjs from 'dayjs'
import { ClipLoader } from 'react-spinners'
import fetch from 'node-fetch'

import { API_HOST, X_OS_VERSION } from '../../env'

import { admin_token } from '../../globalutilities/consts'

import styles from './ToMoveInComponent.module.scss'

import { getFlashSalesDetails } from '../../utils/utils'

const SST_FEE = 23.94
const TENANCY_AGREEMENT_FEE = 399

const ToMoveInComponent = props => {
  const {
    propertyData,
    shareBtn,
    isPropertyFavorite,
    handleFavAction,
    chatRequestFormSubmitHandler,
    getPhoneNumberHandler,
    isMobile,
    isFlashSalesActive,
    flashSalesPrice,
    flashSalesRemainingDuration
  } = props
  const [totalBids, setTotalBids] = useState(0)
  const [isAuctionFinished, setIsAuctionFinished] = useState(false)
  const [moveInPropertyData, setMoveInPropertyData] = useState(propertyData)
  const [isClientLoading, setIsClientLoading] = useState(false)
  const { t } = useTranslation('common')

  useEffect(() => {
    isMobile ? window.addEventListener('scroll', handleScroll) : null
  }, [])

  useEffect(() => {
    if (props.propertyData && props.propertyData.auctionData) {
      const auctionId = props.propertyData.auctionData.id
      auctionActions.getPropertyStatsTenantList(auctionId).then(res => {
        if (res) {
          setTotalBids(res.length)
        }
      })
    }
  }, [props.propertyData])

  useEffect(() => {
    if (!props.router.asPath.includes('/rental-bidding')) {
      if (props.isChatRequestFinished) {
        getPropertyData()
      }
    }
  }, [props.isChatRequestFinished])

  const getPropertyData = async () => {
    setIsClientLoading(true)

    const API_URL_MAIN = `${API_HOST}properties/${moveInPropertyData.id}`

    const data = await fetch(API_URL_MAIN, {
      method: 'get',

      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || admin_token,
        'X-Device-ID': getDeviceId() || admin_token,
        'X-OS-Version': X_OS_VERSION
      },

      body: null
    })

    const resultData = await data.json()

    setIsClientLoading(false)

    setMoveInPropertyData(resultData)
  }
  const totalPrice = moveInPropertyData.price + TENANCY_AGREEMENT_FEE + SST_FEE
  const format = amount => {
    if (!amount) return
    let price = Number(amount).toFixed(2)
    price = price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    return price
  }

  const classNames = isMobile
    ? `${styles['calc__btn']} ${styles['calc__filledBtn']} ${styles['chatWithOwner_btn']}`
    : `${styles['calc__btn']} ${styles['calc__filledBtn']}`

  const handleScroll = () => {
    const banner = document.querySelector('#propertyDetails__coverWrapperID')
    const banner_prop = document.querySelector('#_prop_without_recommand')
    const banner_breadcrumb = document.querySelector('#breadcrumb_propID')
    const height = banner && banner.offsetHeight
    const height_prop =
      banner_prop.offsetHeight + banner_breadcrumb.offsetHeight + 10 - height
    const el = document.querySelector('#btnChatWithOwner2')
    if (el) {
      if (
        height_prop >= window.scrollY &&
        height < window.scrollY &&
        window.innerWidth < 767 &&
        isMobile
      ) {
        el.style.opacity = 1
      } else {
        window.innerWidth < 767 && isMobile ? (el.style.opacity = 0) : null
      }
    }
  }

  const renderChatButton = () => {
    if (getToken())
      if (
        getUserId() &&
        parseInt(getUserId()) === parseInt(moveInPropertyData.user.id)
      ) {
        return null
      } else {
        if (
          !moveInPropertyData.KOH &&
          !moveInPropertyData.chatServerConversationId
        ) {
          return chatWithOwnerBtn()
        } else if (
          (moveInPropertyData.KOH &&
            moveInPropertyData.chatServerConversationId) ||
          (moveInPropertyData.chatServerConversationId &&
            !moveInPropertyData.KOH)
        ) {
          return goToChat()
        } else if (
          moveInPropertyData.KOH &&
          !moveInPropertyData.chatServerConversationId
        ) {
          return chatWithOwnerBtn(true)
        }
      }
    else {
      if (moveInPropertyData.KOH) {
        return chatWithOwnerBtn(true)
      } else {
        return chatWithOwnerBtn()
      }
    }
  }
  const goToChat = () => {
    return (
      <Button
        id='btnChatWithOwner2'
        className={`${styles['calc__btn']} ${styles['calc__filledBtn']} ${styles['calc__filledBtn_blue']}`}
        onClick={() =>
          props.router.push(
            `/dashboard/chat?chatId=${moveInPropertyData.chatServerConversationId}`
          )
        }
      >
        Open Chat
      </Button>
    )
  }

  const Completionist = () => <span style={{ color: '#f05' }}>00:00:00</span>

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setIsAuctionFinished(true)
      return <Completionist />
    } else {
      return (
        <span
          style={{
            color: '#f05'
          }}
        >
          {days}d : {hours}h: {minutes}m: {seconds}s
        </span>
      )
    }
  }

  const getPhoneNumberComponent = () => {
    return (
      <div
        onClick={() => chatRequestFormSubmitHandler(null, true)}
        className={styles['ToMoveInComponent__ownerMobileNumber--container']}
      >
        <div
          className={
            styles['ToMoveInComponent__ownerMobileNumber--mobileNumber']
          }
        >
          <PhoneIcon />{' '}
          <span
            style={{
              fontSize: '16px'
            }}
          >
            +60
          </span>
        </div>
        <div
          className={styles['ToMoveInComponent__ownerMobileNumber--hiddenArea']}
          style={{
            fontSize: '16px'
          }}
        >
          Get Phone Number
        </div>
      </div>
    )
  }

  const chatWithOwnerBtn = (book = false, isAuctionFinished = false) => {
    const isRentalBidding = props.router.asPath.includes('/rental-bidding')
    return (
      <>
        {!isRentalBidding && getPhoneNumberComponent()}

        <Button
          id='btnChatWithOwner2'
          className={classNames}
          style={{
            background: '#FF0055',
            border: 'none',
            color: '#fff',
            fontSize: '14px',
            opacity: isAuctionFinished ? '.5' : 1
          }}
          onClick={() => {
            if (isRentalBidding) {
              if (!isAuctionFinished) {
                chatRequestFormSubmitHandler()
              }
            } else {
              chatRequestFormSubmitHandler()
            }
          }}
          disabled={isAuctionFinished}
        >
          {!isRentalBidding && (
            <>
              <Image
                src={'/img/icons/arrow-right-yellow.svg'}
                width={30}
                height={30}
                alt='arrow-right'
                style={{ marginLeft: '-5px', paddingRight: '5px' }}
              />
              {moveInPropertyData.KOH && !isMobile && (
                <span className={styles['availability']}>
                  <CheckCircleOutlineIcon fontSize='small' />
                  Verified Availability
                </span>
              )}
            </>
          )}
          {isRentalBidding
            ? isAuctionFinished
              ? 'Bidding Ended'
              : 'Submit For Bid'
            : book
            ? moveInPropertyData.isVirtualViewingSupported
              ? 'Book Virtual Appointment Now'
              : 'Book Appoinment Now'
            : `${t('property-details:text_chat_owner')} `}
          {book
            ? null
            : !isRentalBidding && <>{moveInPropertyData.user.name}</>}
        </Button>
        {!isRentalBidding &&
          moveInPropertyData.user &&
          moveInPropertyData.user.userStatsDto && (
            <div className={styles['response-speed']}>
              Typically Replies (
              {moveInPropertyData.user.userStatsDto.responseSpeed})
            </div>
          )}
      </>
    )
  }

  const loader = () => {
    return (
      <div className={className}>
        <div
          className={styles['propertyDetails__toMoveInWrapper--card']}
          style={{
            minHeight: '430px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ClipLoader color='#e0e0e0' />
        </div>
      </div>
    )
  }

  let className = styles['propertyDetails__toMoveInWrapper']
  if (!isMobile) {
    className = `${className} ${styles['propertyDetails__toMoveInWrapper__sticky']}`
  }
  if (!moveInPropertyData) {
    return <>{loader()}</>
  }
  if (isClientLoading && !moveInPropertyData) {
    return <>{loader()}</>
  }
  const getEventMessageWithLanguage = (type, days) => {
    switch (props.router.locale) {
      case 'en':
        return type === 'countdown'
          ? days
            ? props.flashEventInfo?.textCountdownEn +
              ' In ' +
              days +
              `${days === 1 ? ' day' : ' days'}`
            : props.flashEventInfo?.textCountdownEn + ' Today'
          : props.flashEventInfo?.textAnnouncementEn
      case 'my':
        return type === 'countdown'
          ? days
            ? props.flashEventInfo?.textCountdownMy + ' ' + days + ' hari lagi'
            : props.flashEventInfo?.textCountdownMy + ' hari ini'
          : props.flashEventInfo?.textAnnouncementMy
      case 'zh':
        return type === 'countdown'
          ? days
            ? props.flashEventInfo?.textCountdownZh + ' ' + days + ' 天'
            : props.flashEventInfo?.textCountdownZh + ' 今日'
          : props.flashEventInfo?.textAnnouncementZh
      default:
        break
    }
  }

  return (
    <div className={className}>
      <div>
        <PropertyApprovalStatus propertyInfo={moveInPropertyData} />
        {moveInPropertyData.type == 'ROOM' ||
        moveInPropertyData.type == 'HIGHRISE' ||
        moveInPropertyData.type == 'LANDED' ? (
          <div className={styles['propertyDetails__toMoveInWrapper--card']}>
            <div className={styles['calc__container']}>
              {props.router.asPath.includes('/rental-bidding') && (
                <>
                  <span className={`${styles['calc__title']} `}>
                    Time left: {'     '}
                    <Countdown
                      date={dayjs(
                        moveInPropertyData.auctionData.endDate
                      ).valueOf()}
                      renderer={renderer}
                    />
                  </span>{' '}
                  <br></br>
                </>
              )}
              {isFlashSalesActive ? (
                <div className={styles['flash-sales__end-wrap']}>
                  <span className={styles['calc__title']}>
                    {props.router.asPath.includes('/rental-bidding')
                      ? 'Bidding Stats'
                      : t('property-details:text_property_move')}
                  </span>
                  <div className={styles['flash-sales__end']}>
                    {flashSalesRemainingDuration > 0
                      ? getEventMessageWithLanguage(
                          'countdown',
                          flashSalesRemainingDuration
                        )
                      : getEventMessageWithLanguage('countdown')}
                  </div>
                </div>
              ) : (
                <span className={styles['calc__title']}>
                  {props.router.asPath.includes('/rental-bidding')
                    ? 'Bidding Stats'
                    : t('property-details:text_property_move')}
                </span>
              )}
              {props.router.asPath.includes('/rental-bidding') && (
                <>
                  <ul className={styles['calc__list']}>
                    <li className={styles['calc__item']}>
                      <span>Current Bid:</span>
                      <span>
                        RM {moveInPropertyData.auctionData.currentPrice}
                      </span>
                    </li>
                    <li className={styles['calc__item']}>
                      <span>Starting Bid:</span>
                      <span>
                        RM {moveInPropertyData.auctionData.startPrice}
                      </span>
                    </li>
                    <li className={styles['calc__item']}>
                      <span>Total Bid:</span>
                      <span>{totalBids} bids</span>
                    </li>
                  </ul>
                  <br />
                </>
              )}

              <ul className={styles['calc__list']}>
                <li className={styles['calc__item']}>
                  <span>{t('property-details:text_first_month')}</span>
                  <span>RM {moveInPropertyData.price}</span>
                </li>
                <li className={styles['calc__item']}>
                  <span>{t('property-details:text_tenancy_signing')}</span>

                  <span>RM {TENANCY_AGREEMENT_FEE}</span>
                </li>

                <li className={styles['calc__item']}>
                  <span>6% SST</span>
                  <span>RM {SST_FEE}</span>
                </li>
                {!isFlashSalesActive && (
                  <li className={styles['calc__item']}>
                    <span>6% SST</span>
                    <span>RM {SST_FEE}</span>
                  </li>
                )}

                <li className={styles['calc__item']}>
                  <span>{t('property-details:text_property_total')}</span>
                  <span>RM {format(totalPrice)}</span>
                </li>
              </ul>
            </div>
            <div className={styles['banner_main_div']}>
              {moveInPropertyData &&
                moveInPropertyData.hotDealsPropertyDto &&
                moveInPropertyData.hotDealsPropertyDto.showBanner && (
                  <div className={styles['banner']}>
                    {`${moveInPropertyData.hotDealsPropertyDto.category} : ${moveInPropertyData.hotDealsPropertyDto.bannerDescription}`}
                  </div>
                )}
            </div>
            <div className={styles['calc__container']}>
              {!props.router.asPath.includes('/rental-bidding') && (
                <div className={styles['calc__terms']}>
                  <TodayIcon className={styles['calc__icon']} />
                  <span>{t('property-details:text_property_surcharge')}</span>
                </div>
              )}
              {!props.router.asPath.includes('/rental-bidding') &&
              moveInPropertyData.negotiable ? (
                <div className={styles['calc__terms']}>
                  <ThumbUpIcon className={styles['calc__icon']} />
                  <span>{t('property-details:text_property_negotiable')}</span>
                </div>
              ) : null}
              <div className={styles['calc__terms']}>
                <Image
                  src={'/img/monetization_on-24px@2x.png'}
                  width={30}
                  height={30}
                  alt='zero deposit'
                  style={{ paddingBottom: '10px' }}
                />
                <span style={{ color: 'purple', margin: '5px' }}>
                  {t('property-details:text_property_zerodeposit')}
                </span>
              </div>
              {moveInPropertyData.KOH && isMobile && (
                <div className={styles['calc__terms']}>
                  <CheckCircleOutlineIcon
                    style={{
                      color: '#00ff0b'
                    }}
                    fontSize='medium'
                  />
                  <span className={styles['availability']}>
                    Verified Availability
                  </span>
                </div>
              )}
              {isFlashSalesActive ? (
                <div
                  className={`${styles['calc__terms']} ${styles['calc__communication']}`}
                >
                  <img src='/img/campaign-black.svg' alt='' />
                  <span>{getEventMessageWithLanguage('announcement')}</span>
                </div>
              ) : (
                <div
                  className={`${styles['calc__terms']} ${styles['calc__communication']}`}
                >
                  <ChatIcon className={styles['calc__icon']} />
                  <span>{t('property-details:text_property_owner')}</span>
                </div>
              )}
              {props.router.asPath.includes('/rental-bidding')
                ? chatWithOwnerBtn(false, isAuctionFinished)
                : renderChatButton()}
            </div>
          </div>
        ) : (
          <div
            className={styles['propertyDetails__toMoveInWrapper--card']}
            style={{ minHeight: '230px' }}
          >
            <div className={styles['calc__container']}>
              <div
                className={`${styles['calc__terms']} ${styles['calc__communication']}`}
              >
                <ChatIcon className={styles['calc__icon']} />
                <span>{t('property-details:text_property_owner')}</span>
              </div>
              {props.router.asPath.includes('/rental-bidding') ? (
                <Button
                  className={classNames}
                  style={{
                    background: '#FF0055',
                    border: 'none',
                    color: '#fff'
                  }}
                  onClick={() => chatRequestFormSubmitHandler()}
                >
                  Submit For Bid
                </Button>
              ) : (
                renderChatButton()
              )}
              <div className={styles['calc__btn--container']}>
                <Button
                  onClick={handleFavAction}
                  className={`${styles['calc__btn']} ${styles['calc__greyBtn']}`}
                >
                  {isPropertyFavorite ? (
                    <>
                      <FavoriteFullIcon />
                      {t('property-details:text_property_remove')}
                    </>
                  ) : (
                    <>
                      <FavoriteIcon />
                      {t('property-details:text_property_favourite')}
                    </>
                  )}
                </Button>
                <Button
                  onClick={shareBtn}
                  className={`${styles['calc__btn']} ${styles['calc__greyBtn']}`}
                >
                  <ShareIcon />
                  {t('property-details:text_property_share')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default withRouter(ToMoveInComponent)
