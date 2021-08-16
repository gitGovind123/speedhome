import axios from 'axios'
import { API_HOST, X_OS_VERSION } from '../env'
import { admin_token } from '../globalutilities/consts'
import { getDeviceId, getToken } from '../globalutilities/helpers'

export const getPropertyInfoAPI = propertyId => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}properties/${propertyId}`,
      data: null,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || admin_token,
        'X-Device-ID': getDeviceId() || admin_token,
        'X-OS-Version': X_OS_VERSION
      }
    })
      .then(response => response.data)
      .then(json => resolve(json))
      .catch(error => reject(error))
  })
}
