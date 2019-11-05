---
title: JavaScript中，map和foreach的异同点
author: lingzi
tags:
  - javascript
categories:
  - 技术
date: 2018-11-27 20:06
---

### 起因

> 我平时两个都会用，也知道一个有返回值一个没有返回值。但公司一个小妹子突然有一天就问我她有没有用对的时候，我竟然不能一眼确定，所以觉得自己还是没有熟练掌握，专门梳理一下，并记录下来，供以后记不清了查看。

### 异同点

##### 相同点

- 都是循环遍历数组中的每一项。
- `forEach()`和`map()`里面每一次执行匿名函数都支持 3 个参数：数组中的当前项`item`,当前项的索引`index`,原始数组`input`。
- 匿名函数中的`this`都是指`Window`。
- 只能遍历数组。

##### 不同点

1. `foreach`：没有返回值。

> 数组中有几项，那么传递进去的匿名回调函数就需要执行几次；
> 理论上这个方法是没有返回值的，仅仅是遍历数组中的每一项，不对原来数组进行修改；但是可以自己通过数组的索引来修改原来的数组；

```javascript
var ary = [12, 23, 24, 42, 1];
var res = ary.forEach(function(item, index, input) {
  input[index] = item * 10;
});
console.log(res); //--> undefined;
console.log(ary); //--> 通过数组索引改变了原数组；
```

2. `map`：有返回值，可以 return 出来。

> `map`的回调函数中支持`return`返回值；`return`的是啥，相当于把数组中的这一项变为啥（并不影响原来的数组，只是相当于把原数组克隆一份，把克隆的这一份的数组中的对应项改变了）；

```javascript
var ary = [12, 23, 24, 42, 1];
var res = ary.map(function(item, index, input) {
  return item * 10;
});
console.log(res); //-->[120,230,240,420,10];  原数组拷贝了一份，并进行了修改
console.log(ary); //-->[12,23,24,42,1]；  原数组并未发生变化
```

### 兼容写法：

不管是 forEach 还是 map 在 IE6-8 下都不兼容（不兼容的情况下在 Array.prototype 上没有这两个方法）,那么需要我们自己封装一个都兼容的方法，代码如下：

```javascript
/**
 * forEach遍历数组
 * @param callback [function] 回调函数；
 * @param context [object] 上下文；
 */
Array.prototype.myForEach = function myForEach(callback, context) {
  context = context || window;
  if ("forEach" in Array.prototye) {
    this.forEach(callback, context);
    return;
  }
  //IE6-8下自己编写回调函数执行的逻辑
  for (var i = 0, len = this.length; i < len; i++) {
    callback && callback.call(context, this[i], i, this);
  }
};

/**
 * map遍历数组
 * @param callback [function] 回调函数；
 * @param context [object] 上下文；
 */
Array.prototype.myMap = function myMap(callback, context) {
  context = context || window;
  if ("map" in Array.prototye) {
    return this.map(callback, context);
  }
  // IE6-8下自己编写回调函数执行的逻辑
  var newAry = [];
  for (var i = 0, len = this.length; i < len; i++) {
    if (typeof callback === "function") {
      var val = callback.call(context, this[i], i, this);
      newAry[newAry.length] = val;
    }
  }
  return newAry;
};
```

注：
1. `foreach`和`map`都不改变原数组，map 可以 return 一个新数组，而 foreach 可以通过数组索引来修改原来的数组。
2. 本文摘自 https://segmentfault.com/q/1010000013170900
