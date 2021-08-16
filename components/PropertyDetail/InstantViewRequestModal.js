import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import dayjs from 'dayjs'
import classNames from 'classnames'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as propertyActions from '../../actions/property'
import { momentConvert } from '../../globalutilities/helpers'

import CustomDatePicker from '../Common/CustomDatePicker'
import styles from './InstantViewRequestModal.module.scss'

const TIMES = [
  '11:00 a.m.',
  '11:30 a.m.',
  '12:00 p.m.',
  '12:30 p.m.',
  '01:00 p.m.',
  '01:30 p.m.',
  '02:00 p.m.',
  '02:30 p.m.',
  '03:00 p.m.',
  '03:30 p.m.',
  '04:00 p.m.',
  '04:30 p.m.',
  '05:00 p.m.',
  '05:30 p.m.',
  '06:00 p.m.',
  '06:30 p.m.',
  '07:00 p.m.'
]

const InstantViewRequestModal = props => {
  const { handleClose, isOpen, instantViewRequestModalSubmit } = props

  const [fields, setFields] = useState({ instantDate: '', timeValue: '' })
  const [errors, setErrors] = useState({})
  const [isNotValid, setIsNotvalid] = useState({})
  const [before9PM, setBefore9PM] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    if (dayjs().isBefore(dayjs({ hour: 21, minute: 0 }))) {
      setBefore9PM(true)
    } else {
      setBefore9PM(false)
    }
    props.propertyActions.getViewingDate()
    props.propertyActions.getViewingTime()
  }, [])

  useEffect(() => {
    if (props.viewingDate) {
      const cloneFieldsData = Object.assign(fields, {})
      cloneFieldsData.instantDate = props.viewingDate
      setFields(cloneFieldsData)
    }
  }, [props.viewingDate])

  useEffect(() => {
    if (props.time) {
      const cloneFieldsData = Object.assign(fields, {})
      cloneFieldsData.timeValue = props.time
      setFields(cloneFieldsData)
      setTime(props.time)
    }
  }, [props.time])

  const handleChange = (field, e) => {
    let cloneFieldsData = { ...fields }
    let cloneIsNotValid = { ...isNotValid }

    if (field === 'instantDate') {
      cloneFieldsData[field] = e
      if (e) {
        props.propertyActions.setViewingDate(e)
      }
    } else {
      cloneFieldsData[field] = e.target.value
    }

    if (field === 'timeValue') {
      props.propertyActions.setTime(e.target.value)
    }
    if (!cloneFieldsData[field]) {
      cloneIsNotValid[field] = true
    } else cloneIsNotValid[field] = false

    setFields(cloneFieldsData)
    setIsNotvalid(cloneIsNotValid)
  }

  const updateInstantViewTime = () => {
    let Payload = {}

    let fieldNames = ['timeValue', 'instantDate']

    fieldNames.forEach(field => {
      switch (field) {
        case 'timeValue':
          Payload['timeValue'] = fields['timeValue']
          break
        case 'instantDate':
          Payload['instantDate'] = new Date(fields['instantDate']).toISOString()
          break
      }
    })

    let data = {
      appointmentDate: Payload['instantDate'],
      appointmentTime: Payload['timeValue']
    }
    props.submitNewAppointMent(data, {
      group: false,
      submitType: 'instantViewRequestModalSubmit'
    })
  }

  const handleValidation = callback => {
    let cloneFields = { ...fields }
    let cloneErrors = {}
    let formIsValid = true
    let cloneIsNotValid = {}

    if (!cloneFields['timeValue']) {
      formIsValid = false
      cloneErrors['timeValue'] = 'Time must be required'
      cloneIsNotValid['timeValue'] = true
    } else cloneIsNotValid['timeValue'] = false
    if (!cloneFields['instantDate']) {
      formIsValid = false
      cloneErrors['instantDate'] = 'Date must be required'
      cloneIsNotValid['instantDate'] = true
    } else cloneIsNotValid['instantDate'] = false

    setFields(cloneFields)
    setIsNotvalid(cloneIsNotValid)
    setErrors(cloneErrors)
    callback(formIsValid)
  }

  const handleSubmit = () => {
    handleValidation(formIsValid => {
      if (formIsValid) {
        setIsSubmit(true)

        updateInstantViewTime()
      } else {
        setIsSubmit(false)
      }
    })
  }

  const instantDateValid = classNames({
    error: true,
    show: fields['instantDate'] ? isNotValid['instantDate'] : false
  })

  const instantDateClass = classNames({
    'floating-placeholder no-icon': true,
    formError: fields['instantDate'] ? isNotValid['instantDate'] : false
  })

  const timeValueValid = classNames({
    error: true,
    show: isNotValid['timeValue']
  })

  const timeValueClass = classNames({
    'floating-placeholder no-icon select-sm sources': true,
    'formError timeValueError': isNotValid['timeValue']
  })
  return (
    <React.Fragment>
      <Modal
        show={isOpen}
        onHide={handleClose}
        className={`propertyDetailPage ${styles['popupResponse']}`}
        id="instantViewRequestModal"
      >
        <Modal.Body className={styles['formBody']}>
          <div id='viewUnitSegment' className='white-popup'>
            <div
              style={{
                height: '2rem'
              }}
            >
              <button
                onClick={() => {
                  handleClose()
                }}
                title='Close (Esc)'
                type='button'
                className='mfp-close'
                style={{ color: '#000', top: '10px' }}
              >
                ×
              </button>
            </div>

            <h4 className='user-title text-center'>
              Choose your preferred viewing time
            </h4>
            <div className={styles['instantImgHeader']}>
              <img
                loading='lazy'
                className={styles['instantImg']}
                alt=''
                src='/img/ic_instant_viewing.png'
                width='16'
                data-testId="instantViewRequestImage"
              />
            </div>
            <div
              className={`${styles['instantInput']} ${styles['input-box']} ${instantDateClass} ${styles['dynamicDate']} ${styles['instantDate']}`}
            >
              <CustomDatePicker
                className={`${styles['moveInDate']} form-control`}
                id='moveInDate'
                required
                placeholderText='Select Date (dd/mm/yyyy)'
                dateFormat='dd/MM/yyyy'
                autoComplete='off'
                onChange={e => handleChange('instantDate', e)}
                value={fields['instantDate'] ? fields['instantDate'] : null}
              />
              {errors['instantDate'] ? (
                <span className={`${styles['errorColor']} ${instantDateValid}`}>
                  {errors['instantDate']}
                </span>
              ) : null}
            </div>
            <div>
              <select
                name='time'
                id='timeSelection'
                className={`${styles['instantInput']} ${styles['input-box']} ${timeValueClass} ${styles['instantTime']}`}
                defaultValue={fields['timeValue']}
                onChange={e => handleChange('timeValue', e)}
              >
                <option
                  value=''
                  selected={!fields['timeValue'] ? 'selected' : false}
                >
                  Select Time
                </option>
                {TIMES.map(val => (
                  <option
                    key={val}
                    value={val}
                    selected={val === fields['timeValue'] ? 'selected' : false}
                  >
                    {val}
                  </option>
                ))}
              </select>
              <span className={`${styles['errorColor']} ${timeValueValid}`}>
                {errors['timeValue']}
              </span>
            </div>
            <div className='btn-wrapper'>
              <a
                className={`btn btn-secondary-filled btn-holder btn-curv  ${styles['instantViewHeader']}`}
                id='btnSubmitChatAppointment'
                onClick={handleSubmit}
                style={{
                  marginBottom: '1rem'
                }}
                disabled={instantViewRequestModalSubmit}
              >
                Submit
                {instantViewRequestModalSubmit ? (
                  <i
                    className='fa fa-spinner fa-spin'
                    style={{ marginLeft: '.5rem' }}
                  />
                ) : null}
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}
const mapStateToProps = state => {
  return {
    viewingDate: state.property.viewingDate,
    time: state.property.time
  }
}

const mapDispatchToProps = dispatch => {
  return {
    propertyActions: bindActionCreators(propertyActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstantViewRequestModal)
