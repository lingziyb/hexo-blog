---
title: lottie-react-native引发ios cocoapods的使用
author: lingzi
tags:
  - react-native 
  - ios
categories:
  - 技术
date: 2019-09-16 20:38:36
---

### 感慨

> 还是继续开发 ```rn```。哎，真的是一把鼻涕一把泪啊。一个纯前端人员凭着一腔热血和自信，一直坚持走下来了，虽然步履蹒跚，虽然举步维艰。

### 需求场景说明
> 这次需求是加载动画，代码直接写的话还是比较困难的。然后给 GIF，她们导出来说比导视频还大，视频已经几十兆了，我调研了一下方案，决定使用 ```Lottie``` 方案。由于这个出了比较多问题，所以单独写一篇。

### 问题的简明扼要描述
```Lottie-react-native``` ，iOS上需要用 ```pod```，而我的项目没有 ```pod``` 相关文件，在 ```Xcode``` 上 build 项目各种报错，而且我对 ```pod``` 相关完全陌生，连Xcode也是之前才上手学了一点点。

### 问题的进一步详细描述
上面也说了没有 ```pod``` 相关文件，啥意思？到底应该有还是没有？
我尝试按照正常流程初始化项目： ``` react-native init AwesomeProject ```，是0.60.0版本。iOS目录如下：
![0.60版本.png](https://upload-images.jianshu.io/upload_images/3453108-8d7151757525a4d6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

而当初我用的是0.59版本，因为无意间升级到0.60版本，因为那时60版才出来几天，不太稳定，在我的项目里面有些问题，所以我又指定版本到59版了： ``` react-native init AwesomeProject --version 0.59.9 ```。iOS目录如下：
![0.59.9.png](https://upload-images.jianshu.io/upload_images/3453108-a24e7d4dbce25165.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

竟然没有```pod```相关任何东东，这就导致我的问题比常人多，而且我对 ios pod 完全陌生。


### 环境说明

"react": "16.8.3"
"react-native": "0.59.9"
"react-navigation": "3.11.0"
"lottie-ios": "3.0.3",
"lottie-react-native": "^3.1.0",

windows / mac
android studio / xcode
模拟器 / 真机

### 开始
按照 ```Lottie``` 官方文档 [https://github.com/react-native-community/lottie-react-native](https://github.com/react-native-community/lottie-react-native) 进行使用。
1. iOS步骤里明确写了 ```pod install```，所以先了解pod是啥，并进行安装。安装cocoaPods对过程也比较艰辛，因为肿么都有问题，还慢！超级慢！查阅了几篇文章，胡乱搞了一通完事。

    解决问题参考文章如下：
    - [Error fetching https://gems.ruby-china.org/: bad response Not Found 404 (https://gems.ruby-china....](https://www.jianshu.com/p/112a4996c780)
    - [ios cocoaPods 安装和 更新](https://www.jianshu.com/p/986781e339b1)

2. ```pod``` 已经安装成功，这下可以执行 ```pod install``` 了吧，结果：
![image.png](https://upload-images.jianshu.io/upload_images/3453108-7386e6333b94c424.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
咦，这又是咋回事？
原来是要先 ```pod init```。

    解决问题参考文章如下：
    - [Cannot Install Cocoapods - No podfile found in the project directory](https://stackoverflow.com/questions/36902497/cannot-install-cocoapods-no-podfile-found-in-the-project-directory)

3. 执行 ```pod init``` ，又出现问题：
![image.png](https://upload-images.jianshu.io/upload_images/3453108-3b64e16fc8b15f63.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

原来是要指定项目：```pod init myApp.xcodeproj```
好，这下，再执行 ```pod install``` ，succeed。

4. 再Xcode上 运行项目，报了一大堆的错。看都看不懂。
![image.png](https://upload-images.jianshu.io/upload_images/3453108-bd58539440ef56d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/3453108-ccfabecd7612c27f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/3453108-6457c742179a55f0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

最后解决了，虽然过程有点艰辛。解决办法是，```podfile``` 完善如下（注意：AwesomeProject => 换成你自己的项目名）：
```
platform :ios, '9.0'
project "AwesomeProject.xcodeproject"
# require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'

use_modular_headers!

target 'jiangren' do
  # Pods for test
  pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'
  pod 'React', :path => '../node_modules/react-native', :subspecs => [
    'CxxBridge',
    # Add any other subspecs you want to use in your project
  ]

  pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
  pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/glog.podspec'
  pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'

  pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/glog.podspec', :modular_headers => false

  pod 'lottie-ios', :path => '../node_modules/lottie-ios'

  pod 'lottie-react-native', :path => '../node_modules/lottie-react-native'

end
```
然后执行 ```pod install``` 就没问题了，建议先删掉 ```podfile.lock``` 和 ```pods``` 文件夹。随后build项目也成功了。

###  总结
现在已经了解iOS的pod的使用了。后续装第三方插件的时候，比如：```react-native-video```，直接 ```react-native link react-native-video```，```podfile``` 里面就已经有这句了，不用自己写的 。
![image.png](https://upload-images.jianshu.io/upload_images/3453108-19cfa30a8d2f58fa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
然后再执行 ```pod install``` ，再运行Xcode项目就完事了。




