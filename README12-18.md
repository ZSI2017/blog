
在实际开发中，函数一定是最实用最频繁的一部分，无论是以函数为核心的函数式编程，还是更多人选择的面向对象式的编程，都会有函数的身影，所以对函数进行深入的研究是非常有必要的。


----------
## 函数节流 ##


** 比较直白的说，函数节流就是让一个函数在不停触发后停下来歇会才开始触发   **

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

** 使用定时器，让函数延迟1秒后执行，在此1秒内，然后throttle函数再次被调用，则删除上次的定时器，取消上次调用的队列任务，重新设置定时器。这样就可以保证1秒内函数只会被触发一次，达到了函数节流的目的 **

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
   ** 目前看来，函数节流 和 函数防抖 两个概念非常容易混淆￣□￣｜｜，仅供参考，个人观点是，概念不重要，能在对的业务场景中使用就可以了。 **
   **  **





参考资料：
  - [浅谈javascript的函数节流](http://www.alloyteam.com/2012/11/javascript-throttle/)(腾讯全端 AlloyTeam 团队 Blog)
  - [JavaScript 函数节流](https://www.cnblogs.com/dolphinX/p/3403821.html)
  - [函数防抖与节流](https://segmentfault.com/a/1190000002764479)
