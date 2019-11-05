---
title: javascript 向数组添加n个空字符串
author: lingzi
tags:
  - javascript
categories:
  - 技术
date: 2017-12-07 13:14
---

#### 书写文章起因

> 在最近的抽奖活动开发里，有这么个需求：
> 接口返回不定数量（length<=9）的奖品数组，前端这边要循环展示长度为 9 的奖品数组。
> so，开始我们今天的正题，添加空字符串数组。

##### 方案 1、splice + while

```javascript
const a = [1, 2, 3];
while (a.length < 9) {
  a.splice(0, 0, "");
}

// a结果是： [ '', '', '', '', '', '', 1, 2, 3 ]
```

##### 方案 2、for + push

```javascript
const a = [1, 2, 3];
const n = 9 - a.length;
for (let i = 0; i < n; i++) {
  a.push("");
}

// a的结果：[ 1, 2, 3, '', '', '', '', '', '' ]
```

##### 方案 3、Array.prototype.fill()

Array.fill 是 ES6 新增的方法，它可以帮助你填充数组。
定义：用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。

```javascript
// 将原数组的每一个元素填充成 fill 传入的值。
[1, 2, 3, 4].fill(6);
// => [6,6,6,6]
```

它支持传入三个参数: fill(value, start, end)
value：用来填充数组元素的值。
start：可选 起始索引，默认值为 0。
end：可选 终止索引，默认值为 this.length。

```javascript
[1, 2, 3]
  .fill(4) // [4, 4, 4]
  [(1, 2, 3)].fill(4, 1) // [1, 4, 4]
  [(1, 2, 3)].fill(4, 1, 2) // [1, 4, 3]
  [(1, 2, 3)].fill(4, 1, 1) // [1, 2, 3]
  [(1, 2, 3)].fill(4, -3, -2) // [4, 2, 3]
  [(1, 2, 3)].fill(4, NaN, NaN); // [1, 2, 3]
Array(3).fill(4); // [4, 4, 4]
```

所以第三种方案是:

```javascript
const a = [1, 2, 3];
a.concat(Array(9 - a.length).fill(""));

// a 的结果为：[1, 3, 9, "", "", "", "", "", ""]
```
