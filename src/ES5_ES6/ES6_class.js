// ES6的类声明

class People {
    constructor (name, age) {
        // 实例属性
        this.name = name
        this.age = age
        this._sex = 0
    }

    //  实例化方法
    showName () {
        return this.name
    }

    get sex () {
        if (this._sex === 1) {
            return 'male'
        } else if (this._sex === 0) {
            return 'female'
        } else {
            return 'error'
        }
    }
    set sex (val) { 
        // 1:male 0:female
        if (val === 0 || val === 1) {
            this._sex = val
        }

    }

    // 静态属性: ES6之后才支持

    static count = 0

    //  静态方法
    static getCount() {}
}

// 静态属性: ES6写法
// People.count = 0

let people = new People('张三',18);

// extends 关键字继承
class Child extends People {
    constructor(name, age,heigth) {
        // 属性继承
        super(name, age)
        this.heigth = heigth
    }
    showHeigth () {
        return this.heigth
    }
}

let child = new Child('李四', 18, 185);