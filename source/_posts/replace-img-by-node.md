---
title: node把md文档中的图片地址换成相对地址
author: lingzi
tags:
  - node
  - md
categories:
  - 技术
date: 2019-11-05 12:22:21
---

### 出生场景

我的文章之前都是用简书写的，然而简书的文章我复制到自己的博客上，图片就显示不出来。而且多篇文章，图就更多了，我不可能一张一张替换吧。然后朋友就说，那你写个脚本替换不就行了。然后就开始了。

### 举个例子

- 一般 md 图片都长这样的：

```md
![抽奖转盘](http://upload-images.jianshu.io/upload_images/3453108-d3d4ecbe2309e96e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```

- 替换之后它长这样的：

```md
![抽奖转盘](./1.jpg)
```

### 实现步骤

1. 循环文件夹，找到文件夹里所有要替换图片的 md 文件。
2. 读取 md 文件内容。
3. 正则匹配图片路径。
4. 下载图片。
5. 保存图片到本地目录。
6. 替换成相对路径。

### 具体实现

- 循环文件夹，找到文件夹里所有要替换图片的 md 文件：

```javascript
const postDirPath = path.resolve(__dirname, "./source/_posts");

function main() {
  const files = fs.readdirSync(postDirPath, {
    withFileTypes: true
  });

  files.forEach(file => {
    if (file.isFile()) replaceFile(file);
  });
}
```

- 读取 md 文件内容。

```javascript
const filePath = path.resolve(postDirPath, file.name);
const fileData = fs.readFileSync(filePath, "utf8");
```

- 正则匹配图片路径。

```javascript
const regex = /\!\[.*\]\((http.*)\)/;

if (!regex.exec(fileData)) return;
const url = regex.exec(fileData)[1];
```

- 下载图片。

```javascript
function download(url) {
  return new Promise((resolve, reject) => {
    const HTTP = url.includes("http://") ? http : https;
    HTTP.get(url, response => {
      let imgData = "";
      response.setEncoding("binary");

      // 有些http链接的图片 需要重定向到HTTPS
      if (response.statusCode == 301) download(response.headers.location);

      response.on("data", chunk => (imgData += chunk));
      response.on("end", () => {
        resolve(imgData);
      });
    }).on("error", err => reject(err));
  });
}
```

- 保存图片到本地目录。因为一篇 md 文章里有很多张图片，所以简单粗暴点，图片名称依次为：1.jpg、2.jpg、3.jpg...

```javascript
function saveImg(dirName, imgFileName, imgData) {
  const dirPath = path.resolve(postDirPath, dirName);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  fs.writeFileSync(`${dirPath}/${imgFileName}.jpg`, imgData, "binary");
}
```

- 替换成相对路径

```javascript
function replace(filePath, imgFileName, url) {
  const fileData = fs.readFileSync(filePath, "utf8");
  const newFile = fileData.replace(url, `./${imgFileName}.jpg`);
  fs.writeFileSync(filePath, newFile);
}
```

### 最后：

详细代码请查看 lingzi 的 github：[https://github.com/lingziyb/replace-img.git](https://github.com/lingziyb/replace-img.git)
