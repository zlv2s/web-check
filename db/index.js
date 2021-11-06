let mysql = require('mysql')

const db = mysql.createConnection({
    host: '112.124.67.0',
    port: '33063',
    user: 'root',
    password: 'Syu1314'
})

class DB {
    static getInstance() {
        if (!this.instance) {
            this.instance = new DB()
        }
        return this.instance
    }

    constructor() {
        this.db = mysql.createConnection({
            host: '112.124.67.0',
            port: '33063',
            user: 'root',
            password: 'Syu1314'
        })
        this.init()
    }

    async init() {
        const message = await this.connect()
        console.info(message)
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.db.connect(function (err) {
                if (err) {
                    reject(err.message)
                }
                resolve('Connected to the MySQL server')
            })
        })
    }

    query(criteria) {
        return new Promise((resolve, reject) => {
            if (typeof criteria !== 'string') {
                reject('query not correct')
            }
            this.db.query(criteria, (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(rows)
            })
        })
    }
}


module.exports = DB.getInstance()

