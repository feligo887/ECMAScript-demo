const obj = {}
// Reflect  === Object
Reflect.defineProperty(obj, 'name', {
    value: 'xiecheng',
    writable: true,
    configurable: true,
    enumerable: false
})
Reflect.defineProperty(obj, 'age', {
    value: 34,
    writable: true,
    configurable: true,
    enumerable: true
})

for(let key in obj){
    console.log(key)
}
console.log(Object.getOwnPropertyDescriptors(obj))
console.log(Object.getOwnPropertyDescriptor(obj, 'age'))