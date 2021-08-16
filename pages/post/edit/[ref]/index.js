import React from 'react'
import dynamic from 'next/dynamic'

import Head from '../../../../components/Common/Head'
import PostComponent from '../../../../components/Post'

import * as cookie from 'cookie'

import { X_OS_VERSION, API_HOST } from '../../../../env'
import PageNotFound from '../../../../components/Common/PageNotFound'
import { reloadAuth } from '../../../../utils/auth'

const PostPage = ({ propertyDetail }) => {
  if (!propertyDetail) {
    return <PageNotFound />
  }
  return (
    <>
      <Head
        title='Advertise Property for Free, Mudah House for Rent SPEEDHOME'
        description='All Online Fast Free & RM46k protection. Mudah Property For Rent, Find Tenant Looking For House For Rent in KL, Cyberjaya and Malaysia. Post Property Now!'
      />
      <PostComponent propertyDetail={propertyDetail} />
    </>
  )
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

export default PostPage
