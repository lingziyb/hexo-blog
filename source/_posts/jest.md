---
title: jest单元测试 + typescript + git-commit（git-push）
author: lingzi
tags:
  - jest
  - typescript
categories:
  - 技术
date: 2019-10-01 22:48:24
---

### 做什么

在项目中引入单元测试、typescript 以及提交代码时必须单元测试通过。

- 引入 JEST 测试工具
- 每次代码 PUSH 是自动进行测试，通过才能 PUSH 代码
- 测试和测试目标都必须使用 TypeScript

### 引入 jest && typescript

参考文章如下：

- [ts-jest](https://kulshekhar.github.io/ts-jest/)：[https://kulshekhar.github.io/ts-jest/](https://kulshekhar.github.io/ts-jest/)

### 每次代码 PUSH 时自动进行测试，通过才能 PUSH 代码

运用 git 的钩子：`git-commit || git-push`

参考文章如下：

- git 官网：[https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- 【工具推荐】使用 husky 避免糟糕的 git commit：[https://zhuanlan.zhihu.com/p/35913229](https://zhuanlan.zhihu.com/p/35913229)
- husky：[https://github.com/typicode/husky](https://github.com/typicode/husky)

到睡觉时间了，demo 后面上传 GitHub 仓库， 目前就这样了。
