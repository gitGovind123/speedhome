import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'

import Sticky from 'react-sticky-el'
import ReactPaginate from 'react-paginate'
import withSizes from 'react-sizes'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import useTranslation from 'next-translate/useTranslation'

import * as propertyAlertActions from '../../actions/propertyAlert'
import * as singlePropertyActions from '../../actions/singleProperty'
import * as propertyActions from '../../actions/property'
import { getUserData } from '../../actions/authActions'

import { bindActionCreators } from 'redux'

import BreadCrumbDyn from '../Common/BreadCrumbDyn'
import Filter from '../Filter/index'

import PropertyListItem from './PropertyListItem'
import { optimalZoomLevel } from './optimalZoomLevel'
import SearchAlertBox from '../SearchAlertBox'
import EmailPopUp from '../Common/EmailPopUp'

import {
  deleteFavorite,
  getFavPropertyList,
  checkPropertyIsFavoriteOrNot,
  addToFavorite
} from '../../actions'
import CONST from '../../globalutilities/consts'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import PropertyListStatus from './PropertyListStatus'
const PropertyListAlertModal = dynamic(() => import('./PropertyListAlertModal'))
const PropertyListSubscriptionAlertStatusModal = dynamic(() =>
  import('./PropertyListSubscriptionAlertStatusModal')
)

import PropertyListMapViewFilter from './PropertyListMapViewFilter'
import PropertyListLocationLink from './PropertyListLocationLink'
import { getPropertyName, getPropertyTypeName } from './DataQuery'
import { SELECTED_AREAS } from '../../globalutilities/SelectedAreas'
import { triggerGTAG } from '../../utils/utils'
import { getToken, getUserId } from '../../globalutilities/helpers'
import Review from './Review'
import PropertyZeroDepositItemCard from './PropertyZeroDepositItemCard'

import styles from './PropertyList.module.scss'

const NearbySlider = dynamic(() => import('./NearbySlider'), {
  loading: () => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#fefefe',
          height: '457px',
          width: '100%'
        }}
      ></div>
    )
  },
  ssr: false
})

