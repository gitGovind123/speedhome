import React, { useState, useEffect, useRef } from 'react'
import { Card } from 'react-bootstrap'
import { useRouter } from 'next/router'
import Icon from '../Common/Icons/Icons'

import dayjs from 'dayjs'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import VisibilityIcon from '@material-ui/icons/Visibility'
import ChatIcon from '@material-ui/icons/Chat'
import MoreIcon from '@material-ui/icons/MoreHoriz'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder'
import OutsideClickHandler from 'react-outside-click-handler'
import HighlightOff from '@material-ui/icons/HighlightOff'
import withSizes from 'react-sizes'

import {
  deleteFavorite,
  getFavPropertyList,
  checkPropertyIsFavoriteOrNot,
  addToFavorite
} from '../../actions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CONST from '../../globalutilities/consts'
import { getToken, getUserId, logOut } from '../../globalutilities/helpers'
import * as authActions from '../../actions/authActions'

import * as homeRunnerActions from '../../actions/homeRunnerActions'

import { priceSplit, hasAdds } from '../../globalutilities/helpers'

import { getPropertyNameLink } from '../Common/Helper'
import PropertyListGallery from './PropertyListGallery'
import PropertyApprovalStatus from '../Common/PropertyApprovalStatus'
import MyAuctionStats from './MyAuctionStats'
import MobileToolTip from './MobileToolTip'
import styles from './PropertyListItem.module.scss'
import { isAfterToday } from '../../utils/utils'
import ChatRequest from '../PropertyDetail/ChatRequest'
import dynamic from 'next/dynamic'
import { sendSearchTrackingActionLog } from '../../utils/utils'

const PropertyListFavorite = dynamic(() => import('./PropertyListFavorite'))

