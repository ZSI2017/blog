## js 类型检查 ##
js中有5中**基本数据类型**，分别是：
     Undefined,Null,Boolean,Number,String
还有一种**复杂数据类型**：
      Object

ECMAScript是松散类型的，所以使用以上6种数据类型，就可以表示所有数据。
那么，如何检测变量的数据类型呢。


**下面就介绍几种在业务代码中，常用的几种常用类型检查方法**



typeof
------

**typeof操作符**用以获取一个变量或者表达式的类型。

####typeof一般只能返回如下几个结果：
     - "number",  ------eg:  typeof 2
     - "boolean",  -----     eg:  typeof false
     - "string", --------       eg:  typeof "123"
     - "function"（函数，）,------ eg:  typeof function(){}
     - "object"（null,数组，对象,正则表达式）,  ---  typeof /\s/
     - "undefined"。   ------    typeof hehe

** 从上面结果可以看到， 使用typeof 在检查 null,数组，对象，正则表达式时都会返回"object" **
 如此模糊的类型检查方法，应用场景也十分有限。


instanceof
----------

**如果想知道一个变量到底是什么类型的 “object”,就可以使用instanceof,**

```
  var pattern = /\s/;
  var arr = [1,2,3];
  var obj = new Object();

  alert(pattern instanceof RegExp);   // true
  alert(arr instanceof Array);        //true
  alert(obj instanceof Object);        //true
  alert(null instanceof Object);      // false;
```
  也可以用来检查自己创建的变量：

    var a = new Array();
    console.log(a instanceof Array) // 返回true。
    console.log(a instanceof Object) // 返回  Array 是object 的子类。也会返回true.

 **但是这个操作符的问题在于它假定只存在一个全局的执行环境，存在多个框架的情景下，会存在两个不同的数组构造函数，这里就引入了另一个方法来判断数组**



isArray()
---------

 **ECMAScript5 新增的Array.isArray() 方法，无论执行环境，只有一个目的，判断是不是数组**

Object.prototype.toString.call()
--------------------------------

原生的toString() 方法，都会返回一个[object NativeConstructorName] 格式的字符串,
通过判断每个类在内部的*[[Class]]* 属性，来检查类型

        var a = new Array()
        Object.prototype.toString.call(a) == "[object Array]"`
        // 使用这种方法不仅可以判断数组，还可以判断其他类型。
       Object.prototype.toString.call(value) =="[object Function]"
        {}.prototype.toString.call(value) =="[object JSON]" //这种方法也可以 检查原生的JSON对象

##  $.type ##
  **zeptov1.0+**
 具体用法可以查看 [官网文档][1]，用法如下


```
$.type(object)   ⇒ string
获取JavaScript 对象的类型。可能的类型有：
null undefined boolean number string function array date regexp object error。

alert($.type([]))  // "array"
alert($.type("11"))  // "string"
alert($.type({}))    // "object"
```


**然后，我们可以分析下，这个$.type 方法，使用的技巧是否不同于上面几种类型检查方法**
查看 **zepto@1.1.6** 的源码，基本和上面的 *toString.call()* 方法类似

**type 方法的部分如下**

```
  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }
```
代码的关键部分，就是这个*class2type* 对象里面存放了所有数据类型对应的字符串，**使用type 方法是，直接取class2type 里面的键值对即可。**

再往下看，就可以发现 使用each 方法 ，遍历所有可能的数据类型，为**class2type**赋值。

```
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase()
  })
```
这里得到的 class2type 结果是：

```
 {
   [object Array]:"array"
   [object Boolean]:"boolean"
   [object Date]:"date"
   [object Error]:"error"
   [object Function]:"function"
   [object Number]:"number"
   [object Object]:"object"
   [object RegExp]:"regexp"
   [object String]:"string"
}

```
当然，我们可以直接把class2type 对象拿来使用。

...


  [1]: http://www.css88.com/doc/zeptojs_api/#$.type
