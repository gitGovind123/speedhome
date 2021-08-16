import React from 'react'

import * as cookie from 'cookie'

import PageNotFound from '../../../../components/Common/PageNotFound'
import { reloadAuth } from '../../../../utils/auth'

import { API_HOST, X_OS_VERSION } from '../../../../env'

import PostShareComponent from '../../../../components/Post/Share'

const PostShare = props => {
  const { propertyDetail } = props

  if (propertyDetail) {
    return <PostShareComponent propertyDetail={propertyDetail} />
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

export default PostShare
