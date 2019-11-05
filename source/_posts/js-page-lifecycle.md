---
title: 页面事件的生命周期 javascript（DOMContentLoaded、load、readyState）
author: lingzi
tags:
  - javascript
  - dom
categories:
  - 技术
date: 2018-12-07 17:08
---

### 起因

> 页面加载完成时，即分为：dom 解析完毕和所有资源加载完毕。基本概念模糊，现在细细的掌握下。

### 页面生命周期

1. `DOMContentLoaded` 事件在`DOM`树构建完毕后被触发，我们可以在这个阶段使用 `JS` 去访问元素。

   - `async` 和 `defer` 的脚本可能还没有执行。
   - 图片及其他资源文件可能还在下载中。

2. `load` 事件在页面所有资源被加载完毕后触发，通常我们不会用到这个事件，因为我们不需要等那么久。
3. `beforeunload` 在用户即将离开页面时触发，它返回一个字符串，浏览器会向用户展示并询问这个字符串以确定是否离开。
4. `unload` 在用户已经离开时触发，我们在这个阶段仅可以做一些没有延迟的操作，由于种种限制，很少被使用。
5. `document.readyState` 表征页面的加载状态，可以在 `readystatechange` 中追踪页面的变化状态：
   - `loading` —— 页面正在加载中。
   - `interactive` —— 页面解析完毕，时间上和 `DOMContentLoaded` 同时发生，不过顺序在它之前。
   - `complete` —— 页面上的资源都已加载完毕，时间上和 `window.onload` 同时发生，不过顺序在他之前。

### 总结

_发生顺序依次为：_

> 1. `readyState`(loading)
> 2. `readyState`(interactive)
> 3. `DOMContentLoaded`
> 4. `readyState`(complete)
> 5. `window.onload`
> 6. `beforeunload`
> 7. `unload`

##### 注：

- `1、$(function(){}) => $(document).ready()`：在`IE8` 及以下浏览器下相当于`readyState(complete)`； 非`IE`浏览器 相当于 `DOMContentLoaded`。

- `2、$(window).load(function){} => window.onload=function(){}`。

---

查阅文章有：
1、[[译]页面生命周期：DOMContentLoaded, load, beforeunload, unload 解析](https://github.com/fi3ework/Blog/issues/3)。
2、[用原生 JavaScript 替换 jQuery 的 ready 方法](https://www.zcfy.cc/article/quick-tip-replace-jquery-039-s-ready-with-plain-javascript)。
