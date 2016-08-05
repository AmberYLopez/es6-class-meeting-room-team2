/**
 * Created by xjy on 8/4/16.
 */
//NO.7
//(类的静态方法)

//类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

class Foo {
  static classMethod() {
    return 'hello';
  }
}
Foo.classMethod(); // 'hello'
var foo = new Foo();
foo.classMethod();
// TypeError: foo.classMethod is not a function
//上面代码中，Foo类的classMethod方法前有static关键字，表明该方法是一个静态方法，可以直接在Foo类上调用（Foo.classMethod()），而不是在Foo类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。

//父类的静态方法，可以被子类继承。

class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod(); // 'hello'
//上面代码中，父类Foo有一个静态方法，子类Bar可以调用这个方法。

//静态方法也是可以从super对象上调用的。

class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod();
//Class的静态属性和实例属性
//静态属性指的是Class本身的属性，即Class.propname，而不是定义在实例对象（this）上的属性。

class Foo {
}

Foo.prop = 1;
Foo.prop
// 1
//上面的写法为Foo类定义了一个静态属性prop。

//目前，只有这种写法可行，因为ES6明确规定，Class内部只有静态方法，没有静态属性。

// 以下两种写法都无效
class Foo {
  // 写法一
  prop:2

  // 写法二
  static prop:2
}

Foo.prop // undefined

//（2）类的静态属性

//类的静态属性只要在上面的实例属性写法前面，加上static关键字就可以了。

class MyClass {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myProp); // 42
  }
}
// 同样的，这个新写法大大方便了静态属性的表达。
//
// // 老写法
class Foo {
}
Foo.prop = 1;
//
// // 新写法
class Foo {
  static prop = 1;
}
// 上面代码中，老写法的静态属性定义在类的外部。整个类生成以后，再生成静态属性。这样让人很容易忽略这个静态属性，也不符合相关代码应该放在一起的代码组织原则。另外，新写法是显式声明（declarative），而不是赋值处理，语义更好。
class a {
  static add(m, n) {
    return m + n;
  }
}

//////////////////(NO.8)private和public



//私有方法
//私有方法是常见需求，但ES6不提供，只能通过变通方法模拟实现。

//一种做法是在命名上加以区别。

class Widget {

  // 公有方法
  foo (baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }

  // ...
}
//上面代码中，_bar方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。

//另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。

class Widget {
  foo (baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return this.snaf = baz;
}
//上面代码中，foo是公有方法，内部调用了bar.call(this, baz)。这使得bar实际上成为了当前模块的私有方法。

//还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。

const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default subclassFactory({

  // 共有方法
  foo (baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
});
//上面代码中，bar和snaf都是Symbol值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。

