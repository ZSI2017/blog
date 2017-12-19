*在开发中基本不会将所有的业务逻辑代码放在一个JS文件中，特别是在使用前端框架，进行组件化开发中时，会复用相应的组件。这时，就会用到模块导入/导出的方法了。*


**当然，上面提到有*模块*的概念，也是在JS用于服务器端编程的时候才会出现，我们在使用前端框架时，使用`npm run dev`,不就是启动了一个node服务。 对于JavaScript模块化编程的起源可以追溯到2009年，Ryan Dahl在github上发布了node 的最初版本。**

本文主要介绍几种模块导入/导出的方法。




## node 中模块导出/导入 ##

- 平时我们接触最多的模块导入的例子，就是使用`npm`安装各种开源模块，然后在项目中使用例如import,require的方法引入，或者更加直白的直接使用script标签引入入node_module中对应模块打包过后的源文件。

为什么可以直接引入这些npm模块呢？一般在每个模块的源文件里面，都会找到modules.exports方法。用来导出变量。比如下面我们在使用`gulp`打包压缩时，经常使用到的`gulp-rename`这个插件通过npm安装后，在node_modules中的`gulp-rename/index.js`

```
'use strict';

var Stream = require('stream');
var Path = require('path');

function gulpRename(obj) {

var stream = new Stream.Transform({objectMode: true});
   ...  

return stream;
}

module.exports = gulpRename;
```
** 看到的基本思路就是，定义了gulpRename 方法，然后把它抛出去。**

** node中的module都遵循CommonJS规范。在CommonJS中有一个全局的require()方法，用于加载模块；`module.export` 和 `export` 方法，导出模块。 **   

**这里比较重要的一点是： 我们在写模块时用到的exports对象实际上只是对module.exports的引用，所有在一些js库的源码中，经常可以看到这样的写法：**
 `exports = module.exports = somethings`
 ```
  // export.js 文件中

 var export1 = "from export1"
 var export2 = function(){
    return "from export2";
 }
 exports.export2 = export2;


  // modules.js 文件中
  var module1 = "from module1";
  var module2 = function(e){
    return "from funModule2";
  }

  module.exports.str1 = module1;
  module.exports.fun2 = module2;

 ```

 最后在`common.js`文件中引入exports.js文件和 modules.js 文件，
 ```
 var md1 = require("./module.js")
 console.log(md1);


 var export3 = require("./export");
 console.log(export3);
 ```
 最后在gitbash中，使用node 执行相应的commons.js文件；
 ![node][1]
 在使用`exports`方法是，不能直接`exprots = {}`,这样改变了exports方法的引用， [相应就无法实现导出模块的功能了。](http://cnodejs.org/topic/52308842101e574521c16e06)


## es6导出方法 ##
 es6中也同样提出了比较好用的模块导出的方法，包括两种。
- **命名导出**
   如果在一个文件中想要导出多个不同的变量，可以分别对不同的变量命名，然后分别导出，避免相互污染。


     // export3.js 文件
       export const myModules = {c:1 }
       export const myModules2 = {d:2 }

     // import.js 文件
     import {myModule1,myModule2} from './export3.js' ;
     console.log(myModule1);
     console.log(myModule2);

     // index.html 文件
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>es6</title>
      </head>
      <body>
        <script src="./import.js"></script>
      </body>
    </html>


 然后，我们尝试使用最经新出的 [打包工具parcel](https://parceljs.org/getting_started.html)(node版本在8.0以下安装会报错)小试牛刀， 具体已经安装完成了，在命令行中输入 `parcel index.html`,就会在`1234` 端口启动服务，主要为了能够在`http://localhost:1234/`中看到console。
![import][2]


- **默认导出**

如果只在一个文件中提供了一个导出的口，就可以使用默认导出


      //export4.js   

      const str2 ="hello world";
      export default str2 ;

      // import2.js
      import anyName  from "./export4.js"
      console.log(anyName);



在index.html 中 <script src="./import2.js"></script>可以看到输入 hello world




同样是模块导入导出方法，使用es6的模块方法，要比node中 的（也就是CommonJS模块）方法更加的差异非常大。
主要有如下两点差别：
- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

具体解释，可以移步到[ES6模块与CommonJS模块的差异](http://es6.ruanyifeng.com/?search=import&x=0&y=0#docs/module-loader#ES6-模块与-CommonJS-模块的差异)

本文只是列出一些用法与代码示例，来比较不同的模块方法，列出一些更加深入讲解的文章，方便后面自己仔细研究。

 - [import、require、export、module.exports 混合详解 -- 尚妆前端团队 ](https://github.com/ShowJoy-com/showjoy-blog/issues/39)

 - [Module 的加载实现 --- ECMAScrip6入门](http://es6.ruanyifeng.com/#docs/module-loader)

 - [module.exports与exports？？关于exports的总结](http://cnodejs.org/topic/52308842101e574521c16e06)

 - [CommonJS 系列 ](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)


[1]: /img/bV0p8S
[2]: /img/bV0qaO
