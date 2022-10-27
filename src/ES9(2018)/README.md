## ES9(2018)

### 异步迭代
- for-await-of: 可以遍历包含Promise数组的 异步迭代器 
- Sybol.asyncIterator: 异步的可迭代协议

具体事例见：src/ES9(2018)/asyncIterator.js

### 正则表达式
```
// 修饰符: g i m y u s

const reg = /./
console.log(reg.test('5')) // true
console.log(reg.test('x')) // true
console.log(reg.test('\n')) // false
console.log(reg.test('\r')) // false
console.log(reg.test('\u{2028}')) // false
console.log(reg.test('\u{2029}')) // false

const reg = /./s
console.log(reg.test('5')) // true
console.log(reg.test('x')) // true
console.log(reg.test('\n')) // true
console.log(reg.test('\r')) // true
console.log(reg.test('\u{2028}')) // true
console.log(reg.test('\u{2029}')) // true
```
### 对象扩展

```

 const obj1 = {
     name: 'shangsan',
     age: 16,
     height: 185
 }

 const obj2 = {
    name: 'lisi',
    age: 18,
    height: 178
}

// 克隆对象: 这样的克隆类似于slice，拷贝的对象里面只能是基础数据类型
 const obj3 = { ...obj1}
 obj1.age = 18
 console.log(obj3) // {name: 'shangsan', age: 16,height: 185}

// 合并对象
const obj4 = {...obj1, ...obj2}
console.log(obj4)

const {name, age, ...rest} = obj1
console.log(name)
console.log(age)
console.log(rest)
```

### Promise扩展
- Promise.finally()： 不管成功还是失败都会被调用
### 字符串扩展
```
 const foo = (a, b, c, d) => {
    console.log(a) // ['这是', ', 他的年龄是', '岁', raw: Array(3)]
    console.log(b) // 张三
    console.log(c) // 18
    console.log(d) // undefined
}

const name = 'xiecheng'
const age = 34
foo`这是${name}, 他的年龄是${age}岁`

foo`\u{61} and \unicode` // 这么传入不会报错。返回[undefined, raw: Array(1)]、undefined

```