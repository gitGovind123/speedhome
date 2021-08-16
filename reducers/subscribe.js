import { SUBSCRIBE_STATUS } from '../actions/emailCollection'

function subscribeStatus (state = {}, action) {
  switch (action.type) {
    case SUBSCRIBE_STATUS:
      return action.subscribeStatus
    default:
      return state
  }
}

export default subscribeStatus
