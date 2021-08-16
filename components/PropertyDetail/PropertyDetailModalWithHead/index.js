import React from 'react'
import { Modal } from 'react-bootstrap'

import styles from './PropertyDetailModalWithHead.module.scss'

const Index = props => {
  const { title, handleClose, isOpen, centered = false } = props
  return (
    <React.Fragment>
      {
        <Modal
          show={isOpen}
          onHide={handleClose}
          centered={centered}
          className={`propertyDetailPage ${styles['popupResponse']} ${styles['popupResponseShare']}`}
        >
          <Modal.Header className={styles['formHeader']}>
            <Modal.Title className={styles['formTitle']}>
              <div className='popup-header'>{title}</div>
              <button
                onClick={() => {
                  handleClose()
                }}
                title='Close (Esc)'
                type='button'
                className='mfp-close'
                style={{ color: '#fff', top: '10px' }}
              >
                ×
              </button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles['formBody']}>
            {props.children}
          </Modal.Body>
        </Modal>
      }
    </React.Fragment>
  )
}

export default Index
