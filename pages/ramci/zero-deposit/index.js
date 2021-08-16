import React, { Component, Fragment } from 'react'
import Container from 'react-bootstrap/Container'

import Swal from 'sweetalert2'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import * as ramciActions from '../../../actions/ramciActions'
import * as authActions from '../../../actions/auctionActions'

import Head from '../../../components/Common/Head'
import Cookies from 'js-cookie'
import ZeroDepositComponent from '../../../components/Zero-Deposit'
import Loader from '../../../components/Common/Loader'

class ZeroDeposit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: {
        acronym: 'my',
        name: 'Malaysia',
        code: 60
      },
      user: null,
      nricName: '',
      nricEmail: '',
      nricPhone: '',
      nricNumber: '',
      nricNumberError: '',
      icFront: {
        url: '',
        base64: ''
      },
      icBack: {
        url: '',
        base64: ''
      },
      errors: {},
      checkboxStatus: true,
      checkboxError: false,
      icImageError: false,
      isloading: false,
      pageLoading: true,
      updateConsent: false,
      ramciFailed: false
    }
  }
  componentDidMount () {
    const token = Cookies.get('authToken')
    if (token) {
      this.setState({
        pageLoading: false
      })
    }
  }
  static getDerivedStateFromProps (props, state) {
    if (props.user !== state.user) {
      if (props.user) {
        return {
          user: props.user,
          nricPhone: props.user.phoneNumber ? props.user.phoneNumber : '',
          nricEmail: props.user.email ? props.user.email : '',
          nricName: props.user.name ? props.user.name : '',
          pageLoading: false
        }
      }
    }
    return null
  }
  swalErrorMessage = () => {
    // return null
    return Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Something Went wrong!',
      showConfirmButton: true,
      timer: 2000,
      allowOutsideClick: true
    }).then(() => {
      this.props.ramciActions.removeRamciError()
      this.setState({
        ramciFailed: false
      })
    })
  }

  submitRamciForm = () => {
    if (this.state.checkboxStatus) {
      if (this.state.icFront.base64 && this.state.icBack.base64) {
        this.setState({
          icImageError: false
        })
        const data = {
          email: this.state.nricEmail,
          // force: true,
          name: this.state.nricName,
          nric: this.state.nricNumber,
          phone: this.state.nricPhone.match('^60[0-9].*$')
            ? this.state.nricPhone
            : this.state.activeItem.code + this.state.nricPhone,
          icBack: this.state.icBack.base64,
          icFront: this.state.icFront.base64
        }
        if (this.state.nricNumber.length === 14) {
          this.setState({
            isloading: true
          })

          this.props.ramciActions.submitRamciNewWay(data).then(res => {
            if (res && res.type === 'SUCCESS') {
              const updateConsentData = {
                icBack: data.icBack,
                icFront: data.icFront,
                nric: data.nric
              }
              this.props.ramciActions
                .updateConsentNewWay(updateConsentData)
                .then(consent => {
                  if (consent && consent.type === 'SUCCESS') {
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Experian submitted',
                      showConfirmButton: false,
                      timer: 2000,
                      allowOutsideClick: false
                    }).then(() => {
                      this.props.router.push('/')
                    })
                  } else {
                    this.swalErrorMessage()
                  }
                })
            } else {
              this.swalErrorMessage()
            }
          })
        } else {
          this.setState({
            nricNumberError: 'NRIC number is required'
          })
        }
      } else {
        this.setState({
          icImageError: true
        })
      }
    } else {
      this.setState({
        checkboxError: true
      })
    }
  }
  userInputChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }
  getBase64 (file, cb) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(reader.result)
    }
    reader.onerror = function (error) {}
  }
  icImageChange = e => {
    const name = e.target.name
    const file = e.target.files[0]

    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      this.getBase64(file, result => {
        this.setState({
          ...this.state,
          [name]: {
            url: URL.createObjectURL(file),
            base64: result.split(',')[1]
          }
        })
      })
    }
  }

  removeImagePreview = inputName => {
    this.setState({
      [inputName]: {
        url: '',
        base64: ''
      }
    })
  }

  handleRadioChange = e => {
    const value = e.target.value
    this.setState({
      checkboxStatus: !this.state.checkboxStatus,
      checkboxError: false
    })
  }
  setNricNumberError = error => {
    this.setState({
      nricNumberError: error
    })
  }
  render () {
    return (
      <Fragment>
        <Head title='Ramci Check' />
        <section id='ramcipage'>
          <Container>
            {this.state.pageLoading ? (
              <Loader />
            ) : (
              <ZeroDepositComponent
                icFront={this.state.icFront}
                icBack={this.state.icBack}
                icImageError={this.state.icImageError}
                nricName={this.state.nricName}
                nricEmail={this.state.nricEmail}
                activeItem={this.state.activeItem}
                nricPhone={this.state.nricPhone}
                nricNumber={this.state.nricNumber}
                nricNumberError={this.state.nricNumberError}
                checkboxStatus={this.state.checkboxStatus}
                checkboxError={this.state.checkboxError}
                isloading={this.state.isloading}
                setNricNumberError={this.setNricNumberError}
                submitRamciForm={this.submitRamciForm}
                icImageChange={this.icImageChange}
                userInputChange={this.userInputChange}
                handleRadioChange={this.handleRadioChange}
                removeImagePreview={this.removeImagePreview}
              />
            )}
          </Container>
        </section>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ auth, ramci }) => {
  return {
    user: auth.user,
    ramci: ramci
  }
}
const mapDispatchToProps = dispatch => {
  return {
    ramciActions: bindActionCreators(ramciActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ZeroDeposit)
)
