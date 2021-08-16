import React from 'react'
import useTranslation from 'next-translate/useTranslation'

const RoomRentalFAQ = ({ styles }) => {
  const { t } = useTranslation('common')

  return (
    <>
      <h3 className={styles['landloard-faq__heading--border']}>
        {t('learn:landlord_faq_roomRental')}
      </h3>

      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_roomRental_collectDeposit')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_roomRental_collectDeposit_answer')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_roomRental_collectDepositUnder500')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_roomRental_collectDepositUnder500_answer')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_roomRental_collectDepositProtected')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_roomRental_collectDepositProtected_answer')}
        </p>
      </details>
    </>
  )
}

export default RoomRentalFAQ