const PropertyListItemNew = props => {
  const {
    data,
    isNearbyPage,
    router,
    mapViewModal = false,
    isRecomended = false,
    url,
    showToolTip,
    isMobile,
    isRecommendedPropertyItem,
    propertyDetailRef
  } = props
  const [isVerifiedPostalCode, setIsVerifiedPostalCode] = useState(false)
  const [isFavoriteCheck, setIsFavoriteCheck] = useState(false)
  const [isChangeForTenantCount, setIsChangeForTenantCount] = useState(false)
  const [isShowBidStats, setIsShowBidStats] = useState(false)
  const [actionBtnCount, setActionBtnCount] = useState(0)
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [dropDownOpenFor, setDropDownOpenFor] = useState('')
  const [mobileToolTip, setMobileToolTip] = useState(false)
  const [mobileToolTipContent, setMobileToolTipContent] = useState(null)
  const { t } = useTranslation('common')

  let actionCount = 0

  const itemRef = useRef(null)

  useEffect(() => {
    if (router.asPath.includes('/dashboard/listings') && props.data) {
      const postcodeData = {
        postcode: props.data.postcode,
        propertyId: props.data.id
      }
      props.homeRunnerActions
        .validatePostalCodeforActivePropertyAPI(postcodeData)
        .then(res => {
          if (res && res.type === 'SUCCESS') {
            setIsVerifiedPostalCode(res.value.isSupported)
          }
        })
    }
  }, [props.data])

  useEffect(() => {
    !isMobile && getListItemPostion()

    if (props.type !== 'ACTIVE') {
      setActionBtnCount(actionBtnCount + 1)
    }
    if (
      props.type === 'ACTIVE' &&
      data.type &&
      !data.type.toLowerCase().includes('_sale')
    ) {
      setActionBtnCount(actionBtnCount + 1)
      setIsChangeForTenantCount(true)
    }
  }, [])

  useEffect(() => {
    if (
      data.status === 'ACTIVE' &&
      (data.type === 'HIGHRISE' || data.type === 'LANDED') &&
      data.price >= 500 &&
      data.price <= 5000 &&
      data.KOH === false &&
      isVerifiedPostalCode
    ) {
      setActionBtnCount(actionBtnCount + 1)
    }
    if (
      data.status === 'ACTIVE' &&
      (data.type === 'HIGHRISE' || data.type === 'LANDED') &&
      data.price >= 500 &&
      data.price <= 5000 &&
      data.KOH === true &&
      isVerifiedPostalCode
    ) {
      setActionBtnCount(actionBtnCount + 1)
    }
  }, [isVerifiedPostalCode])

  useEffect(() => {
    if (data && data.auctions && data.auctions.length > 0) {
      setActionBtnCount(actionBtnCount + 1)
      setIsShowBidStats(true)
    }
  }, [isChangeForTenantCount])

  const getListItemPostion = _ => {
    const postions = itemRef.current?.getBoundingClientRect()
    const rightDiff =
      !isMobile &&
      postions.right &&
      window &&
      window.innerWidth - postions.right
    if (router?.query?.map == 1) {
      postions.right < 360
        ? (itemRef.current.className =
            itemRef.current.className + ' listItemsTooltipLeftWrapper')
        : (itemRef.current.className =
            itemRef.current.className + ' listItemsTooltipRightWrapper')
    } else if (rightDiff < 360) {
      itemRef.current.className =
        itemRef.current.className + ' listItemsTooltipRightWrapper'
    }
  }

  const openMoreDropDown = id => {
    if (dropDownOpenFor) {
      setDropDownOpenFor('')
    } else {
      setDropDownOpenFor(id)
    }
  }

  const openMobileToolTip = (title, content) => {
    setMobileToolTipContent({ title, content })
    setMobileToolTip(true)
  }

  let coverPhoto
  if (data.images && data.images.length > 0) {
    coverPhoto = data.images.find(item => item.coverPhoto)

    if (coverPhoto === undefined) {
      coverPhoto = data.images[0]
    }
  } else {
    coverPhoto = {
      url: `/img/image-not-found.png`
    }
  }

  let roomType
  if (data.roomType) {
    if (data.roomType === 'MEDIUM') {
      roomType = mapViewModal ? 'Middle Room' : t('text_middle_room')
    } else if (data.roomType === 'SMALL') {
      roomType = mapViewModal ? 'Single Room' : t('text_single_room')
    } else if (data.roomType == 'MASTER') {
      roomType = mapViewModal ? 'Master Room' : t('text_master_room')
    }
  }

  let type

  if (data.type) {
    if (data.type === 'LANDED') {
      type = mapViewModal ? 'Landed' : t('text_landed')
    } else if (data.type === 'HIGHRISE') {
      type = mapViewModal
        ? router.locale === 'en'
          ? 'High-Rise'
          : router.locale === 'my'
          ? 'Rumah bertingkat'
          : router.locale === 'zh'
          ? '高楼住宅'
          : t('text_hightrise')
        : t('text_hightrise')
    } else if (data.type === 'ROOM') {
      type = mapViewModal ? 'Room' : t('text_room')
    } else if (data.type === 'LANDED_SALE') {
      type = mapViewModal ? 'Landed Sale' : t('text_landed_sale')
    } else if (data.type === 'HIGHRISE_SALE') {
      type = mapViewModal ? 'High-Rise Sale' : t('text_hightrise_sale')
    }
  }

  let furnishType
  if (data.furnishType) {
    if (data.furnishType === 'NONE') {
      furnishType = mapViewModal
        ? router.locale === 'en'
          ? 'Unfurnished'
          : router.locale === 'my'
          ? 'Tiada perabot'
          : router.locale === 'zh'
          ? '无装潢'
          : t('text_unfurnished')
        : t('text_unfurnished')
    } else if (data.furnishType === 'FULL') {
      furnishType = mapViewModal
        ? router.locale === 'en'
          ? 'Fully Furnished'
          : router.locale === 'my'
          ? 'Perabot lengkap'
          : router.locale === 'zh'
          ? '全装潢'
          : t('text_fully_furnished')
        : t('text_fully_furnished')
    } else if (data.furnishType === 'PARTIAL') {
      furnishType = mapViewModal
        ? 'Partial Furnished'
        : t('text_parital_furnished')
    }
  }

  let bathroomType
  if (data.bathroomType) {
    if (data.bathroomType === 'SHARED') {
      bathroomType = mapViewModal ? 'Shared' : t('text_shared')
    } else if (data.bathroomType === 'PRIVATE') {
      bathroomType = mapViewModal ? 'Private' : t('text_private')
    }
  }

  let propertyLink = ''
  const isAuction = router.asPath.includes('/rental-bidding')
  const idOrRef = isAuction && !isRecomended ? data.auctionData.id : data.ref
  if (data.name) {
    propertyLink += '/' + getPropertyNameLink(data.name) + '-' + idOrRef
  }
  const split_route = (router.asPath && router.asPath.split('/')) || []
  const alt = split_route.length === 2 ? 'Home Rental' : split_route.join(' ')

  const boostExpiry = data.boostExpiry
    ? dayjs(data.boostExpiry).format('YYYY-MM-DD')
    : ''
  const today = dayjs(new Date()).format('YYYY-MM-DD')
  // return null
  const getPropertyShortName = name => {
    if (!name) {
      return
    }
    if (name.length > 30) {
      return `${name.slice(0, 25)}...`
    } else {
      return name
    }
  }

  let asLinkForProperty = ''
  let editListAsLinkForProperty = ''
  let linkForProperty = ''
  let editLink = ''
  let isBidAfterToday = false
  let isMapView = false

  if (router.asPath.includes('/rental-bidding')) {
    if (
      data &&
      data.auctionData &&
      isAfterToday(dayjs(data.auctionData.endDate).format())
    ) {
      isBidAfterToday = true
    } else {
      asLinkForProperty = `/rental-bidding/details${propertyLink}`
      editListAsLinkForProperty = `${t('link_post')}/edit/${data.ref}`

      if (router.asPath.includes('/my') || router.asPath.includes('/zh')) {
        linkForProperty = `/[lang]/rental-bidding/details/[id]`
        editLink = '/[lang]/post/edit/[ref]'
      } else {
        linkForProperty = `/rental-bidding/details/[id]`
        editLink = '/post/edit/[ref]'
      }
    }
  } else {
    if (router && router.query) {
      isMapView = Number(router.query.map) !== -1
    }
    if (isMapView) {
      asLinkForProperty = `${
        hasAdds()
          ? router.locale === 'my'
            ? '/my/iklan'
            : router.locale === 'zh'
            ? '/zh/guanggao'
            : '/details'
          : router.locale === 'my'
          ? '/my/iklan'
          : router.locale === 'zh'
          ? '/zh/guanggao'
          : '/ads'
      }${propertyLink}`
    } else {
      asLinkForProperty = `${
        hasAdds() ? t('link_adBlock') : t('link_ads')
      }${propertyLink}`
    }
    editListAsLinkForProperty = `/post/edit/${data.ref}`

    if (router.asPath.includes('/my') || router.asPath.includes('/zh')) {
      linkForProperty = `${
        hasAdds() ? '/[lang]/[details]/[id]' : '/[lang]/[text]/[id]'
      }`
      editLink = '/[lang]/post/edit/[ref]'
    } else {
      linkForProperty = `${hasAdds() ? '/details/[id]' : '/ads/[id'}`
      editLink = '/post/edit/[ref]'
    }
  }

  const returnItemCard = () => {
    return (
      <>
        {router.asPath.includes('/dashboard/listings') ? (
          <div className={styles['Propertylist__item--moreInfo']}>
            <div>
              <VisibilityIcon
                className={styles['Propertylist__item--moreInfo--icon']}
              />
              <span>
                {data.stats && data.stats.viewCount
                  ? `${
                      parseInt(data.stats.viewCount) > 1
                        ? data.stats.viewCount + ' views'
                        : data.stats.viewCount + ' view'
                    }`
                  : '0 view'}
              </span>
            </div>
            <div>
              <ChatIcon
                className={styles['Propertylist__item--moreInfo--icon']}
              />
              <span>
                {data.stats && data.stats.crCount
                  ? `${
                      parseInt(data.stats.crCount) > 1
                        ? data.stats.crCount + ' chats'
                        : data.stats.crCount + ' chat'
                    }`
                  : '0 chat'}
              </span>
            </div>
          </div>
        ) : null}
        <Card
          ref={itemRef}
          className={`${styles['Propertylist__item__card']} mb-5`}
          style={{
            position: 'relative'
          }}
        >
          {mapViewModal && (
            <div
              style={{
                position: 'absolute',
                left: '.5rem',
                top: '5px',
                zIndex: '99',
                backgroundColor: 'transparent',
                height: '2.5rem'
              }}
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                props.closePropertyOnMap()
                //close the modal for map
              }}
            >
              <HighlightOff
                style={{
                  color: '#ff0055',
                  height: '2rem',
                  width: '2rem'
                }}
              />
            </div>
          )}
          {isMobile && (
            <MobileToolTip
              content={mobileToolTipContent}
              closeToolTip={setMobileToolTip}
              isOpen={mobileToolTip}
            />
          )}

          <div
            className={styles['Propertylist__item__cover']}
            style={{
              height: mapViewModal ? '130px' : '230px'
            }}
          >
            <PropertyApprovalStatus propertyInfo={data} />
            <div className={styles['image--caption']}>
              {data.videos && data.videos.length > 0 ? (
                <div
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    isMobile &&
                      openMobileToolTip(
                        'Virtual Viewing',
                        'Virtual Viewing is available for this unit. Watch the video or arrange for a video call.'
                      )
                  }}
                  className={styles['toolTipWrapper']}
                >
                  <img
                    loading='lazy'
                    src='/img/icon-contactless.svg'
                    align='left'
                    alt='contactless'
                    width={60}
                    height={60}
                  />
                  <div
                    className={`${styles['propetyListItemToolTip']} listItemsTooltip`}
                  >
                    <div
                      className={`${styles['propetyListItemToolTipContent']} listItemTooltipContent`}
                    >
                      <div
                        className={
                          styles['propetyListItemToolTipContent__title']
                        }
                      >
                        Virtual Viewing
                      </div>
                      <div
                        className={
                          styles['propetyListItemToolTipContent__content']
                        }
                      >
                        Virtual Viewing is available for this unit. Watch the
                        video or arrange for a video call.
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {data.noDeposit ? (
                <div
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    isMobile &&
                      openMobileToolTip(
                        'Zero Deposit',
                        'You are not required to pay any deposit for Zero Deposit units.'
                      )
                  }}
                  className={styles['toolTipWrapper']}
                >
                  <img
                    loading='lazy'
                    src='/img/zeroDeposit.png'
                    alt='zeroDeposit'
                    width={60}
                    height={60}
                  />
                  <div
                    className={`${styles['propetyListItemToolTip']} listItemsTooltip`}
                  >
                    <div
                      className={`${styles['propetyListItemToolTipContent']} listItemTooltipContent`}
                    >
                      <div
                        className={
                          styles['propetyListItemToolTipContent__title']
                        }
                      >
                        Zero Deposit
                      </div>
                      <div
                        className={
                          styles['propetyListItemToolTipContent__content']
                        }
                      >
                        You are not required to pay any deposit for Zero Deposit
                        units.
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            {isNearbyPage ? (
              <div className={styles['distance--label']}>
                <p>{data.distance} km</p>
              </div>
            ) : null}
            <PropertyListGallery
              galleryArr={data.images}
              linkForProperty={asLinkForProperty}
              propertyName={getPropertyShortName(data.name) || null}
              styles={styles}
              isBidAfterToday={isBidAfterToday}
              mapViewModal={mapViewModal}
              propertyDetailRef={propertyDetailRef}
              isRecommendedPropertyItem={isRecommendedPropertyItem}
            />
          </div>
          <div
            className={`
              ${
                mapViewModal
                  ? styles['Propertylist__map__item__body']
                  : styles['Propertylist__item__body']
              }
                ${
                  isBidAfterToday
                    ? styles['Propertylist__item__card__bidding__finished']
                    : ''
                }
            `}
          >
            {isBidAfterToday ? (
              <div
                className={
                  styles['Propertylist__item__body__bidding_finished_badge']
                }
              >
                <p>Bidding Ended</p>
              </div>
            ) : null}
            <div
              className={`${styles['Propertylist__item__price--container']} price_container_common`}
            >
              <h4 className={styles['Propertylist__item__price']}>
                RM{priceSplit(data.price)}
              </h4>
              <div className={styles['Propertylist__item__cr-wrap']}>
                <ChatRequest
                  propertyInfo={data}
                  router={router}
                  token={getToken()}
                />
                <PropertyListFavorite
                  editListAsLinkForProperty={editListAsLinkForProperty}
                  {...props}
                />
              </div>
            </div>

            <div className={styles['Propertylist__item__details']}>
              <div
                className={styles['Propertylist__item__details--whole-wrap']}
              >
                <span className={styles['Propertylist__item__details--whole']}>
                  {data.type === 'ROOM'
                    ? mapViewModal
                      ? 'Room'
                      : t('text_room')
                    : mapViewModal
                    ? 'Whole Unit'
                    : t('text_whole_unit')}
                </span>
                {boostExpiry &&
                dayjs(boostExpiry).unix() >= dayjs(today).unix() ? (
                  <span
                    className={styles['Propertylist__item__price--newListing']}
                  >
                    New Listing
                  </span>
                ) : null}
                {data &&
                  data.hotDealsPropertyDto &&
                  data.hotDealsPropertyDto.showBanner &&
                  url === 'rent' && (
                    <span
                      className={
                        styles['Propertylist__item__price--newListing_category']
                      }
                    >
                      {data.hotDealsPropertyDto.category}
                    </span>
                  )}
              </div>
              {/* <Link href={isBidAfterToday ? '' : asLinkForProperty}>
                <a
                  style={{
                    display: 'block',
                    position: 'relative',
                    margin: '8px 0'
                  }}
                > */}
              <h5
                className={styles['Propertylist__item__details--name']}
                style={{
                  color: router.asPath.includes('/dashboard/listings')
                    ? '#2c76ec'
                    : '#000'
                }}
              >
                {getPropertyShortName(data.name)}
              </h5>
              {/* </a>
              </Link> */}
            </div>
            <div className={styles['Propertylist__item__details--specs']}>
              <div
                className={
                  styles['Propertylist__item__details--specs--item--each']
                }
              >
                <div
                  className={styles['Propertylist__item__details--specs--item']}
                >
                  <Icon icon='highrise' size={'middle'} black />
                  <span>{type}</span>
                </div>
                <div
                  className={styles['Propertylist__item__details--specs--item']}
                >
                  <Icon icon='detailsHotel' size={'middle'} black />
                  <span>{data.bedroom} bedrooms</span>
                </div>
              </div>
              <div
                className={
                  styles['Propertylist__item__details--specs--item--each']
                }
              >
                <div
                  className={styles['Propertylist__item__details--specs--item']}
                >
                  <Icon icon='straighten' size={'middle'} black />
                  <span>
                    {data.type === 'ROOM' ? roomType : `${data.sqft} sqft`}
                  </span>
                </div>
                <div
                  className={styles['Propertylist__item__details--specs--item']}
                >
                  <Icon icon='bathtub' size={'middle'} black />
                  <span>
                    {data.type !== 'ROOM'
                      ? `${data.bathroom} bathrooms`
                      : bathroomType}
                  </span>
                </div>
              </div>
              <div
                className={
                  styles['Propertylist__item__details--specs--item--each']
                }
              >
                <div
                  className={styles['Propertylist__item__details--specs--item']}
                >
                  {furnishType === t('text_unfurnished') ? (
                    <Icon icon='weekend' size={'middle'} grey />
                  ) : (
                    <Icon icon='weekend' size={'middle'} black />
                  )}
                  <span>{furnishType}</span>
                </div>
                <div
                  className={styles['Propertylist__item__details--specs--item']}
                >
                  {parseInt(data.carpark) > 0 ? (
                    <Icon icon='directionCar' size={'middle'} black />
                  ) : (
                    <Icon icon='directionCar' size={'middle'} grey />
                  )}
                  <span>{data.carpark} carpark</span>
                </div>
              </div>
            </div>
            {router.asPath.includes('/dashboard/listings') ? (
              <div
                className={`${
                  styles['Propertylist__item__details--myListing']
                } ${
                  actionBtnCount < 3 && isShowBidStats
                    ? styles['flex_direction_unset']
                    : ''
                }`}
              >
                <div
                  className={`${styles['action_btn_wrap']} ${
                    actionBtnCount < 2 ? styles['flex_direction_clumn'] : ''
                  }`}
                  data-testId='dashboard_action_button'
                >
                  {props.type === 'ACTIVE' &&
                  data.type &&
                  !data.type.toLowerCase().includes('_sale') ? (
                    <Link href={`/dashboard/listings/tenantsearch/${data.ref}`}>
                      <a
                        className={`btn btn-primary btn-primary-filled btn-holder btn-curv text-center mt-2 ${styles['mylisting--link--btn']} ${styles['mylisting--link--outlined']}`}
                      >
                        Tenant search
                      </a>
                    </Link>
                  ) : null}

                  {data.status === 'ACTIVE' &&
                    (data.type === 'HIGHRISE' || data.type === 'LANDED') &&
                    data.price >= 500 &&
                    data.price <= 5000 &&
                    data.KOH === false &&
                    isVerifiedPostalCode && (
                      <Link href={`/post/homerunner/${data.ref}?share=${true}`}>
                        <a
                          className={`btn btn-primary btn-primary-filled btn-holder btn-curv text-center mt-2 ${styles['mylisting--link--btn']} ${styles['mylisting--link--outlined']}`}
                        >
                          {t('button_post_homrunner_text')}
                        </a>
                      </Link>
                    )}

                  {data.status === 'ACTIVE' &&
                    (data.type === 'HIGHRISE' || data.type === 'LANDED') &&
                    data.price >= 500 &&
                    data.price <= 5000 &&
                    data.KOH === true &&
                    isVerifiedPostalCode && (
                      <>
                        <a
                          className={`btn btn-primary btn-primary-filled btn-holder btn-curv text-center mt-2 ${styles['mylisting--link--btn']} ${styles['mylisting--link--outlined']}`}
                          onClick={() =>
                            props.showRetrieveKeyConfirmModal(data.ref, true)
                          }
                        >
                          Retrieve my key
                        </a>
                      </>
                    )}

                  {props.type !== 'ACTIVE' ? (
                    <a
                      className={`btn btn-primary btn-primary-filled btn-holder btn-curv text-center mt-2 ${styles['mylisting--link--btn']} ${styles['mylisting--link--outlined']}`}
                      onClick={() =>
                        props.onPropertyUpdate(data.id, 'activate')
                      }
                    >
                      Reactivate
                    </a>
                  ) : null}
                </div>

                {data && data.auctions && data.auctions.length > 0 && (
                  <Link
                    href={`/dashboard/listings/rental-bidding-stats/${data.auctions[0].id}`}
                  >
                    <a
                      // onClick={() => openBidStats(data.auctions)}
                      className={`btn btn-primary btn-primary-filled btn-holder btn-curv text-center mt-2 ${
                        actionBtnCount > 2 ? styles['width-full'] : ''
                      } ${styles['mylisting--link--btn']} ${
                        styles['mylisting--link--outlined']
                      }`}
                    >
                      Show bid Stats
                    </a>
                  </Link>
                )}
              </div>
            ) : null}
          </div>
        </Card>
        <MyAuctionStats
          show={showStatsModal}
          onHide={() => setShowStatsModal(false)}
        />
      </>
    )
  }

  if (router.asPath.includes('/dashboard/listings')) {
    return returnItemCard()
  }

  return (
    <div className={styles['Propertylist__item--container']}>
      <LinkWrapper
        isBidAfterToday={isBidAfterToday}
        asLinkForProperty={asLinkForProperty}
        isMapView={isMapView}
        isRecommendedPropertyItem={isRecommendedPropertyItem}
        propertyDetailRef={propertyDetailRef}
        dataRef={data?.ref}
      >
        {returnItemCard()}
      </LinkWrapper>
    </div>
  )
}

