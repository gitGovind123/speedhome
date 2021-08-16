import React from 'react'
import useTranslation from 'next-translate/useTranslation'

const ZeroDepositFAQ = ({ styles }) => {
  const { t } = useTranslation('common')
  return (
    <>
      <h3 className={styles['landloard-faq__heading--border']}>
        {t('learn:landlord_faq_zeroDeposit')}
      </h3>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_zeroDeposit_meaning')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_zeroDeposit_meaning_answer')}
        </p>
      </details>

      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_zeroDeposit_howWorks')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_zeroDeposit_howWorks_answer')}
        </p>
      </details>

      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_zeroDeposit_landlordBenifits')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_zeroDeposit_landlordBenifits_answer')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_zeroDeposit_cost')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_zeroDeposit_cost_answer')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          <i>{t('learn:landlord_faq_zeroDeposit_cost_answer_1')}</i>
        </p>
        <p className={styles['landloard__ans--faq']}>
          <i>{t('learn:landlord_faq_zeroDeposit_cost_answer_2')}</i>
        </p>
        <p className={styles['landloard__ans--faq']}>
          <i>{t('learn:landlord_faq_zeroDeposit_cost_answer_3')}</i>
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_zeroDeposit_trust')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_zeroDeposit_trust_answer')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {/* {t('learn:landlord_faq_zeroDeposit_trust_answer_2')}{' '} */}
          <iframe
            width='100%'
            height='420'
            src='https://www.youtube.com/embed/tBq_j0oc0Jk'
          ></iframe>
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_zeroDeposit_trust_answer_3')}{' '}
          <a
            href='https://speedhome.com/blog/category/transparency-report/'
            target='_blank'
          >
            {t('learn:landlord_faq_zeroDeposit_trust_answer_4')}
          </a>
        </p>
      </details>
    </>
  )
}

export default ZeroDepositFAQ
