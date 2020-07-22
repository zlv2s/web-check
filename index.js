const argv = process.argv

const check = require('./check')

const domain = argv.slice(2, 3)

const response = check(...domain)

response.then((res) => console.log(res.data)).catch((err) => console.log(err))
