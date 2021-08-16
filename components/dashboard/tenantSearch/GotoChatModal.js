import React from 'react'
import Link from 'next/link'
import ModalLayout from './ModalLayout'
import styles from './GotoChatModal.module.scss'

const GotoChatModal = ({ onClose }) => (
  <ModalLayout>
    <div
      className='white-popup text-center'
      style={{
        borderRadius: '15px',
        maxWidth: '420px',
        backgroundColor: '#fff',
        padding: '1rem  0',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%)`,
        overflow: 'hidden'
      }}
      id='submittedMessage'
    >
      <div className={styles['popup-header']}>Thank you</div>
      <div className={styles['user-faces']}>
        <img
          loading='lazy'
          alt='images'
          src={'/img/icons/paper-plane.svg'}
          width={65}
        />
      </div>
      <h3 className='user-title'>Thank you. Chat request sent successfully.</h3>
      <p>Communicate even quicker on the app</p>
      <div className='btn-wrapper mt-2'>
        <Link href={'/dashboard/chat'}>
          <a className='btn btn-primary-filled btn-big btn-holder btn-curv text-center'>
            Go to chat
          </a>
        </Link>
      </div>
      <button
        title='Close (Esc)'
        type='button'
        className='mfp-close'
        onClick={onClose}
      >
        ×
      </button>
    </div>
  </ModalLayout>
)

export default GotoChatModal
