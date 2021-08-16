import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { withRouter } from 'next/router'
import Link from 'next/link'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import withSizes from 'react-sizes'
import Filter from '../../../components/Filter'
import Head from '../../../components/Common/Head'
import styles from './moreTenant.module.scss'
import Image from 'next/image'

const TenantOverview = props => {
  const [testimonials, setTestimonials] = useState(null)
  const { t } = useTranslation('common')
  const { isMobile } = props

  const testimonSettings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  }
  useEffect(() => {
    setTestimonials([
      {
        name: 'ADELE',
        userType: 'Tenant',
        text: t('more:text_testimonials_adele'),
        avatar: '/img/Adele.jpg'
      },
      {
        name: 'DANIEL IDRUS',
        userType: 'Tenant',
        text: t('more:text_testimonials_daniel'),
        avatar: '/img/Daniel.jpg'
      },
      {
        name: 'JASON',
        userType: 'Tenant',
        text: t('more:text_testimonials_jason'),
        avatar: '/img/Daniel.jpg'
      }
    ])
  }, [])

  return (
    <React.Fragment>
      <Head
        title='Find Apartments For Rent, Condo for Rent KL, Condo for Rent PJ'
        description='Zero Deposit, Direct Owner, All Online, Hassle-Free. Condo for Rent in KL, House for Rent PJ, Condominium for Rent in Malaysia. Fresh Owner Listing Daily!'
      />
      <main id='main' className={`inner-pages  ${styles['overview']}`}>
        <div className={styles['tenant-first-block']} id='searchProperty'>
          <Filter page={'/more/tenant'} queryData={props.router.query} />
        </div>
        <div className={styles['gray-block']}>
          <div className={`container  ${styles['with-pads']}`}>
            <div className='row'>
              <h3>{t('more:text_more_tenant_overview_save_your_deposit')}</h3>
            </div>
            <div className={`row ${styles['chars']}`}>
              <div
                className={`col-xs-12 col-sm-4 align-center  ${styles['vertical-ico-block']}`}
              >
                <Image
                  src='/img/ico-zero-dep.svg'
                  alt=''
                  width={66}
                  height={56}
                />
                <div>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: t('more:text_more_tenant_overview_rent_with_zd', {
                        interpolation: { escapeValue: false }
                      })
                    }}
                  />
                </div>
              </div>
              <div
                className={`col-xs-12 col-sm-4 align-center  ${styles['vertical-ico-block']}`}
              >
                <Image
                  src='/img/ico-account.svg'
                  alt=''
                  width={66}
                  height={56}
                />
                <div>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: t(
                        'more:text_more_tenant_overview_rent_directly',
                        {
                          interpolation: { escapeValue: false }
                        }
                      )
                    }}
                  />
                </div>
              </div>
              <div
                className={`col-xs-12 col-sm-4 align-center  ${styles['vertical-ico-block']}`}
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
                        'more:text_more_tenant_overview_rent_hassle_free',
                        { interpolation: { escapeValue: false } }
                      )
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <Link href='#searchProperty'>
                <a className='btn yellow-btn'>
                  {t('more:text_more_tenant_overview_search_for_property')}
                </a>
              </Link>
              <div className={styles['gray-text']}>
                {t('more:text_more_landlord_overview_go_to')} :{' '}
                <Link href='#buyHouse'>
                  <a style={{ color: '#4485ed' }}>
                    {t('more:text_more_tenant_overview_buy_a_house')}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`container ${styles['with-pads']} ${styles['reasons-block']}`}
        >
          <h2 className={styles['block-title']}>
            <span
              dangerouslySetInnerHTML={{
                __html: t('more:text_more_tenant_overview_5_reasons', {
                  interpolation: { escapeValue: false }
                })
              }}
            />
          </h2>

          <div className={`${styles['hor-ico-block']} `}>
            <div className={`${styles['image-wrapper']} `}>
              <Image src='/img/IC_HOUSE.png' alt='' width={110} height={110} />
            </div>
            <div>
              <h5>
                <span
                  dangerouslySetInnerHTML={{
                    __html: t('more:text_more_tenant_overview_reason3_title', {
                      interpolation: { escapeValue: false }
                    })
                  }}
                />
              </h5>
              <p>{t('more:text_more_tenant_overview_reason3_text')}</p>
            </div>
          </div>
          <div className={`${styles['hor-ico-block']} `}>
            <div className={`${styles['image-wrapper']} `}>
              <Image
                src='/img/IC_DOCUMENT.png'
                alt=''
                width={110}
                height={110}
              />
            </div>
            <div>
              <h5>{t('more:text_more_tenant_overview_reason5_title')}</h5>
              <p>{t('more:text_more_tenant_overview_reason5_text')}</p>
            </div>
          </div>

          <div className={`${styles['hor-ico-block']} `}>
            <div className={`${styles['image-wrapper']} `}>
              <Image src='/img/IC_NO_DEP.png' alt='' width={110} height={110} />
            </div>
            <div>
              <h5>{t('more:text_more_tenant_overview_reason1_title')}</h5>
              <p>{t('more:text_more_tenant_overview_reason1_text')}</p>
            </div>
          </div>

          <div className='row align-center'>
            <Link href='#searchProperty'>
              <a className='btn yellow-btn'>
                {t('more:text_more_tenant_overview_search_for_zd')}
              </a>
            </Link>
            <div className={styles['gray-text']}>
              {t('more:text_more_landlord_overview_go_to')} :{' '}
              <Link href='#buyHouse'>
                <a style={{ color: '#4485ed' }}>
                  {t('more:text_more_tenant_overview_buy_a_house')}
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles['top__area--container']}>
          <h1 style={{ textAlign: 'center' }}>
            {t('more:key_areas_for_rent')}
          </h1>
          <Slider {...settings}>
            <Link href={`${t('more:link_rent')}/kuala lumpur`}>
              <div className={styles['top__image']}>
                <div className={styles['image__caption']}>Kuala Lumpur</div>
                <Image
                  className={styles['top__ares--image']}
                  id='image__id'
                  src='/img/kualaLampurTopArea.jpg'
                  alt='kuala lampur'
                  width={239}
                  height={220}
                />
              </div>
            </Link>
            <Link href={`${t('more:link_rent')}/petaling jaya`}>
              <div className={styles['top__image']}>
                <div className={styles['image__caption']}>Petaling Jaya</div>
                <Image
                  className={styles['top__ares--image']}
                  src='/img/petalingjayaTopArea.jpg'
                  alt='petaling jaya'
                  width={239}
                  height={220}
                />
              </div>
            </Link>
            <Link href={`${t('more:link_rent')}/cyberjaya`}>
              <div className={styles['top__image']}>
                <div className={styles['image__caption']}>Cyberjaya</div>
                <Image
                  className={styles['top__ares--image']}
                  src='/img/cyberjayaTopArea.jpg'
                  alt='cybarjaya'
                  width={239}
                  height={220}
                />
              </div>
            </Link>
          </Slider>
        </div>

        <div className={styles['gray-block']}>
          <div
            className={`container ${styles['how-to-post-block']} ${styles['with-pads']}`}
          >
            <h2 className={styles['block-title']}>
              {t('more:text_more_tenant_overview_what_is_the_process')}
            </h2>

            <div className={`${styles['hor-ico-block']} `}>
              <div className={`${styles['image-wrapper']} `}>
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
                <h5>{t('more:text_more_tenant_overview_step1_title')}</h5>
                <p>{t('more:text_more_tenant_overview_step1_text')}</p>
              </div>
            </div>

            <div className={`${styles['hor-ico-block']} `}>
              <div className={`${styles['image-wrapper']} `}>
                <Image
                  src='/img/ico-gray-bgcheck.svg'
                  alt=''
                  width={58}
                  height={50}
                />
              </div>
              <div>
                <div className={styles['step-text']}>
                  {t('more:text_more_tenant_overview_step2')}
                </div>
                <h5>{t('more:text_more_tenant_overview_step3_title')}</h5>
                <p>{t('more:text_more_tenant_overview_step3_text')}</p>
              </div>
            </div>
            <div className={`${styles['hor-ico-block']} `}>
              <div className={`${styles['image-wrapper']} `}>
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
                <h5>{t('more:text_more_tenant_overview_step4_title')}</h5>
                <p>{t('more:text_more_tenant_overview_step4_text')}</p>
              </div>
            </div>
            <div className={`${styles['hor-ico-block']} `}>
              <div className={`${styles['image-wrapper']} `}>
                <Image
                  src='/img/ico-gray-keys.svg'
                  alt=''
                  width={58}
                  height={50}
                />
              </div>
              <div>
                <div className={styles['step-text']}>
                  {t('more:text_more_tenant_overview_step4')}
                </div>
                <h5>{t('more:text_more_tenant_overview_step5_title')}</h5>
                <p>{t('more:text_more_tenant_overview_step5_text')}</p>
              </div>
            </div>

            <div className='row'>
              <Link href='#searchProperty'>
                <a className='btn yellow-btn'>
                  {t('more:text_more_tenant_overview_search_a_property_now')}
                </a>
              </Link>
              <div className={styles['gray-text']}>
                {t('more:text_more_landlord_overview_go_to')} :{' '}
                <Link href='#buyHouse'>
                  <a style={{ color: '#4485ed' }}>
                    {t('more:text_more_tenant_overview_buy_a_house')}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`container ${styles[' with-pads']} ${styles['testimon-block']} align-center`}
        >
          <h2 className={styles['block-title']}>
            <span
              dangerouslySetInnerHTML={{
                __html: t('more:text_more_tenant_overview_do_you_know', {
                  interpolation: { escapeValue: false }
                })
              }}
            />
          </h2>

          <div className='row'>
            <div className={styles['testim-items-wrapper']}>
              {testimonials &&
                testimonials.slice(0, 2).map(item => {
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
              {testimonials &&
                testimonials.map(item => {
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

        <div id='buyHouse'>
          <div
            className={`container ${styles['sell-house-block']} align-center`}
          >
            <div className={styles['sell-house-text']}>
              <div>
                <h1>{t('more:text_more_tenant_overview_buy_a_house')}</h1>
                <h3>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: t(
                        'more:text_more_tenant_overview_with_speedhome',
                        {
                          interpolation: { escapeValue: false }
                        }
                      )
                    }}
                  />
                </h3>
                <h4>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: t(
                        'more:text_more_tenant_overview_you_can_now_buy',
                        { interpolation: { escapeValue: false } }
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

        <div className={styles['gray-block']}>
          <div
            className={`container ${styles['how-to-post-block']} ${styles['with-pads']}`}
          >
            <h2 className={styles['block-title']}>
              <span
                dangerouslySetInnerHTML={{
                  __html: t('more:text_more_tenant_overview_how_do_you_buy', {
                    interpolation: { escapeValue: false }
                  })
                }}
              />
            </h2>

            <div className={`${styles['hor-ico-block']} `}>
              <div className={`${styles['image-wrapper']} `}>
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
                <h5>{t('more:text_more_tenant_overview_steps_step1_title')}</h5>
                <p>{t('more:text_more_tenant_overview_steps_step1_text')}</p>
              </div>
            </div>
            <div className={`${styles['hor-ico-block']} `}>
              <div className={`${styles['image-wrapper']} `}>
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
                <h5>{t('more:text_more_tenant_overview_steps_step2_title')}</h5>
                <p>{t('more:text_more_tenant_overview_steps_step2_text')}</p>
              </div>
            </div>
            <div className={`${styles['hor-ico-block']} `}>
              <div className={`${styles['image-wrapper']} `}>
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
                <h5>{t('more:text_more_tenant_overview_steps_step3_title')}</h5>
                <p>{t('more:text_more_tenant_overview_steps_step3_text')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles['yellow-block']}>
          <div className={`container ${styles['with-pads']} align-center`}>
            <h2 className={styles['block-title']}>
              <span
                dangerouslySetInnerHTML={{
                  __html: t('more:text_more_tenant_overview_search_for_prop', {
                    interpolation: { escapeValue: false }
                  })
                }}
              />
            </h2>
            <Link href='#searchProperty'>
              <a className='btn black-btn'>
                {t('more:text_more_tenant_overview_search_here')}
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
  connect(mapStateToProps)(withRouter(TenantOverview))
)
