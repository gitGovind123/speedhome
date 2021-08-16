import React, { useState } from 'react'
import Router from 'next/router'
import Swal from 'sweetalert2'
import TextareaAutosize from 'react-textarea-autosize'
import useTranslation from 'next-translate/useTranslation'

import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { Row, Col, Container } from 'react-bootstrap'
import { ButtonGroup, Button } from '@material-ui/core'
import { submitUserProfile, submitFeedback } from '../../actions'

import Image from 'next/image'
import CONST from '../../globalutilities/consts'
import Head from '../../components/Common/Head'

import BreadCrumb from '../../components/Common/BreadCrumb'

import 'react-toastify/dist/ReactToastify.css'
import styles from './thanks.module.scss'

const ThankComponent = props => {
  const { t } = useTranslation('common')
  const [userFeedback, setUserFeedback] = useState({
    rating: 0,
    comment: '',
    platform: 'WEB',
    propertiesOwned: '',
    experience: ''
  })

  const [errors, setErrors] = useState({
    rating: '',
    comment: '',
    propertiesOwned: '',
    experience: ''
  })

  const onSubmitFeedback = async () => {
    if (userFeedback.propertiesOwned === '') {
      setErrors({
        ...errors,
        propertiesOwned: 'Please state your properties amount'
      })
      return false
    }

    if (userFeedback.experience === '') {
      setErrors({
        ...errors,
        experience: 'Please tell us your expertise level'
      })
      return false
    }

    if (userFeedback.rating < 1) {
      setErrors({ ...errors, rating: 'Please Rate your experience' })
      return false
    }

    if (userFeedback.comment === '') {
      setErrors({ ...errors, comment: 'Message is required' })
      return false
    }

    if (userFeedback.comment.length > 250) {
      setErrors({
        ...errors,
        comment: 'You have reached your maximum limit of characters allowed'
      })
      return false
    }

    setErrors(null)
    const responseOfUserProfile = onSubmit()
    const response = await submitFeedback(userFeedback)
    if (!response.success && !responseOfUserProfile.success) {
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
    const { propertiesOwned, experience } = userFeedback
    const payload = {
      propertiesOwned,
      experience
    }
    return submitUserProfile(payload)
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
        <Row className={`${styles['middle-md']} text-center `}>
          <Col md={4} />
          <Col md={4}>
            <div className={`${styles['additional-div']} d-flex v-center`}>
              <h4 className={styles['additional-sub-text']}>
                Additional information to complete your profile
              </h4>
            </div>
          </Col>
          <Col md={4} />
        </Row>

        <Row className={`${styles['middle-md']} text-left `}>
          <Col md={4} />
          <Col md={4}>
            <div className={`${styles['additional-div']} d-flex v-center`}>
              <label className={styles['additional-label-text']}>
                How many properties?
              </label>
              <select
                onChange={e =>
                  handleInputChange(e, 'propertiesOwned', e.target.value)
                }
                value={userFeedback.propertiesOwned}
                name='propertiesOwned'
                id='propertiesOwned'
                className={styles['additional-select']}
              >
                <option value='' selected disabled>
                  Select
                </option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
              </select>
              {errors && errors.propertiesOwned ? (
                <span className={styles['feedback_error_textArea']}>
                  {errors.propertiesOwned}
                </span>
              ) : null}
            </div>
          </Col>
          <Col md={4} />
        </Row>

        <Row
          className={`${styles['middle-md']} text-left ${styles['mb-40-30']}`}
        >
          <Col md={4} />
          <Col md={4}>
            <div className={`${styles['additional-div']} d-flex v-center`}>
              <label className={styles['additional-label-text']}>
                Level of your expertise with real estate?
              </label>
              <select
                onChange={e =>
                  handleInputChange(e, 'experience', e.target.value)
                }
                value={userFeedback.experience}
                name='experience'
                id='experience'
                className={styles['additional-select']}
              >
                <option value='' selected disabled>
                  Select
                </option>
                <option value='beginner'>Beginner</option>
                <option value='intermediate'>Intermediate</option>
                <option value='expert'>Expert</option>
              </select>
              {errors && errors.experience ? (
                <span className={styles['feedback_error_textArea']}>
                  {errors.experience}
                </span>
              ) : null}
            </div>
          </Col>
          <Col md={4} />
        </Row>

        <Row className={`${styles['middle-md']}  text-center`}>
          <Col md={2} />
          <Col md={8}>
            <h4>How was your experience?</h4>
            <ButtonGroup className={styles['feedback-btn-group']}>
              <div
                className={`${styles['text_feedback']} ${styles['left']} ml-3`}
              >
                Poor
              </div>
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
              <div
                className={`${styles['text_feedback']} ${styles['right']} ml-3`}
              >
                Excellent
              </div>
              {errors && errors.rating ? (
                <span className={styles['feedback_error']}>
                  {errors.rating}
                </span>
              ) : null}
            </ButtonGroup>
          </Col>
          <Col md={2} />
        </Row>
        <Row className={`${styles['middle-md']} text-center`}>
          <Col md={3} />
          <Col md={6}>
            <TextareaAutosize
              minRows={4}
              value={userFeedback.comment}
              placeholder='Describe your experience here.'
              className={styles['feedback-message-text']}
              onChange={e => handleInputChange(e, 'comment', e.target.value)}
            />
            {errors && errors.comment ? (
              <span className={styles['feedback_error_textArea']}>
                {errors.comment}
              </span>
            ) : null}
            <label
              className={styles['feedback-message-label']}
              style={{ float: 'right' }}
            >
              {userFeedback.comment.length} / 250
            </label>
            <label className={styles['feedback-message-label']}>
              Your feedback may be posted on our website
            </label>
          </Col>
          <Col md={3} />
        </Row>
        <Row
          className={`${styles['middle-md']} text-center ${styles['mb-40-30']}`}
        >
          <Col md={3} />
          <Col md={6}>
            <Button
              className={styles['feedback-btn-submit']}
              type='button'
              onClick={() => onSubmitFeedback()}
            >
              {t('btn_submit')}
            </Button>
          </Col>
          <Col md={3} />
        </Row>
        <Row
          className={`${styles['middle-md']} text-center ${styles['mb-20-10']}`}
        >
          <Col md={2} />
          <Col md={8}>
            <label className={styles['app-label-text']}>
              Don`t miss on notification from prospective tenant?
            </label>
          </Col>
          <Col md={2} />
        </Row>
        <Row className={`${styles['middle-md']} text-center`}>
          <Col md={4} />
          <Col md={4}>
            <strong className={`${styles['content-title']}`}>
              <label>
                Download SPEEDHOME App FREE
                <br /> for exclusive benefits now!
              </label>
            </strong>
          </Col>
          <Col md={4} />
        </Row>
        <Row
          className={`${styles['middle-md']} text-center ${styles['app-frame']}`}
        >
          <Col md={1} />
          <Col md={10}>
            <div className={`${styles['frame-thankyou']}  d-flex`}>
              <div className={`${styles['col-download']} d-flex v-center`}>
                <strong className={`${styles['content-title']}`}>
                  {t('text_download_app_here')}
                </strong>
                <a
                  href='https://itunes.apple.com/my/app/speedrent-property-rental/id998232868?mt=8'
                  target='_blank'
                >
                  <Image
                    src='/img/appStore.png'
                    alt='appstore - speedhome '
                    height={30}
                    width={100}
                  />
                </a>
                <a
                  href='https://play.google.com/store/apps/details?id=com.speedrent&hl=en'
                  target='_blank'
                >
                  <Image
                    src='/img/googlePlay.png'
                    alt='google play - speedhome'
                    height={30}
                    width={100}
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
