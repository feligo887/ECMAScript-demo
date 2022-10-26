
const getPromise = (timeout) => {
    return new Promise((res,rej) => {
        setTimeout(() => {
            res({
                value: timeout,
                done: false
            })
        }, timeout);
    })
}

const arr = [getPromise(1000), getPromise(2000), getPromise(3000)]
// 异步协议
arr[Symbol.asyncIterator] = () => {
    let nextIndex = 0;
    return {
        next() {
            return nextIndex < arr.length 
            ? arr[nextIndex++] 
            : Promise.resolve({
                value: undefined,
                done: true
            })
        }
    }
}
async function test () {
    for await (let item of arr) {
        console.log(item);
    }
}

test()