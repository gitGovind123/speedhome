import React from 'react'
import useTranslation from 'next-translate/useTranslation'

const CoverFAQ = props => {
  const { styles } = props
  const { t } = useTranslation('common')
  return (
    <>
      <img
        className={styles['landlord__banner-img--position']}
        src={'/img/landlordfaqbanner.png'}
        alt='Landlord FAQ'
      />
      <div className={styles['landlord-faq__title-text']}>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_intro_text_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_intro_text_2')}
        </p>
      </div>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_1')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_1')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_2')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_2')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_3')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_3')}
        </p>
      </details>
    </>
  )
}

export default CoverFAQ
