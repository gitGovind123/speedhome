import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import dynamic from 'next/dynamic'
import _ from 'lodash'
import dayjs from 'dayjs'
import moment from 'moment'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import swal from 'sweetalert2'
import { getPropertyInfo } from '../../actions/property'
import withSizes from 'react-sizes'
import ChatForm from './ChatRequestPopup'
import './PropertyDetails.module.scss'

import { getUserId, getToken, getClickId } from '../../globalutilities/helpers'

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
import CONST, { admin_token } from '../../globalutilities/consts'
import {
  submitUserProfile,
  getRecommendedSmartProperties,
  getUserProfile,
  userEventTracking,
  createReferral
} from '../../actions'

import * as authActions from '../../actions/authActions'
import {
  dengageConvertedDate,
  getRefQueryParams,
  handleInstantViewPopupClose,
  triggerDengageEvents,
  triggerGTAG
} from '../../utils/utils'
import Icon from '../Common/Icons/Icons'
import Cookies from 'js-cookie'
const ProfileInfo = dynamic(() => import('./ProfileInfo'))
const InstantViewRequestModal = dynamic(() =>
  import('./InstantViewRequestModal')
)
const GroupAppointment = dynamic(() => import('./GroupAppointment'))
const RequestSent = dynamic(() => import('./RequestSent'))
const RestrictedModal = dynamic(() => import('../Common/RestrictedModal'))
const ShowRecommendedPropertyForChatRequest = dynamic(() =>
  import('./ShowRecommendedPropertyForChatRequest')
)

export const HEADING_VIEW_IMAGE = 'HEADING_VIEW_IMAGE'
export const HEADING_VIEW_VIDEO = 'HEADING_VIEW_VIDEO'

import styles from './PropertyDetails.module.scss'
import { API_HOST, AUTH_SERVER, X_OS_VERSION } from '../../env'
import { getLocalStorageForCr } from '../Common/Helper'

