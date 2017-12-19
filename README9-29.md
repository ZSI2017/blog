

> **通常我们在项目过程中，难免会碰到各种对于数组的操作，或是是一些业务逻辑中，使用数组自带方法，可以更加灵活的达到预期效果。**
>
>  **这里对一些常用的数组方法进行总结，顺便记录下使用中的小技巧，方便后面进行查询**

----------
## forEach ##
 **使用频率最高的数组遍历方法，效果与for循环相似，对数组中每一项进行遍历，但时间效率要比for 循环低，从代码简洁上看，推荐使用forEach，如果在有条件的情况下进行遍历时，推荐使用some 和 every 进行遍历，会在满足具体条件后停下，节约不必要的循环**

      [1,2,3].forEach(function(value, index, array) {
          cosole.log(value);                                
      });

    // output
    //   1
    //   2
    //   3

 **对应的在jQUery 中也实现了相同功能的遍历方法 $.each()，对选中的数组或者对象进行遍历，这里还有$().each() 在dom 操作中使用较多，表示对子元素集合进行遍历。[详细解释][1]**


```
$.each([1,2,3],function(){
 console.log(this);
}
// output
 1
 2
 3

// 对象进行遍历
$.each({a:1,b:2,c:3},function(key,val){
     console.log(obj[key])
})
// output
  1
  2
  3
```
## map ##
**对旧数组进行'映射'，同时生成对应的新数组，用法简单，不改变原来的旧数组**

```

var data = [1, 2, 3, 4];
var arrayOfSquares = data.map(function (item) {
      return item * item;
});

```
**最后返回的新的数组arrarOfSquares [1,4,9,16]**
## filter ##
**数组过滤方法，返回判断条件为true 的数组项形成的数组，不改变原数组**

```
var arrayFilter = [1,2,3,4,5].filter(function(item,index){
                rerutn item>3;
         })
console.log(arrayFilter);
// output  [4,5]

```
## some ##
 **数组中的判断方法，更逻辑运算中的或操作非常相似，|| ，只要数组中有任何一项满足条件,就返回true,并且停止后面的遍历.所以some方法在实际使用中也可以计较准确的找到指定数组项的同时，得到相应的下标，更indexOf 方法有一些类似**


```
[1,2,3,4,5].some(function(item,index){
                      console.log(index);
                      return item<3;
       })
 // output  0;


```
**  数组在遍历的过程中，在第一个数组项处就停止循环了，并且整个数组返回 true**

## find ##
**找到符合条件的第一个数组元素，与filter 类，如果没有找到任何一个就返回undefined**

```
var inventory = [
  {name: 'apples', quantity: 2},
  {name: 'bananas', quantity: 0},
  {name: 'cherries', quantity: 5}
];

function findCherries(fruit) {
  return fruit.name === 'cherries';
}

console.log(inventory.find(findCherries));
// { name: 'cherries', quantity: 5 }
```


## every ##
**与some方法相反的效果，只有数组中所有的项全都满足条件，就会返回true，与逻辑运算中的与，&& 操作类似**

```
if([1,2,3,4,5].every(functionI(item,index){
                     console.log(index);
                     return item<3;
             })
   // output 0,1,2;

```
**在带条件的遍历中，every 使用频率比较高。既可以得到满足条件的数组项，也可以判断数组项中所有的值情况。**

## indexOf ##
**查找匹配的项， 返回匹配的索引值，如果没有匹配，则返回-1，*在搭配逻辑运算中非运算时 ~ ,有意想不到的效果***

        ~ value 值， 当value = -1 的时候，得到的才是0； false
                      其他任何值的时候，等到的是非0，   true
```
if(!~[1,2,3,4,5].indexOf(1)){
     cnosole.log()
}
```
**对于上面这种情况，在数组中没有满足条件的数组项时，才会返回true,如果有满足条件的数组项，就会返回false,对于处理一些特定的业务逻辑有非常奇妙的效果**

lastIndexOf
-----------
**从后往前找，返回匹配项的索引值，如果没有匹配的话，就返回 -1，**

## reduce ##
**递归遍历**


```
var sum = [1,2,3,4].reduce(function(previous,current,index,array){
                      return previous + current;
                });
            console.log(sum);
          // output 10;

```
** 默认是从 第一个元素开始遍历，**

reduceRight
-----------


  从后往前进行递归遍历

[1]: http://www.frontopen.com/1394.html
