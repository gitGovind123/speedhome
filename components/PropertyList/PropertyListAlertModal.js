import React from 'react'
import validator from 'validator'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Envelop from '@material-ui/icons/Mail'
import useTranslation from 'next-translate/useTranslation'

const PropertyListAlertModal = props => {
  const {
    showAlertModal,
    handleCloseModal,
    subscribeToAlert,
    locationName,
    filterData
  } = props

  const { t } = useTranslation('common')

  return (
    <Modal
      show={showAlertModal}
      onHide={handleCloseModal}
      className='custModal'
    >
      <Modal.Header closeButton>
        <Modal.Title>Subscription</Modal.Title>
      </Modal.Header>

      <ValidationForm onSubmit={e => subscribeToAlert(e, '')}>
        <Modal.Body>
          <p align='center'>
            Subscribe to listing alert for {locationName} now!
          </p>
          <div
            id='selectedFilter'
            style={{ fontSize: '10', color: '#ff0055' }}
            align='center'
          >
            <div>{locationName ? `Location : ${locationName}` : null}</div>
            <div>
              {filterData.types ? `Unit Type: ${filterData.types}` : null}
            </div>
            <div>
              {filterData.furnish !== -1
                ? `Furnishing: ${filterData.furnish}`
                : null}
            </div>
            <div>
              {filterData.leaseType
                ? `Lease Type: ${filterData.leaseType}`
                : null}
            </div>

            <div>
              {filterData.rooms !== -1
                ? `Room: ${
                    filterData.rooms === 0 ? t('btn_studio') : filterData.rooms
                  }`
                : null}
            </div>
            <div>
              {filterData.roomType > 0
                ? `Room Type: ${filterData.roomType}`
                : null}
            </div>
            <div>
              {filterData.bathrooms !== -1
                ? `Bathroom: ${
                    filterData.bathrooms === 4
                      ? t('btn_more_than_3')
                      : filterData.bathrooms
                  }`
                : null}
            </div>
            <div>
              {filterData.bathroomType !== -1
                ? `Bathroom Type: ${filterData.bathroomType}`
                : null}
            </div>
            <div>
              {filterData.cars !== -1
                ? `Car Park: ${
                    filterData.cars === 4
                      ? t('btn_more_than_3')
                      : filterData.cars
                  }`
                : null}
            </div>

            <div>
              {filterData.maxPrice > 0
                ? `Maximum Budget: RM ${filterData.maxPrice}`
                : null}
            </div>

            <div>
              {filterData.nearLrt !== -1
                ? `Nearby LRT: ${t('text_yes')}`
                : null}
            </div>
            <div>
              {filterData.petFriendly !== -1
                ? `Pet Friendly Neighbourhood: ${t('text_yes')}`
                : null}
            </div>
            <div>
              {filterData.allRaces !== -1
                ? `Accept All Races: ${t('text_yes')}`
                : null}
            </div>
            <div>
              {filterData.instantView !== -1
                ? `Instant View Unit: ${t('text_yes')}`
                : null}
            </div>
          </div>
          <br />
          <p align='center'>
            We will need your email address so we can send you our daily update.
          </p>
          <p style={{ fontSize: 'small' }} align='center'>
            Pss..Don’t worry, we promise we won’t spam you.
          </p>
          <div className='infoRequestPopUp'>
            <div className='input-box'>
              {/* <Icon icon='envelop' size={'small'} /> */}
              <Envelop
                style={{
                  position: 'absolute',
                  zIndex: '1',
                  top: '13px',
                  left: '10px'
                }}
              />
              <TextInput
                name='emailAlertSubscribe'
                id='emailAlertSubscribe'
                required
                placeholder={t('text_email_address')}
                validator={validator.isEmail}
                style={{ border: 0 }}
                errorMessage={{ validator: 'Please enter a valid email' }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' className='btn' type='submit'>
            {t('btn_save_changes')}
          </Button>
        </Modal.Footer>
      </ValidationForm>
    </Modal>
  )
}

export default PropertyListAlertModal
