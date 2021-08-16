import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { withRouter } from 'next/router'
import Chip from '@material-ui/core/Chip'
import Filter from '../../components/Filter'
import Head from '../../components/Common/Head'
import BreadCrumb from '../../components/Common/BreadCrumb'
import CONST from '../../globalutilities/consts'
import { getHotPropertiesList } from '../../actions'
import Loader from '../../components/Common/Loader'

import styles from './hot.module.scss'

const klangValleyAreas = [
  'Ara Damansara',
  'Bandar Utama',
  'Bukit Jalil',
  'Puchong',
  'Subang Jaya',
  'Kajang',
  'Kelana Jaya',
  'Gombak',
  'Sentul',
  'Wangsa Maju',
  'Kepong',
  'Kota Damansara',
  'Old Klang Road',
  'Damansara',
  'Bangsar',
  'Klang'
]

const otherPopularCities = [
  'Alor Setar',
  'Sungai Petani',
  'Seberang Perai',
  'Georgetown',
  'Ipoh',
  'Seremban',
  'Nilai',
  'Kuantan',
  'Melaka',
  'Kota Bharu',
  'Kuala Terengganu',
  'Iskandar Puteri',
  'Johor Bahru',
  'Kota Kinabalu',
  'Tawau',
  'Sandakan',
  'Kuching',
  'Miri'
]

const Index = props => {
  const [hotProperties, setHotProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation('common')
  useEffect(() => {
    async function fetchPropertiesList () {
      const result = await getHotPropertiesList()
      setHotProperties(
        result.success ? (result.data && result.data.content) || [] : []
      )
      setIsLoading(false)
    }
    fetchPropertiesList()
  }, [])

  return (
    <React.Fragment>
      <Head title={t('hot:popular_areas_title')} />
      <main id='main' className={styles['popular-areas']}>
        <BreadCrumb breadCrumb={CONST.hotPage} />

        <Filter page={'/hot'} queryData={props.router.query} />
        <div className={`${styles['page-main-title']} user-main-title`}>
          <div className='container'>
            <h1>{t('text_hot_areas')}</h1>
            <p>{t('hot:text_find_your_property')}</p>
          </div>
        </div>
        <div className={styles['areas-main']}>
          <div className='container'>
            <div className='slot'>
              <div className='row'>
                {isLoading ? (
                  <Loader />
                ) : (
                  hotProperties.map((property, index) => (
                    <div
                      key={index}
                      className={`col-xs-12 col-sm-4 col-md-3 ${styles['pro-col']}`}
                    >
                      <div className={styles['img']}>
                        <Link
                          href={`${t(
                            'link_rent'
                          )}/${property.name.toLowerCase()}`}
                        >
                          <a>
                            <img
                              loading='lazy'
                              src={property && property.imageUrl}
                              onError={e => {
                                e.target.onerror = null
                                e.target.src = '/img/image-not-found.png'
                              }}
                              alt='images'
                            />
                            <center>{property.name}</center>
                          </a>
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className={`row ${styles['otherCities']}`}>
                <div className='col-xs-12 col-sm-6'>
                  <h6>{t('hot:text_kalang_valley')}</h6>
                  {klangValleyAreas.map(item => {
                    return (
                      <Link
                        href={`${t('hot:link_rent')}/${item.toLowerCase()}`}
                        key={item}
                      >
                        <a>
                          <Chip
                            classes={{
                              root: styles['MuiChip-root'],
                              label: styles['MuiChip-label']
                            }}
                            label={item}
                            clickable
                          />
                        </a>
                      </Link>
                    )
                  })}
                </div>
                <div className='col-xs-12 col-sm-6'>
                  <h6>{t('hot:text_other_popular_cities')}</h6>
                  {otherPopularCities.map(item => {
                    return (
                      <Link
                        href={`${t('hot:link_rent')}/${item.toLowerCase()}`}
                        key={item}
                      >
                        <a>
                          <Chip
                            classes={{
                              root: styles['MuiChip-root'],
                              label: styles['MuiChip-label']
                            }}
                            label={item}
                            clickable
                          />
                        </a>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
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

export async function getServerSideProps () {
  return {}
}

export default withRouter(connect(mapStateToProps)(Index))
