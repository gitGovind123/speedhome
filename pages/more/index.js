import React from 'react'
import { connect } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { Container } from 'react-bootstrap'

import Head from '../../components/Common/Head'
import BreadCrumb from '../../components/Common/BreadCrumb'
import CONST from '../../globalutilities/consts'

import styles from './moreIndex.module.scss'

const Index = () => {
  const { t } = useTranslation('common')
  return (
    <React.Fragment>
      <Head title={t('more:more_title')} />

      <main id='main' className='inner-pages'>
        <BreadCrumb breadCrumb={CONST.more} />
        <div className='page-main-title user-main-title'>
          <div className='container'>
            <h1>{t('text_more')}</h1>
          </div>
        </div>
        <Container>
          <div className='container'>
            <div className={`row more-links`}>
              <div className={`col-xs-6 col-sm-4 ${styles['more-col']}`}>
                <Link href={'/more/about'}>
                  <a>
                    <div className='inner'>
                      <div className={styles['ico']}>
                        <img
                          loading='lazy'
                          width='81'
                          src='/img/ico-about.png'
                          alt=''
                        />
                      </div>
                      <h2 className={styles['txt']}>
                        <span>{t('text_about_us')} </span>
                      </h2>
                    </div>
                  </a>
                </Link>
              </div>
              <div className={`col-xs-6 col-sm-4 ${styles['more-col']}`}>
                <a
                  href={'https://speedmanage.com/'}
                  target='_blank'
                  rel='noreferrer'
                >
                  <div className='inner'>
                    <div className={styles['ico']}>
                      <img
                        loading='lazy'
                        width='67'
                        src='/img/ico-speedsign.png'
                        alt=''
                      />
                    </div>
                    <h2 className={styles['txt']}>
                      <span>Speedmanage</span>
                    </h2>
                  </div>
                </a>
              </div>
              <div className={`col-xs-6 col-sm-4 ${styles['more-col']}`}>
                <Link href={'/more/contact'}>
                  <a>
                    <div className='inner'>
                      <div className={styles['ico']}>
                        <img
                          loading='lazy'
                          width='58'
                          src='/img/ico-contact.png'
                          alt=''
                        />
                      </div>
                      <h2 className={styles['txt']}>
                        <span>{t('text_contact_us')}</span>
                      </h2>
                    </div>
                  </a>
                </Link>
              </div>
              <div className={`col-xs-6 col-sm-4 ${styles['more-col']}`}>
                <a
                  href='https://blog.speedhome.com/blog/pr-masterlist'
                  target='_blank'
                  rel='noreferrer'
                >
                  <div className='inner'>
                    <div className={styles['ico']}>
                      <img
                        loading='lazy'
                        width='66'
                        src='/img/ico-media-01.png'
                        alt=''
                      />
                    </div>
                    <h2 className={styles['txt']}>
                      <span>{t('more:text_media')}</span>
                    </h2>
                  </div>
                </a>
              </div>
              <div className={`col-xs-6 col-sm-4 ${styles['more-col']}`}>
                <Link href={'/more/landlord'}>
                  <a>
                    <div className='inner'>
                      <div className={styles['ico']}>
                        <img
                          loading='lazy'
                          width='86'
                          src='/img/ico-landlord-help.png'
                          alt=''
                        />
                      </div>
                      <h2 className={styles['txt']}>
                        <span>{t('more:text_landlord_help')}</span>
                      </h2>
                    </div>
                  </a>
                </Link>
              </div>
              <div className={`col-xs-6 col-sm-4 ${styles['more-col']}`}>
                <Link href={'/more/tenant'}>
                  <a>
                    <div className='inner'>
                      <div className={styles['ico']}>
                        <img
                          loading='lazy'
                          width='68'
                          src='/img/ico-tenant-help.png'
                          alt=''
                        />
                      </div>
                      <h2 className={styles['txt']}>
                        <span>{t('more:text_tenant_help')}</span>
                      </h2>
                    </div>
                  </a>
                </Link>
              </div>

              <div className={`col-xs-6 col-sm-4 ${styles['more-col']}`}>
                <a
                  href='https://speedhome.com/blog/careers'
                  target='_blank'
                  rel='noreferrer'
                >
                  <div className='inner'>
                    <div className={styles['ico']}>
                      <img
                        loading='lazy'
                        width='68'
                        src='/img/ic_career.svg'
                        alt=''
                      />
                    </div>
                    <h2 className={styles['txt']}>
                      <span>Careers</span>
                    </h2>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  language: state.language
})
export async function getServerSideProps () {
  return {}
}

export default connect(mapStateToProps)(Index)
