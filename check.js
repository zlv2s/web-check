const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://api.downfor.cloud/httpcheck/',
  timeout: 8000,
  proxy: {
    host: '127.0.0.1',
    port: '7890'
  }
})

const sendRequest = (url) => {
  return new Promise((resolve, reject) => {
    if (!url) resolve(false)
    instance
      .get(url)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })
}

const checkWebsite = async (url) => {
  const status = await sendRequest(url)
  return status
}

module.exports = checkWebsite
