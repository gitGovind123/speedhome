import { CHANGE_LANGUAGE } from '../actions/language'

function language (state = '', action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return action.payload.language
    default:
      return state
  }
}

export default language
