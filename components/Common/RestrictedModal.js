import React from 'react'
import PropertyDetailModalWithHead from '../PropertyDetail/PropertyDetailModalWithHead'

const RestrictedModal = ({ isOpen, onClose, isAgent }) => (
  <PropertyDetailModalWithHead
    title={'Sorry!'}
    isOpen={isOpen}
    onClose={onClose}
    centered
  >
    <div id='rejectedPropPopup' className='white-popup'>
      <div className='user-container login-container text-center'>
        {isAgent.agent ? (
          <p>
            Your account is restricted, please email&nbsp;
            <a href='mailto:hello@speedhome.com'>hello@speedhome.com</a>
            &nbsp;for more information
          </p>
        ) : (
          <p>
            Something Went wrong, please email &nbsp;
            <a href='mailto:hello@speedhome.com'>hello@speedhome.com</a>
            &nbsp;for more information
          </p>
        )}
      </div>
      <button
        title='Close'
        type='button'
        className='mfp-close'
        onClick={onClose}
      >
        ×
      </button>
    </div>
  </PropertyDetailModalWithHead>
)

export default RestrictedModal
