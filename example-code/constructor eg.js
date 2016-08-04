/**
 * Created by zhuoyue on 16-8-4.
 */
//类本身就指向构造函数：
class Point {
    // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true


//如果没有显式定义，一个空的constructor方法会被默认添加：
   constructor() {}

//constructor函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。
class Foo {
constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo //false

//类的构造函数，不使用new是没法调用的，会报错。
// 这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。
class Foo {
    constructor() {
        return Object.create(null);
    }
}

Foo();
// TypeError: Class constructor Foo cannot be invoked without 'new'