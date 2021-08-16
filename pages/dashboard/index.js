import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../actions/authActions'

import useTranslation from 'next-translate/useTranslation'

import Link from 'next/link'
import { withRouter } from 'next/router'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'

import Head from '../../components/Common/Head'

import BreadCrumb from '../../components/Common/BreadCrumb'
import CONST from '../../globalutilities/consts'
import { logOut, getToken } from '../../globalutilities/helpers'
import styles from './dashboardIndex.module.scss'

const SPEEDSIGN_URL = 'https://speedmanage.com'

const Index = props => {
  const [isAuth, setIsAuth] = useState(false)
  const { t } = useTranslation('common')
  useEffect(() => {
    if (getToken()) {
      setIsAuth(true)
    }
  }, [])

  useEffect(() => {
    if (props.user && Object.keys(props.user).length) {
      setIsAuth(true)
    }
  }, [props.user])

  const logout = async () => {
    await logOut()
    props.authActions.clearUser()
    props.router.replace('/')
  }
  return (
    <React.Fragment>
      <Head title={t('dashboard:dashboard_title')} />
      <main id='main' className='inner-pages'>
        <BreadCrumb breadCrumb={CONST.dashboard} />

        <div className='container'>
          <div className='row more-links'>
            <div
              className={`col-xs-6 col-sm-4 more-col ${styles['more-col']}`}
              style={{ pointerEvents: isAuth ? 'unset' : 'none' }}
            >
              <div>
                <a href={'/dashboard/profile'}>
                  <div className='ico'>
                    <img
                      loading='lazy'
                      src='/img/icons/colored-avatar-circle.svg'
                      width={74}
                    />
                  </div>
                  <h2 className='txt'>{t('dashboard:text_profile')}</h2>
                </a>
              </div>
            </div>

            <div
              className={`col-xs-6 col-sm-4 more-col ${styles['more-col']}`}
              style={{ pointerEvents: isAuth ? 'unset' : 'none' }}
            >
              <div>
                <Link href={'/dashboard/listings'}>
                  <a>
                    <div className='ico'>
                      <img
                        loading='lazy'
                        src='/img/icons/colored-home-listing.svg'
                        width={119}
                      />
                    </div>
                    <h2 className='txt'>{t('dashboard:text_my_listings')}</h2>
                  </a>
                </Link>
              </div>
            </div>

            <div
              className={`col-xs-6 col-sm-4 more-col ${styles['more-col']}`}
              style={{ pointerEvents: isAuth ? 'unset' : 'none' }}
            >
              <div>
                <Link href={'/dashboard/chat'}>
                  <a>
                    <div className='ico'>
                      <img
                        loading='lazy'
                        src='/img/icons/colored-bubble.svg'
                        width={74}
                      />
                    </div>
                    <h2 className='txt'>{t('dashboard:text_chat')}</h2>
                  </a>
                </Link>
              </div>
            </div>

            <div
              className={`col-xs-6 col-sm-4 more-col ${styles['more-col']}`}
              style={{ pointerEvents: isAuth ? 'unset' : 'none' }}
            >
              <div>
                <Link href={'/dashboard/favorites'}>
                  <a>
                    <div className='ico'>
                      <img
                        loading='lazy'
                        src='/img/icons/colored-heart.svg'
                        width={62}
                      />
                    </div>
                    <h2 className='txt'>{t('dashboard:text_favorites')}</h2>
                  </a>
                </Link>
              </div>
            </div>

            <div
              className={`col-xs-6 col-sm-4 more-col ${styles['more-col']}`}
              style={{ pointerEvents: isAuth ? 'unset' : 'none' }}
            >
              <div>
                <a href={SPEEDSIGN_URL} target='_blank'>
                  <div className='ico'>
                    <img
                      loading='lazy'
                      src='/img/ico-speedsign.png'
                      width={67}
                    />
                  </div>
                  <h2 className='txt'>{t('dashboard:text_speedsign')} </h2>
                </a>
              </div>
            </div>

            <div
              className={`col-xs-6 col-sm-4 more-col ${styles['more-col']}`}
              style={{ pointerEvents: isAuth ? 'unset' : 'none' }}
            >
              <div>
                <Link href={'/dashboard/rental'}>
                  <a>
                    <div className='ico'>
                      <img
                        loading='lazy'
                        src='/img/collection.png'
                        width={97}
                      />
                    </div>
                    <h2 className='txt'>
                      {t('dashboard:text_rental_collection')}
                    </h2>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className={`btn-holder ${styles['control-panel-btn']}`}>
            {isAuth ? (
              <a
                onClick={logout}
                id='btnLogout'
                className='btn btn-curv btn-dark-gray'
              >
                <LogoutIcon
                  style={{
                    fontSize: '1.2em',
                    marginRight: '3px'
                  }}
                />
                {t('dashboard:text_log_out')}
              </a>
            ) : (
              ''
            )}
          </div>
        </div>
      </main>
    </React.Fragment>
  )
}

function mapStateToProps ({ language, auth }) {
  return {
    language: language,
    user: auth.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  }
}

export async function getStaticProps () {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Index))
