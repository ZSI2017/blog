
Vue v-model
===========




**用法**
------

  vue 中v-model 比较基础的用法是在表单控件中，创建双向数据绑定，能够更新数据并负责监听

用户的输入事件

   **实例代码**


        <input v-model="message" placeholder="edit me">
        <p>Message is: {{ message }}</p>
        // 这里是监听了输入框的input 事件，并将其value赋值给message。
        ==》
        <input
             v-bind:value="message"
             v-on:input = "message = $event.target.value"
           >

[详细解释][1]

这里根据文档上看，指出v-model 只是一种语法糖，同样使用**checkbox** 时，我们也使用了v-model 来更新 当前复选框是不是在被选中状态，这里监听的是**change** 事件，

    <my-checkbox
       :checked = "checked"
       @change ="(val)=>{checked =val}"
       Value = "other"
       >  
    </my-checkbox>

   在checkbox 中，就可以使用value属性去做其它事情，
v-model 指令对于不同的 type 类型会绑定在不同的事件上，查看vue.common.js 中的代码就可以发现：


```
    if (el.component) {
        genComponentModel(el, value, modifiers);
        // component v-model doesn't need extra runtime
        return false
      } else if (tag === 'select') {
        genSelect(el, value, modifiers);
      } else if (tag === 'input' && type === 'checkbox') {
        genCheckboxModel(el, value, modifiers);
      } else if (tag === 'input' && type === 'radio') {
        genRadioModel(el, value, modifiers);
      } else if (tag === 'input' || tag === 'textarea') {
        genDefaultModel(el, value, modifiers);
      } else if (!config.isReservedTag(tag)) {
        genComponentModel(el, value, modifiers);
```

checkbox
--------

  v-model会根据input 标签中的type 类型不同， 相应的使用不同的 方法。

再看到 type=“checkbox” 对应的方法，

```
    this.listener = function () {
        var model = self._watcher.value;   // 获取绑定指令 的 数组，在chang 事件发生时，时刻操作value 数组的变化
        if (isArray(model)) {
          var val = self.getValue();
          if (el.checked) {
            if (indexOf(model, val) < 0) {     //  checkbox 已经被勾选后，首先在model数组中查找有没有被勾选checkbox 的对应value，没有的的话就加入进去，这里也可以推断出在v-model 绑定在一组checkbox中时，可以记录所有的选中的值。
              model.push(val);
            }
          } else {                           // checkbox 被取消，就在model中 删除checkbox 对应的value,
            model.$remove(val);
          }
        } else {
          self.set(getBooleanValue());
        }
      };
      //   将this.listener 函数绑定到 input　的　chang 事件中去， 在checkbox 发生变化时，
      this.on('change', this.listener);  

```

上面也是从vue.js 中截取的代码， 就可以用来解释官网中这段实例:


```
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
<br>
<span>Checked names: {{ checkedNames }}</span>
```
 里面的checkedNames 可以保存所有已经被勾选的input 对应的value ,还不会有重复的值。


ElementUI  elCheckboxGroup
-------------------------------

[官方示例][2]
然后就联想到了`ElementUI`中 `<el-checkbox-group/>` 和`<el-checkbox/>`两个组件嵌套在一起使用的场景


```
  <el-checkbox-group
       v-model = "checkAll"
       @change = "handleChange"
       >
       <el-checkbox v-for="(value,index) in scope.row.values"></el-checkbox>
  <el-checkbox-group>
```
 `checkAll`数组中就保存着 内部 elCheckbox 组件对应所有已经勾选的数组，

 查看ElementUI 源码中 checkbox.vue 对应文件（只截取对应功能片断）：


```
checkbox.vue

template:
  <input
        v-else
        class="el-checkbox__original"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false">

script:
    methods:{
           handleChange(ev) {
            this.$emit('change', ev);
            if (this.isGroup) {
              this.$nextTick(_ => {
                this.dispatch('ElCheckboxGroup', 'change', [this._checkboxGroup.value]);  // 自定义dispatch 方法，向上遍历找到parent组件 名字是ElCheckboxGroup 的父组件，并触发对应的change事件。
          });
        }
      }
      }


```
this.dispatch 找到的父组件就是 checkboxGroup组件，

```
 checkboxGroup.vue

   template   
   <div class="boxGroup-class">
     <slot >
     </slot>
   </div>

  //里面没有注册任何 change 方法

script :

   watch: {
      value(value) {
        this.dispatch('ElFormItem', 'el.form.change', [value]);
      }
    }
   // 只是watch 了value 属性。
```
 因为在　


```
<el-checkbox-group  v-model = "checkAll" />  ===
 <el-checkbox-group @change = "(value) ={checkAll = value}" :value="checkAll"/>
```
也是利用了 v-model 的语法糖。











  [1]: https://cn.vuejs.org/v2/guide/components.html#%E4%BD%BF%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6%E7%9A%84%E8%A1%A8%E5%8D%95%E8%BE%93%E5%85%A5%E7%BB%84%E4%BB%B6
  [2]: http://element.eleme.io/#/zh-CN/component/checkbox#indeterminate-zhuang-tai
