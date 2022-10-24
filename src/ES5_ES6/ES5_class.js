// ES5的类声明

//  父类
function People (name,age) {
    //  实例属性
    this.name = name;
    this.age = age;
}

// 静态属性
People.count = 0;

// 静态方法
People.getCount = function () {
    return this.age;
}

// 实例方法
People.prototype.getCount = function () {
    return this.age;
}
var people = new People('小','18');

console.log('People.count: ', People.count);

// 子类

//  组合继承： 构造函数继承 + 原型继承
function Child(name, age, height) {
    People.call(this, name, age) // 继承属性： 构造函数继承
    this.height = height
}

// 方法继承： 原型继承
Child.prototype = new People();
//  修改原型指针
Child.prototype.constuctor = Child;

let child = new Child('wangcai', 18, 'white')