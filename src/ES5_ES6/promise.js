const PADDING = "padding";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";


class KPromise {
    constructor ( executor ) {

        try{
            executor(this.resolve,this.reject);
        }catch(error){
            this.reject(error);
        }

    }
    //  Promise状态 初始化状态

    status = PADDING;

    //  Promise状态 成功后返回的信息

    successData = undefined;

    //  Promise状态 失败后返回的信息

    errorMsg = undefined;


    //  Promise 异步请求 成功回调函数暂存区

    fulfilledCallback = [];

    /**
     * 单个.then（）调用
     * fulfilledCallback = undefined;  
    **/

    //  Promise 异步请求 失败回调函数暂存区

    rejectedCallback = [];

    /** 
     * 单个.then（）调用
     * rejectedCallback = undefined;
    **/

    //  使用箭头函数 是为了 调用的时候 能找到this 为 undefined
    //  内部私有方法-resolve回调
    resolve = (success)  => {

        //  如果状态不是初始化 就阻止执行
        if(this.status !== PADDING) return;

        //  Promise 成功后改变状态 填充成功数据

        this.status = FULFILLED;
        this.successData = success;

        //  查看是否有一步暂存区的待处理函数

        /**
         * 单个.then（）调用
         * this.fulfilledCallback &&  this.fulfilledCallback(this.successData);
        **/

        //  调用 多个.then函数的处理方法

        while(this.fulfilledCallback.length) this.fulfilledCallback.shift()();

    }

    //  内部私有方法-rejected回调
    reject = (error) => {

        //  如果状态不是初始化 就阻止执行
        if(this.status !== PADDING) return;

        //  Promise 失败后改变状态 填充失败数据

        this.status= REJECTED;
        this.errorMsg = error;

        //  查看是否有一步暂存区的待处理函数

        /**
         * 单个.then（）调用
         * this.rejectedCallback &&  this.rejectedCallback(this.errorMsg);
        **/

        //  调用 多个.then函数的处理方法

        while(this.rejectedCallback.length) this.rejectedCallback.shift()();
    }

    then = (resolveCallback,rejectedCallback) => {

        //  用于  .then().then().then(val); 空值 连续调用 当 .then() 使用的时候返回的是一个Promise 成功或者失败的信息。

        resolveCallback = resolveCallback ? resolveCallback : success => success;

        rejectedCallback = rejectedCallback ? rejectedCallback : error => {throw error};

        //  返回 new KPromise 本身 可以让.then() 链式调用

        let resolvePromise = new KPromise( (resolve,reject) => {
            
            if (this.status === FULFILLED) {

                //  setTimeout实现异步操作，
                // setTimeout是让resolvePromise实例化，privateResolvePromise（）执行的时候才能把 resolvePromise（Promise）当作参数传递。

                setTimeout(() => {

                    try{

                        //  Promise 变为成功时，调用病传递出数据
                        let successData = resolveCallback(this.successData);

                        // resolve(successData);

                        privateResolvePromise(resolvePromise,successData,resolve,reject);

                    }catch(error){
                        reject(error);
                    }

                }, 0);

    
            }else if(this.status === REJECTED) {

                setTimeout( () => {
                
                    try{

                        //  Promise 变为失败时，调用病传递出数据
                        let errorData = rejectedCallback(this.errorMsg);;

                        privateResolvePromise(resolvePromise,errorData,resolve,reject);

                    }catch(error){

                        reject(error);

                    }
                    
                },0)

            }else {
    
                //  异步处理： 因为status转台还没有发生改变，所以函数也不会执行,进入等待阶段。
    
                /** 
                 * 单个.then（）调用
                 * this.fulfilledCallback = resolveCallback;
                 * this.rejectedCallback = rejectedCallback;
                **/
    
                this.fulfilledCallback.push(() => {

                    setTimeout(() => {

                        try{
    
                            //  Promise 变为成功时，调用病传递出数据
                            let successData = resolveCallback(this.successData);
        
                            privateResolvePromise(resolvePromise,successData,resolve,reject);
    
                        }catch(error){
                            reject(error);
                        }
    
                    }, 0);

                });
    
                this.rejectedCallback.push(() => {
                    setTimeout( () => {
                
                        try{
    
                            //  Promise 变为失败时，调用病传递出数据
                            let errorData = rejectedCallback(this.errorMsg);;
    
                            privateResolvePromise(resolvePromise,errorData,resolve,reject);
    
                        }catch(error){
    
                            reject(error);
                            
                        }
                        
                    },0)
                });
    
    
            }
        })

        return resolvePromise;

    }

    finally = (callback) => {
        return this.then(res => {
            return KPromise.resolve( callback() ).then( () => res);
        }, rej => {
            return KPromise.resolve( callback() ).then( () => { throw rej });
        });
    }

