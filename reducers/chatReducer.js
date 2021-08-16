import { CHAT_UNREAD_COUNT, CHAT_UNREAD_FORCE } from '../actions/chatAction'

const initialState = {
  unreadMessageCount: 0
}

function chatReducer (state = initialState, action) {
  switch (action.type) {
    case CHAT_UNREAD_COUNT:
      return { ...state, unreadMessageCount: action.payload }
    case CHAT_UNREAD_FORCE:
      let message = 0
      if (state.unreadMessageCount >= action.payload) {
        message = state.unreadMessageCount - action.payload
      }
      return {
        ...state,
        unreadMessageCount: message
      }
    default:
      return state
  }
}

export default chatReducer
