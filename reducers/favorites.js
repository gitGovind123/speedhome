import { GET_FAV_PROPERTY_LIST } from '../actions/types'

const initialState = {
  pageNumber: 0,
  pageSize: 9,
  sort: '-dateCreated'
}

const favoritesReducers = (state = initialState, action) => {
  const { type, favorites } = action
  switch (type) {
    case GET_FAV_PROPERTY_LIST:
      return favorites
    default:
      return state
  }
}

export default favoritesReducers
