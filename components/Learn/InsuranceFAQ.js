import React from 'react'
import useTranslation from 'next-translate/useTranslation'

const InsuranceFAQ = ({ isMalaysian, isEnglish, isChinese, styles }) => {
  const { t } = useTranslation('common')

  return (
    <>
      <h3 className={styles['landloard-faq__heading--border']}>
        {t('learn:landlord_faq_insurance')}
      </h3>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_14')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_14_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_14_2')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_14_3')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_14_4')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_14_5')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_14_6')}
        </p>

        {isMalaysian && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/OCD_MALAY'}
            alt='SPEEDHOME Allianz partnership, home rental insurance plan, protect landlord property'
          />
        )}
        {isChinese && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/OCD_CH.png'}
            alt='SPEEDHOME Allianz partnership, home rental insurance plan, protect landlord property'
          />
        )}

        {isEnglish && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/OCD_ENG'}
            alt='SPEEDHOME Allianz partnership, home rental insurance plan, protect landlord property'
          />
        )}

        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_14_7')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_14_8')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_14_9')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_14_10')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_14_11')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          <i>{t('learn:landlord_faq_ans_14_12')}</i>
        </p>
        <p className={styles['landloard__ans--faq']}>
          <i>{t('learn:landlord_faq_ans_14_12_1')}</i>
        </p>
        <p className={styles['landloard__ans--faq']}>
          <i>{t('learn:landlord_faq_ans_14_12_2')}</i>
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_14_13')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          <span style={{ fontWeight: 'bold' }}>
            {t('learn:landlord_faq_note1')}
          </span>{' '}
          {t('learn:landlord_faq_ans_14_14')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          <span style={{ fontWeight: 'bold' }}>
            {t('learn:landlord_faq_note2')}
          </span>{' '}
          {t('learn:landlord_faq_ans_14_15')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          <strong style={{ fontWeight: 'bold' }}>
            {t('learn:landlord_faq_note3')}
          </strong>
          <span
            dangerouslySetInnerHTML={{
              __html: t('learn:landlord_faq_ans_14_16', {
                interpolation: { escapeValue: false }
              })
            }}
          />
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_15')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_15')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_16')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_16_1')}
        </p>
        <p
          className={styles['landloard__ans--faq']}
          style={{ fontWeight: 'bold' }}
        >
          {t('learn:landlord_faq_ans_new')}
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
            src={'/img/llfaq4'}
            alt='Short term rental cost for landlord in SPEEDHOME'
          />
        )}
        <p className={styles['landloard__ans--faq']}>
          <span>{t('learn:landlord_faq_note1')}</span>
          {t('learn:landlord_faq_ans_16_2')}
        </p>

        <p className={styles['landloard__ans--faq']}>
          <span>{t('learn:landlord_faq_note2')}</span>
          {t('learn:landlord_faq_ans_16_3')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_17')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_17_1')}
        </p>
        {isMalaysian && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/llfaq2_malay.png'}
            alt='If you rented out your house with speedhome, this table that shows time taken to issue a claim'
          />
        )}
        {isChinese && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/llfaq2_chinese'}
            alt='If you rented out your house with speedhome, this table that shows time taken to issue a claim'
          />
        )}
        {isEnglish && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/llfaq2.png'}
            alt='If you rented out your house with speedhome, this table that shows time taken to issue a claim'
          />
        )}
        <p className={styles['landloard__ans--faq']}>
          {/* {t('learn:landlord_faq_ans_17_2')} */}
          <span
            dangerouslySetInnerHTML={{
              __html: t('learn:landlord_faq_ans_17_2', {
                interpolation: { escapeValue: false }
              })
            }}
          />
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_18')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_18_1')}
        </p>
        {isMalaysian && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/llfaq5_malay'}
            alt='How to claim from SPEEDHOME home rental insurance if you rent out houses with speedhome'
          />
        )}
        {isChinese && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/llfaq5_chinese'}
            alt='How to claim from SPEEDHOME home rental insurance if you rent out houses with speedhome'
          />
        )}
        {isEnglish && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/llfaq5'}
            alt='How to claim from SPEEDHOME home rental insurance if you rent out houses with speedhome'
          />
        )}
        <p className={styles['landloard__ans--faq']}>
          {/* {t('learn:landlord_faq_ans_18_2')} */}
          <span
            dangerouslySetInnerHTML={{
              __html: t('learn:landlord_faq_ans_18_2', {
                interpolation: { escapeValue: false }
              })
            }}
          />
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_18_3')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_19')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_19')}
        </p>
      </details>
    </>
  )
}

export default InsuranceFAQ
