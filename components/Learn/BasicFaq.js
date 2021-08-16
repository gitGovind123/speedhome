import React from 'react'
import useTranslation from 'next-translate/useTranslation'

const BasicFAQ = ({ isMalaysian, isEnglish, isChinese, styles }) => {
  const { t } = useTranslation('common')
  return (
    <>
      <h3 className={styles['landloard-faq__heading--border']}>
        {t('learn:landlord_faq_basic')}
      </h3>

      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_4')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_4_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_4_2')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_4_3')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_4_4')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_4_5')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          <i>{t('learn:landlord_faq_ans_4_6')}</i>
        </p>
        <p className={styles['landloard__ans--faq']}>
          <i>{t('learn:landlord_faq_ans_4_7')}</i>
        </p>
        <p className={styles['landloard__ans--faq']}>
          <i>{t('learn:landlord_faq_ans_4_8')}</i>
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_5')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_5_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_5_2')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_5_3')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_5_4')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_6')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          <span
            dangerouslySetInnerHTML={{
              __html: t('learn:landlord_faq_ans_6_1', {
                interpolation: { escapeValue: false }
              })
            }}
          />
        </p>
        <p className={styles['landloard__ans--faq']}>
          <span
            dangerouslySetInnerHTML={{
              __html: t('learn:landlord_faq_ans_6_2', {
                interpolation: { escapeValue: false }
              })
            }}
          />
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_7')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_7')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_8')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_8_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_8_2')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_8_3')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_8_4')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_8_5')}
        </p>
        <p style={{ fontStyle: 'italic' }}>
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
          {t('learn:landlord_faq_ques_9')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_9_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_9_2')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_9_3')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_9_4')}
        </p>
      </details>
      <details>
        <summary
          data-testId='faq_what_to_do_at_viewing_appointment'
          className={styles['landloard__faq-qus']}
        >
          {t('learn:landlord_faq_ques_10')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {/* {t('learn:landlord_faq_ans_10_1')} */}
          <span
            dangerouslySetInnerHTML={{
              __html: t('learn:landlord_faq_ans_10_1', {
                interpolation: { escapeValue: false }
              })
            }}
          />
        </p>
        {isMalaysian && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/llfaq1_malay.png'}
            alt='What is homerunners, How SPEEDHOME’s homerunners works'
          />
        )}
        {isChinese && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/llfaq1_chinese.png'}
            alt='What is homerunners, How SPEEDHOME’s homerunners works'
          />
        )}
        {isEnglish && (
          <img
            className={styles['landlord_ans--faq-img']}
            src={'/img/llfaq1.png'}
            alt='What is homerunners, How SPEEDHOME’s homerunners works'
          />
        )}
        <p className={styles['landloard__ans--faq']}>
          {/* {t('learn:landlord_faq_ans_10_2')} */}
          <span
            dangerouslySetInnerHTML={{
              __html: t('learn:landlord_faq_ans_10_2', {
                interpolation: { escapeValue: false }
              })
            }}
          />
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_10_3')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_10_4')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_11')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_11_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_11_2')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_11_3')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          <span
            dangerouslySetInnerHTML={{
              __html: t('learn:landlord_faq_ans_11_4', {
                interpolation: { escapeValue: false }
              })
            }}
          />
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_11_5')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_11_6')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_11_7')}{' '}
          <a href='mailto:hello@speedhome.com'>hello@speedhome.com</a>.
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_12')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_12_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlor_faq_ans_12_app')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_12_2')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_12_3')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_12_4')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_12_5')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_12_6')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_12_7')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_12_8')}
        </p>
      </details>
      <details>
        <summary className={styles['landloard__faq-qus']}>
          {t('learn:landlord_faq_ques_13')}
        </summary>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_Faq_ans_13_1')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_13_2')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_13_3')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_13_4')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_13_5')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_13_6')}
        </p>
        <p className={styles['landloard__ans--faq']}>
          {t('learn:landlord_faq_ans_13_7')}
        </p>
        <p style={{ fontStyle: 'italic' }}>
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
    </>
  )
}

export default BasicFAQ
