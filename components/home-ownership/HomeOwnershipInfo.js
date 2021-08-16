import React from 'react'
import useTranslation from 'next-translate/useTranslation'

const HomeOwnershipInfo = props => {
  const { data, styles } = props
  const { t } = useTranslation('common')

  return (
    <div className='col-xs-12 col-md-12 col-des'>
      <h1 className={styles['content-title']}>{data.name}</h1>
      <div className={styles['address']}>{data.city}</div>

      <div className={styles['price-wrapper']}>
        <div className={styles['price']}>{data.price}</div>
      </div>

      <div className={styles['detail-sqft-range']}>{data.sqft}</div>

      <div className={styles['big-note']}>
        <div className='top-s'>
          {t('home-ownership:enjoy_rm2000_worth_of_gifts')}
        </div>
      </div>

      <div
        className='sub-des'
        dangerouslySetInnerHTML={{ __html: data.info }}
      />

      <div className='sub-note'>
        <div className='slot-s'>
          <strong>{t('home-ownership:text_targeted_completion')}</strong> :
          {data.launch}
        </div>
      </div>
    </div>
  )
}

export default HomeOwnershipInfo
