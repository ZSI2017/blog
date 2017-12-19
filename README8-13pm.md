## mixins ##

  mixin: 有两个非常相似的组件，他们的基本功能是一样的，可以局注册一个混合，影响注册之后

所有创建的每个 Vue 实例，这就是mixin。

  **Mixin对编写函数式风格的代码很有用，一般情况下不会改变函数作用域外部的任何东西，输入相同，得到的结果也一定相同。**

## 基础用法 ##
  新建一个mixin.js 文件，

```
 minix.js

 export const myminix= {
       data(){
           return {
           }
       },
       mounted(){
          this.sayhello();
       },
       created(){

       },
       methods:{
           sayhello:function(){
              console.log("hello from myMinix!");
           }
       }
}
```
  一个简单的方法，在组件被挂载后 输出 “hello”,

然后在想要使用这个公共方法的组件中引入进去。

```
other.vue

script:

export default {
 mixins:[myminix],
}
```

这样引入后的效果，就是在other的组件中，同样加入了sayhello() 方法

```
other.vue

script:

export default {
    mounted(){
              this.sayhello();
           },
    methods:{
           sayhello:function(){
              console.log("hello from myMinix!");
           }
}

//output  'hello from myMinix'
```
 在other 组件被挂载后，输出hello from myMinix,


## 冲突 ##
----------
 到这里，会有一个问题，如果other.vue 本身也有同样是操作挂载在mounted 上，到底谁会先执行，

```
other.vue

script:

export default {
    mixins:[myminix],
    mounted(){
              this.sayhello();
           },
    methods:{
           sayhello:function(){
              console.log("hello from other instance!");
           }
}

//output  'hello from myMinix'
//output  'hello from myMinix'
```
 输出了两次一样的结果，都来自other 组件， 第一个函数被调用时，没有被销毁，它只是被重写了。我们在这里调用了两次sayhello()函数。

## 全局下注册minix ##
  比如在 vue-cli 构建的项目中，main.js 中定义了一个minix,并且挂载在vue 实例上，


```
 Vue.mixin({
      mounted() {
         console.log("hello from other");
      }
 })

 new Vue({


  })
```
 那么在 Vue 实例下的每个组件都会 在挂载的时候执行一次这个方法，输出多次 “hello from other”
