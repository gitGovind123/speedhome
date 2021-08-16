import { PROPERTY_LIST } from '../actions/property'

function propertyList (state = {}, action) {
  switch (action.type) {
    case PROPERTY_LIST:
      return action.propertyList
    default:
      return state
  }
}

export default propertyList
