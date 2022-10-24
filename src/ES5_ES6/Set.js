let s = new Set([1,2,3,4,5,6,1,2,3]);

s.add(0) // 添加数据
s.delete(2) //  删除数据
// s.clear()  // 清空数据

// set数组去重
// Set的值只能唯一，所以能别去重（基本类型），引用类型因为存储机制，Set的特性不能被很好的运用。

console.log('new Set([1,2,3,4,5,6,1,2,3]): ', new Set([1,2,3,4,5,6,1,2,3]));//[1,2,3,4,5,6]
console.log('new Set([{a:1},{a:1}]): ', new Set([{a:1},{a:1}])); // [{a:1},{a:1}]
console.log('new Set([[1,2,3],[1,2,3]]): ', new Set([[1,2,3],[1,2,3]])); // [[1,2,3],[1,2,3]]

// 遍历

s.forEach(item => console.log(item))
for (let item of s) {
    console.log(item)
}
for (let item of s.keys()) {
    console.log(item)
}
for (let item of s.values()) {
    console.log(item)
}
for (let item of s.entries()) {
    console.log(item[0], item[1])
}


// WeakSet
// WeakSet只能添加对象，弱引用便于垃圾回收

let ws = new WeakSet()
const obj1 = {
    name: 'imooc'
}
const obj2 = {
    age: 5
}
ws.add(obj1)
ws.add(obj2)
// ws.delete(obj1)