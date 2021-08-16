import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import useTranslation from 'next-translate/useTranslation'

import { Row, Col, Tabs, Tab } from 'react-bootstrap'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import styles from './index.module.scss'

const popularAreaArr = [
  { name: 'Kuala Lumpur', url: 'kuala-lumpur' },
  { name: 'Bandar Utama', url: 'bandar-utama' },
  { name: 'Puchong', url: 'puchong' },
  { name: 'Cyberjaya', url: 'cyberjaya' },
  { name: 'Bukit Jalil', url: 'bukit-jalil' },
  { name: 'Subang Jaya', url: 'subang-jaya' },
  { name: 'Petaling Jaya', url: 'petaling-jaya' },
  { name: 'Sentul', url: 'sentul' },
  { name: 'Kelana Jaya', url: 'kelana-jaya' },
  { name: 'Shah Alam', url: 'shah-alam' },
  { name: 'Wangsa Maju', url: 'wangsa-maju' },
  { name: 'Kota Damansara', url: 'kota-damansara' },
  { name: 'Cheras', url: 'cheras' },
  { name: 'Damansara', url: 'damansara' },
  { name: 'Old Klang Road', url: 'old-klang-road' },
  { name: 'Ara Damansara', url: 'ara-damansara' },
  { name: 'Bangsar', url: 'bangsar' },
  { name: 'Kajang', url: 'kajang' }
]

const popularSearchArr = [
  { name: 'Maisson Ara Damansara', url: 'maisson-ara-damansara-(pj)' },
  { name: 'Neo Damansara', url: 'neo-damansara' },
  { name: 'Arte Subang West', url: 'ARTE-SUBANG-WEST' },
  { name: 'Emporis Kota Damansara', url: 'Emporis-Kota-Damansara' },
  { name: 'Parkhill Residence', url: 'parkhill-residence-condo' },
  { name: 'Garden Plaza', url: 'garden-plaza-cyberjaya' },
  { name: 'Casa Green Bukit Jalil', url: 'Casa-Green-Bukit-Jalil' },
  { name: 'Park 51 Residency', url: 'Park-51-Residency' },
  { name: 'Trinity Aquata', url: 'trinity-aquata' },
  { name: 'Amaya Maluri', url: 'amaya-maluri,-taman-maluri' },
  { name: "D'sara Sentral", url: "d'sara-sentral" },
  { name: 'CentreStage PJ Studio', url: 'pj-centrestage-studio-unit-for-rent' },
  { name: 'Centrio Pantai Hillpark', url: 'Centrio-Pantai-Hillpark' },
  { name: 'Residensi Pandamas', url: 'Residensi-Pandanmas-2-Pandan-Indah' },
  { name: 'Sphere Damansara', url: 'sphere-damansara' },
  { name: 'The Henge Kepong', url: 'the-henge-kepong' },
  { name: 'Platinum Teratai', url: 'Residensi-Platinium-Teratai' },
  { name: 'The Zizz', url: 'the-zizz-damansara-damai' }
]

