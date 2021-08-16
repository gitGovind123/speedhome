import React, { useState } from 'react'
import dayjs from 'dayjs'
import useTranslation from 'next-translate/useTranslation'

import { priceSplit, getRoomTypeLabel } from '../../globalutilities/helpers'
import MobileToolTip from '../PropertyList/MobileToolTip'
import withSizes from 'react-sizes'

import Icon from '../Common/Icons/Icons'
import styles from './PropertyDetailsInfo.module.scss'
import FlashSalesSticker from '../FlashSales/flashSalesSticker'

const PropertyDetailsInfo = props => {
  const { propertyData, isMobile } = props
  const [mobileToolTip, setMobileToolTip] = useState(false)
  const [mobileToolTipContent, setMobileToolTipContent] = useState(null)
  const { t } = useTranslation('common')

  const openMobileToolTip = (title, content) => {
    setMobileToolTipContent({ title, content })
    setMobileToolTip(true)
  }

  const boostExpiry = propertyData.boostExpiry
    ? dayjs(propertyData.boostExpiry).format('YYYY-MM-DD')
    : ''
  let roomType = getRoomTypeLabel(propertyData.roomType)

  const today = dayjs(new Date()).format('YYYY-MM-DD')

  const Capitalize = str => {
    return str && str.length > 0
      ? str.charAt(0).toUpperCase() + str.slice(1)
      : ''
  }

  const _displayFurnishType = furnishType => {
    let type = ''
    if (furnishType) {
      if (furnishType === 'NONE') {
        type = t('text_unfurnished')
      } else if (furnishType === 'FULL') {
        type = t('text_fully_furnished')
      } else if (furnishType === 'PARTIAL') {
        type = t('text_parital_furnished')
      }
    }
    return type
  }

  const displayPorpertyType = propertyType => {
    let type = ''
    if (propertyType) {
      if (propertyType === 'LANDED') {
        type = t('text_landed')
      } else if (propertyType === 'HIGHRISE') {
        type = t('text_hightrise')
      } else if (propertyType === 'ROOM') {
        type = t('text_room')
      } else if (propertyType === 'LANDED_SALE') {
        type = t('text_landed_sale')
      } else if (propertyType === 'HIGHRISE_SALE') {
        type = t('text_hightrise_sale')
      }
    }
    return type
  }

  const getFlashMessageWithLanguage = () => {
    switch (props.router.locale) {
      case 'en':
        return props.flashEventInfo?.textFlashBannerEn
      case 'my':
        return props.flashEventInfo?.textFlashBannerMy
      case 'zh':
        return props.flashEventInfo?.textFlashBannerZh
      default:
        break
    }
  }

  return (
    <>
      <section className={styles['propertyDetails__priceWrapper']}>
        <div className={styles['price--container']}>
          <div className={styles['price--container--wrap']}>
            <h2>
              {['LANDED_SALE', 'HIGHRISE_SALE'].indexOf(propertyData.type) ===
              -1
                ? `RM ${priceSplit(propertyData.price)}/month`
                : `RM ${priceSplit(propertyData.price)}`}
            </h2>
            {boostExpiry && dayjs(boostExpiry).unix() >= dayjs(today).unix() ? (
              <span>New Listing</span>
            ) : null}
          </div>
        </div>
        {isMobile && (
          <MobileToolTip
            closeToolTip={setMobileToolTip}
            isOpen={mobileToolTip}
            content={mobileToolTipContent}
          />
        )}

        <div className={styles['zeroDeposit--container']}>
          {propertyData.noDeposit ? (
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
              className={styles['propertyDetailToolTipInit']}
            >
              <img
                loading='lazy'
                src='/img/zeroDeposit.png'
                alt='zeroDepositImg'
              />
              <div className={`${styles['propetyDetailToolTip']}`}>
                <div className={`${styles['propetyDetailItemToolTipContent']}`}>
                  <div
                    className={styles['propetyDetailItemToolTipContent__title']}
                  >
                    Zero Deposit
                  </div>
                  <div
                    className={
                      styles['propetyDetailItemToolTipContent__content']
                    }
                  >
                    You are not required to pay any deposit for Zero Deposit
                    units.
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {propertyData.videos && propertyData.videos.length > 0 ? (
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
              className={styles['propertyDetailToolTipInit']}
            >
              <img
                loading='lazy'
                src={'/img/icon-contactless.svg'}
                alt='contactlessViewImg'
              />
              <div className={`${styles['propetyDetailToolTip']}`}>
                <div className={`${styles['propetyDetailItemToolTipContent']}`}>
                  <div
                    className={styles['propetyDetailItemToolTipContent__title']}
                  >
                    Virtual Viewing
                  </div>
                  <div
                    className={
                      styles['propetyDetailItemToolTipContent__content']
                    }
                  >
                    Virtual Viewing is available for this unit. Watch the video
                    or arrange for a video call.
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className={styles['propertyDetails__infoWrapper']}>
        {props.isFlashSalesActive ? (
          <div className={styles['propertyDetails__flashSale__wrap']}>
            <span className={styles['propertyDetails__infoWrapper--wholeUnit']}>
              {propertyData.type === 'ROOM' ? 'Room ' : 'Whole Unit '}
            </span>
            <FlashSalesSticker
              styles={styles}
              message={getFlashMessageWithLanguage()}
            />
          </div>
        ) : (
          <span className={styles['propertyDetails__infoWrapper--wholeUnit']}>
            {propertyData.type === 'ROOM' ? 'Room ' : 'Whole Unit '}
          </span>
        )}

        <h4 className={styles['propertyDetails__infoWrapper--name']}>
          {propertyData.name}
        </h4>
        <p className={styles['propertyDetails__infoWrapper--address']}>
          {propertyData.address}
        </p>
        <div
          className={
            styles['propertyDetails__infoWrapper--propertyInfo--container']
          }
        >
          <div
            className={
              styles['propertyDetails__infoWrapper--propertyInfo--block']
            }
          >
            <Icon icon='highrise' size={'medium'} black />
            <span>{Capitalize(displayPorpertyType(propertyData.type))}</span>
          </div>
          <div
            className={
              styles['propertyDetails__infoWrapper--propertyInfo--block']
            }
          >
            <Icon icon='straighten' size={'medium'} black />
            <span>
              {roomType !== '' ? roomType : `${propertyData.sqft} sqft`}
            </span>
          </div>
          <div
            className={
              styles['propertyDetails__infoWrapper--propertyInfo--block']
            }
          >
            {propertyData.furnishType === 'NONE' ? (
              <Icon icon='weekend' size={'medium'} grey />
            ) : (
              <Icon icon='weekend' size={'medium'} black />
            )}

            <span>{_displayFurnishType(propertyData.furnishType)}</span>
          </div>
          <div
            className={
              styles['propertyDetails__infoWrapper--propertyInfo--block']
            }
          >
            <Icon icon='detailsHotel' size={'medium'} black />
            <span>
              {roomType !== ''
                ? '1 bedroom'
                : propertyData.bedroom
                ? parseInt(propertyData.bedroom) > 0
                  ? `${propertyData.bedroom} bedrooms`
                  : '1 bedroom'
                : '1 bedroom'}
            </span>
          </div>
          <div
            className={
              styles['propertyDetails__infoWrapper--propertyInfo--block']
            }
          >
            <Icon icon='bathtub' size={'medium'} black />
            <span>
              {propertyData.bathroomType && propertyData.bathroomType !== null
                ? `${Capitalize(
                    propertyData.bathroomType.toLowerCase()
                  )} bathroom`
                : `${propertyData.bathroom} bathrooms`}
            </span>
          </div>
          <div
            className={
              styles['propertyDetails__infoWrapper--propertyInfo--block']
            }
          >
            {parseInt(propertyData.carpark) > 0 ? (
              <Icon icon='directionCar' size={'medium'} black />
            ) : (
              <Icon icon='directionCar' size={'medium'} grey />
            )}
            <span>{propertyData.carpark} carpark</span>
          </div>
        </div>
      </section>
    </>
  )
}
const mapSizesToProps = ({ width }) => ({
  isMobile: width <= 1024
})

export default withSizes(mapSizesToProps)(PropertyDetailsInfo)
