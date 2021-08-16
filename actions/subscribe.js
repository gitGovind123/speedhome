import axios from 'axios';
import { API_HOST } from '../env';

export const SUBSCRIBE_STATUS = 'SUBSCRIBE_STATUS';

export function receiveSubscribeStatus (json) {
  return { type: SUBSCRIBE_STATUS, subscribeStatus: json };
}

export function subscribeUser (email) {
  return dispatch => {
    return axios({
      url: `${API_HOST}email-collection`,
      headers: {
        Authorization: 'adm_3WvXqd5kLkMNdy2ZnGyV5h8LbnrtwV',
        'X-Device-ID':
          '[{"key":"X-Device-ID","value":"1asojfsaf12414","enabled":true}]'
      },
      method: 'post',
      data: {
        email: email
      }
    })
      .then(response => response.status)
      .then(json => dispatch(receiveSubscribeStatus(json)))
      .catch(e => e);
  };
}
