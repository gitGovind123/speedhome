import { GET_TEST_LIST } from '../actions/types'

const initialState = {}

const ProfileReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_TEST_LIST:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}

export default ProfileReducer
