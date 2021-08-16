import React from 'react'

import { withRouter } from 'next/router'

import { getUserId, getToken } from '../../globalutilities/helpers'
import styles from './PropertyApprovalStatus.module.scss'

const PropertyApprovalStatus = props => {
  const { propertyInfo } = props

  const getStatus = status => {
    if (status === 'PENDING' || status === 'APPROVED') {
      let className = ''
      if (status === 'PENDING') {
        className = `${styles['listing-action__status']} ${styles['listing-action__status__review']}`
      } else {
        className = `${styles['listing-action__status']} ${styles['listing-action__status__live']}`
      }
      if (
        props.router.asPath.includes('/ads/') ||
        props.router.asPath.includes('/details') ||
        props.router.asPath.includes('/iklan/') ||
        props.router.asPath.includes('/guanggao/')
      ) {
        className = `${className} ${styles['listing-action__status__detailsPage']}`
      }
      if (
        props.router.asPath.includes('/dashboard/listings') &&
        status !== 'PENDING'
      ) {
        return null
      }
      return (
        <div className={className}>
          <img
            src={
              status === 'PENDING'
                ? '/img/notifications-white-24px.svg'
                : '/img/album-white-24px.svg'
            }
          />
          <span>{status === 'PENDING' ? 'PENDING' : 'LIVE'}</span>
        </div>
      )
    }
    return null
  }

  if (getUserId() && getToken()) {
    const isOwner = parseInt(getUserId()) === parseInt(propertyInfo.user.id)
    if (isOwner) {
      return getStatus(propertyInfo.approvalStatus)
    }
    return null
  }
  return null
}

export default withRouter(PropertyApprovalStatus)
