### 编写可维护代码，就需要有一定的代码规范。

## 基本命名规范 ##

- #### 变量名应为名词,eg： car,person

- #### 函数名以动词开始。 getName(), 返回类型是布尔类型，一般以is开头，eg: isEnable();
- #### 变量和函数命名，不要担心长度，合乎逻辑重要。

## 变量命名 -- 类型透明##
- #### 通过初始化指定变量类型
    ```
        var found = false;    // 布尔类型
        var count = -1;       // 数字类型
        var name = “”;        // 字符串
        var person = null;    // 对象
       ```
- #### 匈牙利标记法
  **变量名前面加上一个或者多个字符来表示数据类型。**
  ```
        "o"  =>变量     var oPerson;
        "s" => 字符串   var iCount
        “i”  => 整数    var sName;
        “f” => 浮点数   var fMath;
        “b”  => 布尔值  var bFound;
       ```
##  全局命名空间  ##
- #### 创建唯一的全局的对象，然后再把需要的变量和函数添加到对象上。
- #### 避免与其他功能冲突。
- #### 产生对应的作用域
  ```
      // 声明全局对象
      var Wrox = {};
      // 为Wrox 创建 Professional JavaScript 命名空间
      Wrox.ProJS = {};

      // 分别在添加各种事件
      Wrox.ProJS.EventUtil = {};
      Wrox.ProJS.CookieUtil = {};

     // 在使用的时候
     Wrox.ProJS.EventUtil.adHandler();

    ```




----------
 最近收集了一些大神们总结的代码规范，这里特意罗列出来。
   - [总结github代码库的书写习惯](http://alloyteam.github.io/CodeGuide/)(不只是前端)
   - [百度代码规范](https://zhuanlan.zhihu.com/p/19884834?columnSlug=fuyun)
   - [网易前端代码规范](http://nec.netease.com/standard)
   - [前端开发规范手册](http://zhibimo.com/read/Ashu/front-end-style-guide/)
   - [腾讯前端代码规范](http://tgideas.qq.com/doc/)
   - [JavaScript-Garden](http://bonsaiden.github.io/JavaScript-Garden/)(非常值得看)
