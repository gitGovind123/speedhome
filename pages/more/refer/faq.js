import React from 'react'
import { connect } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { Container } from 'react-bootstrap'
import Link from 'next/link'
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import Head from '../../../components/Common/Head'
import BreadCrumb from '../../../components/Common/BreadCrumb'
import CONST from '../../../globalutilities/consts'

const title =
  'FAQ - SPEEDHOME Referral Program ' +
  new Date().getFullYear() +
  ' | Refer & Earn RM200'

const AskQuestion = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <Head
        title={title}
        description='Have questions about our referral program? Visit here to know how to redeem your reward and more!'
      />
      <main id='main' className='inner-pages'>
        <BreadCrumb breadCrumb={CONST.moreReferFaq} />
        <div className='static-content'>
          <Container>
            <div className='centered'>
              <div className='slot-main slot-v2'>
                <div className='inner'>
                  <div className='slot-main'>
                    <h2 style={{ marginBottom: 33, fontSize: '30px' }}>
                      <Link href={'/more/refer'}>
                        <a>
                          <ArrowLeft />
                        </a>
                      </Link>
                      &nbsp; {t('more:refer_ask_ques')}
                    </h2>
                    <strong className='content-title faq__ques--style'>
                      {t('more:referral_faq_1')}
                    </strong>
                    <p>
                      <span>{t('more:referral_faq_ans_1')}</span>
                    </p>
                    <strong className='content-title faq__ques--style'>
                      {t('more:referral_faq_2')}
                    </strong>
                    <p>
                      <span>{t('more:referral_faq_ans_2_1')}</span>
                    </p>
                    <strong className='content-title faq__ques--style'>
                      {t('more:referral_faq_3')}
                    </strong>
                    <p>{t('more:referral_faq_ans_3')}</p>
                    <strong className='content-title faq__ques--style'>
                      {t('more:referral_faq_4')}
                    </strong>
                    <p>{t('more:referral_faq_ans_4')}</p>
                    <strong className='content-title faq__ques--style'>
                      {t('more:referral_faq_5')}
                    </strong>
                    <p>{t('more:referral_faq_ans_5')}</p>
                    <strong className='content-title faq__ques--style'>
                      {t('more:referral_faq_6')}
                    </strong>
                    <p>{t('more:referral_faq_ans_6')}</p>
                    <strong className='content-title faq__ques--style'>
                      {t('more:referral_faq_new1')}
                    </strong>
                    <p>{t('more:referral_faq_new_ans1')}</p>
                    <p>{t('more:referral_faq_new_ans2')}</p>
                    <p>{t('more:referral_faq_new_ans3')}</p>
                    <p>{t('more:referral_faq_new_ans4')}</p>
                    <p>{t('more:referral_faq_new_ans5')}</p>
                    <p>{t('more:referral_faq_new_ans6')}</p>

                    <strong className='content-title faq__ques--style'>
                      {t('more:referral_faq_7')}
                    </strong>
                    <p>{t('more:referral_faq_ans_7')}</p>
                    <ul>
                      <li>{t('more:referral_faq_ans_7_1')}</li>
                      <li>{t('more:referral_faq_ans_7_2')}</li>
                      <li>{t('more:referral_faq_ans_7_3')}</li>
                      <li>{t('more:referral_faq_ans_7_4')}</li>
                      <li>{t('more:referral_faq_ans_7_5')}</li>
                      <li>{t('more:referral_faq_ans_7_6')}</li>
                      <li>{t('more:referral_faq_ans_7_7')}</li>
                      <li>{t('more:referral_faq_ans_7_8')}</li>
                      <li>{t('more:referral_faq_ans_7_9')}</li>
                    </ul>
                    <strong className='content-title faq__ques--style'>
                      {t('more:referral_faq_8')}
                    </strong>
                    <p>{t('more:referral_faq_ans_8')}</p>

                    <strong className='content-title faq__ques--style'>
                      {t('more:referral_faq_9')}
                    </strong>
                    <p>{t('more:referral_faq_ans_9')}</p>
                    <p>{t('more:referral_faq_ans_9_1')}</p>

                    <strong className='content-title faq__ques--style'>
                      {t('more:referral_faq_10')}
                    </strong>
                    <p>{t('more:referral_faq_ans_10')}</p>
                    <strong className='content-title faq__ques--style'>
                      {t('more:referral_faq_11')}
                    </strong>
                    <p>{t('more:referral_faq_ans_11')}</p>

                    <a
                      href='https://speedhome.com/blog/tenant-faq/?utm_source=hubspot&amp;utm_medium=blog&amp;__hstc=204954831.02e7744fa236493d634ac1cdd2c45478.'
                      target='_blank'
                      rel='noreferrer'
                    >
                      {t('more:referral_faq_learn_more')}
                    </a>
                    <i>{t('more:referral_faq_learn_more_1')}</i>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <a
                      style={{
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: '400px'
                      }}
                      href='https://speedhome.com/more/refer'
                    >
                      {t('more:referral_faq_refer_button')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </main>
    </>
  )
}

const mapStateToProps = state => ({
  language: state.language
})

export async function getServerSideProps () {
  return {}
}

export default connect(mapStateToProps)(AskQuestion)
