import { SELECT_PROPERTY, DESELECT_PROPERTY } from '../actions/singleProperty'

const initialState = {
  selected: null
}

const singleProperty = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PROPERTY:
      return {...state, selected: action.payload}
    case DESELECT_PROPERTY: {
      return {...state, selected: null}
    }
    default:
      return state
  }
}

export default singleProperty
