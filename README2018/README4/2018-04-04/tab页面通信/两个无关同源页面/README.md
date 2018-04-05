## 无关同源页面通信 ##

**无关页面，相对应的就是既不是页面中包含的<iframe>元素，也不是当前页面弹出的窗口**，没法使用之前提到的`postMessage()`进行通信。既然是**同源页面**，我们默认还是在同一浏览器中打开的，可以联想到`HTML5`规范中作为持久保存客户端数据的方案`localStorage`。

**要访问同一个localStorage对象，页面必须同域名，同协议，同端口**

将`localStorage`作为中转站，分别进行存储消息和获取消息操作，从而完成了页面间的通信，对应`localStorage.setItem`和`localStorage.getItem`方式。
最重要的是使用`storage`事件，及时通知对方获取消息，对`storage`对象进行任何修改，都会在文档上触发`storage`事件。

[index.html](./index.html):
```
<button>click<button>

 <script>
    window.addEventListener("storage",function(ev){
       if(ev.key === "message") {
           // removeItem 同样触发storage 事件，此时ev.newValue 为空
          if(!ev.newValue)
              return;
          var message = JSON.parse(ev.newValue);
          console.log(message);
       }
    });
    function sendMessage(message) {
      console.log("exacted sendMessage");
         localStorage.setItem('message',message);
         localStorage.removeItem("message");
    };
    document.querySelector('button').onclick = function(){
         sendMessage('this is message from A');
  }
    // 发送消息给B 页面。
```

[second.html](./second.html)

```
<script>
 window.addEventListener("storage",function(ev){
       if(ev.key === "message") {
           if(!ev.newValue)
              return;
            var message = ev.newValue;
            console.log(message)
            // 发送消息给A 页面
            sendMessage("message echo from B");
       }
 });
 function sendMessage(message) {
    localStorage.setItem('message',JSON.stringify(message));
    localStorage.removeItem("message");
 }
</script>
```
 从`index.html`和`second.html`两个页面可以看到，都监听了`storage`事件，方便及时获取消息。发送消息，则利用`localStorage.setItem`发送，为了不影响真实存储，同时`removeItem`了，所有在`storage`事件的回调里面，就判断了`!ev.newValue`是否为空，避免触发两次事件

 使用node启动服务，[server.js](./server.js)文件，然后`node server.js`，
 两页面分别对应`http://localhost/` 和`http://localhost/second`。
