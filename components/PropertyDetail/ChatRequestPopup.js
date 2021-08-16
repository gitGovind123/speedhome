import React, { useState, useEffect, useMemo } from 'react'
import { Modal } from 'react-bootstrap'
import dayjs from 'dayjs'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { countries } from '../../globalutilities/consts'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'
import classNames from 'classnames'
// import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'

import { setDate } from '../../actions/property'
import CustomDatePicker from '../Common/CustomDatePicker'
import CONST from '../../globalutilities/consts'
import {
  getCrInfoBudget,
  getCrInfoMovinDate,
  removeCrInfoBudget,
  removeCrInfoMoveInDate,
  setCrInfoBudget,
  setCrInfoMoveInDate
} from '../../globalutilities/helpers'
import Select from 'react-select'
import { TENANCY_DURATION } from '../Post/DB'
import { triggerGTAG } from '../../utils/utils'
import styles from './ChatRequestPopup.module.scss'

const selectStyles = {
  control: base => ({
    ...base,
    border: '2px solid rgb(114, 114, 114)',
    boxShadow: 'none',
    borderRadius: '0',
    opacity: '1',
    minHeight: '48px',
    width: '100%',
    fontSize: '17px',
    // zIndex: '99999999999',
    transition: 'all .4s ease-in-out',
    transform: 'translateY(0)',
    '&:hover': {
      borderColor: 'rgb(114, 114, 114)'
    }
  })
}

