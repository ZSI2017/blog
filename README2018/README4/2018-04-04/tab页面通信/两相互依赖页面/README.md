## 相关依赖页面之间的相互通信 ##
> window.postMessage() 方法，可以安全的进行跨域，跨页面通信

**向其它窗口发送消息**
```
 otherWindow.postMessage(message,targetOrigin)
```
接受两个参数：
- message: 要传递的数据，可以是任意基本类型或对象
- targetOrigin: 字符串参数，指明目标窗口的源，协议+域名+端口。这个参数是为了安全考虑。同时，设置成* ，表示可以传递给任意窗口，设置成"/",表明必须传递给与当前窗口同源


**必须拿到其它窗口的一个引用，而不是当前窗口的应用，所以这种方式适合有依赖关系的页面之间通信**
**不同依赖关系下，获取其它窗口应用的方法：**
- 页面与嵌套的iframe通信。
    获取iframe的contentWindow属性。或者通过命名/数值索引的window.frames[0]

- 页面和其打开的新窗口通信。
    执行window.open返回的窗口对象。
    ```
      var otherWindow = window.open("http://www.baidu.com")
    ```
***
这里使用`node`起了两个端口不同的简单服务，直接使用`node server.js`,启动服务。[server.js文件位置](./server.js)，服务启动后，打开http://localhost/，就可以看到页面。

**主页面：**
```
<div>
  <h1> 主页面 </h1>
  <iframe id="child" src="http://localhost:8000/second.html"></iframe>

  <button id="child-btn"> 向子页面发送消息 </button>
</div>
<script>
  document.querySelector("#child-btn").addEventListener("click",function(){
    sendMessage({type:"parent",data:"子页面接收"})
  })
  function sendMessage(data) {
    document.querySelector("#child").contentWindow.postMessage(JSON.stringify(data), '*');
  }
  window.addEventListener('message', function(e) {
    console.log("received response: ", e.data);
  })
</script>
```
子页面在8000的端口上输出。通过`iframe`引入子页面。然后利用`contentWindow`拿到子页面窗口的引用，就可以向子页面发送消息，targetOrigin设置成了`*`,保证在不同源上的子页面也可以收到消息。

**嵌套的子页面：**
```
 <h1> 子 iframe 页面</h1>
  <button type="button" name="button">向父页面发送消息</button>
  <script>
  document.querySelector("button").addEventListener("click",function(e){
    console.log("子页面 sending...")
     window.parent.postMessage(JSON.stringify({type:"child",data:"父页面接收"}),'*')
  },false)

  window.addEventListener('message', function() {
    console.log("received response: ", event.data);
  })

  </script>
```
 可以看到，子页面通过`window.parent`拿到了父页面的窗口引用，同时通过`addEventListener`监听了`message`事件，实时获取到父页面传过来的信息。这样**不同源的两嵌套页面，就可以实现通信**
