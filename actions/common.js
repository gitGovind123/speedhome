import axios from 'axios'

import { API_HOST, X_OS_VERSION, PUBLIC_AUTH_TOKEN } from '../env'
import { getToken,logOut } from '../globalutilities/helpers'

export const userEventTracking = async (attr, id) => {
  if (getToken()) {
    try {
      const response = await axios.post(
        `${API_HOST}users/track`,
        { attr, id },
        {
          headers: {
            Authorization: getToken(),
            'Content-Type': 'application/json',
            'X-OS-Version': X_OS_VERSION,
            'X-Device-ID': PUBLIC_AUTH_TOKEN
          }
        }
      )
      return { success: true, data: response.data || [] }
    } catch (err) {
      if(err && err.response && err.response.status === 401){
        logOut()
      }else{
        return { success: false, message: err.message }

      }
    }
  }
}
