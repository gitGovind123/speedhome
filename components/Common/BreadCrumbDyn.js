import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import Container from 'react-bootstrap/Container'
import Link from 'next/link'

import useTranslation from 'next-translate/useTranslation'

const BreadCrumbDyn = props => {
  const { router } = props
  const { t } = useTranslation('common')

  let breadcrumbsArray = [
    {
      link: t('link_home'),
      name: t('breadcrumb_home')
    }
  ]
  if (router.asPath) {
    const breadcrumbs = router.asPath.split('/').splice(1)
    breadcrumbs.map(item => {
      if (item.indexOf('[') === -1) {
        if (item !== 'en' && item !== 'my' && item !== 'zh') {
          if (
            !/highrise/.test(item) &&
            !/house/.test(item) &&
            !/room/.test(item)
          ) {
            if (item.indexOf('?') === -1) {
              let link = router.asPath.slice(
                0,
                router.asPath.indexOf(item) + item.length
              )
              let name = item.replace(/[-]/g, ' ')

              if (item === 'rent' || item === 'sewa') {
                link = t('link_rent')
                name = t('text_search')
              } else if (item === 'buy' || item === 'beli') {
                link = t('link_buy')
                name = t('text_search')
              } else if (item === 'dashboard') {
                link = t('link_dashboard')
                name = t('breadcrumb_dashboard')
              } else if (item === 'rental') {
                link = t('link_dashboard_rental')
                name = t('breadcrumb_rental_collection')
              } else if (item === 'uploadDocument') {
                name = t('breadcrumb_upload_document')
              } else if (item === 'creditCheck') {
                name = t('breadcrumb_credit_check')
              } else if (item === 'processingDocument') {
                name = t('breadcrumb_processing_docs')
              }

              breadcrumbsArray.push({
                link,
                name
              })
            } else {
              const name = item.slice(0, item.indexOf('?'))
              const link = router.asPath.slice(
                0,
                router.asPath.indexOf(name) + name.length
              )
              breadcrumbsArray.push({
                link,
                // name: name.replace(/[-]/g, ' ')
                name: decodeURIComponent(name)
              })
            }
          }
        }
      }
    })
  }

  return (
    // <div className='breadcrumb-wrapper'>
    <Container>
      <ul className='page-breadcrumb'>
        {breadcrumbsArray.map((item, index) => {
          return (
            <li key={index}>
              {breadcrumbsArray.length - 1 !== index ? (
                <Link href={item.link}>
                  <a style={{ textTransform: 'capitalize' }}>
                    {item.name ? item.name.replace(/%20/g, ' ') : ''}
                  </a>
                </Link>
              ) : (
                <span style={{ textTransform: 'capitalize' }}>
                  {item.name ? item.name.replace(/%20/g, ' ') : ''}
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </Container>
    // </div>
  )
}

function mapStateToProps (state) {
  return {
    language: state.language
  }
}

export default withRouter(connect(mapStateToProps)(BreadCrumbDyn))
