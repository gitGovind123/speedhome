import React from 'react'
import { Container, Row, Col, Modal } from 'react-bootstrap'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import Cleave from 'cleave.js/react'
import { ClipLoader } from 'react-spinners'
import validator from 'validator'
import Router, { withRouter } from 'next/router'
import { CloseRounded } from '@material-ui/icons'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createRamci, updateDealApiCall } from '../../api/deal'

import { validatePhonenumber } from '../../utils/utils'

import * as dealAction from '../../actions/deal'
import Head from '../Common/Head'
import BreadCrumbDyn from '../Common/BreadCrumbDyn'
import * as ramciActions from '../../actions/ramciActions'
import { getToken, getUserId } from '../../globalutilities/helpers'
import styles from '../../components/deals/deals.module.scss'

class CreditCheckComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      updateConsent: '',
      user: null,
      isMalyasian: true,
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
      isloading: false,
      checkboxError: false,
      isSubmited: false,
      checkboxStatus: false,
      isRamciVerfied: false
    }
  }
  componentDidMount () {
    if (this.props.router.asPath.includes('/dashboard/profile')) {
    } else {
      this.initialValidate()
    }
  }
  componentDidUpdate () {
    if (this.state.updateConsent && !this.state.isRamciVerfied) {
      this.updateRamciStatus(true)

      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Experian submitted',
        showConfirmButton: false,
        timer: 2000,
        allowOutsideClick: false
      }).then(() => {
        if (this.props.router.asPath.includes('/dashboard/profile')) {
          this.props.updatePreDocState('DOC', this.state.isMalyasian)
        } else {
          Router.push(`/deal/${this.hash}`)
        }
      })

      this.setState({ isRamciVerfied: true })
    }
  }

  initialValidate = () => {
    this.hash = Cookies.get('dealHashKey')
    if (!this.props.dealData || !Object.values(this.props.dealData).length) {
      this.props.dealAction.fetchDealData(
        {
          id: getUserId(),
          authToken: getToken()
        },
        this.hash
      )
    }
  }

  handleMalaysian = isLocal => {
    this.setState({ isMalyasian: isLocal })
  }

  handleClose = () => {
    this.setState({ handleClose })
  }

  userInputChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }
  phoneNumberChange = number => {
    this.setState({
      nricPhone: number
    })
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
            base64: result
          }
        })
      })
    } else {
    }
  }

  handleRadioChange = e => {
    const value = e.target.value
    this.setState({
      checkboxStatus: !this.state.checkboxStatus,
      checkboxError: false
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

  static getDerivedStateFromProps (props, state) {
    if (props.user !== state.user) {
      if (props.user) {
        return {
          user: props.user,
          nricPhone: props.user.phoneNumber ? props.user.phoneNumber : '',
          nricEmail: props.user.email ? props.user.email : '',
          nricName: props.user.name ? props.user.name : ''
        }
      }
    }

    if (props.ramci.updateConsent !== state.updateConsent) {
      if (props.ramci.updateConsent) {
        return {
          isloading: false,
          updateConsent: props.ramci.updateConsent
        }
      }
    }
    return null
  }

  submitForeignUser = async isLocal => {
    if (this.props.router.asPath.includes('/dashboard/profile')) {
      this.props.updatePreDocState('DOC', this.state.isMalyasian)
    } else {
      this.updateRamciStatus(isLocal)
    }
  }

  updateRamciStatus = async isLocal => {
    let data = {}
    if (this.props.dealData) {
      let dealData = this.props.dealData

      data = {
        booking: dealData.booking,
        hash: this.hash,
        id: dealData.id,
        local: isLocal,
        propertyDto: dealData.propertyDto,
        status: dealData.status == 'RAMCI' ? 'DOC' : dealData.status,
        userDto: dealData.userDto
      }

      this.setState({
        isloading: true
      })
      if (!this.props.router.asPath.includes('/dashboard/profile')) {
        updateDealApiCall(data, this.hash)
          .then(response => {
            this.setState({
              isloading: false,
              isSubmited: true
            })
            if (response)
              setTimeout(() => {
                Router.push(`/deal/${this.hash}`)
              }, 1000)
          })
          .catch(error => {
            this.setState({
              isloading: false
            })
          })
      }
    }
  }

  submitRamciForm = () => {
    if (this.state.checkboxStatus) {
      if (this.state.icFront.base64 && this.state.icBack.base64) {
        const data = {
          email: this.state.nricEmail,
          // force: true,
          name: this.state.nricName,
          nric: this.state.nricNumber,
          phone: this.state.nricPhone,
          icBack: this.state.icBack.base64,
          icFront: this.state.icFront.base64
        }

        if (this.state.nricNumber && this.state.nricNumber.length === 14) {
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
                    this.setState({
                      isloading: false,
                      updateConsent: true
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
            nricNumberError: 'IC number should be 14 number'
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
    })
  }
  deleteImg = name => {
    this.setState({
      ...this.state,
      [name]: {
        url: '',
        base64: ''
      }
    })
  }

  handleErrorSubmit = (e, formData, errorInputs) => {
    console.error(errorInputs)
  }

  render () {
    return (
      <>
        <BreadCrumbDyn />

        <div className={`${styles['dealPage']} container`}>
          {this.props.router.asPath.includes('/dashboard/profile') ? null : (
            <Head />
          )}

          <Row className={styles['title']}>Credit check</Row>

          <Row className={styles['imgDiv']}>
            <img
              loading='lazy'
              className={styles['imgAlign']}
              src={'/img/ic_credit_check.png'}
            ></img>
          </Row>

          <Container className={styles['dealBody']}>
            <div
              className={`
                   ${styles['chooseCity']}
                     ${this.state.isMalyasian ? styles['highLightButton'] : ''}
                `}
              onClick={() => this.handleMalaysian(true)}
            >
              I am Malaysian citizen
            </div>

            <div
              className={`
              ${styles['chooseCity']}
                        ${
                          this.state.isMalyasian == false
                            ? styles['highLightButton']
                            : ''
                        }
                    `}
              onClick={() => this.handleMalaysian(false)}
            >
              I am a foreigner
            </div>
          </Container>

          <section id={styles['ramcipage']}>
            <Container>
              <ValidationForm
                onSubmit={e => {
                  e.preventDefault()
                  this.state.isMalyasian
                    ? this.submitRamciForm()
                    : this.submitForeignUser(false)
                }}
                onErrorSubmit={this.handleErrorSubmit}
              >
                
                {this.state.isMalyasian && (
                  <span>
                    <div
                      className={`${styles['uploader-doc-row']} ${styles['photo-thumb-listing']}`}
                    >
                      <div className=''>
                        <strong className={styles['content-title']}>
                          IC Front
                        </strong>
                        <div className={styles['box']}>
                          {this.state.icFront.url ? (
                            <div
                              className={styles['js--image-preview']}
                              id='imgFront'
                            >
                              <div className={styles['previewImg']}>
                                <img
                                  src={this.state.icFront.url}
                                  className={styles['previewImg']}
                                />
                                <span
                                  className={styles['photoBoxWithImg_delete']}
                                  onClick={() => this.deleteImg('icFront')}
                                >
                                  <CloseRounded className={styles['icon']} />
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className={styles['upload-options']}>
                              <label>
                                <TextInput
                                  type='file'
                                  id='frontImage' 
                                  required 
                                  name='icFront'
                                  className={styles['image-upload']}
                                  accept='image/*'
                                  onChange={this.icImageChange.bind(this)}
                                  errorMessage='IC Front Image is required.'
                                />
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className={styles['ic-back__mobile']}
                        style={{ marginLeft: '5%' }}
                      >
                        <strong className={styles['content-title']}>
                          IC Back
                        </strong>
                        <div className={styles['box']}>
                          {this.state.icBack.url ? (
                            <div
                              className={styles['js--image-preview']}
                              id='imgBack'
                            >
                              <div className={styles['previewImg']}>
                                <img
                                  src={this.state.icBack.url}
                                  className={styles['previewImg']}
                                />
                                <span
                                  className={styles['photoBoxWithImg_delete']}
                                  onClick={() => this.deleteImg('icBack')}
                                >
                                  <CloseRounded className={styles['icon']} />
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className={styles['upload-options']}>
                              <label>
                                <TextInput
                                  type='file'
                                  id='backImage' 
                                  required 
                                  name='icBack'
                                  className={styles['image-upload']}
                                  accept='image/*'
                                  onChange={this.icImageChange.bind(this)}
                                  errorMessage='IC Back Image is required.'
                                />
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                      {this.state.icImageError ? (
                        <span className={styles['icError']}>
                          Both IC pictures are required
                        </span>
                      ) : null}
                    </div>

                    <div className={`${styles['ramci-form']} ramci-form-wrap`}>
                      <Row className={styles['gutter-big']}>
                        <Col xs={12} md={6}>
                          <div
                            className={`${styles['input-box']}  floating-placeholder no-icon`}
                          >
                            <TextInput
                              name='nricName'
                              id="nricName"
                              required
                              type='text'
                              // className={styles['form-control']}
                              style={{
                                border: 'none'
                              }}
                              placeholder='Name as per NRIC'
                              value={this.state.nricName}
                              onChange={this.userInputChange.bind(this)}
                              errorMessage='Name is required.'
                            />
                          </div>
                
                        </Col>
                        <Col xs={12} md={6}>
                          <div
                            className={`${styles['input-box']}  floating-placeholder no-icon`}
                          >
                            <TextInput
                              name='nricEmail'
                              type='email'
                              required
                              // className={styles['form-control']}
                              style={{
                                border: 'none'
                              }}
                              placeholder='Email'
                              value={this.state.nricEmail}
                              onChange={this.userInputChange.bind(this)}
                              validator={validator.isEmail}
                              errorMessage={{
                                validator: 'Please enter a valid email.'
                              }}
                            />
                          </div>
                        </Col>
                        <Col xs={12} md={6}>
                          <div className={styles['phone_validation']}>
                            <TextInput name="Phone validation" id="phone_validation"
                            required 
                            validator={validatePhonenumber}
                            errorMessage={{
                              validator: 'Please enter a valid Phone Number.'
                            }} 
                            value={this.state.nricPhone}
                            />
                          </div>
            
                          <PhoneInput
                            inputProps={{
                              name: 'nricPhone',
                              required: true
                            }}
                            country={'my'}
                            value={this.state.nricPhone}
                            placeholder='Phone number'
                            containerClass={`${styles['input-box']} floating-placeholder no-icon`}
                            containerStyle={{
                              overflow: 'visible'
                            }}
                            inputStyle={{
                              height: '100%',
                              width: '100%',
                              border: 'none'
                            }}
                            onChange={this.phoneNumberChange.bind(this)}
                          />
                        </Col>
                        <Col xs={12} md={6}>
                          <div
                            className={`${styles['input-box']}  floating-placeholder no-icon`}
                          >
                            <div className={styles['phone_validation']}>
                              <TextInput name="Nic validation" id="nic_validation" required minLength="14" 
                              errorMessage={
                                  {
                                    minLength:"IC number should be 12 character long."
                                  }
                              } 
                               
                              value={this.state.nricNumber}
                              />
                            </div>
                            <Cleave
                              options={{
                                delimiter: '-',
                                blocks: [6, 2, 4]
                              }}
                              className={styles['form-control']}
                              name='nricNumber'
                              style={{
                                borderColor:
                                  this.state.nricNumber.length > 0 &&
                                  this.state.nricNumber.length !== 14
                                    ? 'red'
                                    : '#727272',
                                    paddingLeft: '12px'
                              }}
                              required
                              maxLength='14'
                              placeholder='NRIC Number'
                              value={this.state.nricNumber}
                              onChange={this.userInputChange.bind(this)}
                            />
                            {
                              <div
                                className='invalid-feedback'
                                style={{ display: 'block' }}
                              >
                                {this.state.nricNumberError}
                              </div>
                            }
                          </div>
                        </Col>
                      </Row>

                      <div className={`${styles['check-wrap']} `}>
                        <label
                          className={`${styles['checkbox']}  form-group ${styles['checkbox-inline-sm']} check_box_label`}
                        >
                          <TextInput
                            type='checkbox' 
                            required 
                            errorMessage="Please check this box."
                            name='creditInfo'
                            onChange={e => this.handleRadioChange(e)}
                            checked={this.state.checkboxStatus}
                          />
                          <span
                            className={
                              this.state.checkboxStatus
                                ? `${styles['checkbox__icon']} ${styles['checkbox__checked']}`
                                : styles['checkbox__icon']
                            }
                          />{' '}
                          <span
                            className={
                              this.state.checkboxError
                                ? styles['checkboxError']
                                : ''
                            }
                          >
                            I acknowledge this will allow SPEEDHOME to collect
                            my credit information for the home rental process.
                          </span>
                        </label>
                      </div>
                    </div>
                  </span>
                )}

                {this.state.isMalyasian != null && (
                  <span>
                    <div
                      className={`${styles['ramciFormSubmit']} btn-holder text-center`}
                    >
                      <button
                        id='submitRamciQuestion'
                        type='submit'
                        // disabled={this.state.isloading}
                        // disabled='false'
                        className='btn btn-curv btn-primary btn-primary-filled customButton'
                      >
                        Submit
                        <ClipLoader
                          sizeUnit={'px'}
                          size={20}
                          color={'#123abc'}
                          loading={this.state.isloading}
                        />
                      </button>
                    </div>

                    <Modal
                      show={!this.state.updateConsent && this.state.isSubmited}
                      className='modalCreditCheck'
                    >
                      <Modal.Body>You updated Experian successfully</Modal.Body>
                    </Modal>
                  </span>
                )}
              </ValidationForm>
            </Container>
          </section>
        </div>
      </>
    )
  }
}

const mapStateToProps = ({ deal, ramci, auth }) => {
  return {
    dealData: deal.dealByHash,
    hash: deal.hash,
    ramci: ramci,
    user: auth.user
  }
}

function actionsStateToProps (dispatch) {
  return {
    dealAction: bindActionCreators(dealAction, dispatch),
    ramciActions: bindActionCreators(ramciActions, dispatch)
  }
}

export async function getServerSideProps () {
  return {}
}

export default connect(
  mapStateToProps,
  actionsStateToProps
)(withRouter(CreditCheckComponent))
