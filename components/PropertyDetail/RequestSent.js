import React from 'react'
import { Modal } from 'react-bootstrap'
import styles from './RequestSent.module.scss'

class RequestSent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { handleClose, isOpen, isSuccess } = this.props
    return (
      <React.Fragment>
        {
          <Modal
            show={isOpen}
            onHide={handleClose}
            className={`propertyDetailPage ${styles['popupResponse']}`}
          >
            <Modal.Body className='formBody popupLayout'>
              <div
                className='white-popup text-center'
                id='chatsubmittedMessage'
              >
                <div
                  style={{
                    height: '2rem'
                  }}
                >
                  <button
                    onClick={() => {
                      handleClose()
                    }}
                    title='Close (Esc)'
                    type='button'
                    className='mfp-close'
                    style={{ color: '#000', top: '10px' }}
                  >
                    ×
                  </button>
                </div>

                <h3 className={`user-title  ${styles['padAlign']}`}>
                  {isSuccess ? 'Request Sent' : 'Something went wrong!'}{' '}
                </h3>
                <div
                  className={`${styles['user-faces']} ${styles['padAlign']}`}
                >
                  <img
                    loading='lazy'
                    className={styles['instantImg']}
                    alt='images'
                    src={'/img/ic_request_sent.png'}
                    width='65'
                  />
                </div>
                {isSuccess ? (
                  <p
                    className={`${styles['padAlign']} ${styles['textHighlight']}`}
                    style={{
                      fontSize: '1.5rem'
                    }}
                  >
                    Our team will come back to you to confirm the appointment
                  </p>
                ) : (
                  <p
                    className={`${styles['padAlign']} ${styles['textHighlight']}`}
                    style={{
                      fontSize: '1.5rem'
                    }}
                  >
                    {' '}
                    Something Went wrong, please email &nbsp;
                    <a href='mailto:hello@speedhome.com'>hello@speedhome.com</a>
                    &nbsp;for more information
                  </p>
                )}

                <div className='btn-wrapper mt-2'>
                  <a
                    className={`btn btn-primary-filled btn-big btn-holder btn-curv text-center ${styles['instantViewHeader']}`}
                    onClick={handleClose}
                    style={{
                      color: 'white',
                      outline: 'none',
                      border: 'none'
                    }}
                    data-testId='ChatRequestSentButton'
                  >
                    Okay
                  </a>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        }
      </React.Fragment>
    )
  }
}

export default RequestSent
