import axios from 'axios'
import { API_HOST, PUBLIC_AUTH_TOKEN } from '../env'
import { getToken,logOut } from '../globalutilities/helpers'

export const SUBSCRIBE_PROPERTY_ALERT = 'SUBSCRIBE_PROPERTY_ALERT'

export function receiveSubscribePropertyAlert (json) {
  return { type: SUBSCRIBE_PROPERTY_ALERT, subscribePropertyAlert: json }
}

export function subscribeAlert (data) {
  return dispatch => {
    return axios({
      url: `${API_HOST}properties/alerts`,
      headers: {
        Authorization: getToken() || PUBLIC_AUTH_TOKEN
      },
      method: 'post',
      data
    })
      .then(response => response.data)
      .then(json => dispatch(receiveSubscribePropertyAlert(json)))
      .catch(err =>{
        if(getToken() && err && err.response && err.response.status === 401){
          logOut(); 
        }
      })
  }
}
