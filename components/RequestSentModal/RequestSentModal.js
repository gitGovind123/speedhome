import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import styles from './RequestSentModal.module.scss'

export const RequestSentModal = props => {
  const { show, onHide } = props

  return (
    <Modal
      {...props}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='retrieve-key-modal-style'
    >
      <Modal.Body className='text-center py-5'>
        <p className='d-block mb-3 font-weight-bold'>Request Sent</p>
        <img
          loading='lazy'
          src='/img/send-plane.jpg'
          alt='Send Plane'
          className='mb-2'
        />
        <p className='font-12'>Our team will come back to you shortly</p>
        <Button
          variant='dark'
          className={`btn-curv ${styles['btn-half-block']}`}
          onClick={onHide}
        >
          Okay
        </Button>
      </Modal.Body>
    </Modal>
  )
}
