import React, { useRef, useEffect } from 'react'
import ModalLayout from './ModalLayout'
import styles from './GotoChatModal.module.scss'

const ChatwithTenantModal = ({
  chatRequestId,
  name,
  budget,
  onClose,
  onSentChatReq
}) => {
  const myRef = useRef()

  const handleClickOutside = e => {
    if (!myRef.current.contains(e.target)) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  })

  return (
    <ModalLayout>
      <div
        ref={myRef}
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
        id='contactTenant'
      >
        <div className={styles['popup-header']}>Contact Tenant</div>
        <h3 className='user-title' style={{ lineHeight: '45px' }}>
          <span id='tenant-name'>{name}</span>&nbsp; is looking to rent around
          your area with a budget of RM
          <span id='tenant-budget'>&nbsp;{budget}</span>. Do you want to start a
          chat with him/her?
        </h3>
        <p>Communicate even quicker on the app</p>
        <div className='btn-wrapper mt-2'>
          <a
            id='chat-request'
            className='btn btn-primary-filled btn-big btn-holder btn-curv text-center'
            onClick={onSentChatReq}
          >
            Chat with tenant
          </a>
        </div>
        <input type='hidden' id='chatRequestID' defaultValue={chatRequestId} />
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
}

export default ChatwithTenantModal
