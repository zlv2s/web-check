const check = require('../check')

test('empty url should return false', async () => {
  const data = await check('')
  expect(data).toBe(false)
})

test('google should return object', async () => {
  const data = await check('google.com')
  expect(typeof data).toBe('object')
})

test('down domain should return false ', async () => {
  const data = await check('notexistwebsite.commm')
  expect(data.isDown).toBe(true)
})

test('twitter should return 200', async () => {
  const data = await check('twitter.com')
  expect(data.statusCode).toBe(200)
})
