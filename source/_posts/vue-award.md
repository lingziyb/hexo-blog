---
title: 抽奖转盘实现 ( vue + js + html + less )
author: lingzi
tags:
  - vue
  - javascript
  - html
  - less
categories:
  - 技术
date: 2017-12-08 16:50
---

### 书写文章起因

> 活动策划人员策划这个抽奖页面，用于 app 内。
> 当时，这个转盘布局我踩坑了，我本以为这么简单的布局应该不用绝对定位的，是我想多了！然后改为绝对定位来实现，因为要简单些。

![抽奖转盘](./1.jpg)

##### 一、九个格子和开始按钮，页面布局的实现思路

这个用绝对定位，小格子相对于大转盘定位，这个我就给个简单例子就好了哈，我相信你们能懂起的，如果没理解到我再详说。
![标注](./2.jpg)

如上图所示，大框为父容器，九个小格子为子容器

```javascript
<div class="parent">
    <div class="child child1"></div>
    <div class="child child2"></div>
    <div class="child child3"></div>
    .......
    <div class="child child9" id="start"></div>
</div>

<style>
    .parent{
        position: relative;

        .child{
             position: absolute;
        }
        .child1{
            top: 0;
            left: 0;
        }
        ......
       .active{
            background-color: darkgoldenrod;
       }
    }
</style>
```

##### 二、转动效果实现：
（下面贴出 vue 文件的 html 和 js 代码，css 代码没有。因为全贴出来太多了，如果想看详细代码，就到我的[github 仓库](https://github.com/lingziyb/get-award)去观看或者下载）

![转动前.png](./1.jpg)
![转动后.png](./3.jpg)

app.vue

```html
// template
<template>
  <div id="rotary-table">
    <div
      class="award"
      v-for="(award,index) in awards"
      :class="['award'+index,{'active': index==current}]"
    >
      {{award.name}}
    </div>
    <div id="start-btn" @click="start">开始</div>
  </div>
</template>
```

```javascript
// js
export default {
  name: "get-award",
  data() {
    return {
      current: 0,
      awards: [
        // 奖品数组
        { id: 1, name: "空" },
        { id: 2, name: "眼镜" },
        { id: 3, name: "包" },
        { id: 4, name: "笨驴" },
        { id: 5, name: "书" },
        { id: 6, name: "手链" },
        { id: 7, name: "美女" },
        { id: 8, name: "iphone" }
      ],
      speed: 200, // 速度
      diff: 15, // 速度增加的值
      award: {}, // 抽中的奖品
      time: 0 // 记录开始抽奖时的时间
    };
  },
  methods: {
    start() {
      // 开始抽奖
      this.drawAward();
      this.time = Date.now();
      this.speed = 200;
      this.diff = 15;
    },
    drawAward() {
      // 请求接口, 这里我就模拟请求后的数据(请求时间为2s)
      setTimeout(() => {
        this.award = {
          id: "4",
          name: "笨驴"
        };
      }, 2000);
      this.move();
    },
    move() {
      window.timeout = setTimeout(() => {
        this.current++;
        if (this.current > 7) {
          this.current = 0;
        }

        // 若抽中的奖品id存在，则开始减速转动
        if (this.award.id && (Date.now() - this.time) / 1000 > 2) {
          this.speed += this.diff; // 转动减速

          // 若转动时间超过4秒，并且奖品id等于小格子的奖品id，则停下来！
          if (
            (Date.now() - this.time) / 1000 > 4 &&
            this.award.id == this.awards[this.current].id
          ) {
            clearTimeout(window.timeout);
            setTimeout(() => {
              alert(this.award.name);
            }, 0);
            return;
          }

          // 若抽中的奖品不存在，则加速转动
        } else {
          this.speed -= this.diff; // 转动加速
        }

        this.move();
      }, this.speed);
    }
  }
};
```

#### 结尾发言

如果没有理解到，可以留言问我哈。这是我专门写的小 demo，希望能帮到大家。谢谢！
代码仓库地址：https://github.com/lingziyb/get-award
