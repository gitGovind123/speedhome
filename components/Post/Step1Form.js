import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import HomeIcon from '@material-ui/icons/Home'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

import useTranslation from 'next-translate/useTranslation'

import SelectBoxComponent from '../Common/SelectBox'
import YoutubeZDEVideo from './YoutubeZDEVideo'

import {
  HOUSING_TYPE_OPTIONS,
  BED_ROOM_OPTIONS,
  HIGHRISE_BED_ROOM_OPTIONS,
  LANDED_HIGHRISE_BATH_ROOM_OPTIONS,
  ROOM_BATH_ROOM_OPTIONS,
  PARKING_OPTIONS,
  FURNISHING_OPTIONS,
  ROOM_TYPE_OPTIONS,
  NUMBEROF_PAX_OPTIONS,
  FLOOR_LEVEL_OPTION,
  TITLE_TYPE
} from './DB'

const Step1Form = props => {
  const {
    styles,
    propertyName,
    ownerOfUnit,
    selectTedPostType,
    housingType,
    negotiable,
    address,
    postCode,
    bedroom,
    buildUpSize,
    bathroom,
    roomType,
    parking,
    price,
    furnishing,
    fullyFurnish,
    floorLevel,
    floorLevelOption,
    numberOfPax,
    autocompletePropertyList,
    autocompleteListOpen,
    titleType,
    setWrapperRef,
    checkPriceValidationAndSubmit,
    housingTypeChange,
    ownerOfUnitChange,
    setOpen,
    tooltipOpenName,
    propertyNameChange,
    setPropertyName,
    addressChange,
    postCodeChange,
    roomTypeChange,
    buildUpSizeChange,
    buildUpSizeValidator,
    priceChange,
    negotiableChange,
    floorLevelOptionChange,
    floorLevelChange,
    floorLevelValidate,
    numberOfPaxChange,
    bedroomChange,
    bathroomChange,
    parkingChange,
    furnishingChange,
    fullyFurnishChange,
    titleTypeChanges
  } = props

  const { t } = useTranslation('common')

  return (
    <ValidationForm
      onSubmit={e => {
        e.preventDefault()
        checkPriceValidationAndSubmit()
      }}
    >
      <div
        className={`form-group ${styles['form-group']} ${styles['input-wrap']} ${styles['housing-type-single']}`}
      >
        <strong className={styles['control-title']}>
          {t('post:text_propertyType')}
        </strong>
        <div className={styles['status-housing-type']} id='rentPropertyType'>
          <div className={`${styles['housingType']}  d-flex`}>
            {HOUSING_TYPE_OPTIONS.filter(
              array => array.saleType === selectTedPostType
            ).map(type => {
              return (
                <label
                  key={type.value}
                  className={`${styles['checkbox']} ${styles['custom-radio']} ${styles['custom-radio-v2']} ${styles['checkbox-inline-sm']}`}
                >
                  <input
                    id={`type${type.value}`}
                    value={type.value}
                    type='radio'
                    name='chooseOp'
                    checked={housingType === type.value}
                    disabled={
                      props.propertyData ? housingType !== type.value : false
                    }
                    onChange={housingTypeChange}
                  />
                  <span className={styles['checkbox__icon']}>
                    <span
                      className={
                        type.value === 'ROOM'
                          ? 'icon-bed'
                          : type.value === 'HIGHRISE'
                          ? 'icon-apartment'
                          : type.value === 'LANDED'
                          ? 'icon-houses'
                          : 'icon-apartment'
                      }
                      style={{
                        backgroundImage: `url(${
                          type.value === 'ROOM'
                            ? '/img/bed.svg'
                            : type.value === 'HIGHRISE'
                            ? '/img/apartment.svg'
                            : type.value === 'LANDED'
                            ? '/img/houses.svg'
                            : type.value === 'LANDED_SALE'
                            ? '/img/houses.svg'
                            : '/img/apartment.svg'
                        })`,
                        height: '2rem',
                        width: '2rem',
                        backgroundRepeat: 'none'
                      }}
                    />
                  </span>
                  {t(`post:text_post_housing_type_${type.value}`)}
                </label>
              )
            })}
          </div>
        </div>
      </div>
      <Container>
        {housingType ? (
          <Row>
            <Col md={12}>
              <Form.Group
                controlId='ownerOfUnit'
                className={styles['ownerOfUnit']}
              >
                <Form.Check
                  type='checkbox'
                  checked={ownerOfUnit}
                  onChange={ownerOfUnitChange}
                  label={t('post:text_post_onwership')}
                />
              </Form.Group>
            </Col>
          </Row>
        ) : null}
        {housingType ? (
          <Row>
            <Col md={6}>
              <div
                className={`form-group ${styles['form-group']} ${styles['propertyName']}`}
              >
                <label htmlFor='propertyName'>
                  {t('post:text_property_name')}

                  <Tooltip
                    title={
                      <span
                        style={{
                          fontSize: '16px',

                          padding: '4px'
                        }}
                      >
                        {t('post:post_property_name_tooltip')}
                      </span>
                    }
                    aria-haspopup='true'
                    style={{
                      padding: '4px'
                    }}
                    PopperProps={{
                      disablePortal: true
                    }}
                    onClose={() => {
                      setOpen('')
                    }}
                    open={tooltipOpenName == 'property_name'}
                    disableFocusListener
                    disableTouchListener
                  >
                    <IconButton onClick={() => setOpen('property_name')}>
                      <HelpOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </label>

                <TextInput
                  name='propertyName'
                  id='propertyName'
                  required
                  placeholder={
                    housingType === 'LANDED'
                      ? t('post:post_property_name_landed')
                      : t('post:post_property_name')
                  }
                  minLength='4'
                  maxLength='100'
                  value={propertyName}
                  onChange={propertyNameChange}
                  errorMessage={{
                    required: `${t('text_property_name_error_req')}`,
                    minLength: `${t('text_property_name_error_L')}`,
                    maxLength: `${t('text_property_name_error_L')}`
                  }}
                />
                {autocompleteListOpen ? (
                  <ul
                    className='ui-autocomplete  ui-widget-content'
                    id='ui-id-1'
                    tabIndex='0'
                    ref={setWrapperRef}
                    style={{
                      top: '83px',
                      left: '0px',
                      width: '100%',
                      zIndex: '99'
                    }}
                  >
                    {autocompletePropertyList &&
                      autocompletePropertyList.PROPERTY &&
                      autocompletePropertyList.PROPERTY.map(
                        propertyListName => {
                          return (
                            <li
                              key={propertyListName.id}
                              onClick={() => setPropertyName(propertyListName)}
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

                              {propertyListName.label}
                              <div className={styles['autocomplete-category']}>
                                {t('post:text_property')}
                              </div>
                            </li>
                          )
                        }
                      )}
                  </ul>
                ) : null}
              </div>

              <div className={`form-group ${styles['form-group']}`}>
                <label htmlFor='address'>{t('post:text_post_address')}</label>
                <TextInput
                  name='address'
                  id='address'
                  placeholder={
                    housingType === 'LANDED'
                      ? t('post:post_property_address_landed')
                      : t('post:post_property_address_highrise')
                  }
                  required
                  minLength='5'
                  value={address}
                  onChange={addressChange}
                  errorMessage={{
                    required: `${t('post:text_post_address_req')}`,
                    minLength: `${t('post:text_post_address_min')}`
                  }}
                />
              </div>

              {/* MN -> Change pattern for post code to numeric */}
              <div className={`form-group ${styles['form-group']}`}>
                <label htmlFor='postCode'>{t('post:text_post_code')}</label>
                <TextInput
                  name='postCode'
                  id='postCode'
                  required
                  placeholder={
                    housingType === 'LANDED'
                      ? t('post:post_property_postcode_landed')
                      : t('post:post_property_postcode_highrise')
                  }
                  pattern='\d*'
                  type='number'
                  minLength='5'
                  maxLength='5'
                  value={postCode}
                  onChange={postCodeChange}
                  errorMessage={{
                    pattern: `${t('post:text_post_code_pat')}`,

                    minLength: `${t('post:text_post_code_min')}`,
                    maxLength: `${t('post:text_post_code_max')}`
                  }}
                />
              </div>

              {housingType === 'ROOM' ? (
                <div className={styles['selectGroup']}>
                  <Form.Label>{t('post:text_post_roomType')}</Form.Label>
                  <SelectBoxComponent
                    data={ROOM_TYPE_OPTIONS}
                    stateVal={roomType}
                    changeVal={roomTypeChange}
                  />
                </div>
              ) : (
                /* MN -> in this TextInput, validation dosen't work for pattern but BuildUpSize must be numeric so i have to mention type as a number */
                <div className={`form-group ${styles['form-group']}`}>
                  <label htmlFor='buildUpSize'>
                    {t('post:text_post_buildUpSize')}
                  </label>
                  <TextInput
                    name='buildUpSize'
                    id='buildUpSize'
                    required
                    type='number'
                    value={buildUpSize}
                    onChange={buildUpSizeChange}
                    pattern='[0-9]*'
                    validator={buildUpSizeValidator}
                    errorMessage={{
                      pattern: `${t('post:text_post_buildUpSize_pat')}`,
                      validator: `${t('post:text_post_buildUpSize_val')}`
                    }}
                  />
                  <div className={styles['form-text']}>
                    {t('post:text_post_buildUpSize_info')}
                  </div>
                </div>
              )}

              <div className={`form-group ${styles['form-group']}`}>
                <label htmlFor='price'>{t('post:text_post_price')}</label>
                <TextInput
                  name='price'
                  id='price'
                  required
                  value={price}
                  pattern='^([1-9][0-9]*)$'
                  onChange={priceChange}
                  errorMessage={{
                    required: `${t('post:text_post_price_req')}`,
                    pattern: `${t('post:text_post_price_pat')}`
                  }}
                />
              </div>

              <Form.Group controlId='negotiable'>
                <Form.Check
                  type='checkbox'
                  checked={negotiable}
                  onChange={negotiableChange}
                  label={`${t('post:text_post_negotiable')}`}
                />
              </Form.Group>
            </Col>

            <Col md={6} style={{ marginTop: '4px' }}>
              <div className={`form-group ${styles['form-group']}`}>
                <Form.Label>{t('post:text_floor_level')} </Form.Label>
                {housingType === 'LANDED' ||
                housingType === 'LANDED_SALE' ||
                housingType === 'ROOM' ? (
                  <SelectBoxComponent
                    data={FLOOR_LEVEL_OPTION}
                    stateVal={floorLevelOption}
                    changeVal={floorLevelOptionChange}
                  />
                ) : (
                  <TextInput
                    className={`form-control`}
                    name='floorLevel'
                    id='floorLevel'
                    type='number'
                    minLength='1'
                    maxLength='200'
                    required
                    value={floorLevel}
                    onChange={floorLevelChange}
                    validator={floorLevelValidate}
                    errorMessage={{
                      validator: `${t('post:text_floor_level_val')}`
                    }}
                  />
                )}
              </div>

              {housingType === 'ROOM' ? (
                <div className={styles['selectGroup']}>
                  <Form.Label>{t('post:text_number_of_pax')}</Form.Label>
                  <SelectBoxComponent
                    data={NUMBEROF_PAX_OPTIONS}
                    stateVal={numberOfPax}
                    changeVal={numberOfPaxChange}
                  />
                </div>
              ) : (
                <div className={styles['selectGroup']}>
                  <Form.Label>{t('post:text_post_bedroom')}</Form.Label>
                  <SelectBoxComponent
                    data={
                      housingType === 'HIGHRISE'
                        ? HIGHRISE_BED_ROOM_OPTIONS
                        : BED_ROOM_OPTIONS
                    }
                    stateVal={bedroom}
                    changeVal={bedroomChange}
                  />
                </div>
              )}

              <div className={styles['selectGroup']}>
                <Form.Label>{t('post:text_post_bathroom')}</Form.Label>
                {housingType === 'ROOM' ? (
                  <SelectBoxComponent
                    data={ROOM_BATH_ROOM_OPTIONS}
                    stateVal={bathroom}
                    changeVal={bathroomChange}
                  />
                ) : (
                  <SelectBoxComponent
                    data={LANDED_HIGHRISE_BATH_ROOM_OPTIONS}
                    stateVal={bathroom}
                    changeVal={bathroomChange}
                  />
                )}
              </div>

              <div
                className={styles['selectGroup']}
                style={housingType === 'ROOM' ? null : { marginBottom: '69px' }}
              >
                <Form.Label>{t('post:text_post_parking')}</Form.Label>
                <SelectBoxComponent
                  data={PARKING_OPTIONS}
                  stateVal={parking}
                  changeVal={parkingChange}
                />
              </div>

              <div className={styles['selectGroup']}>
                <Form.Label>{t('post:text_post_furnishing')}</Form.Label>
                <Tooltip
                  title={
                    <ul className={styles['tooltip-list-ul']}>
                      <li>{t('post:post_property_furnish_tooltip_1')}</li>

                      <li>{t('post:post_property_furnish_tooltip_2')}</li>

                      <li>{t('post:post_property_furnish_tooltip_3')}</li>
                    </ul>
                  }
                  aria-haspopup='true'
                  className
                  style={{
                    padding: '4px'
                  }}
                  PopperProps={{
                    disablePortal: true
                  }}
                  onClose={() => {
                    setOpen('')
                  }}
                  open={tooltipOpenName === 'property_furnish'}
                  disableFocusListener
                  disableTouchListener
                >
                  <IconButton onClick={() => setOpen('property_furnish')}>
                    <HelpOutlineIcon />
                  </IconButton>
                </Tooltip>
                <SelectBoxComponent
                  data={FURNISHING_OPTIONS}
                  stateVal={furnishing}
                  changeVal={furnishingChange}
                />
              </div>

              {selectTedPostType === 'rent' ? (
                furnishing.value !== 'FULL' ? (
                  <Form.Group controlId='fullyFurnish'>
                    <Form.Check
                      type='checkbox'
                      checked={fullyFurnish}
                      onChange={fullyFurnishChange}
                      label={t('post:text_post_fullyFurnished')}
                    />
                  </Form.Group>
                ) : null
              ) : (
                <div className={styles['selectGroup']}>
                  <Form.Label>{t('post:text_post_title_type')}</Form.Label>
                  <SelectBoxComponent
                    data={TITLE_TYPE}
                    stateVal={titleType}
                    changeVal={titleTypeChanges}
                  />
                </div>
              )}

              <div className={styles['nextButton-step1']}>
                <Button
                  id='btnClickCreateListingStep1'
                  type='submit'
                  className='primary'
                  style={{ fontWeight: '500' }}
                >
                  Continue
                </Button>
              </div>
            </Col>
          </Row>
        ) : selectTedPostType === 'rent' ? (
          <YoutubeZDEVideo />
        ) : null}
      </Container>
    </ValidationForm>
  )
}

export default Step1Form