const ChatRequestPopup = props => {
  const {
    propertyInfo,
    propertyId,
    handleClose,
    isOpen,
    chatRequestPopupIsSubmit,
    router
  } = props

  const [fields, setFields] = useState({
    alertCheckBox: true,
    occupation: null,
    telCode: null,
    moveInDate: '',
    nationality: null,
    budget: null
  })
  const [errors, setErrors] = useState({})
  const [isNotValid, setIsNotValid] = useState({})
  const [selectedFlag, setSelectedFlag] = useState({})
  const [phoneNumber, setPhoneNumber] = useState('')
  const [user, setUser] = useState(null)
  // const [isRoomType, setIsRoomType] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [date, setDate] = useState(null)
  const [tenancyDuration, setTenancyDuration] = useState('')
  const [tenancDurationError, setTenancyDurationError] = useState('')
  const today = useMemo(() => new Date(), [])
  const { t } = useTranslation('common')

  useEffect(() => {
    const cloneFields = Object.assign({}, fields)
    const crInfo_budget = getCrInfoBudget()
    const crInfo_moveInDate = getCrInfoMovinDate()

    if (crInfo_budget) {
      cloneFields.budget = crInfo_budget
    }
    if (crInfo_moveInDate) {
      cloneFields.moveInDate = new Date(crInfo_moveInDate)
    }

    setFields(cloneFields)
  }, [])

  useEffect(() => {
    if (isOpen) {
      triggerGTAG({
        event: 'ChatRequestForm'
      })
    }
  }, [isOpen])

  useEffect(() => {
    if (props.user) {
      setUser(props.user)

      const cloneFields = Object.assign({}, fields)

      const occupation = props.user.occupation ? props.user.occupation : ''
      const country = props.user.country ? props.user.country : ''

      cloneFields.occupation = occupation
      cloneFields.nationality = country

      const crInfo_budget = getCrInfoBudget()
      const crInfo_moveInDate = getCrInfoMovinDate()

      if (crInfo_budget) {
        cloneFields.budget = crInfo_budget
      }
      if (crInfo_moveInDate) {
        cloneFields.moveInDate = new Date(crInfo_moveInDate)
      }

      setFields(cloneFields)
    }
  }, [props.user])

  useEffect(() => {
    if (props.isOpen) {
      setIsSubmit(true)
    }
  }, [props.isOpen])
  useState(() => {
    if (props.date) {
      setDate(props.date)
      let cloneFields = { ...fields }
      cloneFields['moveInDate'] = props.date
      setFields(cloneFields)
    }
  }, [props.date])

  const changeTenancyDuration = data => {
    setTenancyDuration(data.value)
    setTenancyDurationError('')
  }
  const changeNationality = data => {
    let cloneFields = { ...fields }
    cloneFields['nationality'] = data
    setFields(cloneFields)
  }

  const onPhoneNumberChange = (...args) => {
    let argsArr = [...args]
    let cloneFields = { ...fields }
    let cloneIsNotValid = { ...isNotValid }
    cloneFields['telCode'] = argsArr && argsArr[1] ? argsArr[3] : null
    if (!fields['telCode']) {
      cloneIsNotValid['telCode'] = true
    }
    cloneIsNotValid['telCode'] = false

    let countryData = (argsArr && argsArr[2]) || {}
    let phoneNum = (argsArr && argsArr[1]) || ''
    setFields(cloneFields)
    setIsNotValid(cloneIsNotValid)
    setSelectedFlag(countryData)
    setPhoneNumber(phoneNum)
  }

  const handleValidation = callback => {
    let cloneFields = { ...fields }
    let cloneErrors = {}
    let formIsValid = true
    let cloneIsNotValid = {}

    if (!cloneFields['occupation']) {
      formIsValid = false
      cloneErrors['occupation'] = 'Occupation must be required'
      cloneIsNotValid['occupation'] = true
    } else cloneIsNotValid['occupation'] = false

    if (!cloneFields['nationality']) {
      formIsValid = false
      cloneErrors['nationality'] = 'Nationality must be required'
      cloneIsNotValid['nationality'] = true
    } else cloneIsNotValid['nationality'] = false

    if (!cloneFields['budget']) {
      formIsValid = false
      cloneErrors['budget'] = 'Budget must be required'
      cloneIsNotValid['budget'] = true
    } else cloneIsNotValid['budget'] = false

    if (!cloneFields['moveInDate']) {
      formIsValid = false
      cloneErrors['moveInDate'] = 'Date must be required'
      cloneIsNotValid['moveInDate'] = true
    } else cloneIsNotValid['moveInDate'] = false

    if (!user) {
      if (!cloneFields['telCode']) {
        formIsValid = false
        cloneErrors['telCode'] = 'Mobile number required'
        cloneIsNotValid['telCode'] = true
      } else cloneIsNotValid['telCode'] = false
    }
    if (cloneFields['budget'] && cloneFields['budget'] < 1) {
      formIsValid = false
      cloneErrors['budget'] = 'Budget must be grater than 1'
      cloneIsNotValid['budget'] = true
    }
    if (!router.asPath.includes('/rental-bidding')) {
      if (tenancyDuration == '') {
        formIsValid = false
        setTenancyDurationError('Tenancy Duration is Reauired')
      } else {
        setTenancyDurationError('')
      }
    }
    setErrors(cloneErrors)
    setIsNotValid(cloneIsNotValid)
    setFields(cloneFields)

    if (callback) {
      callback(formIsValid)
    }
  }

  const submitChatForm = () => {
    const { price, availability } = propertyInfo
    const { budget, moveInDate } = fields

    let isInValid = false
    const availabilityDate = availability
      ? dayjs(availability).format('YYYY-MM-DD')
      : ''
    const selectedDate = moveInDate
      ? dayjs(moveInDate).format('YYYY-MM-DD')
      : ''
    const today = dayjs(new Date()).format('YYYY-MM-DD')
    if (router.asPath.includes('/rental-bidding')) {
      const currentPrice = propertyInfo.auctionData.currentPrice
      const atLeast50RM = parseInt(budget) - parseInt(currentPrice) >= 50
      if (!atLeast50RM) {
        toast(`Offer cannot be less than RM ${parseInt(currentPrice) + 50}`, {
          autoClose: CONST.ToastTimeout,
          type: toast.TYPE.ERROR
        })
        isInValid = true
      }
    } else {
      const isPriceMoreThan2k = price > 2000

      if (isPriceMoreThan2k && price - (parseInt(price) * 15) / 100 > budget) {
        toast(
          `Offer cannot be less than RM ${parseInt(
            parseInt(price) - (parseInt(price) * 15) / 100
          )}`,
          {
            autoClose: CONST.ToastTimeout,
            type: toast.TYPE.ERROR
          }
        )
        isInValid = true
      }

      if (!isPriceMoreThan2k && price - 100 > budget) {
        toast(`Offer cannot be less than RM ${parseInt(price - 100)}`, {
          autoClose: CONST.ToastTimeout,
          type: toast.TYPE.ERROR
        })
        isInValid = true
      }
    }

    if (
      availabilityDate &&
      dayjs(availabilityDate).unix() > dayjs(selectedDate).unix() &&
      dayjs(today).unix() < dayjs(selectedDate).unix()
    ) {
      toast(
        'Move in date cannot be before availability date. If possible change the move in date or enquire another unit.',
        {
          autoClose: CONST.ToastTimeout,
          type: toast.TYPE.ERROR
        }
      )
      isInValid = true
    }

    if (isInValid) return

    handleValidation(formIsValid => {
      if (formIsValid) {
        setIsSubmit(true)
        sendChatRequest()
      } else {
        setIsSubmit(false)
      }
    })
  }

  const sendChatRequest = () => {
    let chatRequestPayload = {}

    let fieldNames = []

    if (router.asPath.includes('/rental-bidding')) {
      fieldNames = [
        'occupation',
        'nationality',
        'budget',
        'moveInDate',
        'telCode'
      ]
    } else {
      fieldNames = [
        'occupation',
        'nationality',
        'budget',
        'moveInDate',
        'telCode',
        'tenancyDuration'
      ]
    }

    fieldNames.forEach(field => {
      switch (field) {
        case 'occupation':
          chatRequestPayload[field] = fields[field]
          break
        case 'nationality':
          chatRequestPayload['fromCountry'] = fields[field].value
          break
        case 'budget':
          chatRequestPayload[field] = parseInt(fields[field])
          break
        case 'moveInDate':
          chatRequestPayload['movingDate'] = new Date(
            fields[field]
          ).toISOString()
          break
        case 'tenancyDuration':
          chatRequestPayload['tenancyDuration'] = parseInt(tenancyDuration)
          break
      }
    })

    chatRequestPayload['noDeposit'] = true
    chatRequestPayload['relationship'] = 'string'
    chatRequestPayload['propertyId'] = propertyId

    if (getCrInfoBudget()) {
      removeCrInfoBudget()
    }
    if (getCrInfoMovinDate()) {
      removeCrInfoMoveInDate()
    }
    const CrInfo = {
      budget: chatRequestPayload.budget,
      moveInDate: chatRequestPayload.movingDate
    }

    setCrInfoBudget(CrInfo.budget)
    setCrInfoMoveInDate(CrInfo.moveInDate)
  
    props.sendChatRequest(
      chatRequestPayload,
      selectedFlag,
      phoneNumber,
      fields['alertCheckBox']
    )
  }

  const requestSite = () => {
    window.open(
      'https://www.accountkit.com/v1.1/dialog/sms_login/?app_id=389948874543236&country_code=%2B60&display=popup&enable_sms=true&fb_app_events_enabled=true&locale=en_US&logging_ref=f14c47fbdf772&origin=http%3A%2F%2Falpha.speedrent.com&phone_number=454545&redirect=%2Fdashboard&sdk=web&state=FXhyeYQcGFEVLV2KSA2FS2P3UauyP24lIC7Ava&test_sms_with_infobip=false',
      '_blank',
      'resizable=yes,top=300,left=500,width=500,height=470'
    )
  }

  const handleChange = (field, e) => {
    let cloneFields = { ...fields }
    let cloneIsNotValid = { ...isNotValid }

    if (field == 'moveInDate') {
      cloneFields[field] = e
      props.setDate(e)
    } else if (field == 'alertCheckBox') {
      cloneFields[field] = event.target.checked
    } else {
      cloneFields[field] = e.target.value
    }
    if (!cloneFields[field]) {
      cloneIsNotValid[field] = true
    }
    cloneIsNotValid[field] = false

    setFields(cloneFields)
    setIsNotValid(cloneIsNotValid)
  }

  const occupationClasses = classNames({
    'floating-placeholder no-icon': true,
    formError: isNotValid['occupation']
  })

  const occupationValid = classNames({
    error: true,
    show: isNotValid['occupation']
  })

  const nationalityClasses = classNames({
    'input-box custom-select-v2 input-select-box no-icon': true,
    formError: isNotValid['nationality']
  })

  const nationalityValid = classNames({
    error: true,
    show: isNotValid['nationality']
  })

  const budgetClasses = classNames({
    'floating-placeholder no-icon': true,
    formError: isNotValid['budget']
  })

  const budgetValid = classNames({
    error: true,
    show: isNotValid['budget']
  })

  const moveInDateClasses = classNames({
    'floating-placeholder no-icon': true,
    formError: isNotValid['moveInDate']
  })

  const moveInDateValid = classNames({
    error: true,
    show: isNotValid['moveInDate']
  })

  const telClass = classNames({
    formErrorTel: isNotValid['telCode']
  })

  const telValid = classNames({
    error: true,
    showTel: true,
    show: isNotValid['telCode']
  })

  const handlePopupClose = () => {
    setTenancyDuration('')
    handleClose()
  }

  const availability = new Date(propertyInfo.availability)
  const minimumDate = Math.max(today, availability)

  return (
    <React.Fragment>
      <Modal
        show={isOpen}
        onHide={handlePopupClose}
        className={`${styles['propertyDetailPage']} ${styles['popupChat']}`}
      >
        <Modal.Header className={styles['formHeader']}>
          <Modal.Title className={styles['formTitle']}>
            {router.asPath.includes('/rental-bidding')
              ? 'Submit a bid'
              : t('text_chat_request')}
          </Modal.Title>
          <button
            onClick={() => {
              handlePopupClose()
            }}
            title='Close (Esc)'
            type='button'
            className={styles['mfp-close']}
            style={{
              position: 'absolute',
              right: 20,
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '24px',
              color: '#000'
            }}
          >
            ×
          </button>
        </Modal.Header>
        <Modal.Body className={styles['formBody']}>
          <div
            className={`${styles['white-popup']} ${styles['property-popup__root']}`}
            id='chatRequestPopup'
            data-testId='ChatRequestPopUp'
          >
            <div
              className={`${styles['chatForm']}  user-container ${styles['user-container']}  text-center`}
            >
              <React.Fragment>
                <div className={styles['property-popup__lendlord-text']}>
                  Landlord would like to know you better with these questions.
                </div>
                <div className={`d-flex ${styles['chat__form--root']}`}>
                  <img
                    src={
                      props.propertyInfo.images[0] &&
                      props.propertyInfo.images[0].url
                    }
                    alt='null'
                  />
                  <div className={styles['middle-div']}>
                    <div className={styles['property-popup__name-price']}>
                      <div className={styles['property-info__popup-name']}>
                        {props.propertyInfo.name}
                      </div>
                      <div className={styles['property-info__popup-price']}>
                        RM
                        {router.asPath.includes('/rental-bidding')
                          ? props.propertyInfo.auctionData.currentPrice.toLocaleString()
                          : props.propertyInfo.price.toLocaleString()}
                      </div>
                    </div>
                    <div
                      className={`d-flex  ${styles['property-info__popur-details']}`}
                    >
                      <div>{props.propertyInfo.sqft}sqft</div>
                      <span className={styles['property-info__divider']}>
                        |
                      </span>
                      <div>{props.propertyInfo.type}</div>
                      <span className={styles['property-info__divider']}>
                        |
                      </span>
                      <div>{props.propertyInfo.furnishType}</div>
                    </div>
                    <div className={styles['property-info__popup-date']}>
                      <span>availability:</span>{' '}
                      {dayjs(props.propertyInfo.availability).format(
                        'DD-MM-YYYY'
                      )}
                    </div>
                  </div>
                </div>
                {router.asPath.includes(['/rental-bidding']) && (
                  <div className={`${styles['input-box']} ${budgetClasses}`}>
                    <input
                      onChange={e => handleChange('budget', e)}
                      value={fields['budget']}
                      className='form-control'
                      id='budget'
                      placeholder='Make an offer'
                      required
                      type='number'
                    />
                    <span className={budgetValid}>{errors['budget']}</span>
                    <label htmlFor='budget'>
                      <span>budget</span>
                    </label>
                  </div>
                )}

                <div className={`${styles['input-box']} ${occupationClasses}`}>
                  <input
                    className='form-control'
                    id='occupation'
                    placeholder='Working as'
                    required
                    type='text'
                    onChange={e => handleChange('occupation', e)}
                    value={fields['occupation']}
                    data-testId='ChatRequestOccupation'
                  />
                  <span className={occupationValid}>
                    {errors['occupation']}
                  </span>
                </div>
                <div className={styles['chat-request__tenancy-duration']}>
                  <Select
                    value={fields['nationality']}
                    id='nationality'
                    placeholder='nationality'
                    onChange={changeNationality}
                    options={countries}
                    isSearchable={false}
                    styles={selectStyles}
                  />
                  <span className={nationalityValid}>
                    {errors['nationality']}
                  </span>
                </div>
                {!router.asPath.includes(['/rental-bidding']) && (
                  <div className={`${styles['input-box']} ${budgetClasses}`}>
                    <input
                      onChange={e => handleChange('budget', e)}
                      value={fields['budget']}
                      className='form-control'
                      id='budget'
                      placeholder='Make an offer'
                      required
                      type='number'
                    />
                    <span className={budgetValid}>{errors['budget']}</span>
                    <label htmlFor='budget'>
                      <span>budget</span>
                    </label>
                  </div>
                )}
                <div className={`${styles['input-box']} ${moveInDateClasses}`}>
                  <CustomDatePicker
                    className='moveInDate form-control'
                    id='moveInDate'
                    required
                    placeholderText='Move in date  (dd/mm/yyyy)'
                    dateFormat='dd/MM/yyyy'
                    autoComplete='off'
                    onChange={e => handleChange('moveInDate', e)}
                    value={date || fields['moveInDate']}
                    minDate={minimumDate}
                  />
                  <span className={moveInDateValid}>
                    {errors['moveInDate']}
                  </span>
                  <label htmlFor='moveInDate'>
                    <span>Move in date</span>
                    (dd/mm/yyyy)
                  </label>
                </div>
                {!router.asPath.includes('/rental-bidding') && (
                  <div className={styles['chat-request__tenancy-duration']}>
                    <Select
                      value={tenancyDuration.value && tenancyDuration.value}
                      placeholder='tenancy duration'
                      onChange={changeTenancyDuration}
                      options={TENANCY_DURATION}
                      isSearchable={false}
                      styles={selectStyles}
                      id='tenance_duration'
                    />
                    {tenancDurationError !== '' ? (
                      <div className='tenancy-duration--error error'>
                        Tenancy duration is required
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                )}
              </React.Fragment>

              {!user && (
                <div className={telClass}>
                  <IntlTelInput
                    separateDialCode='true'
                    containerClassName={`intl-tel-input ${styles['input-box']}`}
                    inputClassName='form-control'
                    onPhoneNumberChange={onPhoneNumberChange}
                    defaultCountry='my'
                    placeholder='Mobile Number'
                    fieldId='telCode'
                  />
                  <span className={telValid}>{errors['telCode']}</span>
                </div>
              )}
              {!router.asPath.includes('/rental-bidding') && (
                <div style={{ marginBottom: '20px' }}>
                  <label
                    className={`${styles['checkbox']} form-group ${styles['checkbox-sm']} ${styles['checkbox-inline-sm']}`}
                  >
                    <input
                      type='checkbox'
                      checked={fields['alertCheckBox']}
                      onChange={e => handleChange('alertCheckBox', e)}
                    />
                    <span className={styles['checkbox__icon']} />
                    Be informed first when similar listing is posted !
                  </label>
                </div>
              )}

              <div className='btn-wrapper'>
                <button
                  className='btn btn-secondary-filled btn-holder btn-curv'
                  id='btnSubmitChatRequest'
                  disabled={chatRequestPopupIsSubmit}
                  onClick={() => submitChatForm()}
                >
                  {router.asPath.includes('/rental-bidding')
                    ? 'Submit My Bid'
                    : t('btn_send_now')}
                  {chatRequestPopupIsSubmit ? (
                    <i
                      className='fa fa-spinner fa-spin'
                      style={{ marginLeft: '.5rem' }}
                    />
                  ) : null}
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

const mapStateToProps = ({ property }) => {
  return {
    date: property.date
  }
}
const mapDispatchToProps = {
  setDate
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRequestPopup)
