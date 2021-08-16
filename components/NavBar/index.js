import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import Sticky from 'react-sticky-el'
import Cookies from 'js-cookie'
import withSizes from 'react-sizes'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'

import * as languageActions from '../../actions/language'
import * as authActions from '../../actions/authActions'
import * as chatActions from '../../actions/chatAction'
import { learnItemsAction } from '../../actions/learn'

import Container from 'react-bootstrap/Container'
import MenuIcon from '@material-ui/icons/Menu'
import WidgetsRounded from '@material-ui/icons/WidgetsRounded'
import DashboardIcon from '@material-ui/icons/Dashboard'
import AboutUsIcon from '@material-ui/icons/AccountBalance'
import ChatIcon from '@material-ui/icons/Chat'
import ContactUsIcon from '@material-ui/icons/Phone'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import FaqIcon from '@material-ui/icons/MenuBook'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import ReferIcon from '@material-ui/icons/AttachMoney'
import ProfileIcon from '@material-ui/icons/Person'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import LanguageIcon from '@material-ui/icons/Language'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Divider from '@material-ui/core/Divider'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import { getRefQueryParams, triggerGTAG } from '../../utils/utils'

import { APPLE_STORE, PLAY_STORE } from '../../globalutilities/helpers'
import { AUTH_SERVER, SPEED_MANAGE } from '../../env'

// import LoginModal from './Login/Login'
import {
  privateRoute,
  playStorePupUpRoute,
  languagesArray
} from '../../globalutilities/consts'

const PlayStorePopUp = dynamic(() => import('../Common/PlayStorePopUp'))
const EmailPopUp = dynamic(() => import('../Common/EmailPopUp'))

import {
  getUserId,
  getToken,
  transLatedUrlForRentPage,
  getLangShortName,
  logOut
} from '../../globalutilities/helpers'

import styles from './Navbar.module.scss'

const MobileSidebar = dynamic(() => import('./MobileSidebar'))

