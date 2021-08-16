import React from 'react'
import useTranslation from 'next-translate/useTranslation'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const PropertyListSubscriptionAlertStatusModal = props => {
  const { subscribePropertyAlertStatus, handleCloseModal } = props
  const { t } = useTranslation('common')

  return (
    <Modal
      show={subscribePropertyAlertStatus}
      onHide={handleCloseModal}
      className='custModal'
    >
      <Modal.Header closeButton>
        <Modal.Title>Search Alert Created</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          You&apos;ll now get email alerts when homes matching your criteria hit
          the market.
        </p>
        <p style={{ fontWeight: 'bold' }}>
          You can unsubscribe at any time by clicking on the link at the bottom
          of the email
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' className='btn' onClick={handleCloseModal}>
          {t('btn_okay')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PropertyListSubscriptionAlertStatusModal
