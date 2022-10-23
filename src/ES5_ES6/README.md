### 新的声明方式
```
let a;
const b;
```
与 var 声明变量的区别

- 不属于顶层window

- 不允许重复声明

- 不存在变量提升

- 暂时性死区

*暂时性死区：不能在变量声明之前使用变量*

- 块级作用域

### 解构赋值

- 数组解构赋值
```
let [a,b,c,d,e = 6] = [1,2,3,[4,5]];
```
- 对象解构赋值
```
let obj = {
    name: 'admin',
    uid: '001',
    code: [111,222,333],
};

let {name,uid,code:userCode} = obj;
```

### ES5中数组的遍历方式
- for循环
- forEcah(): 没有返回，每个元素调用func
```
/**
 * @param {*} item 正在遍历的元素
 * @param {*} index 正在遍历的元素下标
 * @param {*} array 正在遍历的数组本身
 * **/ 

arr.forEach((item,index,array) => {
    console.log('item,index,array: ', item,index,array);
})
```
- map(): 返回新数组，每个新元素为调用func的结果
- filter(): 返回符合func条件的元素数组
- some(): 返回Boolean，判断某个元素是否符合func条件
- every(): 返回Boolean，判断每个元素是否符合func条件
- reduce(): 接受一个func作为累加器
```
/**
 * @param {*} func方法
 *** @param {*} pre 上一次函数调用的值，第一次对应的是初始值
 *** @param {*} cur 正在处理的值
 *** @param {*} index 当前处理的值的下标
 *** @param {*} array 源数据
 * @param {*} 0 初始值 可以是0 可以是{} 也可以是[]
 * **/ 
 let sum = arr.reduce((prev, cur, index, array) => {
    return prev + cur
 }, 0)
 console.log(sum);
```
- for in 可以遍历数组的key，也能遍历对象的key，甚至能遍历到原型上。

### ES6中数组的遍历方式
- find(): 返回第一个通过判断条件的元素
- findIndex(): 返回第一个通过判断条件的元素的key
- for of循环: 遍历数组的每个元素
- - values(): 遍历数组的每个元素
- - keys():遍历数组的每个元素的key
- - entries()：遍历数组的每个元素和key

### ES6中数组方法
- Array.from(): 把类数组和伪数组转化为真数组
- Array.of(): 参数为单个数字时：声明长度为n的数组；长度为多个时：声明这些值为新的数组。
```
let arr = Array.of(3);
console.log(arr.length); //3

let arr1 = Array.of(1, true, 'imooc', [1, 2, 3], {name: 'xiecheng'});
console.log(arr1); // [1, true, 'imooc', [1, 2, 3], {ame: 'xiecheng'}]
```
- copyWithin(): 用数组的某些元素替换数组中的元素。
- fill(): 填充数组
```
let arr = Array.of(3).fill(null);
console.log(arr); //[null,nbull,null]
let arr1 = [1,2,3,4,5];
arr.fill('test'.1,3);
console.log('arr: ', arr);// [1,'test','test',4,5];

```
- includes(): 返回Boolean，能检测NAN。

### 扩展运算符与rest参数
- 扩展运算符:  把数组或者类数组展开变成用‘,’隔开的值
- rest参数: 把逗号隔开的值，变成数组
```
npm run build
```
### 箭头函数
- 自身没有this，而是继承父级的this
- 不可以当作构造函数
- 不可以使用arguments对象（可以使用‘...’rest运算符）
### 对象方法
- 属性简介表达
```
let name = 'admin';
let age = 18;
let obj = {
    name,
    age,
}
```
- 属性名表达试
```
let s = 'school'
let obj = {
    [s]: '学校',
    saySchool(){
        console.log('好学校');
    }
```
- Object.is(): 判断两个值是否严格相等
```
console.log('Object.is(2,'2'): ', Object.is(2,'2')); //  false
```
- Object.assign(): 合并对象,也可以返回一个合并对象
```
let x = {
    name: 'admin',
    age: 18
}
let y = {};
Object.assign(y,x);// {name: 'admin',age: 18}
let z = Object.assign(y,x);
console.log('z: ', z); // {name: 'admin',age: 18}
```
- in: 判断数组或者对象是否有某个key
- 对象遍历
```
for(let key in obj){
    console.log(key, obj[key])
}

Object.keys(obj).forEach(key => {
    console.log(key, obj[key])
})

Object.getOwnPropertyNames(obj).forEach(key =>{
     console.log(key, obj[key])
})

Reflect.ownKeys(obj).forEach(key => {
    console.log(key, obj[key])
})
```
### 深拷贝与浅拷贝
```
//  JSON方法深拷贝
let obj = JSON.parse('{"a": "hello", "b": "world"}')
let str = JSON.stringify(obj)
// console.log(obj)
```
递归深拷贝：src/ES5_ES6/deepClone.js