const Navbar = props => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { isOpenMenuDropdown, setOpenMenuDropdown, isMobile } = props

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false)
  const [user, setUser] = useState(null)
  const [isOpenPlayStorePopup, setIsOpenPlayStorePopup] = useState(false)
  const [unreadMessage, setUnreadMessage] = useState(0)
  const [showArrow, setArrow] = useState(false)
  const [showArrowContactLess, setArrowContactLess] = useState(false)
  const [servicesArrow, setServicesArrow] = useState(false)
  const [openEmailPopUpModal, setOpenEmailPopUpModal] = useState(false)
  const [languageArrow, setLanguageArrow] = useState(false)

  const [loginUrl, SetLoginUrl] = useState('')

  useEffect(() => {
    const refParams = getRefQueryParams()

    const currentPath = window.location.href

    const constructUrl = `${AUTH_SERVER}?originType=SH&origin=${currentPath}${refParams}`
    SetLoginUrl(constructUrl)

    function clickWindowEvent (e) {
      if (e.target.id == 'nav_learn' || e.target.id == 'nav_learn_icon') {
      } else {
        setLanguageArrow(false)
        setServicesArrow(false)
        setArrow(false)
        setArrowContactLess(false)
      }
    }
    function scrollWindowEvent () {
      setServicesArrow(false)
      setLanguageArrow(false)
      setArrow(false)
      setArrowContactLess(false)
    }

    window.addEventListener('scroll', scrollWindowEvent)

    window.addEventListener('click', clickWindowEvent)

    const userId = getUserId()
    const token = getToken()
    if (userId && token) {
      props.authActions.autoLogin(userId, token)
    }

    const playStorePopupClosingTime =
      Cookies.get('playStorePopupClosingTime') || 0

    const timeoutConst = setTimeout(() => {
      if (
        router &&
        router.pathname &&
        privateRoute.indexOf(router.pathname) !== -1 &&
        !user
      ) {
        const link = document.getElementById('btnLogin')
        if (link) {
          link.click()
        }
      }
    }, 2000)

    if (router && router.asPath) {
      const isOpenPlayStorePopup =
        window &&
        window.innerWidth <= 480 &&
        playStorePupUpRoute.indexOf(router.asPath) !== -1 &&
        parseInt(playStorePopupClosingTime) < Date.now()
      setIsOpenPlayStorePopup(isOpenPlayStorePopup)
      // props.authActions.isOpenPlayStorePopup(isOpenPlayStorePopup)
    }

    return () => {
      window.removeEventListener('click', clickWindowEvent)
      window.removeEventListener('scroll', scrollWindowEvent)
      clearTimeout(timeoutConst)
    }
  }, [])

  useEffect(() => {
    if (props.user && Object.keys(props.user || {}).length) {
      const token = getToken()
        ? getToken()
        : router.query && router.query.token
        ? router.query.token
        : ''

      if (props.user && token) {
        setUser(props.user)
        props.chatActions.getChatUnreadMsg(token)
      }
    } else {
      setUser(null)
    }
  }, [props.user, router])

  useEffect(() => {
    if (props.unreadMessageCount) {
      setUnreadMessage(props.unreadMessageCount)
    }
  }, [props.unreadMessageCount])

  const openMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened)
  }

  const setLanguage = (wantedlang = 'en') => {
    const fullPath = router.asPath
    const currentLang = router.locale
    let fullPathWithTranslationCheck = ''

    if (currentLang) {
      let routerWithLang = ''
      if (currentLang === 'my') {
        if (wantedlang === 'en') {
          if (fullPath.includes('/my/')) {
            routerWithLang = fullPath.replace('/my/', '/')
          } else {
            routerWithLang = fullPath.replace('/my', '/')
          }
        } else if (wantedlang === 'zh') {
          routerWithLang = fullPath.replace('/my', '/zh')
        }
      } else if (currentLang === 'zh') {
        if (wantedlang === 'en') {
          if (fullPath.includes('/zh/')) {
            routerWithLang = fullPath.replace('/zh/', '/')
          } else {
            routerWithLang = fullPath.replace('/zh', '/')
          }
        } else if (wantedlang === 'my') {
          routerWithLang = fullPath.replace('/zh', '/my')
        }
      } else {
        if (wantedlang === 'zh') {
          routerWithLang = fullPath.replace('/en', '/zh')
        } else if (wantedlang === 'my') {
          routerWithLang = fullPath.replace('/en', '/my')
        }
      }
      fullPathWithTranslationCheck = transLatedUrlForRentPage(
        wantedlang,
        routerWithLang,
        currentLang,
        t
      )
    } else {
      let fullPathWithLang = ''
      if (fullPath === '/') {
        fullPathWithLang = `/${wantedlang}`
      } else {
        fullPathWithLang = `/${wantedlang}${fullPath}`
      }
      fullPathWithTranslationCheck = transLatedUrlForRentPage(
        wantedlang,
        fullPathWithLang,
        currentLang,
        t
      )
    }
    if (fullPathWithTranslationCheck === '/') {
      if (wantedlang === 'en') {
        window.location.href = `/`
      } else {
        window.location.href = `/${wantedlang}`
      }
    } else {
      let constructurl = ''
      if (wantedlang === 'en') {
        constructurl = fullPathWithTranslationCheck
      } else {
        constructurl = `/${wantedlang}${fullPathWithTranslationCheck}`
      }
      // window.location.href = constructurl
    }
    router.push(fullPathWithTranslationCheck, fullPathWithTranslationCheck, {
      locale: wantedlang
    })
  }

  const handleOutsideClick = () => {
    if (isMobileMenuOpened) {
      openMobileMenu()
    }
  }

  const referAFterLogIn = () => {
    props.authActions.openLoginModal({
      countryData: null,
      phoneNumber: null,
      request: true,
      disableClose: false,
      goToReferPage: true
    })
    openMobileMenu()
  }

  const handlePlayStorePopup = () => {
    setIsOpenPlayStorePopup(!isOpenPlayStorePopup)
    Cookies.set('playStorePopupClosingTime', Date.now() + 48 * 60 * 60 * 1000)
    props.playstorePopupLayoutClose()
  }

  const learnItem = data => () => {
    props.learnItemsAction(data)
    setIsMobileMenuOpened(!isMobileMenuOpened)
  }

  const learnItemMenuDropdown = data => () => {
    props.learnItemsAction(data)
    setOpenMenuDropdown(!isOpenMenuDropdown)
  }

  const openEmailModal = () => {
    setOpenEmailPopUpModal(true)
  }

  const setContactLessLandlordUrl = () => {
    window.location.href =
      'https://speedhome.com/blog/virtual-viewing-landlord/'
  }

  const setContactLessTenantUrl = () => {
    window.location.href =
      'https://speedhome.com/blog/contactless-viewing-tenant/'
  }

  const triggerWhatsappGTAG = () => {
    triggerGTAG({
      event: 'WA_Option'
    })
  }

  const renderReferbtn = () => {
    if (user) {
      if (user.email) {
        return (
          <li className={styles['nav__learn']}>
            <Link href={'/more/refer'}>
              <a onClick={() => openMobileMenu()}>
                {t('text_refer')}
                {
                  <ReferIcon
                    classes={{
                      root: styles['mobile-icons']
                    }}
                  />
                }
              </a>
            </Link>
          </li>
        )
      } else {
        return (
          <li className={styles['nav__learn']}>
            <Link href={'/more/refer'}>
              <a className={styles['refer']} onClick={() => openEmailModal()}>
                {t('text_refer')}
                {
                  <ReferIcon
                    classes={{
                      root: styles['mobile-icons']
                    }}
                  />
                }
              </a>
            </Link>
          </li>
        )
      }
    } else {
      return (
        <li className={styles['nav__learn']}>
          <Link href={'/more/refer'}>
            <a className={styles['refer']} onClick={referAFterLogIn}>
              {t('text_refer')}
              {
                <ReferIcon
                  classes={{
                    root: styles['mobile-icons']
                  }}
                />
              }
            </a>
          </Link>
        </li>
      )
    }
  }
  const renderMenu = () => {
    let langArray = []
    if (!router.locale) {
      langArray = languagesArray.filter(item => item.link !== 'en')
    } else {
      langArray = languagesArray.filter(item => item.link !== router.locale)
    }

    return (
      <div className={styles['header-menu']}>
        <ul className={styles['mobile-menu-with-svg']}>
          <>
            {!(user && user.phoneNumber) ? (
              <li
                className={`${styles['nav__learn']} ${styles['mobile_menu_li']}`}
              >
                <a href={loginUrl}>
                  <span>{t('btn_login')}</span>
                  <ProfileIcon />
                </a>
              </li>
            ) : (
              <>
                <li
                  className={`${styles['nav__learn']} ${styles['mobile_menu_li']}`}
                >
                  <a
                    href={'/dashboard/profile'}
                    onClick={() => setOpenMenuDropdown(false)}
                  >
                    <span>{t('profile_title')}</span>
                    <ProfileIcon />
                  </a>
                </li>
                <li
                  className={`${styles['nav__learn']} ${styles['mobile_menu_li']}`}
                >
                  <Link href={'/dashboard'}>
                    <a onClick={() => setOpenMenuDropdown(false)}>
                      <span>{t('dashboard_menu_title')}</span>
                      <DashboardIcon />
                    </a>
                  </Link>
                </li>
              </>
            )}
            <li
              className={`${styles['nav__learn']} ${styles['mobile_menu_li']}`}
            >
              <a
                href={SPEED_MANAGE}
                target='_blank'
                onClick={() => setOpenMenuDropdown(false)}
              >
                <span>SPEEDMANAGE </span>
                <Image
                  loading='lazy'
                  src='/img/home-icon@2x.png'
                  alt='Speedmanage'
                  width={20}
                  height={20}
                  layout='fixed'
                  q={100}
                />
              </a>
            </li>
            <Divider />
          </>
          <li className={styles['nav__learn']}>
            <Link href={'/more/landlord'}>
              <a onClick={() => setOpenMenuDropdown(false)}>
                {t('text_post')}
                {
                  <HomeIcon
                    classes={{
                      root: styles['mobile-icons']
                    }}
                  />
                }
              </a>
            </Link>
          </li>
          <li className={styles['nav__learn']}>
            <Link href={'/more/tenant'}>
              <a onClick={() => setOpenMenuDropdown(false)}>
                {t('text_search')}
                {
                  <SearchIcon
                    classes={{
                      root: styles['mobile-icons']
                    }}
                  />
                }
              </a>
            </Link>
          </li>
          <li
            className={styles['nav__learn']}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              setArrow(!showArrow)
              setArrowContactLess(false)
              setServicesArrow(false)
              setLanguageArrow(false)
            }}
          >
            <div style={{ color: '#000000' }}>
              {t('text_learn')}
              {showArrow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
            {showArrow && (
              <div
                className={`${styles['nav__learn--content']} ${styles['desktop_menu_li']}`}
              >
                <Link href={'/learn/event'}>
                  <a>
                    <div id='nav_learn' onClick={learnItem('webinar')}>
                      Event
                    </div>
                  </a>
                </Link>
                <Link href={'/learn/blog'}>
                  <a>
                    <div id='nav_learn' onClick={learnItem('blog')}>
                      Blog
                    </div>{' '}
                  </a>
                </Link>
                <Link href={'/learn/landlord-faq'}>
                  <a>
                    <div id='nav_learn' onClick={learnItem('landlordfaq')}>
                      Landlord FAQ
                    </div>{' '}
                  </a>
                </Link>
                <Link href={'/learn/tenant-faq'}>
                  <a>
                    <div id='nav_learn' onClick={learnItem('tenantfaq')}>
                      Tenant FAQ
                    </div>{' '}
                  </a>
                </Link>
              </div>
            )}
            {showArrow && (
              <ul className={`mt-3 ${styles['mobile_menu_li']}`}>
                <li>
                  <Link href={'/learn/event'}>
                    <a>
                      <div id='nav_learn' onClick={learnItem('webinar')}>
                        Event
                      </div>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={'/learn/blog'}>
                    <a>
                      <div id='nav_learn' onClick={learnItem('blog')}>
                        Blog
                      </div>{' '}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={'/learn/landlord-faq'}>
                    <a>
                      <div id='nav_learn' onClick={learnItem('landlordfaq')}>
                        Landlord FAQ
                      </div>{' '}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={'/learn/tenant-faq'}>
                    <a>
                      <div id='nav_learn' onClick={learnItem('tenantfaq')}>
                        Tenant FAQ
                      </div>{' '}
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li
            className={styles['nav__learn']}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              setServicesArrow(!servicesArrow)
              setLanguageArrow(false)
              setArrow(false)
              setArrowContactLess(false)
            }}
          >
            <div style={{ color: '#000000' }}>
              {t('text_services')}
              {servicesArrow ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </div>
            {servicesArrow && (
              <div className={styles['nav__learn--content_s']}>
                <Link href={'/services/zero-deposit'}>
                  <a>
                    <div id='nav_learn'>Zero Deposit Eligibility</div>
                  </a>
                </Link>
                <Link href={'/services/insurance'}>
                  <a>
                    <div id='nav_learn'>Insurance Protection</div>
                  </a>
                </Link>
                <Link href={'/services/rental-collection'}>
                  <a>
                    <div id='nav_learn'>Rental Collection</div>
                  </a>
                </Link>
                <Link href={'/services/homerunner'}>
                  <a>
                    <div id='nav_learn'>Homerunners</div>
                  </a>
                </Link>
                <Link href={'/services/ocd'}>
                  <a>
                    <div id='nav_learn'>OTR/OCD</div>
                  </a>
                </Link>
                <a onClick={setContactLessLandlordUrl}>
                  <div id='nav_learn'>Virtual Viewing</div>
                </a>
                <a
                  onClick={() => {
                    window.location.href =
                      'https://speedhome.com/blog/rental-bidding'
                  }}
                >
                  <div id='nav_learn'>Rental Bidding</div>
                </a>
              </div>
            )}
            {servicesArrow && (
              <ul className={`mt-3 ${styles['mobile_menu_li']}`}>
                <li>
                  <Link href={'/services/zero-deposit'}>
                    <a>
                      <div id='nav_learn'>Zero Deposit Eligibility</div>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={'/services/insurance'}>
                    <a>
                      <div id='nav_learn'>Insurance Protection</div>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={'/services/rental-collection'}>
                    <a>
                      <div id='nav_learn'>Rental Collection</div>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={'/services/homerunner'}>
                    <a>
                      <div id='nav_learn'>Homerunners</div>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={'/services/ocd'}>
                    <a>
                      <div id='nav_learn'>OTR/OCD</div>
                    </a>
                  </Link>
                </li>
                <li>
                  <a
                    onClick={() => {
                      window.location.href =
                        'https://speedhome.com/blog/rental-bidding'
                    }}
                  >
                    <div id='nav_learn'>Rental Bidding</div>
                  </a>
                </li>
              </ul>
            )}
          </li>
          {renderReferbtn()}
          <li
            className={`${styles['nav__learn']} ${styles['mobile_menu_li']}`}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              setArrowContactLess(!showArrowContactLess)
              setArrow(false)
              setServicesArrow(false)
              setLanguageArrow(false)
            }}
          >
            <div style={{ color: '#000000' }}>
              {t('text_virtual_view')}
              {showArrowContactLess ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </div>
            {showArrowContactLess && (
              <ul className='mt-3'>
                <li>
                  <a onClick={setContactLessLandlordUrl}>
                    <div id='nav_learn'>For Landords</div>
                  </a>
                </li>
                <li>
                  <a onClick={setContactLessTenantUrl}>
                    <div id='nav_learn'>For Tenants</div>{' '}
                  </a>
                </li>
              </ul>
            )}
          </li>
          {user && user.phoneNumber && isMobile && (
            <li className={`${styles['nav__learn']}`}>
              <a
                className={`${styles['message__icon__container']} `}
                href='https://wa.me/601111930181'
                target={'_blank'}
                onClick={() => {
                  triggerWhatsappGTAG()
                }}
              >
                Whatsapp Help
                <span className={styles['span__whatsapp']}>New</span>
                <WhatsAppIcon />
              </a>
            </li>
          )}
          <li className={styles['nav__learn']}>
            <Link href={'/more'}>
              <a
                onClick={() => openMobileMenu()}
                alt='more about tenant and landlord'
              >
                {t('text_more')}
                {
                  <KeyboardArrowDownIcon
                    classes={{
                      root: styles['mobile-icons']
                    }}
                  />
                }
              </a>
            </Link>
          </li>

          <Divider className={styles['mobile_menu_li']} />

          <li
            className={`${styles['nav__learn']} ${styles['mobile_menu_li']}`}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              setLanguageArrow(!languageArrow)
              setServicesArrow(false)
              setArrow(false)
              setArrowContactLess(false)
            }}
          >
            <div style={{ color: '#000000' }}>
              {t('text_language')}
              <span>{' - ' + getLangShortName(router)}</span>
              <LanguageIcon />
            </div>
            {languageArrow && (
              <ul className='mt-3'>
                {langArray.map(item => {
                  return (
                    <li
                      key={item.id}
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        setLanguage(item.link)
                      }}
                    >
                      {item.name}
                    </li>
                  )
                })}
              </ul>
            )}
          </li>
          {user && user.phoneNumber && (
            <li
              className={`${styles['nav__learn']} ${styles['mobile_menu_li']}`}
            >
              <a onClick={() => logOut()}>
                <span>{t('text_log_out')}</span>
                <LogoutIcon />
              </a>
            </li>
          )}
          <Divider className={styles['mobile_menu_li']} />
        </ul>

        <div
          className={`${styles['app-download-link']} ${styles['show-mobile']}`}
        >
          <a href='https://get.speedrent.com'>{t('text_download_apps')}</a>
          <div
            className={`${styles['app-download-link']} ${styles['app-btn-mobile']}`}
          >
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
      </div>
    )
  }

  const renderLanguage = () => {
    let langArray = []
    if (!router.locale) {
      langArray = languagesArray.filter(item => item.link !== 'en')
    } else {
      langArray = languagesArray.filter(item => item.link !== router.locale)
    }

    return (
      <div
        className={`
      ${styles['header-menu']} 
      ${styles['desktop_menu_li']}
      `}
      >
        <ul className={styles['mobile-menu-with-svg']}>
          <li
            className={styles['nav__learn']}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              setLanguageArrow(!languageArrow)
              setServicesArrow(false)
              setArrow(false)
              setArrowContactLess(false)
            }}
          >
            <div style={{ color: '#000000' }}>
              <LanguageIcon />
              {getLangShortName(router)}
            </div>
            {languageArrow && (
              <div
                className={`${styles['nav__learn--content']}
                  ${styles['desktop_menu_li']}              
              `}
              >
                {langArray.map(item => {
                  return (
                    <Link href={'/learn/event'}>
                      <a>
                        <div
                          id='nav_learn'
                          key={item.id}
                          onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            setLanguage(item.link)
                            setLanguageArrow(!languageArrow)
                          }}
                        >
                          {item.name}
                        </div>
                      </a>
                    </Link>
                  )
                })}
              </div>
            )}
          </li>
        </ul>
      </div>
    )
  }

  const renderHeader = () => {
    const postUrl = router.locale === 'en' ? '/post' : `/${router.locale}/post`
    return (
      <>
        <div className={styles['m-hamburger']} onClick={openMobileMenu}>
          <MenuIcon />
        </div>
        <div className={styles['logo']}>
          <Link href={'/'}>
            <a>
              <Image
                loading='lazy'
                src='/img/LOGO - SPEEDHOME.svg'
                alt='Speedhome logo'
                width={100}
                height={100}
                layout='fixed'
                q={100}
              />
            </a>
          </Link>
        </div>
        <div
          className={`${styles['header-menu-inner']} ${styles['desktop-menu']}`}
        >
          {renderMenu()}
        </div>
        <div className={styles['header-action-right']}>
          {renderLanguage()}
          <a
            href={postUrl}
            id='btnPostProprerty'
            className={`${styles['btn']} ${styles['post_property_text']}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g id="Group_3829" data-name="Group 3829" transform="translate(21563 24762)">
                <g id="home_black_24dp" transform="translate(-21563 -24762)">
                  <path id="Path_5946" data-name="Path 5946" d="M0,0H24V24H0Z" fill="none"/>
                  <path id="Subtraction_1" data-name="Subtraction 1" d="M8,17.006H8l-5,0v-8H0L10,0l2,1.8V4h2.449L15,4.5V7h2.779l2.223,2H17v8l-5,0V11H8v6.007Z" transform="translate(1.002 2.998)" fill="#fff"/>
                  <path id="Path_5955" data-name="Path 5955" d="M16,16H13v3H11V16H8V14h3V11h2v3h3Z" transform="translate(6 -10)" fill="#fff"/>
                </g>
              </g>
            </svg>
            <span>{t('text_post_property_for_free')}</span>
          </a>

          <div className={styles['chatBubbleWrap']}>
            {!(user && user.phoneNumber) ? (
              <a
                className={`${styles['message__icon__whatsapp']}`}
                href='https://wa.me/601111930181'
                target={'_blank'}
                onClick={() => {
                  triggerWhatsappGTAG()
                }}
              >
                <img
                  src='/img/icons/whatsapp_icon.svg'
                  width={34}
                  alt='Whatsapp chat'
                />
                <span>New</span>
              </a>
            ) : (
              <>
                <a
                  className={`${styles['message__icon__whatsapp']} ${styles['sm-mobile']}`}
                  href='https://wa.me/601111930181'
                  target={'_blank'}
                  onClick={() => {
                    triggerWhatsappGTAG()
                  }}
                >
                  <img
                    src='/img/icons/whatsapp_icon.svg'
                    width={34}
                    alt='Whatsapp chat'
                  />
                  <span>New</span>
                </a>
                <Link href={'/dashboard/chat'}>
                  <a className={styles['message__icon__container']}>
                    <ChatIcon />
                    {user && parseInt(props.unreadMessageCount) > 0 && (
                      <span>
                        {parseInt(props.unreadMessageCount) > 99 ? '99+' : props.unreadMessageCount}
                      </span>
                    )}
                  </a>
                </Link>
              </>
            )}
            <a
              className={`${styles['message__icon__container']} ${styles['sm-mobile']}`}
              onClick={() => setOpenMenuDropdown(!isOpenMenuDropdown)}
            >
              <MenuIcon>
                {!(user && user.phoneNumber) ? (
                  <WidgetsRounded />
                ) : (
                  <AccountCircleIcon />
                )}
              </MenuIcon>
            </a>

            {isOpenMenuDropdown && (
              <div
                className={`${styles['menu_pcontainer']} ${styles['sm-mobile']}`}
              >
                {!(user && user.phoneNumber) ? (
                  <a href={loginUrl}>
                    <div className={styles['menuItems']}>
                      <span>{t('btn_login')}</span>
                      <div>
                        <ProfileIcon />
                      </div>
                    </div>
                  </a>
                ) : (
                  <>
                    <a
                      href={'/dashboard/profile'}
                      onClick={() => setOpenMenuDropdown(false)}
                    >
                      <div className={styles['menuItems']}>
                        <span>{t('profile_title')}</span>
                        <div>
                          <ProfileIcon />
                        </div>
                      </div>
                    </a>
                    <Link href={'/dashboard'}>
                      <a onClick={() => setOpenMenuDropdown(false)}>
                        <div className={styles['menuItems']}>
                          <span>{t('dashboard_menu_title')}</span>
                          <div>
                            <DashboardIcon />
                          </div>
                        </div>
                      </a>
                    </Link>
                  </>
                )}
                <a
                  href={SPEED_MANAGE}
                  target={'_blank'}
                  onClick={() => setOpenMenuDropdown(false)}
                >
                  <div className={styles['menuItems']}>
                    <span>SPEEDMANAGE</span>
                    <div>
                      <Image
                        loading='lazy'
                        src='/img/home-icon@2x.png'
                        alt='Speedmanage'
                        width={20}
                        height={20}
                        layout='fixed'
                        q={100}
                      />
                    </div>
                  </div>
                </a>

                <Divider className='mt-2 mb-2' />
                <Link href={'/more/about'}>
                  <a onClick={() => setOpenMenuDropdown(false)}>
                    <div className={styles['menuItems']}>
                      <span>{t('text_about_us')}</span>
                      <div>
                        <AboutUsIcon />
                      </div>
                    </div>
                  </a>
                </Link>

                <Link href={'/more/contact'}>
                  <a onClick={() => setOpenMenuDropdown(false)}>
                    <div className={styles['menuItems']}>
                      <span>{t('text_contact_us')}</span>
                      <div>
                        <ContactUsIcon />
                      </div>
                    </div>
                  </a>
                </Link>
                <Link href={'/learn/landlord-faq'}>
                  <a onClick={() => setOpenMenuDropdown(false)}>
                    <div
                      className={styles['menuItems']}
                      onClick={learnItemMenuDropdown('landlordfaq')}
                    >
                      <span>{t('text_landlord_faq')}</span>
                      <div>
                        <FaqIcon />
                      </div>
                    </div>
                  </a>
                </Link>
                <Link href={'/learn/tenant-faq'}>
                  <a onClick={() => setOpenMenuDropdown(false)}>
                    <div
                      className={styles['menuItems']}
                      onClick={learnItemMenuDropdown('tenantfaq')}
                    >
                      <span>{t('text_tenant_faq')}</span>
                      <div>
                        <FaqIcon />
                      </div>
                    </div>
                  </a>
                </Link>
                {user && user.phoneNumber && <Divider className='mt-2' />}
                {user && user.phoneNumber && (
                  <a onClick={() => logOut()}>
                    <div className={styles['menuItems']}>
                      <span>{t('text_log_out')}</span>
                      <div>
                        <LogoutIcon />
                      </div>
                    </div>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    )
  }

  let langArray = []
  if (!router.locale) {
    langArray = languagesArray.filter(item => item.link !== 'en')
  } else {
    langArray = languagesArray.filter(item => item.link !== router.locale)
  }

  return (
    <div>
      <Sticky
        className={`${styles['stickyHolder']} ${
          isOpenPlayStorePopup ? 'min-height' : ''
        }`}
      >
        <div
          className={styles['l-header']}
          style={{
            padding: isOpenPlayStorePopup ? 0 : '10px 0',
            height: props.isOpenPlayStore ? '8.5rem' : '4rem',
            maxHeight: props.isOpenPlayStore ? '8.5rem' : '4rem'
          }}
        >
          {isOpenPlayStorePopup ? (
            <PlayStorePopUp onClose={handlePlayStorePopup} />
          ) : null}

          <Container
            className={
              isOpenPlayStorePopup
                ? `${styles['container']} ${styles['mt-10px']}`
                : styles['container']
            }
          >
            {renderHeader()}
          </Container>
        </div>
      </Sticky>
      <EmailPopUp
        visible={openEmailPopUpModal}
        onHide={() => {
          setOpenEmailPopUpModal(false)
          Router.push('/more/refer')
        }}
      />
      <div className={'mobile--sidebar--wrapper'}>
        {isMobileMenuOpened && (
          <MobileSidebar
            styles={styles}
            isMobileMenuOpened={isMobileMenuOpened}
            renderMenu={renderMenu}
            handleOutsideClick={handleOutsideClick}
          />
        )}
      </div>
    </div>
  )
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 768
})

function mapStateToProps (state) {
  return {
    language: state.language,
    user: state.auth.user,
    goToReferPage: state.auth.goToReferPage,
    unreadMessageCount: state.chatReducer.unreadMessageCount
  }
}

function actionsStateToProps (dispatch) {
  return {
    languageActions: bindActionCreators(languageActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
    chatActions: bindActionCreators(chatActions, dispatch),
    learnItemsAction: bindActionCreators(learnItemsAction, dispatch)
  }
}

export default withSizes(mapSizesToProps)(
  connect(mapStateToProps, actionsStateToProps)(React.memo(Navbar))
)
