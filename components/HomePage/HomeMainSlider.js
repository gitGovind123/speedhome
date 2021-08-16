import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Slider from 'react-slick'
import { getFlashSalesDetails } from '../../utils/utils'

import Image from 'next/image'

const HomeMainSlider = ({
  styles,
  slideData,
  sliderSettings,
  searchActiveSliderImage,
  APP_URL,
  isMobile
}) => {
  const [sliderData, setSliderData] = useState(slideData)

  useEffect(() => {
    const flashSalesData = getFlashSalesDetails()
    flashSalesData.then(res => {
      if (res?.offerIsActive) {
        setFlashSaleBanner(res)
      }
    })
  }, [])

  const setFlashSaleBanner = res => {
    const flashSaleBanner = isMobile
      ? res.homepageBannerMobile
      : res.homepageBannerWeb
    let updatedSliderData = [...sliderData]
    if (flashSaleBanner) {
      updatedSliderData.unshift({
        label: res.offerPrice === 399 ? 'JULY_SALE' : 'JULY_FLASH_SALE',
        value: flashSaleBanner
      })
      setSliderData(updatedSliderData)
    }
  }

  return (
    <section className={styles['visual-slider-block']}>
      <Container className={styles['container']}>
        <Slider
          {...sliderSettings}
          className={`${styles['slider-standard']} slider_with_next_div`}
        >
          {sliderData.map((campaign, index) => {
            return (
              <div className={`${styles['slick-slide']}`} key={index}>
                <img
                  loading='lazy'
                  key={index}
                  onClick={() => {
                    if (campaign.label === 'JULY_SALE') {
                      window.open(
                        'https://speedhome.com/blog/speedhomes-rm-100-discount/?utm_source=SPEEDHOME_Website&utm_medium=Slider_Banner&utm_campaign=JULY100OFF',
                        '_blank'
                      )
                    } else if (campaign.label === 'JULY_FLASH_SALE') {
                      window.open(
                        '/rent/kuala-lumpur/highrise?&min=2000&max=2400&presetFilter=true',
                        '_blank'
                      )
                    } else {
                      searchActiveSliderImage(campaign)
                    }
                  }}
                  src={campaign.value}
                  style={{ cursor: 'pointer' }}
                  alt='img'
                  layout='fill'
                  q={100}
                />
                {campaign.label === 'APP' && (
                  <div className={styles['app-link-btn']}>
                    <div className={styles['app-download-link']}>
                      <a target={'_blank'} href={APP_URL} id='appStoreBtn'>
                        <Image
                          loading='lazy'
                          src='/img/appStore.png'
                          width={128}
                          height={32}
                        />
                      </a>
                      <a target={'_blank'} href={APP_URL} id='googlePlayBtn'>
                        <Image
                          loading='lazy'
                          src='/img/googlePlay.png'
                          width={128}
                          height={32}
                        />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </Slider>
      </Container>
    </section>
  )
}

export default HomeMainSlider