class ChatRequest extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showChatPopup: false,
      showChatRequestSuccessPopup: false,
      showMultiChatRequestPopup: false,
      isChatRequestSuccess: false,
      isMultiChatRequestSuccess: false,
      showInstantViewPopup: false,
      showGroupAppointmentPopup: false,
      recommendedProperties: [],
      recommendedPropertiesForChatReq: [],
      chatRequestPayload: [],
      phoneNo: '',
      countryData: {},
      subscribeListing: false,
      isShowProfileInfoModal: false,
      profile: {},
      isShowErrorMessage: false,
      propertyId: '',
      chatRequestPopupIsSubmit: false,
      instantViewRequestModalSubmit: false,
      showGroupAppointmentPopupSubmit: false,
      isAuctionFinished: false,
      openEmailPopUpModal: false,
      isGetPhoneNumber: false,
      isChatRequestFinished: false,
      chatConversationId: null
    }
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
          this.getRecommendedPropertiesByUser()
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

  componentDidMount () {
    if (this.props.propertyInfo?.auctionData?.id) {
      const endDate = new Date(this.props.propertyInfo?.auctionData?.endDate)
      if (endDate.getTime() < Date.now()) {
        this.setState({
          isAuctionFinished: true
        })
      }
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.token !== this.props.token) {
      if (this.props.token) {
        getLocalStorageForCr(this.sendChatRequest, this.props.propertyInfo)
      }
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
        source_type: 'web_listing',
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
          .then(() => {
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
    this.openPopup('showInstantViewPopup')
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
          .catch(() => {})
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
        } else {
          this.buySellChatRequest()
        }
      }
    }
  }

  buySellChatRequest = () => {
    let chatRequestPayload = {
      propertyId: this.props.propertyInfo ? this.props.propertyInfo.id : null
    }
    if (chatRequestPayload) {
      sendChatRequestForSellAPI(chatRequestPayload)
        .then(() => {
          this.updateInstallSourceMethod()
          this.openPopup('showChatRequestSuccessPopup', {
            isChatRequestSuccess: true
          })
          userEventTracking('ChatRequest', this.props.propertyInfo.id)
        })
        .catch(() => {
          this.openPopup('showChatRequestSuccessPopup', {
            isChatRequestSuccess: false
          })
        })
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
        this.getChatConversationId(this.props.propertyInfo?.id)
      }
      return
    }

    for (let i = 0; i < propertyIds.length; i++) {
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
      updateInstallSource(data).then(() => {})
    }
  }
  triggerChatRequestGTAG = () => {
    triggerGTAG({
      event: 'submitChatRequest',
      propertyId: this.props.propertyInfo && this.props.propertyInfo.id,
      propertyName: this.props.propertyInfo && this.props.propertyInfo.name
    })
  }
  getRecommendedPropertiesByUser = () => {
    getRecommendedSmartProperties(
      {
        numberOfSuggestions: 5
      },
      getToken()
    )
      .then(res => {
        if (res.success) {
          this.setState({
            recommendedPropertiesForChatReq: res.success
              ? _.cloneDeep(res.data ? res.data : [])
              : []
          })
        }
      })
      .catch(err => console.log(err))
  }
  chatWithOwnerBtn = (book = false) => {
    if (!this.state.isAuctionFinished) {
      return (
        <button
          id='btnChatWithOwner2'
          data-testId='ChatRequestBtn'
          className={styles['PropertyDetails__chat-with-owner']}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            this.chatRequestFormSubmitHandler(book, null)
          }}
        >
          {book
            ? this.props.router.locale === 'en'
              ? 'Book Appointment'
              : this.props.router.locale === 'my'
              ? 'Janji Temu Buku'
              : '预约'
            : this.props.router.locale === 'en'
            ? 'Chat with Owner'
            : this.props.router.locale === 'my'
            ? 'Berbual dengan Tuan Rumah'
            : '与屋主对话'}
        </button>
      )
    }
  }
  goToChat = () => {
    return (
      <button
        id='btnSubmitChat'
        data-testId='ChatRequestBtn'
        onClick={e => {
          e.stopPropagation()
          e.preventDefault()
          if (this.state.chatConversationId) {
            window.open(
              `/dashboard/chat?chatId=${this.state.chatConversationId}`,
              '_blank'
            )
          } else {
            window.open(
              `/dashboard/chat?chatId=${this.props.propertyInfo.chatServerConversationId}`,
              '_blank'
            )
          }
        }}
        className={styles['PropertyDetails__chat-with-owner']}
      >
        View Chat
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
          !this.props.propertyInfo.chatServerConversationId &&
          !this.state.chatConversationId
        ) {
          return this.chatWithOwnerBtn()
        } else if (
          (this.props.propertyInfo.KOH &&
            this.props.propertyInfo.chatServerConversationId) ||
          (this.props.propertyInfo.chatServerConversationId &&
            !this.props.propertyInfo.KOH) ||
          this.state.chatConversationId
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

  renderChatRequestBtn = () => {
    const chatWithOwner = (
      <div
        id='stick-on-bottom'
        className={styles['stick-on-bottom']}
        style={{ display: 'none' }}
      >
        <div className='container'>
          <div>{this.renderChatButton()}</div>
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

  handleSelection = (key, option) => {
    this.setState(prevState => ({
      profile: {
        ...prevState.profile,
        [key]: option.value
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
          this.getChatConversationId(this.props.propertyInfo?.id)
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

  getChatConversationId = async propertyId => {
    const authToken = getToken()
    const data = await fetch(`${API_HOST}properties/${propertyId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken || admin_token,
        'X-OS-Version': X_OS_VERSION,
        'X-Device-ID': Cookies.get('xDeviceId') || generateUUID()
      },
      body: null
    })
    const propertyInfo = await data.json()
    this.setState({
      chatConversationId: propertyInfo.chatServerConversationId
    })
  }

  render () {
    let data = this.props.propertyInfo || {}
    const {
      recommendedPropertiesForChatReq,
      isShowErrorMessage,
      isShowProfileInfoModal,
      profile,
      isAuctionFinished
    } = this.state

    return (
      <>
        {this.props.router.asPath.includes('/rental-bidding')
          ? this.chatWithOwnerBtn(false, isAuctionFinished)
          : this.renderChatButton()}
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
              this.getChatConversationId(this.props.propertyInfo?.id)
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
            this.getChatConversationId(this.props.propertyInfo?.id)
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
        {this.isShowErrorMessage ? (
          <RestrictedModal
            isOpen={isShowErrorMessage}
            isAgent={{ agent: true }}
            onClose={() => this.setState({ isShowErrorMessage: false })}
          />
        ) : null}
      </>
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
  )(withSizes(mapSizesToProps)(ChatRequest))
)
