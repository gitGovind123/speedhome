import React from 'react'

import * as cookie from 'cookie'

import { X_OS_VERSION, API_HOST } from '../../../../env'
import PageNotFound from '../../../../components/Common/PageNotFound'
import { reloadAuth } from '../../../../utils/auth'

import PagesForRentComponent from '../../../../components/Post/PagesForRent'

const PagesForRent = props => {
  const { propertyDetail } = props

  if (propertyDetail) {
    return <PagesForRentComponent propertyDetail={propertyDetail} />
  } else {
    return <PageNotFound />
  }
}

export async function getServerSideProps (context) {
  const { req, res, resolvedUrl, query } = context

  const cookies = cookie.parse(context.req.headers.cookie || '')
  let deviceId = ''

  const user = await reloadAuth(cookies, resolvedUrl, res)

  const result = await fetch(`${API_HOST}properties/${query.ref}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: user.authToken,
      'X-Device-ID': deviceId || user.authToken,
      'X-OS-Version': X_OS_VERSION
    },
    body: null
  })
  const propertyDetail = await result.json()
  return {
    props: {
      propertyDetail
    }
  }
}

export default PagesForRent
