import {
  GET_USER,
  GET_PIN_BY_PHONE,
  GET_PIN_BY_PHONE_SUCCESS,
  GET_PIN_BY_PHONE_ERROR,
  GET_VERIFY_PIN_SUCCESS,
  GET_VERIFY_PIN_ERROR,
  UNSET_DETAILS_FOR_BANNED_USER,
  SHOW_VERFIY_INFO_POPUP,
  SHOW_SET_PASSWORD_POPUP,
  CLOSE_SET_PASSWORD_POPUP,
  CLOSE_VERFIY_INFO_POPUP,
  SHOW_BANNED_ERROR,
  OPEN_LOGIN_MODAL,
  CLEAR_USER,
  CLEAR_LOGIN_DATA,
  HAS_FACEBOOK_CONNECT,
  CLOSE_LOGIN_MODAL,
  IS_OPEN_PLAYSTORE,
  SET_EMAIL_POPUP,
  IS_FROM_FORGET_PASSWORD,
  REMOVE_IS_FROM_FORGET_PASSWORD,
  SHOW_LOCKED_MODAL,
  GET_USER_PROFILE,
  USER_LOGINED
} from '../actions/types'

const INITIAL_STATE = {
  user: null,
  phoneNo: '',
  pinError: '',
  error: '',
  showRegistrationModal: false,
  showForgotPasswordModal: false,
  openLoginModal: false,
  loginInfoArray: null,
  hasFacebookConnect: false,
  goToReferPage: false,
  isOpenPlaystorePopup: false,
  showEmailPopup: 0,
  isFromForgetPassword: false,
  showLockedModal: false,
  verify: false,
}

function authReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        openLoginModal: true,
        loginInfoArray: action.payload,
        goToReferPage: action.payload.goToReferPage
      }
    case CLOSE_LOGIN_MODAL:
      return {
        ...state,
        openLoginModal: false,
        error: ''
      }
    case GET_USER:
      return { ...state, user: action.payload }
    case GET_USER_PROFILE:
      return { ...state, user: action.payload }
    case USER_LOGINED:
        return { ...state, verify: !action.payload, login: false }
    case CLEAR_USER:
      return {
        ...state,
        user: null,
        phoneNo: '',
        pinError: '',
        error: '',
        showRegistrationModal: false,
        showForgotPasswordModal: false,
        openLoginModal: false,
        loginInfoArray: null
      }
    case GET_PIN_BY_PHONE:
      return {
        ...state,
        openLoginModal: false
      }
    case GET_PIN_BY_PHONE_SUCCESS:
      return { ...state, openLoginModal: false, phoneNo: action.phoneNo }
    case GET_PIN_BY_PHONE_ERROR:
      return { ...state, openLoginModal: false, error: action.error }
    case GET_VERIFY_PIN_SUCCESS:
      return { ...state, openLoginModal: false, user: action.payload }
    case GET_VERIFY_PIN_ERROR:
      return { ...state, openLoginModal: false, pinError: action.payload }
    case SHOW_BANNED_ERROR:
      return { ...state, openLoginModal: false, pinError: action.payload }
    case UNSET_DETAILS_FOR_BANNED_USER:
      return {
        ...INITIAL_STATE,
        user: action.payload.user,
        phoneNo: action.payload.phoneNo,
        pinError: action.payload.pinError,
        error: action.payload.error,
        showRegistrationModal: action.payload.showRegistrationModal
      }

    case SHOW_SET_PASSWORD_POPUP:
      return { ...state, showForgotPasswordModal: action.payload }

    case CLOSE_SET_PASSWORD_POPUP:
      return {
        ...state,
        showForgotPasswordModal: false,
        phoneNo: '',
        loginInfoArray: null
      }
    case SHOW_VERFIY_INFO_POPUP:
      return { ...state, showRegistrationModal: action.payload }
    case CLOSE_VERFIY_INFO_POPUP:
      return {
        ...state,
        showRegistrationModal: false,
        phoneNo: '',
        loginInfoArray: null
      }

    case CLEAR_LOGIN_DATA: {
      return {
        ...state,
        phoneNo: '',
        openLoginModal: false,
        hasFacebookConnect: false
      }
    }
    case HAS_FACEBOOK_CONNECT: {
      return {
        ...state,
        hasFacebookConnect: action.payload.isAuthorised,
        phoneNo: action.payload.phoneNo
      }
    }
    case IS_OPEN_PLAYSTORE: {
      return {
        ...state,
        isOpenPlaystorePopup: action.payload
      }
    }
    case SET_EMAIL_POPUP:
      return { ...state, showEmailPopup: action.payload }

    case IS_FROM_FORGET_PASSWORD:
      return { ...state, isFromForgetPassword: action.payload }
    case REMOVE_IS_FROM_FORGET_PASSWORD:
      return {
        ...state,
        isFromForgetPassword: false
      }
    case SHOW_LOCKED_MODAL:
      return {
        ...state,
        showLockedModal: action.payload
      }
    default:
      return state
  }
}

export default authReducer
