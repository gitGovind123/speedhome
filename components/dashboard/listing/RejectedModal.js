import React from 'react'

import PropertyDetailModalWithHead from '../../PropertyDetail/PropertyDetailModalWithHead'

const RejectedModal = ({ isOpen, onClose, rejectedItem: { deleteReason } }) => (
  <PropertyDetailModalWithHead
    title={'Sorry!'}
    isOpen={isOpen}
    handleClose={onClose}
    centered
  >
    <div id='rejectedPropPopup' className='white-popup'>
      <div className='user-container login-container text-center'>
        <p>
          This property has been rejected
          {deleteReason ? ` because of "${deleteReason}"` : ''}, please edit and
          resubmit
        </p>
      </div>
    </div>
  </PropertyDetailModalWithHead>
)

export default RejectedModal
