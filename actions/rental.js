import axios from 'axios'
import { API_HOST, PROXY_API_HOST } from '../env'
import { getToken, logOut } from '../globalutilities/helpers'
import Cookies from 'js-cookie'

export const getRentaltPropertiesList = async user => {
  try {
    const response = await axios.post(
      `${PROXY_API_HOST}report/rental/new`,
      user,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: user.authToken || getToken() || ''
        }
      }
    )
    return { success: true, data: response.data || [] }
  } catch (err) {
    if (getToken() && err && err.response && err.response.status === 401) {
      logOut()
    } else {
      return { success: false, message: err.message }
    }
  }
}

export function getPayLink (userDisplayId, data) {
  const token = Cookies.get('authToken')
  return async () => {
    function onSuccess (success) {
      return success
    }
    function onError (error) {
      return error
    }

    try {
      const success = await axios({
        url: `${PROXY_API_HOST}rental/order/pay`,
        headers: {
          Authorization: token || getToken() || ''
        },
        method: 'post',
        data
      })
      return onSuccess(success)
    } catch (error) {
      if (
        token ||
        (getToken() && error && error.response && error.response.status === 401)
      ) {
        logOut()
      }

      return onError(error)
    }
  }
}
