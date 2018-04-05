## 无关不同源页面通信 ##
 **即在浏览器上打开了两个没有任何关系的tab，不用域，也任何依赖关系**
 就可以结合前面使用的`postMessage`和`localStorage`，利用`postMessage`可以跨域访问，`localStorage`可以在无关页面之间通信的特点，利用`bridge.html`页面作为中转站，实现通信。

 首先看下HTML结构，在[tabA](./tabA.html)和[tabB](./tabB.html)是需要通信的两个页面，同时它们都包含了指向[bridge.html](./bridge.html)的`<iframe>`元素。

 然后，以一次从tabA 到tabB的通信为例：

   - tabA 发送消息。拿到`iframe`的引用，然后`postMessage`发送消息到tabB的`iframe`。
   `document.querySelector("#J_bridge").contentWindow.postMessage(JSON.stringify(data),'/');`

   - 然后`bridge.html`页面中转。
       - 通过`window.addEventListener('message',function(e){}`，监听到了tabA 中`iframe`发送的消息。
       - 利用`localStorage.setItem`存放消息，
       - 从而触发页面中` window.addEventListener('storage',function(ev){}`的`storage`事件,
       - 最后` window.parent.postMessage(ev.newValue,'*')`，获取到父页面的窗口引用，这里可以认为获取到了tabB页面的窗口引用，`postMessage`传递消息。

   - 最后tabB中获取message 消息。
       通过 `window.addEventListener('message',function(e){})`监听message 消息，获取到`bridge.html`传递的内容。

可以发现，在`bridge.html`页面中转消息时，最后一步`window.parent.postMessage`发送消息，会同时触发tabA和tabB 里的`message`事件，因为两页面都通过`iframe`引入了`bridge.html`页面，所以这要在传递的消息中加上区分字段`type`,标识发送方。

[演示代码](./),然后`node server.js`启动服务，A页面和B页面对应url是`http://localhost/`
和`http://localhost:8000/second`。
