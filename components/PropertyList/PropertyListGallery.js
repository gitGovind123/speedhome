import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'
import { withRouter } from 'next/router'
import withSizes from 'react-sizes'

const PropertyListGallery = props => {
  const {
    galleryArr,
    linkForProperty,
    router,
    isMobile,
    propertyName,
    styles,
    isBidAfterToday,
    mapViewModal,
    propertyDetailRef,
    isRecommendedPropertyItem
  } = props
  const [showCarousel, setShowCarousel] = useState(false)

  return (
    <CarouselGallery
      galleryArr={galleryArr}
      linkForProperty={linkForProperty}
      router={router}
      isMobile={isMobile}
      propertyName={propertyName}
      styles={styles}
      isBidAfterToday={isBidAfterToday}
      mapViewModal={mapViewModal}
      propertyDetailRef={propertyDetailRef}
      isRecommendedPropertyItem={isRecommendedPropertyItem}
    />
  )
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 767
})

export default withSizes(mapSizesToProps)(withRouter(PropertyListGallery))

const CarouselGallery = props => {
  const {
    galleryArr,
    linkForProperty,
    router,
    isMobile,
    propertyName,
    styles,
    isBidAfterToday,
    mapViewModal,
    propertyDetailRef,
    isRecommendedPropertyItem
  } = props

  const classNameForDiv = `${mapViewModal ? 'mapViewCar' : ''} ${
    styles['carosoul-div']
  } CarouselGallery_image_div ${
    isBidAfterToday ? styles['Propertylist__item__card__bidding__finished'] : ''
  }`

  return (
    <div className={classNameForDiv} onClick={e => e.preventDefault()}>
      <Carousel
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={isMobile ? false : true}
        // onClickThumb=
        // showIndicators={false}
        swipeScrollTolerance={50}
        onClickItem={() =>
          isBidAfterToday
            ? ''
            : window.open(
                linkForProperty +
                  (isRecommendedPropertyItem
                    ? `?source_type=recommendation_listing_page&source_ref=${propertyDetailRef}`
                    : '?source_type=web_result'),
                '_blank'
              )
        }
        axis='horizontal'
      >
        {galleryArr.map((image, i) => {
          return (
            <img
              key={i}
              alt={
                image && image.url && image.label
                  ? `${propertyName} ${image.label}`
                  : `${propertyName} image`
              }
              effect='blur'
              loading='lazy'
              // style={{
              //   width: '100%',
              //   height: '230px'
              // }}
              src={image && image.url ? image.url : ''}
              width={screen.width}
              height={230}
              className={
                mapViewModal
                  ? styles['Propertylist__item--map--cover--img']
                  : styles['Propertylist__item--cover--img']
              }
            />
          )
        })}
      </Carousel>
    </div>
  )
}
