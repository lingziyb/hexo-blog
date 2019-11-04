---
title: react-native遇坑的陈列-4
date: 2019-08-12 15:18
tags:
  - app
  - react-native
  - typescript
categories:
  - 技术
---

### 记录开始

> 第三篇 react-native 问题记录。

### 环境说明

react：16.8.3
react-native：0.59.9
react-navigation：3.11.0

windows / mac
android studio 安卓模拟器 / 安卓手机  
xcode iphone 模拟器 / iphone

### 记录罗列

1. 签名不一样。本地开发打包和给测试人员打包的签名不一样，导致调微信直接提示‘签名不一样’。

解决方案如图所示：
![4D056DEE-EA42-4901-B4E2-1414528222B3.png](./1.jpg)

参考文章：[利用 grade 解决 APP release 版和 debug 版签名不同的问题](https://blog.csdn.net/qq_28183203/article/details/72831395)。

2. 注意：友盟分享成功的 code 值有所不同
   Android：0
   iOS：200

3. 浏览器 debugger-ui，网络请求相关信息看不到，比如 cookie 里有没有 token。
   解决参考链接：https://github.com/jhen0409/react-native-debugger/issues/209

4) 得到本地图片绝对地址，number 转 string。

一般引用图片是这样的：`import img from "./../static/img.png"` 或者 `require "./../static/img.png"`，然而它们的值打印出来是数字，所以要想得到图片的绝对地址，就得用 Image 的一个 API：

![image.png](./2.jpg)

官网 API 参考链接：[ react-native 的 Image](https://facebook.github.io/react-native/docs/image)

5. iOS Xcode 真机调试模式 remote js debugger，connection timed out。而且也会直接导致第一次打开 app 时，请求接口也超级慢！

![image.png](./3.jpg)
![image.png](./4.jpg)

我查了很多文档是代码是这样加的啊，如下：
![image.png](./5.jpg)

终于在 react-native 的 github 上一篇文章里找到一行代码，解决了问题：
![image.png](./6.jpg)
参考文章：
Xcode 10 runtime warning on fresh install: nw_socket_handle_socket_event：[https://github.com/facebook/react-native/issues/21030](https://github.com/facebook/react-native/issues/21030)

6. duplicate symbols for architecture arm64, error: linker command failed with exit code 1(use -v see invocation).
   ![image.png](./7.jpg)
   解决方案是：remove all about React in PodFile，也就是删除 podfile 里 react 里配置的所有。
   参考文章：[https://stackoverflow.com/questions/46392312/archive-reactnative-got-duplicate-symbols-for-architecture-arm64](https://stackoverflow.com/questions/46392312/archive-reactnative-got-duplicate-symbols-for-architecture-arm64)

7. 视频做背景，用[react-native-video](https://github.com/react-native-community/react-native-video)，绝对定位即可。
   参考链接：[http://cn.voidcc.com/question/p-yknnwhqt-vd.html](http://cn.voidcc.com/question/p-yknnwhqt-vd.html)

- build 时出现问题：Cannot read property 'Constants' of undefined：
  ![image.png](./8.jpg)
  解决方案：[https://github.com/react-native-community/react-native-video/issues/438](https://github.com/react-native-community/react-native-video/issues/438)

8. iOS 应用程序图标生成： https://icon.wuruihong.com/

9. 启动页、图标 添加：[https://blog.whezh.com/react-native-name-icon-launch/](https://blog.whezh.com/react-native-name-icon-launch/)

10. 微博分享，提示 URL Scheme 错误 。
    解决方案：[https://blog.csdn.net/alincexiaohao/article/details/21699169](https://blog.csdn.net/alincexiaohao/article/details/21699169)

11. 状态栏颜色变化：
    [https://www.lishuaishuai.com/app/react-native/762.html](https://www.lishuaishuai.com/app/react-native/762.html)

代码更改如下：
![image.png](./9.jpg)
![image.png](./10.jpg)

12. yarn global expo 未生效。
    ![image.png](./11.jpg)

解决方案：
![image.png](./12.jpg)

参考文章：
Yarn global command not working：[https://stackoverflow.com/questions/40317578/yarn-global-command-not-working](https://stackoverflow.com/questions/40317578/yarn-global-command-not-working)

13. 莫名其妙的问题：run custom shell script 'install third party '：permission denied。
    ![image.png](./13.jpg)
    解决方法：
    `rm -rf node_modules/ && yarn cache clean && yarn install`

14. Lottie-react-native，设计师用 AE 导出 json 文件也太坑了吧，在 iOS 上那一个黑的三角形出不来（安卓正常）。左边安卓，右边 iOS。
    ![image.png](./14.jpg)

我把 json 里这个把这个[0,0,0,0] 改成了 [0,0,0,1] 就出来了。
![image.png](./15.jpg)
json 文件格式化一下：
![image.png](./16.jpg)

iOS 上黑色三角形就出来了。
![image.png](./17.jpg)

Lottie json 文件 预览：https://lottiefiles.com/preview

15. Error window.deltaUrlToBlobUrl is not a function
    debug js remotely
    解决问题：加上 xip.io
    ![image.png](./18.jpg)

参考链接：[https://stackoverflow.com/questions/49365217/react-native-debug-js-remotely-error-window-deltaurltobloburl-is-not-a-function](https://stackoverflow.com/questions/49365217/react-native-debug-js-remotely-error-window-deltaurltobloburl-is-not-a-function)
