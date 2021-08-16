import {
  DEAL_BY_ID,
  DEAL,
  VERIFY_BOOKING,
  CREATE_BOOKING,
  HASH
} from '../actions/deal'

const initialState = {
  dealByUser: {},
  dealByHash: {},
  booking: {},
  hash: '',
  paymentUrl: ''
}

function deal (state = initialState, action) {
  switch (action.type) {
    case DEAL_BY_ID:
      return { ...state, dealByUser: action.dealByIdInfo }
    case DEAL: {
      return {
        ...state,
        dealByHash: action.dealByHash,
        dealByUser: action.dealByHash
      }
    }
    case VERIFY_BOOKING: {
      return {
        ...state,
        booking: action.bookingVerifyInfo,
        dealByHash: action.bookingVerifyInfo,
        dealByUser: action.bookingVerifyInfo
      }
    }
    case CREATE_BOOKING: {
      return { ...state, paymentUrl: action.createBookingInfo }
    }
    case HASH:
      return { ...state, hash: action.hash }
    default:
      return state
  }
}

export default deal
