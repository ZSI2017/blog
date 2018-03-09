## Cookie 简介 ##


----------


**几种常用属性**


httpOnly：
---------

   属性值是boolean类型，表示是否禁止客户端，也就是网页中使用js 操作cookie,默认false,在浏览器中的可以

通过查看对应每一行cookie后面的HTTP一栏是否被勾选来判断，若被勾选，表示当前cookie，不能通过

document.cookie 获取。*很多情况下获取不到cookie 都是因为这个属性导致的*

构成：
---

 name（名）和value（值）,都必须被URL编码。例如比较简单的设置:
`document.cookie = encodeURIComponent('name')+'='+encodeURIComponent('Nicholas')+';domain = .wrox.com;path=/'`;


domain属性：
---------

   可以设置多个web服务器共享 ， domain 默认是创建cookie 的网页所在服务器。所以在试图删除非当前域名，比如：当前域名是 www.abc.com, 想要删除domain是顶级域名，也就是domain = abc.com 的cookie,就必须在删除对应cookie时，设置对应的domain,否则就无法删除（*删除方法,一般都是 设置 cookie 对应的expires 为 new Date() 或者 之前的任意时间*）


path属性
------

   默认路径会设置成“/”,指定与cookie 关联在一起的网页，例如，你可以指定cookie只能从

http://www.abc.com/123 才能访问，那么在http://ww.abc.com 的页面就不会发送cookie 信息。
 - **

secure属性：
---------

 默认是没有设置，指定后，cookie 只有在使用了SSL连接的时候才会发送到服务器。


expiress属性：
-----------

表示cookie何时应该被删除的时间戳，默认情况下，浏览器会话结束后即将所有的cookie删除，对应的expiress 对

应的值就是session,会话时间。GMT格式的日期（Wdy,DD-Mon-YYYY HH:MM:SS GMT）。


----------


  **最后附带cookie 的简单封装，更加全面的解释可以查看《高程3》 第23章 离线应用于客户端存储中的cookie 部分 **

```
export default {
               'get': function(cookie_name) {
                   if (!cookie_name || cookie_name == '') {
                       return null;
                   }
                   var reg = new RegExp("(^| )" + cookie_name + "=([^;]*)(;|$)");
                   var arr = document.cookie.match(reg);
                   if (arr) {
                       return unescape(arr[2]);
                   } else {
                       return null;
                   }
               },
               'set': function(cookie_name, cookie_val, time) {
                   time = time || this.duration;
                   if (!cookie_name || cookie_name == '') {
                       return;
                   }
                   var cookie_str = cookie_name + "=" + escape(cookie_val) + ";";
                   if (time > 0) {
                       var date = new Date();
                       date.setTime(date.getTime() + time);
                       cookie_str += "expires=" + date.toGMTString()+";";
                       console.log(date.toGMTString());
                   }
                     cookie_str += "path=/;";
                     document.cookie = cookie_str;
               },
               'delete': function(cookie_name,domain) {
                   if (!cookie_name || cookie_name == '') {
                       return;
                   }
                   var date = new Date(0);
                  //  date.getDate(date.getDate() - 10000);
                  if(domain === undefined) {
                     document.cookie = cookie_name + "=; expires=" + date.toUTCString()+ ";path=/;";
                  }else {
                     document.cookie = cookie_name + "=; expires=" + date.toUTCString()+ ";path=/;domain=" + domain+';';
                  }
               }

           }
```
