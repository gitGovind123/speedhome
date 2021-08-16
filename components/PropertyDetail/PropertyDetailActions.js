import { useState, useEffect } from 'react'
import FavoriteFullIcon from '@material-ui/icons/Favorite'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import ShareIcon from '@material-ui/icons/Share'
import { getUserId } from '../../globalutilities/helpers'

const PropertyDetailActions = props => {
  const { handleFavourite, handleShare, styles, isPropertyFavorite } = props
  const [showFav, setShowFav] = useState(false)
  useEffect(() => {
    if (getUserId()) {
      setShowFav(isPropertyFavorite)
    }
  }, [isPropertyFavorite])
  return (
    <>
      {showFav ? (
        <FavoriteFullIcon
          data-testid='propertyDetailFavouriteIcon'
          style={{ color: 'red' }}
          onClick={handleFavourite}
        />
      ) : (
        <FavoriteIcon
          data-testid='propertyDetailFavouriteIcon'
          className={styles['propertyDetails__coverWrapper--actionIcon--icon']}
          onClick={handleFavourite}
        />
      )}
      <ShareIcon
        data-testid='propertyDetailShareIcon'
        onClick={handleShare}
        className={styles['propertyDetails__coverWrapper--actionIcon--icon']}
      />
    </>
  )
}

export default PropertyDetailActions
