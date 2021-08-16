import React from 'react'
import { connect } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { Container } from 'react-bootstrap'
import Link from 'next/link'
import Icon from '../../../components/Common/Icons/Icons'

import Head from '../../../components/Common/Head'
import BreadCrumb from '../../../components/Common/BreadCrumb'
import CONST from '../../../globalutilities/consts'

const LandlordHow = props => {
  const { t } = useTranslation('common')
  return (
    <React.Fragment>
      <Head title={t('more:how_it_works_title')} />
      <main id='main' className='inner-pages'>
        <BreadCrumb breadCrumb={CONST.moreLandlordHow} />
        <div className='page-main-title user-main-title'>
          <div className='container'>
            <h1>{t('more:how_it_works_title')}</h1>
          </div>
        </div>
        <div className='static-content'>
          <Container>
            <div className='slot-main'>
              <div className='row text-center'>
                <div className='col-sm-4 br-1'>
                  <div className='col-sm-12 box-header'>
                    <strong>
                      <span> {t('more:text_step_1')}: </span>
                      <span> {t('more:text_post')}</span>
                    </strong>
                  </div>
                  <p style={{ padding: 15 }}>
                    {t('more:text_more_landlord_how_step1')}
                  </p>
                  <p>
                    {/* {t('more:You can post as many listings as you like.')}   */}
                    {t('more:text_you_can_post_as_many_listings_as_you_like')}.
                  </p>
                </div>

                <div className='col-sm-4 br-1'>
                  <div className='col-sm-12 box-header'>
                    <strong>
                      <span> {t('more:text_step_2')}: </span>
                      <span>{t('more:text_chat')}</span>
                    </strong>
                  </div>
                  <p style={{ padding: 15 }}>
                    {t('more:text_more_landlord_how_step2')}
                  </p>
                  <p>{t('more:text_chat_r2c2')}</p>
                </div>

                <div className='col-sm-4 br-1'>
                  <div className='col-sm-12 box-header'>
                    <strong>
                      <span> {t('more:text_step_3')}: </span>
                      <span>{t('more:text_meet')}</span>
                    </strong>
                  </div>
                  <p style={{ padding: 15 }}>
                    <span>{t('more:text_more_landlord_how_step3')}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className='note-holder'>
              <div className='note'>
                <Icon icon='penNib' size={'small'} blue /> {'  '}
                {/* <i className="fas fa-pen-nib" /> */}
                <strong className='content-title'>
                  {t('more:text_note')} #1:
                </strong>
                <p>
                  <em>{t('more:text_viewing_yourself')} </em>
                  {/* <a href="mailto:hello@speedhome.com"><em>hello@speedhome.com</em></a>
                          <em > {t('more:text_or_contact_us_at_6018_7777_650')}.</em> */}
                </p>
              </div>
              <div className='note'>
                {/* <i className="fas fa-pen-nib" /> */}
                <Icon icon='penNib' size={'small'} />
                {'  '}

                <strong className='content-title'>
                  {t('more:text_note')} #2:
                </strong>
                <p>
                  <em>
                    {t('more:text_note2_added_security')}
                    <strong>{t('more:text_note2_added_security1')}</strong>
                  </em>
                </p>
              </div>
            </div>
            <div className='slot-main'>
              <h2>{t('more:text_what_is_homerunners')}</h2>
              <p>{t('more:text_homerunners_is_a_specially_crafted')}</p>
              <h2>{t('more:text_how_does_homerunners_work')}</h2>
              <p>{t('more:text_our_homerunners_process_is')}</p>
              <ol className='custom-count-list'>
                <li>{t('more:text_more_landlord_how_does1')}</li>
                <li>{t('more:text_more_landlord_how_does2')}</li>
                <li>{t('more:text_more_landlord_how_does3')}</li>
              </ol>
            </div>

            <div className='slot-main'>
              <h2>{t('more:text_more_landlord_how_tenant_screening')}</h2>
              <p>
                <span>
                  {t(
                    'more:text_more_landlord_how_tenant_screening_description1'
                  )}
                </span>
                {t.language !== 'my' && (
                  <>
                    <a
                      href='https://blog.speedhome.com/blog/web/speedhome-tenant-background-check-guide-before-leasing/?utm_source=hubspot&utm_medium=blog&utm_campaign=howitworks'
                      target='_blank'
                    >
                      <span> {'check their background'}</span>
                    </a>
                    <span>
                      {' '}
                      {t(
                        'more:text_more_landlord_how_tenant_screening_description2'
                      )}
                    </span>
                  </>
                )}
              </p>
              <u>
                <strong className='content-title'>
                  {t('more:text_what_we_ll_check')}:
                </strong>
              </u>

              <ul>
                <li>{t('more:text_financial_repayment_records')}</li>
                <li>{t('more:text_employment_study_verification')}</li>
                <li>{t('more:text_background')}</li>
              </ul>
            </div>

            <div className='slot-main'>
              <h2 style={{ lineHeight: '2.1' }}>
                {t('more:text_more_landlord_how_tenant_payment')}
              </h2>
              <p>{t('more:text_more_landlord_how_tenant_description')}</p>
              <div className='row text-center'>
                <div
                  className='col-sm-3'
                  style={{ background: 'yellow', height: 100, padding: 15 }}
                >
                  <strong>
                    {t('more:text_tenant_pays_the_rent_to_SPEEDHOME')}
                  </strong>
                </div>
                <div className='col-sm-1' style={{ background: 'gray' }}>
                  <img
                    loading='lazy'
                    alt=''
                    src={'/img/icons/arrow-right.svg'}
                    style={{ paddingTop: 15 }}
                  />
                </div>
                <div
                  className='col-sm-3'
                  style={{ background: 'yellow', height: 100, padding: 15 }}
                >
                  <strong>
                    {t('more:text_SPEEDHOME_receives_the_payment')}
                  </strong>
                </div>
                <div className='col-sm-1' style={{ background: 'gray' }}>
                  <img
                    loading='lazy'
                    alt=''
                    src={'/img/icons/arrow-right.svg'}
                    style={{ paddingTop: 15 }}
                  />
                </div>
                <div
                  className='col-sm-3'
                  style={{ background: 'yellow', height: 100, padding: 15 }}
                >
                  <strong style={{ fontSize: 16 }}>
                    {t('more:text_landlord_within_3_working_days')}
                  </strong>
                </div>
              </div>
              <br />
              <br />
              <div>
                <strong className='content-title'>
                  {t('more:Download our app on:')}
                </strong>
                <p>
                  <a
                    href='https://itunes.apple.com/my/app/speedrent-property-rental/id998232868?mt=8'
                    target='_blank'
                  >
                    <img
                      loading='lazy'
                      src={'/img/appStore.png'}
                      alt='images'
                    />
                  </a>
                  <a
                    href='https://play.google.com/store/apps/details?id=com.speedrent&hl=en'
                    target='_blank'
                  >
                    <img
                      loading='lazy'
                      src={'/img/googlePlay.png'}
                      alt='images'
                    />
                  </a>
                </p>
                <span>
                  (Please enable Push Notifications by going to Settings' -&gt;
                  Applications -&gt; SPEEDHOME -&gt; App notifications)
                </span>
              </div>
            </div>
            <div className='btn-holder text-right'>
              <Link href={'/post'}>
                <a className='btn btn-big btn-arrow btn-curv btn-secondary-filled'>
                  {t('breadcrumb_post')}
                </a>
              </Link>
            </div>
          </Container>
        </div>
      </main>
    </React.Fragment>
  )
}

function mapStateToProps (state) {
  return {
    language: state.language
  }
}

export async function getServerSideProps () {
  return {}
}

export default connect(mapStateToProps)(LandlordHow)
