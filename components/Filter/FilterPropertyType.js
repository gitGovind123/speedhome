import React from 'react'
import useTranslation from 'next-translate/useTranslation'

const FilterPropertyType = props => {
  const { page, changeUrl, url, styles } = props
  const { t } = useTranslation('common')

  if (page === '') {
    return (
      <div className='form-group input-wrap housing-type-single'>
        <div id='filterRentBuy' style={{ padding: '6px' }}>
          <div className={styles['rentnav']}>
            <a
              id='btnFilterRent'
              className={
                url === 'rent'
                  ? `${styles['rent']} ${styles['active']}`
                  : styles['rent']
              }
              onClick={() => changeUrl('rent')}
            >
              {t('text_rent')}
            </a>
            <a
              id='btnFilterBuy'
              className={
                url === 'buy'
                  ? `${styles['buy']} ${styles['active']}`
                  : styles['buy']
              }
              onClick={() => changeUrl('buy')}
            >
              {t('text_buy')}
            </a>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default FilterPropertyType
