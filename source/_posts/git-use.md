---
title: git 用法积累
author: lingzi
tags:
  - git
categories:
  - 技术
date: 2019-08-12 17:37:59
---

#### 1. 远程仓库

- 从远程库克隆

```javascript
git clone git@server-name:path/repo-name.git
```

- 关联远程库

```javascript
git remote add origin git@server-name:path/repo-name.git
```

#### 2. 推送

```javascript
git push origin master
```

#### 3. 误删远程 dev 分支

- 使用 git log -g 找回之前提交的 commit
- 使用 git branch dev commit_id 命令用这个 commit 创建一个分支
- 切换到 dev 分支

参考文章：
git 误删分支恢复方法：[https://blog.csdn.net/new03/article/details/84920771](https://blog.csdn.net/new03/article/details/84920771)

#### 4. git 提交了过大的文件 导致 push 报错

{% asset_img big.png %}

解决：
{% asset_img delete-big.png %}
参考链接：[https://blog.csdn.net/yimingsilence/article/details/81460278](https://blog.csdn.net/yimingsilence/article/details/81460278)

#### 5. LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to gitee.com:443

{% asset_img push-fail.png %}

解决方案：
`git config --global --unset http.proxy`
参考链接：
[git push github 失败，提示：SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443](https://blog.csdn.net/daerzei/article/details/79528153)
