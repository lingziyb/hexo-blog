---
title: react-native遇坑的陈列-4
date: 2019-08-20 22:04
tags: 
    - app
    - react-native 
categories: 
    - 技术
---

### 记录开始

> 第四篇react-native 问题记录。

### 环境说明

react：16.8.3
react-native：0.59.9
react-navigation：3.11.0

windows / mac 
android studio安卓模拟器 / 安卓手机    
xcode iphone模拟器 / iphone

### 记录罗列

1. 发签名不一样。本地开发打包和给测试人员打包的签名不一样，导致调微信直接提示‘签名不一样’。

解决方案如图所示：
![4D056DEE-EA42-4901-B4E2-1414528222B3.png](https://upload-images.jianshu.io/upload_images/3453108-30222aa36373603d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

参考文章：[利用grade解决APP release版和debug版签名不同的问题](https://blog.csdn.net/qq_28183203/article/details/72831395)。

2. 注意：友盟分享成功的code值有所不同
Android：0
iOS：200

3. 浏览器debugger-ui，网络请求相关信息看不到，比如cookie里有没有token。
解决参考链接：https://github.com/jhen0409/react-native-debugger/issues/209


4. 得到本地图片绝对地址，number 转 string。

一般引用图片是这样的：`import img from "./../static/img.png"` 或者 `require "./../static/img.png"`，然而它们的值打印出来是数字，所以要想得到图片的绝对地址，就得用 Image 的一个API：

![image.png](https://upload-images.jianshu.io/upload_images/3453108-20d501cc8f027ba8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)






