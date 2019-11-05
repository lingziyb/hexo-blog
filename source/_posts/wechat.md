---
title: 微信小程序采坑系列
author: lingzi
tags:
  - 微信小程序
categories:
  - 技术
date: 2019-08-12 17:26:22
---

#### 1. 报错：`request:fail url not in domain list`。

在获取地址时，用的腾讯 api 解析的经纬度，测试时没问题，上线了就报这个错了。

解决方案：

> 微信公众平台，在“设置” -> “开发设置”中设置 request 合法域名，添加 `https://apis.map.qq.com`。（本来以为他们是一家，不用加，结果还是要加。）

参考：https://blog.csdn.net/weixin_43047977/article/details/84836501

#### 2. 蓝二公子去约会了，下次再来看你。
