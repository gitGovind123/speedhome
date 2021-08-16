import { SUBSCRIBE_PROPERTY_ALERT } from '../actions/propertyAlert'

function subscribePropertyAlert (state = {}, action) {
  switch (action.type) {
    case SUBSCRIBE_PROPERTY_ALERT:
      return action.subscribePropertyAlert
    default:
      return state
  }
}

export default subscribePropertyAlert
