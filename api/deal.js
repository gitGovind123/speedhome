import axios from 'axios'
import { API_HOST } from '../env'
import { getToken, getUserId,logOut } from '../globalutilities/helpers'
import { admin_token } from '../globalutilities/consts'

export const getDealByuserIdAndPropertyId = (userId, propertyId) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}deals`,
      user_Id: userId,
      property_Id: propertyId,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || admin_token
      }
    })
      .then(response => response.data)
      .then(json => resolve(json))
      .catch(error => {
        if(getToken() && error && error.response && error.response.status === 401){
          logOut(); 
        }else{
          reject(error)

        }
      })
  })
}

export const createDealApiCall = data => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}deals`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || admin_token
      },
      dto: data
    })
      .then(response => response.data)
      .then(json => resolve(json))
      .catch(error =>{
        if(getToken() && error && error.response && error.response.status === 401){
          logOut(); 
        }else{
          reject(error)

        }
      })
  })
}

export const getDeal = (user, hash) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}deals/${hash}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: (user && user.authToken) || getToken() || admin_token
      },
      method: 'get',
      data: {}
    })
      .then(response => response.data)
      .then(json => resolve(json))
      .catch(error => {
        if( ((user && user.authToken) || getToken()) && error && error.response && error.response.status === 401){
          logOut(); 
        }else{
          reject(error)

        }
      })
  })
}

export const updateDealApiCall = (data, hash) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}deals/${hash}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || admin_token
      },
      method: 'put',
      data
    })
      .then(response => response.data)
      .then(json => resolve(json))
      .catch(error => {
        if(getToken() && error && error.response && error.response.status === 401){
          logOut(); 
        }else{
          reject(error)
        }
      })
  })
}

export const createBookingByApiCall = hash => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}deals/${hash}/booking`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || admin_token
      },
      data: {}
    })
      .then(response => response.data)
      .then(json => resolve(json))
      .catch(error => {
        if(getToken() && error && error.response && error.response.status === 401){
          logOut(); 
        }else{
          reject(error)

        }
      })
  })
}

export const addDocumentApiCall = (data, hash) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}deals/${hash}/documents`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || admin_token
      },
      data
    })
      .then(response => response)
      .then(json => resolve(json))
      .catch(error => {
        if(getToken() && error && error.response && error.response.status === 401){
          logOut(); 
        }else{
          reject(error)

        }
      })
  })
}

export const verifyDocumentApiCall = hash => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}deals/${hash}/documents/verify`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || admin_token
      },
      method: 'post',
      data: {}
    })
      .then(response => response.data)
      .then(json => resolve(json))
      .catch(error =>{
        if(getToken() && error && error.response && error.response.status === 401){
          logOut(); 
        }else{
          reject(error)

        }
      })
  })
}

export const createRamci = (data, hash) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}deals/${hash}/ramci`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || admin_token
      },
      data
    })
      .then(response => response.data)
      .then(json => resolve(json))
      .catch(error => {
        if(getToken() && error && error.response && error.response.status === 401){
          logOut(); 
        }else{
          reject(error)

        }
      })
  })
}

export const verifyBookingByApiCall = hash => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}deals/${hash}/verify/booking`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken() || admin_token
      },
      data: {}
    })
      .then(response => response.data)
      .then(json => resolve(json))
      .catch(error =>{
        if(getToken() && error && error.response && error.response.status === 401){
          logOut(); 
        }else{
          reject(error)

        }
      })
  })
}

export const getDocumentByUserIdAPI = () => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}documents/users/${getUserId()}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      },
      data: {}
    })
      .then(response => response.data)
      .then(json => resolve(json))
      .catch(error => {
        if(getToken() && error && error.response && error.response.status === 401){
          logOut(); 
        }else{
          reject(error)

        }
      })
  })
}

export const submitDocumentForPreDocAPI = (docId, docData) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}documents/${docId}/upload`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      },
      data: docData
    })
      .then(response => response.data)
      .then(json => {
        resolve(json)
      })
      .catch(error => {
        if(getToken() && error && error.response && error.response.status === 401){
          logOut(); 
        }else{
          reject(error)

        }
      })
  })
}
