import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { ValidationForm } from 'react-bootstrap4-form-validation'

import { withRouter } from 'next/router'
import Router from 'next/router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../actions/post'

import MapView from './MapView'
import Head from '../Common/Head'
import BreadCrumb from '../Common/BreadCrumb'
import CONST from '../../globalutilities/consts'
import Headline from './Headline'
import Loader from '../Common/Loader'
import useTranslation from 'next-translate/useTranslation'

import { MAP_API_KEY } from '../../env'
import {
  dengageConvertedDate,
  triggerDengageEvents,
  triggerGTAG
} from '../../utils/utils'

import styles from './Map.module.scss'
import ProgressBar from './progressBar'
import { isRentProperty } from '../../globalutilities/helpers'

const Map = props => {
  const {
    id,
    latitude,
    longitude,
    address,
    ref,
    type,
    landmarkLabelVerified
  } = props.propertyDetail
  const { t } = useTranslation('common')
  useEffect(() => {
    // on load
    // landmarkLabelVerified
    const url = window.location.href
    if (type === 'HIGHRISE' && landmarkLabelVerified) {
      // if HIGHRISE and landmark both verified goes to homerunner
      props.router.push(`/post/homerunner/${ref}`)
    } else if (type === 'HIGHRISE_SALE' && landmarkLabelVerified) {
      // if HIGHRISE_SALE and landmark both verified goes to homerunner
      props.router.push(`/post/post-for-rent/${ref}`)
    }
  }, [props.propertyDetail])

  const triggerSubmitGPSGTAG = () => {
    triggerGTAG({
      event: 'PostListing_ALL'
    })
    triggerGTAG({
      event: 'clickCreateListingSubmitGPS'
    })
    triggerDengageEvents('speed_rent_post_property', {
      event_name: 'complete_pp_4',
      name: props.user ? props.user.name : '',
      phone_number:
        props.user && props.user.phoneNumber ? props.user.phoneNumber : '',
      email_address: props.user && props.user.email ? props.user.email : '',
      date: dengageConvertedDate(),
      property_value: props.propertyDetail.price,

      area_of_property: props.propertyDetail.address
    })
  }

  const [getCoordinates, setCordinates] = useState({
    lat: latitude,
    lng: longitude
  })
  const [isLoading, setIsLoading] = useState(false)

  const getCenterPosition = val => {
    setCordinates(val)
  }

  const submitForm = () => {
    setIsLoading(true)
    const data = {
      latitude: getCoordinates.lat,
      longitude: getCoordinates.lng
    }
    props.postActions.updatePost(id, data).then(res => {
      if (res.payload) {
        setIsLoading(false)
        const url = window.location.href
        if (url.includes('edit')) {
          // when editing map is the last page
          props.router.push(`/dashboard/listings`)
        } else {
          triggerSubmitGPSGTAG()
          if (type === 'HIGHRISE' || type === 'LANDED') {
            Router.push({
              pathname: `/post/homerunner/${ref}`,
              query: {
                activeSteps: 5,
                currentStep: 'Key Collection',
                nextStep: `What's Next`,
                totalSteps: props.router.query.totalSteps
              }
            })
          } else if (type === 'HIGHRISE_SALE' || type === 'LANDED_SALE') {
            props.router.push(`/post/post-for-rent/${ref}`)
          } else {
            Router.push({
              pathname: `/post/whatsNext`,
              query: {
                ref: ref,
                isShow: true
              }
            })
          }
        }
      }
    })
  }

  return (
    <>
      <ValidationForm
        onSubmit={e => {
          e.preventDefault()
          submitForm()
        }}
      >
        <section className={styles['post_page_gps']}>
          {props &&
            props.router &&
            props.router.query &&
            props.router.query.activeSteps &&
            isRentProperty(type) && (
              <ProgressBar
                activeStep={props.router.query.activeSteps}
                currentStep={props.router.query.currentStep}
                nextStep={props.router.query.nextStep}
                totalSteps={props.router.query.totalSteps}
              />
            )}
          <Head
            title={'Post a Property to Find Tenants | SPEEDHOME'}
            description={
              'Are you looking for a tenant for your property? Let SPEEDHOME speed up the process of finding the best tenant and make you a landlord. Fill out out the form, takes up only minutes.'
            }
          />
          <BreadCrumb breadCrumb={CONST.postPageGps} />
          <Container>
            {props &&
              props.router &&
              props.router.query &&
              !props.router.query.activeSteps && (
                <Headline title={t('breadcrumb_gps')} />
              )}
            <div className='mt-5'>
              <Row
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Col md={6}>
                  <div
                    className={`container create-listing ${styles['confirm-gps']}  text-center`}
                  >
                    <h2 className>{t('post:text_post_gps_address')}</h2>
                    <div className='input-wrap'>
                      <input
                        type='text'
                        defaultValue={address}
                        className='form-control text-center'
                        readOnly='readOnly'
                      />
                    </div>
                    <p>
                      <small className='note-s'>
                        {t('post:text_post_gps_markerDrag')}
                      </small>
                    </p>
                    <div className='map'>
                      <div id={styles['confirm_gps']}>
                        <div className='innder-gps'>
                          <MapView
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${MAP_API_KEY}`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={
                              <div style={{ height: `330px` }} />
                            }
                            mapElement={<div style={{ height: `100%` }} />}
                            isMarkerShown
                            centerCoords={getCoordinates}
                            sendCenter={getCenterPosition}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles['btn-post']}>
                      <button
                        id='btnClickCreateListingSubmitGPS'
                        type='submit'
                        className='btn btn-curv btn-secondary-filled'
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
        {isLoading ? (
          <div className='loading-overlay--post'>
            <Loader />
          </div>
        ) : null}
      </ValidationForm>
    </>
  )
}

const mapStateToProps = ({ post, auth }) => {
  return { post, user: auth.user }
}

const mapDispatchToProps = dispatch => {
  return {
    postActions: bindActionCreators(postActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Map))
