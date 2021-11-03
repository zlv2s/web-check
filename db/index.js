let mysql = require('mysql')

let connection = mysql.createConnection({
  host: '112.124.67.0',
  port: '33063',
  user: 'root',
  password: 'Syu1314'
})

const query = `select * from \`demo-2\`.gl_data`

connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message)
  }

  console.log('Connected to the MySQL server.')
})

connection.query(query, (error, rows) => {
  console.log(error)
  console.log(JSON.parse(JSON.stringify(rows)))
})
