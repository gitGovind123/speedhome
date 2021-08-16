import React, { Component, useEffect } from 'react'
import { Col, Row, ProgressBar } from 'react-bootstrap'

import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import _ from 'lodash'
import dayjs from 'dayjs'
import moment from 'moment'
import { scroller } from 'react-scroll'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import swal from 'sweetalert2'
import { getPropertyInfo, setTime } from '../../actions/property'

import PropertyDetailActions from './PropertyDetailActions'

import withSizes from 'react-sizes'

import Image from 'next/image'
import ChatForm from './ChatRequestPopup'
import { getLocalStorageForCr, getPropertyNameLink } from '../Common/Helper'
import './PropertyDetails.module.scss'

import {
  getUserId,
  getAreaByPostcode,
  getToken,
  getClickId,
  getDeviceId
} from '../../globalutilities/helpers'

// import LoginModal from '../Login/Login'
import {
  sendChatRequestForSellAPI,
  sendChatRequestAPI,
  subscribeListingAlert,
  checkAppointment,
  updateInstantViewTime as updateInstantViewTimeApiCall,
  updateInstallSource,
  sendAuctionBidAPI
} from '../../api/chatRequest'
import CONST from '../../globalutilities/consts'
import {
  submitUserProfile,
  checkPropertyIsFavoriteOrNot,
  addToFavorite,
  getRecommendedProperties,
  getRecommendedSmartProperties,
  getUserProfile,
  userEventTracking,
  createReferral
} from '../../actions'

import * as authActions from '../../actions/authActions'
import { deleteFavorite } from '../../actions/favorites'
import {
  dengageConvertedDate,
  getFlashSalesDetails,
  getRefQueryParams,
  handleInstantViewPopupClose,
  triggerDengageEvents,
  triggerGTAG
} from '../../utils/utils'

// Icon
import Icon from '../Common/Icons/Icons'

import PropertyBanner from './PropertyBanner/PropertyBannerV2'
import PropertyDetailsBreadCrumb from './PropertyDetailsBreadCrumb'
import PropertyDetailsImageGallery from './PropertyDetailsImageGallery'
import PropertyHeadingMediaAction from './PropertyHeadingMediaAction'
import PropertyDetailsInfo from './PropertyDetailsInfo'
import PropertyDetailsAddress from './PropertyDetailsAddress'
import ToMoveInComponent from './ToMoveInComponent'

import Cookies from 'js-cookie'
const ProfileInfo = dynamic(() => import('./ProfileInfo'))
const InstantViewRequestModal = dynamic(() =>
  import('./InstantViewRequestModal')
)
const GroupAppointment = dynamic(() => import('./GroupAppointment'))
const RequestSent = dynamic(() => import('./RequestSent'))
const AllInOneGuideModal = dynamic(() => import('./AllInOneGuideModal'))
const RestrictedModal = dynamic(() => import('../Common/RestrictedModal'))
const EmailPopUp = dynamic(() => import('../Common/EmailPopUp'))
const SharePopup = dynamic(() => import('./SharePopup'))

const ShowRecommendedPropertyForChatRequest = dynamic(() =>
  import('./ShowRecommendedPropertyForChatRequest')
)
const PropertyDetailSmartRecommendedProperties = dynamic(
  () => import('./PropertyDetailSmartRecommendedProperties'),
  { ssr: false }
)

const PropertyDetailRecommendedProperties = dynamic(
  () => import('./PropertyDetailRecommendedProperties'),
  { ssr: false }
)

const PageViewCountForSearchTracking = dynamic(
  () => import('./PageViewCountSearchTracking'),
  { ssr: false }
)

export const HEADING_VIEW_IMAGE = 'HEADING_VIEW_IMAGE'
export const HEADING_VIEW_VIDEO = 'HEADING_VIEW_VIDEO'

import styles from './PropertyDetails.module.scss'
import { AUTH_SERVER } from '../../env'
import { sendSearchTrackingActionLog } from '../../utils/utils'

class PropertyDetailsComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showChatPopup: false,
      showChatRequestSuccessPopup: false,
      showMultiChatRequestPopup: false,
      isChatRequestSuccess: false,
      isMultiChatRequestSuccess: false,
      showSharePopup: false,
      showInstantViewPopup: false,
      showGroupAppointmentPopup: false,
      recommendedProperties: [],
      recommendedPropertiesForChatReq: [],
      chatRequestPayload: [],
      phoneNo: '',
      countryData: {},
      subscribeListing: false,
      isPropertyFavorite: false,
      isHovered: false,
      isShowProfileInfoModal: false,
      profile: {},
      isAllInOneGuide: false,
      isShowErrorMessage: false,
      propertyId: '',
      chatRequestPopupIsSubmit: false,
      instantViewRequestModalSubmit: false,
      showGroupAppointmentPopupSubmit: false,
      isFlashSalesActive: false,
      defaultHeadingView: HEADING_VIEW_IMAGE,
      showGallery: false,
      targetGalleryIndex: 0,
      isImages: true,
      isVideos: false,
      openEmailPopUpModal: false,
      isGetPhoneNumber: false,
      isChatRequestFinished: false,
      flashSalesPrice: null,
      flashSalesRemainingDuration: null,
      flashEventInfo: {
        textAnnouncementEn: '',
        textAnnouncementMy: '',
        textAnnouncementZh: '',
        textCountdownEn: '',
        textCountdownMy: '',
        textCountdownZh: '',
        textFlashBannerEn: '',
        textFlashBannerMy: '',
        textFlashBannerZh: ''
      }
    }
  }

  scrollToMaP = () => {
    scroller.scrollTo('scroll-to-element', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -100
    })
  }
  sendChatRequest = (data, countryData, phoneNo, subscribeListing) => {
    this.setState(
      {
        chatRequestPayload: data,
        phoneNo: phoneNo,
        countryData: countryData,
        subscribeListing: subscribeListing,
        chatRequestPopupIsSubmit: true
      },
      async () => {
        const token = getToken()
        if (!token) {
          this.closePopup('showChatPopup')
          const postData = {
            chatRequestPayload: data,
            id: this.props.propertyInfo.id,
            phoneNo: phoneNo,
            countryData: countryData,
            subscribeListing: subscribeListing
          }
          localStorage.setItem('originClickCR', JSON.stringify(postData))

          const refParams = getRefQueryParams()

          setTimeout(() => {
            const currentPath = window.location.href
            const constructUrl = `${AUTH_SERVER}?originType=SH&origin=${currentPath}&originClickCR=true${refParams}`
            window.location.href = constructUrl
          }, 50)
        } else {
          const { profile, chatRequestPayload } = this.state
          const updateProfile = {
            occupation: chatRequestPayload.occupation || '',
            country: chatRequestPayload.fromCountry || ''
          }
          await submitUserProfile(updateProfile)
          if (!(profile && profile.id)) {
            const info = await getUserProfile()
            this.setState({
              profile: info.success ? info.data : {}
            })
          }
          this.chatRequestSubmit()
        }
      }
    )
  }
  chatRequestSubmitAfterLogin = () => {
    const token = getToken()
    if (token) {
      if (this.props.propertyInfo.type.toLowerCase().includes('_sale')) {
        this.buySellChatRequest()
      } else {
        this.chatRequestSubmit()
      }
    } else {
      this.handleRequestError()
    }
  }
  checkAppointmentMethod = () => {
    let propertyData = this.props.propertyInfo || {}
    const {
      profile,
      chatRequestPayload,
      phoneNo,
      countryData,
      subscribeListing
    } = this.state
    if (propertyData) {
      const id = propertyData.id
      checkAppointment(id).then(res => {
        if (res.Appointments && res.Appointments.length > 0) {
          this.openPopup('showGroupAppointmentPopup', {
            appointmentsList: res.Appointments
          })
        } else if (profile && profile.id) {
          this.checkAndOpenInstantViewPopup()
        } else {
          this.sendChatRequest(
            chatRequestPayload,
            phoneNo,
            countryData,
            subscribeListing
          )
        }
      })
    }
  }
  chatRequestSubmit = () => {
    if (this.state.chatRequestPayload) {
      const accessTradeId = getClickId() || ''
      const chatRequestDataPayload = {
        ...this.state.chatRequestPayload,
        accessTradeId: accessTradeId,
        source_type: this.props.router?.query?.source_type || 'null',
        source_ref: this.props.router?.query?.source_ref || 'null',
        search_session_id: Cookies.get('searchSessionId') || 'null',
        visitor_id: Cookies.get('visitorId') || 'null'
      }
      if (this.props.router.asPath.includes('/rental-bidding')) {
        const auctionId = this.props.propertyInfo.auctionData.id

        const data = {
          fromCountry: chatRequestDataPayload.fromCountry
            ? chatRequestDataPayload.fromCountry
            : 'Malaysia',
          isChatRequestCreated: true,
          movingDate: chatRequestDataPayload.movingDate,
          occupation: chatRequestDataPayload.occupation,
          price: chatRequestDataPayload.budget,
          userId: getUserId()
        }
        sendAuctionBidAPI(auctionId, data)
          .then(res => {
            this.handleRequestSuccess()

            swal
              .fire({
                position: 'center',
                icon: 'success',

                text: 'Bid submitted successfully!',
                showConfirmButton: true,
                allowOutsideClick: true
              })
              .then(() => {
                this.props.router.reload()
              })
          })
          .catch(err => console.log(err))
      } else {
        sendChatRequestAPI(chatRequestDataPayload)
          .then(response => {
            let rrid = Cookies.get('rrid')
            let ajReferralCode = Cookies.get('ajreferral')
            if (rrid) {
              let payload = {
                source: rrid,
                referralCode: ajReferralCode
              }
              createReferral(payload)
            }
            triggerGTAG({
              event: 'ChatWithOwnerSubmit'
            })
            triggerGTAG({
              event: 'ChatRequest_All'
            })
            // main
            triggerDengageEvents('speed_rent_cr', {
              event_name: 'submit_CR_2',
              name: this.props.user ? this.props.user.name : '',
              phone_number:
                this.props.user && this.props.user.phoneNumber
                  ? this.props.user.phoneNumber
                  : '',
              email_address:
                this.props.user && this.props.user.email
                  ? this.props.user.email
                  : '',
              date: dengageConvertedDate(),
              move_in_date: chatRequestDataPayload.movingDate,
              tenancy_duration: chatRequestDataPayload.tenancyDuration
            })

            const { type, price } = this.props.propertyInfo
            if (
              (type === 'HIGHRISE' || type === 'LANDED') &&
              parseInt(price) >= 800 &&
              parseInt(price) <= 5000
            ) {
              triggerGTAG({
                event: 'submitChatRequestNoDeposit',
                propertyId:
                  this.props.propertyInfo && this.props.propertyInfo.id,
                propertyName:
                  this.props.propertyInfo && this.props.propertyInfo.name
              })
            }

            this.handleRequestSuccess()
            triggerGTAG({
              event: 'Chat_With_Owner',
              email: this.state.profile.email,
              propertyName: this.props.propertyInfo.name,
              occupation: chatRequestDataPayload.occupation,
              nationality: chatRequestDataPayload.fromCountry,
              budget: chatRequestDataPayload.budget,
              moveInDate: dayjs(chatRequestDataPayload.movingDate).format(
                'DD/MM/YYYY'
              )
            })
            if (this.state.subscribeListing) {
              this.subscribeListingAlertMethod()
            } else {
              this.checkAppointmentMethod()

              // checkAppointment()
            }
            //TODO to call instant view
          })
          .catch(error => {
            if (error.response) {
              const message = error.response.data.message
                ? error.response.data.message
                : ''
              this.handleRequestError(message)
            }
          })
      }
    }
  }

  checkAndOpenInstantViewPopup = () => {
    // if (propertyData.instantView) {
    this.openPopup('showInstantViewPopup')
    // }
  }
  subscribeListingAlertMethod = (returnedEmail = '') => {
    let propertyData = this.props.propertyInfo
    if (propertyData) {
      let minPrice = 0,
        maxPrice = 0
      if (propertyData.price) {
        minPrice = propertyData.price - (propertyData.price * 30) / 100
        maxPrice = propertyData.price + (propertyData.price * 30) / 100
      }
      let hasEmail = false
      let userEmail = ''

      if (this.props.user && this.props.user.email) {
        hasEmail = true
        userEmail = this.props.user.email
      } else {
        if (returnedEmail) {
          hasEmail = true
          userEmail = returnedEmail
        } else {
          this.setState({
            openEmailPopUpModal: true
          })
        }
      }
      if (hasEmail && userEmail) {
        let alertData = {
          email: userEmail || '',
          searchFilter: {
            //needed
            keywords: propertyData.name,
            types: [propertyData.type],
            carPark: propertyData.carpark,
            bedroom: propertyData.bedroom,
            bathroom: propertyData.bathroom,
            bathroomType: propertyData.bathroomType,
            minPrice: minPrice,
            maxPrice: maxPrice,
            furnishType: propertyData.furnishType
          },
          contextType: 'NONE',
          userId:
            this.props.user && this.props.user.id ? this.props.user.id : ''
        }
        subscribeListingAlert(alertData)
          .then(response => {
            this.checkAppointmentMethod()
          })
          .catch(error => {})
      }
    }
  }
  handleRequestError = (message = '') => {
    this.closePopup('showChatPopup')
    if (message && message.length > 0 && this.state.showChatPopup) {
      this.setState({
        isShowErrorMessage: true
      })
    }
  }
  handleRequestSuccess = () => {
    this.closePopup('showChatPopup')
  }
  handleRecommendedSmartPropertiesChatReq = res => {
    this.setState({
      recommendedPropertiesForChatReq: res.success
        ? _.cloneDeep(res.data ? res.data : [])
        : [],
      isRecommended: true
    })
  }

  handleRecommendedPropertiesChatReq = res => {
    this.setState({
      recommendedPropertiesForChatReq: res.success
        ? _.cloneDeep((res.data && res.data.content) || [])
        : [],
      isRecommended: true
    })
  }
  async componentDidMount () {
    const object = {}
    this.props &&
      this.props.router &&
      this.props.router.query &&
      this.props.router.query.openChatModal &&
      !getToken() &&
      this.openPopup('showChatPopup', { isSubmit: false })
    userEventTracking('ViewListing', this.props.propertyInfo.id)
    const info = getToken() && (await getUserProfile())
    let isSale = false
    if (
      this.props.propertyInfo.type === 'LANDED_SALE' ||
      this.props.propertyInfo.type === 'HIGHRISE_SALE'
    ) {
      isSale = true
    }
    const coverPhoto =
      (this.props.propertyInfo.images &&
        this.props.propertyInfo.images.find(img => img.coverPhoto)) ||
      {}
    let propertyFurnish = 'basic'
    if (this.props.propertyInfo && this.props.propertyInfo.furnishType) {
      if (this.props.propertyInfo.furnishType === 'NONE') {
        propertyFurnish = 'basic'
      } else if (this.props.propertyInfo.furnishType === 'PARTIAL') {
        propertyFurnish = 'partial'
      } else if (this.props.propertyInfo.furnishType === 'FULL') {
        propertyFurnish = 'full'
      }
    }

    triggerGTAG({
      event: 'viewContent',
      type: isSale ? 'buy' : 'rent',
      propertyId: this.props.propertyInfo.id ? this.props.propertyInfo.id : '',
      propertyName: this.props.propertyInfo.name
        ? this.props.propertyInfo.name
        : '',
      propertyAddress: this.props.propertyInfo.address
        ? this.props.propertyInfo.address
        : '',
      propertyArea: this.props.propertyInfo.postcode
        ? this.props.propertyInfo.postcode
        : '',
      propertyType: this.props.propertyInfo.type
        ? this.props.propertyInfo.type.toLowerCase()
        : '',
      propertyFurnish: propertyFurnish,
      propertyPrice: this.props.propertyInfo.price
        ? this.props.propertyInfo.price
        : '',
      propertyBedroom: this.props.propertyInfo.bedroom
        ? this.props.propertyInfo.bedroom
        : 1,
      propertyBathroom: this.props.propertyInfo.bathroom
        ? this.props.propertyInfo.bathroom
        : 1,
      propertyCarpark: this.props.propertyInfo.carpark
        ? this.props.propertyInfo.carpark
        : 0,
      propertyAvailability: dayjs(this.props.propertyInfo.availability).format(
        'DD/MM/YYYY'
      ),
      propertyImageUrl: coverPhoto ? coverPhoto.url : '',
      propertyExtraInformation:
        this.props.propertyInfo.furnishes &&
        this.props.propertyInfo.furnishes.length > 0
          ? this.props.propertyInfo.furnishes.toString()
          : ''
    })

    object.profile = info && info.success ? info.data : {}
    if (Object.keys(object).length) {
      this.setState(object)
    }

    const flashSalesData = getFlashSalesDetails()
    flashSalesData.then(res => {
      if (res?.offerIsActive && res?.offerPrice === 399) {
        this.setFlashEventInfo(res)
        const currentDateTime = new Date(res.currentDateTime)
        const eventEndDateTime = new Date(res.eventEndDateTime)
        const diff = Math.floor(
          (eventEndDateTime.getTime() - currentDateTime.getTime()) /
            (1000 * 60 * 60 * 24)
        )
        this.setState({
          flashSalesRemainingDuration: diff
        })
      }
    })
  }

  setFlashEventInfo = res => {
    this.setState({
      flashEventInfo: {
        textAnnouncementEn: res.textAnnouncementEn,
        textAnnouncementMy: res.textAnnouncementMy,
        textAnnouncementZh: res.textAnnouncementZh,
        textCountdownEn: res.textCountdownEn,
        textCountdownMy: res.textCountdownMy,
        textCountdownZh: res.textCountdownZh,
        textFlashBannerEn: res.textFlashBannerEn,
        textFlashBannerMy: res.textFlashBannerMy,
        textFlashBannerZh: res.textFlashBannerZh
      },
      isFlashSalesActive: res.offerIsActive,
      flashSalesPrice: res.offerPrice
    })
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  async componentDidUpdate (props, prevState) {
    const object = {}
    if (
      props.user &&
      props.user.id &&
      props.propertyInfo &&
      props.propertyInfo.id !== prevState.propertyId
    ) {
      const data = await checkPropertyIsFavoriteOrNot(props.propertyInfo.id)
      object.isPropertyFavorite = !!(data && data.favorite) || false
      object.propertyId = props.propertyInfo.id || ''
      object.favorite = data.favorite
    }
    if (Object.keys(object).length) {
      this.setState({
        ...object
      })
    }
    let isCallFavApi =
      props &&
      props.router &&
      props.router.query &&
      props.router.query.isCallFavApi &&
      props.router.query.isCallFavApi.includes('true')
    if (isCallFavApi && Cookies.get('id') && Cookies.get('authToken')) {
      this.favRequest()
    }
    if (this.props.token !== props.token) {
      if (this.props.token) {
        getLocalStorageForCr(this.sendChatRequest, this.props.propertyInfo)
      }
    }
  }
  openPopup = (popup, extraAttrs = {}) => {
    if (popup === 'showChatPopup') {
      this.setState({
        [popup]: true,
        ...extraAttrs,
        chatRequestPopupIsSubmit: false
      })
    } else {
      this.setState({ [popup]: true, ...extraAttrs })
    }
  }
  closePopup = (popup, extraAttrs = {}) => {
    this.setState({
      [popup]: false,
      ...extraAttrs,
      chatRequestPopupIsSubmit: false,
      instantViewRequestModalSubmit: false,
      showGroupAppointmentPopupSubmit: false
    })
  }
  chatRequestFormSubmitHandler = (book, isGetPhoneNumberFlag = false) => {
    triggerDengageEvents('speed_rent_cr', {
      event_name: 'submit_cr_1',
      name: this.props.user ? this.props.user.name : '',
      phone_number:
        this.props.user && this.props.user.phoneNumber
          ? this.props.user.phoneNumber
          : '',
      email_address:
        this.props.user && this.props.user.email ? this.props.user.email : '',
      book_viewing_date: dengageConvertedDate(),
      property_furnishing: this.props.propertyInfo.furnishes.join(','),
      property_facilities: this.props.propertyInfo.facilities.join(','),
      property_value: this.props.propertyInfo.price,
      property_location_name: this.props.propertyInfo.price.address,
      property_type: this.props.propertyInfo.type
    })
    sendSearchTrackingActionLog(
      'crclick',
      this.props.propertyInfo?.ref,
      this.props.router?.query
    )

    this.setState({
      isGetPhoneNumber: isGetPhoneNumberFlag
    })
    let isUserLocked = false
    if (getToken() && this.props.user && this.props.user.locked) {
      isUserLocked = true
    }

    if (isUserLocked) {
      this.props.authActions.showWarningModal(true)
    } else {
      if (
        !this.props.propertyInfo.type.toLowerCase().includes('_sale') &&
        getToken()
      ) {
        this.openPopup('showChatPopup', { isSubmit: false })
      } else {
        if (!getToken()) {
          this.setState({
            showChatPopup: true
          })
          // this.login.handleShowLoginModal(null, null, true)
        } else {
          this.buySellChatRequest()
        }
      }
    }
  }
  getPhoneNumberHandler = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title:
        'Phone number will be shared after viewing appointment is confirmed.',
      showConfirmButton: false,
      allowOutsideClick: true,
      showCloseButton: true,
      timer: 15000
    })
  }
  buySellChatRequest = () => {
    let chatRequestPayload = {
      propertyId: this.props.propertyInfo ? this.props.propertyInfo.id : null
    }
    if (chatRequestPayload) {
      sendChatRequestForSellAPI(chatRequestPayload)
        .then(response => {
          this.updateInstallSourceMethod()
          this.openPopup('showChatRequestSuccessPopup', {
            isChatRequestSuccess: true
          })
          userEventTracking('ChatRequest', this.props.propertyInfo.id)
        })
        .catch(error => {
          this.openPopup('showChatRequestSuccessPopup', {
            isChatRequestSuccess: false
          })
        })
    }
  }
  onFavAdd = async () => {
    const { propertyId, isPropertyFavorite } = this.state
    this.setState(
      {
        isLoading: true
      },
      async () => {
        const response = await addToFavorite({
          propertyId: propertyId || this.props.propertyInfo.id
        })
        this.setState({
          isLoading: false,
          isPropertyFavorite:
            response && response.success ? true : isPropertyFavorite,
          favorite: (response && response.data) || {}
        })

        triggerDengageEvents('fav_property', {
          event_name: 'fav_property',
          name: this.props.user ? this.props.user.name : '',
          phone_number:
            this.props.user && this.props.user.phoneNumber
              ? this.props.user.phoneNumber
              : '',
          email_address:
            this.props.user && this.props.user.email
              ? this.props.user.email
              : '',
          property_value: this.props.propertyInfo.price,
          property_area: this.props.propertyInfo.address,
          property_type: this.props.propertyInfo.type
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
      }
    )
  }
  onFavRemove = async () => {
    const { favorite, isPropertyFavorite } = this.state

    if (!(favorite && favorite.id)) {
      return
    }

    this.setState(
      {
        isLoading: true
      },
      async () => {
        const response = await deleteFavorite(favorite.id)
        this.setState({
          isLoading: false,
          isPropertyFavorite:
            response && response.success ? false : isPropertyFavorite
        })
        toast(
          response && response.success
            ? 'Property successfully removed from favourites'
            : (response && response.message) || 'Something went wrong',
          {
            autoClose: CONST.ToastTimeout,
            type:
              response && response.success
                ? toast.TYPE.SUCCESS
                : toast.TYPE.ERROR
          }
        )
      }
    )
  }
  handleFavAction = async e => {
    e.preventDefault()
    if (getUserId()) {
      this.favRequest()
    } else {
      this.props.authActions.openLoginModal({
        countryData: null,
        phoneNumber: null,
        request: true,
        originClick: 'cr',
        disableClose: false,
        isCallFavApi: true
      })
    }
  }

  favRequest = async () => {
    if (this.state.isPropertyFavorite) {
      await this.onFavRemove()
    } else {
      await this.onFavAdd()
    }
  }

  submitNewAppointMent = (dateAndTime, { group, submitType }) => {
    if (submitType === 'instantViewRequestModalSubmit') {
      this.setState({
        instantViewRequestModalSubmit: true
      })
    } else if (submitType === 'showGroupAppointmentPopupSubmit') {
      this.setState({
        showGroupAppointmentPopupSubmit: true
      })
    }

    let appointMentTimeAndDate = ''
    if (group) {
      appointMentTimeAndDate = moment(dateAndTime).format('YYYY-MM-DDTHH:mm:ss')
    } else {
      const formattedDate = moment(dateAndTime.appointmentDate).format(
        'DD/MM/YYYY'
      )
      appointMentTimeAndDate = moment(
        formattedDate + ' ' + dateAndTime.appointmentTime,
        'DD/MM/YYYY HH:mm:ss a'
      ).format('YYYY-MM-DDTHH:mm:ss')
    }

    let propertyData = this.props.propertyInfo || {}
    if (propertyData) {
      const id = propertyData.id
      const userId = getUserId() || {}
      const data = {
        propertyId: id,
        time: appointMentTimeAndDate,
        userId: userId
      }
      updateInstantViewTimeApiCall(data)
        .then(response => {
          if (response) {
            triggerGTAG({
              event: 'appointmentTimeSubmit'
            })
            triggerGTAG({
              event: 'ChatRequest_All'
            })
            triggerDengageEvents('speed_rent_cr', {
              event_name: 'submit_cr_3',
              name: this.props.user ? this.props.user.name : '',
              phone_number:
                this.props.user && this.props.user.phoneNumber
                  ? this.props.user.phoneNumber
                  : '',
              email_address:
                this.props.user && this.props.user.email
                  ? this.props.user.email
                  : '',
              viewing_time: dateAndTime.appointmentTime,
              viewing_date: dateAndTime.appointmentDate
            })

            this.closePopup('showInstantViewPopup')
            this.closePopup('showGroupAppointmentPopup')
            this.updateInstallSourceMethod()
            if (!this.props.propertyInfo.type.toLowerCase().includes('_sale')) {
              this.triggerChatRequestGTAG()
              this.setState({
                appointMentTimeAndDate
              })
              this.openPopup('showProfileInfoModal', {
                isShowProfileInfoModal: true
              })
            } else if (this.state.recommendedPropertiesForChatReq.length >= 2) {
              this.setState({
                appointMentTimeAndDate
              })
              this.openPopup('showMultiChatRequestPopup', {
                isMultiChatRequestSuccess: true
              })
            } else {
              this.openPopup('showChatRequestSuccessPopup', {
                isChatRequestSuccess: true
              })
            }
          }
        })
        .catch(error => {
          this.closePopup('showInstantViewPopup')
          this.closePopup('showGroupAppointmentPopup')
          this.openPopup('showChatRequestSuccessPopup', {
            isChatRequestSuccess: false
          })
        })
    }
  }
  showGetPhoneNumberProgressBar = async () => {
    window.scrollTo(0, 0)
    const propertyId = this.props.propertyInfo.id
    getPropertyInfo(propertyId)
    this.setState(
      {
        isGetPhoneNumber: false,
        isChatRequestFinished: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            isChatRequestFinished: false
          })
        }, 15000)
      }
    )
  }
  submitMultipleChatRequest = async propertyIds => {
    const { chatRequestPayload } = this.state
    if (!propertyIds.length) {
      this.closePopup('showMultiChatRequestPopup')
      if (this.state.isGetPhoneNumber) {
        this.showGetPhoneNumberProgressBar()
      } else {
        window.location.reload()
      }
      return
    }

    for (let i = 0; i < propertyIds.length; i++) {
      // let chatRequestPayload = { propertyId: propertyIds[i], time: appointMentTimeAndDate, userId: getUserId() };
      await sendChatRequestForSellAPI({
        ...chatRequestPayload,
        propertyId: propertyIds[i],
        source: 'smart'
      })
      triggerGTAG({
        event: 'ChatRequest_All'
      })
      triggerDengageEvents('speed_rent_cr', {
        event_name: 'submit_cr_rec_property',
        name: this.props.user ? this.props.user.name : '',
        phone_number:
          this.props.user && this.props.user.phoneNumber
            ? this.props.user.phoneNumber
            : '',
        email_address:
          this.props.user && this.props.user.email ? this.props.user.email : '',
        date_click_send_chat_request: dengageConvertedDate(),
        property_furnishing: this.props.propertyInfo.furnishes.join(','),
        property_facilities: this.props.propertyInfo.facilities.join(','),
        property_value: this.props.propertyInfo.price,
        property_type: this.props.propertyInfo.type,
        property_area: this.props.propertyInfo.price.address
      })
      userEventTracking('ChatRequest', propertyIds[i])

      if (propertyIds.length - 1 === i) {
        this.closePopup('showMultiChatRequestPopup')
        this.openPopup('showChatRequestSuccessPopup', {
          isChatRequestSuccess: true
        })
      }
    }
  }
  updateInstallSourceMethod = () => {
    const param = localStorage.getItem('utmParam')
    if (param) {
      const data = {
        source: param
      }
      updateInstallSource(data).then(res => {})
    }
  }
  triggerChatRequestGTAG = () => {
    triggerGTAG({
      event: 'submitChatRequest',
      propertyId: this.props.propertyInfo && this.props.propertyInfo.id,
      propertyName: this.props.propertyInfo && this.props.propertyInfo.name
    })
  }
  chatWithOwnerBtn = (book = false) => {
    return (
      <button
        id='btnChatWithOwner1'
        onClick={() => {
          this.chatRequestFormSubmitHandler(book, null)
        }}
        className={`chat-btn btn btn-secondary-filled btn-curv btn-big  ${styles['chatBut']}`}
      >
        {book
          ? 'Book Appointment Now'
          : this.props.router.locale === 'en'
          ? 'Chat with Owner'
          : this.props.router.locale === 'my'
          ? 'Berbual dengan Tuan Rumah'
          : '与屋主对话'}
        &nbsp; <Icon icon='commentIcon' size={'middle'} />
      </button>
    )
  }
  goToChat = () => {
    return (
      <button
        id='btnSubmitChat'
        onClick={() => {
          this.props.router.push(
            `/dashboard/chat?chatId=${this.props.propertyInfo.chatServerConversationId}`
          )
        }}
        className={`chat-btn btn btn-secondary-filled btn-curv btn-big  ${styles['chatBut']}`}
      >
        Open Chat &nbsp; <Icon icon='commentIcon' size={'middle'} />
      </button>
    )
  }
  renderChatButton = () => {
    if (getToken())
      if (
        getUserId() &&
        parseInt(getUserId()) === parseInt(this.props.propertyInfo.user.id)
      ) {
        return null
      } else {
        if (
          !this.props.propertyInfo.KOH &&
          !this.props.propertyInfo.chatServerConversationId
        ) {
          return this.chatWithOwnerBtn()
        } else if (
          (this.props.propertyInfo.KOH &&
            this.props.propertyInfo.chatServerConversationId) ||
          (this.props.propertyInfo.chatServerConversationId &&
            !this.props.propertyInfo.KOH)
        ) {
          return this.goToChat()
        } else if (
          this.props.propertyInfo.KOH &&
          !this.props.propertyInfo.chatServerConversationId
        ) {
          return this.chatWithOwnerBtn(true)
        }
      }
    else {
      if (this.props.propertyInfo.KOH) {
        return this.chatWithOwnerBtn(true)
      } else {
        return this.chatWithOwnerBtn()
      }
    }
  }
  renderChatRequestBtn = () => {
    const { user } = this.props
    const propertyData = this.props.propertyInfo || {}

    const { isPropertyFavorite } = this.state
    const chatWithOwner = (
      <div
        id='stick-on-bottom'
        className={styles['stick-on-bottom']}
        style={{ display: 'none' }}
      >
        <div className='container'>
          <div>{this.renderChatButton()}</div>
          <div className={styles['action-right']}>
            {user && user.id ? (
              <a
                className={styles['unfaved']}
                onClick={this.handleFavAction}
                style={{ cursor: 'pointer' }}
              >
                {isPropertyFavorite ? (
                  <img
                    loading='lazy'
                    className={styles['favs']}
                    alt=''
                    src='/img/icons/ico-hearted.png'
                  />
                ) : (
                  <img
                    loading='lazy'
                    className={styles['unFav']}
                    alt=''
                    src='/img/icons/ico-heart.png'
                  />
                )}
              </a>
            ) : null}
            {!this.props.propertyInfo.type.toLowerCase().includes('_sale') ? (
              <a
                className='iframe-popup'
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => this.setState({ isAllInOneGuide: true })}
              >
                <Image
                  loading='lazy'
                  alt='bulb'
                  src='/img/icons/ico-bulb.png'
                  width={76}
                  height={76}
                />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    )
    if (this.props.propertyInfo) {
      if (this.props.user) {
        if (this.props.propertyInfo.user.id !== this.props.user.id) {
          return chatWithOwner
        }
        return null
      } else {
        return chatWithOwner
      }
    }
  }
  onChangeProfile = event => {
    const { name, value } = event.target
    this.setState(prevState => ({
      profile: {
        ...prevState.profile,
        [name]: value
      }
    }))
  }
  onCloseProfileInfoModal = () => {
    this.setState(
      {
        isShowProfileInfoModal: false
      },

      () => {
        if (this.state.isGetPhoneNumber) {
          this.showGetPhoneNumberProgressBar()
        } else {
          window.location.reload()
        }
      }
    )
  }

  handleBirthDate = date => {
    this.setState(prevState => ({
      profile: {
        ...prevState.profile,
        dob: date
      }
    }))
  }

  handleSelection = (key, option) => {
    this.setState(prevState => ({
      profile: {
        ...prevState.profile,
        [key]: option.value
      }
    }))
  }

  submitProfile = async () => {
    const {
      companyName,
      contractType,
      monthlyIncome,
      paxNumber,
      reasonForMove,
      dob,
      gender
    } = this.state.profile
    const payload = {
      companyName,
      contractType,
      monthlyIncome,
      paxNumber,
      reasonForMove,
      dob,
      gender
    }
    await submitUserProfile(payload).then(res => {
      if (res.success) {
        triggerGTAG({
          event: 'userProfileInfoSubmit'
        })
        triggerGTAG({
          event: 'ChatRequest_All'
        })

        this.setState(
          {
            isShowProfileInfoModal: false
          },
          () => {
            if (this.state.recommendedPropertiesForChatReq.length >= 2) {
              this.openPopup('showMultiChatRequestPopup', {
                isMultiChatRequestSuccess: true
              })
            } else {
              this.openPopup('showChatRequestSuccessPopup', {
                isChatRequestSuccess: true
              })
              if (this.state.isGetPhoneNumber) {
                toast(
                  'Phone number will be shared after viewing appointment is confirmed.',
                  {
                    autoClose: CONST.ToastTimeout,
                    type: toast.TYPE.ERROR
                  }
                )
              }
            }
          }
        )
      } else {
        toast(response.message || 'Something went wrong', {
          autoClose: CONST.ToastTimeout,
          type: toast.TYPE.ERROR
        })
      }
    })
  }
  handleScroll = () => {
    const banner = document.querySelector(
      styles['propertyDetails__coverWrapper']
    )
    const height = banner.offsetHeight
    const el = document.querySelector(styles['.scroll-top__btn'])
    if (window.scrollY > height && window.innerWidth >= 768) {
      el.style.opacity = 1
    } else {
      el.style.opacity = 0
    }
  }
  setShowGallery = val => {
    this.setState({
      showGallery: val
    })
  }
  setTargetGalleryIndex = index => {
    this.setState({
      targetGalleryIndex: index,
      showGallery: true
    })
  }
  changeHeadingView = type => {
    if (type !== this.state.defaultHeadingView) {
      this.setState({
        defaultHeadingView: type
      })
    }
  }
  handleShareBtn = () => {
    triggerDengageEvents('share_property', {
      event_name: 'share_property',
      name: this.props.user ? this.props.user.name : '',
      phone_number:
        this.props.user && this.props.user.phoneNumber
          ? this.props.user.phoneNumber
          : '',
      email_address:
        this.props.user && this.props.user.email ? this.props.user.email : '',
      property_area: this.props.propertyInfo.address
    })

    this.openPopup('showSharePopup')
  }

  render () {
    const {
      recommendedProperties,
      recommendedPropertiesForChatReq,
      isPropertyFavorite,
      isShowErrorMessage,
      isAllInOneGuide,
      isShowProfileInfoModal,
      profile,
      showGallery,
      targetGalleryIndex,
      defaultHeadingView,
      openEmailPopUpModal
    } = this.state

    let data = this.props.propertyInfo || {}
    const images =
      data.images &&
      data.images.map((img, index) => (
        <img
          loading='lazy'
          key={index}
          className={styles['avatarImg']}
          src={img.url}
        />
      ))

    const CustomDot = ({
      index,
      onClick,
      active,
      carouselState: { currentSlide }
    }) => {
      return (
        <button
          onClick={e => {
            onClick()
            e.preventDefault()
          }}
          className={classNames('custom-dot', {
            'custom-dot--active': active
          })}
        >
          {React.Children.toArray(images)[index]}
        </button>
      )
    }

    return (
      <div
        className={styles['propertyDetails__wrapper']}
        id='propertyDetailPage'
      >
        {this.state.isChatRequestFinished && (
          <ProgressBar
            className='tenant_chat_limit_progress_bar'
            now={100}
            label={
              'Phone number will be shared after viewing appointment is confirmed.'
            }
          />
        )}
        <ToastContainer />

        {data ? (
          <PropertyBanner
            defaultHeadingView={defaultHeadingView}
            caption={data.name}
            galleryArr={data.images}
            videos={data.videos}
            showGallery={showGallery}
            setShowGallery={this.setShowGallery}
            setTargetGalleryIndex={this.setTargetGalleryIndex}
            targetGalleryIndex={targetGalleryIndex}
            // coverPhoto={coverPhoto}
            isPropertyFavorite={isPropertyFavorite}
            handleFavourite={this.handleFavAction}
            handleShare={this.handleShareBtn}
            isMobile={this.props.isMobile}
            propertyRef={this.props.propertyInfo?.ref}
            routerQuery={this.props.router?.query}
            //
          />
        ) : null}
        <PropertyDetailsImageGallery
          caption={data.name}
          galleryArr={data.images}
          showGallery={showGallery}
          setShowGallery={this.setShowGallery}
          targetGalleryIndex={targetGalleryIndex}
        />
        <div
          className={`container _prop_without_recommand ${styles['propertyDetailContainer']}`}
          id='_prop_without_recommand'
        >
          <Row>
            <Col md={8}>
              <div className={styles['propertyDetailbreadCrumbContainer']}>
                <div
                  className={
                    styles['propertyDetailbreadCrumbContainer__breadcrumbText']
                  }
                >
                  <PropertyDetailsBreadCrumb
                    propertyData={data}
                    getAreaByPostcode={getAreaByPostcode}
                    styles={styles}
                  />
                </div>
                {!this.props.isMobile ? (
                  <div
                    data-testid='propertyDetailbreadCrumbContainerAction'
                    className={
                      styles['propertyDetailbreadCrumbContainer__actions']
                    }
                  >
                    <PropertyDetailActions
                      styles={styles}
                      handleFavourite={this.handleFavAction}
                      handleShare={this.handleShareBtn}
                      isPropertyFavorite={isPropertyFavorite}
                    />
                  </div>
                ) : null}
              </div>
              <PropertyHeadingMediaAction
                defaultHeadingView={defaultHeadingView}
                videos={data.videos}
                changeHeadingView={val => this.changeHeadingView(val)}
                scrollToMaP={this.scrollToMaP}
                styles={styles}
              />
              <PropertyDetailsInfo
                isFlashSalesActive={this.state.isFlashSalesActive}
                propertyData={data}
                flashEventInfo={this.state.flashEventInfo}
                router={this.props.router}
              />

              {this.props.isMobile ? (
                <ToMoveInComponent
                  propertyData={data}
                  isFlashSalesActive={this.state.isFlashSalesActive}
                  isMobile={this.props.isMobile}
                  shareBtn={() => this.openPopup('showSharePopup')}
                  isPropertyFavorite={isPropertyFavorite}
                  handleFavAction={this.handleFavAction}
                  getPhoneNumberHandler={this.getPhoneNumberHandler}
                  chatRequestFormSubmitHandler={
                    this.chatRequestFormSubmitHandler
                  }
                  flashSalesPrice={this.state.flashSalesPrice}
                  isChatRequestFinished={this.state.isChatRequestFinished}
                  flashSalesRemainingDuration={
                    this.state.flashSalesRemainingDuration
                  }
                  flashEventInfo={this.state.flashEventInfo}
                />
              ) : null}

              <PropertyDetailsAddress propertyData={data} />
            </Col>
            <Col md={4}>
              {this.props.isMobile ? null : (
                <ToMoveInComponent
                  isFlashSalesActive={this.state.isFlashSalesActive}
                  propertyData={data}
                  isMobile={this.props.isMobile}
                  shareBtn={() => this.openPopup('showSharePopup')}
                  isPropertyFavorite={isPropertyFavorite}
                  handleFavAction={this.handleFavAction}
                  getPhoneNumberHandler={this.getPhoneNumberHandler}
                  chatRequestFormSubmitHandler={
                    this.chatRequestFormSubmitHandler
                  }
                  isChatRequestFinished={this.state.isChatRequestFinished}
                  styles={styles}
                  flashSalesPrice={this.state.flashSalesPrice}
                  flashSalesRemainingDuration={
                    this.state.flashSalesRemainingDuration
                  }
                  flashEventInfo={this.state.flashEventInfo}
                />
              )}
            </Col>
          </Row>

          {this.renderChatRequestBtn()}
        </div>
        <section className={styles['propertyDetails__recommendedWrapper']}>
          {!this.props.router.asPath.includes('/rental-bidding') ? (
            getToken() ? (
              <PropertyDetailSmartRecommendedProperties
                handleRecommendedSmartPropertiesChatReq={
                  this.handleRecommendedSmartPropertiesChatReq
                }
                propertyRef={this.props?.propertyInfo?.ref}
                styles={styles}
              />
            ) : (
              <PropertyDetailRecommendedProperties
                handleRecommendedPropertiesChatReq={
                  this.handleRecommendedPropertiesChatReq
                }
                getPropertyNameLink={getPropertyNameLink}
                styles={styles}
                propertyRef={this.props?.propertyInfo?.ref}
                propertyId={
                  this.props.propertyInfo && this.props.propertyInfo.id
                }
              />
            )
          ) : null}
        </section>
        <PageViewCountForSearchTracking
          propertyRef={this.props.propertyInfo?.ref}
          routerQuery={this.props.router?.query}
        />

        {isAllInOneGuide ? (
          <AllInOneGuideModal
            onClose={() => this.setState({ isAllInOneGuide: false })}
            styles={styles}
          />
        ) : null}

        <ChatForm
          isOpen={this.state.showChatPopup}
          chatRequestPopupIsSubmit={this.state.chatRequestPopupIsSubmit}
          sendChatRequest={this.sendChatRequest}
          handleClose={() => this.closePopup('showChatPopup')}
          type={data.type}
          propertyInfo={this.props.propertyInfo}
          user={profile || {}}
          propertyId={
            this.props.propertyInfo ? this.props.propertyInfo.id : null
          }
          router={this.props.router}
          styles={styles}
        />

        <InstantViewRequestModal
          isOpen={this.state.showInstantViewPopup}
          submitNewAppointMent={this.submitNewAppointMent}
          handleClose={() =>
            handleInstantViewPopupClose(
              this.closePopup,
              this.props.propertyInfo,
              this.openPopup,
              this.state
            )
          }
          instantViewRequestModalSubmit={
            this.state.instantViewRequestModalSubmit
          }
          styles={styles}
        />
        <GroupAppointment
          isOpen={this.state.showGroupAppointmentPopup}
          handleClose={() => this.closePopup('showGroupAppointmentPopup')}
          appointmentsList={this.state.appointmentsList}
          submitNewAppointMent={this.submitNewAppointMent}
          showGroupAppointmentPopupSubmit={
            this.state.showGroupAppointmentPopupSubmit
          }
          styles={styles}
        />
        <RequestSent
          isOpen={this.state.showChatRequestSuccessPopup}
          handleClose={() => {
            this.closePopup('showChatRequestSuccessPopup', {
              isChatRequestSuccess: false
            })
            if (this.state.isGetPhoneNumber) {
              this.showGetPhoneNumberProgressBar()
            } else {
              window.location.reload()
            }
          }}
          isSuccess={this.state.isChatRequestSuccess}
          styles={styles}
        />
        <ShowRecommendedPropertyForChatRequest
          isOpen={this.state.showMultiChatRequestPopup}
          handleClose={() => {
            this.closePopup('showMultiChatRequestPopup', {
              isMultiChatRequestSuccess: false
            })
            window.location.reload()
          }}
          recommendedProperties={recommendedPropertiesForChatReq}
          isSuccess={this.state.isMultiChatRequestSuccess}
          submitMultipleChatRequest={this.submitMultipleChatRequest}
          styles={styles}
        />

        <ProfileInfo
          profile={profile}
          isOpen={isShowProfileInfoModal}
          onClose={this.onCloseProfileInfoModal}
          onChange={this.onChangeProfile}
          handleBirthDate={this.handleBirthDate}
          submitProfile={this.submitProfile}
          handleSelection={this.handleSelection}
          styles={styles}
        />
        {isShowErrorMessage ? (
          <RestrictedModal
            isOpen={isShowErrorMessage}
            isAgent={{ agent: true }}
            onClose={() => this.setState({ isShowErrorMessage: false })}
          />
        ) : null}
        <SharePopup
          currentPath={(this.props.router && this.props.router.asPath) || ''}
          isOpen={this.state.showSharePopup}
          handleClose={() => this.closePopup('showSharePopup')}
        />
        <EmailPopUp
          visible={openEmailPopUpModal}
          onHide={(e, email) => {
            this.setState(
              {
                openEmailPopUpModal: false
              },
              () => {
                this.subscribeListingAlertMethod(email)
              }
            )

            // props.authActions.setEmailPopup(2)
          }}
        />
        <div className={styles['scroll-top__btn']}>
          <Image
            src='/img/scroll-top.png'
            alt='scroll'
            onClick={() => window.scrollTo(0, 0)}
            width={64}
            height={64}
          />
        </div>
      </div>
    )
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 767
})

function mapStateToProps (state) {
  return {
    user: state.auth.user,
    isFromForgetPassword: state.auth.isFromForgetPassword
  }
}

function actionsStateToProps (dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    actionsStateToProps
  )(withSizes(mapSizesToProps)(PropertyDetailsComponent))
)
