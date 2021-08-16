import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { MAP_API_KEY } from '../../env'
import { sendSearchTrackingActionLog } from '../../utils/utils'
import { useRouter } from 'next/router'
import styles from './PropertyDetailsAddress.module.scss'

const myLoader = ({ src }) => {
  return src
}
const PropertyDetailsAddress = props => {
  const { propertyData } = props
  const router = useRouter()
  const { t } = useTranslation('common')
  const lat = propertyData.latitude,
    lon = propertyData.longitude
  const hrefUrl = 'https://www.google.com/maps?z=12&t=m&q=' + lat + ',' + lon
  const imgInMapUrl =
    'https://maps.googleapis.com/maps/api/staticmap?center=' +
    lat +
    ',' +
    lon +
    '&zoom=14&size=1024x300&maptype=roadmap&markers=icon:https://speedhome.com/static/img/logo.png%7Clabel:S%7C' +
    lat +
    ',' +
    lon +
    `&key=${MAP_API_KEY}`

  let furnishingData = []
  let facilitiesData = []
  propertyData.furnishes &&
    propertyData.furnishes.map((item, index) =>
      furnishingData.push(t(`property-details:furnishing_${item}`))
    )
  propertyData.facilities &&
    propertyData.facilities.map((item, index) =>
      facilitiesData.push(t(`property-details:facilities_${item}`))
    )

  return (
    <>
      <section className={styles['propertyDetails__descWrapperCommon']}>
        <h6>{t('property-details:text_property_description')}</h6>
        {propertyData.description ? (
          <div>{propertyData.description}</div>
        ) : null}
      </section>
      <section className={styles['propertyDetails__descWrapperCommon']}>
        <h6>{t('property-details:text_property_furnishing')}</h6>
        {furnishingData && furnishingData.length > 0 ? (
          <div>{furnishingData.join()}</div>
        ) : null}
      </section>
      <section className={styles['propertyDetails__descWrapperCommon']}>
        <h6>{t('property-details:text_property_facilities')}</h6>
        {facilitiesData && facilitiesData.length > 0 ? (
          <div>{facilitiesData.join()}</div>
        ) : null}
      </section>
      <section className={styles['propertyDetails__descWrapperCommon']}>
        <h6>{t('property-details:text_property_accessibility')}</h6>
        <ul>
          {propertyData.pois &&
            propertyData.pois.map((item, index) => (
              <li key={index}>
                {item.name} - {item.distance} m
              </li>
            ))}
        </ul>
      </section>
      <section
        className={styles['propertyDetails__descWrapperCommon']}
        id={'scroll-to-element'}
      >
        <h6>{t('property-details:text_property_location')}</h6>
        <div className={styles['map__container']}>
          <a
            data-testId='listingPageMap'
            onClick={() => {
              sendSearchTrackingActionLog(
                'mapviewclick',
                propertyData?.ref,
                router?.query
              )
              window.open(hrefUrl, '_blank')
            }}
            target='_blank'
            href='#'
          >
            <img
              loader={myLoader}
              loading='lazy'
              border='0'
              src={imgInMapUrl}
              width={640}
              height={300}
            />
          </a>
        </div>
      </section>
    </>
  )
}

export default PropertyDetailsAddress
