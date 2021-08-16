import axios from 'axios'
import { API_HOST } from '../env'

export const AUTOCOMPLETE = 'AUTOCOMPLETE'
export const REMOVE_AUTOCOMPLETE = 'REMOVE_AUTOCOMPLETE'
import { getToken,logOut} from '../globalutilities/helpers'
import { admin_token } from '../globalutilities/consts'

export function receiveAutocompleteList (json) {
  return { type: AUTOCOMPLETE, autocompleteList: json }
}

export function fetchAutocompleteList (q) {
  return dispatch => {
    return axios({
      url: `${API_HOST}properties/search/name/autocomplete`,
      headers: {
        Authorization: getToken() || admin_token
      },
      method: 'post',
      data: {
        keywords: q
      }
    })
      .then(response => response.data)
      .then(json => dispatch(receiveAutocompleteList(json)))
      .catch(error =>{
       if (error && error.response && error.response.status === 401) {          
        logOut();

        }
      } )
  }
}

export function removeAutocompleteList () {
  return dispatch => {
    dispatch({
      type: REMOVE_AUTOCOMPLETE,
      autocompleteList: null
    })
  }
}

export const autoCompletePriceCheckerPropertyList = async data => {
  try {
    const response = await axios({
      url: `${API_HOST}properties/price-checker/name/autocomplete`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: admin_token
      },
      data: data,
      method: 'post'
    })
    return { success: true, data: response.data || {} }
  } catch (err) {
    return { success: false, data: err.message }
  }
}
export const propertyPriceChecker = async data => {
  try {
    const response = await axios({
      url: `${API_HOST}properties/price-checker/check`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: admin_token
      },
      data: data,
      method: 'post'
    })
    return { success: true, data: response.data || {} }
  } catch (err) {
    return { success: false, data: err.message }
  }
}
