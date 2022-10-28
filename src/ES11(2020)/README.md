## ES11(2020)

### String.prototype.matchAll()
- String.prototype.matchAll(regExp): 传入一个正则表达式，匹配到所有的字符集 

### 动态导入｜按需导入 Dynamic import()
```
//   参考vue-router 懒加载
const UserDetails = () => import('./views/UserDetails.vue')

const router = createRouter({
  routes: [{ path: '/users/:id', component: UserDetails }],
})
```

### 新的原始数据类型：BigInt 
```
// 用于大数计算
const bibInt = 100n;
const bibInt1 = BigInt(100);
console.log(typeof bibInt) // bigint

const maxNnm = 2 ** 53; //  js中最大数
const bibInt3 = BigInt(maxNnm * 2);
console.log('bibInt3: ', bibInt3); // 18014398509481984n
console.log('bibInt3.toString: ', bibInt3.toString()); // '18014398509481984'
```
### Promise扩展：allSettled()

具体事例见： src/ES11(2020)/allSettled.js

### globalThis

- 提供一个标准方法去获取不同环境下的全局对象
```
// node: global
// web : window self

// 旧
const getGlobal = () => {
    if (typeof self !== 'undefined') {
        return self
    }
    if (typeof window !== 'undefined') {
        return window
    }
    if (typeof global !== 'undefined') {
        return global
    }
    throw new Error('无法找到全局对象')
}

// ES2020
console.log(globalThis)
```
### 可选链 Optional chaining
```
// 可选链
const user = {
    address: {
        street: 'xx街道',
        getNum() {
            return '80号'
        }
    }
}
// const street = user && user.address && user.address.street

// const num = user && user.address && user.address.getNum && user.address.getNum()

const street = user?.address?.street
console.log(street)
const num = user?.address?.getNum?.()
console.log(num)
```
### 空合并运算符
```
const b = null
// const a = b || 5 //  不能识别 ‘’ 0 false,所以用这些 会返回5
const a = b ?? 5 //  除了 null 和 undefined 会返回 5，其他的数都会原样返回
console.log(a)
```
