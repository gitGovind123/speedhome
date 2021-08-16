import React from 'react'

const PropertyBannerVideo = props => {
  const { videos, styles } = props
  if (videos && videos.length > 0) {
    return (
      <div
        className='d-flex justify-content-center'
        style={{ height: '45vh', backgroundColor: '#424242' }}
      >
        <div
          className={`${styles['embed-responsive']}`}
          style={{
            paddingBottom: '45vh',
            width:
              typeof window !== 'undefined' &&
              window.innerHeight * 0.5 * (16 / 9)
          }}
          key={videos && videos[0].id}
        >
          <iframe
            className={styles['embed-responsive-item']}
            allowFullScreen
            src={videos && videos[0].url}
          ></iframe>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default PropertyBannerVideo