    catch = (rejectedCallback) => {
        return this.then( undefined,rejectedCallback);
    }


    static all = (array) => {

        //  all方法的参数是一个数组，返回结果也是一个数组，所以我们要用一个数组去接受
        let rest = [];

        //  for循环是立即执行的， promise有异步的话需要用 一个 计数器来记录
        let index = 0;

        return new KPromise( (resolve,reject) => {

            const addData = (key, val) => {

                rest[key] = val;
                
                // 记录处理数据的数量
                index +=1;
                
                //  全部执行完毕才能返回
                (index === array.length) && resolve(rest);

            }
            
            array.forEach((item,key) => {
                if(item instanceof KPromise) {
                    //  promise 对象
                    item.then(res => addData(key,res),rej => reject(rej));

                }else {

                    //  普通值
                    addData(key,item);
                }
            });

        })

    }

    static resolve = (data) => {
        return  (data instanceof KPromise) ? data : new KPromise(res => res(data));
    }

}

const privateResolvePromise = (resolvePromise, val, resolve, reject) => {

    if( resolvePromise === val) return reject(new TypeError('不能传递Promise本身'));
    
    if( val instanceof KPromise) {
        //  如果传入的Promise 对象

        // val.then(val => resolve(val), err => resolve(err));

        // 简写： resolve和reject 被改写成Promise， 自己可以返回本身 能自己拿到参数，并调用。

        val.then(resolve, reject);

    }else {
        //  如果是普通参数
        resolve(val);
    }
}


    /**
     * promise 使用new申明的 所以Promise 是一个类
     * 在执行这个类的时候 会传递一个执行器 会立即执行
     * promise的三种状态 ：pending（初始化）、fulfilled（成功）、rejected（失败）。
     * resolve：pending ->fulfilled || reject：pending ->rejected 状态一旦确定就不能更改
     * .then() 内部会判断 promise 的状态成功还是失败 成功调用成功函数 失败调用失败函数
     * .then() 是被定义在原型对象中的 成功和失败都各有一个参数 代表回调结果
     * **/


    // const myPromise = new Promise ((res,rej) => {
    //     res(1);
    // });

    // console.log(myPromise);

    // const myPromise = new KPromise((resolve, reject) => {
    //     resolve('成功');
        // reject('失败');

        // setTimeout( () => {
        //     console.log('进入计时器')
        //     // resolve('成功');
        //     reject('失败');
        // },2000)

        // throw new Error ('错误测试'); 

        // resolve('链式调用第一次');
    // });

    //  多个 .then() 调用

    // myPromise.then(res => {
    //     console.log(res);
    //     console.log(1);
    // },rej => {
    //     console.log(rej);
    //     console.log(1);
    // })

    // myPromise.then(res => {
    //     console.log(res);
    //     console.log(2);
    // },rej => {
    //     console.log(rej);
    //     console.log(2);
    // })

    // myPromise.then(res => {
    //     console.log(res);
    //     console.log(3);
    // },rej => {
    //     console.log(rej);
    //     console.log(3);
    // })

    //  .then 链式调用 普通值

    // myPromise.then( res => {
    //     console.log(res);
    //     return '链式调用第二次';
    // }).then( res => {
    //     console.log(res);
    // })

    //  .then 链式调用  Promise 传递

    // myPromise.then( res => {
    //     console.log(res);
    //     return new KPromise( res => {
    //         res('传递了一个Promise');
    //     });
    // }).then( res => {
    //     console.log(res);
    // })


    // Promise 链式调用 传递本身

    // let p1 = myPromise.then( res => {
    //     console.log('进入p1');
    //     return p1;
    // });

    // p1.then(res => {
    //     console.log(res);
    // },rej => {
    //     console.log(rej);
    //     console.log(rej.message);
    // })


    // myPromise.then(res => {

    //     console.log(res);

    // }, rej => {

    //     console.log(rej);

    //     return 100;
    // }).then(res => {

    //     console.log(res);

    // }, rej => {
    //     console.log(rej);
    // })

    //  all 方法

    function p1 () {
        return new KPromise((resolve, reject) => {
            setTimeout( () => {
                resolve('p1异步');
            },1000)
        })
    }

    function p2 () {
        return new KPromise((resolve, reject) => {
            resolve('p2同步');
        })
    }

    // KPromise.all(['a',p1(),p2(),'b']).then(rest => console.log(rest));

    // resolve 方法
    // KPromise.resolve('abc').then( res => console.log(res));
    // KPromise.resolve(p1()).then( res => console.log(res));

    p2().finally (() => {
        console.log('finally');
        return p1();
    }).then( res => console.log(res),rej => console.log(rej)); 