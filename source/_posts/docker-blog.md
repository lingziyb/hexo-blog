---
title: "前端项目加上docker部署，react+github+travis+docker"
author: lingzi
tags:
  - docker
  - travis
  - nginx
categories:
  - 技术
date: 2019-02-26 21:57
---

### 起因

> 一直想上手一下 `docker` ，奈何自己摆脱不了懒惰的天性。就在之前有个 `docker` 的线下技术活动，就刚好学习一下。
> 如何实践呢？就在一个前端项目上结合 `docker` 部署吧。

### 场景说明

> 我有一个博客，仓库是`github`，前端是用`vue`（或者`react`）写的，结合`travis CI`持续集成，再用`gulp`自动发布到服务器上。
> [ 注：怕小白不懂，详说下流程。先本地 `git commit && git push` 代码到`github`仓库，然后`travis CI`会自动拉取代码并执行`travis.yml`文件里的命令`npm install && gulp publish`。]

现在要加入`docker`，那么如何加呢？

### 思考结果

> 一开始不咋懂，就探索的第一个方案，结果想改个小东西的时候发现太麻烦，就发现了第二种方案。

两种方案：

- 方案一：先构建镜像上传到`dockerhub`仓库，然后在服务器上拉取镜像并创建容器。
  1.  构建镜像：`docker build`
  2.  上传：`docker push`
  3.  拉取镜像：`docker pull`
  4.  创建容器：`docker run`
- 方案二：直接在服务器上拉取代码构建镜像，并创建容器。
  1.  构建镜像：`docker build`
  2.  创建容器：`docker run`

### 真正实践

> 这里只详述方案一，方案二省略！！

###### 1. 准备工作（ 这些都要自己先准备好 ）：

- 本地新建一个前端项目，并且远程仓库是`github`。
- 服务器上安装`docker`（如何安装，请看 [docker 官网](https://docs.docker.com/) ）。
- 然后了解下`github`的`CI`工具 `travis CI`，并把项目 CI 跑起来。

准备工作做好后，就开始下面的流程。

###### 2. 第一步：

- 在已建好的项目根目录加入 2 个文件：`Dockerfile`、`nginx.conf`:

`Dockerfile`:

```Dockerfile
from nginx
label maintainer "lingzi"
copy ./build/ /usr/share/nginx/html/
copy ./nginx.conf /etc/nginx/conf.d/default.conf
expose 83
```

`nginx.conf`:

```
server {
    listen       83;
    root         /usr/share/nginx/html/;

    include /etc/nginx/default.d/*.conf;

    location / {
      index index.html index.htm;
      try_files $uri $uri/ /index.html;
    }

    location /api/ {
      proxy_pass http://lemonof.com:7001/;
    }

    error_page 404 /404.html;
        location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
    }

}
```

###### 3. 第二步：

- 因为要把创建的镜像推到`dockerhub`仓库，所以要先在[dockerhub 官网](https://hub.docker.com)注册账号。
- 新建 travis.yml 文件
  `travis.yml`:

```
language: node_js
node_js:
  - "8"
install: npm install
script:
  - npm run build
  - docker build -t imagename .   // `imagename`是变量，镜像的名字，你随便写个。特别注意，后面那个点是必须要的，不要写掉了！
  - docker login -u $DOCKER_USER -p $DOCKER_PASS
  - docker push imagename   // `imagename`注释同上
```

_注：`$DOCKER_USER`和`$DOCKER_PASS`是`travis`里设置的环境变量。为了安全，把用户名和密码都设置成环境变量了，当然，你也可以直接写上你的用户名和密码。例如：`docker login -u 用户名 -p 密码`_

###### 4. 第三步：

- 用`xshell`登录服务器。
- 因为准备工作里已经安装好了`docker`（注：没装的赶紧装），此时直接在服务器上拉取镜像：

```javascript
docker pull imagename
```

**注：如果`dockerhub`平台里`imagename`设置为`private`，如下图所示，就要先登录：`docker login -u username -p password`，才能拉取镜像。**
![repository设置.png](./1.jpg)

- 在服务器上创建容器并运行

```javascript
docker run --name dockername -d -p 83:83 imagename
// dockername   容器名；
// imagename  镜像名
// -d 后台运行容器，并返回容器ID；
// -p 端口映射，格式为：主机(宿主)端口:容器端口
```

现在访问服务器的`83`端口，应该就能看到东西了。这就是我博客的首页了。
![首页.png](./2.jpg)

#### 结尾发言

希望能帮到大家。
代码仓库地址：https://github.com/lingziyb/ice-blog

---

参考文章如下：
[docker 入门教程](http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)
[travis 设置：github enok-blog](https://github.com/fengmu456/enok-blog/blob/master/.travis.yml)
[docker 命令大全](http://www.runoob.com/docker/docker-command-manual.html)
