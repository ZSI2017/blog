   使用zepto带来最大的好处是，不用再频繁的通过`getElementBy...`或者`querySelector...`来获取节点引用，从而进行一系列的dom操作。毕竟，很多效果都需要用js来操作dom才能完成。

分析对象是[zepto@1.1.6的源码](https://cdn.bootcss.com/zepto/1.1.6/zepto.js)

   **本文常用DOM操作方法的角度，来分析Zepto源码中相应的模块，希望从中总结一些原生dom操作的技巧**

   ### zepto 中的 selector
  经常使用 `$()`，向括号里面传入不同的选择器，就可以相应匹配到不同的节点，这也是dom操作最基础的部分。
   首先看到`$`对象的源码部分，它也是zepto中最基础的对象
   ```
    // `$` will be the base `Zepto` object. When calling this
    // function just call `$.zepto.init, which makes the implementation
    // details of selecting nodes and creating Zepto collections
    // patchable in plugins.
        $ = function(selector, context){
        return zepto.init(selector, context)
        }

   ```
  这里返回了`zepot.init(selector,context)`函数，然后在看到`init()`函数的源码部分：
  ```
  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
// takes a CSS selector and an optional context (and handles various
// special cases).
// This method can be overriden in plugins.
zepto.init = function(selector, context) {
var dom
// If nothing given, return an empty Zepto collection
if (!selector) return zepto.Z()
// Optimize for string selectors
else if (typeof selector == 'string') {
  selector = selector.trim()
  // If it's a html fragment, create nodes from it
  // Note: In both Chrome 21 and Firefox 15, DOM error 12
  // is thrown if the fragment doesn't begin with <
  if (selector[0] == '<' &&  fragment.test(selector))
    dom = zepto.fragment(selector, RegExp.$1, context), selector = null
  // If there's a context, create a collection on that context first, and select
  // nodes from there
  else if (context !== undefined) return $(context).find(selector)
  // If it's a CSS selector, use it to select nodes.
  else dom = zepto.qsa(document, selector)
}
// If a function is given, call it when the DOM is ready
else if (isFunction(selector)) return $(document).ready(selector)
// If a Zepto collection is given, just return it
else if (zepto.isZ(selector)) return selector
else {
  // normalize array if an array of nodes is given
  if (isArray(selector)) dom = compact(selector)
  // Wrap DOM nodes.
  else if (isObject(selector))
    dom = [selector], selector = null
  // If it's a html fragment, create nodes from it
  else if (fragmentRE.test(selector))
    dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
  // If there's a context, create a collection on that context first, and select
  // nodes from there
  else if (context !== undefined) return $(context).find(selector)
  // And last but no least, if it's a CSS selector, use it to select nodes.
   // qsa = document.querySelectorAll
  else dom = zepto.qsa(document, selector)
}
// create a new Zepto collection from the nodes found
return zepto.Z(dom, selector)
}

  ```
