import React, { useEffect, useState } from 'react'
import styles from './PropertyZeroDepositItemCard.module.scss'
import { useRouter } from 'next/router'
import RentalBiddingPopup from './RentalBiddingPopup.js'
const APP_URL = 'https://speedhome.app.link/rentpage'
import { getFlashSalesDetails, triggerGTAG } from '../../utils/utils'

const triggerBiddingGTAG = () => {
  triggerGTAG({
    event: 'bidding_notification'
  })
}

const PropertyZeroDepositItemCard = props => {
  const router = useRouter()
  const [openPopup, setOpenPopup] = useState(false)
  const [bannerImage, setBannerImage] = useState(null)
  const [salesType, setSalesType] = useState(null)

  useEffect(() => {
    const flashSalesData = getFlashSalesDetails()
    flashSalesData.then(res => {
      if (res?.offerIsActive) {
        setFlashSaleBanner(res)
      }
    })
  }, [])

  const setFlashSaleBanner = res => {
    const flashSaleBanner = props.isMobile
      ? res.resultPageBannerMobile
      : res.resultPageBannerWeb
    if (flashSaleBanner) {
      setBannerImage(flashSaleBanner)
      setSalesType(res.offerPrice === 399 ? 'JULY_SALE' : 'JULY_FLASH_SALE')
    }
  }

  const handleOpenPopUp = () => {
    setOpenPopup(true)
  }
  const handleClosePopUp = () => {
    setOpenPopup(false)
  }

  if (!router.asPath.includes('/rental-bidding')) {
    return (
      <div
        className={`${styles['PropertyList__item--wrapper']} ${styles['PropertyList__item--wrapper__zeroDeposit']}`}
      >
        <card className={styles['Propertylist__item__card']}>
          <div
            className={styles['Propertylist__item__cover']}
            style={{
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              height: '100%'
            }}
          >
            <img
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                top: 0,
                left: 0,
                borderRadius: '.25rem',
                cursor: 'pointer'
              }}
              onClick={() => {
                if (salesType === 'JULY_SALE') {
                  window.open(
                    'https://speedhome.com/blog/speedhomes-rm-100-discount/?utm_source=SPEEDHOME_Website&utm_medium=Slider_Banner&utm_campaign=JULY100OFF',
                    '_blank'
                  )
                } else if (salesType === 'JULY_FLASH_SALE') {
                  return
                } else {
                  window.location.href = '/rental-bidding'
                }
              }}
              src={bannerImage ? bannerImage : '/img/rental_building_btn.jpg'}
              alt='download app'
            />
          </div>
        </card>
      </div>
    )
  } else {
    return (
      <>
        <div
          className={`${styles['PropertyList__item--wrapper']} ${styles['PropertyList__item--wrapper__zeroDeposit']}`}
        >
          <card className={styles['Propertylist__item__card']}>
            <div
              className={styles['Propertylist__item__cover']}
              style={{
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                height: '100%'
              }}
            >
              <img
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  top: 0,
                  left: 0,
                  borderRadius: '.25rem',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  if (salesType === 'JULY_SALE') {
                    window.open(
                      'https://speedhome.com/blog/speedhomes-rm-100-discount/?utm_source=SPEEDHOME_Website&utm_medium=Slider_Banner&utm_campaign=JULY100OFF',
                      '_blank'
                    )
                  } else if (salesType === 'JULY_FLASH_SALE') {
                    return
                  } else {
                    handleOpenPopUp(), triggerBiddingGTAG()
                  }
                }}
                src={bannerImage ? bannerImage : '/img/rental-bidding.png'}
                alt='notify me'
              />
            </div>
          </card>
        </div>
        {openPopup && (
          <>
            <RentalBiddingPopup handleClosePopUp={handleClosePopUp} />
            <div
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                position: 'fixed',
                height: '100vh',
                width: '100vw',
                inset: 0,
                zIndex: 100,
                cursor: 'pointer'
              }}
              onClick={handleClosePopUp}
            ></div>
          </>
        )}
      </>
    )
  }
}

export default PropertyZeroDepositItemCard
