import React, { useState } from 'react'
import Slider from 'react-slick'
import ClearIcon from '@material-ui/icons/Clear'
import withSizes from 'react-sizes'
import { NextArrow, PrevArrow } from '../SliderArrow'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  lazyLoad: true,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  appendDots: dots => (
    <div
      style={{
        borderRadius: '10px',
        padding: '10px'
      }}
    >
      <ul
        style={{
          margin: '0px',
          position: 'absolute',
          width: '100%',
          left: '0',
          padding: 0
        }}
      >
        {dots}
      </ul>
    </div>
  ),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        dots: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false
      }
    }
  ]
}

const PropertyBannerImageCarosoul = props => {
  const {
    galleryArr,
    videos,
    openRestImageGallery,
    caption,
    styles,
    isMobile
  } = props
  const [mobilePopUpVideo, setMobilePopUpVideo] = useState({
    display: false,
    mediaURL: null
  })
  let meadiaArr = null

  if (videos && videos.length > 0) {
    meadiaArr = [...videos, ...galleryArr]
  } else {
    meadiaArr = galleryArr
  }

  return (
    <>
      <Slider {...settings}>
        {meadiaArr.map((media, index) => {
          return (
            <div
              data-testId='propertyDetailCarouselImage'
              key={media.id}
              onClick={e => openRestImageGallery(e, index)}
            >
              <div className={styles['propertyDetails__sliderInnerDiv']}>
                {media &&
                media.url &&
                media.url.includes('https://www.youtube.com') ? (
                  <>
                    {isMobile && (
                      <div
                        className='hideOnVideoIndex'
                        onClick={e => {
                          e.preventDefault()
                          e.stopPropagation()
                          setMobilePopUpVideo({
                            display: true,
                            mediaURL: media.url + '?autoplay=1'
                          })
                        }}
                      ></div>
                    )}
                    <iframe
                      // className={styles['embed-responsive-item']}
                      className={styles['propertyDetails__sliderInnerDiv--img']}
                      allowFullScreen
                      src={media && media.url}
                    ></iframe>
                  </>
                ) : (
                  <ImageWithFallback
                    styles={styles}
                    image={media}
                    caption={caption}
                  />
                )}
              </div>
            </div>
          )
        })}
      </Slider>
      {isMobile && mobilePopUpVideo.display && mobilePopUpVideo.mediaURL ? (
        <div className={styles['videoPlayBackModal']}>
          <div
            onClick={() => {
              setMobilePopUpVideo({ display: false, mediaURL: null })
            }}
            className={styles['videoPlayBackModal__closeBtn']}
          >
            <ClearIcon />
          </div>
          <div className={styles['videoPlayBackModal__iframe']}>
            <iframe
              frameborder='0'
              allow='autoplay'
              // className={styles['embed-responsive-item']}
              className={styles['propertyDetails__sliderInnerDiv--img']}
              allowFullScreen
              src={mobilePopUpVideo.mediaURL}
            ></iframe>
          </div>
        </div>
      ) : null}
    </>
  )
}

const ImageWithFallback = ({ image, caption, styles }) => {
  const [error, setError] = React.useState(false)

  return (
    <>
      <img
        alt={
          image && image.url && image.label
            ? `${caption} ${image.label}`
            : `${caption} image`
        }
        className={styles['propertyDetails__sliderInnerDiv--img']}
        src={error ? '/img/fallback.gif' : image.url}
        onError={() => setError(true)}
        loading='lazy'
        // width={screen.width}
        height={210}
      />
      {error && (
        <h4
          style={{
            position: 'relative',
            zIndex: 1000,
            bottom: '4rem',
            color: '#fff',
            textAlign: 'center'
          }}
        >
          Your image is still being processed
        </h4>
      )}
    </>
  )
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 540
})

export default withSizes(mapSizesToProps)(PropertyBannerImageCarosoul)
