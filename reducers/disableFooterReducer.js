import { DISABLE_FOOTER } from '../actions/disableFooter'

const INITIAL_STATE = {
  isDisabled: false
}
function postReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case DISABLE_FOOTER:
      return { ...state, isDisabled: action.payload }
    default:
      return state
  }
}

export default postReducer
