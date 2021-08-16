import React from 'react'
import useTranslation from 'next-translate/useTranslation'

import styles from './StepsNavigation.module.scss'
const StepsNavigation = props => {
  const { activeStep } = props
  const { t } = useTranslation('common')
  return (
    <ul
      className={`${styles['progressbar']} ${styles['nav']} ${styles['nav-tabs']} ${styles['step-anchor']}`}
    >
      <li
        className={
          activeStep === 1
            ? `${styles['nav-item']} ${styles['active']}`
            : `${styles['nav-item']} ${styles['done']}`
        }
      >
        <a href='#step-1' aria-disabled='true' className={styles['nav-link']}>
          <span className={styles['num']}>1</span>
          {t('post:text_post_selection_1')}
        </a>
      </li>
      <li
        className={
          activeStep === 1
            ? styles['nav-item']
            : activeStep === 2
            ? `${styles['nav-item']} ${styles['active']}`
            : `${styles['nav-item']} ${styles['done']}`
        }
      >
        <a href='#step-2' aria-disabled='true' className={styles['nav-link']}>
          <span className={styles['num']}>2</span>
          {t('post:text_post_selection_2')}
        </a>
      </li>
      <li
        className={
          activeStep === 1
            ? styles['nav-item']
            : activeStep === 2
            ? styles['nav-item']
            : `${styles['nav-item']} ${styles['active']}`
        }
      >
        <a href='#step-3' aria-disabled='true' className={styles['nav-link']}>
          <span className={styles['num']}>3</span>
          {t('post:text_post_selection_3')}
        </a>
      </li>
    </ul>
  )
}

export default StepsNavigation
