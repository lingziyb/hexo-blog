---
title: Chrome Extension开发问题总结
author: lingzi
tags:
  - 浏览器扩展插件
categories:
  - 技术
date: 2017-10-06 22:15
---

### css

在 HTML 文件里，css 可以内嵌、可以内部样式表、也可以外链引入。

### js

js 就要注意了！！

- js 不支持 inline javascript
- 只能引入外部 js 文件

按照下面两种错误方式会出现如图错误：

![error.png](./1.jpg)

```javascript
// 错误做法1：
<input id="test" type="text" onclick="open()" />
<script>
    function open(){
        console.log(11);
    }
</script>
```

```javascript
// 错误做法2：

html文件代码：

<input id="test" type="text" onclick="open()" />
<script src="popup.js" type="text/javascript" charset="utf-8"></script>  //引入外部js文件

popup.js文件代码：

function open(){
    console.log(11);
}
```

所以请模仿下面正确做法！

```javascript
// 正确做法：

html文件代码：

<input id="test" type="text" />
<script src="popup.js" type="text/javascript" charset="utf-8"></script>  //引入外部js文件

popup.js文件代码：

document.getElementById('test').onclick = function () {
    console.log(11);
};
```

### google 浏览器上预览

教你们一招特别高效的办法，我以前都不知道，这次才发现的额！
1、点击图上红色框内按钮----选择你的插件所在的文件夹----确认。

![例1.png](./2.jpg)
2、完成后如下图所示。

![例2.png](./1.jpg)
3、插件可以运行成功。最重要的是，当你改了代码，直接刷新下浏览器或者点插件或者点重新加载，都可以看到已改过的内容，超级方便。我以前还傻傻的跑去打包扩展程序，然后傻傻的把.crx 文件拖到浏览器插件页里运行看效果。超级笨哇，都没有发现上面这个超级方便的东东。
