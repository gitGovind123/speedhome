import React from 'react'
import { HEADING_VIEW_IMAGE, HEADING_VIEW_VIDEO } from './index'
import PhotoIcon from '@material-ui/icons/Photo'
import VideoIcon from '@material-ui/icons/Videocam'
import MapIcon from '@material-ui/icons/Map'
import styles from './PropertyHeadingMediaAction.module.scss'

const PropertyHeadingMediaAction = props => {
  const { defaultHeadingView, videos, changeHeadingView, scrollToMaP } = props

  return (
    <section className={styles['propertyDetails__mediaActionWrapper']}>
      <div
        className={styles['propertyDetails__mediaActionWrapper--btnContainer']}
      >
        {/*<button
          onClick={() => {
            changeHeadingView(HEADING_VIEW_IMAGE)
          }}
          className={
            defaultHeadingView === HEADING_VIEW_IMAGE
              ? `${styles['propertyDetails__mediaActionWrapper--btn']} ${styles['propertyDetails__mediaActionWrapper--active']}`
              : styles['propertyDetails__mediaActionWrapper--btn']
          }
        >
          <PhotoIcon
            className={styles['propertyDetails__mediaActionWrapper--icon']}
          ></PhotoIcon>
          <span>Photos</span>
        </button>*/}
        {/* {videos && videos.length > 0 ? (
          <button
            onClick={() => changeHeadingView(HEADING_VIEW_VIDEO)}
            className={
              defaultHeadingView === HEADING_VIEW_VIDEO
                ? `${styles['propertyDetails__mediaActionWrapper--btn']} ${styles['propertyDetails__mediaActionWrapper--active']}`
                : styles['propertyDetails__mediaActionWrapper--btn']
            }
          >
            <VideoIcon
              className={styles['propertyDetails__mediaActionWrapper--icon']}
            ></VideoIcon>
            <span>Video</span>
          </button>
        ) : null} */}

        <button
          onClick={scrollToMaP}
          className={styles['propertyDetails__mediaActionWrapper--btn']}
        >
          <MapIcon
            className={styles['propertyDetails__mediaActionWrapper--icon']}
          ></MapIcon>
          <span>Map</span>
        </button>
      </div>
    </section>
  )
}

export default PropertyHeadingMediaAction
