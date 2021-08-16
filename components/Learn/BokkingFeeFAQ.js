import React from 'react'
import useTranslation from 'next-translate/useTranslation'

import { connect } from 'react-redux'

const BokkingFeeFAQ = props => {
  const { styles } = props
  const { t } = useTranslation('common')
  return (
    <div className={styles['BokkingFeeFAQ-main']}>
      <h3 className={styles['landloard-faq__heading--border']}>
        {t('learn:landlord_faq_booking')}
      </h3>
      <p className={styles['landloard__ans--faq']} style={{ marginLeft: 0 }}>
        {t('learn:landlord_faq_booking_q1_ans_1')}
      </p>
      <p className={styles['landloard__ans--faq']} style={{ marginLeft: 0 }}>
        {t('learn:landlord_faq_booking_q1_ans_2')}
      </p>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_booking_q2')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_booking_q2_ans_1')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_booking_q3')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_booking_q3_ans_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_booking_q3_ans_2')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_booking_q3_ans_3')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_booking_q3_ans_4')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_booking_q3_ans_5')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_booking_q3_ans_6')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_booking_q4')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_booking_q4_ans_1')}-{' '}
          <a target='_blank' href='http://speedmanage.com'>
            SPEEDMANAGE.
          </a>
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_booking_q5')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_booking_q5_ans_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_booking_q5_ans_2')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_booking_q5_ans_3')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_booking_q5_ans_4')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_booking_q5_ans_5')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_booking_q5_ans_6')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_booking_q5_ans_7')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_booking_q5_ans_8')}
        </p>
      </details>
    </div>
  )
}

const mapStateToProps = ({ language }) => {
  return {
    language: language
  }
}

export default connect(mapStateToProps, null)(BokkingFeeFAQ)
