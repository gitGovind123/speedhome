import React from 'react'

import useTranslation from 'next-translate/useTranslation'

import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'

import DatePicker from 'react-datepicker'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import dayjs from 'dayjs'

import { FURNISHIN_EXTRA_OPTIONS, FACILITIES_EXTRA_OPTIONS } from './DB'

import Loader from '../Common/Loader'

const Step3Form = props => {
  const {
    styles,
    selectTedPostType,
    photoUploadSuccess,
    availabilityDate,
    loading,
    desciptionData,
    setDesciptionData,
    firstStepData,
    furnishingData,
    facilitiesData,
    acceptAllRace,
    getPetFriendly,
    getBumiLot,
    availabilityError,
    minDateError,
    descriptionStrength,
    sendFinalStepData,
    availabilityCheck,
    changeFurnishingHandler,
    changeFacilitiesHandler,
    changeAllRaceHandle,
    changePetFriendlyHandle,
    changeBumiLotHandle,
    handleAvailabilityDate,
    isEdit
  } = props

  const { t } = useTranslation('common')
  return (
    <>
      <ValidationForm
        onSubmit={e => {
          e.preventDefault()
          sendFinalStepData()
        }}
      >
        <Container>
          <Row className='step3CreateListing'>
            {photoUploadSuccess && isEdit ? (
              <Col md={12}>
                <div
                  className='text-center'
                  style={{
                    padding: '2rem 0',
                    color: '#ff0055 ',
                    fontStyle: 'italic',
                    fontSize: '1rem'
                  }}
                >
                  {t('post:text_post_photoUpload_success')}
                </div>
              </Col>
            ) : null}

            <Col md={12}>
              <Form.Group>
                <div>
                  <strong className={`${styles['content-title']}  text-center`}>
                    {t('post:text_post_furnishing')}
                  </strong>
                  <div className='extra-inner'>
                    <div className='row'>
                      {FURNISHIN_EXTRA_OPTIONS.map(furnishing => {
                        return (
                          <div
                            className='col-xs-6 col-sm-4'
                            key={furnishing.value}
                          >
                            <div className='check-wrap'>
                              <label
                                className={`${styles['checkbox']} ${styles['checkbox-sm']} ${styles['checkbox-inline-sm']}`}
                              >
                                <TextInput
                                  name='furnishing'
                                  type='checkbox'
                                  checked={availabilityCheck(
                                    furnishingData,
                                    furnishing
                                  )}
                                  value={furnishing.value}
                                  onChange={() =>
                                    changeFurnishingHandler(furnishing)
                                  }
                                />
                                <span className={styles['checkbox__icon']} />
                                {t(
                                  `post:text_post_furnishingExta_${furnishing.value}`
                                )}
                              </label>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <div>
                  <strong className={`${styles['content-title']}  text-center`}>
                    {t('post:text_post_facilities')}
                  </strong>
                  <div className='extra-inner'>
                    <div className='row'>
                      {FACILITIES_EXTRA_OPTIONS.map(facilities => {
                        return (
                          <div
                            className='col-xs-6 col-sm-4'
                            key={facilities.value}
                          >
                            <div className='check-wrap'>
                              <label
                                className={`${styles['checkbox']} ${styles['checkbox-sm']} ${styles['checkbox-inline-sm']}`}
                              >
                                <TextInput
                                  name='furnishing'
                                  type='checkbox'
                                  checked={availabilityCheck(
                                    facilitiesData,
                                    facilities
                                  )}
                                  value={facilities.value}
                                  onChange={() =>
                                    changeFacilitiesHandler(facilities)
                                  }
                                />
                                <span className={styles['checkbox__icon']} />
                                {t(
                                  `post:text_post_facilitiesExta_${facilities.value}`
                                )}
                              </label>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className={styles['ownerOfUnit']}>
                <div>
                  <Row>
                    <Col md={9}>
                      <strong
                        className={`${styles['content-title']}  text-center ${styles['post-description']}`}
                      >
                        {t('post:text_post_description')}
                      </strong>
                    </Col>
                    <Col md={3} style={{ display: 'flex' }}>
                      <div
                        className={`${styles['round-xlarge']} ${
                          styles['weak']
                        } ${
                          descriptionStrength !== styles['weak']
                            ? styles['strength-active']
                            : ''
                        }`}
                        style={{
                          opacity: descriptionStrength === 'weak' ? 1 : 0.4
                        }}
                      >
                        {t('post:text_post_weak')}
                      </div>
                      <div
                        className={`${styles['round-xlarge']} ${
                          styles['medium']
                        } ${
                          descriptionStrength !== styles['medium']
                            ? styles['strength-active']
                            : ''
                        }`}
                        style={{
                          opacity: descriptionStrength === 'medium' ? 1 : 0.4
                        }}
                      >
                        {t('post:text_post_medium')}
                      </div>
                      <div
                        className={`${styles['round-xlarge']} ${
                          styles['strong']
                        } ${
                          descriptionStrength !== styles['strong']
                            ? styles['strength-active']
                            : ''
                        }`}
                        style={{
                          opacity: descriptionStrength === 'strong' ? 1 : 0.4
                        }}
                      >
                        {t('post:text_post_strong')}
                      </div>
                    </Col>
                  </Row>
                  <div className='extra-inner' id='rich-text-area'>
                    <Form.Control
                      as='textarea'
                      id='description'
                      cols='30'
                      rows='10'
                      className={`${styles['big-des']} ${styles['form-control']}`}
                      value={desciptionData}
                      onChange={e => setDesciptionData(e.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <div>
                  {/* <strong className='content-title text-center'>&nbsp;</strong> */}
                  <div className='extra-inner'>
                    <div className='row'>
                      {selectTedPostType === 'rent' ? (
                        <>
                          <div id='blockAllRaces' className='col-xs-6 col-sm-4'>
                            <div className='check-wrap'>
                              <label
                                className={`${styles['checkbox']} ${styles['checkbox-sm']} ${styles['checkbox-inline-sm']}`}
                              >
                                <TextInput
                                  name='race'
                                  type='checkbox'
                                  id='cbAllRace'
                                  value={acceptAllRace}
                                  checked={acceptAllRace}
                                  onChange={() => changeAllRaceHandle()}
                                />
                                <span className={styles['checkbox__icon']} />
                                {t('post:text_post_allRaces')}
                              </label>
                            </div>
                          </div>
                          <div
                            id='blockPetFriendly'
                            className='col-xs-6 col-sm-4'
                          >
                            <div className='check-wrap'>
                              <label
                                className={`${styles['checkbox']} ${styles['checkbox-sm']} ${styles['checkbox-inline-sm']}`}
                              >
                                <TextInput
                                  name='pet'
                                  type='checkbox'
                                  id='cbPet'
                                  checked={getPetFriendly}
                                  onChange={() => changePetFriendlyHandle()}
                                />
                                <span className={styles['checkbox__icon']} />
                                {t('post:text_post_petFriendly')}
                              </label>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div id='blockBumiLot' className='col-xs-6 col-sm-4'>
                          <div className='check-wrap'>
                            <label
                              className={`${styles['checkbox']} ${styles['checkbox-sm']} ${styles['checkbox-inline-sm']}`}
                            >
                              <TextInput
                                name='bumilot'
                                type='checkbox'
                                id='cbBumiLot'
                                value={getBumiLot}
                                checked={getBumiLot}
                                onChange={() => changeBumiLotHandle()}
                              />
                              <span className={styles['checkbox__icon']} />
                              {t('post:text_post_bumiLot')}
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <div>
                  {/* <strong className='content-title'>&nbsp;</strong> */}
                  <div className='row extra-inner'>
                    <div
                      id='blockDateAvailable'
                      className='col-date col-xs-12 col-md-6'
                    >
                      <div
                        className={`input-inline-group d-flex ${styles['datepicker-nice']}`}
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          width: '100%'
                        }}
                      >
                        <div
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <label htmlFor='dateAvailable'>
                            {t('post:text_post_availabilityDate')}{' '}
                          </label>
                          <DatePicker
                            selected={Date.parse(availabilityDate)}
                            onChange={handleAvailabilityDate}
                            dateFormat='dd/MM/yyyy'
                            minDate={dayjs().toDate()}
                            placeholderText='Date (dd/mm/yyyy)'
                          />
                        </div>

                        {availabilityError ? (
                          <span
                            className='error'
                            style={{
                              color: '#ff0055',
                              display: 'block',
                              fontSize: '.85rem',
                              textAlign: 'left',
                              padding: '0 2rem',
                              position: 'relative'
                            }}
                          >
                            Availability date is required
                          </span>
                        ) : null}
                        {minDateError ? (
                          <span
                            className={styles['error']}
                            style={{
                              color: '#ff0055',
                              display: 'block',
                              fontSize: '.85rem',
                              textAlign: 'left',
                              padding: '0 2rem',
                              position: 'relative'
                            }}
                          >
                            {minDateError ? 'Date can not be past date' : ''}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </Form.Group>
            </Col>

            {firstStepData.type === 'LANDED' ||
            firstStepData.type === 'HIGHRISE' ||
            firstStepData.type === 'ROOM' ? (
              <>
                <Col md={12}>
                  <Form.Group>
                    <div>
                      {/* <strong className='content-title'>&nbsp;</strong> */}
                      <div>
                        <div className={styles['note-box']}>
                          <div className={`${styles['head']} d-flex`}>
                            <div className={styles['txt-left']}>
                              {' '}
                              {t('post:text_post_landlordProtection')}
                            </div>
                            <div className={styles['right']}>
                              <img
                                loading='lazy'
                                src='/img/zeroDeposit.png'
                                width={45}
                                alt=''
                              />
                              <img
                                loading='lazy'
                                src='/img/icons/allinaz.svg'
                                width={80}
                                alt=''
                              />
                            </div>
                          </div>
                          <div className={styles['sub-inner']}>
                            <strong className={styles['content-title']}>
                              {t('post:text_post_secureMoney')}
                            </strong>
                            <p>{t('post:text_post_alianz')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form.Group>
                </Col>
              </>
            ) : null}
          </Row>
          <div className={styles['nextButton-step3']}>
            <Button
              id='btnClickCreateListingStep3'
              type='submit'
              className='primary'
              style={{ fontWeight: '500' }}
            >
              Continue
            </Button>
          </div>
        </Container>
        {loading ? (
          <div className='loading-overlay--post'>
            <Loader />
          </div>
        ) : null}
      </ValidationForm>
    </>
  )
}

export default Step3Form
