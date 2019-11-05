---
title: JavaScript中，for...in 和 for...of 的区别
author: lingzi
tags:
  - javascript
categories:
  - 技术
date: 2018-10-22 23:14
---

### 起因

> 我一直分不清它们，所以专门研究对比下。

### 区别

###### 1. 官方说法

无论是`for...in`还是`for...of`语句都是迭代一些东西。它们之间的主要区别在于它们的迭代方式。
`for...in`：语句以原始插入顺序迭代对象的可枚举属性。
`for...of`：语句遍历可迭代对象定义要迭代的数据。

###### 2. 通俗易懂的说法

`for...in`：循环出的是`key`。
`for...of`：循环出的是`value`。
注意，`for...of`是`ES6`新引入的特性。修复了`ES5`引入的`for...in`的不足。

### 示例

以下示例显示了与`Array`一起使用时，`for...of`循环和`for...in`循环之间的区别。

```javascript
Object.prototype.objCustom = function() {};
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = "hello";

for (let i in iterable) {
  console.log(i);  // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i);  // logs 0, 1, 2, "foo"
  }
}

for (let i of iterable) {
  console.log(i);  // logs 3, 5, 7
}
```

### 总结

在循环对象属性的时候，使用`for...in`；在遍历数组的时候，使用`for...of`。

查阅文章有：
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of
https://segmentfault.com/q/1010000006658882
