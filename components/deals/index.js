import React, { useEffect, useState } from 'react'
import DoneIcon from '@material-ui/icons/Done'
import { Container, Row, Col } from 'react-bootstrap'
import Divider from '@material-ui/core/Divider'

import { ClipLoader } from 'react-spinners'
import { connect } from 'react-redux'
import { ValidationForm } from 'react-bootstrap4-form-validation'
import Router from 'next/router'
import Cookies from 'js-cookie'
import { verifyBookingByApiCall, createBookingByApiCall } from '../../api/deal'
import { bindActionCreators } from 'redux'
import * as dealAction from '../../actions/deal'
import * as authActions from '../../actions/authActions'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { getToken } from '../../globalutilities/helpers'
import { admin_token } from '../../globalutilities/consts'

import styles from './deals.module.scss'

const Deal = props => {
  const { toVerifyBooking, hash } = props
  const [isLoading, setIsLoading] = useState(false)
  const [isDealComplete, setIsDealComplete] = useState(false)
  const [completedPopup, setCompletedPopup] = useState(false)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [propertyPrice, setPropertyPrice] = useState('')

  const [isBooked, setIsBooked] = useState(false)
  const [isRamci, setIsRamci] = useState(false)
  const [isDoc, setIsDoc] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    handleShowLoginModal()
  }, [])

  useEffect(() => {
    let name =
      props.propertyData && props.propertyData.name
        ? props.propertyData.name
        : ''
    let price =
      props.dealData && props.dealData.booking ? props.dealData.booking : ''
    let propertyPrice =
      props.propertyData && props.propertyData.price
        ? props.propertyData.price
        : ''
    setName(name)
    setPrice(price)
    setPropertyPrice(propertyPrice)
  }, [props.propertyData])

  useEffect(() => {
    if (
      props.dealData &&
      props.dealData.status == 'BOOKING' &&
      props.toVerifyBooking
    ) {
      verifyOperation(hash)
    }
    if (props.dealData && props.dealData.status) {
      switch (props.dealData.status) {
        case 'RAMCI':
          // isBooked = true
          setIsBooked(true)
          break
        case 'DOC': {
          setIsBooked(true)
          setIsRamci(true)
          // isBooked = true
          // isRamci = true
          break
        }
        case 'DONE': {
          setIsBooked(true)
          setIsRamci(true)
          setIsDoc(true)
          setIsDone(true)
          // isBooked = true
          // isRamci = true
          // isDoc = true
          // isDone = true
          break
        }
      }
    }
  }, [props.dealData])

  useEffect(() => {
    if (props.hash && getToken()) {
      if (props.hash && Cookies.get('dealHashKey') != props.hash) {
        Cookies.set('dealHashKey', props.hash)
      }
      const user = {
        authToken: getToken() || admin_token
      }
      props.dealAction.getDealByHash(user, props.hash)
    }
  }, [props.hash, getToken()])

  const handleShowLoginModal = () => {
    if (!getToken()) {
      props.authActions.openLoginModal({
        countryData: null,
        phoneNumber: null,
        request: false,
        originClick: 'deal',
        disableClose: false
      })
    }
  }

  const handleClose = e => {
    setCompletedPopup(false)
    if (e.target.name === 'completed') Router.push('/')
  }

  const continueDealSubmit = () => {
    if (props.dealData && props.dealData.status) {
      switch (props.dealData.status) {
        case 'BOOKING': {
          paymentOperation(hash)
          break
        }
        case 'RAMCI':
          setIsLoading(true)
          Router.push('/deal/creditCheck')
          break
        case 'DOC':
          setIsLoading(true)
          Router.push('/deal/uploadDocument')
          break
        case 'DONE':
          setIsDealComplete(true)
          setCompletedPopup(true)
          // setState({ isDealComplete: true, completedPopup: true })
          break
      }
    }
  }

  const verifyOperation = async hash => {
    verifyBookingByApiCall(hash)
      .then(result => {
        if (result.status == 'RAMCI') {
          Router.push('/deal/creditCheck')
        } else if (result.status == 'DOC') {
          Router.push('/deal/uploadDocument')
        } else Router.push(`'/deal/'${hash}`)
        props.dealAction.setVerifyBookingResponse(result)
        return result
      })
      .catch(async error => {})
  }

  const paymentOperation = async hash => {
    setIsLoading(true)

    let response = await createBookingByApiCall(hash)
      .then(response => {
        if (response) {
          setIsLoading(false)

          let url =
            response + `?redirect=http://${window.location.host}/deal/${hash}-2`
          window.location.href = url
        }
      })
      .catch(error => {
        setIsLoading(false)

        return error
      })
  }

  return (
    <React.Fragment>
      <ValidationForm
        className={`${styles['dealPage']} container`}
        onSubmit={e => {
          e.preventDefault()
          continueDealSubmit()
        }}
      >
        <Row className={styles['title']}>You're almost done!</Row>
        <Row className={styles['imgDiv']}>
          <img
            loading='lazy'
            className={styles['imgAlign']}
            src={'/img/IC_HOUSE.png'}
          ></img>
        </Row>
        <Row className={`${styles['bold']} ${styles['textCenter']}`}>
          {name}
        </Row>
        {/* <Row className='textCenter'>RM{propertyPrice} / month</Row> */}
        <Row className={styles['imgDescription']}>
          Few steps to complete and the new home will be yours
        </Row>
        <Container>
          <Col className={`${styles['body']} ${styles['dealBody']}`}>
            <Row className={styles['rowCheck']}>
              <Col md={8} xs={8} sm={8} className={!isBooked ? 'pending' : ''}>
                Pay booking
              </Col>
              <Col className={styles['verifyIcon']} md={4} xs={4} sm={4}>
                {isBooked && <DoneIcon className={styles['done']} />}
              </Col>
            </Row>
            <Divider className={styles['divider']} />
            <Row className={styles['rowCheck']}>
              <Col md={8} xs={8} sm={8} className={!isRamci ? 'pending' : ''}>
                {' '}
                Credit check
              </Col>
              <Col className={styles['verifyIcon']} md={4} xs={4} sm={4}>
                {isRamci && <DoneIcon className={styles['done']} />}
              </Col>
            </Row>
            <Divider className={styles['divider']} />
            <Row className={styles['rowCheck']}>
              <Col md={8} xs={8} sm={8} className={!isDoc ? 'pending' : ''}>
                {' '}
                Upload document
              </Col>
              <Col className={styles['verifyIcon']} md={4} xs={4} sm={4}>
                {isDoc && <DoneIcon className={styles['done']} />}
              </Col>
            </Row>
          </Col>
        </Container>

        <div className='btn-holder text-center'>
          <button
            className={`btn btn-curv btn-primary btn-primary-filled ${styles['customButton']}`}
          >
            {props.dealData && props.dealData.status == 'DONE'
              ? 'Submit'
              : 'Next'}
          </button>
        </div>
      </ValidationForm>

      <Modal show={completedPopup} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={styles['modelDealDetail']}>Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>You completed deal registration successfully</Modal.Body>
        <Modal.Footer>
          <Button
            className={`btn btn-curv btn-primary btn-primary-filled ${styles['customButton']}`}
            onClick={handleClose}
            name={
              props.dealData && props.dealData.status === 'DONE'
                ? 'completed'
                : ''
            }
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      {isLoading ? (
        <div
          style={{
            position: 'fixed',
            height: '100vh',
            width: '100%',
            top: 0,
            left: 0,
            bottom: 0,
            backgroundColor: '#000',
            opacity: '.4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ClipLoader color='#fff' />
        </div>
      ) : null}
    </React.Fragment>
  )
}

const mapStateToProps = ({ deal, property, auth }) => {
  return {
    propertyData: property.selectedProperty,
    dealData: deal.dealByHash,
    booking: deal.booking,
    user: auth.user
  }
}

function actionsStateToProps (dispatch) {
  return {
    dealAction: bindActionCreators(dealAction, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(mapStateToProps, actionsStateToProps)(Deal)
