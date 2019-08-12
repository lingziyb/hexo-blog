---
title: git 用法积累
author: lingzi
tags:
  - git
categories:
  - 技术
date: 2019-08-12 17:37:59
---


####  1. 远程仓库

- 从远程库克隆
```
git clone git@server-name:path/repo-name.git
```

- 关联远程库
```
git remote add origin git@server-name:path/repo-name.git
```

#### 2. 推送

```
git push origin master
```

####  3. 误删远程dev分支

- 使用git log -g 找回之前提交的commit
- 使用git branch dev commit_id命令用这个commit创建一个分支
- 切换到dev分支

参考文章：
git 误删分支恢复方法：[https://blog.csdn.net/new03/article/details/84920771](https://blog.csdn.net/new03/article/details/84920771)

#### 4. git提交了过大的文件  导致push报错
![image.png](https://upload-images.jianshu.io/upload_images/3453108-eab486789cc4462d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

解决：
![image.png](https://upload-images.jianshu.io/upload_images/3453108-5051a5e70bf7437e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
参考链接：[https://blog.csdn.net/yimingsilence/article/details/81460278](https://blog.csdn.net/yimingsilence/article/details/81460278)