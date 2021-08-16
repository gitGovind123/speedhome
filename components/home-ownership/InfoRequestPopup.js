import React from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'
import classNames from 'classnames'
import PropertyDetailModalWithHead from '../PropertyDetail/PropertyDetailModalWithHead'

class InfoRequestPopup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fields: {
        name: '',
        telCode: '',
        email: '',
        occupation: ''
      },
      errors: {},
      isNotValid: {},
      selectedFlag: {},
      phoneNumber: '',
      user: null,
      isLoggedIn: Cookies.get('authToken'),
      propertyName: ''
    }
  }

  componentDidMount () {
    const user = this.state.user || {}

    if (user) {
      const fields = Object.assign({}, this.state.fields)
      this.setState({
        fields
      })
    }
  }

  componentDidUpdate (prevProps) {
    if (
      (Cookies.get('authToken') && !this.state.isLoggedIn) ||
      (!Cookies.get('authToken') && this.state.isLoggedIn)
    ) {
      this.setState({ isLoggedIn: Cookies.get('authToken') })
    }
    if (prevProps.user !== this.props.user) {
      if (this.props.user) {
        const fields = Object.assign({}, this.state.fields)

        this.setState({
          user: this.props.user,
          fields
        })
      }
    }
  }

  onPhoneNumberChange = (...args) => {
    let argsArr = [...args]
    let fields = { ...this.state.fields }
    let isNotValid = { ...this.state.isNotValid }
    fields['telCode'] = argsArr && argsArr[1] ? argsArr[3] : null
    if (!fields['telCode']) {
      isNotValid['telCode'] = true
    }
    isNotValid['telCode'] = false

    let countryData = (argsArr && argsArr[2]) || {}
    let phoneNum = (argsArr && argsArr[1]) || ''
    this.setState({
      fields,
      isNotValid,
      selectedFlag: countryData,
      phoneNumber: phoneNum
    })
  }

  handleValidation = callback => {
    let fields = { ...this.state.fields }
    let errors = {}
    let formIsValid = true
    let isNotValid = {}

    if (!fields['name']) {
      formIsValid = false
      errors['name'] = 'Name is required'
      isNotValid['name'] = true
    } else isNotValid['name'] = false

    if (!fields['telCode']) {
      formIsValid = false
      errors['telCode'] = 'Mobile number is required'
      isNotValid['telCode'] = true
    } else isNotValid['telCode'] = false

    if (!fields['email']) {
      formIsValid = false
      errors['email'] = 'Email is required'
      isNotValid['email'] = true
    } else isNotValid['email'] = false

    if (!fields['occupation']) {
      formIsValid = false
      errors['occupation'] = 'Occupation is required'
      isNotValid['occupation'] = true
    } else isNotValid['occupation'] = false

    this.setState(
      { errors: errors, isNotValid: isNotValid, fields: fields },
      () => {
        if (callback) {
          callback(formIsValid)
        }
      }
    )
  }

  submitInfoForm = () => {
    this.handleValidation(formIsValid => {
      if (formIsValid) {
        this.sendInfoRequest()
      }
    })
  }

  sendInfoRequest () {
    let infoRequestPayload = {}

    let fieldNames = ['name', 'telCode', 'email', 'occupation']

    fieldNames.forEach(field => {
      switch (field) {
        case 'name':
          infoRequestPayload[field] = this.state.fields[field]
          break
        case 'email':
          infoRequestPayload[field] = this.state.fields[field]
          break
        case 'occupation':
          infoRequestPayload[field] = this.state.fields[field]
          break
      }
    })

    infoRequestPayload['propertyName'] = this.props.propertyName
    infoRequestPayload['mobile'] = this.state.phoneNumber

    this.props.sendInfoRequest(infoRequestPayload)
  }

  handleChange (field, e) {
    let fields = { ...this.state.fields }
    let isNotValid = { ...this.state.isNotValid }

    fields[field] = e.target.value
    if (!fields[field]) {
      isNotValid[field] = true
    }
    isNotValid[field] = false
    this.setState({ fields, isNotValid })
  }

  render () {
    const { handleClose, isOpen } = this.props

    const nameClasses = classNames({
      'input-box': true,
      formError: this.state.isNotValid['name']
    })

    const nameValid = classNames({
      error: true,
      show: this.state.isNotValid['name']
    })

    const telClass = classNames({
      formErrorTel: this.state.isNotValid['telCode']
    })

    const telValid = classNames({
      error: true,
      showTel: true,
      show: this.state.isNotValid['telCode']
    })

    const emailClasses = classNames({
      'input-box': true,
      formError: this.state.isNotValid['email']
    })

    const emailValid = classNames({
      error: true,
      show: this.state.isNotValid['email']
    })

    const occupationClasses = classNames({
      'input-box': true,
      formError: this.state.isNotValid['occupation']
    })

    const occupationValid = classNames({
      error: true,
      show: this.state.isNotValid['occupation']
    })

    return (
      <React.Fragment>
        <PropertyDetailModalWithHead
          title={'Request for information'}
          isOpen={isOpen}
          handleClose={handleClose}
          centered
        >
          <div className='white-popup' id='chatRequestPopup'>
            <div className='chatForm user-container login-container text-center infoRequestPopUp'>
              <br></br>
              <React.Fragment>
                <div className='user-faces' style={{ marginTop: '-20px' }}>
                  <img src={'/img/smiley-face.svg'} alt='smily face' />
                </div>
                <h2 className='user-title'>Request for information</h2>
                <div className={nameClasses}>
                  {/* <Icon icon='userIcon' size={'small'} /> */}

                  {/* <i className='fas fa-user'></i> */}
                  <input
                    className='form-control'
                    id='name'
                    placeholder='Name'
                    required
                    type='text'
                    onChange={this.handleChange.bind(this, 'name')}
                    value={this.state.fields['name']}
                  />
                  <span className={nameValid}>{this.state.errors['name']}</span>
                </div>
                <br></br>
                <div className={telClass}>
                  <IntlTelInput
                    separateDialCode='true'
                    containerClassName='intl-tel-input input-box'
                    inputClassName='form-control'
                    onPhoneNumberChange={this.onPhoneNumberChange}
                    defaultCountry='my'
                    placeholder='Mobile Number'
                    fieldId='telCode'
                    style={{
                      width: '100%'
                    }}
                  />
                  <span className={telValid}>
                    {this.state.errors['telCode']}
                  </span>
                </div>
                <br></br>

                <div className={emailClasses}>
                  {/* <Icon icon='envelop' size={'small'} /> */}
                  {/* <i className='fas fa-envelope'></i> */}
                  <input
                    className='form-control'
                    id='email'
                    placeholder='Email address'
                    required
                    type='text'
                    onChange={this.handleChange.bind(this, 'email')}
                    value={this.state.fields['email']}
                  />
                  <span className={emailValid}>
                    {this.state.errors['email']}
                  </span>
                </div>
                <br></br>

                <div className={occupationClasses}>
                  {/* <Icon icon='addressCard' size={'small'} /> */}
                  {/* <i className='fas fa-address-card'></i> */}
                  <input
                    className='form-control'
                    id='occupation'
                    placeholder='Occupation'
                    required
                    type='text'
                    onChange={this.handleChange.bind(this, 'occupation')}
                    value={this.state.fields['occupation']}
                  />
                  <span className={occupationValid}>
                    {this.state.errors['occupation']}
                  </span>
                </div>
              </React.Fragment>

              <div className='btn-wrapper'>
                <a
                  className='btn btn-secondary-filled btn-holder btn-curv'
                  id='btnSubmitChat'
                  onClick={this.submitInfoForm}
                >
                  Send
                </a>
              </div>
            </div>
          </div>
        </PropertyDetailModalWithHead>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, null)(InfoRequestPopup)
