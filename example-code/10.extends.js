/*
*Class的继承
 基本用法
 Class之间可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。
*/

class ColorPoint extends Point {}
//上面代码定义了一个ColorPoint类，该类通过extends关键字，继承了Point类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个Point类。

//下面，我们在ColorPoint内部加上代码。
class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
    }

    toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
}
//上面代码中，constructor方法和toString方法之中，都出现了super关键字，它在这里表示父类的构造函数，用来新建父类的this对象。

//子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。
//如果不调用super方法，子类就得不到this对象。
class Point { /* ... */ }

class ColorPoint extends Point {
    constructor() {
    }
}
let cp = new ColorPoint(); // ReferenceError
//上面代码中，ColorPoint继承了父类Point，但是它的构造函数没有调用super方法，导致新建实例时报错。

// ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法）
// ，然后再用子类的构造函数修改this。

//如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。
constructor(...args) {
    super(...args);
}

//另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class ColorPoint extends Point {
    constructor(x, y, color) {
        this.color = color; // ReferenceError
        super(x, y);
        this.color = color; // 正确
    }
}
//上面代码中，子类的constructor方法没有调用super之前，就使用this关键字，结果报错，而放在super方法之后就是正确的。



let cp = new ColorPoint(25, 8, 'green');
cp instanceof ColorPoint // true
cp instanceof Point // true
//上面代码中，实例对象cp同时是ColorPoint和Point两个类的实例，这与ES5的行为完全一致。

// 类的prototype属性和__proto__属性
// 大多数浏览器的ES5实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。Class作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。
// （1）子类的__proto__属性，表示构造函数的继承，总是指向父类。
// （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
class A {}
class B extends A {}
B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
// 上面代码中，子类B的__proto__属性指向父类A，子类B的prototype属性的__proto__属性指向父类A的prototype属性。

//这样的结果是因为，类的继承是按照下面的模式实现的。
class A {}
class B {}
// B的实例继承A的实例
Object.setPrototypeOf(B.prototype, A.prototype);

// B继承A的静态属性
Object.setPrototypeOf(B, A);
//《对象的扩展》一章给出过Object.setPrototypeOf方法的实现。

Object.setPrototypeOf = function (obj, proto) {
    obj.__proto__ = proto;
    return obj;
}

Object.setPrototypeOf(B.prototype, A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B, A);
// 等同于
B.__proto__ = A;
//这两条继承链，可以这样理解：作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；作为一个构造函数，子类（B）的原型（prototype属性）是父类的实例。

Object.create(A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;
// Extends 的继承目标
// extends关键字后面可以跟多种类型的值。

class B extends A {}
//上面代码的A，只要是一个有prototype属性的函数，就能被B继承。由于函数都有prototype属性（除了Function.prototype函数），因此A可以是任意函数。

//子类继承Object类。
class A extends Object {}
A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
//这种情况下，A其实就是构造函数Object的复制，A的实例就是Object的实例。

//不存在任何继承。
class A {}
A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
//这种情况下，A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承Funciton.prototype。但是，A调用后返回一个空对象（即Object实例），
// 所以A.prototype.__proto__指向构造函数（Object）的prototype属性。

//子类继承null。
class A extends null {}
A.__proto__ === Function.prototype // true
A.prototype.__proto__ === undefined // true
//A也是一个普通函数，所以直接继承Funciton.prototype。但是，A调用后返回的对象不继承任何方法，所以它的__proto__指向Function.prototype，即实质上执行了下面的代码。

class C extends null {
    constructor() { return Object.create(null); }
}
Object.getPrototypeOf()
Object.getPrototypeOf//方法可以用来从子类上获取父类。

Object.getPrototypeOf(ColorPoint) === Point// true
// 因此，可以使用这个方法判断，一个类是否继承了另一个类。

// super关键字
// super这个关键字，有两种用法，含义不同。
// （1）作为函数调用时（即super(...args)），super代表父类的构造函数。
// （2）作为对象调用时（即super.prop或super.method()），super代表父类。注意，此时super即可以引用父类实例的属性和方法，也可以引用父类的静态方法。


class B extends A {
    get m() {
        return this._p * super._p;
    }
    set m() {
        throw new Error('该属性只读');
    }
}
//上面代码中，子类通过super关键字，调用父类实例的_p属性。由于，对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。

