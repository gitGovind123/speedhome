import React from 'react'
import styles from './PropertyListStatus.module.scss'

const PropertyListStatus = props => {
  const {
    listStattus,
    propertyList,
    propertyName,
    typeName,
    locationName,
    handleOpenAlertModal
  } = props

  const renderHeading = (propertyName, typeName, locationName) => {
    let label = ''
    if (typeName === 'rent') {
      switch (locationName.toLowerCase()) {
        case 'petaling-jaya':
          label = `${propertyName} Rental ${locationName.replace(/[-]/g, ' ')}`
          break
        case 'ara-damansara':
          label = `${propertyName} Rental ${locationName.replace(/[-]/g, ' ')}`
          break
        case 'damansara':
          label = `${propertyName} Rental ${locationName.replace(/[-]/g, ' ')}`
          break
        case 'old-klang-road':
          label = `${propertyName} Rental ${locationName.replace(/[-]/g, ' ')}`
          break

        case 'shah-alam':
          label = `${locationName.replace(/[-]/g, ' ')} ${propertyName} Rental `
          break
        case 'bandar-utama':
          label = `${locationName.replace(/[-]/g, ' ')} ${propertyName} Rental `
          break
        case 'bukit-jalil':
          label = `${locationName.replace(/[-]/g, ' ')} ${propertyName} Rental `
          break
        case 'gombak':
          label = `${locationName.replace(/[-]/g, ' ')} ${propertyName} Rental `
          break
        case 'wangsa-maju':
          label = `${locationName.replace(/[-]/g, ' ')} ${propertyName} Rental `
          break
        default:
          label = `${propertyName} for ${typeName} ${locationName.replace(
            /[-]/g,
            ' '
          )}`
          break
      }
    } else {
      label = `${propertyName}  ${typeName} ${locationName.replace(
        /[-]/g,
        ' '
      )}`
    }
    return (
        <span>{label}</span>
    )
  }

  if (listStattus) {
    return (
      <div className={styles['rented-out']}>
        <div className={styles['rented-out__content']}>
          <div className={styles['content-one']}>We are sorry.</div>
          <div className={styles['content-two']}>
            This property has been rented out.
          </div>
          <div className={styles['content-three']}>
            We have similar properties for you to check.
          </div>
        </div>
        <img
          className={styles['rented-out__img']}
          src='/img/rentedout.png'
          alt='rentedout'
          width={321}
          height={200}
        />
      </div>
    )
  } else {
    return (
      <h1
        className={styles['content-main-heading']}
        style={{ display: 'inline-block', marginBottom: '20px' }}>
        {renderHeading(propertyName, typeName, locationName)} (
                      {propertyList.totalElements}){' '}
      </h1>
    )
  }
}

export default PropertyListStatus
