import React from 'react'

import useTranslation from 'next-translate/useTranslation'

const HomeOwnerShipBottomBtn = ({ styles, openPopup }) => {
  const { t } = useTranslation('common')
  return (
    <div className={styles['stick-on-bottom']}>
      <div className='container' onClick={() => openPopup('showInfoPopup')}>
        <a
          className={styles['txt-offer']}
          style={{ color: '#fff', cursor: 'pointer' }}
        >
          {t(
            'home-ownership:text_click_on_the_button_to_get_the_project_brochure'
          )}
        </a>
        <a
          className={`chat-btn btn btn-secondary-filled btn-curv ${styles['btn-big']}  info-popup`}
        >
          {t('home-ownership:text_i_want_to_know_more')}
        </a>
      </div>
    </div>
  )
}

export default HomeOwnerShipBottomBtn
