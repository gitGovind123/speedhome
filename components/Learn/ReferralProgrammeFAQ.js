import React from 'react'
import useTranslation from 'next-translate/useTranslation'

import { connect } from 'react-redux'
const ReferralProgrammeFAQ = props => {
  const { styles } = props
  const { t } = useTranslation('common')
  return (
    <div className={styles['ReferralProgrammeFAQ_main']}>
      <h3 className={styles['landloard-faq__heading--border']}>
        {t('learn:landlord_faq_referral')}
      </h3>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_referral_q1')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_referral_q1_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_referral_q1_2')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_referral_q1_3')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_referral_q1_4')}
          <a href='https://speedhome.com/more/refer' target='_blank'>
            https://speedhome.com/more/refer
          </a>{' '}
          {t('learn:landlord_faq_referral_q1_5')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_referral_q1_6')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_referral_q1_7')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_referral_q1_8')}
        </summary>
        <ul>
          <li>{t('learn:landlord_faq_referral_q1_8_1')}</li>
          <li>{t('learn:landlord_faq_referral_q1_8_2')}</li>
          <li>{t('learn:landlord_faq_referral_q1_8_3')}</li>
          <li>
            {t('learn:landlord_faq_referral_q1_8_4')}
            <ul>
              <li>{t('learn:landlord_faq_referral_q1_8_5')}</li>
              <li>{t('learn:landlord_faq_referral_q1_8_6')}</li>
              <li>{t('learn:landlord_faq_referral_q1_8_7')}</li>
              <li>{t('learn:landlord_faq_referral_q1_8_8')}</li>
              <li>{t('learn:landlord_faq_referral_q1_8_9')}</li>
              <li>{t('learn:landlord_faq_referral_q1_8_10')}</li>
              <li>{t('learn:landlord_faq_referral_q1_8_11')}</li>
              <li>{t('learn:landlord_faq_referral_q1_8_12')}</li>
              <li>{t('learn:landlord_faq_referral_q1_8_13')}</li>
              <li>{t('learn:landlord_faq_referral_q1_8_14')}</li>
              <li>{t('learn:landlord_faq_referral_q1_8_15')}</li>
            </ul>
          </li>
          <li>{t('learn:landlord_faq_referral_q1_9_1')}</li>
          <li>{t('learn:landlord_faq_referral_q1_9_2')}</li>
          <li>
            {t('learn:landlord_faq_referral_q1_9_3')}
            <ul>
              <li>{t('learn:landlord_faq_referral_q1_9_3_1')}</li>
              <li>{t('learn:landlord_faq_referral_q1_9_3_2')}</li>
              <li>{t('learn:landlord_faq_referral_q1_9_3_3')}</li>
            </ul>
          </li>
          <li>{t('learn:landlord_faq_referral_q1_9_4')}</li>
          <li>
            {t('learn:landlord_faq_referral_q1_9_5')}
            <a href='mailto:hello@speedhome.com' target='_blank'>
              hello@speedhome.com
            </a>
            {props.language === 'zh' ? '通知SPEEDHOME。' : null}
          </li>
          <li>{t('learn:landlord_faq_referral_q1_9_6')}</li>
          <li>{t('learn:landlord_faq_referral_q1_9_7')}</li>
        </ul>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_referral_q1_10')}
        </summary>
        <ul>
          <li>{t('learn:landlord_faq_referral_q1_10_1')}</li>
          <li>{t('learn:landlord_faq_referral_q1_10_2')}</li>
          <li>{t('learn:landlord_faq_referral_q1_10_3')}</li>
          <li>{t('learn:landlord_faq_referral_q1_10_4')}</li>
          <li>{t('learn:landlord_faq_referral_q1_10_5')}</li>
          <li>{t('learn:landlord_faq_referral_q1_10_6')}</li>
          <li>{t('learn:landlord_faq_referral_q1_10_7')}</li>
          <li>{t('learn:landlord_faq_referral_q1_10_8')}</li>
          <li>{t('learn:landlord_faq_referral_q1_10_9')}</li>
          <li>{t('learn:landlord_faq_referral_q1_10_10')}</li>
          <li>{t('learn:landlord_faq_referral_q1_10_11')}</li>
          <li>{t('learn:landlord_faq_referral_q1_10_12')}</li>
          <li>{t('learn:landlord_faq_referral_q1_10_13')}</li>
          {props.language === 'my' ? (
            <>
              <li>{t('learn:landlord_faq_referral_q1_10_13_extra_1')}</li>
              <li>{t('learn:landlord_faq_referral_q1_10_13_extra_2')}</li>
            </>
          ) : null}

          <li>
            {t('learn:landlord_faq_referral_q1_10_14')}
            <ul>
              <li>{t('learn:landlord_faq_referral_q1_10_14_1')}</li>
              <li>{t('learn:landlord_faq_referral_q1_10_14_2')}</li>
              <li>{t('learn:landlord_faq_referral_q1_10_14_3')}</li>
            </ul>
          </li>
          <li>{t('learn:landlord_faq_referral_q1_10_15')}</li>
          <li>
            {t('learn:landlord_faq_referral_q1_10_16')}
            {''}
            <a target='_blank' href='mailto:hello@speedhome.com'>
              hello@speedhome.com
            </a>
            {props.language === 'zh' ? '通知SPEEDHOME。' : null}
          </li>
          <li>{t('learn:landlord_faq_referral_q1_10_17')}</li>
          <li>{t('learn:landlord_faq_referral_q1_10_18')}</li>
        </ul>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_referral_q2')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_referral_q2_ans')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_referral_q3')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_referral_q3_ans')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_referral_q4')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_referral_q4_ans')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_referral_q5')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_referral_q5_ans')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_referral_q6')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_referral_q6_ans')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_referral_q7')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_referral_q7_ans')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_referral_q8')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_referral_q8_ans')}
          <ol>
            <li>{t('learn:landlord_faq_referral_q8_ans_1')}</li>
            <li>{t('learn:landlord_faq_referral_q8_ans_2')}</li>
            <li>{t('learn:landlord_faq_referral_q8_ans_3')}</li>
            <li>{t('learn:landlord_faq_referral_q8_ans_4')}</li>
            <li>{t('learn:landlord_faq_referral_q8_ans_5')}</li>
          </ol>
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_referral_q9')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_referral_q9_ans')}
          <ul>
            <li>{t('learn:landlord_faq_referral_q9_ans_1')}</li>
            <li>{t('learn:landlord_faq_referral_q9_ans_2')}</li>
            <li>{t('learn:landlord_faq_referral_q9_ans_3')}</li>
            <li>{t('learn:landlord_faq_referral_q9_ans_4')}</li>
            <li>{t('learn:landlord_faq_referral_q9_ans_5')}</li>
            <li>{t('learn:landlord_faq_referral_q9_ans_6')}</li>
            <li>{t('learn:landlord_faq_referral_q9_ans_7')}</li>
          </ul>
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_referral_q10')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_referral_q10_ans')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_referral_q11')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_referral_q11_ans_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_referral_q11_ans_2')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_referral_q12')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_referral_q12_ans')}
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

export default connect(mapStateToProps, null)(ReferralProgrammeFAQ)
