import {
  SUBMIT_RAMCI_SUCCESS,
  SUBMIT_RAMCI_FAIL,
  UPDATE_CONSENT_SUCCESS,
  UPDATE_CONSENT_FAIL,
  REMOVE_RAMCI_ERROR
} from '../actions/types'

function ramciReducer (state = {}, action) {
  switch (action.type) {
    case REMOVE_RAMCI_ERROR:
      return {
        ramciFail: false,
        consentFail: false
      }
    case SUBMIT_RAMCI_SUCCESS:
      return {
        ramciSuccess: true
      }
    case SUBMIT_RAMCI_FAIL:
      return {
        ramciFail: false
      }
    case UPDATE_CONSENT_SUCCESS:
      return {
        updateConsent: true
      }
    case UPDATE_CONSENT_FAIL:
      return {
        consentFail: true
      }
    default:
      return state
  }
}

export default ramciReducer
