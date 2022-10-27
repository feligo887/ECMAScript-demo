## ES10(2019)

### 对象扩展： Object.fromEntries()
- Object.fromEntries(): 把有name和value的二维数组变成object
具体用例： src/ES10(2019)/Object.fromEntries.js

### 字符串扩展
- String.prototype.trimStatr(): 去掉字符串前面的空格
- String.prototype.trimEnd(): 去掉字符串后面的空格
- String.prototype.trimLeft(): 去掉字符串左边的空格
- String.prototype.trimRight(): 去掉字符串右边的空格
- String.prototype.trim(): 去掉字符串所有的空格
```
const str = '   string    ';

// 去掉前面的空格
console.log(str.trimStart()) // 'string    '
console.log(str.trimLeft()) // 'string    '

// 去掉后面的空格
console.log(str.trimEnd()) // '   string'
console.log(str.trimRight()) // '   string'

console.log(str.trim()) // 'string'

```

### 数组扩展
- Array.prototype.flat(n): 数组扁平化，默认是1。n（可选）是扁平数量，最大是Infinity（无限）；
- Array.prototype.flatMap(): 数组扁平化遍历，返回一个扁平化的数组
```
const arr = [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]]
console.log(arr.flat()) // [1, 2, 3, 4, 5, 6, [7, 8, 9, [10, 11, 12]]]
console.log(arr.flat().flat()) // [1, 2, 3, 4, 5, 6, [7, 8, 9, [10, 11, 12]]]
console.log(arr.flat(3)) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
console.log(arr.flat(Infinity))// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const res = arr.flatMap(x => x)
console.log(res) // [1, 2, 3, 4, 5, 6, [7, 8, 9, [10, 11, 12]]]

```
### try cath 扩展
- cath后面的（）变为可选项
```

// before
    try {
        return true
    } catch (e){
        console.log('e: ', e)
        return false
    }

// now
    try {
        return true
    } catch {
        return false
    }

```

### Symbol扩展
- Symbol.prototype.description: 返回一个只读的Symbol描述
```
const s = Symbol('imooc')
console.log(s.description) // imooc 只读属性

const s2 = Symbol()
console.log(s2.description) // undefined
```