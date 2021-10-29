const axios = require('axios')
const { BASE_URL } = require('../config')

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 8000
})

service.interceptors.request.use(
  config => {
    // todo
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data
    } else {
      Promise.reject(response)
    }
  },
  error => {
    console.log(error.response)
    return Promise.reject(error.response.data)
  }
)

module.exports = service
