import _ from 'lodash'
import React, { useState } from 'react'
import Link from 'next/link'
import { Container, Row, Col, Card, Button, FormGroup } from 'react-bootstrap'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import useTranslation from 'next-translate/useTranslation'
import HomeIcon from '@material-ui/icons/Home'
import OutsideClickHandler from 'react-outside-click-handler'
import { ClipLoader } from 'react-spinners'

import SelectBoxComponent from '../../components/Common/SelectBox'
import {
  autoCompletePriceCheckerPropertyList,
  propertyPriceChecker
} from '../../actions/autocomplete'

import Head from '../../components/Common/Head'

import { BED_ROOM_OPTIONS, FURNISHING_OPTIONS } from '../../components/Post/DB'
import { getDataFromValue } from '../../components/Common/Helper'
import styles from './PriceWidget.module.scss'

const PriceWidgetComponent = props => {
  const [propertyName, setPropertyName] = useState('')
  const [propertyNameError, setpropertyNameError] = useState(false)
  const [selectedFromAutoComplete, setSelectedFromAutoComplete] = useState(
    false
  )
  const [autoSelectedProperty, setAutoSelectedProperty] = useState(null)
  const [autocompleteListOpen, setAutocompleteListOpen] = useState(false)
  const [autoCompleteList, setAutoCompleteList] = useState(null)
  const [shoulDisplayBedrooms, setshoulDisplayBedrooms] = useState(false)
  const [bedrooms, setBedrooms] = useState({
    type: '',
    value: ''
  })
  const [bedRoomsTotalValue, setBedRoomsTotalValue] = useState([])

  const [shoulDisplayFurnishing, setshoulDisplayFurnishing] = useState(false)
  const [furnishing, setFurnishing] = useState({
    type: '',
    value: ''
  })
  const [furnishingTotalValue, setFurnishingTotalValue] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)
  const [minRange, setMinRange] = useState(0)
  const [maxRange, setMaxRange] = useState(0)

  const { t } = useTranslation('common')

  const propertyNameChange = e => {
    setPropertyName(e.target.value)
    setpropertyNameError(e.target.value.length > 0 ? false : true)
    intiState()
    if (e.target.value.length > 3) {
      deBouncedPropertyName(e.target.value)
    }
  }

  const deBouncedPropertyName = _.debounce(function (propertyName) {
    const data = {
      limit: 10,
      propertyName: propertyName
    }
    autoCompletePriceCheckerPropertyList(data).then(res => {
      if (res && res.success) {
        if (res.data) {
          setAutoCompleteList(res.data)
          setAutocompleteListOpen(true)
        } else {
          intiState()
        }
      } else {
        intiState()
      }
    })
    // autoCompletePriceCheckerPropertyList
  }, 250)
  const intiState = () => {
    setAutoSelectedProperty(null)
    setAutocompleteListOpen(false)
    setSelectedFromAutoComplete(false)

    setshoulDisplayBedrooms(false)
    setBedrooms({
      type: '',
      value: ''
    })
    setBedRoomsTotalValue([])
    setshoulDisplayFurnishing(false)
    setFurnishing({
      type: '',
      value: ''
    })
    setFurnishingTotalValue([])
    setMinRange(0)
    setMaxRange(0)
    setAutoCompleteList(null)
  }
  const autCompletePropertySelect = property => {
    setPropertyName(property.propertyName)
    setAutoSelectedProperty(property)
    setSelectedFromAutoComplete(true)
    setshoulDisplayBedrooms(true)
    const tempBedRoomArray = _.keys(property.options)
    let bedRoomArray = []
    tempBedRoomArray.map(bed => {
      bedRoomArray.push(getDataFromValue(BED_ROOM_OPTIONS, parseInt(bed)))
    })
    if (bedRoomArray && bedRoomArray.length > 0) {
      setBedRoomsTotalValue(bedRoomArray)
    }

    // //furninhing
    // let furnishingArray = []
    // property.furnishTypeOptions.map(fur => {
    //   furnishingArray.push(getDataFromValue(FURNISHING_OPTIONS, fur))
    // })
    // setFurnishing(furnishingArray[0])
    // setFurnishingTotalValue(furnishingArray)

    // setBedrroms()
    setAutocompleteListOpen(false)
  }
  const bedRoomChange = option => {
    const tempFurnishingArray = autoSelectedProperty.options[option.value]
    let furnishingArray = []
    tempFurnishingArray.map(furnishing => {
      furnishingArray.push(getDataFromValue(FURNISHING_OPTIONS, furnishing))
    })
    if (furnishingArray && furnishingArray.length > 0) {
      setFurnishingTotalValue(furnishingArray)
      setshoulDisplayFurnishing(true)
    }
    setBedrooms(option)
  }
  const furnishingChange = option => {
    setFurnishing(option)
  }
  const submitPriceWidget = () => {
    if (selectedFromAutoComplete && propertyName.length > 0) {
      setIsSubmit(true)
      setpropertyNameError(false)
      const data = {
        bedroom: bedrooms.value,
        furnishType: furnishing.value,
        propertyName: propertyName
      }
      propertyPriceChecker(data).then(res => {
        if (res && res.success) {
          if (res.data) {
            setMinRange(res.data.minPrice)
            setMaxRange(res.data.maxPrice)
          }
        }
        setIsSubmit(false)
      })
    } else {
      setpropertyNameError(true)
    }
  }
  let lowerMid = 0
  let higherMid = 0
  if (minRange && maxRange) {
    lowerMid = Math.ceil(minRange + (maxRange - minRange) * 0.33)
    higherMid = Math.ceil(minRange + (maxRange - minRange) * 0.66)
  }

  return (
    <>
      <Head
        title='Rental Checker'
        keywords='rental price, check my room price, check property property price, rental checker, list property, property manager, kuala lumpur, malaysia, rent price, checker, property price checker, rental worth, rental valuation, property valuation'
        description='Our rental valuation checker provides a recommended monthly rental valuation for your chosen property. Through aggregating 130,000+ property listings in Klang valley, you can check the recommended value for your chosen property fast and for free.'
      />
      <section className={styles['priceWidget']}>
        <Container>
          <Row>
            <Col md={6}>
              <div className={styles['priceWidget__info--container']}>
                <h4>SPEEDHOME Rental Checker</h4>
                <h6>
                  Would you like an instant monthly rental <br></br> valuation
                  on your chosen property?
                </h6>
                <p className=''>
                  Our rental valuation checker provides a recommended monthly
                  rental valuation for your chosen property. Through aggregating
                  130,000+ property listings in Klang valley, you can check the
                  recommended value for your chosen property fast and for free.
                </p>
                <p>
                  Whether you’re a landlord looking to identify the rental value
                  of your property or you’re a tenant checking if your monthly
                  rent that you’re paying is fair. Our rental valuation checker
                  provides an unbiased valuation of your chosen property’s
                  monthly rental, in today’s market.
                </p>
                <p>
                  Just fill in the name of the property with the number of
                  bedrooms and furnishings. Our rental checker will calculate
                  within seconds. Please do note that factors such as refurbish,
                  high floor or designer furniture would potentially impact your
                  property’s monthly rental value.
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className={styles['priceWidget__form--container']}>
                <Card>
                  <Card.Body>
                    <ValidationForm
                      onSubmit={e => {
                        e.preventDefault()
                        submitPriceWidget()
                      }}
                    >
                      <Row>
                        <Col md={12}>
                          <FormGroup style={{ margin: '.5rem 0' }}>
                            <label htmlFor='propertyName'>Property Name</label>
                            <TextInput
                              name='propertyName'
                              id='propertyName'
                              required
                              minLength='4'
                              maxLength='100'
                              value={propertyName}
                              onChange={propertyNameChange}
                              errorMessage={{
                                required: `${t(
                                  'text_property_name_error_req'
                                )}`,
                                minLength: `${t('text_property_name_error_L')}`,
                                maxLength: `${t('text_property_name_error_L')}`
                              }}
                            />
                            {autocompleteListOpen ? (
                              <OutsideClickHandler
                                onOutsideClick={() => {
                                  setAutocompleteListOpen(false)
                                }}
                              >
                                <ul
                                  className='ui-autocomplete ui-front ui-menu ui-widget ui-widget-content'
                                  id='ui-id-1'
                                  tabIndex='0'
                                  style={{
                                    top: '83px',
                                    left: '0px',
                                    width: '100%',
                                    zIndex: '99'
                                  }}
                                >
                                  {autoCompleteList &&
                                    autoCompleteList.map((property, index) => {
                                      return (
                                        <li
                                          key={index}
                                          onClick={() =>
                                            autCompletePropertySelect(property)
                                          }
                                          className='ui-menu-item'
                                          id='ui-id-66'
                                          tabIndex='-1'
                                        >
                                          <HomeIcon
                                            style={{
                                              height: '.8em',
                                              width: '.8em',
                                              marginRight: '4px',
                                              marginBottom: '5px'
                                            }}
                                          />
                                          {property.propertyName}
                                          <div className='autocomplete-category'>
                                            PROPERTY
                                          </div>
                                        </li>
                                      )
                                    })}
                                </ul>
                              </OutsideClickHandler>
                            ) : null}
                            {propertyNameError ? (
                              <div
                                className='invalid-feedback'
                                style={{ display: 'block' }}
                              >
                                Property name is required
                              </div>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        {shoulDisplayBedrooms ? (
                          <Col md={12}>
                            <FormGroup style={{ margin: '.5rem 0' }}>
                              <label htmlFor='propertyName'>Bedrooms</label>
                              <SelectBoxComponent
                                data={bedRoomsTotalValue}
                                stateVal={bedrooms}
                                changeVal={bedRoomChange}
                              />
                            </FormGroup>
                          </Col>
                        ) : null}
                        {shoulDisplayBedrooms && shoulDisplayFurnishing ? (
                          <Col md={12}>
                            <FormGroup style={{ margin: '.5rem 0' }}>
                              <label htmlFor='propertyName'>Furnishing</label>
                              <SelectBoxComponent
                                data={furnishingTotalValue}
                                stateVal={furnishing}
                                changeVal={furnishingChange}
                              />
                            </FormGroup>
                          </Col>
                        ) : null}
                      </Row>
                      <Row>
                        <Col md={12}>
                          <Button
                            variant='primary'
                            className={styles['submit__btn']}
                            type='submit'
                            disabled={furnishing.value.length === 0}
                          >
                            Check your rental range
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <hr />
                        </Col>
                      </Row>
                    </ValidationForm>
                    {isSubmit ? (
                      <div
                        style={{
                          height: '50px',
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <ClipLoader color='#4885ed' />
                      </div>
                    ) : (
                      <>
                        {minRange && maxRange ? (
                          <div className={styles['priceWidget__form--result']}>
                            <span className={styles['title']}>
                              Rental range
                            </span>
                            <p className={styles['range']}>
                              <b>
                                RM{minRange} - RM{maxRange}
                              </b>
                            </p>
                            <div className={styles['chartOfPrice']}>
                              <div className={styles['line']}></div>
                              <div
                                className={`${styles['pile__1']} ${styles['red']}`}
                              ></div>
                              <div
                                className={`${styles['pile__2']} ${styles['red']}`}
                              ></div>
                              <div
                                className={`${styles['pile__3']} ${styles['yellow']}`}
                              >
                                <div className={styles['straight__line']}></div>
                                <div className={styles['price']}>
                                  RM {maxRange}
                                </div>
                              </div>
                              <div
                                className={`${styles['pile__5']} ${styles['yellow']}`}
                              ></div>
                              <div
                                className={`${styles['pile__6']} ${styles['green']}`}
                              >
                                <div className={styles['straight__line']}></div>
                                <div className={styles['price']}>
                                  RM {higherMid}
                                </div>
                              </div>
                              <div
                                className={`${styles['pile__7']} ${styles['green']}`}
                              ></div>
                              <div
                                className={`${styles['pile__6']} ${styles['green']}`}
                              ></div>
                              <div
                                className={`${styles['pile__5']} ${styles['yellow']}`}
                              >
                                <div className={styles['straight__line']}></div>
                                <div className={styles['price']}>
                                  RM {lowerMid}
                                </div>
                              </div>
                              <div
                                className={`${styles['pile__3']} ${styles['yellow']}`}
                              ></div>{' '}
                              <div
                                className={`${styles['pile__2']} ${styles['red']}`}
                              >
                                <div className={styles['straight__line']}></div>
                                <div className={styles['price']}>
                                  RM {minRange}
                                </div>
                              </div>
                              <div
                                className={`${styles['pile__1']} ${styles['red']}`}
                              ></div>
                            </div>
                            <span>
                              <small>
                                Other factors can influence the rental price
                                like number of
                              </small>
                              <br></br>
                              <small>
                                bedrooms, furnishing level, facilities and etc.
                              </small>
                            </span>
                          </div>
                        ) : null}
                      </>
                    )}
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className={styles['priceWidget__btn__container']}>
                <Link href={'/post'}>
                  <a variant='primary'>Post property</a>
                </Link>
                <Link href={t('link_kl')}>
                  <a variant='error'>Search property</a>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export async function getServerSideProps () {
  return {}
}

export default PriceWidgetComponent
