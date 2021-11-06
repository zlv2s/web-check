const db = require('./db')

const query = `select * from \`demo-2\`.gl_data`

function statByLoanId(rowsArr) {
    const map = new Map()
    rowsArr.map(x => {
        x.business_date = x.business_date.split('T')[0]
        return x
    }).forEach(row => {
        if (map.has(row.loan_id)) {
            const exist = map.get(row.loan_id)
            if (!exist[row.business_date]) {
                exist[row.business_date] = {}
                exist[row.business_date][`${row.txn_code}_${row.txn_desc}`] = [row.amount]
            } else {
                if (exist[row.business_date][`${row.txn_code}_${row.txn_desc}`]) {
                    exist[row.business_date][`${row.txn_code}_${row.txn_desc}`].push(row.amount)
                } else {
                    exist[row.business_date][`${row.txn_code}_${row.txn_desc}`] = [row.amount]
                }
            }
        } else {
            const obj = {}
            map.set(row.loan_id, obj)
            obj[row.business_date] = {}
            obj[row.business_date][`${row.txn_code}_${row.txn_desc}`] = [row.amount]
        }
    })
    console.log(JSON.stringify(Object.fromEntries(map.entries())))
}


function proxyObj(obj) {
    return new Proxy(obj, {
        get(target, property) {
            if (property === 'total') {
                return target['amount'].reduce((ac, num) => ac + num, 0).toFixed(2)
            }
            return target[property]
        },
        set(target, property, value) {
            // 不会监测到amount数组变化
            console.log(property + 'changed')
            target[property] = value
            return true
        }
    })
}

function statByBusiDate(rowsArr) {
    const map = new Map()
    rowsArr.map(x => {
        x.business_date = x.business_date.split('T')[0]
        return x
    }).forEach(row => {
        if (map.has(row.business_date)) {
            const exist = map.get(row.business_date)
            if (exist[`${row.txn_code}_${row.txn_desc}`]) {
                exist[`${row.txn_code}_${row.txn_desc}`]['amount'].push(row.amount)
            } else {
                exist[`${row.txn_code}_${row.txn_desc}`] = proxyObj({
                    amount: [row.amount],
                    total: 0
                })
            }
        } else {
            const obj = {}
            map.set(row.business_date, obj)
            obj[`${row.txn_code}_${row.txn_desc}`] = proxyObj({
                amount: [row.amount],
                total: 0
            })
        }
    })
    console.log(JSON.stringify(Object.fromEntries(map.entries())))
}

async function main() {
    try {
        const rows = await db.query(query)
        const rowsArr = JSON.parse(JSON.stringify(rows))
        // statByLoanId(rowsArr)
        statByBusiDate(rowsArr)
    } catch (e) {
        console.error('caught error: ', e)
    }
}


main()