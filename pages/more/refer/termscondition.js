import React from 'react'
import { connect } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { Container } from 'react-bootstrap'
import Link from 'next/link'
import ArrowLeft from '@material-ui/icons/ArrowLeft'

import Head from '../../../components/Common/Head'
import BreadCrumb from '../../../components/Common/BreadCrumb'
import CONST from '../../../globalutilities/consts'

const TermsCondition = () => {
  const { t } = useTranslation('common')
  return (
    <React.Fragment>
      <Head title={t('company_info_title')} />
      <main id='main' className='inner-pages'>
        <BreadCrumb breadCrumb={CONST.moreReferTerms} />
        <div className='static-content'>
          <Container>
            <div className=''>
              <div className='slot-main slot-v2'>
                <div className='inner'>
                  <div className='slot-main'>
                    <h2 style={{ marginBottom: 33, fontSize: '30px' }}>
                      <Link href={t('link_more_refer')}>
                        <a>
                          <ArrowLeft
                            style={{
                              height: '2rem',
                              width: '2rem'
                            }}
                          />
                        </a>
                      </Link>
                      &nbsp; {t('more:refer_terms_condition')}
                    </h2>
                    <p>
                      <b>{t('more:referral_tc_1')}</b>
                    </p>
                    <p style={{ marginBottom: '0px' }}>
                      {t('more:referral_tc_2')}
                    </p>
                    {t('more:referral_tc_3')}
                    <p>{t('more:referral_tc_4')}</p>
                    <p>
                      {t('more:referral_tc_5')}
                      <Link href={t('link_more_refer')}>
                        <a>speedhome.com/more/refer</a>
                      </Link>
                      {t('more:referral_tc_5_1')}
                    </p>

                    <p
                      dangerouslySetInnerHTML={{
                        __html: t('more:referral_tc_6', {
                          interpolation: { escapeValue: false }
                        })
                      }}
                    ></p>
                    <p>{t('more:referral_tc_7')}</p>
                    <b>{t('more:referral_tc_head')}</b>
                    <ul style={{ lineHeight: 3 }}>
                      <li>{t('more:referral_tc_7_1')}</li>
                      <li>{t('more:referral_tc_7_2')}</li>
                      <li>{t('more:referral_tc_7_3')}</li>

                      <li>
                        {t('more:referral_tc_7_4')}
                        <ul style={{ listStyleType: 'circle' }}>
                          <li>{t('more:referral_tc_7_4_1')}</li>
                          <li>{t('more:referral_tc_7_4_2')}</li>
                          <li>{t('more:referral_tc_7_4_3')}</li>
                          <li>{t('more:referral_tc_7_4_4')}</li>
                          <li
                            dangerouslySetInnerHTML={{
                              __html: t('more:referral_tc_7_4_5', {
                                interpolation: { escapeValue: false }
                              })
                            }}
                          ></li>
                          <li>{t('more:referral_tc_7_4_6')}</li>
                          <li>{t('more:referral_tc_7_4_7')}</li>
                          <li>{t('more:referral_tc_7_4_8')}</li>
                          <li>{t('more:referral_tc_7_4_9')}</li>
                          <li>{t('more:referral_tc_7_4_10')}</li>
                          <li>{t('more:referral_tc_7_4_11')}</li>
                        </ul>
                      </li>
                      <li>{t('more:referral_tc_7_5')}</li>
                      <li>{t('more:referral_tc_7_6')}</li>
                      <li>
                        {t('more:referral_tc_7_7')}
                        <ul style={{ listStyleType: 'circle' }}>
                          <li>{t('more:referral_tc_7_7_1')}</li>
                          <li>{t('more:referral_tc_7_7_2')}</li>
                          <li>{t('more:referral_tc_7_7_3')}</li>
                        </ul>
                      </li>
                      <li>{t('more:referral_tc_7_8')}</li>
                      <li>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: t('more:referral_tc_7_9', {
                              interpolation: { escapeValue: false }
                            })
                          }}
                        />
                      </li>
                      <li>{t('more:referral_tc_7_10')}</li>
                      <li>{t('more:referral_tc_7_11')}</li>
                    </ul>
                    <b>{t('more:refferal_tc_7_12')}</b>
                    <ul style={{ lineHeight: 3 }}>
                      <li>{t('more:refferal_tc_7_13')}</li>
                      <li>{t('more:refferral_tc_7_14')}</li>
                      <li>{t('more:refferral_tc_7_15')}</li>
                      <li>{t('more:refferral_tc_7_16')}</li>
                      <li>{t('more:refferral_tc_7_17')}</li>
                      <li
                        dangerouslySetInnerHTML={{
                          __html: t('more:refferral_tc_7_18', {
                            interpolation: { escapeValue: false }
                          })
                        }}
                      ></li>
                      <li>{t('more:refferral_tc_7_19')}</li>
                      <li>{t('more:refferral_tc_7_20')}</li>
                      <li>{t('more:refferral_tc_7_21')}</li>
                      <li>{t('more:refferral_tc_7_22')}</li>
                      <li>{t('more:refferral_tc_7_23')}</li>
                      <li>{t('more:refferral_tc_7_24')}</li>
                      <li>{t('more:refferral_tc_7_25')}</li>
                      <li>
                        {t('more:refferral_tc_7_26')}
                        <ul style={{ listStyleType: 'circle' }}>
                          {t('more:refferral_tc_7_26_1') != '' ? (
                            <li>{t('more:refferral_tc_7_26_1')}</li>
                          ) : null}
                          {t('more:refferral_tc_7_26_2') != '' ? (
                            <li>{t('more:refferral_tc_7_26_2')}</li>
                          ) : null}
                          {t('more:refferral_tc_7_26_3') != '' ? (
                            <li>{t('more:refferral_tc_7_26_3')}</li>
                          ) : null}
                        </ul>
                      </li>
                      <li>{t('more:refferral_tc_7_27')}</li>
                      <li>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: t('more:refferral_tc_7_28', {
                              interpolation: { escapeValue: false }
                            })
                          }}
                        />

                        <ul style={{ listStyleType: 'circle' }}>
                          {t('more:refferral_tc_7_28_1') != '' ? (
                            <li>{t('more:refferral_tc_7_28_1')}</li>
                          ) : null}
                          {t('more:refferral_tc_7_28_2') != '' ? (
                            <li>{t('more:refferral_tc_7_28_2')}</li>
                          ) : null}
                          {t('more:refferral_tc_7_28_3') != '' ? (
                            <li>{t('more:refferral_tc_7_28_3')}</li>
                          ) : null}
                        </ul>
                      </li>
                      <li>{t('more:refferral_tc_7_29')}</li>
                      <li>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: t('more:refferral_tc_7_30', {
                              interpolation: { escapeValue: false }
                            })
                          }}
                        />
                      </li>

                      {t('more:refferral_tc_7_31') != '' ? (
                        <li>{t('more:refferral_tc_7_31')}</li>
                      ) : null}

                      {t('more:refferral_tc_7_32') != '' ? (
                        <li>{t('more:refferral_tc_7_32')}</li>
                      ) : null}
                    </ul>

                    <div style={{ textAlign: 'center' }}>
                      <a
                        style={{
                          textAlign: 'center',
                          fontSize: '18px',
                          fontWeight: '400px'
                        }}
                        href='https://speedhome.com/more/refer'
                      >
                        {t('more:referral_tc_refer_button')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </main>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  language: state.language
})

export async function getServerSideProps () {
  return {}
}

export default connect(mapStateToProps)(TermsCondition)
