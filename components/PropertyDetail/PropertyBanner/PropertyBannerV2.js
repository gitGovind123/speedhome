import PropertyBannerImageCarosoul from './PropertyBannerImageCarosoul'
import PropertyBannerVideo from './PropertyBannerVideo'
import PropertyDetailActions from '../PropertyDetailActions'
import { HEADING_VIEW_IMAGE, HEADING_VIEW_VIDEO } from '../index'
import Loader from '../../Common/Loader'
import styles from './PropertyBannerV2.module.scss'
import { sendSearchTrackingActionLog } from '../../../utils/utils'

const PropertyBanner = props => {
  const {
    defaultHeadingView,
    galleryArr,
    setTargetGalleryIndex,
    caption,
    videos,
    handleFavourite,
    handleShare,
    isPropertyFavorite,
    isMobile,
    propertyRef,
    routerQuery
  } = props
  const openRestImageGallery = (e, index) => {
    const indexToOpen = index
    if (galleryArr.length === indexToOpen) {
      setTargetGalleryIndex(0)
    } else {
      setTargetGalleryIndex(indexToOpen)
    }
    sendSearchTrackingActionLog('picture_click', propertyRef, routerQuery)
  }
  return (
    <div
      className={styles['propertyDetails__coverWrapper']}
      id='propertyDetails__coverWrapperID'
    >
      {defaultHeadingView === HEADING_VIEW_IMAGE ? (
        <PropertyBannerImageCarosoul
          styles={styles}
          galleryArr={galleryArr}
          caption={caption}
          openRestImageGallery={openRestImageGallery}
          videos={videos}
        />
      ) : defaultHeadingView === HEADING_VIEW_VIDEO ? (
        <PropertyBannerVideo styles={styles} videos={videos} />
      ) : (
        <div
          style={{
            backgroundColor: '#fff',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Loader />
        </div>
      )}
      {isMobile ? (
        <div
          data-testid='propertyDetailsCoverWrapperActionIcon'
          className={styles['propertyDetails__coverWrapper--actionIcon']}
        >
          <PropertyDetailActions
            styles={styles}
            handleFavourite={handleFavourite}
            handleShare={handleShare}
            isPropertyFavorite={isPropertyFavorite}
          />
        </div>
      ) : null}
    </div>
  )
}

export default PropertyBanner
