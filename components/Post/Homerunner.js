import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { withRouter } from 'next/router'
import ArrowLeft from '@material-ui/icons/ArrowBack'
import Link from 'next/link'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import DatePicker from 'react-datepicker'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Loader from '../Common/Loader'
import useTranslation from 'next-translate/useTranslation'

import * as homeRunnerActions from '../../actions/homeRunnerActions'
import SelectBox from '../Common/SelectBox'
import dayjs from 'dayjs'
import Head from '../Common/Head'
import BreadCrumb from '../Common/BreadCrumb'
import CONST from '../../globalutilities/consts'
import { addDaysTODate, radiOusCheckeer } from '../Common/Helper'
import Headline from './Headline'
import { HOLIDAY_HOMERUNNER } from './DB'
import { RequestSentModal } from '../RequestSentModal/RequestSentModal'
import {
  dengageConvertedDate,
  triggerDengageEvents,
  triggerGTAG
} from '../../utils/utils'
import moment from 'moment'

import ProgressBar from './progressBar'
import styles from './Homerunner.module.scss'
import { isRentProperty } from '../../globalutilities/helpers'
//import MessageProgressBar from '../Common/MessageProgressBar'

const HomeRunner = props => {
  const { router } = props
  const {
    id,
    ref,
    type,
    price,
    latitude,
    longitude,
    status,
    KOH,
    postcode,
    name
  } = props.propertyDetail
  const [isLoading, setIsLoading] = useState(true)
  const [getCollectionAddress, setGetCollectionAddress] = useState('')
  const [getTime, setGetTime] = useState(null)
  const [getRemarks, setGetRemarks] = useState('')

  const [getDate, setGetDate] = useState('')
  const [setSelectedDate, setSelectedDateArr] = useState([])
  const [getErrorMessage, setErrorMessage] = useState(false)
  const [before9PM, setBefore9PM] = useState(false)
  const [isRequestSentModalOpen, setIsRequestSentModalOpen] = useState(false)
  const { t } = useTranslation('common')
  const VIEWING_TIME = [
    {
      value: 'Select Time',
      label: `${t('post:text_post_hommerunner_select_time')}`,
      isDisabled: true
    },
    { value: '10.00 AM', label: '10.00AM' },
    { value: '11.00AM', label: '11.00AM' },
    { value: '12.00PM', label: '12.00PM' },
    { value: '1.00PM', label: '1.00PM' },
    { value: '2.00PM', label: '2.00PM' },
    { value: '3.00PM', label: '3.00PM' },
    { value: '4.00PM', label: '4.00PM' },
    { value: '5.00PM', label: '5.00PM' },
    { value: '6.00PM', label: '6.00PM' }
  ]

  useEffect(() => {
    renderSelectedDate(dayjs())
    setGetTime(VIEWING_TIME[0])
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const postcodeData = {
      postcode: postcode,
      propertyId: props.propertyDetail.id
    }

    props.homeRunnerActions
      .validatePostalCodeforActivePropertyAPI(postcodeData)
      .then(res => {
        if (res && res.type === 'SUCCESS') {
          if (
            status === 'ACTIVE' &&
            (type === 'HIGHRISE' || type === 'LANDED') &&
            parseInt(price) >= 500 &&
            parseInt(price) <= 5000 &&
            KOH === false &&
            res.value.isSupported &&
            radiOusCheckeer({ lat: latitude, lng: longitude }, 40)
          ) {
            setIsLoading(false)
          } else {
            if (props.router.query && props.router.query.KOH) {
              setIsLoading(false)
            } else {
              router.push({
                pathname: `/post/whatsNext`,
                query: {
                  ref: ref,
                  isShow: true
                }
              })
            }
          }
        } else {
          if (props.router.query && props.router.query.share) {
            window.location.href = `/post/share/${ref}`
          } else {
            router.push({
              pathname: `/post/whatsNext`,
              query: {
                ref: ref,
                isShow: true
              }
            })
          }
        }
      })
  }, [props.propertyDetail])

  useEffect(() => {
    if (dayjs().isBefore(dayjs({ hour: 21, minute: 0 }))) {
      renderSelectedDate(dayjs(addDaysTODate(1)))
      setBefore9PM(true)
    } else {
      renderSelectedDate(dayjs(addDaysTODate(2)))
      setBefore9PM(false)
    }
  }, [])

  const triggerSubmitHomerunnerGTAG = data => {
    triggerGTAG({
      event: 'PostListing_ALL'
    })
    triggerGTAG({
      event: 'clickCreateListingSubmitHomerunner'
    })
    triggerDengageEvents('speed_rent_post_property', {
      event_name: 'select_KoH',
      name: props.user ? props.user.name : '',
      phone_number:
        props.user && props.user.phoneNumber ? props.user.phoneNumber : '',
      email_address: props.user && props.user.email ? props.user.email : '',
      date: dengageConvertedDate(),
      key_collection_date: data.pickupDateTime
    })
  }

  const changeTime = option => {
    setGetTime(option)
  }

  const sendHomeRunnerSubmit = () => {
    const date = moment(getDate).format('DD/MM/YYYY')
    const time = moment(
      date + ' ' + getTime.value,
      'DD/MM/YYYY HH:mm:ss a'
    ).format('DD-MM-YYYY hh:mm:ss a')

    let allHasData = false
    const allObj = {
      getCollectionAddress,
      getTime,
      getDate,
      getRemarks
    }
    Object.keys(allObj).forEach(key => {
      if (allObj[key] === '') {
        allHasData = false
      } else {
        allHasData = true
      }
    })
    if (allHasData) {
      const data = {
        pickupAddress: getCollectionAddress,
        pickupDateTime: time,
        propertyId: id,
        remarks: getRemarks
      }
      // if KOH true it means return key
      // else collect key
      setIsLoading(true)
      setErrorMessage(false)
      if (router.query.KOH) {
        props.homeRunnerActions.homeRunnerReturnKey(data).then(data => {
          homeRuneerSuccessModal(data)
        })
      } else {
        props.homeRunnerActions.homeRunnerCollectKey(data).then(data => {
          homeRuneerSuccessModal(data)
        })
      }
    } else {
      setErrorMessage(true)
    }
  }

  const homeRuneerSuccessModal = data => {
    if (data.type === 'SUCCESS') {
      triggerSubmitHomerunnerGTAG(data)
      setIsRequestSentModalOpen(true)
      setIsLoading(false)
    } else {
      alert('Something Went Wrong!')
    }
  }
  const goToMyListings = () => {
    if (router.query.KOH) {
      router.push('/dashboard/listings')
    } else {
      if (props.router.query && props.router.query.share) {
        window.location.href = `/post/share/${ref}`
      } else {
        router.push({
          pathname: `/post/whatsNext`,
          query: {
            ref: ref,
            isShow: true
          }
        })
      }
    }
  }

  const onChangeDate = d1 => {
    setGetDate(d1)
    renderSelectedDate(dayjs(d1))
  }

  const onDateAdd = (d, dates) => {
    let day = isFilterDay(new Date(d))
    if (day && dates.length < 10) {
      dates.push({ value: d })
      return onDateAdd(dayjs(d).add(1, 'day'), dates)
    } else if (!day && dates.length < 10) {
      return onDateAdd(dayjs(d).add(1, 'day'), dates)
    }
    return dates
  }

  const renderSelectedDate = d => {
    const dates = onDateAdd(d, [])
    setSelectedDateArr(dates)
  }

  const isFilterDay = date => {
    const dateFind =
      HOLIDAY_HOMERUNNER &&
      HOLIDAY_HOMERUNNER.length &&
      HOLIDAY_HOMERUNNER.find(
        d =>
          dayjs(d.value).format('YYYY-MM-DD') ===
          dayjs(date).format('YYYY-MM-DD')
      )
    const day = date.getDay()
    return day !== 0 && day !== 6 && !dateFind
  }
  const isWeekday = date => {
    const sDateFind =
      setSelectedDate &&
      setSelectedDate.length &&
      setSelectedDate.find(
        d =>
          dayjs(d.value).format('YYYY-MM-DD') ===
          dayjs(date).format('YYYY-MM-DD')
      )
    const dateFind =
      HOLIDAY_HOMERUNNER &&
      HOLIDAY_HOMERUNNER.length &&
      HOLIDAY_HOMERUNNER.find(
        d =>
          dayjs(d.value).format('YYYY-MM-DD') ===
          dayjs(date).format('YYYY-MM-DD')
      )
    const day = date.getDay()
    return day !== 0 && day !== 6 && !dateFind && sDateFind
  }

  return (
    <ValidationForm
      onSubmit={e => {
        e.preventDefault()
        sendHomeRunnerSubmit()
      }}
    >
      <section className={'post_page_homerunner'}>
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
        <BreadCrumb breadCrumb={CONST.postPageHrunner} />

        <Container>
          <Link href={`/dashboard/listings`}>
            <ArrowLeft />
          </Link>

          {router.query.KOH ? (
            <Headline
              title={t('text_post_homrunner_key')}
              link={`/dashboard/listings`}
            />
          ) : (
            <Headline
              title={t('post:text_post_homrunner_viewing')}
              link={`/dashboard/listings`}
            />
          )}
          <div style={{ marginTop: '4rem' }}>
            <Row>
              <Col md={12}>
                <div className='main-container'>
                  <div className='img text-center'>
                    <img
                      loading='lazy'
                      src='/img/homerunnerViewing.png'
                      alt='images'
                      style={{ maxHeight: '200px' }}
                    />
                    {!router.query.KOH && (
                      <h5>
                        {t('post:text_post_homerunner_free').replace(
                          'PROPERTY_NAME',
                          name
                        )}
                      </h5>
                    )}
                  </div>
                  <div className='inner-pages' id={'arrangeCollectionValid'}>
                    <div className={`input-box floating-placeholder no-icon`}>
                      <TextInput
                        id='pickupAddress'
                        name='pickupAddress'
                        className='form-control'
                        placeholder={
                          router.query.KOH
                            ? t('post:text_post_homerunner_delAddrs_place')
                            : t('post:text_post_homerunner_colAddrs_place')
                        }
                        style={{
                          borderColor:
                            getErrorMessage && getCollectionAddress === ''
                              ? '#ff0055'
                              : '#727272'
                        }}
                        value={getCollectionAddress}
                        onChange={e => setGetCollectionAddress(e.target.value)}
                        errorMessage={`${t('post:text_post_req_global')}`}
                      />
                    </div>
                    <div className={'input-group-two-items'}>
                      <DatePicker
                        className={
                          getErrorMessage && !getDate
                            ? `homerunner-datepicker homerunner-datepicker-error`
                            : 'homerunner-datepicker'
                        }
                        placeholderText={`${t(
                          'post:text_post_homerunner_datePicker_place'
                        )}`}
                        dateFormat='dd/MM/yyyy'
                        autoComplete='off'
                        minDate={
                          before9PM ? addDaysTODate(1) : addDaysTODate(2)
                        }
                        onChange={onChangeDate}
                        value={getDate}
                        selected={getDate}
                        filterDate={isWeekday}
                      />
                      <SelectBox
                        data={VIEWING_TIME}
                        stateVal={getTime}
                        changeVal={changeTime}
                        className={
                          getErrorMessage && getTime.value === 'Select Time'
                            ? `selectboxtime selectboxtime-error selectboxtime--homerunner`
                            : 'selectboxtime selectboxtime--homerunner'
                        }
                        errorMessage={`${t('post:text_post_req_global')}`}
                      />
                    </div>
                    <div
                      className={`input-box floating-placeholder no-icon`}
                      style={{
                        borderColor:
                          getErrorMessage && getRemarks === ''
                            ? '#ff0055'
                            : '#727272'
                      }}
                    >
                      <TextInput
                        id='remarks'
                        name='remarks'
                        className='form-control'
                        placeholder={`${t(
                          'post:text_post_homerunner_remarks_place'
                        )}`}
                        value={getRemarks}
                        onChange={e => setGetRemarks(e.target.value)}
                        errorMessage='This field is required'
                        style={{
                          borderColor:
                            getErrorMessage && getRemarks === ''
                              ? '#ff0055'
                              : '#727272'
                        }}
                      />
                    </div>
                    {getErrorMessage ? (
                      <div
                        className={`input-box`}
                        style={{
                          border: 0,
                          padding: 0
                        }}
                      >
                        <span
                          style={{
                            color: '#ff0055'
                          }}
                        >
                          *{t('post:text_post_homerunnerAllError')}
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <div
                    className={`${styles['meta-wrap']} btn-holder text-right`}
                    style={{ paddingRight: '10px' }}
                  >
                    {!router.query.KOH && (
                      <a>
                        <button
                          id='btnClickCreateListingSkipHomerunner'
                          className={`${styles['btn']} ${styles['link-gray']} btn`}
                          onClick={e => {
                            e.preventDefault()
                            window.location.href =
                              props.router.query && props.router.query.share
                                ? `/post/share/${ref}`
                                : `/post/whatsNext?ref=${ref}&isShow=${true}`
                          }}
                        >
                          {t('btn_maybeLater')}
                        </button>
                      </a>
                    )}
                    <button
                      id='btnClickCreateListingSubmitHomerunner'
                      type='submit'
                      disabled={isLoading}
                      className={`${styles['nextButton']} btn btn-curv btn-share'`}
                      style={{
                        color: '#fff'
                      }}
                    >
                      {router.query.KOH
                        ? t('btn_return_key')
                        : t('btn_collect_key')}
                    </button>
                  </div>
                  <br />
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

      <RequestSentModal
        show={isRequestSentModalOpen}
        onHide={() => {
          setIsRequestSentModalOpen(false)
          goToMyListings()
        }}
      />
    </ValidationForm>
  )
}

const mapStateToProps = ({ post, auth }) => {
  return { post, user: auth.user }
}

const mapDispatchToProps = dispatch => {
  return {
    homeRunnerActions: bindActionCreators(homeRunnerActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HomeRunner))
