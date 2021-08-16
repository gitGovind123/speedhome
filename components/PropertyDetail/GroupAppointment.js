import React from 'react'
import { Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
// import '~react-datepicker/dist/react-datepicker.css'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { addDaysTODate } from '../Common/Helper'
import styles from './GroupAppointment.module.scss'

class GroupAppointment extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fields: {},
      selectedOption: true,
      radioValue: null,
      errors: {},
      formIsValid: true,
      isNotValid: {},
      before9PM: false,
      isSubmit: false
    }
  }

  handleChange (field, e) {
    let fields = { ...this.state.fields }

    if (field == 'instantDate') fields[field] = e
    else fields[field] = e.target.value

    this.setState({
      fields: fields
    })
  }

  handleSubmit = () => {
    this.handleValidation(formIsValid => {
      if (formIsValid) {
        this.setState({
          isSubmit: true
        })
        if (this.state.fields['radioValue'] === 'requestTime') {
          let data = {
            appointmentDate: this.state.fields['instantDate'],
            appointmentTime: this.refs.timeValue.value
          }
          this.props.submitNewAppointMent(data, {
            group: false,
            submitType: 'showGroupAppointmentPopupSubmit'
          })
        } else {
          let data = this.state.fields['radioValue']
          this.props.submitNewAppointMent(data, {
            group: true,
            submitType: 'showGroupAppointmentPopupSubmit'
          })
        }
      } else {
        this.setState({
          isSubmit: false
        })
      }
    })
  }

  handleValidation = callback => {
    let fields = { ...this.state.fields }
    let errors = {}
    let formIsValid = true
    let isNotValid = {}
    if (!fields['radioValue']) {
      formIsValid = false
      errors['radioValue'] = 'choose the required option'
      isNotValid['radioValue'] = true
    } else {
      if (this.state.fields['radioValue'] === 'requestTime') {
        if (
          !this.refs.timeValue ||
          !this.refs.timeValue.value ||
          this.refs.timeValue.value == ''
        ) {
          formIsValid = false
          errors['timeValue'] = 'Time must be required'
          isNotValid['timeValue'] = true
        } else isNotValid['timeValue'] = false

        if (!fields['instantDate']) {
          formIsValid = false
          errors['instantDate'] = 'Date must be required'
          isNotValid['instantDate'] = true
        } else isNotValid['instantDate'] = false
      }
    }

    this.setState({ errors: errors, isNotValid: isNotValid }, () => {
      if (callback) {
        callback(formIsValid)
      }
    })
  }
  changeOptionType = () => {
    this.setState({
      selectedOption: !this.state.selectedOption
    })
  }
  componentDidMount () {
    if (dayjs().isBefore(dayjs({ hour: 21, minute: 0 }))) {
      this.setState({
        before9PM: true
      })
    } else {
      this.setState({
        before9PM: false
      })
    }
  }
  render () {
    const {
      handleClose,
      isOpen,
      appointmentsList,
      showGroupAppointmentPopupSubmit
    } = this.props
    const radioButtonValid = classNames({
      'error radioError': true,
      show: this.state.isNotValid['instantDate']
    })

    const instantDateValid = classNames({
      error: true,
      show: this.state.isNotValid['instantDate']
    })

    const instantDateClass = classNames({
      'floating-placeholder no-icon': true,
      formError: this.state.isNotValid['instantDate']
    })

    const timeValueValid = classNames({
      error: true,
      show: this.state.isNotValid['timeValue']
    })

    const timeValueClass = classNames({
      'floating-placeholder no-icon select-sm sources': true,
      'formError timeValueError': this.state.isNotValid['timeValue']
    })
    return (
      <React.Fragment>
        {
          <Modal
            show={isOpen}
            onHide={handleClose}
            className={`${styles['propertyDetailPage']} ${styles['popupResponse']}`}
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

                <div className={styles['instantImgHeader']}>
                  <img
                    loading='lazy'
                    className={styles['instantImg']}
                    alt=''
                    src='/img/ic_group_viewing.png'
                    width='16'
                  />
                </div>
                <h4 className='user-title text-center'>
                  join one of our group viewing and enjoy RM50 discount if you
                  rent this unit!
                </h4>

                <div>
                  <RadioGroup
                    aria-label='gender'
                    name='gender1'
                    value={this.state.fields['radioValue']}
                    onChange={event => this.handleChange('radioValue', event)}
                    disabled={!this.state.selectedOption}
                  >
                    {appointmentsList
                      ? appointmentsList.map(appointment => {
                          return (
                            <FormControlLabel
                              value={appointment}
                              control={<Radio />}
                              label={dayjs(appointment).format(
                                'MMMM Do YYYY, h a'
                              )}
                            />
                          )
                        })
                      : null}
                    <h4 id='orSeperator' className={styles['orSeperator']}>
                      or
                    </h4>

                    <FormControlLabel
                      value='requestTime'
                      control={<Radio />}
                      label='Request Different Timing'
                    />
                  </RadioGroup>
                </div>

                <div
                  className={`${styles['instantInput']} ${styles['input-box']} ${instantDateClass} ${styles['dynamicDate']} ${styles['instantDate']}`}
                >
                  <DatePicker
                    className={`${styles['instantInput']} ${styles['input-box']}  floating-placeholder no-icon ${styles['moveInDate']} form-control`}
                    required
                    placeholderText='Date  (dd/mm/yyyy)'
                    dateFormat='dd/MM/yyyy'
                    autoComplete='off'
                    onChange={date => this.handleChange('instantDate', date)}
                    value={this.state.fields['instantDate']}
                    selected={this.state.fields['instantDate']}
                    disabled={this.state.fields['radioValue'] !== 'requestTime'}
                    minDate={
                      this.state.before9PM ? addDaysTODate(1) : addDaysTODate(2)
                    }
                  />
                  <span
                    className={`${instantDateValid} ${styles['errorColor']}`}
                  >
                    {this.state.errors['instantDate']}
                  </span>
                </div>
                <div>
                  <select
                    ref='timeValue'
                    name='time'
                    id='timeSelection'
                    className={`${styles['instantInput']} ${styles['input-box']} ${timeValueClass} ${styles['instantTime']} `}
                    disabled={this.state.fields['radioValue'] !== 'requestTime'}
                  >
                    <option value='' selected='selected'>
                      Select Time
                    </option>
                    <option value='09.00 AM'>09.00 AM</option>
                    <option value='10.00 AM'>10.00 AM</option>
                    <option value='11.00 AM'>11.00 AM</option>
                    <option value='12.00 PM'>12.00 PM</option>
                    <option value='01.00 PM'>01.00 PM</option>
                    <option value='02.00 PM'>02.00 PM</option>
                    <option value='03.00 PM'>03.00 PM</option>
                    <option value='04.00 PM'>04.00 PM</option>
                    <option value='05.00 PM'>05.00 PM</option>
                    <option value='06.00 PM'>06.00 PM</option>
                    <option value='07.00 PM'>07.00 PM</option>
                    <option value='08.00 PM'>08.00 PM</option>
                  </select>
                  <span className={`${timeValueValid} ${styles['errorColor']}`}>
                    {this.state.errors['timeValue']}
                  </span>
                </div>
                {this.state.errors['radioValue'] ? (
                  <span
                    className={`${radioButtonValid} ${styles['errorColor']}`}
                  >
                    {this.state.errors['radioValue']}
                  </span>
                ) : null}

                <div className='btn-wrapper'>
                  <a
                    className={`btn btn-secondary-filled btn-holder btn-curv ${styles['instantViewHeader']} ${styles['groupSubmitBtn']}`}
                    id='btnSubmitChat'
                    onClick={this.handleSubmit}
                    disabled={showGroupAppointmentPopupSubmit}
                  >
                    Submit
                    {showGroupAppointmentPopupSubmit ? (
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
        }
      </React.Fragment>
    )
  }
}

export default GroupAppointment
