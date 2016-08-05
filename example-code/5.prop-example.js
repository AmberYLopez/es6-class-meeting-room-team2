//静态属性，ES6明确规定，class内只有静态方法，没有静态属性
//所以要设置属性，方法如下

class Foo{
}

Foo.prop = 1;
console.log(Foo.prop); // 1