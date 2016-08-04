// 9: set和get
// Class的取值函数（getter）和存值函数（setter）,与ES5一样，在Class内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

class MyClass {
    constructor() {
        // ...
    }
    get prop() {
        return 'getter';
    }
    set prop(value) {
        console.log('setter: '+value);
    }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
//上面代码中，prop属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。

//存值函数和取值函数是设置在属性的descriptor对象上的。
class CustomHTMLElement {
    constructor(element) {
        this.element = element;
    }

    get html() {
        return this.element.innerHTML;
    }

    set html(value) {
        this.element.innerHTML = value;
    }
}

var descriptor = Object.getOwnPropertyDescriptor(
    CustomHTMLElement.prototype, "html");
"get" in descriptor  // true
"set" in descriptor  // true
//上面代码中，存值函数和取值函数是定义在html属性的描述对象上面，这与ES5完全一致。