const LinkWrapper = props => {
  const {
    isMapView,
    asLinkForProperty,
    isBidAfterToday,
    isRecommendedPropertyItem,
    propertyDetailRef,
    dataRef
  } = props
  const router = useRouter()
  const isDashBoardPages =
    router.asPath.includes('/dashboard/listings') ||
    router.asPath.includes('/dashboard/favorites')
  if (isMapView) {
    return (
      <a
        onClick={e => {
          isRecommendedPropertyItem &&
            sendSearchTrackingActionLog(
              'recommendations_click',
              propertyDetailRef,
              router?.query,
              dataRef
            )
        }}
        href={
          isBidAfterToday
            ? ''
            : asLinkForProperty +
              (!isDashBoardPages
                ? isRecommendedPropertyItem
                  ? `?source_type=recommendation_listing_page&source_ref=${propertyDetailRef}`
                  : '?source_type=web_result'
                : '')
        }
        target='_blank'
        data-testid='propertyListItemWrapper'
        data-href={
          isBidAfterToday
            ? ''
            : asLinkForProperty +
              (!isDashBoardPages
                ? isRecommendedPropertyItem
                  ? `?source_type=recommendation_listing_page&source_ref=${propertyDetailRef}`
                  : '?source_type=web_result'
                : '')
        }
        rel='noreferrer'
      >
        {props.children}
      </a>
    )
  } else {
    return (
      <a
        data-testid='propertyListItemWrapper'
        onClick={e => {
          isRecommendedPropertyItem &&
            sendSearchTrackingActionLog(
              'recommendations_click',
              propertyDetailRef,
              router?.query,
              dataRef
            )
        }}
        href={
          isBidAfterToday
            ? ''
            : asLinkForProperty +
              (!isDashBoardPages
                ? isRecommendedPropertyItem
                  ? `?source_type=recommendation_listing_page&source_ref=${propertyDetailRef}`
                  : '?source_type=web_result'
                : '')
        }
        target='_blank'
        rel='noreferrer'
        data-href={
          isBidAfterToday
            ? ''
            : asLinkForProperty +
              (!isDashBoardPages
                ? isRecommendedPropertyItem
                  ? `?source_type=recommendation_listing_page&source_ref=${propertyDetailRef}`
                  : '?source_type=web_result'
                : '')
        }
        style={{ display: 'block', position: 'relative' }}
      >
        {props.children}
      </a>
    )
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width <= 1024
})

const mapDispatchToProps = dispatch => {
  return {
    homeRunnerActions: bindActionCreators(homeRunnerActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withSizes(mapSizesToProps)(PropertyListItemNew))
