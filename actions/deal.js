import {
  createBookingByApiCall,
  getDealByuserIdAndPropertyId,
  getDeal,
  verifyBookingByApiCall,
  createRamci,
  createDealApiCall,
  updateDealApiCall,
  addDocumentApiCall,
  verifyDocumentApiCall,
  getDocumentByUserIdAPI,
  submitDocumentForPreDocAPI
} from '../api/deal'
import { setPropertyInfo } from './property'
import { getPropertyInfoAPI } from '../api/property'

export const DEAL_BY_ID = 'DEAL_BY_ID'
export const DEAL = 'DEAL'
export const VERIFY_BOOKING = 'VERIFY_BOOKING'
export const IS_LOCAL = 'IS_LOCAL'
export const RAMCI_RESPONSE = 'RAMCI_RESPONSE'
export const ADD_DOCUMENT = 'ADD_DOCUMENT'
export const VERIFY_DOCUMENT = 'VERIFY_DOCUMENT'
export const CREATE_BOOKING = 'CREATE_BOOKING'
export const HASH = 'HASH'

export const updateHashValue = hash => {
  return setHash(hash)
}

export const setHash = hash => {
  return { type: HASH, hash: hash }
}

export const getDealById = (userId, propertyId) => {
  return dispatch => {
    return getDealByuserIdAndPropertyId(userId, propertyId)
      .then(response => {
        dispatch(setDealByIdInfo(response))
      })
      .catch(error => error)
  }
}

export const setDealByIdInfo = json => {
  return { type: DEAL_BY_ID, dealByIdInfo: json }
}

export const createDeal = data => {
  return dispatch => {
    return createDealApiCall(data)
      .then(response => {
        dispatch(setDeal(response))
      })
      .catch(error => {
        return error
      })
  }
}

export const fetchDealData = (user, hash) => {
  return dispatch => {
    return getDeal(user, hash)
      .then(async response => {
        dispatch(setDeal(response))
      })
      .catch(error => {
        return error
      })
  }
}

export const getDealByHash = (user, hash) => {
  return dispatch => {
    return getDeal(user, hash)
      .then(async response => {
        await getPropertyInfoAPI(response.propertyDto.id)
          .then(res => {
            dispatch(setPropertyInfo(res))
            return null
          })
          .catch(error => {})
        dispatch(setDeal(response))
      })
      .catch(error => {
        return error
      })
  }
}

export const setDeal = json => {
  return { type: DEAL, dealByHash: json }
}

export const updateDeal = data => {
  let hash = data && data.hash ? data.hash : ''
  return dispatch => {
    return updateDealApiCall(data, hash)
      .then(response => {
        dispatch(setDeal(response))
      })
      .catch(error => {
        return error
      })
  }
}

export const createBooking = hash => {
  return dispatch => {
    return createBookingByApiCall(hash)
      .then(response => {
        dispatch(setCreateBookingResponse(response))
      })
      .catch(error => {
        return error
      })
  }
}

export const setCreateBookingResponse = json => {
  return { type: CREATE_BOOKING, createBookingInfo: json }
}

export const addDocument = (data, hash) => {
  return dispatch => {
    return addDocumentApiCall(data, hash)
      .then(response => {
        dispatch(setAddDocumentResponse(response))
      })
      .catch(error => error)
  }
}

export const setAddDocumentResponse = json => {
  return { type: NEWLY_ADDED_DOCUMENT, newdocument: json }
}

export const verifyDocument = hash => {
  return dispatch => {
    return verifyDocumentApiCall(hash)
      .then(response => {
        dispatch(setVerifiedDocumentResponse(response))
      })
      .catch(error => error)
  }
}

export const setVerifiedDocumentResponse = json => {
  return { type: VERIFIED_DOCUMENT, verifiedDocument: json }
}

export const validateRamci = (data, hash) => {
  return dispatch => {
    return createRamci(data, hash)
      .then(response => {
        dispatch(setRamciValidateResponse(response))
      })
      .catch(error => error)
  }
}

export const setRamciValidateResponse = json => {
  return { type: RAMCI_RESPONSE, ramciResponseInfo: json }
}

export const verifyBooking = hash => {
  return dispatch => {
    return verifyBookingByApiCall(hash)
      .then(response => {
        dispatch(setVerifyBookingResponse(response))
      })
      .catch(error => error)
  }
}

export const setVerifyBookingResponse = json => {
  return { type: VERIFY_BOOKING, bookingVerifyInfo: json }
}

export const getDealIdByUserId = () => {
  return dispatch => {
    return getDocumentByUserIdAPI().then(res => {
      if (res) {
        return res
      }
    })
  }
}
export const submitDocumentPreDoc = (docId, data) => {
  return dispatch => {
    return submitDocumentForPreDocAPI(docId, data).then(res => {
      if (res) {
        return res
      }
    })
  }
}
