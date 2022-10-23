/**
 * 类型判断
 * @param {*} data 数据源
 * **/ 

let checkType = data => {
    return Object.prototype.toString.call(data).slice(8,-1);
}

/**
 * 深拷贝
 * @param {*} data 数据源
 * **/ 

let deepClone = data => {

    let rest = null;

    //  判断数据类型，分给容器不同的数据类型
    if(checkType(data) === 'Array') {
        rest = [];
    }else if(checkType(data) === 'Object') {
        rest = {};
    } else {
        return data;
    }

    // 循环递归，复制给容器

    for( let key in data ) {

        let val = data[key];

        if(checkType(val) === 'Array' || checkType(val) === 'Object') {
            rest[key] = deepClone(val);
        }else {
            rest[key] = val;
        }
    }

    return rest;

}

let arr = [1,2,3,4,5,6,{'num':7}];

let obj = {
    name: 'xiecheng',
    hobby: ['coding', 'eating']
};

let deepCloneArr = deepClone(arr);

// arr.unshift(0);
// console.log('arr: ', arr);
// console.log('deepCloneArr: ', deepCloneArr);

// let deepCloneObj = deepClone(obj);
// obj.height = 180;
// console.log('obj: ', obj);
// console.log('deepCloneObj: ', deepCloneObj);
