import axios from "axios"


const baseURL = 'https://partners-staging.safegold.com/v1';


const apiRequest = async (method, endpoint, data) => {


  try {

    let config = {
      method: method,
      maxBodyLength: Infinity,
      url: baseURL + endpoint,
      data,

      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer 038bb7f7dbbb92ef41d56fdd88030f1c',
        'Content-Type': 'application/json'
      }
    };

    let result = await axios.request(config)

    return {
      response: true,
      error: null,
      data: result.data,
    };

  } catch (error) {
    return {
      response: false,
      status: error.response?.status,
      data: error.response?.data,
    };
  }
};


export const get = (endpoint) => apiRequest('get', endpoint);

