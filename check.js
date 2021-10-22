const request = require('./request')

const checkWebsite = async url => {
  const status = await request({
    url,
    method: 'get'
  })
  return status
}

module.exports = checkWebsite
