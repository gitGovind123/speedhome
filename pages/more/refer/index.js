import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { Container } from 'react-bootstrap'

import { bindActionCreators } from 'redux'
import Head from '../../../components/Common/Head'

import { getUserProfile } from '../../../actions'
import * as authActions from '../../../actions/authActions'
import { updateInstallSource } from '../../../api/chatRequest'

import { getToken } from '../../../globalutilities/helpers'
import ReferKnowMore from '../../../components/more/referKnowMore'
import Earning from '../../../components/more/Earning'
import MyReferees from '../../../components/more/MyReferess'

import styles from './refer.module.scss'

const Refer = props => {
  // const { user, windowOrigin } = props

  // const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [isEarnings, setIsEarnings] = useState(false)
  const [isReferes, setIsReferes] = useState(false)
  const [isRefRoot, setIsRefRoot] = useState(true)
  const [showCopy, setCopy] = useState(false)
  const { t } = useTranslation('common')
  useEffect(() => {
    if (!getToken()) {
      props.authActions.openLoginModal({
        countryData: null,
        phoneNumber: null,
        request: true,
        disableClose: true
      })
    } else {
      const result = getUserProfile()
      if (result.success && result.data) {
        setProfile(result.data)
      }
    }
  }, [])

  useEffect(() => {
    if (props.user) {
      setProfile(props.user)
      const param = localStorage.getItem('utmParam')
      if (param) {
        const data = {
          source: param
        }
        updateInstallSource(data).then(res => {})
      }
    }
  }, [props.user])

  const myReferess = () => {
    setIsReferes(true)
    setIsRefRoot(false)
    setIsEarnings(false)
  }
  const myEarnings = () => {
    setIsReferes(false)
    setIsRefRoot(false)
    setIsEarnings(true)
  }

  const backToRefer = () => {
    setIsReferes(false)
    setIsRefRoot(true)
    setIsEarnings(false)
  }

  const copy = () => {
    setCopy(true)
    setTimeout(() => setCopy(false), 1000)
    const tar = document.getElementById('copy-text')
    tar.select()
    document.execCommand('Copy')
  }

  const title = 'SPEEDHOME Referral Program '+ (new Date().getFullYear()) +' | Refer & Earn RM200'
  const description = 'Introduce SPEEDHOME to your friends. Get RM200 cash for you, RM100 for your friends. Start sharing your referral link with your friends to earn cash now!'

  let phoneNumber = ''
  if (profile) {
    phoneNumber = profile.phoneNumber
  }
  var winEncodeUri = ''
  if (typeof window !== 'undefined') {
    winEncodeUri = window.encodeURIComponent
  }

  return (
    <>
      <Head
        title={title}
        description={description}
      />
      <div className='static-content'>
        {(isReferes || isEarnings) && (
          <div className={styles['refer__back-container']}>
            <div className={styles['refer-back__btn']} onClick={backToRefer}>
              <img src={'/img/icons/arrow-back.png'} alt='' />
              <div className={styles['refer-back__text']}>Back</div>
            </div>
          </div>
        )}
        <Container className='mt-5'>
          {isRefRoot && (
            <div className={`row ${styles['ref-left-root']}`}>
              <div className='col-md-7'>
                <div className={styles['refer__left--container']}>
                  <div className={styles['refer__nav-head']}>
                    <div className={styles['refer__user-info']}>
                      {props.user && props.user.avatar && props.user.avatar ? (
                        <img
                          className={styles['refer__user-img']}
                          src={props.user.avatar}
                          alt='img'
                        />
                      ) : (
                        <div className={styles['img-alternative']}>
                          {props.user &&
                            props.user.name &&
                            props.user.name.toUpperCase().substring(0, 1)}
                        </div>
                      )}
                      <div className={styles['refer__user-name']}>
                        {props.user && props.user.name && props.user.name}
                      </div>
                    </div>
                    <div className={styles['refe-nav__container']}>
                      <button
                        className={styles['refer-nav__my-refer--btn']}
                        onClick={myReferess}
                      >
                        {t('more:my_referess')}
                      </button>
                      {/* <button
                        className='refer-nav__my-earn--btn'
                        onClick={myEarnings}
                      >
                        {t('more:my_earnings')}
                      </button> */}
                    </div>
                  </div>

                  <div className={styles['refer-root__body']}>
                    <div className={styles['refer-introduce-container']}>
                      <div className={styles['introduce-head']}>
                        {t('more:refer_introduce_text')}
                      </div>
                      <div className={styles['introduce-body']}>
                        <div className={styles['introduce__text-one']}>
                          <span>1</span> {t('more:refer_introduce_text1')}
                        </div>
                        <div className={styles['introduce__text-one']}>
                          <span>2</span>
                          {t('more:refer_introduce_text2')}
                        </div>
                        <div className={styles['introduce__text-one']}>
                          <span>3</span>
                          {t('more:refer_introduce_text3')}
                        </div>
                      </div>
                    </div>

                    <ReferKnowMore styles={styles} />
                  </div>
                </div>
              </div>

              <div className='col-md-5'>
                <div className={styles['refer-share']}>
                  <div className={styles['refer-share-img__wrapper']}>
                    <img src={'/img/refer-share-img.png'} alt='' />
                  </div>
                  <div className={styles['refer-share__heading']}>
                    {t('more:refer_share_link_head')}
                  </div>
                  <div className={styles['refer-share__text']}>
                    {t('more:refer_share_link_content')}
                  </div>
                  <div className={styles['refer-share__copy-link']}>
                    <input
                      id='copy-text'
                      className={styles['refer-share__link-input']}
                      value={'https://speedhome.com/refer/' + phoneNumber}
                      readOnly
                    />
                    <div
                      className={styles['refer-share__copy-text']}
                      onClick={copy}
                    >
                      {t('more:refer_share_link_copy')}
                    </div>
                    {showCopy && (
                      <div className={styles['copy__link']}>Link Copied</div>
                    )}
                  </div>
                  <div className={styles['refer-share__link']}></div>
                  <div className={styles['refer-share-social']}>
                    <a
                      rel='noreferrer'
                      target='_blank'
                      href={`https://www.facebook.com/sharer.php?u=${winEncodeUri &&
                        winEncodeUri(
                          `https://speedhome.com/refer/${phoneNumber}`
                        )}`}
                      className={styles['refer-share-facebook']}
                    >
                      <img src={'/img/icons/facebook.svg'} alt='' />
                      <div className='social__text'>Facebook</div>
                    </a>
                    <a
                      rel='noreferrer'
                      target='_blank'
                      href={`https://api.whatsapp.com/send?text=https://speedhome.com/refer/${phoneNumber}`}
                      data-action='share/whatsapp/share'
                      className={styles['refer-share-whatsapp']}
                    >
                      <img src={'/img/icons/whatsapp.png'} alt='' />
                      <div className={styles['social__text']}>Whatsapp</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isEarnings && <Earning styles={styles} />}
          {isReferes && <MyReferees styles={styles} phone={phoneNumber} />}
        </Container>
      </div>
      {/* </main> */}
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  }
}

function mapStateToProps (state) {
  return {
    user: state.auth.user,
    language: state.language
  }
}

export async function getServerSideProps () {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Refer)

// dangerouslySetInnerHTML={{
//   __html: t(
//     'text_more_landlord_overview_get_protected',
//     { interpolation: { escapeValue: false } }
//   )
// }}
