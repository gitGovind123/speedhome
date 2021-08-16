import React from 'react'
import useTranslation from 'next-translate/useTranslation'

const PaymentFAQ = ({ isMalaysian, isEnglish, isChinese, styles }) => {
  const { t } = useTranslation('common')
  return (
    <>
      <h3 className={styles['landloard-faq__heading--border']}>
        {t('learn:landlord_faq_payment')}
      </h3>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_new_1')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_new_1_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_new_1_2')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_new_1_3')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          <i>{t('learn:landlord_faq_ans_new_1_4')}</i>
        </p>
        <p className={styles['landloard__ans--faq']}>
          <i>{t('learn:landlord_faq_ans_new_1_5')}</i>
        </p>
        <p className={styles['landloard__ans--faq']}>
          <i>{t('learn:landlord_faq_ans_new_1_6')}</i>
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_20')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_20')}
        </p>
        {isMalaysian && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/llfaq4_malay'}
            alt='Short term rental cost for landlord in SPEEDHOME'
          />
        )}
        {isChinese && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/llfaq4_chinese'}
            alt='Short term rental cost for landlord in SPEEDHOME'
          />
        )}
        {isEnglish && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/llfaq6'}
            alt='Short term rental cost for landlord in SPEEDHOME'
          />
        )}
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_21')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_21')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_22')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_22_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_22_2')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_23')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_23')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_24')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_24_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_24_2')}
        </p>
        {isMalaysian && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/llfaq7.png'}
            alt='For Basic and Extended Landlord payment expectation'
          />
        )}
        {isChinese && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/llfaq7.png'}
            alt='For Basic and Extended Landlord payment expectation'
          />
        )}
        {isEnglish && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/llfaq7.png'}
            alt='For Basic and Extended Landlord payment expectation'
          />
        )}
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_24_3')}
        </p>
        {isMalaysian && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/llfaq8.png'}
            alt='For Extended+ Landlord payment expectation'
          />
        )}
        {isChinese && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/llfaq8.png'}
            alt='For Extended+ Landlord payment expectation'
          />
        )}
        {isEnglish && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/llfaq8.png'}
            alt='For Extended+ Landlord payment expectation'
          />
        )}
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_24_4')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_24_5')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_24_6')}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>*</span>
          <span
            dangerouslySetInnerHTML={{
              __html: t('learn:footnote_text', {
                interpolation: { escapeValue: false }
              })
            }}
          />
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_25')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_25')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_26')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_26_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_26_2')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_26_3')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_27')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_27')}
        </p>
      </details>
    </>
  )
}

export default PaymentFAQ
