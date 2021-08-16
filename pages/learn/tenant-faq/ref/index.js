import React from 'react'

import { Container } from 'react-bootstrap'
import useTranslation from 'next-translate/useTranslation'
import { withRouter } from 'next/router'

import Link from 'next/link'

import styles from '../../learnIndex.module.scss'

const TenantFaq = props => {
  const lang = props.router.locale || 'en'
  const [isMalaysian, isChinese] = [lang === 'my', lang === 'zh']
  const isEnglish = !isMalaysian && !isChinese
  const { t } = useTranslation('common')
  return (
    <div>
      <Container>
        {lang == 'en' ? (
          <div className={styles['commonLanguageforten']}>
            <Link href='/learn/tenant-faq' locale='my'>
              <a className={styles['submenuForLanguage']}>Versi Bahasa</a>
            </Link>
            <Link href='/learn/tenant-faq' locale='zh'>
              <a className={styles['submenuForLanguage']}>阅读中文版</a>
            </Link>
          </div>
        ) : lang == 'my' ? (
          <div className={styles['commonLanguagefortenmy']}>
            <Link href='/learn/tenant-faq' locale='en'>
              <a className={styles['submenuForLanguage']}>English Version</a>
            </Link>
            <Link href='/learn/tenant-faq' locale='zh'>
              <a className={styles['submenuForLanguage']}>阅读中文版</a>
            </Link>
          </div>
        ) : lang == 'zh' ? (
          <div className={styles['commonLanguagefortenzn']}>
            <Link href={'/learn/tenant-faq'} locale='en'>
              <a className={styles['submenuForLanguage']}>English Version</a>
            </Link>
            <Link href='/learn/tenant-faq' locale='my'>
              <a className={styles['submenuForLanguage']}>Versi Bahasa</a>
            </Link>
          </div>
        ) : null}
        <div className={styles['landlord__root--position']}>
          <img
            className={styles['landlord__banner-img--position']}
            src={'/img/tenantfaqbanner.png'}
            alt='tenant-faq-banner'
          />
          <div className={styles['landlord-faq__title-text']}>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_intro_text_1')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_intro_text_2')}{' '}
              <a
                href='mailto:hello@speedhome.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                hello@speedhome.com{' '}
              </a>
              {t('learn:tenant_faq_intro_text_3')}
            </p>
          </div>
          <h3 className={styles['landloard-faq__heading--border']}>
            {t('learn:tenant_faq_basic')}
          </h3>

          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_1')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_1_1')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_1_2')}
            </p>
            {isMalaysian && (
              <img
                className={styles['landlord_ans--faq-img']}
                src={'/img/process_of_renting_bm.png'}
                alt='How SPEEDHOME works when you are looking for houses for rent with direct owner'
              />
            )}
            {isChinese && (
              <img
                className={styles['landlord_ans--faq-img']}
                src={'/img/process_of_renting_zh.png'}
                alt='How SPEEDHOME works when you are looking for houses for rent with direct owner'
              />
            )}
            {isEnglish && (
              <img
                className={styles['landlord_ans--faq-img']}
                src={'/img/process_of_renting_en.png'}
                alt='How SPEEDHOME works when you are looking for houses for rent with direct owner'
              />
            )}
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_1_3')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_2')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_2')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_3')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_3')}
            </p>
            {isMalaysian && (
              <img
                className={styles['landlord_ans--faq-img']}
                src={'/img/ttfaq2_malay.png'}
                alt='Short term rental charges for tenant in SPEEDHOME'
              />
            )}
            {isChinese && (
              <img
                className={styles['landlord_ans--faq-img']}
                src={'/img/ttfaq2_chinese.png'}
                alt='Short term rental charges for tenant in SPEEDHOME'
              />
            )}
            {isEnglish && (
              <img
                className={styles['landlord_ans--faq-img']}
                src={'/img/ttfaq2.png'}
                alt='Short term rental charges for tenant in SPEEDHOME'
              />
            )}
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_4')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_4')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_5')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_5_1')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_5_2')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_5_3')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_5_4')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_5_5')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_6')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_6_1')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_6_2')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_6_3')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_6_4')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_6_5')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_6_6')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_6_7')}
            </p>
          </details>

          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_7')}
            </summary>

            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_7_1')}
            </p>

            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_7_2')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_8')}
            </summary>

            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_8_1')}
            </p>

            <p className={styles['landloard__ans--faq']}>
              {/* {t('learn:tenant_faq_ans_8_2')}{' '} */}
              <span
                dangerouslySetInnerHTML={{
                  __html: t('learn:tenant_faq_ans_8_2', {
                    interpolation: { escapeValue: false }
                  })
                }}
              />
              {/* <a href='https://speedmanage.com/' target='_bank'> SPEEDMANAGE </a> */}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_8_3')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_8_4')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_8_5')}
            </p>

            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_8_6')}{' '}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_8_7')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_9')}
            </summary>

            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_9')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_10')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_10_1')}{' '}
              <a href='https://speedmanage.com/' target='_bank'>
                SPEEDMANAGE
              </a>{' '}
              {t('learn:tenant_faq_ans_10_2')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_11')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_11')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_12')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_12')}
            </p>
          </details>

          <h3 className={styles['landloard-faq__heading--border']}>
            {t('learn:tenant_faq_zero_deposit')}
          </h3>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_zero_deposit_1')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_zero_deposit_1')}
            </p>
          </details>

          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_zero_deposit_2')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_zero_deposit_2')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_zero_deposit_3')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_zero_deposit_3')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_zero_deposit_4')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_zero_deposit_4')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              <i>{t('learn:tenant_faq_ans_zero_deposit_4_1')}</i>
            </p>
            <p className={styles['landloard__ans--faq']}>
              <i>{t('learn:tenant_faq_ans_zero_deposit_4_2')}</i>
            </p>
            <p className={styles['landloard__ans--faq']}>
              <i>{t('learn:tenant_faq_ans_zero_deposit_4_3')}</i>
            </p>
          </details>

          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_zero_deposit_5')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_zero_deposit_5_1')}
            </p>
            <iframe
              className={`${styles['landloard__ans--faq']} ${styles['iframe-size']}`}
              src='https://www.youtube.com/embed/DUZxwjrZIYo'
            ></iframe>
            <p className={styles['landloard__ans--faq']}>
              <span
                dangerouslySetInnerHTML={{
                  __html: t('learn:tenant_faq_ans_zero_deposit_5_3', {
                    interpolation: { escapeValue: false }
                  })
                }}
              />
            </p>
          </details>

          <h3 className={styles['landloard-faq__heading--border']}>
            {t('learn:rental_faq_room_rental')}
          </h3>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_13')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_13')}
            </p>
          </details>

          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_14')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_14_1')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_14_2')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_14_3')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_14_4')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_14_5')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_14_6')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_14_7')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_14_8')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_14_9')}
            </p>
          </details>
          <h3 className={styles['landloard-faq__heading--border']}>
            {t('learn:tanant_faq_payment')}
          </h3>

          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_15')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_15_1')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_15_2')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_15_3')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_15_4')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_16')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              <span
                dangerouslySetInnerHTML={{
                  __html: t('learn:tenant_faq_ans_16_1', {
                    interpolation: { escapeValue: false }
                  })
                }}
              />
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_16_2')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_17')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_17')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_new_1')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              <span
                dangerouslySetInnerHTML={{
                  __html: t('learn:tenant_faq_ans_new1_1', {
                    interpolation: { escapeValue: false }
                  })
                }}
              />
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_new1_2')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_18')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_18_1')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_18_2')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_18_3')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_18_4')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_18_5')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_18_6')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_new_2')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              <span
                dangerouslySetInnerHTML={{
                  __html: t('learn:tenant_faq_ans_new_2_1', {
                    interpolation: { escapeValue: false }
                  })
                }}
              />
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_new_3')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_new_3_1')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_new_3_2')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              <span
                dangerouslySetInnerHTML={{
                  __html: t('learn:tenant_faq_ans_new_3_3', {
                    interpolation: { escapeValue: false }
                  })
                }}
              />
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_new_3_4')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_new_3_5')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              <span
                dangerouslySetInnerHTML={{
                  __html: t('learn:tenant_faq_ans_new_3_6', {
                    interpolation: { escapeValue: false }
                  })
                }}
              />
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_19')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_19_1')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_19_2')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_19_3')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_19_4')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_19_5')}
            </p>
            {isMalaysian && (
              <img
                className={styles['landlord_ans--faq-img']}
                src={'/img/ttfaq2_malay.png'}
                alt='short term rental charges for tenant in SPEEDHOME'
              />
            )}
            {isChinese && (
              <img
                className={styles['landlord_ans--faq-img']}
                src={'/img/ttfaq2_chinese.png'}
                alt='short term rental charges for tenant in SPEEDHOME'
              />
            )}
            {isEnglish && (
              <img
                className={styles['landlord_ans--faq-img']}
                src={'/img/ttfaq2.png'}
                alt='short term rental charges for tenant in SPEEDHOME'
              />
            )}
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_19_6')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_20')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_20')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_21')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_21')}
            </p>

            {isMalaysian && (
              <img
                className={styles['landlord_ans--faq-img']}
                src={'/img/ttfaq2_malay.png'}
                alt='short term rental charges for tenant in SPEEDHOME'
              />
            )}
            {isChinese && (
              <img
                className={styles['landlord_ans--faq-img']}
                src={'/img/ttfaq2_chinese.png'}
                alt='short term rental charges for tenant in SPEEDHOME'
              />
            )}
            {isEnglish && (
              <img
                className={styles['landlord_ans--faq-img']}
                src={'/img/ttfaq2.png'}
                alt='short term rental charges for tenant in SPEEDHOME'
              />
            )}
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_22')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_22_1')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_22_2')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_22_3')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_22_4')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_22_5')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              <strong>{t('learn:tenant_faq_ans_22_6')}</strong>
            </p>
            <p
              className={
                styles['landloard__ans--faq landloard__ans--faq--flex']
              }
            >
              <div>
                <span style={{ display: 'inline-block', marginRight: '10px' }}>
                  {t('learn:tenant_faq_ans_22_7')}
                  {'  '}
                </span>
                <span style={{ display: 'inline-block' }}>
                  {' '}
                  {t('learn:tenant_faq_ans_22_8')} <br></br>{' '}
                  {t('learn:tenant_faq_ans_22_9')}
                </span>
              </div>
              <div>{t('learn:tenant_faq_ans_22_10')}</div>
            </p>
            <p className={styles['landloard__ans--faq']}>
              <strong>{t('learn:tenant_faq_ans_22_11')}</strong>
            </p>
            <p
              className={
                styles['landloard__ans--faq landloard__ans--faq--flex']
              }
            >
              <div>
                <span style={{ display: 'inline-block', marginRight: '10px' }}>
                  {t('learn:tenant_faq_ans_22_12')}
                </span>
                <span style={{ display: 'inline-block' }}>
                  {t('learn:tenant_faq_ans_22_13')} <br></br>
                  {t('learn:tenant_faq_ans_22_14')} <br></br>
                  {t('learn:tenant_faq_ans_22_15')}
                </span>
              </div>
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_23')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_23')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_24')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_24')}
            </p>
          </details>
          <h3 className={styles['landloard-faq__heading--border']}>
            {t('learn:tenant_faq_tenency_agreement')}
          </h3>

          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_25')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_25_1')}{' '}
              <a href='https://speedmanage.com/' target='_bank'>
                SPEEDMANAGE
              </a>{' '}
              {t('learn:tenant_faq_ans_25_2')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_25_3')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_26')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_26')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_27')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_27')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_28')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_28')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_29')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_29_1')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_29_2')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_29_3')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_29_4')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_30')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_30_1')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_30_2')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_31')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_31_1')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_31_2')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_31_3')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_31_4')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_31_5')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_31_6')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_31_7')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_31_8')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_31_9')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_31_10')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_32')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_32')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_33')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_33_1')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_33_2')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_33_3')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_33_4')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_33_5')}
            </p>
            <ol className={styles['list-style-type-alpha landloard__ans--faq']}>
              <li>{t('learn:tenant_faq_ans_33_5_a')}</li>
              <li>{t('learn:tenant_faq_ans_33_5_b')}</li>
            </ol>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_33_6')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_33_7')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_33_8')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_ques_34')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_34_1')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_34_2')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_34_3')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_34_4')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_34_5')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_ans_34_6')}
            </p>
          </details>
          <h3 className={styles['landloard-faq__heading--border']}>
            {t('learn:tenant_faq_referral_programme')}
          </h3>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_referral_programme_text_1')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_referral_programme_text_2')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_referral_programme_text_3')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_referral_programme_text_4')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              <span
                dangerouslySetInnerHTML={{
                  __html: t('learn:tenant_faq_referral_programme_text_5', {
                    interpolation: { escapeValue: false }
                  })
                }}
              />
            </p>
            <p className={styles['landloard__ans--faq']}>
              <span
                dangerouslySetInnerHTML={{
                  __html: t('learn:tenant_faq_referral_programme_text_6', {
                    interpolation: { escapeValue: false }
                  })
                }}
              />
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_referral_programme_text_7')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_referral_programme_text_8')}
            </summary>
            <ul className={styles['list-style-type-disc landloard__ans--faq']}>
              <li>{t('learn:tenant_faq_referral_programme_text_8_1')}</li>
              <li>{t('learn:tenant_faq_referral_programme_text_8_2')}</li>
              <li>{t('learn:tenant_faq_referral_programme_text_8_3')}</li>
              <li>{t('learn:tenant_faq_referral_programme_text_8_4')}</li>
              <ul className={styles['list-style-type-circle']}>
                <li>{t('learn:tenant_faq_referral_programme_text_8_4_1')}</li>
                <li>{t('learn:tenant_faq_referral_programme_text_8_4_2')}</li>
                <li>{t('learn:tenant_faq_referral_programme_text_8_4_3')}</li>
                <li>{t('learn:tenant_faq_referral_programme_text_8_4_4')}</li>
                <li>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: t(
                        'learn:tenant_faq_referral_programme_text_8_4_5',
                        {
                          interpolation: { escapeValue: false }
                        }
                      )
                    }}
                  />
                </li>
                <li>{t('learn:tenant_faq_referral_programme_text_8_4_6')}</li>
                <li>{t('learn:tenant_faq_referral_programme_text_8_4_7')}</li>
                <li>{t('learn:tenant_faq_referral_programme_text_8_4_8')}</li>
                <li>{t('learn:tenant_faq_referral_programme_text_8_4_9')}</li>
                <li>{t('learn:tenant_faq_referral_programme_text_8_4_10')}</li>
                <li>{t('learn:tenant_faq_referral_programme_text_8_4_11')}</li>
              </ul>
              <li>{t('learn:tenant_faq_referral_programme_text_8_5')}</li>
              <li>{t('learn:tenant_faq_referral_programme_text_8_6')}</li>
              <li>{t('learn:tenant_faq_referral_programme_text_8_7')}</li>
              <ul
                className={styles['list-style-type-circle landloard__ans--faq']}
              >
                <li>{t('learn:tenant_faq_referral_programme_text_8_7_1')}</li>
                <li>{t('learn:tenant_faq_referral_programme_text_8_7_2')}</li>
                <li>{t('learn:tenant_faq_referral_programme_text_8_7_3')}</li>
              </ul>
              <li>{t('learn:tenant_faq_referral_programme_text_8_8')}</li>
              <li>
                <span
                  dangerouslySetInnerHTML={{
                    __html: t('learn:tenant_faq_referral_programme_text_8_9', {
                      interpolation: { escapeValue: false }
                    })
                  }}
                />
              </li>
              <li>{t('learn:tenant_faq_referral_programme_text_8_10')}</li>
              <li>{t('learn:tenant_faq_referral_programme_text_8_11')}</li>
            </ul>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_referral_programme_text_9')}
            </summary>
            <ul className={styles['list-style-type-disc landloard__ans--faq']}>
              <li>{t('learn:tenant_faq_referral_programme_text_9_1')}</li>
              <li>{t('learn:tenant_faq_referral_programme_text_9_2')}</li>
              <li>{t('learn:tenant_faq_referral_programme_text_9_3')}</li>
              <li>{t('learn:tenant_faq_referral_programme_text_9_4')}</li>
              <li>{t('learn:tenant_faq_referral_programme_text_9_5')}</li>
              <li>{t('learn:tenant_faq_referral_programme_text_9_6')}</li>
              <li>{t('learn:tenant_faq_referral_programme_text_9_7')}</li>
              <li>{t('learn:tenant_faq_referral_programme_text_9_8')}</li>
              <li>
                <span
                  dangerouslySetInnerHTML={{
                    __html: t('learn:tenant_faq_referral_programme_text_9_9', {
                      interpolation: { escapeValue: false }
                    })
                  }}
                />
              </li>
              <li>{t('learn:tenant_faq_referral_programme_text_9_10')}</li>
              <li>{t('learn:tenant_faq_referral_programme_text_9_11')}</li>
              <li>{t('learn:tenant_faq_referral_programme_text_9_12')}</li>
              <li>{t('learn:tenant_faq_referral_programme_text_9_13')}</li>
              {isMalaysian && (
                <>
                  <li>
                    {t('learn:tenant_faq_referral_programme_text_9_13_1')}
                  </li>
                  <li>
                    {t('learn:tenant_faq_referral_programme_text_9_13_2')}
                  </li>
                </>
              )}

              <li>{t('learn:tenant_faq_referral_programme_text_9_14')}</li>
              <ul className={styles['list-style-type-circle']}>
                <li>{t('learn:tenant_faq_referral_programme_text_9_14_1')}</li>
                <li>{t('learn:tenant_faq_referral_programme_text_9_14_2')}</li>
                <li>{t('learn:tenant_faq_referral_programme_text_9_14_3')}</li>
              </ul>
              <li>{t('learn:tenant_faq_referral_programme_text_9_15')}</li>
              <li>
                <span
                  dangerouslySetInnerHTML={{
                    __html: t('learn:tenant_faq_referral_programme_text_9_16', {
                      interpolation: { escapeValue: false }
                    })
                  }}
                />
              </li>
              <li>{t('learn:tenant_faq_referral_programme_text_9_17')}</li>
              <li>{t('learn:tenant_faq_referral_programme_text_9_18')}</li>
            </ul>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_referral_programme_qsn_1')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_referral_programme_ans_1')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_referral_programme_qsn_2')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_referral_programme_ans_2')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_referral_programme_qsn_3')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_referral_programme_ans_3')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_referral_programme_qsn_4')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_referral_programme_ans_4')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_referral_programme_qsn_5')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_referral_programme_ans_5')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_referral_programme_qsn_6')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_referral_programme_ans_6')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_referral_programme_qsn_7')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_referral_programme_ans_7')}
            </p>
            <ol
              className={styles['list-style-type-decimal landloard__ans--faq']}
            >
              <li>{t('learn:tenant_faq_referral_programme_ans_7_1')}</li>
              <li>{t('learn:tenant_faq_referral_programme_ans_7_2')}</li>
              <li>{t('learn:tenant_faq_referral_programme_ans_7_3')}</li>
              <li>{t('learn:tenant_faq_referral_programme_ans_7_4')}</li>
              <li>{t('learn:tenant_faq_referral_programme_ans_7_5')}</li>
            </ol>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_referral_programme_qsn_8')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_referral_programme_ans_8')}
            </p>
            <ul className={styles['list-style-type-disc landloard__ans--faq']}>
              <li>{t('learn:tenant_faq_referral_programme_ans_8_1')}</li>
              <li>{t('learn:tenant_faq_referral_programme_ans_8_2')}</li>
              <li>{t('learn:tenant_faq_referral_programme_ans_8_3')}</li>
              <li>{t('learn:tenant_faq_referral_programme_ans_8_4')}</li>
              <li>{t('learn:tenant_faq_referral_programme_ans_8_5')}</li>
              <li>{t('learn:tenant_faq_referral_programme_ans_8_6')}</li>
              <li>{t('learn:tenant_faq_referral_programme_ans_8_7')}</li>
            </ul>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_referral_programme_qsn_9')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_referral_programme_ans_9')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_referral_programme_qsn_10')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_referral_programme_ans_10_1')}
            </p>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_referral_programme_ans_10_2')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_referral_programme_qsn_11')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_referral_programme_ans_11')}
            </p>
          </details>

          <h3 className={styles['landloard-faq__heading--border']}>
            {t('learn:tenant_faq_booking_terms_conditions')}
          </h3>
          <p>{t('learn:tenant_faq_booking_terms_conditions_text_1')}</p>
          <p>{t('learn:tenant_faq_booking_terms_conditions_text_2')}</p>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_booking_terms_conditions_text_3')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_booking_terms_conditions_text_3_1')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_booking_terms_conditions_text_4')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_booking_terms_conditions_text_4_1')}
            </p>
            <ol className={styles['list-style-type-alpha']}>
              <li>
                {t('learn:tenant_faq_booking_terms_conditions_text_4_1_1')}
              </li>
              <li>
                {t('learn:tenant_faq_booking_terms_conditions_text_4_1_2')}
              </li>
              <li>
                {t('learn:tenant_faq_booking_terms_conditions_text_4_1_3')}
              </li>
              <li>
                {t('learn:tenant_faq_booking_terms_conditions_text_4_1_4')}
              </li>
            </ol>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_booking_terms_conditions_text_4_2')}
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_booking_terms_conditions_text_5')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              <span
                dangerouslySetInnerHTML={{
                  __html: t(
                    'learn:tenant_faq_booking_terms_conditions_text_5_1',
                    {
                      interpolation: { escapeValue: false }
                    }
                  )
                }}
              />
            </p>
          </details>
          <details>
            <summary className={styles['landloard__faq-qus']}>
              {t('learn:tenant_faq_booking_terms_conditions_text_6')}
            </summary>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_booking_terms_conditions_text_6_1')}
            </p>
            <ol className={styles['list-style-type-alpha']}>
              <li>
                {t('learn:tenant_faq_booking_terms_conditions_text_6_1_1')}
              </li>
              <li>
                {t('learn:tenant_faq_booking_terms_conditions_text_6_1_2')}
              </li>
              <li>
                {t('learn:tenant_faq_booking_terms_conditions_text_6_1_3')}
              </li>
              <li>
                <span
                  dangerouslySetInnerHTML={{
                    __html: t(
                      'tenant_faq_booking_terms_conditions_text_6_1_4',
                      {
                        interpolation: { escapeValue: false }
                      }
                    )
                  }}
                />
              </li>
              <li>
                {t('learn:tenant_faq_booking_terms_conditions_text_6_1_5')}
              </li>
              <li>
                {t('learn:tenant_faq_booking_terms_conditions_text_6_1_6')}
              </li>
            </ol>
            <p className={styles['landloard__ans--faq']}>
              {t('learn:tenant_faq_booking_terms_conditions_text_7')}
            </p>
          </details>
          <p style={{ marginTop: '30px' }}>
            <b>{t('learn:tenant_faq_booking_terms_conditions_text_8')}</b>
          </p>
          <p
            className={styles['landloard__ans--faq']}
            style={{ textAlign: 'center' }}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: t('learn:tenant_faq_booking_terms_conditions_text_9', {
                  interpolation: { escapeValue: false }
                })
              }}
            />
          </p>
          <p>
            <small>
              <em>{t('learn:tenant_faq_booking_terms_conditions_text_10')}</em>
            </small>
          </p>
        </div>
      </Container>
    </div>
  )
}
export default withRouter(TenantFaq)
