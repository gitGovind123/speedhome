import React from 'react'
import useTranslation from 'next-translate/useTranslation'

const OcdFAQ = props => {
  const { styles } = props
  const { t } = useTranslation('common')
  return (
    <>
      <h3 className={styles['landloard-faq__heading--border']}>
        {t('learn:landlord_faq_ocd')}
      </h3>

      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ocd_q_1')}
        </summary>
        <ol>
          <li>{t('learn:landlord_faq_ocd_q_1_ans_1')}</li>
          <li>{t('learn:landlord_faq_ocd_q_1_ans_2')}</li>
          <li>{t('learn:landlord_faq_ocd_q_1_ans_3')}</li>
        </ol>
        {/* <p className='landloard__ans--faq'>{t('learn:landlord_faq_ans_4_1')}</p> */}
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ocd_q_2')}
        </summary>

        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ocd_q_2_ans_1')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ocd_q_3')}
        </summary>

        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ocd_q_3_ans_1')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ocd_q_4')}
        </summary>

        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ocd_q_4_ans_1')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ocd_q_5')}
        </summary>

        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ocd_q_5_ans_1')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ocd_q_6')}
        </summary>

        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ocd_q_6_ans_1')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ocd_q_7')}
        </summary>

        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ocd_q_7_ans_1')}
          <b>{t('learn:landlord_faq_ocd_q_7_ans_2')}</b>
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ocd_q_8')}
        </summary>

        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ocd_q_8_ans_1')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ocd_q_9')}
        </summary>

        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ocd_q_9_ans_1')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ocd_q_10')}
        </summary>

        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ocd_q_10_ans_1')}
        </p>
      </details>
    </>
  )
}

export default OcdFAQ
