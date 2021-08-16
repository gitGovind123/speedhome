import React from 'react'
import Link from 'next/link'
import { Modal, Button } from 'react-bootstrap'

const MyAuctionStats = props => {
  const { show, onHide } = props

  return (
    <Modal
      show={show}
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered={false}
      className='retrieve-key-modal-style'
    >
      <Modal.Body className='text-center py-5'>
        <h4 className='d-block mb-2 font-weight-bold'>
          Are you sure you want your key back?
        </h4>
        <p className='font-16 mb-3'>
          SPEEDHOME will not be able to help you for the viewing anymore
        </p>
        <Link
        //   href={{
        //     pathname: `${t(
        //       'link_dashboard_tenanthomerunner'
        //     )}${propertyRefId}`,
        //     query: { KOH: true }
        //   }}
        //   passHref
        >
          <a className='btn btn-primary-filled btn-holder btn-curv text-center mr-2'>
            Yes
          </a>
        </Link>

        <Button variant='dark' onClick={onHide}>
          No
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default MyAuctionStats
