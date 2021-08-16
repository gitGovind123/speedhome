import {
  PROPERTY_INFO,
  SET_DATE,
  SET_TIME,
  SET_VIEWING_DATE,
  GET_VIEWING_DATE,
  GET_VIEWING_TIME,
  GET_PRESET_FILTER
} from '../actions/property'

const initialState = {
  selectedProperty: null,
  date: null,
  viewingDate: null,
  time: null,
  presetFilter: null
}

function property (state = initialState, action) {
  switch (action.type) {
    case PROPERTY_INFO:
      return JSON.parse(
        JSON.stringify({
          ...state,
          ...{ selectedProperty: action.propertyInfo }
        })
      )
    case SET_DATE:
      return { ...state, date: action.payload.date }
    case SET_VIEWING_DATE:
      return { ...state, viewingDate: action.payload }
    case SET_TIME:
      return { ...state, time: action.payload }
    case GET_VIEWING_DATE:
      return { ...state, viewingDate: action.payload }
    case GET_VIEWING_TIME:
      return {
        ...state,
        time: action.payload
      }
    case GET_PRESET_FILTER:
      return { ...state, presetFilter: action.payload }
    default:
      return state
  }
}

export default property
