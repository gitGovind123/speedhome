import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Link from 'next/link'
import { withRouter } from 'next/router'
import Slider from 'react-slick'

import withSizes from 'react-sizes'
import { bindActionCreators } from 'redux'
import Swal from 'sweetalert2'
import { Row, Col, Container } from 'react-bootstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

import useTranslation from 'next-translate/useTranslation'
import Head from '../../../components/Common/Head'
import TestimonialsDB from '../../../globalutilities/testimonials'
import PrefsDB from '../../../globalutilities/prefs'

import { getToken, getUserId } from '../../../globalutilities/helpers'
import * as authActions from '../../../actions/authActions'
import { updateInstallSource } from '../../../api/chatRequest'
import Loader from '../../../components/Common/Loader'

import styles from './refer.module.scss'

const ReferralIndex = props => {
  const [isValidRef, setIsValidRef] = useState(false)
  const { t } = useTranslation('common')
  useEffect(() => {
    if (!getToken()) {
      props.authActions.openLoginModal({
        countryData: null,
        phoneNumber: null,
        request: false,
        originClick: 'referral',
        disableClose: true
      })
    }
  }, [])

  useEffect(() => {
    if (props.user) {
      if (
        props.user.phoneNumber &&
        props.router.query &&
        props.router.query.rid
      ) {
        if (
          parseInt(props.user.phoneNumber) !== parseInt(props.router.query.rid)
        ) {
          setIsValidRef(true)
          const param = localStorage.getItem('utmParam')
          if (param && getToken() && getUserId()) {
            const data = {
              source: param
            }
            updateInstallSource(data).then(res => {})
          }
        } else {
          getErrorMessage()
        }
      } else {
        getErrorMessage()
      }
    }
  }, [props.user])

  const getErrorMessage = () => {
    return Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Sorry! Referral rewards are only available for new users.',
      showConfirmButton: true,
      allowOutsideClick: false
    }).then(() => {
      props.router.push(`/more/refer`)
    })
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

  const { isMobile } = props

  const testimonSettings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true
  }
  if (!getToken()) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          width: '100%'
        }}
      >
        <Loader />
      </div>
    )
  }

  return (
    <React.Fragment>
      <Head
        title='Get RM100 cash reward when you rent a home in SPEEDHOME now!'
        description='Sign up with my link and enjoy RM100 cash rewards on your tenancy agreement or insurance premium. Start your seamless rental journey with SPEEDHOME!'
      />
      <section className={styles['section--refer']}>
        <Container>
          <Row>
            <Col md={6} xs={12}>
              {/* {isValidRef ? ( */}
              <>
                <h3>{t('refer:referral_congrats')}</h3>
                <h3>{t('refer:referral_congrats2')}</h3>
              </>
              {/* ) : null} */}

              <div className={styles['section--refer__icon--container']}>
                {PrefsDB.map((item, index) => {
                  return (
                    <div className={styles['section--refer__icon']} key={index}>
                      <LazyLoadImage
                        effect='blur'
                        src={item.image}
                        alt={item.title}
                        className='refer-icon'
                      />
                      <h5>{item.title[getLangRef()]}</h5>
                    </div>
                  )
                })}
              </div>
              <div className={styles['section--refer__btn--container']}>
                <Link href={'/more/tenant'}>
                  <a
                    className={`btn btn-curv btn-secondary btn-secondary-filled  ${styles['referbtn']}`}
                  >
                    {t('refer:referral_im_tenant')}
                  </a>
                </Link>

                <Link href={'/more/landlord'}>
                  <a
                    className={`btn btn-curv btn-secondary btn-primary-filled  ${styles['referbtn']}`}
                  >
                    {t('refer:referral_im_landlord')}
                  </a>
                </Link>
              </div>
            </Col>

            {!isMobile ? (
              <Col md={6} xs={12}>
                <div className='banner-img'>
                  <img
                    loading='lazy'
                    src={'/img/banner-img.png'}
                    alt='Speedhome'
                  />
                </div>
              </Col>
            ) : null}
          </Row>
        </Container>
      </section>

      <section className={styles['testimonials-block']}>
        <Container>
          <Row>
            <h4
              style={{
                width: '100%',
                textAlign: 'center'
              }}
            >
              {t('refer:home_testimonials_head')}
            </h4>
            <div className={styles['testim-items-wrapper']}>
              {TestimonialsDB.slice(0, 3).map((item, index) => {
                return (
                  <div className={styles['testim-item-wrapper']} key={index}>
                    <div className={styles['testim-item']}>
                      <LazyLoadImage
                        src={item.avatar}
                        effect='blur'
                        alt={item.name}
                        className={styles['testim-ava']}
                      />
                      <div className={styles['testim-text']}>
                        "{item.text[getLangRef()]}"
                      </div>
                      <div className={styles['testim-data']}>
                        {item.name}
                        <div>{item.userType} </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <Slider {...testimonSettings} className={styles['testim-slider']}>
              {TestimonialsDB.map((item, index) => {
                return (
                  <div key={index}>
                    <div className={styles['testim-item']}>
                      <img
                        loading='lazy'
                        src={item.avatar}
                        alt={item.name}
                        className={styles['testim-ava']}
                      />
                      <div className={styles['testim-text']}>
                        "{item.text[getLangRef()]}"
                      </div>
                      <div className={styles['testim-data']}>
                        {item.name}
                        <div>{item.userType}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </Slider>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

function mapStateToProps (state) {
  return {
    language: state.language,
    user: state.auth.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 767
})

export async function getServerSideProps () {
  return {}
}

export default withSizes(mapSizesToProps)(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(ReferralIndex))
)
