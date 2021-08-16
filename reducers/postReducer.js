import {
  CREATE_POST,
  UPLOAD_POST_IMAGE,
  UPDATE_POST,
  GET_POST,
  CREATION_FLOW,
  UPDATE_POST_FOR_RENT,
  RESET_POST
} from '../actions/post'

const INITIAL_STATE = {
  property: null,
  newProperty: null,
  updatedPost: null,
  imagurls: [],
  creationFLow: true
}

function postReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_POST:
      return { ...state, property: null, newProperty: null }
    case GET_POST:
      return { ...state, property: action.payload }
    case CREATE_POST:
      return { ...state, newProperty: action.payload }
    case UPDATE_POST:
      return { ...state, property: action.payload }
    case UPDATE_POST_FOR_RENT:
      return { ...state, updatedPost: action.payload }
    case UPLOAD_POST_IMAGE:
      return { ...state, imagurls: [...state.imagurls, action.payload] }
    case CREATION_FLOW:
      return { ...state, creationFLow: action.payload }
    default:
      return state
  }
}

export default postReducer
