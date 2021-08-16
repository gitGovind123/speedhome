import React from 'react'
import useTranslation from 'next-translate/useTranslation'

const TenancyFAQ = ({ styles }) => {
  const { t } = useTranslation('common')
  return (
    <>
      <h3 className={styles['landloard-faq__heading--border']}>
        {t('learn:landlord_faq_tenancy')}
      </h3>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_28')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_28_1_1')}{' '}
          <a href='https://speedmanage.com/' target='_bank'>
            SPEEDMANAGE
          </a>{' '}
          {t('learn:landlord_faq_ans_28_1_2')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_29')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_29_1_1')}{' '}
          <a href='https://speedmanage.com/' target='_bank'>
            SPEEDMANAGE
          </a>
          {t('learn:landlord_faq_ans_29_1_2')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_30')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_30')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_31')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_31')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_32')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_32')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_33')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_33_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_33_2')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_33_3')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_33_4')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_34')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_34_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_34_2')}
        </p>
      </details>
    </>
  )
}

export default TenancyFAQ
