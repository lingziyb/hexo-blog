---
title: react-native遇坑的陈列-3
date: 2019-08-12 15:58:18
author: lingzi
tags: 
    - app
    - react-native 
    - typescript
categories: 
    - 技术
---

### 记录开始

> 之前都是在windows上开发，公司配的mac终于到了，现在开始用上mac。然而对于一个从未使用过mac的人来说，啊...亚历山大。

### 环境说明

react：16.8.3
react-native：0.59.9
react-navigation：3.11.0

windows / mac 
android studio安卓模拟器 / 安卓手机    
xcode iphone模拟器 / iphone

### 记录罗列

1. mac 安装 jdk1.8：
```javascript
brew cask install adoptopenjdk/openjdk/adoptopenjdk8
```

2. 第三方分享和登录，用的友盟。
- 友盟react-native分享文档：[https://developer.umeng.com/docs/66632/detail/67587#h3-u5206u4EAB](https://developer.umeng.com/docs/66632/detail/67587#h3-u5206u4EAB)
- React Native 结合友盟实现分享：[https://juejin.im/post/5c17ba876fb9a049b07d440f#heading-16](https://juejin.im/post/5c17ba876fb9a049b07d440f#heading-16)
- [https://www.jianshu.com/p/d54b259f7cb0](https://www.jianshu.com/p/d54b259f7cb0)
- [https://github.com/songxiaoliang/react-native-share](https://github.com/songxiaoliang/react-native-share)


3. mac  终端翻墙
```javascript
export http_proxy=http://127.0.0.1:1087
export https_proxy=http://127.0.0.1:1087
```
参考链接：[http://kerminate.me/2018/10/22/mac-%E7%BB%88%E7%AB%AF%E5%AE%9E%E7%8E%B0%E7%BF%BB%E5%A2%99/](http://kerminate.me/2018/10/22/mac-%E7%BB%88%E7%AB%AF%E5%AE%9E%E7%8E%B0%E7%BF%BB%E5%A2%99/)

4. 误删远程dev分支
- 使用git log -g 找回之前提交的commit
- 使用git branch dev commit_id命令用这个commit创建一个分支
- 切换到dev分支

参考文章：
git 误删分支恢复方法：[https://blog.csdn.net/new03/article/details/84920771](https://blog.csdn.net/new03/article/details/84920771)

5. 友盟第三方微信分享，唤起微信授权后不走回调。
问题解决：回调包wxapi这个文件夹要放在项目包酱人（说明：酱人是我们项目的名称）里面（之前是跟jiangren平级的）。
![image.png](https://upload-images.jianshu.io/upload_images/3453108-a7901361fd38e8fc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

6. git提交了过大的文件  导致push报错
![image.png](https://upload-images.jianshu.io/upload_images/3453108-eab486789cc4462d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

解决：
![image.png](https://upload-images.jianshu.io/upload_images/3453108-5051a5e70bf7437e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
参考链接：[https://blog.csdn.net/yimingsilence/article/details/81460278](https://blog.csdn.net/yimingsilence/article/details/81460278)

7. 友盟第三方分享登录：
IMEI授权，友盟官网没有说清楚这段代码是加在哪个文件：
![image.png](https://upload-images.jianshu.io/upload_images/3453108-a8ef6735811bbfa1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
问了rn群里的小伙伴才知是加在 MainActivity.java 里！
![image.png](https://upload-images.jianshu.io/upload_images/3453108-7a305492404585d4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

8. 非 组件页面  用路由的问题。
解决方案：暴露navigation在全局。
![image.png](https://upload-images.jianshu.io/upload_images/3453108-456606797df00cac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)







