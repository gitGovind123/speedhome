import React from 'react'

import useTranslation from 'next-translate/useTranslation'

import HomeOwnerShipDetailsMap from './HomeOwnerShipDetailsMap'
import { MAP_API_KEY } from '../../env'

const HomeOwnerShipDesc = props => {
  const { data, styles } = props
  const { t } = useTranslation('common')
  const getName = stringName => {
    return stringName
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ')
  }

  return (
    <div className='container'>
      <div className={styles['pro-detail-main']}>
        <div className='slot-main'>
          <h2>{t('home-ownership:text_property_description')}</h2>
          {data.description && (
            <div
              className='sub-des'
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          )}
        </div>

        <div className='slot-main'>
          <h2>{t('home-ownership:text_property_facilities')}</h2>
          <ul className='feature-main'>
            {data.facilities &&
              data.facilities.map((item, index) => (
                <li key={index}> {getName(item.replace('_', ' '))}</li>
              ))}
          </ul>
        </div>
        <br></br>
        <div className='slot-main'>
          <h2>{t('home-ownership:text_property_location')}</h2>
          <div className='maps'>
            <HomeOwnerShipDetailsMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${MAP_API_KEY}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `350px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              markers={[{ id: 0, latitude: data.lat, longitude: data.lng }]}
              centerCoords={{ lat: data.lat, lng: data.lng }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeOwnerShipDesc
