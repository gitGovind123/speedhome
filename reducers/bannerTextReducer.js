import { BANNER_TEXT } from '../actions/types'

const initialState = { bannerText: null }

const BannerTextReducer = (state = initialState, action) => {
  switch (action.type) {
    case BANNER_TEXT:
      return {
        ...state,
        bannerText: action.payload
      }
    default:
      return state
  }
}

export default BannerTextReducer
