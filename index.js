const fs = require('fs')
const path = require('path')
const request = require('./utils/request')
const _ = require('lodash')

const reqData = require('./req.json')

const handleResponse = ({ criteria, result }) => {
  // todo
  return { criteria, result }
}

const sendReq = ({ criteria, body }) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/post',
      method: 'post',
      data: body
    })
      .then(res => {
        resolve(handleResponse({ criteria, result: res.origin }))
      })
      .catch(reject)
  })
}

const prepareReqDataArr = reqBody =>
  Object.keys(reqBody).map(k => ({
    criteria: `${k} is missing`,
    body: _.omit(_.cloneDeep(reqData), [k])
  }))

const resList = []

Object.keys(reqData).forEach(k => {
  const obj = _.cloneDeep(reqData[k])
  Object.keys(obj).forEach(k2 => {
    reqData[k] = _.omit(obj, [k2])
    resList.push(_.cloneDeep(reqData))
  })
  reqData[k] = obj
})

// const reqDataArr = prepareReqDataArr(reqData)
console.log(resList)

console.log(reqData)

// Promise.all(reqDataArr.map(data => sendReq(data))).then(res => {
//   console.log(res)
// })
