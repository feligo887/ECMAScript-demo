let arr = [1,2,3,4,5];
arr = new Proxy(arr,{
/**
 * get
 * @param {*} target 数据源
 * @param {*} key 传入的参数
 * **/ 
    get (target, key) {
        // console.log('(target, key): ', target, key);
        return key in target ? target[key] : 'eorror';
    },
/**
 * set
 * @param {*} target 数据源
 * @param {*} key 传入的参数
 * @param {*} val 要设置的值
 * **/ 
    set (target, key,val) {
        if(typeof val === 'number') {
            target[key] = val;
            //  返回布尔值可以用数组方法，不返回可以用arr[n]直接添加
            return true;
        }else {
            return false;
        }
    },
/**
* has
* @param {*} target 数据源
* @param {*} key 传入的参数
* **/ 
    has(target, key) {
        return key in target
    }
})
// arr[5] = 6;
// arr.push(6);
// console.log('arr: ', arr);

console.log(2 in arr)


let userinfo = {
    username: 'xiecheng',
    age: 34,
    _password: '***'
}
userinfo = new Proxy(userinfo, {
/**
 * ownKeys：遍历拦截
 * @param {*} target 数据源
 * **/ 
    ownKeys(target) {
        return Object.keys(target).filter(key => !key.startsWith('_'))
    },
/**
 * deleteProperty:删除拦截
 * @param {*} target 数据源
 * @param {*} key 传入的参数
 * **/ 
    deleteProperty(target, key) {
        if (key.startsWith('_')) {
            throw new Error('不可删除')
        } else {
            delete target[key]
            return true
        }
    },

    apply(target, ctx, args) {
        return target(...args) * 2
    }
})

// apply
let sum = (...args) => {
    let num = 0
    args.forEach(item => {
        num += item
    })
    return num
}

sum = new Proxy(sum, {
/**
 * apply、call:this之乡拦截
 * @param {*} target 数据源
 * @param {*} ctx 上下文
 * @param {*} args 传入的参数
 * **/ 
    apply(target, ctx, args) {
        return target(...args) * 2
    }
})


// construct  new
let User = class {
    constructor(name) {
        this.name = name
    }
}
User = new Proxy(User, {
/**
 * construct拦截
 * @param {*} target 数据源
 * @param {*} args 传入的参数
 * @param {*} newTarget new的实例对象
 * **/ 
    construct(target, args, newTarget) {
        console.log('construct')
        return new target(...args)
    }
})
console.log(new User('imooc'))