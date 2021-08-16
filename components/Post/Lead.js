import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, InputGroup } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { withRouter } from 'next/router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../actions/post'

import Head from '../../components/Common/Head'
import BreadCrumb from '../Common/BreadCrumb'
import CONST from '../../globalutilities/consts'
import Loader from '../Common/Loader'
import useTranslation from 'next-translate/useTranslation'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { API_HOST, X_OS_VERSION } from '../../env'
import { getToken } from '../../globalutilities/helpers'

import Link from 'next/dist/client/link'
import styles from './Lead.module.scss'
import { validatePhonenumber } from '../../utils/utils'

const selectPropertyCount = [1, 2, 3]
const Lead = props => {
  const { ref } = props.propertyDetail
  const { router } = props
  const [fields, setFields] = useState(0)
  const [detailArr, setDetailArr] = useState([])
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [inputError, setInputError] = useState({})

  const { t } = useTranslation('common')

  useEffect(() => {
    if (fields && fields > 0) {
      let setPropertyDetailInfo = {
        propertyName: '',
        tenantPhone: '+60',
        countryCode: ''
      }
      const fieldsArr = new Array(parseInt(fields)).fill(setPropertyDetailInfo)
      let anotherArr = []

      if (detailArr.length > 0) {
        if (fieldsArr.length > detailArr.length) {
          const calculateDistance = fieldsArr.length - detailArr.length

          const createRequiredArr = new Array(parseInt(calculateDistance)).fill(
            setPropertyDetailInfo
          )

          anotherArr = [...detailArr, ...createRequiredArr]
        } else if (fieldsArr.length < detailArr.length) {
          let newDetailTempArr = detailArr
          newDetailTempArr.length = fieldsArr.length

          anotherArr = [...newDetailTempArr]
        } else {
          anotherArr = fieldsArr
        }
      } else {
        anotherArr = fieldsArr
      }
      setDetailArr(anotherArr)
    }
  }, [fields])

  const onPropertyCountChange = e => {
    setFields(e.target.value)
  }

  const handleShowLeadForm = () => {
    setShow(true)
  }

  const onPropDetailChange = (e, index) => {
    let newArr = [...detailArr]
    newArr[index] = {
      ...newArr[index],
      propertyName: e.target.value
    }
    removeErrorMsgByIndexWhenType(e, index)
    setDetailArr(newArr)
  }

  const onPhoneChange = (value, country, e, index) => {
    let newArr = [...detailArr]
    newArr[index] = {
      ...newArr[index],
      tenantPhone: value,
      countryCode: country.countryCode
    }
    removeErrorMsgByIndexWhenType(e, index)
    setDetailArr(newArr)
  }

  const removeErrorMsgByIndexWhenType = (e, index) => {
    if (e.target.value) {
      let newCloneError = Object.assign({}, inputError)
      if (!_.isEmpty(newCloneError) && newCloneError[index]) {
        delete newCloneError[index]
        setInputError(newCloneError)
      }
    }
  }

  const checkIfIndexExists = (index, hasDataInsideDetailArr) => {
    const checker = hasDataInsideDetailArr.filter(
      hasData => hasData.index === index
    )
    if (checker && checker.length > 0) {
      return true
    } else {
      return false
    }
  }
  const handleSubmit = e => {
    // validate the whole form first then submit the form
    // if any data available then validate otherwise SkipNext
    if (detailArr && detailArr.length > 0) {
      let hasDataInsideDetailArr = []

      detailArr.map((res, i) => {
        if (
          res.propertyName ||
          (res.tenantPhone && res.tenantPhone !== '+60')
        ) {
          hasDataInsideDetailArr.push({
            index: i,
            data: res
          })
        }
      })

      if (hasDataInsideDetailArr && hasDataInsideDetailArr.length > 0) {
        let error = {}

        detailArr.map((detailItem, i) => {
          // first rule check if propertyName availabe

          if (detailItem.propertyName && detailItem.tenantPhone) {
            const isValidPhoneNumber = validatePhonenumber(
              detailItem.tenantPhone
            )

            if (
              !isValidPhoneNumber &&
              checkIfIndexExists(i, hasDataInsideDetailArr)
            ) {
              error[i] = {
                type: 'phone',
                title: 'Please enter a valid phone number'
              }
            }
          } else {
            if (!detailItem.propertyName && !detailItem.tenantPhone) {
              return
            } else {
              if (
                !detailItem.propertyName &&
                checkIfIndexExists(i, hasDataInsideDetailArr)
              ) {
                error[i] = {
                  type: 'propertyName',
                  title: 'Property Name is required'
                }
              }
              if (!detailItem.tenantPhone) {
                error[i] = {
                  type: 'phone',
                  title: 'Phone number is required'
                }
              }

              if (detailItem.tenantPhone) {
                const isValidPhoneNumber = validatePhonenumber(
                  detailItem.tenantPhone
                )
                if (
                  !isValidPhoneNumber &&
                  checkIfIndexExists(i, hasDataInsideDetailArr)
                ) {
                  error[i] = {
                    type: 'phone',
                    title: 'Please enter a valid phone number'
                  }
                }
              }
            }
          }
        })
        setInputError(error)
        if (_.isEmpty(error)) {
          submitForm()
        }
      } else {
        setIsLoading(true)
        window.location.href = `/post/share/${ref}`

        return
      }
    } else {
      setIsLoading(true)
      window.location.href = `/post/share/${ref}`

      return
    }
  }

  const submitForm = () => {
    setIsLoading(true)
    let headers = {
      Authorization: getToken(),
      'Content-Type': 'application/json',
      'X-OS-Version': X_OS_VERSION
    }
    let allSubmissionFinishedLength = 0

    const validDetailArr = detailArr.filter(detailItem => {
      return (
        detailItem.propertyName ||
        (detailItem.tenantPhone && detailItem.tenantPhone !== '+60')
      )
    })
    if (validDetailArr && validDetailArr.length > 0) {
      validDetailArr.forEach(val => {
        axios
          .post(`${API_HOST}external/agreement`, val, { headers })
          .then(res => {
            val.submitted = true
            allSubmissionFinishedLength = allSubmissionFinishedLength + 1

            if (allSubmissionFinishedLength === validDetailArr.length) {
              setIsLoading(false)
              window.location.href = `/post/share/${ref}`
            }
          })
      })
    }
  }

  return (
    <>
      <section className={`${styles['post_page_lead']} post_page_lead `}>
        <Head
          title={'Post a Property to Find Tenants | SPEEDHOME'}
          description={
            'Are you looking for a tenant for your property? Let SPEEDHOME speed up the process of finding the best tenant and make you a landlord. Fill out out the form, takes up only minutes.'
          }
        />
        <BreadCrumb breadCrumb={CONST.postPageLead} />
        <Container>
          <Row
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Col md={8}>
              <div className={`${styles['text-center']} container  `}>
                <h5 className='font-text'>We are almost done!</h5>
                <p>
                  <small className='note-s'>
                    Do you want to use SPEEDMANAGE to collect rent for you? This
                    service is completely free!
                  </small>
                </p>
                <p className='mt-4'>
                  <small className='note-s'>
                    How many properties of your properties are already tenanted?
                  </small>
                </p>
                <div className='select_tenant'>
                  <select
                    name='propertyCount'
                    id='propertyCount'
                    defaultValue={fields}
                    onChange={e => onPropertyCountChange(e)}
                    className='form-control'
                  >
                    <option value='' selected={!fields ? 'selected' : false}>
                      Please Select One
                    </option>
                    {selectPropertyCount.map(val => (
                      <option
                        key={val}
                        value={val}
                        selected={val === fields ? 'selected' : false}
                      >
                        {val}
                      </option>
                    ))}
                  </select>
                  {show && fields > 0 && (
                    <>
                      <h6 className='mt-5'>
                        Add your property information for SPEEDMANAGE
                      </h6>
                      <Row
                        className={`mt-3 ${styles['select_property_details']}`}
                      >
                        {detailArr &&
                          detailArr.length &&
                          detailArr.map((val, i) => {
                            return (
                              <Col className='mt-5' md={4} sm={12} xs={12}>
                                <h6>Property {i + 1}</h6>
                                <div>
                                  <label>Property Name</label>
                                  <input
                                    id={`copyUrl${i}`}
                                    type='text'
                                    value={val.propertyName}
                                    placeholder='Enter Property Name'
                                    className={`${styles['form-control']}`}
                                    onChange={e => onPropDetailChange(e, i)}
                                    autoComplete='off'
                                    required
                                    errorMessage={{
                                      required: `${t(
                                        'text_property_name_error_req'
                                      )}`,
                                      minLength: `${t(
                                        'text_property_name_error_L'
                                      )}`,
                                      maxLength: `${t(
                                        'text_property_name_error_L'
                                      )}`
                                    }}
                                  />
                                  {inputError &&
                                    inputError[i] &&
                                    inputError[i].type === 'propertyName' && (
                                      <div
                                        className={styles['login__error--msg']}
                                      >
                                        {inputError[i].title}
                                      </div>
                                    )}
                                </div>
                                <div className='mt-4'>
                                  <label>Tenant Mobile Number</label>
                                  <InputGroup id='inpt__group--mb'>
                                    <PhoneInput
                                      name='phone'
                                      defaultCountry={'my'}
                                      placeholder='Enter your mobile number'
                                      value={val.tenantPhone}
                                      onChange={(value, country, e) =>
                                        onPhoneChange(value, country, e, i)
                                      }
                                      enableSearchField
                                      isValid={true}
                                      inputProps={{ autoComplete: 'none' }}
                                    />
                                  </InputGroup>
                                </div>
                                {inputError &&
                                  inputError[i] &&
                                  inputError[i].type === 'phone' && (
                                    <div
                                      className={styles['login__error--msg']}
                                    >
                                      {inputError[i].title}
                                    </div>
                                  )}
                              </Col>
                            )
                          })}
                      </Row>
                    </>
                  )}
                </div>
                {show && fields > 0 && (
                  <div className={`${styles['speedmanage-link_text']} mt-5`}>
                    <p>
                      <small className='note-s'>
                        Login to{' '}
                        <a href={'https://speedmanage.com'} target='_blank'>
                          www.speedmanage.com
                        </a>{' '}
                        with your mobile number to start collecting rent.
                      </small>
                    </p>
                  </div>
                )}
                <div className='mt-5'>
                  <div
                    className={`${styles['meta-wrap']} btn-holder text-right`}
                    style={{ paddingRight: '10px' }}
                  >
                    <a
                      href={`/post/share/${ref}`}
                      id='btnClickCreateListingSkipShare'
                      className={`${styles['btn']} ${styles['link-gray']} btn`}
                    >
                      {t('btn_skip')}
                    </a>
                    {!show ? (
                      <a
                        onClick={() => {
                          handleShowLeadForm()
                        }}
                        id='btnClickCreateListingShare'
                        className={`${styles['nextButton']} btn btn-curv btn-share'`}
                        style={{
                          color: '#fff'
                        }}
                      >
                        Continue
                      </a>
                    ) : (
                      <button
                        type='submit'
                        id='btnClickCreateListingShare'
                        className={`${styles['nextButton']} btn btn-curv btn-share'`}
                        style={{
                          color: '#fff'
                        }}
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {isLoading ? (
        <div className='loading-overlay--post'>
          <Loader />
        </div>
      ) : null}
    </>
  )
}

const mapStateToProps = ({ post }) => {
  return { post }
}

const mapDispatchToProps = dispatch => {
  return {
    postActions: bindActionCreators(postActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Lead))
