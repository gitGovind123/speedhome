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
} from '../../../components/Common/Helper'
import Loader from '../../../components/Common/Loader'
import HeadComponent from '../../../components/Common/Head'
import { API_HOST, X_OS_VERSION } from '../../../env'
import { admin_token } from '../../../globalutilities/consts'
import * as cookie from 'cookie'

import { reloadAuth } from '../../../utils/auth'
import { getToken } from '../../../globalutilities/helpers'

const PropertyDetail = dynamic(
  () => import('../../../components/PropertyDetail'),
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
  const searchSessionId = cookies?.searchSessionId
  const visitorId = cookies?.visitorId
  let propertyId = ''

  let newQuery = query

  const user = await reloadAuth(cookies, resolvedUrl, res)
  const location = `${req.headers.host}${resolvedUrl}`

  if (newQuery.id) {
    const propertyData = newQuery.id.split('-')
    propertyId = propertyData[propertyData.length - 1] || ''
  }
  let headers = {
    'Content-Type': 'application/json',
    Authorization: user.authToken || admin_token,
    'X-Device-ID': user.xDeviceId || admin_token,
    'X-OS-Version': X_OS_VERSION,
    'X-Search-Session-ID': searchSessionId || null
  }
  if (
    newQuery?.source_type &&
    ['web_result', 'recommendation_listing_page'].includes(newQuery.source_type)
  )
    headers['X-Source-Type'] = newQuery.source_type
  if (newQuery?.source_ref) headers['X-Source-Ref'] = newQuery.source_ref
  if (visitorId && !user.authToken) headers['X-Visitor-ID'] = visitorId

  const data = await fetch(`${API_HOST}properties/${propertyId}`, {
    method: 'get',
    headers: headers,
    body: null
  })
  const propertyInfo = await data.json()

  let showDetails = true

  let prefixUrl = ''

  const splitUrl = resolvedUrl.split('/').splice(1)

  if (splitUrl[0] === 'my') {
    prefixUrl = `/my/sewa/${getPropertyNameLink(
      propertyInfo.name
    )}?status=INACTIVE`
  } else if (splitUrl[0] === 'zh') {
    prefixUrl = `/zh/rent/${getPropertyNameLink(
      propertyInfo.name
    )}?status=INACTIVE`
  } else {
    prefixUrl = `/rent/${getPropertyNameLink(
      propertyInfo.name
    )}?status=INACTIVE`
  }
  if (user && user.id && user.id == propertyInfo.user && propertyInfo.user.id) {
    showDetails = true
  } else {
    if (propertyInfo.active && propertyInfo.status === 'ACTIVE') {
      showDetails = true
    } else {
      showDetails = false
    }
  }

  return {
    props: {
      propertyInfo,
      location,
      showDetails,
      prefixUrl
    }
  }
}

export default PropertyDetailPage
