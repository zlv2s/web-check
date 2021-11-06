// const a = new Proxy([1, 2, 3], {
//     get() {
//         return Reflect.get(...arguments)
//     },
//     set(target, property, value) {
//         console.info('property changed, ' + property)
//         target[property] = value
//         return true
//     }
// })
//
// // console.info(a[2])
// a.push(777)
//
// console.log(a)

const arr = new Proxy([11, 22, 33], {
    get() {
        return Reflect.get(...arguments)
    },
    set(target, property, value) {
        console.info('arr set, property changed, ' + property)
        target[property] = value
        return true
    }
})


const a = new Proxy({
    foo: arr
}, {
    get() {
        return Reflect.get(...arguments)
    },
    set(target, property, value) {
        console.info('a set, property changed, ' + property)
        target[property] = value
        return true
    }
})

// console.info(a[2])
a.foo.push(777)

console.log(a)