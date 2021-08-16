import React, { useState, useEffect, useRef } from 'react'
import { Card } from 'react-bootstrap'

import Icon from '../Common/Icons/Icons'

import dayjs from 'dayjs'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import VisibilityIcon from '@material-ui/icons/Visibility'
import ChatIcon from '@material-ui/icons/Chat'
import MoreIcon from '@material-ui/icons/MoreHoriz'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder'
import ShareIcon from '@material-ui/icons/Share'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import OutsideClickHandler from 'react-outside-click-handler'
import HighlightOff from '@material-ui/icons/HighlightOff'
import withSizes from 'react-sizes'

import { deleteFavorite, getFavPropertyList, checkPropertyIsFavoriteOrNot, addToFavorite } from '../../actions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CONST from '../../globalutilities/consts'
import { getToken, getUserId,logOut } from '../../globalutilities/helpers'
import * as authActions from '../../actions/authActions'

import * as homeRunnerActions from '../../actions/homeRunnerActions'

import { priceSplit, hasAdds } from '../../globalutilities/helpers'

import { getPropertyNameLink } from '../Common/Helper'
import PropertyListGallery from './PropertyListGallery'
import PropertyApprovalStatus from '../Common/PropertyApprovalStatus'
import MyAuctionStats from './MyAuctionStats'
import MobileToolTip from './MobileToolTip'
import styles from './PropertyListItem.module.scss'
import { isAfterToday } from '../../utils/utils'

const PropertyListFavorite = props => {
  const {
    data,
    isNearbyPage,
    router,
    mapViewModal = false,
    isRecomended = false,
    url,
    showToolTip,
    isMobile,
    isRecommendedPropertyItem,
    propertyDetailRef
  } = props
  const [isVerifiedPostalCode, setIsVerifiedPostalCode] = useState(false)
  const [isFavoriteCheck, setIsFavoriteCheck] = useState(false)
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [dropDownOpenFor, setDropDownOpenFor] = useState('')
  const [mobileToolTip, setMobileToolTip] = useState(false)
  const [mobileToolTipContent, setMobileToolTipContent] = useState(null)
  const { t } = useTranslation('common')

  useEffect(async () => {

    if (getUserId()) {

      const favData = await checkPropertyIsFavoriteOrNot(data.id)

      if (favData){
        if (favData.favorite){
          setIsFavoriteCheck(true);
        }
      }
      else {
        setIsFavoriteCheck(false);
      }

    }

  }, [])

  const onFavAdd = async propertyId => {

    if (getUserId()) {
      
      const response = await addToFavorite({
        propertyId: propertyId
      })

      toast(
        response && response.success
          ? 'Property successfully added to favourites'
          : (response && response.message) || 'Something went wrong',
        {
          autoClose: CONST.ToastTimeout,
          type:
            response && response.success
              ? toast.TYPE.SUCCESS
              : toast.TYPE.ERROR
        }
      )
      setIsFavoriteCheck(true);

    } else {
      
      props.authActions.openLoginModal({
        countryData: null,
        phoneNumber: null,
        request: true,
        originClick: 'cr',
        disableClose: false,
        isCallFavApi: true
      })
    }
    
  }

  const onFavRemove = async propertyId => {

    const data = await checkPropertyIsFavoriteOrNot(propertyId)

    const response = await deleteFavorite(data.favorite.id)

    toast(
      response.success
        ? 'Property successfully removed from favourites'
        : response.message || 'Something went wrong',
      {
        autoClose: CONST.ToastTimeout,
        type: response.success ? toast.TYPE.SUCCESS : toast.TYPE.ERROR
      }
    )
    setIsFavoriteCheck(false);
  }
  let favIcon;

  if(router.asPath.includes('/dashboard/favorites')){
    favIcon = <span>
                  <FavoriteIcon
                    id='propId'
                    onClick={props.onFavEvent}
                    className={styles['Propertylist__item__fav']}
                  />
                </span>
  }
  else if(router.asPath.includes('/dashboard/listings')) {
    favIcon = <div className={styles['action_icon_wrap']}>
    <Link href={props.editListAsLinkForProperty}>
      <EditIcon
        data-testid='propertyListingEditIcon'
        className={styles['share--actionIcon--icon']}
      />
    </Link>
    {props.type !== 'INACTIVE' ? (
      <DeleteIcon
      data-testid='propertyListingArchiveIcon'
      onClick={() => props.onPropertyUpdate(data.id, 'archive')}
      className={styles['share--actionIcon--icon']}
    />
    ) : null}
    {props.type === 'ACTIVE' ? (
      <ShareIcon
      data-testid='propertyListingShareIcon'
      onClick={() => props.onShare(data)}
      className={styles['share--actionIcon--icon']}
    />
    ) : null}
    </div>
  }
  else {
    favIcon = <>
                {isFavoriteCheck ? (
                  <span>
                    <FavoriteIcon
                      id='propId'
                      onClick={e => {
                        e.preventDefault()
                        onFavRemove(data.id)
                      }}
                      className={`${styles['Propertylist__item__fav']} fav_common`}
                    />
                    
                  </span>
                ) : (
                  <FavoriteIconBorder
                      data-testid='propertyDetailFavouriteIcon'
                      onClick={e => {
                        e.preventDefault()
                        onFavAdd(data.id)
                      }}
                      className={`${styles['Propertylist__item__non_fav']} fav_common`}
                    />
                )}
                </>
  }

  return (
    <>
    {favIcon}
    </>
  )
}


const mapSizesToProps = ({ width }) => ({
  isMobile: width <= 1024
})

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withSizes(mapSizesToProps)(PropertyListFavorite))

