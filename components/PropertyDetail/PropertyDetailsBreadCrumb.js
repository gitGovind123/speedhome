import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { withRouter } from 'next/router'

import Breadcrumb from '../Breadcrumb/Breadcrumb'
import ListingBreadcrumb from '../Breadcrumb/ListingBreadcrumb'
import { withSizes } from 'react-sizes'

const getUrlFromName = name => {
  if (!name) {
    return
  }
  return name.toLowerCase()
}

const getPrefixFromRoute = (propertyData, router) => {
  let prefix = ''
  let isSale = false
  if (propertyData) {
    if (
      propertyData.type === 'HIGHRISE_SALE' ||
      propertyData.type === 'LANDED_SALE'
    ) {
      isSale = true
    } else {
      isSale = false
    }
  }
  if (isSale) {
    if (router.locale === 'zh') {
      prefix = '/zh/buy/'
    } else if (router.locale === 'my') {
      prefix = '/my/buy/'
    } else {
      prefix = '/buy/'
    }
  } else {
    if (router.locale === 'zh') {
      prefix = '/zh/rent/'
    } else if (router.locale === 'my') {
      prefix = '/my/sewa/'
    } else {
      prefix = '/rent/'
    }
  }
  return prefix
}

const PropertyDetailsBreadCrumb = props => {
  const { propertyData, getAreaByPostcode, router, isMobile, styles } = props
  const { t } = useTranslation('common')
  const prefix = getPrefixFromRoute(propertyData, router)
  let location = ''
  const breadcrumbs = [
    {
      id: 0,
      url: '/',
      title: t('breadcrumb_home')
    }
  ]
  if (propertyData.location) {
    location = getUrlFromName(propertyData.location)

    breadcrumbs.push({
      id: 1,
      url: `${prefix}${location}`,
      title: propertyData.location
    })
  } else if (propertyData.postcode) {
    const areaByPostcode = getAreaByPostcode(propertyData.postcode)
    location = getUrlFromName(areaByPostcode)
    breadcrumbs.push({
      id: 1,
      url: `${prefix}${location}`,
      title: areaByPostcode
    })
  } else {
    breadcrumbs.push({
      id: 1,
      url: `${prefix}kuala-lumpur`,
      title: 'Kuala Lumpur'
    })
  }

  if (propertyData.type === 'LANDED' || propertyData.type === 'LANDED_SALE') {
    breadcrumbs.push({
      id: 2,
      url: `${prefix}${location}/house`,
      title: t('breadcrumb_house')
    })
  } else if (propertyData.type === 'ROOM') {
    breadcrumbs.push({
      id: 2,
      url: `${prefix}${location}/room`,
      title: t('breadcrumb_room')
    })
  } else if (propertyData.bedroom < 2) {
    breadcrumbs.push({
      id: 2,
      url: `${prefix}${location}/studio`,
      title: t('breadcrumb_studio')
    })
  } else if (propertyData.bedroom > 1) {
    breadcrumbs.push({
      id: 2,
      url: `${prefix}${location}/condo`,
      title: t('breadcrumb_condo')
    })
  }
  let name = propertyData.name
  if (isMobile) {
    if (name.length > 25) {
      name = `${name.substring(0, 20)}...`
    }
  }
  breadcrumbs.push({ id: 3, title: name })

  return <ListingBreadcrumb styles={styles} links={breadcrumbs} />
}
const mapSizesToProps = ({ width }) => ({
  isMobile: width < 767
})

export default withSizes(mapSizesToProps)(withRouter(PropertyDetailsBreadCrumb))
