import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import PropertyDetailModalWithHead from '../../../components/PropertyDetail/PropertyDetailModalWithHead'

const ShareModal = ({ isOpen, link, onClose, copyClipBoard }) => (
  <PropertyDetailModalWithHead
    title={'Share'}
    isOpen={isOpen}
    handleClose={onClose}
    centered
  >
    <div
      id='shareActiveProp74965_popup'
      className='white-popup shareListingPopup'
    >
      <div className='user-container login-container text-center'>
        <p>
          Share property, Please copy the link below
          <br />
          <br />
          <input
            type='text'
            className='form-control linkBox'
            value={link}
            readOnly=''
            id='copyToShare'
            onChange={() => {}}
          />
        </p>

        <p>
          <CopyToClipboard text={link} onCopy={copyClipBoard}>
            <button className='btn btn-curv btn-primary btn-primary-filled'>
              Copy &amp; Share
            </button>
          </CopyToClipboard>
        </p>
      </div>
      <button type='button' onClick={onClose} className='mfp-close'>
        ×
      </button>
    </div>
  </PropertyDetailModalWithHead>
)

export default ShareModal
