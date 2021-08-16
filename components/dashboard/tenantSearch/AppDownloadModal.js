import React from 'react'
import { Col, Row } from 'react-bootstrap'
import CloseIcon from '@material-ui/icons/Close'
import ModalLayout from './ModalLayout'
const APP_URL = 'https://speedhome.app.link/getmoretsquota'

const AppDownloadModal = ({ onClose, style }) => (
  <ModalLayout>
    <div
      className='white-popup text-center tenant_search_limit_modal'
      style={{
        borderRadius: '15px',
        maxWidth: '420px',
        backgroundColor: '#fff',
        padding: '1rem  0',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%)`
      }}
    >
      <p>
        <a
          className='close pr-1 ml-2'
          style={{
            color: '#000'
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </a>
      </p>
      <h3
        className='user-title'
        style={{
          fontWeight: '500',
          fontSize: '24px'
        }}
      >
        You have reached the limit to send chat request to tenant{' '}
      </h3>
      <p className='mt-4'>
        Download SPEEDHOME App FREE for exclusive benefits now!{' '}
      </p>
      <Row className='justify-content-md-center'>
        <Col md={12}>
          <a href={APP_URL} target='_blank'>
            <img loading='lazy' src={'/img/appStore.png'} alt='images' />
          </a>
          <a href={APP_URL} target='_blank'>
            <img loading='lazy' src={'/img/googlePlay.png'} alt='images' />
          </a>
        </Col>
      </Row>
    </div>
  </ModalLayout>
)

export default AppDownloadModal
