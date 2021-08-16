import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import Slider from 'react-slick'
import withSizes from 'react-sizes'
import { Container, Row, Col } from 'react-bootstrap'

import Loader from '../Common/Loader'
import PhoneIcon from '@material-ui/icons/PhoneOutlined'
import EmailIcon from '@material-ui/icons/EmailOutlined'
import ArrowForward from '@material-ui/icons/ArrowForward'
import PersonIcon from '@material-ui/icons/Person'
import StarIcon from '@material-ui/icons/Star'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'
import useTranslation from 'next-translate/useTranslation'

const Filter = dynamic(() => import('../Filter/index'), {
  loading: () => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#fefefe',
          height: '457px',
          width: '100%'
        }}
      ></div>
    )
  },
  ssr: false
})
const FeaturedInComponent = dynamic(() => import('./FeaturedIn'), {
  loading: () => <Loader />,
  ssr: false
})
const PopularAreasComponent = dynamic(() => import('./PopularAreas'), {
  loading: () => <Loader />,
  ssr: false
})
const HomeMainSlider = dynamic(() => import('./HomeMainSlider'), {
  loading: () => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#fefefe',
          height: '457px',
          width: '100%'
        }}
      ></div>
    )
  },
  ssr: false
})

const HomePerf = dynamic(() => import('./HomePerf'), {
  loading: () => <Loader />,
  ssr: false
})

import {
  getHotPropertiesList,
  getActiveCampaign,
  getTestimonialList
} from '../../actions'

import TestimonialsDB from '../../globalutilities/testimonials'

import ShareAboutUs from './ShareAboutUs'

import {
  imageSliderArr,
  imageSliderMobileArr,
  sliderSettings,
  testimonialSettings,
  prefSettings
} from './HomePageUtils'

import styles from './index.module.scss'

