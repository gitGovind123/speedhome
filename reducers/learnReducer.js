import { LEARN_ITEMS } from '../actions/types'

const initialState = { learnItem: 'blog' }

const learnReducers = (state = initialState, action) => {
  switch (action.type) {
    case LEARN_ITEMS:
      return {
        ...state,
        learnItem: action.payload
      }
    default:
      return state
  }
}

export default learnReducers
