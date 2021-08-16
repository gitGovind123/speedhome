import { API_HOST } from '../env'
import axios from 'axios'
import { getToken, getUserId,logOut } from '../globalutilities/helpers'

export const getFavPropertyList = (user, params) => async dispatch => {
  try {
    const { pageNumber, pageSize, sort } = params
    const query = `pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}`

    const response = await axios({
      url: `${API_HOST}users/${user.id}/favourite-properties?${query}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.authToken || ''
      },
      data: {},
      method: 'get'
    })
    return {
      type: 'success',
      favorites: response.data || {}
    }
  } catch (err) {
    return {
      type: 'error',
      favorites: {}
    }
  }
}

export const deleteFavorite = async propertyId => {
  try {
    const response = await axios(
      `${API_HOST}users/favourite-properties/${propertyId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken() || ''
        },
        data: {},
        method: 'delete'
      }
    )
    return { success: true, data: response.data }
  } catch (err) {
    if(err && err.response && err.response.status === 401){
      logOut()
    }else{
      
    const { data } = err.response
    const errorMessage = data.message
    return { success: false, message: errorMessage }
    }
  }
}

export const addToFavorite = async payload => {
  try {
    const res = await axios.post(
      `${API_HOST}users/${getUserId()}/favourite-properties`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken()
        }
      }
    )
    return { success: true, data: res.data }
  } catch (err) {
    if(err && err.response && err.response.status === 401){
      logOut()
    }else{
      
    const { data } = err.response
    const errorMessage = data.message
    return { success: false, message: errorMessage }
    }
  }
}

export const checkPropertyIsFavoriteOrNot = async propertyId => {
  try {
    const response = await axios({
      url: `${API_HOST}users/${getUserId()}/favourite-properties`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || ''
      },
      data: {},
      method: 'get'
    })
    const isFav =
      (response &&
        response.data &&
        response.data.content.find(
          item => parseInt(item.property.id, 10) === parseInt(propertyId, 10)
        )) ||
      null
    return { success: true, favorite: isFav || null }
  } catch (err) {
    if(err && err.response && err.response.status === 401){
      logOut()
    }else{
      
    const { data } = err.response
    const errorMessage = data.message
    return { success: false, message: errorMessage }
    }
    
  }
}