const HomePage = props => {
  const [popularAreas, setPopularAreas] = useState([])
  const [activeCampaign, setActiveCampaign] = useState([])
  const [activeCampaigns, setActiveCampaigns] = useState([])
  const [index, setIndex] = useState(0)
  const [testimonialListData, setTestimonialListData] = useState([])
  const { isMobile } = props
  const { t } = useTranslation('common')
  const slideData = isMobile ? imageSliderMobileArr : imageSliderArr

  useEffect(() => {
    async function fetchMyData () {
      const testimonialList = await getTestimonialList()
      const result = await getHotPropertiesList()
      const campaign = await getActiveCampaign()
      if (campaign.success) {
        setActiveCampaign(campaign.data)
      }

      setTestimonialListData(
        testimonialList.success && testimonialList.data.length > 2
          ? testimonialList.data
          : TestimonialsDB
      )
      setPopularAreas(
        result.success
          ? (result.data && result.data.content.slice(0, 3)) || []
          : []
      )

      window.invite_referrals = window.invite_referrals || {}
      var ir = function ir () {
        window.invite_referrals.auth = {
          bid_e: 'D7CE74D55F5AE11877626EBEF2CCC3DE',
          bid: '28548',
          t: '420'
        }
        window.invite_referrals.async = false
        var script = document.createElement('script')
        script.src = '//cdn.invitereferrals.com/js/invite-referrals-1.0.js'
        var entry = document.getElementsByTagName('script')[0]
        entry.parentNode.insertBefore(script, entry)
      }

      ir()
    }

    fetchMyData()
  }, [])

  const showAllAreas = () => {
    Router.push(t('home:link_hot'))
  }
  const getLangRef = () => {
    if (props.router) {
      if (props.router.locale === 'my') {
        return 'my'
      } else if (props.router.locale === 'zh') {
        return 'zh'
      } else {
        return 'en'
      }
    }
  }

  const searchActiveCampaign = campaign => {
    let partnerName = campaign.campaignName
    let partnerRef = campaign.ref
    if (partnerName.includes(' ')) {
      partnerName = partnerName.replace(/ /g, '-')
    }
    let activeCampaignUrl = '/'
    let lang = getLangRef()
    if (lang === 'my') {
      activeCampaignUrl = activeCampaignUrl + 'my/sewa/'
    } else if (lang === 'zh') {
      activeCampaignUrl = activeCampaignUrl + 'zh/rent/'
    } else {
      activeCampaignUrl = activeCampaignUrl + 'rent/'
    }
    Router.push(activeCampaignUrl + partnerName + '?offer=' + partnerRef)
  }

  const searchHotDealCampaign = () => {
    let activeCampaignUrl = '/csearch'
    Router.push(activeCampaignUrl + '?hotdeals=true')
  }

  const searchActiveSliderImage = url => {
    let activeCampaignUrl = '/'
    let lUrl = ''
    let lang = getLangRef()
    if (url.label) {
      if (url.label === 'ZD') {
        lUrl = lang === 'my' ? 'my/sewa/' : lang === 'zh' ? 'zh/rent/' : 'rent/'
        activeCampaignUrl =
          activeCampaignUrl +
          lUrl +
          'kuala-lumpur?utm_source=slider&utm_campaign=to-rent-page&utm_medium=web'
      } else if (url.label === 'RENTAL') {
        window.location.href =
          '/rental-bidding?utm_source=slider&utm_campaign=Allianzrefer&utm_medium=web'

        return
      } else if (url.label === 'THANKS') {
        window.location.href =
          'https://speedhome.com/blog/contactless-viewing-tenant/?utm_source=slider&utm_campaign=contactless&utm_medium=web/'

        return
      } else if (url.label === 'REWARD') {
        window.location.href =
          'https://speedhome.com/blog/allianz-reward/?utm_source=slider&utm_campaign=Allianzrefer&utm_medium=web'

        return
      } else if (url.label === 'KTIC') {
        window.location.href =
          'https://speedhome.com/blog/ktic/?utm_source=SPEEDHOME&utm_medium=speedhome_website&utm_campaign=ktic'
        return
      } else if (url.label === 'OCD') {
        lUrl = lang === 'my' ? 'my/' : lang === 'zh' ? 'zh/' : ''
        activeCampaignUrl =
          activeCampaignUrl +
          lUrl +
          'services/ocd?utm_source=slider&utm_campaign=ocd&utm_medium=web'
      } else if (url.label === 'HR') {
        lUrl = lang === 'my' ? 'my/' : lang === 'zh' ? 'zh/' : ''
        activeCampaignUrl =
          activeCampaignUrl +
          lUrl +
          'services/homerunner?utm_source=slider&utm_campaign=hrn&utm_medium=web'
      } else if (url.label === 'REFER') {
        lUrl = lang === 'my' ? 'my/' : lang === 'zh' ? 'zh/' : ''
        activeCampaignUrl =
          activeCampaignUrl +
          lUrl +
          'more/refer?utm_source=slider&utm_campaign=referral&utm_medium=web'
      }
      Router.push(activeCampaignUrl)
    }
  }

  return (
    <>
      <HomeMainSlider
        styles={styles}
        slideData={slideData}
        sliderSettings={sliderSettings}
        searchActiveSliderImage={searchActiveSliderImage}
        APP_URL
        isMobile={isMobile}
      />
      <section className={styles['visual']}>
        <div className={styles['centered']}>
          <Filter queryData={props.router.query} />
        </div>
      </section>

      <section className={styles['conatactless-block']}>
        <Container>
          <Row>
            <div className={styles['heading__container']}>
              <Image
                src='/img/zeroDeposit.png'
                height={80}
                width={80}
                alt='zero deposit'
              />
              <h4>{t('home:home_zero_deposit_head')}</h4>
              <p>
                {t('home:home_zero_deposit_security_text')} &nbsp;
                <br />
                {t('home:home_zero_deposit_security_text_split')}
                <p>
                  {t('home:home_tradion_deposit_text')} &nbsp;
                  <a
                    target='_blank'
                    href='https://speedhome.com/blog/zero_deposit/?utm_source=slider&utm_campaign=zde&utm_medium=web'
                  >
                    {t('home:home_more_details_link')}
                  </a>
                </p>
              </p>
            </div>
            <Col lg={6} md={6} sm={12}>
              <Image
                src='/img/Path 5421@2x.png'
                width={25}
                height={25}
                alt='zero deposit'
                style={{ paddingBottom: '10px' }}
              />

              <div
                className={styles['conatactless__info-box']}
                style={{ textAlign: 'center' }}
              >
                <h6>{t('home:home_zero_deposit_required_head')}</h6>
                <div className={styles['viewing__info']}>
                  <span>{t('home:home_zero_deposit_required_text_first')}</span>
                  <span>
                    {t('home:home_zero_deposit_required_text_second')}
                  </span>
                  <span>{t('home:home_zero_deposit_required_text_third')}</span>
                  <span>
                    {t('home:home_zero_deposit_required_text_fourth')}
                  </span>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <Image
                src='/img/security-24px@2x.png'
                height={25}
                width={25}
                alt='zero deposit'
                style={{ paddingBottom: '10px' }}
              />

              <div
                className={styles['conatactless__info-box']}
                style={{ textAlign: 'center' }}
              >
                <h6>{t('home:home_full_end_protection_head')}</h6>
                <div className={styles['viewing__info']}>
                  <span>{t('home:home_full_end_protection_text_first')}</span>
                  <span>{t('home:home_full_end_protection_text_second')}</span>
                  <span>{t('home:home_full_end_protection_text_third')}</span>
                  <span>{t('home:home_full_end_protection_text_fourth')}</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {activeCampaign.length > 0 && (
        <section
          className={`${styles['conatactless-block']} ${styles['campaign-block']}`}
        >
          <Container>
            <h4>Special Offer </h4>
            <Slider
              {...sliderSettings}
              className={`${styles['slider-standard']} ${styles['special-offer']} slider_with_next_div`}
            >
              {activeCampaign.map((campaign, index) => {
                return (
                  <div className={`${styles['slick-slide']}`} key={index}>
                    <img
                      loading='lazy'
                      key={index}
                      onClick={() => searchActiveCampaign(campaign)}
                      className={`${styles['campaign-img']} ${styles['campaign-name']}`}
                      src={campaign.campaignDisplayPhotoUrl}
                    />

                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        bottom: '-.4rem'
                      }}
                    >
                      <h4 style={{ marginTop: '15px' }}>
                        {campaign.campaignName}
                      </h4>
                      <p>{campaign.campaignDescription}</p>
                    </div>
                  </div>
                )
              })}
              <div className={`${styles['slick-slide']}`}>
                <img
                  loading='lazy'
                  onClick={() => searchHotDealCampaign()}
                  className={`${styles['campaign-img']} ${styles['campaign-name']}`}
                  src={
                    isMobile
                      ? '/img/Hot Deal_Mobile.jpg'
                      : '/img/Hot Deal_Desktop.jpg'
                  }
                />
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    bottom: '-1.2rem'
                  }}
                >
                  <h4 style={{ marginTop: '15px' }}>Hot Deals</h4>
                  <p>Hot Deals</p>
                </div>
              </div>
            </Slider>
          </Container>
        </section>
      )}
      <section className={styles['services-block']}>
        <Container>
          <Row className={styles['services-block']}>
            <div
              className={`col-xs-12 col-sm-12 col-md-4 ${styles['service-block-main-div']}`}
            >
              <h4>{t('home:home_landlord_head')}</h4>
              <p>{t('home:home_landlord_description')}</p>
              <div className={styles['btn-holder']}>
                <Link href={'/post'}>
                  <a
                    className={`${styles['btn']} ${styles['btn-big']} ${styles['btn-arrow']}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0',
                      paddingLeft: '1rem',
                      paddingRight: '1rem'
                    }}
                  >
                    {t('home:btn_post_property')}
                    <ArrowForward />
                  </a>
                </Link>
              </div>
            </div>
            <div
              className={`col-xs-12 col-sm-12 col-md-4 ${styles['service-block-main-div']}`}
            >
              <h4>{t('home:home_tenant_head')}</h4>
              <p>{t('home:home_tenant_description')}</p>
              <div className={styles['btn-holder']}>
                <Link href={'/rent'}>
                  <a
                    className={`${styles['btn']} ${styles['btn-big']} ${styles['btn-arrow']}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0',
                      paddingLeft: '1rem',
                      paddingRight: '1rem'
                    }}
                  >
                    {t('home:btn_search_property')}
                    <ArrowForward />
                  </a>
                </Link>
              </div>
            </div>
            <div
              className={`col-xs-12 col-sm-12 col-md-4 ${styles['service-block-main-div']}`}
            >
              <h4>{t('home:home_launches_head')}</h4>
              <p>{t('home:home_launches_description')}</p>
              <div className={styles['btn-holder']}>
                <Link href={'/home-ownership'}>
                  <a
                    className={`${styles['btn']} ${styles['btn-big']} ${styles['btn-arrow']}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0',
                      paddingLeft: '1rem',
                      paddingRight: '1rem'
                    }}
                  >
                    {t('home:btn_buy_new_property')}
                    <ArrowForward />
                  </a>
                </Link>
              </div>
            </div>
          </Row>
        </Container>
      </section>
      <HomePerf
        styles={styles}
        isMobile={isMobile}
        prefSettings={prefSettings}
        getLangRef={getLangRef}
      />
      <section className={styles['testimonials-block']}>
        <Container>
          <Row>
            <h4 style={{ width: '100%' }}>
              {t('home:home_testimonials_head')}
            </h4>
            <Col md={12}>
              <Slider
                {...testimonialSettings}
                className={`${styles['slider-standard']} ${styles['testimonial-slider']}`}
              >
                {testimonialListData.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className={styles['item']}>
                        <p className={styles['item-content']}>
                          "
                          {item.comment ||
                            (item.text && item.text[getLangRef()])}
                          "
                        </p>
                        <div className='mt-3 mb-3'>
                          {[1, 2, 3, 4, 5].map(num => {
                            if (num <= item.rating) {
                              return (
                                <StarIcon
                                  key={num}
                                  className={styles['item-stars']}
                                />
                              )
                            } else {
                              return (
                                <StarBorderOutlinedIcon
                                  key={num}
                                  className={styles['item-stars']}
                                />
                              )
                            }
                          })}
                        </div>
                        <div
                          className={styles['item-info']}
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          {item.avatar || (item.user && item.user.avatar) ? (
                            <Image
                              src={item.avatar || item.user.avatar}
                              effect='blur'
                              alt={item.name || (item.user && item.user.name)}
                              className={styles['avatar']}
                              height={40}
                              width={40}
                            />
                          ) : (
                            <PersonIcon className={styles['avatar']} />
                          )}
                          <span className={styles['user-info']}>
                            {(
                              (item.user && item.user.name) ||
                              item.name
                            ).toLowerCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>

      <PopularAreasComponent
        isMobile={isMobile}
        popularAreas={popularAreas}
        showAllAreas={showAllAreas}
      />
      <section className={styles['contacts-block']}>
        <Container>
          <Row>
            <div className={styles['blog-item']}>
              <h4>{t('home:home_blog_head')}</h4>
              <a
                href='https://speedhome.com/more/refer?rid=speedmanage'
                target='_blank'
              >
                <div className={styles['blog-item__button']}>
                  <div
                    style={{
                      color: '#000000',
                      fontWeight: 'bold',
                      fontSize: '13px'
                    }}
                  >
                    {t('home:home_go_to_our_blog')}
                  </div>
                  <Image
                    src='/img/icons/arrow-right-copy.png'
                    alt='not found'
                    height={20}
                    width={20}
                  />
                </div>
              </a>
            </div>
            <div className={styles['getintouch-item']}>
              <h4>{t('home:home_get_in_touch_head')}</h4>
              <p>
                <EmailIcon className={styles['icons']} />
                <a href='mailto:hello@speedhome.com' rel='nofollow'>
                  hello@speedhome.com
                </a>
              </p>
              <p>
                <PhoneIcon className={styles['icons']} />
                <a href='tel:6018 7777 650' rel='nofollow'>
                  +6018 7777 650
                </a>
              </p>
            </div>
          </Row>
        </Container>
      </section>
      <section className={styles['blog-block']}>
        <Container>
          <ShareAboutUs />
        </Container>
      </section>
      <FeaturedInComponent />
    </>
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

export default withSizes(mapSizesToProps)(
  withRouter(connect(mapStateToProps)(HomePage))
)
