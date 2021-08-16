import React from 'react'
import Modal from 'react-bootstrap/Modal'

const PostImageSizeErrorModal = props => {
  const { style, imageSizeError, handleCloseAlertModal } = props

  return (
    <Modal
      show={imageSizeError}
      onHide={handleCloseAlertModal}
      className='custModal shareModal'
      // backdrop='static'
    >
      <Modal.Body
        style={{
          padding: '0 !important'
        }}
      >
        <div id='uploadPhotoError' className='text-center white-popup'>
          <div className='user-container upload-photo-error'>
            <div className='popup-header'>Whoopsie Daisy</div>
            <div className='user-faces'>
              <img loading='lazy' src='/img/icons/warning.svg' width='60' />
            </div>
            <div className='user-title'>
              You need to upload at least 4 photos to proceed.
            </div>
            <div className='btn-wrapper'>
              <div className=''>
                <span
                  id='btnCloseErrorPopup'
                  className='btn btn-curv btn-dark-gray-filled'
                  onClick={handleCloseAlertModal}
                >
                  Got it
                </span>
              </div>
            </div>
          </div>
          <button
            title='Close (Esc)'
            type='button'
            className='mfp-close'
            onClick={handleCloseAlertModal}
          >
            ×
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default PostImageSizeErrorModal
