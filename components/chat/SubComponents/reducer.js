import _ from 'lodash'
export const initState = {
  lastMessageID: '',
  activeChat: '',
  conversationMessages: [],
  convLength: 0,
  messageCount: 0,
  sessionUser: '',
  messageInput: '',
  file: '',
  imgPreviewUrl: '',
  openImageModal: false,
  messageImage: '',
  openSetting: false,
  openContact:false,
  isSomeoneTypingStatus: false,
  isSomeoneTypingUserId: '',
  appointMentData: null,
  isUploadingImg: false,
  videoPreviewUrl: '',
  isUploadingVideo: false,
  preSignedPayload: null
}

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_INIT_STATE': {
      return {
        ...state,
        activeChat: payload.activeChat,
        sessionUser: payload.sessionUser,
        conversationMessages: []
      }
    }
    case 'UPLOAD_IMAGE_BEGIN': {
      return {
        ...state,
        isUploadingImg: true,
        file: '',
        imgPreviewUrl: ''
      }
    }
    case 'UPDATE_CONVERSATION_MESSAGES':
      const UpdatedList = [...state.conversationMessages, ...payload.message]
      const uniqeList = _.uniqBy(UpdatedList, function (o) {
        return o.id
      })
      return {
        ...state,
        conversationMessages: uniqeList
      }

    case 'SET_NEW_MESSAGE': {
      return {
        ...state,
        conversationMessages: [payload.message, ...state.conversationMessages]
      }
    }

    case 'UPDATE_MESSAGE_INPUT':
      return {
        ...state,
        messageInput: payload.msg,
        messageCount: state.messageCount + 1
      }

    case 'SET_MESSAGE_INPUT':
      return {
        ...state,
        messageInput: ''
      }

    case 'SET_ADD_IMAGE_URL':
      return {
        ...state,
        file: payload.file,
        imgPreviewUrl: payload.imgPreviewUrl
      }

    case 'UPLOAD_VIDEO_BEGIN': {
        return {
            ...state,
            isUploadingVideo: true
        }
    }
    case 'SET_PRE_SIGNED_URL':
      return {
        ...state,
          preSignedPayload: payload.preSignedPayload
      }

    case 'SET_ADD_VIDEO_URL':
      return {
        ...state,
        videoPreviewUrl: payload.videoPreviewUrl
      }
    case 'SET_REMOVE_VIDEO_URL':
      return {
          ...state,
          videoPreviewUrl: '',
          isUploadingVideo: false,
          preSignedPayload: null
      }

   case 'SET_REMOVE_VIDEO_URL_LOADER':
      return {
          ...state,
          isUploadingVideo: false,
      }

    case 'SET_REMOVE_IMAGE_URL':
      return {
        ...state,
        file: '',
        imgPreviewUrl: '',
        isUploadingImg: false
      }

    case 'SET_OPEN_IMAGE_MODAL':
      return {
        ...state,
        openImageModal: payload.openImageModal,
        messageImage: payload.messageImage
      }

    case 'SET_CLOSE_IMAGE_MODAL':
      return {
        ...state,
        openImageModal: payload.openImageModal
      }

    case 'SET_TYPING':
      return {
        ...state,
        isSomeoneTypingStatus: payload.isSomeoneTypingStatus,
        isSomeoneTypingUserId: payload.isSomeoneTypingUserId
      }
    case 'LAST_MESSAGE_ID':
      return {
        ...state,
        lastMessageID: payload.lastMessageID
      }
    case 'SET_SETTINGS_MODAL_OPEN':
      return {
        ...state,
        openSetting: payload
      }
    case 'SET_SETTINGS_MODAL_CLOSE':
      return {
        ...state,
        openSetting: payload
      }
      case 'SET_Contacts_MODAL_OPEN':
      return {
        ...state,
        openContact: payload
      }
    case 'SET_Contacts_MODAL_CLOSE':
      return {
        ...state,
        openContact: payload
      }
    case 'SET_APPOINTMENT_DATA':
      return {
        ...state,
        appointMentData: payload
      }

    default:
      throw new Error()
  }
}
