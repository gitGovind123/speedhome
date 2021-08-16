import React, { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import Slider from 'react-slick'
import { Container, Row, Col } from 'react-bootstrap'
import { withRouter } from 'next/router'
import PropertyListItem from '../PropertyList/PropertyListItem'
import { NextArrow, PrevArrow } from './SliderArrow'
import styles from './PropertyDetailRecommendedProperty.module.scss'
import withSizes from 'react-sizes'
import { getRecommendedProperties } from '../../actions'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  lazyLoad: true,
  arrows: true,
  nextArrow: <NextArrow rightPosition={true} />,
  prevArrow: <PrevArrow leftPosition={true} />,
  appendDots: dots => (
    <div
      style={{
        backgroundColor: '#ddd',
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
          // backgroundColor: 'red',
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
      breakpoint: 776,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        dots: true
      }
    },
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true
      }
    }
  ]
}

const PropertyDetailRecommendedProperty = props => {
  const {
    handleRecommendedPropertiesChatReq,
    propertyRef,
    propertyId,
    isMobile
  } = props
  const [recommendedProperties, setRecommendedProperties] = useState([])
  const { t } = useTranslation('common')
  useEffect(() => {
    getRecommendedProperties(
      {
        propertyId: propertyId || '',
        pageSize: 6
      },
      {
        source_ref: propertyRef
      }
    ).then(res => {
      if (res.success) {
        handleRecommendedPropertiesChatReq(res)
        setRecommendedProperties(res?.data?.content)
      }
    })
  }, [])

  const getSliderContent = recommendedProperties => {
    return recommendedProperties.map((item, index) => (
      <div
        key={index}
        className={`${styles['pro-col']} ${styles['pro-grid']} col-xs-12 col-sm-4`}
      >
        <PropertyListItem
          isRecommendedPropertyItem={true}
          data={item}
          router={props.router}
          propertyDetailRef={propertyRef}
        />
      </div>
    ))
  }

  if (recommendedProperties.length > 0) {
    return (
      <div id='recommendProperties'>
        <Container>
          <Row>
            <Col md={12}>
              <h4
                style={{
                  fontSize: '22px'
                }}
              >
                {t('property-details:text_property_recommended')}
              </h4>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col
              md={12}
              style={{
                marginTop: '1rem'
              }}
            >
              {recommendedProperties.length <= 3 && !isMobile ? (
                <div style={{ display: 'flex' }}>
                  {getSliderContent(recommendedProperties)}
                </div>
              ) : (
                <Slider {...settings}>
                  {getSliderContent(recommendedProperties)}
                </Slider>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
  return null
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 776
})

export default withRouter(
  withSizes(mapSizesToProps)(PropertyDetailRecommendedProperty)
)
