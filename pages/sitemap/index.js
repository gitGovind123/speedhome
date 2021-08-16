import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Link from 'next/link'
import { connect } from 'react-redux'
import Row from 'react-bootstrap/Row'

import Head from '../../components/Common/Head'
import useTranslation from 'next-translate/useTranslation'
import BreadCrumb from '../../components/Common/BreadCrumb'
import CONST from '../../globalutilities/consts'
import Headline from '../../components/Post/Headline'
import { learnItemsAction } from '../../actions/learn'

import styles from './sitemap.module.scss'

const SiteMapComponent = props => {
  const [showHome, setShowHome] = useState(false)
  const [loadLocation, setLoadLocation] = useState(null)
  const { t } = useTranslation('common')
  const LOCATION = [
    {
      name: 'Cyberjaya',
      url: `${t('link_rent')}/cyberjaya`
    },
    {
      name: 'Bangsar',
      url: `${t('link_rent')}/bangsar`
    },
    {
      name: 'Petaling Jaya',
      url: `${t('link_rent')}/petaling-jaya`
    },
    {
      name: 'Puchong',
      url: `${t('link_rent')}/puchong`
    },
    {
      name: 'Shah Alam',
      url: `${t('link_rent')}/shah-alam`
    },
    {
      name: 'Subang Jaya',
      url: `${t('link_rent')}/subang-jaya`
    },
    {
      name: 'Cheras',
      url: `${t('link_rent')}/cheras`
    },
    {
      name: 'Kajang',
      url: `${t('link_rent')}/kajang`
    },
    {
      name: 'Ara Damansara',
      url: `${t('link_rent')}/ara-damansara`
    },
    {
      name: 'Kelana Jaya',
      url: `${t('link_rent')}/kelana-jaya`
    },
    {
      name: 'Bandar Utama',
      url: `${t('link_rent')}/bandar-utama`
    },
    {
      name: 'Kepong',
      url: `${t('link_rent')}/kepong`
    },
    {
      name: 'Bukit Jalil',
      url: `${t('link_rent')}/bukit-jalil`
    },
    {
      name: 'Kota Damansara',
      url: `${t('link_rent')}/kota-damansara`
    },
    {
      name: 'Gombak',
      url: `${t('link_rent')}/gombak`
    },
    {
      name: 'Old Klang Road',
      url: `${t('link_rent')}/old-klang-road`
    },
    {
      name: 'Sentul',
      url: `${t('link_rent')}/sentul`
    },
    {
      name: 'Klang',
      url: `${t('link_rent')}/klang`
    },
    {
      name: 'Wangsa Maju',
      url: `${t('link_rent')}/wangsa-maju`
    },
    {
      name: 'Kuala Lumpur',
      url: `${t('link_rent')}/kuala-lumpur`
    },
    {
      name: 'Damansara',
      url: `${t('link_rent')}/damansara`
    }
  ]

  useEffect(() => {
    const timeoutConst = setTimeout(() => {
      setShowHome(true)
    }, 200)
    setLoadLocation(LOCATION)
    return () => {
      clearTimeout(timeoutConst)
    }
  }, [])

  const learnItems = data => () => {
    props.learnItemsAction(data)
  }

  return (
    <>
      <Head title={'Sitemap | SPEEDHOME'} />

      <BreadCrumb breadCrumb={CONST.sitemap} />
      <Container>
        <Headline title={t('breadcrumb_sitemap')} link='/' />
      </Container>
      <div className={styles['static-content']} style={{ paddingLeft: '15px' }}>
        <div className={styles['slot-main']}>
          <Container>
            <Row md={12}>
              <h2>Home</h2>
              {showHome ? (
                <ul
                  className={`${styles['feature-main']} ${styles['sitemap-list']}`}
                >
                  <li>
                    <Link href={'/post'}>
                      <a alt='create property'>
                        {t('text_post_property_for_free')}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={'/hot'}>
                      <a x alt='popular areas'>
                        {t('text_hot_areas')}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={'/home-ownership'}>
                      <a alt='home ownership'>Home Ownership</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={'/more'}>
                      <a alt='more about tenant and landlord info'>
                        {t('text_more')}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={'/more/about'}>
                      <a alt='more about tenant and landlord'>
                        {t('text_about_us')}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={'/more/contact'}>
                      <a alt='contact info'>{t('text_contact_us')}</a>
                    </Link>
                  </li>

                  <li>
                    <Link href={'/learn/landlord-faq'}>
                      <a onClick={learnItems('landlordfaq')}>
                        {t('text_landlord_faq')}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={'/more/landlord/how'}>
                      <a alt='more landlord how it works'>
                        {t('text_more_landlord_how_it_works')}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={'/learn/tenant-faq'}>
                      <a onClick={learnItems('tenantfaq')}>
                        {t('text_tenant_faq')}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={'/more/tenant/no-deposit'}>
                      <a>{t('text_more_tenant_zero_deposit_payment')}</a>
                    </Link>
                  </li>
                  <li>
                    <a
                      rel='noreferrer'
                      target='_blank'
                      href='https://speedhome.com/blog/terms-of-use?__hstc=204954831.37a9339fc9ed82994df87412ae5408e0.1573011225834.1573011225834.1573019707436.2&__hssc=204954831.90.1573019707436&__hsfp=2289726407'
                    >
                      {t('text_privacy_policy')}
                    </a>
                  </li>
                  <li>
                    <Link href={'/learn/blog'}>
                      <a onClick={learnItems('blog')}>Blog</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={'/learn/event'}>
                      <a onClick={learnItems('webinar')}>Event</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={'/learn'}>
                      <a>{t('text_learn')}</a>
                    </Link>
                  </li>
                </ul>
              ) : null}
            </Row>
          </Container>
        </div>
        <div className={styles['slot-main']}>
          <Container>
            <Row md={12}>
              <h2>Location</h2>
              <ul
                className={`${styles['feature-main']} ${styles['sitemap-list']}`}
              >
                {loadLocation &&
                  loadLocation.length > 0 &&
                  loadLocation.map(l => {
                    return (
                      <li>
                        <Link href={l.url}>
                          <a>{l.name}</a>
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </Row>
          </Container>
        </div>
        <div className={styles['slot-main']}>
          <Container>
            <Row md={12}>
              <h2>Blog</h2>
              <ul
                className={`${styles['feature-main']} ${styles['sitemap-list']}`}
              >
                <li>
                  <a
                    rel='noreferrer'
                    target='_blank'
                    href='https://blog.speedhome.com/blog/should-malaysia-spend-more-budget-2020'
                  >
                    Should Malaysia spend more?
                  </a>
                </li>
                <li>
                  <a
                    rel='noreferrer'
                    target='_blank'
                    href='https://blog.speedhome.com/blog/10-unit-paling-popular-bulan-ogos/september-2019'
                  >
                    10 Unit Paling Popular Bulan Ogos/September 2019
                  </a>
                </li>
                <li>
                  <a
                    rel='noreferrer'
                    target='_blank'
                    href='https://blog.speedhome.com/blog/why-should-i-stamp-my-tenancy-agreement'
                  >
                    Why Should I Stamp My Tenancy Agreement?
                  </a>
                </li>
                <li>
                  <a
                    rel='noreferrer'
                    target='_blank'
                    href='https://blog.speedhome.com/blog/top-10-most-popular-units-in-august-2019'
                  >
                    Top 10 Most Popular Units in August 2019
                  </a>
                </li>
                <li>
                  <a
                    rel='noreferrer'
                    target='_blank'
                    href='https://blog.speedhome.com/blog/tenant-screening-made-easy'
                  >
                    Tenant Screening Made Easy - No, Seriously.
                  </a>
                </li>
                <li>
                  <a
                    rel='noreferrer'
                    target='_blank'
                    href='https://blog.speedhome.com/blog/apakah-proses-beli-rumah-pertama-anda'
                  >
                    Apakah Proses Beli Rumah Pertama Anda?
                  </a>
                </li>
                <li>
                  <a
                    rel='noreferrer'
                    target='_blank'
                    href='https://blog.speedhome.com/blog/hari-malaysia-sabah-and-sarawak'
                  >
                    Hari Malaysia: Sabah and Sarawak
                  </a>
                </li>
                <li>
                  <a
                    rel='noreferrer'
                    target='_blank'
                    href='https://blog.speedhome.com/blog/hari-malaysia-series-racial-discrimination'
                  >
                    Hari Malaysia Series: Stereotypes
                  </a>
                </li>
                <li>
                  <a
                    rel='noreferrer'
                    target='_blank'
                    href='https://blog.speedhome.com/blog/hari-malaysia-throwback-to-where-we-began'
                  >
                    Hari Malaysia: Throwback to where we began
                  </a>
                </li>
                <li>
                  <a
                    rel='noreferrer'
                    target='_blank'
                    href='https://blog.speedhome.com/blog/%E9%9B%AA%E9%9A%86%E4%BD%8F%E5%AE%85%E4%BA%A7%E4%B8%9A%E5%87%BA%E7%A7%9F%E9%9D%A2%E4%B8%B4%E6%8C%91%E6%88%98%E5%B1%8B%E4%B8%BB%E9%9C%80%E6%8A%8A%E6%8F%A1%E6%8B%9B%E7%A7%9F%E9%BB%84%E9%87%9124%E5%B0%8F%E6%97%B6'
                  >
                    雪隆住宅产业出租面临挑战，屋主需把握招租黄金24小时
                  </a>
                </li>
              </ul>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

const mapDispatchToProps = {
  learnItemsAction
}

export default connect(null, mapDispatchToProps)(SiteMapComponent)