const PopularAreas = props => {
  const { isMobile } = props
  const [key, setKey] = useState('popular-area')
  const [popularSearch, setPopularSearch] = useState(popularSearchArr)
  const [popularArea, setPopularArea] = useState(popularAreaArr)
  const [expanded, setExpanded] = useState(false)
  const [expandedForArea, setExpandedForArea] = useState(false)
  const [itemsToShow, setItemsToShow] = useState(5)
  const [itemsToShowForArea, setItemsToShowForArea] = useState(5)
  const [active_class_area, setActive_class_area] = useState('')
  const [active_class_search, setActive_class_search] = useState('')

  const { t } = useTranslation('common')

  const showMore = () => {
    itemsToShow === 5
      ? (setItemsToShow(popularSearch.length), setExpanded(true))
      : (setItemsToShow(5), setExpanded(false))
  }

  const showMoreForArea = () => {
    itemsToShowForArea === 5
      ? (setItemsToShowForArea(popularArea.length), setExpandedForArea(true))
      : (setItemsToShowForArea(5), setExpandedForArea(false))
  }

  useEffect(() => {
    setActiveClass(key)
  }, [])

  const setActiveClass = k => {
    setKey(k)
    if (k === 'popular-area') {
      setActive_class_area(styles['active'])
      setActive_class_search(styles[''])
    }
    if (k === 'popular-search') {
      setActive_class_area(styles[''])
      setActive_class_search(styles['active'])
    }
  }

  return (
    <section className={styles['popular-areas-block']}>
      <div className={!isMobile ? 'container' : ''}>
        <Tabs
          activeKey={key}
          onSelect={k => setActiveClass(k)}
          className={`justify-content-center ${styles['nav']} ${styles['nav-tabs']}`}
        >
          <Tab
            eventKey='popular-area'
            className={`${styles['popular-area-tab']}`}
            tabClassName={`${styles['nav-item']} ${styles['nav-link']} ${active_class_area}`}
            title={
              <>
                {isMobile ? (
                  <span className={styles['property-search_icon_l']}>
                    <ArrowBackIosIcon className={styles['svg_icon']} />
                  </span>
                ) : null}
                <span className={styles['tab_name_popular-area']}>
                  Malaysia Property For Rent
                </span>
              </>
            }
          >
            <Row
              className={
                isMobile
                  ? `${styles['nav-tabs-text']} container mt-4`
                  : `${styles['nav-tabs-text']} mt-4`
              }
            >
              {isMobile
                ? popularArea.slice(0, itemsToShowForArea).map(item => {
                    return (
                      <Col md={4} className={styles['col-md-4']} key={item.url}>
                        <Link
                          href={`${t('link_rent')}/${item.url}`}
                          key={item.url}
                        >
                          <a>House for rent in {item.name}</a>
                        </Link>
                      </Col>
                    )
                  })
                : popularAreaArr.map(item => {
                    return (
                      <Col md={4} className={styles['col-md-4']} key={item.url}>
                        <Link
                          href={`${t('link_rent')}/${item.url}`}
                          key={item.url}
                        >
                          <a>House for rent in {item.name}</a>
                        </Link>
                      </Col>
                    )
                  })}
              {isMobile ? (
                <a
                  onClick={showMoreForArea}
                  className={styles['show-more-popular-area']}
                >
                  {expandedForArea ? (
                    <span>Show less</span>
                  ) : (
                    <span>Show more</span>
                  )}
                </a>
              ) : null}
            </Row>
          </Tab>
          <Tab
            eventKey='popular-search'
            title={
              <>
                Popular Property Searches
                {isMobile ? (
                  <span className={styles['property-search_icon']}>
                    <ArrowForwardIosIcon className={styles['svg_icon']} />
                  </span>
                ) : null}
              </>
            }
            tabClassName={`${styles['nav-item']} ${styles['nav-link']} ${active_class_search}`}
          >
            <Row
              className={
                isMobile
                  ? `${styles['nav-tabs-text']} container mt-4 `
                  : `${styles['nav-tabs-text']} mt-4`
              }
            >
              {isMobile
                ? popularSearch.slice(0, itemsToShow).map(item => {
                    return (
                      <Col md={4} className={styles['col-md-4']} key={item.url}>
                        <Link
                          href={`${t('link_rent')}/${item.url}`}
                          key={item.url}
                        >
                          <a>{item.name} for rent</a>
                        </Link>
                      </Col>
                    )
                  })
                : popularSearchArr.map(item => {
                    return (
                      <Col md={4} className={styles['col-md-4']} key={item.url}>
                        <Link
                          href={`${t('link_rent')}/${item.url}`}
                          key={item.url}
                        >
                          <a>{item.name} for rent</a>
                        </Link>
                      </Col>
                    )
                  })}
              {isMobile ? (
                <a
                  onClick={showMore}
                  className={`${styles['show-more-popular-area']} mt-3`}
                >
                  {expanded ? <span>Show less</span> : <span>Show more</span>}
                </a>
              ) : null}
            </Row>
          </Tab>
        </Tabs>
      </div>
    </section>
  )
}

export default React.memo(PopularAreas)
