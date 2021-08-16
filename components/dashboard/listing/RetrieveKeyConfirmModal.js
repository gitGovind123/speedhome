import React from 'react'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'
import PropertyDetailModalWithHead from '../../PropertyDetail/PropertyDetailModalWithHead'

const RetrieveKeyConfirmModal = props => {
  const { propertyRefId, show, onHide } = props

  return (
    <PropertyDetailModalWithHead
      title={'Are you sure you want your key back?'}
      isOpen={show}
      handleClose={onHide}
      centered
    >
      <p className='font-16 mb-3'>
        SPEEDHOME will not be able to help you for the viewing anymore
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}
      >
        <Link
          href={{
            pathname: `'/post/homerunner/${propertyRefId}`,
            query: { KOH: true }
          }}
          passHref
        >
          <a className='btn btn-primary-filled btn-holder btn-curv text-center mr-2'>
            Yes
          </a>
        </Link>

        <Button variant='dark' onClick={onHide}>
          No
        </Button>
      </div>
    </PropertyDetailModalWithHead>
  )
}

export default RetrieveKeyConfirmModal
