// 情况一：纯粹的函数调用
// 这是函数的最通常用法，属于全局性调用，因此this就代表全局对象Global。
function test01() {
    this.x = 1;
    console.log((this.x));
}
test01(); // 1

// 为了证明this就是全局对象，我对代码做一些改变：
var x = 1;
function test02() {
    console.log((this.x));
}
test02(); // 1

// 运行结果还是1。再变一下：

var y = 1;
function test03() {
    this.y = 0;
}
test03();
console.log((y)); //0

// 情况二：作为对象方法的调用
// 函数还可以作为某个对象的方法调用，这时this就指这个上级对象。

function test04() {
    console.log(this.x);
}
var o = {};
o.x = 1;
o.m = test04;
o.m(); // 1

// 情况三
// 作为构造函数调用所谓构造函数，就是通过这个函数生成一个新对象（object）。这时，this就指这个新对象。

function test05() {
    this.x = 1;
}
var p = new test05();
// alert(o.x); // 1
// 为了表明这时this不是全局对象，我对代码做一些改变：
var x = 2;
function test06() {
    this.x = 1;
}
var o1 = new test06();

console.log((x)); //2


// 情况四:apply调用

// apply()是函数对象的一个方法，它的作用是改变函数的调用对象，它的第一个参数就表示改变后的调用这个函数的对象。
// 因此，this指的就是这第一个参数。

var z = 0;

function test07() {
    console.log((this.x));
}

var o9 = {};

o9.z = 1;

o9.m = test07;

o9.m.apply(); //0

//apply()的参数为空时，默认调用全局对象。因此，这时的运行结果为0，证明this指的是全局对象。

//如果把最后一行代码修改为

o.m.apply(o); //1

// 运行结果就变成了1，证明了这时this代表的是对象o