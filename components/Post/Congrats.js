import React from 'react'
import useTranslation from 'next-translate/useTranslation'

const Congrats = ({ onClose, styles }) => {
  const { t } = useTranslation('common')
  return (
    <div className={`row  ${styles['congrats-popup']}`}>
      <div className='col-xs-12 col-md-3 text-center' />
      <div className='col-xs-12 col-md-6 text-center'>
        <div className={styles['shadow-box']} style={{ borderRadius: 15 }}>
          <div style={{ position: 'relative' }}>
            <button type='button' onClick={onClose} className={styles['close']}>
              ×
            </button>
          </div>
          <div className='row'>
            <div className='col-xs-4 col-md-2 text-center'>
              <img src='/img/IC_LISTING LIVE.png' width={274} alt='' />
            </div>
            <div className={`col-xs-8 col-md-10  ${styles['col-des']}`}>
              <strong className={styles['content-title']}>
                {t('post:congratulation_heading')}
              </strong>
              <p>{t('post:congratulation_text1')}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='col-xs-12 col-md-4 text-center' />
    </div>
  )
}

export default Congrats
