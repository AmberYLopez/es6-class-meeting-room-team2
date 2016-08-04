//类名首字母大写
class Person {
    //实例属性：采用驼峰式命名
    myAge = 20;

    // 公有方法 采用驼峰式命名
    foo (baz) {
        this._bar(baz);
    }

    // 私有方法 前加下划线_,采用驼峰式命名
    _bar(baz) {
        return this.snaf = baz;
    }
}