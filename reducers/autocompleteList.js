import { AUTOCOMPLETE, REMOVE_AUTOCOMPLETE } from '../actions/autocomplete'

const INIT_STATE = {
  autocompleteList: null
}

function autocompleteList (state = INIT_STATE, action) {
  switch (action.type) {
    case AUTOCOMPLETE:
      return { ...state, autocompleteList: action.autocompleteList }
    case REMOVE_AUTOCOMPLETE:
      return { ...state, autocompleteList: null }
    default:
      return state
  }
}

export default autocompleteList
