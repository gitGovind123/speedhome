export const PropertyListQuery = (query, pathname) => {
  let filterQuery = {
    pageNumber: 0,
    pageSize: 21
  }

  if (query.lat) {
    filterQuery.latitude = Number(query.lat)
    filterQuery.longitude = Number(query.lng)
  } else if (query.q) {
    filterQuery.keywords = query.q
  } else if (query.loc) {
    filterQuery.keywords = query.loc /* .replace(/[ ]/g, '-') */
  } else {
    filterQuery.keywords = 'Kuala Lumpur'
  }

  if (query.hotdeals) {
    filterQuery.keywords = ''
    filterQuery.hotdealsFilter = true
  }

  if (query.hotDeal) {
    filterQuery.keywords = ''
    filterQuery.hotdealsIds = [Number(query.hotDeal)]
  }

  if (query.ref) {
    if (query.name.includes(' ')) {
      query.name = query.name.replace(/ /g, '-')
    }
    filterQuery.keywords = ''
    filterQuery.partnershipCampaignRef = `${query.ref}`
  }

  if (query.sort) {
    filterQuery.sort = query.sort
  }

  if (query.offer) {
    filterQuery.partnershipCampaignRef = query.offer
  }

  if (query.pg) {
    if (query.pg > 0) {
      filterQuery.pageNumber = Number(query.pg - 1)
    } else {
      filterQuery.pageNumber = Number(0)
    }
  }

  if (query.bed) {
    filterQuery.bedroom = query.bed
  }

  if (query.bath) {
    filterQuery.bathroom = query.bath
  }

  if (query.car) {
    filterQuery.carpark = query.car
  }

  if (query.furnish) {
    filterQuery.furnishType = query.furnish
  }

  if (query.allRaces) {
    filterQuery.allRaces = true
  }

  if (query.instantView) {
    filterQuery.instantView = true
  }

  if (query.lrt) {
    filterQuery.nearLrt = true
  }

  if (query.petFriendly) {
    filterQuery.petFriendly = true
  }

  if (query.lm) {
    filterQuery.landmarkLabelId = query.lm
  }

  if (query.min) {
    filterQuery.minPrice = query.min
    if (/buy/.test(pathname) || /beli/.test(pathname)) {
      if (Number(query.max) < 5000000) {
        filterQuery.maxPrice = query.max
      }
    } else {
      if (Number(query.max) < 6000) {
        filterQuery.maxPrice = query.max
      }
    }
  }

  if (query.types) {
    let types, roomType

    if (query.types.includes('house')) {
      types = query.types.replace('house', 'landed')
    } else if (query.types.includes('studio')) {
      types = query.types.replace('studio', 'highrise')
      if (!filterQuery.bedroom) filterQuery.bedroom = 0
    } else if (query.types.includes('apartment')) {
      types = query.types.replace('apartment', 'highrise')
      if (!filterQuery.bedroom) filterQuery.bedroom = 2
    } else if (query.types.includes('condo')) {
      types = query.types.replace('condo', 'highrise')
      if (!filterQuery.bedroom) filterQuery.bedroom = 2
    } else if (query.types.includes('terrace')) {
      types = query.types.replace('terrace', 'landed')
    } else types = query.types

    filterQuery.types = types.toUpperCase().split(',')
  } else {
    if (/buy/.test(pathname) || /beli/.test(pathname)) {
      filterQuery.types = ['LANDED_SALE', 'HIGHRISE_SALE']
    }
  }

  if (query.leaseType) {
    filterQuery.leaseType = query.leaseType
  }

  return filterQuery
}

export const getPropertyTypeName = (router, t) => {
  let typeName
  if (/buy/.test(router.pathname) || /beli/.test(router.pathname)) {
    typeName = t('text_sale')
  } else {
    typeName = t('text_rent')
  }

  return typeName
}

export const getPropertyName = (router, t) => {
  let propertyName = t('text_property_for')
  if (router.query.types) {
    if (router.query.types.split(',').length === 1) {
      if (/highrise/.test(router.query.types)) {
        if (router.query.bed >= 2) {
          propertyName = t('text_condo_for')
        } else if (router.query.bed <= 1) {
          propertyName = t('text_studio_for')
        } else {
          propertyName = t('text_condo_for')
        }
      }
      if (/condo/.test(router.query.types)) {
        propertyName = t('text_condo_for')
      }
      if (/studio/.test(router.query.types)) {
        propertyName = t('text_studio_for')
      }
      if (/room/.test(router.query.types)) {
        propertyName = t('text_room_for')
      }
      if (/house/.test(router.query.types)) {
        propertyName = t('text_house_for')
      }
    }
  }

  return propertyName
}
