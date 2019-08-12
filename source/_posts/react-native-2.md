---
title: react-native遇坑的陈列-2
date: 2019-08-12 15:18
author: lingzi
tags: 
    - app
    - react-native 
    - typescript
categories: 
    - 技术
---

### 记录开始
> 继上一篇继续

### 环境说明
react：16.8.3
react-native：0.59.9
react-navigation：3.11.0

windows
android studio安卓模拟器 / 安卓手机    

### 记录罗列

1. 显示富文本：react-native-webview。但是字体显示不正常，要在接口返回的html里加上viewport 适配：
```javascript
<WebView
  source={{
    html:
      "<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />" +
      ArticleStore.article.content
  }}
/>
```
如果里面的图片超出里固定区域，可以顺便加上 img{width:100%;}。
```javascript
<WebView
  source={{
    html:
      "<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' /><style>img{width: 100%}</style> " +
      ArticleStore.article.content
  }}
/>;
```

2. 虚线只支持全边框（borderWidth），不支持单边的（borderTopWidth）。 而且虚线要想生效，还必须同时设置 borderWidth 和 borderRadius。
参考链接：https://github.com/facebook/react-native/issues/24224

3. 问题 Task :react-native-gesture-handler:compileDebugJavaWithJavac FAILED 
参考链接：[https://github.com/kmagiera/react-native-gesture-handler/issues/642](https://github.com/kmagiera/react-native-gesture-handler/issues/642)

4. 轮播插件：react-native-swiper。
遇到的问题是：onIndexChanged事件以及scrollBy都不怎么听话，各种问题（比如onIndexChanged时index索引可以为负数..），经常拆东墙补西墙。
最终问题点就在于一个：设置key！所有问题消失无踪影。
![image.png](https://upload-images.jianshu.io/upload_images/3453108-b30ace3d6018b40e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




