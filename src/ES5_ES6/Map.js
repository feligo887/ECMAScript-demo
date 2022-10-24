//  Map的性能高于Object

let obj = {
    name: 'imooc'
}

let map = new Map([
    ['name', 'imooc'],
    ['age', 5]
])

// map.set('name', 'zhangsan')
// map.set(obj, 'es') // 添加
// map.delete('name')
// map.delete(obj)  //  删除
// console.log(map.size) // 长度
// console.log(map.has('name')) // 判断key
// console.log(map.get('age')) // 获取
// map.clear()  // 清空

// console.log(map)

// 遍历
// map.forEach((value, key) => console.log(value, key))

// for(let [key, value] of map){
//     console.log(key, value)
// }

// for(let key of map.keys()){
//     console.log(key)
// }

// for(let value of map.values()){
//     console.log(value)
// }

// for(let [key, value] of map.entries()){
//     console.log(key, value)
// }

// map  object


// WeakMap只能添加对象，弱引用便于垃圾回收
let wm = new WeakMap()
let elem = document.getElementsByTagName('h1')
wm.set(elem, 'info')
console.log(wm.get(elem))
// wm.clear()