import {
  HOME_OWNERSHIP_LIST,
  HOME_OWNERSHIP_INFO_REQUEST
} from '../actions/homeOwnership'

const initialState = {
  homeOwnershipList: [],
  homeOwnershipInfoRequestStatus: ''
}

function homeOwnership (state = initialState, action) {
  switch (action.type) {
    case HOME_OWNERSHIP_LIST:
      return { ...state, homeOwnershipList: action.homeOwnershipList || [] }
    case HOME_OWNERSHIP_INFO_REQUEST:
      return {
        ...state,
        homeOwnershipInfoRequestStatus: action.homeOwnershipInfoRequestStatus
      }
    default:
      return state
  }
}

export default homeOwnership
