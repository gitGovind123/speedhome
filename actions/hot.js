import axios from 'axios'

import { API_HOST } from '../env'
import { admin_token } from '../globalutilities/consts'

export const getHotPropertiesList = async () => {
  try {
    const response = await axios.post(
      `${API_HOST}recommended/popular/areas`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: admin_token
        }
      }
    )
    return { success: true, data: response.data || [] }
  } catch (err) {
    return { success: false, message: err.message }
  }
}

export const getActiveCampaign = async () => {
  try {
    const response = await axios({
      url: `${API_HOST}partnerships/campaigns/on-going`,
      headers: {
        Authorization: admin_token,
        'Content-Type': 'application/json'
      },
      data: {},
      method: 'get'
    })
    return { success: true, data: response.data || [] }
  } catch (err) {
    return { success: false, message: err.message }
  }
}

export const getHotDeals = async () => {
  try {
    const response = await axios({
      url: `${API_HOST}hotdeals/deals/on-going`,
      headers: {
        Authorization: admin_token,
        'Content-Type': 'application/json'
      },
      data: {},
      method: 'get'
    })
    return { success: true, data: response.data || [] }
  } catch (err) {
    return { success: false, message: err.message }
  }
}
