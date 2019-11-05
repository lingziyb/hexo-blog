---
title: vue 双向绑定实现
author: lingzi
tags:
  - vue
categories:
  - 技术
date: 2019-04-11 18:34
---

### 起因

> 用 vue 这么久，也了解过它的双向绑定原理，但是没有实现过，所以还是实地手写一个深入理解下。

### 它是什么

- 单向绑定：Model 数据改变，引起 View 视图的更新。
- 双向绑定：Model 数据改变，引起 View 视图的更新；View 视图的改变，引起 Model 数据的更新。

**双向绑定，就是在单向绑定的基础上给可输入元素（input、textarea 等）添加了 change( input )事件，来动态修改 model。**

> 总结： 双向绑定 = 单向绑定 + 事件的监听

### 原理分析

- 单向绑定： 1. 通过 Object.defineProperty()来实现对属性的劫持，达到监听数据变动的目的。 2. 发布订阅模式。维护一个数组，用来收集订阅者，当数据变动时，发布消息给订阅者。 3. 订阅者收到通知，触发相应的监听回调，更新视图。

- 事件监听
  给可输入元素（input、textarea 等）添加 change(input)事件，来动态修改 model。

### 思考实现步骤

- 新建两个文件（ index.html 和 index.js ），并写好初始化代码。
- index.js 里实现双向绑定： 1. 实现一个监听器 Observer，用来劫持监听所有属性，若有变动，就通知订阅者。 2. 实现一个订阅者 Watcher，每一个 Watcher 都绑定一个更新函数，Watcher 可以收到属性的变化通知，并执行相应的更新函数，从而更新视图。 3. 因为订阅者是有很多个，所以我们需要有一个消息订阅器 Dep 来专门收集这些订阅者。 4. 实现一个解析器 Compile，可以扫描解析每个节点的相关指令（v-model，v-on 等）。如果节点存在这些指令，则初始化这些节点的模板数据，使之可以显示在视图上，然后初始化相应的订阅者（Watcher）。 5. 事件监听，改变 model 数据

### 开始代码实现

- 步骤一：新建两个文件（ index.html 和 index.js ），并初始化代码。
  `index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>实现-vue-双向绑定</title>
  </head>

  <body>
    <div id="practice">
      <h2>实现-vue-双向绑定</h2>

      <div v-text="name"></div>
      <div v-text="desc"></div>
      <input type="text" v-model="desc" />
    </div>

    <script src="./index.js"></script>
    <script>
      new Vue({
        el: "#practice",
        data: {
          name: "lingzi",
          desc: "i am so cute"
        }
      });
    </script>
  </body>
</html>
```

`index.js`

```javascript
class Vue {
  constructor(options) {}
}
```

- 步骤二：index.js 里实现双向绑定

1. 实现一个监听器 Observer，用来劫持监听所有属性，若有变动，就通知订阅者。

```javascript
class Vue {
  constructor(options) {
    let data = options.data;
    const el = document.querySelector(options.el);

    this.Observer(data);
  }

  // 监听器
  Observer(obj) {
    if (!data || typeof data !== "object") return;

    for (const key in obj) {
      let value = obj[key];
      Object.defineProperty(obj, key, {
        get: () => {
          return value;
        },
        set: newValue => {
          value = newValue;

          // TODO 通知订阅者
        }
      });
    }
  }
}
```

2. 实现一个订阅者 Watcher，每一个 Watcher 都绑定一个更新函数，Watcher 可以收到属性的变化通知，并执行相应的更新函数，从而更新视图。

```javascript
class Vue {
    ... //省略
}

// 订阅者
class Watcher {

    constructor(el, vm, exp, attr) {
        this.el = el;
        this.vm = vm;
        this.exp = exp;
        this.attr = attr;

        this.update();
    }

    update() {
        this.el[this.attr] = this.vm.data[this.exp];   //更新视图
    }

}
```

3.因为订阅者是有很多个，所以我们需要有一个消息订阅器 Dep 来专门收集这些订阅者。

```javascript
class Vue {
    ... //省略
     Observer(obj) {
        if (!obj || typeof obj !== 'object') return;

        for (const key in obj) {
            let value = obj[key];
            Object.defineProperty(obj, key, {
                get: () => {
                    return value;
                },
                set: (newValue) => {
                    value = newValue;

                    // TODO 通知订阅者
                    this.dep.notify();   // ++++++++加上这句
                }
            })
        }
    }
}

// 订阅者
class Watcher {
    ... //省略
}

// 收集订阅者
class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    notify() {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}
```

4. 实现一个解析器 Compile，可以扫描解析每个节点的相关指令（v-model，v-on 等）。如果节点存在这些指令，则初始化这些节点的模板数据，使之可以显示在视图上，然后初始化相应的订阅者（Watcher）。

```javascript
class Vue {

    constructor(options) {
        ... //省略
        this.Observer(this.data);
        this.Compile(this.el);   // ++++++++++加上这句
    }

    // 监听器
    Observer(obj) {
        ... //省略
    }

    Compile(el) {
        const nodes = el.children;

        [...nodes].forEach((node, index) => {
            if (node.hasAttribute('v-text')) {
                let attrVal = node.getAttribute('v-text');
                this.dep.addSub(new Watcher(node, this, attrVal, 'innerHTML'));
            }

            if (node.hasAttribute('v-model')) {
                let attrVal = node.getAttribute('v-model');
                this.dep.addSub(new Watcher(node, this, attrVal, 'value'));
            }
        })

    }

}
```

5. 事件监听，改变 model 数据

```javascript
Compile(el) {
    const nodes = el.children;
    [...nodes].forEach((node, index) => {

        ... //省略

        if (node.hasAttribute('v-model')) {
            let attrVal = node.getAttribute('v-model');
            this.dep.addSub(new Watcher(node, this, attrVal, 'value'));

            // ++++++++++++ 加上下面两句
            node.addEventListener('input', () => {
                this.data[attrVal] = node.value;
            })
        }
    })
}
```

#### 结尾发言

实现的简陋型，供自己理解。
代码仓库地址：[https://github.com/lingziyb/study-notes/tree/master/vue-two-way-bind](https://github.com/lingziyb/study-notes/tree/master/vue-two-way-bind)
