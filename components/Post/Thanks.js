import React, { useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { connect } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ButtonGroup, Button } from '@material-ui/core'

import Head from '../Head'
import Headline from './Headline'

import {
  getUserProfile,
  submitUserProfile,
  submitFeedback
} from '../../actions'
import Swal from 'sweetalert2'
import TextareaAutosize from 'react-textarea-autosize'
import Link from 'next/link'
import Router from 'next/router'
import CONST from '../../globalutilities/consts'
import BreadCrumb from '../Common/BreadCrumb'
import Image from 'next/image'

const ThankComponent = props => {
  const [profile, setProfile] = useState({})
  const [savedProfile, setSavedProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [userFeedback, setUserFeedback] = useState({
    rating: 0,
    comment: '',
    platform: 'WEB'
  })
  const [userProfile, setUserProfile] = useState({
    propertiesOwned: 0,
    experience: 0,
    platform: 'WEB'
  })
  const [errors, setErrors] = useState(null)

  const { t } = useTranslation('common')

  useEffect(() => {
    const fetchUserProfile = async () => {
      const result = await getUserProfile()
      if (result.success && result.data) {
        setProfile({ ...profile, ...result.data })
        setSavedProfile({
          ...savedProfile,
          ...result.data
        })
        setIsLoading(false)
      }
    }
    fetchUserProfile()
  }, [])

  const onSubmitFeedback = async () => {
    if (userProfile.propertiesOwned < 1) {
      setErrors({ ...errors, propertiesOwned: 'Please state your properties amount' })
      return false
    }

    if (userProfile.experience < 1) {
      setErrors({ ...errors, experience: 'Please tell us your expertise level' })
      return false
    }

    if (userFeedback.rating < 1) {
      setErrors({ ...errors, rating: 'Please Rate your experience' })

      return false
    }
    if (userFeedback.comment === '') {
      setErrors({ errors: { ...errors, comment: 'Message is required' } })
      return false
    }
    if (userFeedback.comment.length > 250) {
      setErrors({
        errors: {
          ...errors,
          comment: 'You have reached your maximum limit of characters allowed'
        }
      })
      return false
    }
    setErrors(null)
    const response = await submitFeedback(userFeedback)
    if (!response.success) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: response.message || 'Something went wrong',
        showConfirmButton: true,
        timer: 2000,
        allowOutsideClick: true
      })
    } else {
      const href = '/dashboard/listings'
      Router.push(href, href, { shallow: true })
    }
  }

  const onSubmit = async () => {
    const { propertiesOwned, experience } = profile
    const payload = {
      propertiesOwned,
      experience
    }
    setIsLoading(true)

    const response = await submitUserProfile(payload)

    Swal.fire({
      position: 'center',
      icon: response.success ? 'success' : 'error',
      title: response.success
        ? 'Profile updated successfully.'
        : response.message || 'Something went wrong',
      showConfirmButton: true,
      timer: 2000,
      allowOutsideClick: true
    })
    setSavedProfile({
      ...savedProfile,
      propertiesOwned,
      experience
    })
    setIsLoading(false)
  }

  const handleInputChange = (event, name, value) => {
    let err = ''
    if (name === 'comment' && value.length > 250) {
      err = 'You have reached your maximum limit of characters allowed'
      value = value.substring(0, 250)
    }
    setUserFeedback({ ...userFeedback, [name]: value })
    setErrors({ ...errors, [name]: err })
  }

  const { user } = props
  return (
    <section className='post_page_homerunner'>
      <ToastContainer />
      <Head
        title={'Post a Property to Find Tenants | SPEEDHOME'}
        description={
          'Are you looking for a tenant for your property? Let SPEEDHOME speed up the process of finding the best tenant and make you a landlord. Fill out out the form, takes up only minutes.'
        }
      />
      <BreadCrumb breadCrumb={CONST.thanksPage} />
      <Container>
        <Headline title={t('text_thanks')} link={'/dashboard'} />
        <Row className='middle-md text-center mb-40-30'>
          <Col md={2} />
          <Col md={8}>
            <h4 className='font-text'>
              Your property is already created, you can take some time to view
              the video below for mere information on zero deposit
            </h4>
          </Col>
          <Col md={2} />
        </Row>
        <Row className='middle-md text-center mb-40-30'>
          <Col md={3} />
          <Col md={6}>
            <img
              style={{ position: 'absolute', visibility: 'hidden' }}
              src={`https://www.ref-r.com/campaign/t1/settings?bid_e=D7CE74D55F5AE11877626EBEF2CCC3DE&bid=28548&t=420&event=register&email=${user &&
                user.email}&orderID=${user && user.id}&fname=${user &&
                user.name}`}
            />
            <iframe
              src='https://www.youtube.com/embed/bsuakE_Yv3M?rel=0&amp;autoplay=1'
              allow='autoplay'
              width='100%'
              height={200}
            />
          </Col>
          <Col md={3} />
        </Row>
        <Row className='middle-md text-center mb-40-30'>
          <Col md={3} />
          <Col md={6}>
            <h5>Send us your feedback</h5>
            <p className='feedback-sub-text'>
              We want to know your experience with SPEEDHOME so that we can
              continue to improve it.
            </p>
          </Col>
          <Col md={3} />
        </Row>
        <Row className='middle-md text-center'>
          <Col md={2} />
          <Col md={8}>
            <h5>How was your experience?</h5>
            <ButtonGroup className='feedback-btn-group'>
              <div className='text_feedback left mr-3'>Poor</div>
              {[1, 2, 3, 4, 5].map(item => {
                return (
                  <Button
                    className={`br-primary ${
                      1 === item ? 'mr-2' : 5 === item ? 'ml-2' : 'mr-2 ml-2'
                    } ${
                      parseInt(userFeedback.rating) === item ? 'active' : ''
                    }`}
                    type='button'
                    key={item}
                    onClick={e => handleInputChange(e, 'rating', item)}
                  >
                    {item}
                  </Button>
                )
              })}
              <div className='text_feedback right ml-3'>Excellent</div>
              {errors && errors.rating ? (
                <span className='feedback_error'>{errors.rating}</span>
              ) : null}
            </ButtonGroup>
          </Col>
          <Col md={2} />
        </Row>
        <Row className='middle-md text-center'>
          <Col md={3} />
          <Col md={6}>
            <TextareaAutosize
              minRows={4}
              value={userFeedback.comment}
              placeholder='Describe your experience here.'
              className='feedback-message-text'
              onChange={e => handleInputChange(e, 'comment', e.target.value)}
            />
            {errors && errors.comment ? (
              <span className='feedback_error_textArea'>{errors.comment}</span>
            ) : null}
            <label
              className='feedback-message-label'
              style={{ float: 'right' }}
            >
              {userFeedback.comment.length} / 250
            </label>
            <label className='feedback-message-label'>
              Your feedback may be posted on our website
            </label>
          </Col>
          <Col md={3} />
        </Row>
        <Row className='middle-md text-center mb-40-30'>
          <Col md={3} />
          <Col md={6}>
            <Button
              className='feedback-btn-submit'
              type='button'
              onClick={() => onSubmitFeedback()}
            >
              {t('btn_submit')}
            </Button>
            <Link href={'/dashboard/listings'}>
              <a className='btn link-gray btn-skip-link'>{t('btn_skip')}</a>
            </Link>
          </Col>
          <Col md={3} />
        </Row>
        <Row className='middle-md text-center mb-40-30'>
          <Col md={1} />
          <Col md={10}>
            <div className='frame-thankyou d-flex'>
              <div className='col-download d-flex v-center'>
                <strong className='content-title mt-mob'>
                  {t('text_download_app_here')}
                </strong>
                <a
                  href='https://itunes.apple.com/my/app/speedrent-property-rental/id998232868?mt=8'
                  target='_blank'
                >
                  <Image
                    loading='lazy'
                    src='/img/appStore.png'
                    alt='images'
                    width={128}
                    height={32}
                  />
                </a>
                <a
                  href='https://play.google.com/store/apps/details?id=com.speedrent&hl=en'
                  target='_blank'
                >
                  <Image
                    loading='lazy'
                    src='/img/googlePlay.png'
                    alt='images'
                    width={128}
                    height={32}
                  />
                </a>
              </div>
            </div>
          </Col>
          <Col md={1} />
        </Row>
      </Container>
    </section>
  )
}

function mapStateToProps (state) {
  return {
    language: state.language,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, null)(ThankComponent)
