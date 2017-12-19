
在实际开发中，函数一定是最实用最频繁的一部分，无论是以函数为核心的函数式编程，还是更多人选择的面向对象式的编程，都会有函数的身影，所以对函数进行深入的研究是非常有必要的。


----------
## 函数节流 ##


**比较直白的说，函数节流就是强制规定一个函数在一段时间内能够被执行的最大次数，比如，规定某个函数在每100毫秒的时间段内，最多被执行一次,那么对应的在10s(10000ms)内，最多就会执行100(10000ms/100ms)次**



这里节流和防抖的概念比较容易搞混，所以文中许多关键性定义，参考此处文档翻译过来，移步到[the-difference-between-throttling-and-debouncing](https://css-tricks.com/the-difference-between-throttling-and-debouncing/)


在浏览器中，频繁的DOM操作非常消耗内存和CPU时间，比如监听了resize,touchmove,scroll...等事件，在dom改变时都会不断触发回调。现在的react 和 vue 等前端框架都提出了虚拟DOM的概念，会把多次DOM操作合并到一次真实操作中，就是使用了[Diff算法](http://www.infoq.com/cn/articles/react-dom-diff)，这样就大大减低了DOM操作的频次。但是，这里并不是要讨论diff算法，如果感兴趣可以戳上面的链接，而是解释如何利用`setTimeout`来减低DOM频繁操作的风险。

最早接触到这个概念的时候，是在《高程3》最后几章上面。

> 函数节流背后的基本思想是指，某些代码不可以在没有间断的情况下连续重复执行.第一次调用函数，创建了一个定时器，在指定的时间间隔之后运行代码。当第二次调用该函数时，它会清除前一次的定时器并设置另一个。

封装方法也比较简单，书中对此问题也进行了处理：
```
  function throttle(method,context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function(){
       method.call(context)
      },1000)
  }
```

**使用定时器，让函数延迟1秒后执行，在此1秒内，然后throttle函数再次被调用，则删除上次的定时器，取消上次调用的队列任务，重新设置定时器。这样就可以保证1秒内函数只会被触发一次，达到了函数节流的目的**

可以利用 `resize`事件测试一下；
```
   var  i = 0;
   window.onresize = function(){
       throttle(function(){
            console.log(i++);
         },window)
   }
```
可以发现，在浏览器的调试模式下，切换横屏/竖屏，只触发了一次

![chrome调试页面](./chrome.PNG)



## 函数防抖 ##
   **函数防抖 规定函数再次执行需要满足两个条件：**
  - **1，必须要等待一段时间；**
  - **2，在条件1等待的时间段内不再被触发，一旦在条件1等待的时间内再次被触发，等待时间就要重新开始计算。**

  **比如：对一个函数加了100ms的防抖操作，然后在3s(3000ms)时间段内，这个函数被不连续的调用了1000次，3s后停止调用。 它只会在3100ms的时刻执行一次。**

   具体实现代码，看下 underscore.js中的 [_.debounce](http://underscorejs.org/#debounce)  源码：
   ```
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
_.debounce = function(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function() {
    var last = _.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
  };
};
   ```

  `wait`参数代表`debounce`时间， `_.now()`返回当前时间的时间戳，同样以ms 为单位。 如果传入了 `immediate`,会立即触发回调函数。

  应用场景：
     - 在使用[高德地址联想输入提示](http://lbs.amap.com/api/javascript-api/guide/map-data/input_prompt#t2)时，只有在用户停止键盘输入时，才去进行ajax请求
     - [elementUI inputNumber计算器组件中](http://element-cn.eleme.io/#/zh-CN/component/input-number),为了防止用户多次点击，数字自动增减，也使用了防抖操作，有兴趣可以[查看源码](https://github.com/ElemeFE/element/blob/dev/packages/input-number/src/input-number.vue#L229)






参考资料：
  - [the-difference-between-throttling-and-debouncing](https://css-tricks.com/the-difference-between-throttling-and-debouncing/)
  - [浅谈javascript的函数节流](http://www.alloyteam.com/2012/11/javascript-throttle/)(腾讯全端 AlloyTeam 团队 Blog)
  - [JavaScript 函数节流](https://www.cnblogs.com/dolphinX/p/3403821.html)
  - [函数防抖与节流](https://segmentfault.com/a/1190000002764479)
