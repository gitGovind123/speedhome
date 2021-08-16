import React from 'react'
import PropertyDetailModalWithHead from '../../PropertyDetail/PropertyDetailModalWithHead'

const app_download = 'https://speedhome.app.link/joinappnow'

const PromoteAppDownloadModal = ({ show, onClose }) => (
  <PropertyDetailModalWithHead
    title={'App'}
    isOpen={show}
    handleClose={onClose}
    centered
  >
    <h3 className='user-title mt-2'>
      You received a message. But you are not getting instant notification yet.{' '}
    </h3>
    <p className='mt-4'>
      <a href={app_download} target='_blank' style={{ color: '#000' }}>
        Download SPEEDHOME App FREE for exclusive benefits now!
      </a>
    </p>
    <div className='btn-wrapper mt-2 mb-0'>
      <button
        onClick={onClose}
        className='btn btn-primary-filled btn-big btn-holder btn-curv text-center'
      >
        Return to chat
      </button>
    </div>
  </PropertyDetailModalWithHead>
)

export default PromoteAppDownloadModal
