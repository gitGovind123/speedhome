import React from 'react'

import MapView from './MapView'
import { MAP_API_KEY } from '../../env'
import PropertyListItem from './PropertyListItem'
import Link from 'next/link'
import BreadCrumbDyn from '../Common/BreadCrumbDyn'
import Filter from '../Filter/index'
import { withRouter } from 'next/router'
import ReactPaginate from 'react-paginate'

import styles from './PropertyListMapViewFilter.module.scss'

const PropertyListMapViewFilter = props => {
  const {
    showListing,
    singleListing,
    propertyList,
    centerCoords,
    changeCoords,
    defaultZoom,
    hasListing,
    isLoading,
    page,
    queryData,
    route
  } = props

  const goToPage = number => {
    let searchQuery
    if (props.router.asPath.includes('?')) {
      if (props.router.asPath.includes('pg')) {
        searchQuery = props.router.asPath.replace(
          /(pg=([0-9]*))/,
          `pg=${number}`
        )
      } else {
        searchQuery = `${props.router.asPath}&pg=${number}`
      }
    } else {
      searchQuery = `${props.router.asPath}?pg=${number}`
    }

    return searchQuery
  }

  const listNotFound = () => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <p>
          Sorry,
          <br></br>No listing in this area <br></br> <br></br>
          You can search in other areas
          <Link href={`/rent/kuala-lumpur`}>
            <a
              style={{
                backgroundColor: '#4885ed',
                color: '#fff',
                border: 'none',
                opacity: '.9',
                borderRadius: '5px',
                marginTop: '.5rem',
                padding: '.3rem',
                display: 'block'
              }}
            >
              Search in other areas
            </a>
          </Link>
        </p>
      </div>
    )
  }
  const returnPagination = () => {
    return (
      <div
        className='pagination '
        style={{
          width: '100%'
        }}
      >
        <ReactPaginate
          pageCount={propertyList.totalPages}
          pageRangeDisplayed={4}
          marginPagesDisplayed={0}
          breakLabel={''}
          forcePage={propertyList.number}
          previousLabel='&lt; Prev'
          nextLabel='Next &gt;'
          activeLinkClassName='current'
          onPageChange={pageNum => {
            props.router.push(goToPage(pageNum.selected + 1))
          }}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        height: 'calc(100vh - 64px)',
        width: '100%'
      }}
    >
      <div className={styles['PropertyMapItemRootContainer']}>
        <div className={styles['PropertyMapItemContainer']}>
          <BreadCrumbDyn />
          <Filter page={page} queryData={queryData} />
          <div
            className={`${styles['propertyMapViewList__container']} mapViewContainer`}
            style={{
              padding: '0 1rem'
            }}
          >
            {hasListing ? (
              <div className={styles['propertyMapViewList__wrapper']}>
                {[].concat(propertyList.content).map((data, index) => {
                  return (
                    <>
                      <div className={styles['propertyMapViewList__items']}>
                        <PropertyListItem data={data} router={props.router} />
                      </div>
                      {propertyList.content.length >= 2 && index == 1 ? (
                        <div
                          className={styles['propertyMapViewList__items']}
                          style={{
                            background: 'yellow',
                            height: '415px',
                            border: '1px solid rgba(0,0,0,.125)',
                            borderRadius: '3px',
                            boxShadow: '0 6px 6px rgba(0,0,0,.16)'
                          }}
                        >
                          <card className={styles['Propertylist__item__card']}>
                            <div
                              className={styles['Propertylist__item__cover']}
                              style={{ textAlign: 'center' }}
                            >
                              <img
                                style={{ marginTop: '75px' }}
                                src='/img/zeroDeposit.png'
                                width={150}
                                height={150}
                                alt='zero deposit'
                              />
                            </div>
                          </card>
                          <div
                            className={styles['Propertylist__item__body']}
                            style={{
                              textAlign: 'center',
                              padding: '20px 10px 10px'
                            }}
                          >
                            <h3 style={{ color: 'purple' }}>What is</h3>
                            <h3 style={{ color: 'purple' }}> Zero Deposit </h3>
                            <h3 style={{ color: 'purple' }}>rental?</h3>
                            <a href='https://speedhome.com/blog/zero_deposit/'>
                              <button
                                style={{ background: '#fff', color: 'black' }}
                                className='btn btn-primary'
                              >
                                <strong>Know More</strong>
                              </button>
                            </a>
                          </div>
                        </div>
                      ) : propertyList.content.length == 2 && index == 1 ? (
                        <div
                          className={styles['propertyMapViewList__items']}
                          style={{
                            background: 'yellow',
                            height: '415px',
                            border: '1px solid rgba(0,0,0,.125)',
                            borderRadius: '3px',
                            boxShadow: '0 6px 6px rgba(0,0,0,.16)'
                          }}
                        >
                          <card className={styles['Propertylist__item__card']}>
                            <div
                              className={styles['Propertylist__item__cover']}
                              style={{ textAlign: 'center' }}
                            >
                              <img
                                style={{ marginTop: '75px' }}
                                src='/img/zeroDeposit.png'
                                width={150}
                                height={150}
                                alt='zero deposit'
                              />
                            </div>
                          </card>
                          <div
                            className={styles['Propertylist__item__body']}
                            style={{
                              textAlign: 'center',
                              padding: '20px 10px 10px'
                            }}
                          >
                            <h3 style={{ color: 'purple' }}>What is</h3>
                            <h3 style={{ color: 'purple' }}> Zero Deposit </h3>
                            <h3 style={{ color: 'purple' }}>rental?</h3>
                            <a href='https://speedhome.com/blog/zero_deposit/'>
                              <button
                                style={{ background: '#fff', color: 'black' }}
                                className='btn btn-primary'
                              >
                                <strong>Know More</strong>
                              </button>
                            </a>
                          </div>
                        </div>
                      ) : null}
                    </>
                  )
                })}
                {returnPagination()}
              </div>
            ) : (
              listNotFound()
            )}
          </div>
        </div>
        <div className={`${styles['PropertyMapContainer']} mapContainer`}>
          <MapView
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${MAP_API_KEY}`}
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            markers={[].concat(propertyList)}
            centerCoords={
              showListing
                ? {
                    lat: singleListing.latitude,
                    lng: singleListing.longitude
                  }
                : centerCoords
            }
            changeCoords={changeCoords}
            defaultZoom={defaultZoom}
          />
        </div>
      </div>
      {isLoading ? (
        <div className={`preloader ${styles['mapPreLoader']}`}>
          <img loading='lazy' src='/img/preloader.gif' alt='Home rent' />
        </div>
      ) : null}
    </div>
  )
}

export default withRouter(PropertyListMapViewFilter)
