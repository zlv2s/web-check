const request = require('./request')
const _ = require('lodash')

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

const prepareReqDataArr = reqBody =>
    Object.keys(reqBody).map(k => _.omit(_.cloneDeep(reqData), [k]))

const newDataArr = prepareReqDataArr(reqData)

Promise.all(newDataArr.map(data => request({url: '/post', method: 'post', data}))).then(res => {
    console.log(res)
})
