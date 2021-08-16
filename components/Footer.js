import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import { withRouter } from 'next/router'
import Image from 'next/image'

import {
  createNotification,
  NOTIFICATION_TYPE_SUCCESS
  // NOTIFICATION_TYPE_ERROR
} from 'react-redux-notify'

import * as emailCollectionActions from '../actions/emailCollection'

import { Container, Row, Col, Button } from 'react-bootstrap'

import CheckIcon from '@material-ui/icons/Check'
import MarkerIcon from '@material-ui/icons/Place'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email'
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import RssFeedIcon from '@material-ui/icons/RssFeed'

import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import validator from 'validator'

import { triggerGTAG } from '../utils/utils'
import { learnItemsAction } from '../actions/learn'

import {
  FOR_CHINEASE,
  FOR_MALAYSIA,
  APPLE_STORE,
  PLAY_STORE,
  TERMS_POLICY,
  FACEBOOK_URL,
  LINKEDIN_URL,
  INSTA_URL,
  TWITTER_URL,
  YOUTUBE_URL
} from '../globalutilities/helpers'
import styles from './Footer.module.scss'

const Footer = props => {
  let isListingPage = false

  if (
    (props.router.asPath.includes('/rent/') ||
      props.router.asPath.includes('/sewa/') ||
      props.router.asPath.includes('/buy/') ||
      props.router.asPath.includes('/beli/')) &&
    props.router.asPath.includes('&map=1')
  ) {
    isListingPage = true
  }

  const [language, setLanguage] = useState('')
  const [forChinese, setForChinese] = useState(FOR_CHINEASE)
  const [formalaysia, setFormalaysia] = useState(FOR_MALAYSIA)
  const [areas, setAreas] = useState(props.areas ? props.areas : [])
  const [categories, setCategories] = useState(
    props.categories ? props.categories : []
  )
  const [openedSubmenuId, setOpenedSubmenuId] = useState(-1)
  const [disableFooter, setDisableFooter] = useState(false)
  const [subscribeStatus, setSubscribeStatus] = useState('')
  const { t } = useTranslation('common')

  useEffect(() => {
    setLanguage(props.router.locale)
  }, [])

  useEffect(() => {
    setSubscribeStatus(props.subscribeStatus)
  }, [props.subscribeStatus])

  useEffect(() => {
    if (props.footerDiabled) {
      setDisableFooter(props.footerDiabled.isDisabled)
    }
  }, [props.footerDiabled])

  useEffect(() => {
    if (props.subscribeStatus !== {}) {
      if (props.subscribeStatus === 200) {
        props.createNotification({
          message: t('text_successfully_subscribed'),
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 3000,
          canDismiss: true,
          icon: <CheckIcon />
        })
      }
    }
  }, [props.subscribeStatus])

  function checkState () {
    setLanguage(language)
  }

  const learnItem = data => () => {
    props.learnItemsAction(data)
  }

  function openSubmenu (id) {
    if (openedSubmenuId === id) {
      setOpenedSubmenuId(-1)
    } else {
      setOpenedSubmenuId(id)
    }
  }

  function subscribeUser (e) {
    e.preventDefault()
    props.emailCollectionActions.subscribeUser(
      e.target.elements.emailSubscribe.value
    )

    triggerGTAG({
      event: 'Submit_Newsletter',
      email: props.user ? e.target.elements.emailSubscribe.value : '',
      phone: props.user
        ? props.user.phoneNumber
          ? props.user.phoneNumber
          : ''
        : ''
    })
  }
  const renderSubCategoryLink = (category, item) => {
    return (
      <li className={styles['footer-list-dropdown']} key={category.id}>
        <Link href={`${t('link_rent')}/${item.link}/${category.link}`}>
          <a>{category.name}</a>
        </Link>
      </li>
    )
  }

  const triggerWhatsappGTAG = () => {
    triggerGTAG({
      event: 'WA_Option'
    })
  }

  const renderFooterTop = () => {
    return (
      <>
        <Row>
          <Col xs={12} md={4}>
            <div className={styles['footer-block']}>
              <div onClick={() => checkState()}>
                <Image
                  loading='lazy'
                  src='/img/LOGO-SPEEDHOME-YELLOW.png'
                  alt='Speedhome logo'
                  width={230}
                  height={32}
                  layout='fixed'
                  q={100}
                />
              </div>
              <div className={styles['company-registration']} data-testId='company__registration__show'>
                {t('company_name')}
                <br />
                {t('registration_number')}
              </div>
              <div className={styles['address-list']}>
                <div className={styles['slot']}>
                  <div>
                    <MarkerIcon />
                  </div>
                  <div>
                    {t('contacts_address_line1')}
                    <br />
                    {t('contacts_address_line2')}
                    <br />
                    {t('contacts_address_line3')}
                    <br />
                    {t('contacts_address_line4')}
                  </div>
                </div>
                <div className={styles['slot']}>
                  <div>
                    <PhoneIcon />
                  </div>
                  <div>
                    {t('contacts_landline')}
                    <a href='tel:+60374910088'>+603 7491 0088</a>
                    <br />
                    {t('contacts_whatsapp')}
                    <a
                      href='https://wa.me/601111930181'
                      target='_blank'
                      onClick={() => {
                        triggerWhatsappGTAG()
                      }}
                    >
                      +6011 1193 0181
                    </a>
                  </div>
                </div>
                <div className={styles['slot']}>
                  <div>
                    <EmailIcon />
                  </div>
                  <div>
                    <a href={`mailto:${t('contacts_email')}`}>
                      {t('contacts_email')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['footer-block']}>
              <h3>{t('text_company')}</h3>
              <ul className={`${styles['footer-menu']} ${styles[' two-col']}`}>
                <li>
                  <Link href={'/more/about'}>
                    <a>{t('text_about_us')}</a>
                  </Link>
                </li>
                <li>
                  <Link href={'/more/contact'}>
                    <a>{t('text_contact_us')}</a>
                  </Link>
                </li>
                <li>
                  <Link href={'/learn/landlord-faq'}>
                    <a onClick={learnItem('landlordfaq')}>
                      {t('text_landlord_faq')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={'/learn/tenant-faq'}>
                    <a onClick={learnItem('tenantfaq')}>
                      {t('text_tenant_faq')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={'/sitemap'}>
                    <a>{t('text_sitemap')}</a>
                  </Link>
                </li>
                <li>
                  <a
                    href='https://speedhome.com/blog/careers/?utm_source=SHweb&utm_medium=footer-menu'
                    target='_blank'
                    rel='external'
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <h3>{t('text_hot_areas')}</h3>
            <ul
              className={`${styles['footer-menu']} ${styles['footer-menu-accor']} ${styles['two-col']}`}
            >
              {areas.map(item => {
                return (
                  <li
                    key={item.id}
                    className={
                      openedSubmenuId === item.id
                        ? `${styles['footer-list-dropdown']} ${styles['opened-li']}`
                        : styles['footer-list-dropdown']
                    }
                  >
                    <Link href={`${t('link_rent')}/${item.link}`}>
                      <a>{item.name}</a>
                    </Link>
                    <span
                      className={styles['footer-link-toggle']}
                      onClick={() => openSubmenu(item.id)}
                    >
                      <ArrowDownIcon />
                    </span>
                    <ul className={styles['footer-dropdown-menu']}>
                      {language == 'en'
                        ? categories.map(cat => {
                            return renderSubCategoryLink(cat, item)
                          })
                        : language == 'my'
                        ? formalaysia.map(cat => {
                            return renderSubCategoryLink(cat, item)
                          })
                        : forChinese.map(cat => {
                            return renderSubCategoryLink(cat, item)
                          })}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </Col>
          <Col xs={12} md={4}>
            <h3>{t('text_category')}</h3>
            <ul className={`${styles['footer-menu']} ${styles['two-col']}`}>
              {language == 'en'
                ? categories.map(cat => {
                    return renderSubCategoryLink(cat, {
                      link: 'kuala-lumpur'
                    })
                  })
                : language == 'my'
                ? formalaysia.map(cat => {
                    return renderSubCategoryLink(cat, {
                      link: 'kuala-lumpur'
                    })
                  })
                : forChinese.map(cat => {
                    return renderSubCategoryLink(cat, {
                      link: 'kuala-lumpur'
                    })
                  })}
            </ul>
            <br />
            <div
              className={`${styles['subscribe-block']} ${styles['footer-block']}`}
            >
              <h3>{t('text_subscribe_to')}</h3>

              <ValidationForm
                className={styles['subscribe-form']}
                onSubmit={subscribeUser}
              >
                <TextInput
                  name='emailSubscribe'
                  id='emailSubscribe'
                  required
                  placeholder={t('text_email_address')}
                  validator={validator.isEmail}
                  errorMessage={{
                    validator: 'Please enter a valid email'
                  }}
                />

                <Button
                  className={styles['btn']}
                  id='newsLetterSubmit'
                  type='submit'
                  name='newsletter'
                >
                  <RssFeedIcon />
                </Button>
              </ValidationForm>
            </div>
            <div className={styles['footer-block']}>
              <h3>{t('text_download_app_here')}</h3>
              <div className={styles['app-download-link']}>
                <a target={'_blank'} href={APPLE_STORE} id='appStoreBtn'>
                  <Image
                    loading='lazy'
                    src='/img/appStore.png'
                    width={128}
                    height={32}
                  />
                </a>
                <a target={'_blank'} href={PLAY_STORE} id='googlePlayBtn'>
                  <Image
                    loading='lazy'
                    src='/img/googlePlay.png'
                    width={128}
                    height={32}
                  />
                </a>
              </div>
            </div>
            <div className={styles['footer-block']}>
              <h3>Follow us on</h3>
              <div className={styles['follow-us-link']}>
                <a target={'_blank'} href={FACEBOOK_URL} id='facebookBtn'>
                  <Image
                    loading='lazy'
                    src='/img/icons/facebook.png'
                    alt='facebook'
                    height={32}
                    width={32}
                  />
                </a>
                <a target={'_blank'} href={INSTA_URL} id='instaBtn'>
                  <Image
                    loading='lazy'
                    src='/img/icons/instagram.png'
                    alt='instagram'
                    height={32}
                    width={32}
                  />
                </a>
                <a target={'_blank'} href={TWITTER_URL} id='twitterBtn'>
                  <Image
                    loading='lazy'
                    src='/img/icons/twitter.png'
                    alt='twitter'
                    height={32}
                    width={32}
                  />
                </a>
                <a target={'_blank'} href={LINKEDIN_URL} id='linkedinBtn'>
                  <Image
                    loading='lazy'
                    src='/img/icons/linkedin.png'
                    alt='linkedin'
                    height={32}
                    width={32}
                  />
                </a>
                <a target={'_blank'} href={YOUTUBE_URL} id='youtubeBtn'>
                  <Image
                    loading='lazy'
                    src='/img/icons/youtube.png'
                    alt='youtube'
                    height={32}
                    width={32}
                  />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </>
    )
  }
  const renderFooterBottom = () => {
    return (
      <div className={styles['footer-bottom']}>
        <Row>
          <Col xs={12} md={12}>
            <p>{t('text_legal')}</p>
            <p>
              {new Date().getFullYear()} {t('text_speedhome')} &nbsp; | &nbsp;{' '}
              <a href={TERMS_POLICY} target={'_blank'}>
                {t('text_privacy_policy')}
              </a>
            </p>
          </Col>
        </Row>
      </div>
    )
  }

  if (disableFooter) {
    return null
  } else {
    return (
      <footer className={styles['l-footer']}>
        <div className={styles['footer-top']}>
          {isListingPage ? (
            <Container
              style={{
                maxWidth: 'calc(100% - 4%)'
              }}
            >
              {renderFooterTop()}
            </Container>
          ) : (
            <Container>{renderFooterTop()}</Container>
          )}
        </div>
        <div className={styles['footer-bottom']}>
          {isListingPage ? (
            <Container
              style={{
                maxWidth: 'calc(100% - 4%)'
              }}
            >
              {renderFooterBottom()}
            </Container>
          ) : (
            <Container>{renderFooterBottom()}</Container>
          )}
        </div>
      </footer>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.auth.user,
    areas: state.areas,
    categories: state.categories,
    subscribeStatus: state.subscribeStatus,
    footerDiabled: state.disableFooter
  }
}

function actionsStateToProps (dispatch) {
  return {
    emailCollectionActions: bindActionCreators(
      emailCollectionActions,
      dispatch
    ),
    createNotification: bindActionCreators(createNotification, dispatch),
    learnItemsAction: bindActionCreators(learnItemsAction, dispatch)
  }
}

export default connect(mapStateToProps, actionsStateToProps)(withRouter(Footer))
