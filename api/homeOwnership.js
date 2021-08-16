import axios from "axios"
import { API_HOST } from "../env"
import { admin_token } from "../globalutilities/consts"

export const getHomeOwnershipListAPI = () => {
    return new Promise((resolve, reject) => {
        axios({
            url: `${API_HOST}home-ownership`,
            data: null,
            headers: {
                "Content-Type": "application/json",
                "Authorization": admin_token
            },
            method: "GET"
        })
            .then(response => response.data)
            .then(json => resolve(json))
            .catch(error => reject(error));
    });
}

export const sendInfoRequestAPI = (data) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_HOST}home-ownership-collection/submit`,
      data,
      headers: {
        "Content-Type": "application/json",
        "Authorization": admin_token
      },
      method: "POST",
    })
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}