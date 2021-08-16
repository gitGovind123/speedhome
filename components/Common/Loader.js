import React from 'react'

const Loader = () => (
  <div className='preloader text-center' style={{ width: '100%' }}>
    <img loading='lazy' src='/img/preloader.gif' alt={'Loading...'} />
  </div>
)

export default Loader
