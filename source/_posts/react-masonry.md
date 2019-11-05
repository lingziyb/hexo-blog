---
title: react-masonry
author: lingzi
tags:
  - vue
categories:
  - 技术
date: 2019-11-05 21:09:35
---

# react-masonry

react 瀑布流

哒哒哒：

![酱紫的](http://static.lemonof.com/react-masonry/readme.png)

### 项目代码

github：[https://github.com/lingziyb/react-masonry](https://github.com/lingziyb/react-masonry)

[ 注：数据是用的百度图片网站的 ]

### 目录

- src：页面代码
- components：瀑布流组件

### 使用

传三个参数：

- column: 显示多少行
- list：数据
- renderItem：渲染的每一个 item 组件

```javascript
<Masonry column={3} list={list} renderItem={renderItem} />
```
