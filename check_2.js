const axios = require('axios')
const _ = require('lodash')

const request = axios.create({
  baseURL: 'http://httpbin.org/post',
  timeout: 8000,
  proxy: {
    host: '127.0.0.1',
    port: '7890'
  }
})

const reqData = {
  foo: 'foo',
  bar: 'bar',
  baz: 'baz',
  name: 'jerry',
  age: 12,
  id: '123456',
  address: 'Cheng Du, China',
  phone: '187828213213'
}

const newDataArr = Object.keys(reqData).map(k => {
  return _.omit(_.cloneDeep(data), [k])
})

const sendRequest = data => {
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      data
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

Promise.all(newDataArr.map(sendRequest)).then(res => {
  console.log(res)
})
