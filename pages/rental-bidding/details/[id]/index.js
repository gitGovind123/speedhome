import _ from 'lodash'
import dynamic from 'next/dynamic'
import Router, { withRouter } from 'next/router'
import fetch from 'node-fetch'
import { useEffect } from 'react'
import {
  getPropertyDetailsSEODesc,
  getPropertyDetailsSEOKeywords,
  getPropertyDetailsSEOTitle,
  getPropertyNameLink,
  propertyDetailsRedirect
} from '../../../../components/Common/Helper'
import Loader from '../../../../components/Common/Loader'
import HeadComponent from '../../../../components/Common/Head'
import { API_HOST, X_OS_VERSION } from '../../../../env'
import { admin_token } from '../../../../globalutilities/consts'
import * as cookie from 'cookie'

import { reloadAuth } from '../../../../utils/auth'
import { getToken } from '../../../../globalutilities/helpers'

const PropertyDetail = dynamic(
  () => import('../../../../components/PropertyDetail'),
  {
    loading: () => (
      <div className='loading-overlay--post'>
        <Loader />
      </div>
    )
  }
)

const PropertyDetailPage = withRouter(props => {
  const { propertyInfo, showDetails, prefixUrl, router, location } = props
  useEffect(() => {
    propertyDetailsRedirect(router)

    if (!showDetails) {
      Router.replace(prefixUrl)
    }
  }, [showDetails, prefixUrl, Router])

  let isSale = false
  let htitle = ''
  let hdesc = ''
  let hkeywords = ''
  let hcoverPhoto = ''

  if (propertyInfo) {
    if (
      propertyInfo.type === 'LANDED_SALE' ||
      propertyInfo.type === 'HIGHRISE_SALE'
    ) {
      isSale = true
    } else {
    }

    htitle = getPropertyDetailsSEOTitle(isSale, propertyInfo, router)

    hdesc = getPropertyDetailsSEODesc(isSale, propertyInfo, router)
    hkeywords = getPropertyDetailsSEOKeywords(isSale, propertyInfo.name, router)
    hcoverPhoto =
      (propertyInfo.images &&
        propertyInfo.images.find(img => img.coverPhoto)) ||
      {}
  }

  const canonicalUrl = location
    ? location.replace('/zh/', '/').replace('/my/', '/')
    : null

  return (
    <>
      <HeadComponent
        title={htitle}
        description={hdesc}
        location={canonicalUrl}
        keywords={hkeywords}
        coverpicture={(hcoverPhoto && hcoverPhoto.url) || null}
      />
      {showDetails ? <PropertyDetail {...props} token={getToken()} /> : null}
    </>
  )
})

export async function getServerSideProps (context) {
  const { req, res, resolvedUrl, query } = context
  const cookies = cookie.parse(context.req.headers.cookie || '')

  let propertyId = ''

  let newQuery = query

  const user = await reloadAuth(cookies, resolvedUrl, res)
  const location = `${req.headers.host}${resolvedUrl}`

  if (newQuery.id) {
    const propertyData = newQuery.id.split('-')
    propertyId = propertyData[propertyData.length - 1] || ''
  }

  const data = await fetch(`${API_HOST}properties/auction/${propertyId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: user.authToken || admin_token,
      'X-Device-ID': user.xDeviceId || admin_token,
      'X-OS-Version': X_OS_VERSION
    },
    body: null
  })
  const resultData = await data.json()

  const tempData = resultData.property
  const auctionData = _.omit(resultData, 'property')
  const propertyData = {
    ...tempData,
    auctionData: auctionData
  }
  let showDetails = true

  let prefixUrl = ''

  return {
    props: {
      propertyInfo: propertyData,
      location,
      showDetails,
      prefixUrl
    }
  }
}

export default PropertyDetailPage
