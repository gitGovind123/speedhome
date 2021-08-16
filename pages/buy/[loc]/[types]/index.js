import React from 'react'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import { withRouter } from 'next/router'
import * as cookie from 'cookie'

import Loader from '../../../../components/Common/Loader'
import Head from '../../../../components/Common/Head'
import { API_HOST } from '../../../../env'
import { SELECTED_AREAS } from '../../../../globalutilities/SelectedAreas'
import { reloadAuth } from '../../../../utils/auth'
import { PropertyListQuery } from '../../../../components/PropertyList/DataQuery'
import {
  checkAndSetSearchSessionID,
  generateHeadersForRentAndBuyPages
} from '../../../../utils/utils'

const PropertyList = dynamic(
  () => import('../../../../components/PropertyList'),
  {
    loading: () => (
      <div className='loading-overlay--post'>
        <Loader />
      </div>
    )
  }
)

const BuyPage = withRouter(props => {
  const { router, propertyList, location } = props

  const getLocationName = (query = '', itemName = '') => {
    let locationName = query

    const loc = query.toLowerCase()
    switch (loc) {
      case 'studio':
        locationName = 'in malaysia'
        break
      case 'apartment':
        locationName = 'in malaysia'
        break
      case 'condo':
        locationName = 'in malaysia'

        break
      case 'room':
        locationName = 'in malaysia'

        break
      case 'house':
        locationName = 'in malaysia'
        break
      default:
        if (itemName) {
          locationName = itemName
        } else {
          locationName = query
        }
        break
    }

    return locationName
  }

  let locationName = 'Kuala Lumpur'
  let locationLink = 'kuala-lumpur'
  let hasFound = false
  let htitle = '',
    hdesc = '',
    hkeywords = ''
  if (router.query.loc) {
    SELECTED_AREAS.map(item => {
      if (item.link === router.query.loc.toLowerCase()) {
        locationName = getLocationName(router.query.loc, item.name)
        locationLink = item.link
        hasFound = true
      }
    })
    const searchDate = dayjs(new Date()).format('MMM YYYY')
    const query = router.query.loc
      .toLowerCase()
      .replace(/-/g, ' ')
      .replace(/\w\S*/g, w => w.replace(/^\w/, c => c.toUpperCase()))
    if (router.locale === 'zh') {
      htitle = `SPEEDHOME | ${query} Property For Rent [${searchDate}]`
      hdesc = `Over 500+ Zero Deposit listings! List of ${query.toUpperCase()} studio apartment,
         house, condo for rent. Fully furnished/semi furnished home near LRT & Pet friendly`
    } else if (router.locale === 'my') {
      htitle = `SPEEDHOME | ${query} Rumah Untuk Sewa [${searchDate}]`
      hdesc = `Lebihi 500+ listings Zero Deposit! ${query.toUpperCase()} bilik,
         studio apartment, rumah, condo untuk disewa. Fully furnished/semi furnished dekat LRT. Sewa di sini!`
    } else {
      htitle = `SPEEDHOME | ${query} Property For Rent [${searchDate}]`
      hdesc = `Over 500+ Zero Deposit listings! List of ${query.toUpperCase()} studio apartment,
           house, condo for rent. Fully furnished/semi furnished home near LRT & Pet friendly`
    }
  }
  if (!hasFound) {
    locationName = getLocationName(router.query.loc)
    locationLink = ''
  }
  const canonicalUrl = location
    ? location
        .replace('/zh/', '/')
        .replace('/my/', '/')
        .replace('sewa', 'rent')
    : null

  return (
    <>
      <Head
        title={htitle}
        description={hdesc}
        keywords={hkeywords}
        location={canonicalUrl}
      />

      <PropertyList
        propertyList={propertyList}
        locationName={locationName}
        locationLink={locationLink}
      />
    </>
  )
})

export default BuyPage

export async function getServerSideProps (context) {
  const { req, res, resolvedUrl, query } = context

  const cookies = cookie.parse(context.req.headers.cookie || '')
  const searchSessionId = cookies?.searchSessionId
  const visitorId = cookies?.visitorId

  let newQuery = query
  const queryData = PropertyListQuery(newQuery, resolvedUrl)

  const user = await reloadAuth(cookies, resolvedUrl, res)
  const location = `${req.headers.host}${resolvedUrl}`
  let headers = generateHeadersForRentAndBuyPages(
    user,
    searchSessionId,
    visitorId,
    cookies,
    req
  )
  const result = await fetch(`${API_HOST}properties/search`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(queryData)
  })
  const propertyList = await result.json()
  checkAndSetSearchSessionID(
    res,
    cookie,
    user.authToken,
    result.headers,
    searchSessionId,
    visitorId
  )
  return {
    props: {
      propertyList,
      location
    }
  }
}