const PropertyList = props => {
  const { router, locationLink, locationName, isNearbyPage } = props
  const [singleListing, setSingleListing] = useState(null)
  const [showListing, setShowListing] = useState(false)
  const [isFavoriteCheck, setIsFavoriteCheck] = useState(false)
  const [clientPropertyList, setClientPropertyList] = useState(null)
  const [clientPropertyListNearby, setClientPropertyListNearby] = useState(null)
  const [isClient, setIsClient] = useState(false)
  const [scrollDirection, setScrollDirection] = useState(null)
  const [isMap, setisMap] = useState(router.query.map ? router.query.map : -1)
  const [isLoading, setIsLoading] = useState(false)
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [
    subscribePropertyAlertStatus,
    setSubscribePropertyAlertStatus
  ] = useState(false)
  const [openEmailPopUpModal, setOpenEmailPopUpModal] = useState(false)

  const [centerCoords, setCenterCoords] = useState({
    lat: '',
    lang: ''
  })
  const [defaultZoom, setDefaultZoom] = useState(15)
  const [filterData, setFilterData] = useState(null)
  const [hasListing, setHasListing] = useState(false)

  const { t } = useTranslation('common')

  useEffect(() => {
    let centerCoordsVar = null

    const { lat, lng } = SELECTED_AREAS.find(
      item => item.link === 'kuala-lumpur'
    )
    centerCoordsVar = { lat, lng }

    let defaultZoom = 15
    if (
      props.propertyList &&
      props.propertyList.content &&
      props.propertyList.content.length > 0
    ) {
      setHasListing(true)
      const { propertyList } = props

      setClientPropertyList(props.propertyList)
      setClientPropertyListNearby(props.propertyListNearby)
      const sortedLatList = propertyList.content
        .slice()
        .sort((a, b) => a.latitude - b.latitude)
      const sortedLngList = propertyList.content
        .slice()
        .sort((a, b) => a.longitude - b.longitude)
      const n = propertyList.content.length - 1
      centerCoordsVar = {
        lat: sortedLatList[(n / 2) | 0].latitude
          ? sortedLatList[(n / 2) | 0].latitude
          : '',
        lng: sortedLngList[(n / 2) | 0].longitude
          ? sortedLngList[(n / 2) | 0].longitude
          : ''
      }
      if (propertyList.content.length > 1)
        defaultZoom = optimalZoomLevel(
          sortedLatList[n].latitude,
          sortedLatList[0].latitude,
          sortedLngList[n].longitude,
          sortedLngList[0].longitude
        )
      setCenterCoords(centerCoordsVar)
      setDefaultZoom(defaultZoom)
    } else {
      setHasListing(false)
    }
  }, [props.propertyList])

  useEffect(() => {
    if (router && router.query) {
      if (countInstances(router.asPath, '?') >= 2) {
        const hasslash = countInstances(router.asPath, '/?')
        if (hasslash) {
          window.location.href = router.asPath.replace('/?', '&')
        }
      } else {
        configureFilter(router)
      }
    }
  }, [router])

  useEffect(() => {
    if (isClient) {
      if (
        props.clientList &&
        props.clientList.content &&
        props.clientList.content.length > 0
      ) {
        setIsLoading(false)
        setClientPropertyList(props.clientList)
        setHasListing(true)
      } else {
        setHasListing(false)
        setIsLoading(false)
      }
    }
  }, [props.clientList])

  useEffect(() => {
    const {
      rooms,
      roomType,
      bathrooms,
      bathroomType,
      centerCoords,
      keywords,
      searchQueryVar,
      propertyFurnish,
      propertyType
    } = getConfigureSearchData(router)
    let propertiesId = ''
    if (
      clientPropertyList &&
      clientPropertyList.content &&
      clientPropertyList.content.length > 0
    ) {
      propertiesId = clientPropertyList.content.map(x => x.id).join()
    }
    if (getToken() && getUserId()) {
      getUserData().then(res => {
        if (res && res.type === 'SUCCESS') {
          const userEmail = res.payload.email ? res.payload.email : ''
          triggetTagManager(
            propertiesId,
            userEmail,
            router,
            propertyType,
            propertyFurnish,
            rooms,
            bathroomType
          )
        }
      })
    } else {
      triggetTagManager(
        propertiesId,
        '',
        router,
        propertyType,
        propertyFurnish,
        rooms,
        bathroomType
      )
    }
  }, [clientPropertyList])

  useEffect(() => {
    if (!_.isEmpty(props.subscribePropertyAlert)) {
      // Object.entries(subscribePropertyAlert).length === 0 && subscribePropertyAlert.constructor === Object
      setSubscribePropertyAlertStatus(true)
      setShowAlertModal(false)
    }
  }, [props.subscribePropertyAlert])

  useEffect(() => {
    if (props.selectedProperty) {
      setSingleListing(props.selectedProperty)
      setShowListing(true)
    } else {
      setSingleListing(null)
      setShowListing(false)
    }
  }, [props.selectedProperty])

  //build search url for nearby
  let showAllNearby = () => {
    let searchUrl = {
      url: '',
      path: ''
    }
    searchUrl.url = '/rent/nearby/'
    searchUrl.url += `${router.query.loc}?`

    //Query
    if (router.query.q !== '') {
      searchUrl.url += `q=${router.query.q}`
      window.location.href = searchUrl.url
    }
  }

  const countInstances = (string, word) => {
    return string.split(word).length - 1
  }

  const getConfigureSearchData = data => {
    let rooms = -1
    let roomType = -1
    let bathrooms = -1
    let bathroomType = -1
    let centerCoords
    let keywords
    let searchQueryVar = ''
    let propertyFurnish = 'basic'
    let propertyType = ''

    if (router) {
      if (router.query) {
        // roomType and rooms starts
        if (router.query.bed) {
          if (router.query.types && router.query.types === 'room') {
            roomType = Number(router.query.bed)
          } else {
            rooms = Number(router.query.bed)
          }
        }
        // roomType and rooms  ends

        // bathroom and bathroomType starts
        if (router.query.bath) {
          if (router.query.types && router.query.types === 'room') {
            bathroomType = Number(router.query.bath)
          } else {
            bathrooms = Number(router.query.bath)
          }
        }
        // bathroom and bathroomType ends
      }
    }

    // centerCoords starts
    if (router.query.lat) {
      centerCoords = {
        lat: router.query.lat,
        lng: router.query.lng
      }
    } else if (
      router.query.loc &&
      SELECTED_AREAS.filter(item => item.link === router.query.loc)[0]
    ) {
      centerCoords = {
        lat: SELECTED_AREAS.filter(item => item.link === router.query.loc)[0]
          .lat,
        lng: SELECTED_AREAS.filter(item => item.link === router.query.loc)[0]
          .lng
      }
    } else {
      centerCoords = {
        lat: SELECTED_AREAS.filter(item => item.link === 'kuala-lumpur')[0].lat,
        lng: SELECTED_AREAS.filter(item => item.link === 'kuala-lumpur')[0].lng
      }
    }

    if (centerCoords) centerCoords = centerCoords
    // centerCoords ends

    // keywords starts
    if (router.query.q) {
      keywords = router.query.q
    } else if (router.query.loc) {
      keywords = router.query.loc /*  */
    }
    // keywords starts

    // searchQueryVar starts
    if (router.query && router.query.types) {
      searchQueryVar = `${router.query.types.split(',').join('%')}${
        window.location.search
      }`
    } else {
      searchQueryVar = `${window.location.search}`
    }
    // searchQueryVar ends

    //propertyFurnish starts
    if (router.query && router.query.furnish) {
      if (Number(router.query.furnish) === 0) {
        propertyFurnish = 'basic'
      } else if (Number(router.query.furnish) === 1) {
        propertyFurnish = 'partial'
      } else if (Number(router.query.furnish) === 2) {
        propertyFurnish = 'full'
      }
    }
    // propertyFurnish ends

    // propertyType starts
    if (router.query && router.query.types) {
      if (router.query.types.includes('house')) {
        propertyType = router.query.types.replace('house', 'landed')
      } else {
        propertyType = router.query.types
      }
    }
    // propertyType ends

    return {
      rooms,
      roomType,
      bathrooms,
      bathroomType,
      centerCoords,
      keywords,
      searchQueryVar,
      propertyFurnish,
      propertyType
    }
  }

  const configureFilter = MemoryRouter => {
    const {
      rooms,
      roomType,
      bathrooms,
      bathroomType,
      centerCoords,
      keywords
    } = getConfigureSearchData(router)

    setFilterData({
      map: router.query.map ? router.query.map : -1,
      location: router.query && router.query.loc ? router.query.loc /*  */ : '',
      keywords,

      types: router.query && router.query.types ? router.query.types : '',
      furnish:
        router.query && router.query.furnish
          ? Number(router.query.furnish)
          : -1,
      maxPrice: router.query && router.query.max ? Number(router.query.max) : 0,
      leaseType:
        router.query && router.query.leaseType ? router.query.leaseType : '',
      rooms,
      roomType,
      bathrooms,
      bathroomType,
      cars: router.query && router.query.car ? Number(router.query.car) : -1,
      nearLrt: router.query && router.query.lrt ? Number(router.query.lrt) : -1,
      petFriendly:
        router.query && router.query.petFriendly
          ? Number(router.query.petFriendly)
          : -1,
      allRaces:
        router.query && router.query.allRaces
          ? Number(router.query.allRaces)
          : -1,
      instantView:
        router.query && router.query.instantView
          ? Number(router.query.instantView)
          : -1,
      landmarkLabelId: router.query && router.query.lm ? router.query.lm : -1,
      centerCoords
    })
  }
  const triggetTagManager = (
    propertiesId,
    userEmail,
    data,
    propertyType,
    propertyFurnish,
    rooms,
    bathroomType
  ) => {
    triggerGTAG({
      event: 'search',
      propertyIds: propertiesId ? [propertiesId] : [],
      email: userEmail ? userEmail : '',
      searchQuery: window.location.search,
      type: props.router.asPath.includes('/rent') ? 'rent' : 'buy',
      propertyType: propertyType,
      propertyFurnish: propertyFurnish,
      minimumCost:
        router.query && router.query.min ? Number(router.query.min) : -1,
      maximumCost:
        router.query && router.query.max ? Number(router.query.max) : -1,
      propertyBedroom: rooms,
      propertyBathroom: bathroomType
    })
  }
  const goToPage = number => {
    let searchQuery
    if (router.asPath.includes('?')) {
      if (router.asPath.includes('pg')) {
        searchQuery = router.asPath.replace(/(pg=([0-9]*))/, `pg=${number}`)
      } else {
        searchQuery = `${router.asPath}&pg=${number}`
      }
    } else {
      searchQuery = `${router.asPath}?pg=${number}`
    }

    return searchQuery
  }

  const showSingleListing = data => () => {
    props.singlePropertyActions.selectProperty(data)
  }

  const changeCoords = coords => {
    setIsLoading(true)
    props.singlePropertyActions.deselectProperty()
    const coordsArray = coords
      .replace('(', '')
      .replace(')', '')
      .split(', ')

    let filterQuery = getFilterData()
    filterQuery.keywords = ''
    filterQuery.latitude = coordsArray[0]
    filterQuery.longitude = coordsArray[1]
    setCenterCoords({
      lat: coordsArray[0],
      lng: coordsArray[1]
    })
    setIsClient(true)

    props.propertyActions.getPropertyList(filterQuery)
    // props.router.push('/rent/kuala-lumpur?q=kuala-lumpur&map=1')
  }
  const getFilterData = () => {
    const { pathname } = router
    const {
      keywords,
      bed,
      bath,
      car,
      furnish,
      allRaces,
      instantView,
      nearLrt,
      petFriendly,
      landmarkLabelId,
      min,
      max,
      types,
      leaseType
    } = filterData
    let filterQuery = {}

    if (keywords) {
      filterQuery.keywords = keywords
    }

    if (bed) {
      filterQuery.bedroom = bed
    }

    if (bath) {
      filterQuery.bathroom = bath
    }

    if (car) {
      filterQuery.carpark = car
    }

    if (furnish !== -1) {
      filterQuery.furnishType = furnish
    }

    if (allRaces !== -1) {
      filterQuery.allRaces = true
    }

    if (instantView !== -1) {
      filterQuery.instantView = true
    }

    if (nearLrt !== -1) {
      filterQuery.nearLrt = true
    }

    if (petFriendly !== -1) {
      filterQuery.petFriendly = true
    }

    if (landmarkLabelId !== -1) {
      filterQuery.landmarkLabelId = landmarkLabelId
    }

    if (min) {
      filterQuery.minPrice = min
      if (/buy/.test(pathname) || /beli/.test(pathname)) {
        if (Number(max) < 5000000) {
          filterQuery.maxPrice = max
        }
      } else {
        if (Number(max) < 6000) {
          filterQuery.maxPrice = max
        }
      }
    }

    if (types) {
      let typesQ
      if (types.includes('house')) {
        typesQ = types.replace('house', 'landed')
      } else if (types.includes('studio')) {
        typesQ = types.replace('studio', 'highrise')
        if (!filterQuery.bedroom) filterQuery.bedroom = 0
      } else if (types.includes('apartment')) {
        typesQ = types.replace('apartment', 'highrise')
        if (!filterQuery.bedroom) filterQuery.bedroom = 2
      } else if (types.includes('condo')) {
        typesQ = types.replace('condo', 'highrise')
        if (!filterQuery.bedroom) filterQuery.bedroom = 2
      } else if (types.includes('terrace')) {
        typesQ = types.replace('terrace', 'landed')
      } else typesQ = types

      filterQuery.types = typesQ.toUpperCase().split(',')
    } else {
      if (/buy/.test(pathname) || /beli/.test(pathname)) {
        filterQuery.types = ['LANDED_SALE', 'HIGHRISE_SALE']
      }
    }

    if (leaseType) {
      filterQuery.leaseType = leaseType
    }

    return filterQuery
  }
  const handleCloseModal = () => {
    setShowAlertModal(false)
    setSubscribePropertyAlertStatus(false)
  }

  const subscribeToAlert = (e, email = '') => {
    e.preventDefault()
    let alertQuery = {
      email: email ? email : e.target.elements.emailAlertSubscribe.value
    }
    alertQuery.searchFilter = getFilterData()
    props.propertyAlertActions.subscribeAlert(alertQuery)
  }

  const returnZeroDepositCard = (list, index) => {
    let isShowCard = false
    if (!props.isMobile) {
      if (list.length >= 2 && index === 1) {
        isShowCard = true
      }
    } else {
      if (list.length >= 2 && index === 0) {
        isShowCard = true
      }
    }
    return isShowCard ? <PropertyZeroDepositItemCard styles={styles} /> : null
  }

  return (
    <>
      <ToastContainer />
      {Number(isMap) !== 1 ? (
        <>
          <BreadCrumbDyn />
          {!router.asPath.includes('/rental-bidding') && (
            <Sticky
              className={`stickyHolder ${styles['stickyHolder']} ${
                scrollDirection === 'up'
                  ? `${styles['filterSticky']} filterSticky`
                  : ''
              }`}
            >
              <Filter page={router.asPath} queryData={router.query} />
            </Sticky>
          )}
        </>
      ) : null}
      {Number(isMap) !== 1 ? (
        clientPropertyList ? (
          <div className={'container'}>
            {isNearbyPage ? (
              <div className={styles['PropertyList__nearby--wrapper']}>
                <Row>
                  <Col>
                    <h4>
                      Property near {locationName.replace(/[-]/g, ' ')} (
                      {clientPropertyList.totalElements}){' '}
                    </h4>
                    <p>
                      Other tenants just viewed these properties nearby{' '}
                      <b>{locationName.replace(/[-]/g, ' ')}</b> that you might
                      be interested in.
                    </p>
                  </Col>
                </Row>
              </div>
            ) : (
              <>
                {router.asPath.includes('/rental-bidding') ? null : (
                  <PropertyListStatus
                    listStattus={router.query.status}
                    propertyList={clientPropertyList}
                    propertyName={getPropertyName(router, t)}
                    typeName={getPropertyTypeName(router, t)}
                    locationName={locationName}
                    handleOpenAlertModal={() => setShowAlertModal(true)}
                  />
                )}
              </>
            )}

            <div className={styles['results-main']}>
              {router.query.status && (
                <div className={styles['similar-listing']}>Similar Listing</div>
              )}
              <Row
                style={{
                  padding: '0 4px'
                }}
              >
                {clientPropertyList.content &&
                  clientPropertyList.content.map((item, index) => {
                    return (
                      <>
                        <div
                          className={styles['PropertyList__item--wrapper']}
                          key={index}
                        >
                          <PropertyListItem
                            data={item}
                            isNearbyPage={isNearbyPage}
                            router={router}
                            index={index}
                            url={
                              (router.asPath && /buy/.test(router.asPath)) ||
                              /beli/.test(router.asPath)
                                ? 'buy'
                                : 'rent'
                            }
                          />
                        </div>
                        {returnZeroDepositCard(
                          clientPropertyList.content,
                          index
                        )}

                        {clientPropertyList.content.length > 10 &&
                        Math.floor(clientPropertyList.content.length / 2) ===
                          index ? (
                          <Col
                            xs={12}
                            className='d-sm-none'
                            style={{
                              marginBottom: '1rem'
                            }}
                          >
                            <SearchAlertBox
                              mobile={true}
                              handleOpenAlertModal={() =>
                                setShowAlertModal(true)
                              }
                              openUpdateEmailPopUpModal={() =>
                                setOpenEmailPopUpModal(true)
                              }
                            />
                          </Col>
                        ) : null}
                      </>
                    )
                  })}
              </Row>

              {!isNearbyPage ? (
                <>
                  {!router.asPath.includes('/rental-bidding') && (
                    <Row>
                      <Col xs={12}>
                        <SearchAlertBox
                          handleOpenAlertModal={() => setShowAlertModal(true)}
                          openUpdateEmailPopUpModal={() =>
                            setOpenEmailPopUpModal(true)
                          }
                        />
                        <EmailPopUp
                          visible={openEmailPopUpModal}
                          onHide={(e, email) => {
                            setOpenEmailPopUpModal(false)
                            subscribeToAlert(e, email)
                            // props.authActions.setEmailPopup(2)
                          }}
                        />
                      </Col>
                    </Row>
                  )}
                </>
              ) : null}

              <div className={`pagination text-right`}>
                <div className='inner'>
                  <ReactPaginate
                    pageCount={clientPropertyList.totalPages}
                    pageRangeDisplayed={4}
                    marginPagesDisplayed={0}
                    breakLabel={''}
                    forcePage={clientPropertyList.number}
                    previousLabel='&lt; Prev'
                    nextLabel='Next &gt;'
                    activeLinkClassName='current'
                    onPageChange={pageNum => {
                      Router.push(goToPage(pageNum.selected + 1))
                    }}
                  />
                </div>

                <PropertyListLocationLink
                  locationLink={locationLink}
                  locationName={locationName}
                />
              </div>

              {clientPropertyListNearby &&
              clientPropertyListNearby.totalElements !== 0 ? (
                <>
                  <div className={styles['PropertyList__nearby--wrapper']}>
                    <Row>
                      <Col md='10'>
                        <h4>
                          Property near {locationName.replace(/[-]/g, ' ')} (
                          {clientPropertyListNearby.totalElements}){' '}
                        </h4>
                        <p>
                          Other tenants just viewed these properties nearby{' '}
                          <b>{locationName.replace(/[-]/g, ' ')}</b> that you
                          might be interested in.
                        </p>
                      </Col>
                      <Col>
                        <p
                          className={styles['showAll_button']}
                          onClick={() => showAllNearby()}
                        >
                          Show All
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div className={styles['nearby_carousel']}>
                    <NearbySlider
                      slideData={clientPropertyListNearby}
                      router={router}
                    />
                  </div>

                  <Row
                    className={styles['nearby_desktop']}
                    style={{
                      padding: '0 4px'
                    }}
                  >
                    {clientPropertyListNearby.content &&
                      clientPropertyListNearby.content
                        .slice(0, 3)
                        .map((item, index) => {
                          return (
                            <>
                              <div
                                className={
                                  styles['PropertyList__item--wrapper']
                                }
                                key={index}
                              >
                                <PropertyListItem
                                  data={item}
                                  isNearbyPage={true}
                                  router={router}
                                  index={index}
                                  url={
                                    (router.asPath &&
                                      /buy/.test(router.asPath)) ||
                                    /beli/.test(router.asPath)
                                      ? 'buy'
                                      : 'rent'
                                  }
                                />
                              </div>

                              {clientPropertyListNearby.content.length > 10 &&
                              Math.floor(
                                clientPropertyListNearby.content.length / 2
                              ) === index ? (
                                <Col
                                  xs={12}
                                  className='d-sm-none'
                                  style={{
                                    marginBottom: '1rem'
                                  }}
                                >
                                  <SearchAlertBox
                                    mobile={true}
                                    handleOpenAlertModal={() =>
                                      setShowAlertModal(true)
                                    }
                                    openUpdateEmailPopUpModal={() =>
                                      setOpenEmailPopUpModal(true)
                                    }
                                  />
                                </Col>
                              ) : null}
                            </>
                          )
                        })}
                  </Row>
                </>
              ) : null}

              {!isNearbyPage ? (
                <>{!router.asPath.includes('/rental-bidding') && <Review />}</>
              ) : null}
            </div>
          </div>
        ) : null
      ) : clientPropertyList ? (
        <PropertyListMapViewFilter
          page={router.asPath}
          queryData={router.query}
          showListing={showListing}
          singlePropertyActions={props.singlePropertyActions}
          singleListing={singleListing}
          showSingleListing={showSingleListing}
          propertyList={clientPropertyList}
          centerCoords={centerCoords}
          defaultZoom={defaultZoom}
          changeCoords={changeCoords}
          hasListing={hasListing}
          isLoading={isLoading}
          route={(router && router.asPath) || ''}
        />
      ) : null}
      {showAlertModal && filterData ? (
        <PropertyListAlertModal
          filterData={filterData}
          showAlertModal={showAlertModal}
          handleCloseModal={handleCloseModal}
          subscribeToAlert={subscribeToAlert}
          locationName={locationName}
        />
      ) : null}
      {subscribePropertyAlertStatus ? (
        <PropertyListSubscriptionAlertStatusModal
          subscribePropertyAlertStatus={subscribePropertyAlertStatus}
          handleCloseModal={handleCloseModal}
        />
      ) : null}
    </>
  )
}

function mapStateToProps (state) {
  return {
    user: state.auth.user,
    clientList: state.propertyList,
    areas: state.areas,
    language: state.language,
    subscribePropertyAlert: state.subscribePropertyAlert,
    selectedProperty: state.singleProperty.selected,
    presetFilter: state.property.presetFilter
  }
}

function mapDispatchToProps (dispatch) {
  return {
    propertyAlertActions: bindActionCreators(propertyAlertActions, dispatch),
    propertyActions: bindActionCreators(propertyActions, dispatch),
    singlePropertyActions: bindActionCreators(singlePropertyActions, dispatch)
  }
}
const mapSizesToProps = ({ width }) => ({
  isMobile: width < 768
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withSizes(mapSizesToProps)(PropertyList))
)
