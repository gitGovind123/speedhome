import React from 'react'

const Modal = ({ children, style }) => (
  <div>
    <div className='mfp-bg mfp-ready' style={{ zIndex: '1042 !important' }} />
    <div
      className='mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready'
      tabIndex='-1'
      style={style}
    >
      <div className='mfp-container mfp-s-ready mfp-inline-holder'>
        <div className='mfp-content'>{children}</div>
        <div className='mfp-preloader'>Loading...</div>
      </div>
    </div>
  </div>
)

export default Modal
