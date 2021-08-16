import React, { useState } from 'react'
import { connect } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import withSizes from 'react-sizes'
import Head from '../../../components/Common/Head'
import Image from 'next/image'

import styles from './moreLandlord.module.scss'

const LandlordOverview = props => {
  const { t } = useTranslation('common')
  const [testimonials, setTestimonials] = useState([
    {
      name: 'SALLAHUDDIN',
      userType: 'Landlord',
      text: t('more:text_testimonials_sallahuddin'),
      avatar: '/img/Sallahuddin.jpg'
    },
    {
      name: 'ADRIAN',
      userType: 'Landlord',
      text: t('more:text_testimonials_adrian'),
      avatar: '/img/Adrian.jpg'
    }
  ])

  const { isMobile } = props

  const plansSettings = {
    dots: false,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  }

  const testimonSettings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true
  }
  return (
    <React.Fragment>
      <Head title={t('overview_title')} />
      <main
        id='main'
        className={`${styles['inner-pages']} ${styles['overview']}`}
      >
        <div className={`${styles['gray-block']} ${styles['first-block']}`}>
          <div className={`container ${styles['with-pads']}`}>
            <div className='row'>
              <h3>{t('more:text_more_landlord_overview_protect_property')}</h3>
            </div>
            <div className={`row ${styles['chars']} `}>
              <div
                className={`col-xs-12 col-sm-4 align-center ${styles['vertical-ico-block']}`}
              >
                <Image
                  src='/img/ico-protected.svg'
                  alt=''
                  width={66}
                  height={56}
                />
                <div>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: t(
                        'more:text_more_landlord_overview_get_protected',
                        { interpolation: { escapeValue: false } }
                      )
                    }}
                  />
                </div>
              </div>
              <div
                className={`col-xs-12 col-sm-4 align-center ${styles['vertical-ico-block']}`}
              >
                <Image
                  src='/img/ico-calendar.svg'
                  alt=''
                  width={66}
                  height={56}
                />
                <div>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: t('more:text_more_landlord_overview_get_rental', {
                        interpolation: { escapeValue: false }
                      })
                    }}
                  />
                </div>
              </div>
              <div
                className={`col-xs-12 col-sm-4 align-center ${styles['vertical-ico-block']}`}
              >
                <Image
                  src='/img/ico-account.svg'
                  alt=''
                  width={66}
                  height={56}
                />
                <div>{t('more:text_more_landlord_overview_get_tenants')}</div>
              </div>
            </div>
            <div className='row'>
              <Link href={'/post'}>
                <a className={` btn yellow-btn`}>
                  {t(
                    'more:text_more_landlord_overview_post_your_property_free'
                  )}
                </a>
              </Link>
              <div className={`${styles['gray-text']}`}>
                {t('more:text_more_landlord_overview_go_to')} :{' '}
                <Link href='#sellHouse'>
                  <a style={{ color: '#4485ed' }}>
                    {t('more:text_more_landlord_overview_sell_your_house')}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`container ${styles['with-pads']} ${styles['reasons-block']}`}
        >
          <h2 className={`${styles['block-title']}`}>
            <span
              dangerouslySetInnerHTML={{
                __html: t('more:text_more_landlord_overview_5_reasons', {
                  interpolation: { escapeValue: false }
                })
              }}
            />
          </h2>

          <div className={`${styles['hor-ico-block']} `}>
            <div className={`${styles['image-wrapper']} `}>
              <Image
                src='/img/ic_credit_check.png'
                alt=''
                width={110}
                height={110}
              />
            </div>
            <div>
              <h5>
                {t('more:text_more_landlord_overview_receive_tenants_title')}
              </h5>
              <p>
                {t('more:text_more_landlord_overview_receive_tenants_text')}
              </p>
            </div>
          </div>

          <div className={`${styles['hor-ico-block']} `}>
            <div className={`${styles['image-wrapper']} `}>
              <Image
                src='/img/ico-saveMoney.png'
                alt=''
                width={110}
                height={110}
              />
            </div>
            <div>
              <h5>{t('more:text_more_landlord_overview_save_money_title')}</h5>
              <p>
                <span
                  dangerouslySetInnerHTML={{
                    __html: t(
                      'more:text_more_landlord_overview_save_money_text',
                      { interpolation: { escapeValue: false } }
                    )
                  }}
                />
              </p>
            </div>
          </div>

          <div className={`${styles['hor-ico-block']} `}>
            <div className={`${styles['image-wrapper']} `}>
              <Image
                src='/img/ico-protect.png'
                alt=''
                width={110}
                height={110}
              />
            </div>
            <div>
              <h5>
                {t('more:text_more_landlord_overview_house_is_protected_title')}
              </h5>
              <p>
                {t('more:text_more_landlord_overview_house_is_protected_text')}
              </p>
            </div>
          </div>

          <div className={`row ${styles['align-center']}`}>
            <Link href={'/post'}>
              <a className={`btn yellow-btn `}>
                {t('more:text_more_landlord_overview_post_your_property_free')}
              </a>
            </Link>
            <div className={`${styles['gray-text']} `}>
              {t('more:text_more_landlord_overview_go_to')} :{' '}
              <Link href='#sellHouse'>
                <a style={{ color: '#4485ed' }}>
                  {t('more:text_more_landlord_overview_sell_your_house')}
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`container ${styles['with-pads']} ${styles['plans-block']} align-center`}
        >
          <h2 className={`${styles['block-title']}`}>
            <span
              dangerouslySetInnerHTML={{
                __html: t('more:text_more_landlord_overview_how_much', {
                  interpolation: { escapeValue: false }
                })
              }}
            />
          </h2>
          <p>
            <span
              dangerouslySetInnerHTML={{
                __html: t('more:text_more_landlord_overview_choose_plan', {
                  interpolation: { escapeValue: false }
                })
              }}
            />
          </p>

          <p>
            <span
              dangerouslySetInnerHTML={{
                __html: t('more:text_more_landlord_overview_choose_plan2', {
                  interpolation: { escapeValue: false }
                })
              }}
            />
          </p>

          <div className={`row`}>
            <Slider {...plansSettings} className={`${styles['plans-slider']}`}>
              <div>
                <div className={`${styles['plan-item']} ${styles['']}`}>
                  <div className={`${styles['plan-item-title']} ${styles['']}`}>
                    {t('more:text_more_landlord_overview_basic')}
                  </div>
                  <div className={`${styles['item-row']}`}>
                    <div>
                      {t('more:text_more_landlord_overview_rental_collection')}
                    </div>
                    <div className={styles['align-right']}>
                      <Image
                        src='/img/checked-ico.svg'
                        alt=''
                        width={15}
                        height={15}
                      />
                    </div>
                  </div>
                  <div className={`${styles['item-row']}`}>
                    <div>
                      {t('more:text_more_landlord_overview_rental_guarantee')}
                    </div>
                    <div className={styles['align-right']}>
                      <Image
                        src='/img/cancel-ico.svg'
                        alt=''
                        width={15}
                        height={15}
                      />
                    </div>
                  </div>
                  <div className={`${styles['item-row']}`}>
                    <div>{t('more:text_more_landlord_overview_OCD')}</div>
                    <div className={styles['align-right']}>
                      <Image
                        src='/img/cancel-ico.svg'
                        alt=''
                        width={15}
                        height={15}
                      />
                    </div>
                  </div>
                  <div className={`${styles['item-row']}`}>
                    <div>
                      {t('more:text_more_landlord_overview_eviction_support')}
                    </div>
                    <div className={styles['align-right']}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: t(
                            'more:text_more_landlord_overview_speedhome_manage',
                            { interpolation: { escapeValue: false } }
                          )
                        }}
                      />
                    </div>
                  </div>
                  <div className={`${styles['item-row']}`}>
                    <div>
                      {t('more:text_more_landlord_overview_tenant_screening')}
                    </div>
                    <div className={styles['align-right']}>
                      <Image
                        src='/img/tenant_screening.png'
                        alt=''
                        className={styles['screening']}
                        width={100}
                        height={29}
                      />
                    </div>
                  </div>
                  <div className={`${styles['item-row']}`}>
                    <div>
                      {t('more:text_more_landlord_overview_loss_of_rental')}
                    </div>
                    <div className={styles['align-right']}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: t(
                            'more:text_more_landlord_overview_up_to_80',
                            {
                              interpolation: { escapeValue: false }
                            }
                          )
                        }}
                      />
                    </div>
                  </div>
                  <div className={`${styles['item-row']}`}>
                    <div>
                      {t(
                        'more:text_more_landlord_overview_inconvenience_benefits'
                      )}
                    </div>
                    <div className={styles['align-right']}>
                      <span className={styles['fs10']}>
                        {t('more:text_more_landlord_overview_up_to')}
                      </span>
                      <br />
                      RM1,000
                    </div>
                  </div>
                  <div className={`${styles['item-row']}`}>
                    <div>
                      {t('more:text_more_landlord_overview_accidental_damage')}
                    </div>
                    <div className={styles['align-right']}>
                      <span className={styles['fs10']}>
                        {t('more:text_more_landlord_overview_up_to')}
                      </span>
                      <br />
                      RM15,000
                    </div>
                  </div>
                  <div className={`${styles['item-row']}`}>
                    <div>
                      {t('more:text_more_landlord_overview_total_coverage')}
                    </div>
                    <div className={styles['align-right']}>
                      <span className={styles['fs10']}>
                        {t('more:text_more_landlord_overview_up_to')}
                      </span>
                      <br />
                      RM24,000
                    </div>
                  </div>
                  <div className={styles['plan-item-footer']}>
                    <div>{t('more:text_more_landlord_overview_cost')}</div>
                    <div className={styles['align-right']}>
                      1 {t('more:text_more_landlord_overview_month')} +<br />
                      6% SST + RM10
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className={`${styles['plan-item']} ${styles['extended']}`}>
                  <div className={styles['plan-item-title']}>
                    {t('more:text_more_landlord_overview_extended')}
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_rental_collection')}
                    </div>
                    <div className={styles['align-right']}>
                      <Image
                        src='/img/checked-ico.svg'
                        alt=''
                        width={15}
                        height={15}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_rental_guarantee')}
                    </div>
                    <div className={styles['align-right']}>
                      <Image
                        src='/img/cancel-ico.svg'
                        alt=''
                        width={15}
                        height={15}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>{t('more:text_more_landlord_overview_OCD')}</div>
                    <div className={styles['align-right']}>
                      <Image
                        src='/img/cancel-ico.svg'
                        alt=''
                        width={15}
                        height={15}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_eviction_support')}
                    </div>
                    <div className={styles['align-right']}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: t(
                            'more:text_more_landlord_overview_speedhome_manage',
                            { interpolation: { escapeValue: false } }
                          )
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_tenant_screening')}
                    </div>
                    <div className={styles['align-right']}>
                      <Image
                        src='/img/tenant_screening.png'
                        alt=''
                        className={styles['screening']}
                        width={100}
                        height={29}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_loss_of_rental')}
                    </div>
                    <div className={styles['align-right']}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: t(
                            'more:text_more_landlord_overview_up_to_2_months',
                            { interpolation: { escapeValue: false } }
                          )
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t(
                        'more:text_more_landlord_overview_inconvenience_benefits'
                      )}
                    </div>
                    <div className={styles['align-right']}>
                      <span className={styles['fs10']}>
                        {t('more:text_more_landlord_overview_up_to')}
                      </span>
                      <br />
                      RM2,000
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_accidental_damage')}
                    </div>
                    <div className={styles['align-right']}>
                      <span className={styles['fs10']}>
                        {t('more:text_more_landlord_overview_up_to')}
                      </span>
                      <br />
                      RM30,000
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_total_coverage')}
                    </div>
                    <div className={styles['align-right']}>
                      <span className={styles['fs10']}>
                        {t('more:text_more_landlord_overview_up_to')}
                      </span>
                      <br />
                      RM42,000
                    </div>
                  </div>
                  <div className={styles['plan-item-footer']}>
                    <div>{t('more:text_more_landlord_overview_cost')}</div>
                    <div className={styles['align-right']}>
                      1.25 {t('more:text_more_landlord_overview_months')} +
                      <br />
                      6% SST + RM10
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div
                  className={`${styles['plan-item']} ${styles['extended-plus']}`}
                >
                  <div
                    className={`${styles['plan-item-title']} ${styles['free-img-root']}`}
                  >
                    {t('more:text_more_landlord_overview_extended')} +
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_rental_collection')}
                    </div>
                    <div className={styles['align-right']}>
                      <Image
                        src='/img/checked-ico.svg'
                        alt=''
                        width={15}
                        height={15}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_rental_guarantee')}
                    </div>
                    <div className='align-right '>
                      <Image
                        src='/img/checked-ico.svg'
                        alt=''
                        width={15}
                        height={15}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>{t('more:text_more_landlord_overview_OCD')}</div>
                    <div className={styles['align-right']}>
                      <Image
                        src='/img/checked-ico.svg'
                        alt=''
                        width={15}
                        height={15}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_eviction_support')}
                    </div>
                    <div className={styles['align-right']}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: t(
                            'more:text_more_landlord_overview_speedhome_manage',
                            { interpolation: { escapeValue: false } }
                          )
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_tenant_screening')}
                    </div>
                    <div className={styles['align-right']}>
                      <Image
                        src='/img/tenant_screening.png'
                        alt=''
                        className={styles['screening']}
                        width={100}
                        height={29}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_loss_of_rental')}
                    </div>
                    <div className={styles['align-right']}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: t(
                            'more:text_more_landlord_overview_up_to_2_months',
                            { interpolation: { escapeValue: false } }
                          )
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t(
                        'more:text_more_landlord_overview_inconvenience_benefits'
                      )}
                    </div>
                    <div className={styles['align-right']}>
                      <span className={styles['fs10']}>
                        {t('more:text_more_landlord_overview_up_to')}
                      </span>
                      <br />
                      RM2,000
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_accidental_damage')}
                    </div>
                    <div className={styles['align-right']}>
                      <span className={styles['fs10']}>
                        {t('more:text_more_landlord_overview_up_to')}
                      </span>
                      <br />
                      RM30,000
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_total_coverage')}
                    </div>
                    <div className={styles['align-right']}>
                      <span className={styles['fs10']}>
                        {t('more:text_more_landlord_overview_up_to')}
                      </span>
                      <br />
                      RM42,000
                    </div>
                  </div>
                  <div className={styles['plan-item-footer']}>
                    <div>{t('more:text_more_landlord_overview_cost')}</div>
                    <div className={styles['align-right']}>
                      1.5 {t('more:text_more_landlord_overview_months')} +
                      <br />
                      6% SST + RM10
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
        <p
          className='container'
          style={{ marginTop: '-20px', marginBottom: '20px' }}
        >
          {t('more:special_note_landlord_overview_otr')}
        </p>
        <p
          className='container'
          style={{ marginTop: '-20px', marginBottom: '20px' }}
        >
          {t('more:special_note_landlord_overview_ocd')}
        </p>

        <div className={styles['gray-block']}>
          <div
            className={`container ${styles['with-pads']} ${styles['testimon-block']} ${styles['align-center']}`}
          >
            <h2 className={styles['block-title']}>
              <span
                dangerouslySetInnerHTML={{
                  __html: t('more:text_more_landlord_overview_do_you_know', {
                    interpolation: { escapeValue: false }
                  })
                }}
              />
            </h2>

            <div className='row'>
              <div className={styles['testim-items-wrapper']}>
                {testimonials.slice(0, 2).map(item => {
                  return (
                    <div
                      className={styles['testim-item-wrapper']}
                      key={item.name}
                    >
                      <div className={styles['testim-item']}>
                        <Image
                          src={item.avatar}
                          alt={item.name}
                          className={styles['testim-ava']}
                          width={80}
                          height={80}
                        />
                        <div className={styles['testim-text']}>{item.text}</div>
                        <div className={styles['testim-data']}>
                          {item.name}
                          <div>{item.userType}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <Slider {...testimonSettings} className={styles['testim-slider']}>
                {testimonials.map(item => {
                  return (
                    <div key={item.name}>
                      <div className={styles['testim-item']}>
                        <Image
                          src={item.avatar}
                          alt={item.name}
                          className={styles['testim-ava']}
                          width={80}
                          height={80}
                        />
                        <div className={styles['testim-text']}>{item.text}</div>
                        <div className={styles['testim-data']}>
                          {item.name}
                          <div>{item.userType}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Slider>
            </div>
          </div>
        </div>

        <div className={styles['gray-block']}>
          <div
            className={`container ${styles['how-to-post-block']} ${styles['with-pads']}`}
          >
            <h2 className={styles['block-title']}>
              <span
                dangerouslySetInnerHTML={{
                  __html: t('more:text_more_landlord_overview_how_to_post', {
                    interpolation: { escapeValue: false }
                  })
                }}
              />
            </h2>
            {/* <p className='align-center'>
                {t('more:text_more_landlord_overview_follow_steps')}
              </p> */}

            <div className={styles['hor-ico-block']}>
              <div className={styles['image-wrapper']}>
                <Image
                  src='/img/ico-gray-post.svg'
                  alt=''
                  width={58}
                  height={50}
                />
              </div>
              <div>
                <div className={styles['step-text']}>
                  {t('more:text_more_tenant_overview_step1')}
                </div>
                <h5>{t('more:text_more_landlord_overview_step1_title')}</h5>
                <p>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: t('more:text_more_landlord_overview_step1_text', {
                        interpolation: { escapeValue: false }
                      })
                    }}
                  />
                </p>
              </div>
            </div>
            {/* <div className={styles['hor-ico-block']}>
                <div className={styles['image-wrapper']}>
                  <img src={keysGrayIco} alt='' />
                </div>
                <div>
                  <div className={styles['step-text']}>
                    {t('more:text_more_landlord_overview_step')} 2
                  </div>
                  <h5>{t('more:text_more_landlord_overview_step2_title')}</h5>
                  <p>{t('more:text_more_landlord_overview_step2_text')}</p>
                </div>
              </div> */}
            <div className={styles['hor-ico-block']}>
              <div className={styles['image-wrapper']}>
                <Image
                  src='/img/ico-gray-startchat.svg'
                  alt=''
                  width={58}
                  height={50}
                />
              </div>
              <div>
                <div className={styles['step-text']}>
                  {t('more:text_more_tenant_overview_step2')}
                </div>
                <h5>{t('more:text_more_landlord_overview_step3_title')}</h5>
                <p>{t('more:text_more_landlord_overview_step3_text')}</p>
              </div>
            </div>
            <div className={styles['hor-ico-block']}>
              <div className={styles['image-wrapper']}>
                <Image
                  src='/img/ico-gray-tenantcheck.svg'
                  alt=''
                  width={58}
                  height={50}
                />
              </div>
              <div>
                <div className={styles['step-text']}>
                  {t('more:text_more_tenant_overview_step3')}
                </div>
                <h5>{t('more:text_more_landlord_overview_step4_title')}</h5>
                <p>{t('more:text_more_landlord_overview_step4_text')}</p>
              </div>
            </div>
            <div className={styles['hor-ico-block']}>
              <div className={styles['image-wrapper']}>
                <Image
                  src='/img/ico-gray-protection.svg'
                  alt=''
                  width={58}
                  height={50}
                />
              </div>
              <div>
                <div className={styles['step-text']}>
                  {t('more:text_more_tenant_overview_step4')}
                </div>
                <h5>{t('more:text_more_landlord_overview_step5_title')}</h5>
                <p>{t('more:text_more_landlord_overview_step5_text')}</p>
              </div>
            </div>

            <div className='row'>
              <Link href={'/post'}>
                <a className={`btn yellow-btn`}>
                  {t('more:text_more_landlord_overview_i_want_to_post')}
                </a>
              </Link>
              <div className={styles['gray-text']}>
                {t('more:text_more_landlord_overview_go_to')} :{' '}
                <Link href='#sellHouse'>
                  <a style={{ color: '#4485ed' }}>
                    {t('more:text_more_landlord_overview_sell_your_house')}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`container ${styles['with-pads']} ${styles['ceo-block']} align-center`}
        >
          <div className={styles['ceo-text']}>
            <h2 className={`${styles['block-title']} ${styles['mob']}`}>
              <span
                dangerouslySetInnerHTML={{
                  __html: t(
                    'more:text_more_landlord_overview_mind_behind_title',
                    { interpolation: { escapeValue: false } }
                  )
                }}
              />
            </h2>
            <img src='/img/WongWheiMeng.jpg' alt='' />
            <div>
              <h2 className={`${styles['block-title']} ${styles['desk']}`}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: t(
                      'more:text_more_landlord_overview_mind_behind_title',
                      { interpolation: { escapeValue: false } }
                    )
                  }}
                />
              </h2>
              <span
                dangerouslySetInnerHTML={{
                  __html: t(
                    'more:text_more_landlord_overview_mind_behind_text',
                    {
                      interpolation: { escapeValue: false }
                    }
                  )
                }}
              />
              <Link href={'/post'}>
                <a className={`btn yellow-btn`}>
                  {t('more:text_more_landlord_overview_post_now')}
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles['gray-block']} id='sellHouse'>
          <div
            className={`container ${styles['sell-house-block']} align-center`}
          >
            <div className={styles['sell-house-text']}>
              <div>
                <h1>{t('more:text_more_landlord_overview_sell_your_house')}</h1>
                <h3>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: t(
                        'more:text_more_landlord_overview_with_speedhome',
                        { interpolation: { escapeValue: false } }
                      )
                    }}
                  />
                </h3>
                <h4>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: t(
                        'more:text_more_landlord_overview_thats_right',
                        {
                          interpolation: { escapeValue: false }
                        }
                      )
                    }}
                  />
                </h4>
              </div>
              <Image
                src='/img/sell-house.jpg'
                alt=''
                width={320}
                height={316}
              />
            </div>
          </div>
        </div>

        <div
          className={`container ${styles['how-to-post-block']} ${styles['with-pads']}`}
        >
          <h2 className={styles['block-title']}>
            <span
              dangerouslySetInnerHTML={{
                __html: t('more:text_more_landlord_overview_how_do_you_post', {
                  interpolation: { escapeValue: false }
                })
              }}
            />
          </h2>

          <div className={styles['hor-ico-block']}>
            <div className={styles['image-wrapper']}>
              <Image
                src='/img/ico-gray-post.svg'
                alt=''
                width={58}
                height={50}
              />
            </div>
            <div>
              <div className={styles['step-text']}>
                {t('more:text_more_tenant_overview_step1')}
              </div>
              <h5>
                {t('more:text_more_landlord_overview_steps2_step1_title')}
              </h5>
              <p>
                <span
                  dangerouslySetInnerHTML={{
                    __html: t(
                      'more:text_more_landlord_overview_steps2_step1_text',
                      { interpolation: { escapeValue: false } }
                    )
                  }}
                />
              </p>
            </div>
          </div>
          <div className={styles['hor-ico-block']}>
            <div className={styles['image-wrapper']}>
              <Image
                src='/img/ico-gray-startchat.svg'
                alt=''
                width={58}
                height={50}
              />
            </div>
            <div>
              <div className={styles['step-text']}>
                {t('more:text_more_tenant_overview_step2')}
              </div>
              <h5>
                {t('more:text_more_landlord_overview_steps2_step2_title')}
              </h5>
              <p>{t('more:text_more_landlord_overview_steps2_step2_text')}</p>
            </div>
          </div>
          <div className={styles['hor-ico-block']}>
            <div className={styles['image-wrapper']}>
              <Image
                src='/img/ico-gray-meet.svg'
                alt=''
                width={58}
                height={50}
              />
            </div>
            <div>
              <div className={styles['step-text']}>
                {t('more:text_more_tenant_overview_step3')}
              </div>
              <h5>
                {t('more:text_more_landlord_overview_steps2_step3_title')}
              </h5>
              <p>{t('more:text_more_landlord_overview_steps2_step3_text')}</p>
            </div>
          </div>
        </div>
        <div className={styles['yellow-block']}>
          <div className={`container ${styles['with-pads']} align-center`}>
            <h2 className={styles['block-title']}>
              <span
                dangerouslySetInnerHTML={{
                  __html: t(
                    'more:text_more_landlord_overview_post_your_property_free_on',
                    { interpolation: { escapeValue: false } }
                  )
                }}
              />
            </h2>
            <Link href={'/post'}>
              <a className={`btn black-btn`}>
                {t('more:text_more_landlord_overview_post_my_prop')}
              </a>
            </Link>
          </div>
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

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 767
})

export async function getServerSideProps () {
  return {}
}

export default withSizes(mapSizesToProps)(
  connect(mapStateToProps)(LandlordOverview)
)
