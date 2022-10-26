## ES8(2017)
### async/await 异步编程解决方案

- async/await：是generator的一个语法糖
- async：返回的是一个Promise.resolve()

### 对象扩展
- Object.values()： 返回Object 所有值的value
- Object.entries()： 返回Object 所有值的key和value
```
const obj = {
    name: '张三',
    age: 18,
    height: 185
}
console.log('Object.values(): ', Object.values()); // ['张三',18,185]
console.log('Object.entries(): ', Object.values()); // [[name,'张三']['age',18],['height',185]]
```
### Object.getOwnPropertyDescriptor() 对象属性描述符
#### 某个对象，某个有属性的描述
- value：对象下的默认值/设置值
- writable：value的值能否修改，默认true
- enumerable：是否能遍历，默认为true
- configurable：是否能删除，默认为true

### Object.getOwnPropertyDescriptors() 对象属性描述符
#### 某个对象下所有属性的描述
- value：对象下的默认值/设置值
- writable：value的值能否修改，默认true
- enumerable：是否能遍历，默认为true
- configurable：是否能删除，默认为true

具体用法：src/ES8(2017)/Object.getOwnPropertyDescriptors.js

### 字符串扩展
- String.prototype.padStart(n,str): 以str字符串从头部开始填充总长度为n
- String.prototype.padEnd(n,str): 以str字符串从尾部开始填充总长度为n

```
let str = '123';
// console.log(str.padStart(5, 'x')); //xx123 
// console.log(str.padEnd(5, 'y')) // 123yy
```

具体用法： src/ES8(2017)/string.padStart-string.padEnd.js

### 尾逗号
```
function foo(
    a, 
    b, 
    c,
    d,
) {
    console.log(a, b, c)
}

foo(4, 5, 6, )
```
- 参数最后一位后面可以加逗号不会报错