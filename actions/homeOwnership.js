import { getHomeOwnershipListAPI, sendInfoRequestAPI } from "../api/homeOwnership"

export const HOME_OWNERSHIP_LIST = "HOME_OWNERSHIP_LIST"
export const HOME_OWNERSHIP_INFO_REQUEST = "HOME_OWNERSHIP_INFO_REQUEST"

export const getHomeOwnershipList = () => {
  return dispatch => {
    return getHomeOwnershipListAPI()
      .then(response => {
        dispatch(setHomeOwnershipList(response))
      })
      .catch(error => error);
  }
}

const setHomeOwnershipList = (json) => {
  return { type: HOME_OWNERSHIP_LIST, homeOwnershipList: json };
}

export const sendInfoRequest = (data) => {
  return dispatch => {
    return sendInfoRequestAPI(data)
      .then(response => {
        dispatch(setInfoRequest(response))
      })
      .catch(error => error);
  }
}

const setInfoRequest = (json) => {
  return { type: HOME_OWNERSHIP_INFO_REQUEST, homeOwnershipInfoRequestStatus: json.status };
}