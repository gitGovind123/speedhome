import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import ImageGallery from 'react-image-gallery'
import OutsideClickHandler from 'react-outside-click-handler'
import 'react-image-gallery/styles/css/image-gallery.css'

const PropertyDetailsImageGaller = props => {
  const {
    caption,
    galleryArr,
    showGallery,
    setShowGallery,
    targetGalleryIndex
  } = props

  let newGalleryArr = []

  galleryArr.map(image => {
    newGalleryArr.push({
      original: image.url,
      originalAlt: caption,
      thumbnail: image.url,
      description: caption
    })
  })

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'black',
        display: showGallery ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
    >
      <OutsideClickHandler onOutsideClick={() => setShowGallery(false)}>
        <CloseIcon
          style={{
            position: 'absolute',
            left: '2rem',
            top: '1rem',
            height: '3rem',
            width: '3rem',
            color: '#fff',
            cursor: 'pointer',
            zIndex: 99999
          }}
          onClick={() => setShowGallery(false)}
        />
        <ImageGallery
          showIndex
          items={newGalleryArr}
          startIndex={targetGalleryIndex}
          lazyLoad={true}
        />
      </OutsideClickHandler>
    </div>
  )
}

export default PropertyDetailsImageGaller
