---
title: react+react-router+mobx+axios+less 搭建一个框架
author: lingzi
tags:
  - react
  - react-router
  - mobx
  - less
categories:
  - 技术
date: 2018-08-06 00:13
---

>之前做过react项目，但是没有全面搭过框架，顺便研究一波mobx。
>项目代码github地址：https://github.com/lingziyb/react-mobx-demo
##一、选react脚手架
- 想：自己搭整个框架还是比较费劲的，所以首先想到用它的脚手架来初始化一个大概的框架结构。
- 搜：开始搜脚手架，最出名的就是facebook官方出版的[create-react-app](https://github.com/facebook/create-react-app)，那我们就用这个。

##二、使用`create-react-app`初始化项目
工具会帮你初始化一个简单基本的项目并且会自动帮你安装项目所需要的各种依赖
```
  npx create-react-app my-app
  cd my-app
  yarn start   //或者npm start
```
此时浏览器会自动访问 [http://localhost:3000/](http://localhost:3000/)，你会看到一个 `react` 的欢迎界面，如下：代表你的项目已经正常运行了。
![运行后的页面.png](./1.jpg)

##三、配置项
#### 1. 展开配置项
![配置项打开前.png](./2.jpg)


虽然项目已经运行，但是在项目目录里是找不到`webpack`配置项的。比如，我们想配置less、配置alias别名，这时我们需要做一个操作：展开项目（`eject`）[ 注：这个一个不可逆过程，一旦你执行了，就不能回到初始化 ] 。
```
  yarn eject   // 或者 npm run eject
```
再看项目结构，此时已多了一些其他目录，展开`config`目录，里面就有`webpack`配置文件以及其他各种配置，如下：

![配置项打开后.png](./3.jpg)

#### 2. `less`配置

```
  yarn add less less-loader 
```
######修改 webpack配置文件
- 找到 `webpack.config.dev.js` 与 `webpack.config.prod.js` 文件，后缀 `dev` 表示开发的配置，`prod` 表示是生产环境的配置，因此两个配置文件都需要修改。
- 修改`webpack.config.dev.js`，在`module`的`rules`字段中更改以下代码
更改前：
```
{
	test: /\.css$/,
	use: [
		require.resolve( 'style-loader' ),
		{
	  		loader: require.resolve( 'css-loader' ),
			options: {
			importLoaders: 1,
		},
 		...
	],				
},
```
更改后：
```
{
	test: /\.(css|less)$/,    // 划重点
	use: [
		require.resolve( 'style-loader' ),
		{
	  		loader: require.resolve( 'css-loader' ),
			options: {
			importLoaders: 1,
		},
 		...
		{
			loader: require.resolve( 'less-loader' ),    // 划重点
		}
	],				
},
```
- 修改`webpack.config.prod.js` ，同理，在`rules`字段中更改以上代码

## 四、引入路由
#### 1. 更改src目录结构
- 便于更符合实际项目场景，我们在`src`下新建如下几个文件夹：
          a. `api`文件夹存放ajax请求
          b. `components`文件夹存放组件
          c. `pages`文件夹存放页面
          d. `routes`文件夹存放路由
          e. `stores`文件夹存放数据
          f. `utils`文件夹存放工具类函数          

#### 2. 设置文件别名
既然有了文件夹来区分不同的功能，为了方便文件的相互，我们可以利用 webpack 来设置别名。
- 修改`config`文件夹下的`paths`文件
```
module.exports = {
  ...
  appApi: resolveApp( 'src/api' ),
  appComponents: resolveApp('src/components'),
  appPages: resolveApp( 'src/pages' ),
  appRoutes: resolveApp('src/routes'),
  appStores: resolveApp( 'src/stores' ),
  appUtils: resolveApp('src/utils'),
  ...
```
- 修改 `webpack` 配置项 `alias`
```
alias: {
  ...
  api: paths.appApi,
  components: paths.appComponents,
  pages: paths.appPages,
  routes: paths.appRoutes,
  stores: paths.appStores,
  utils: paths.appUtils,
  ...
```
#### 3. 安装路由组件 `react-router`
```
  yarn add react-router react-router-dom
```

- 在`pages`文件夹中新建`home.jsx`页面和`about.jsx`页面
   `home.jsx`
```
import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
	render() {
		return (
			<div>
				<p>这是首页</p>
				<Link to="/about">go to About</Link>
			</div>
		);
	}
}

export default Home;
```
   `about.jsx`
```
import React from 'react'
import { Link } from 'react-router-dom'

class About extends React.Component {
	render() {
		return (
			<div>
				<p>这是about页面</p>
				<Link to="/">go to Home</Link>
			</div>
		)
	}
}

export default About;
```

- 在`routes`文件夹中新建`index.jsx`页面
```
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from 'pages/home';
import About from 'pages/about';

const Routes = () => (
	<Router>
		<div>
			<Route exact path="/" component={Home}/>
			<Route path="/about" component={About}/>
		</div>
	</Router>
)

export default Routes;
```
- 为了页面好看一点点，我们写个App.less
```
.app {
    text-align: center;
    border: 1px solid #ddd;
    padding: 30px;
    p {
        color: green;
    }
}
```
- 更改`app.js`文件
```
import React, { Component } from 'react';
import Routes from 'routes/index';
import './App.less'

class App extends Component {
	render() {
		return (
			<div className="app">
				<Routes />
			</div>
		);
	}
}

export default App;
```
此时首页长相：

![首页.png](./4.jpg)

此时about页长相：

![about页](./5.jpg)

## 五、添加数据管理`mobx`
#### 1. 按照依赖
```
yarn add mobx mobx-react
```
#### 2.开始使用
- 使用 `mobx` 你还需要安装 `babel` 的装饰器插件，以及修改 `babel` 的配置
```
  yarn add babel-plugin-transform-decorators-legacy
```
- 修改 `package.json` 文件中的 `babel` 参数，或者在根目录下新建一个 .babelrc 文件
```
"babel": {
  "presets": [
    "react-app"
  ],
  "plugins": [
    "babel-plugin-transform-decorators-legacy"
  ]
...
```
现在，你可以在你的组件中使用 `mobx` 来管理你的状态了。关于 `mobx` 的使用，你可以访问[官方文档](https://github.com/mobxjs/mobx)

#### 3. 修改文件
- 在`stores`里新建`index.js`、`home.js`、`about.js`。 【 注：home.js和about.js我用了两种方式写，都可以的。】
`home.js`
```
import { observable } from 'mobx';

const HomeStore = observable( {
	title: 'this is home page'
} );

export default HomeStore;
```
`about.js`
```
import { observable } from 'mobx';

class AboutStore {
	@observable title = 'this is about page';
}

export default new AboutStore();
```
`index.js`
```
import aboutStore from './about';
import homeStore from './home';

const store = {
	aboutStore,
	homeStore
};

export default store;
```
- 修改`app.js`
```
import React, { Component } from 'react';
import Routes from 'routes/index';
import './App.less';
import { Provider } from 'mobx-react';
import stores from 'stores/index';

class App extends Component {
	render() {
		return (
			<div className="app">
				<Provider {...stores}>
					<Routes />
				</Provider>
			</div>
		);
	}
}

export default App;
```

- 修改`pages`里的`home.jsx`
```
import React from 'react';
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';

@inject( 'homeStore' )
class Home extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.homeStore.title}</p>
                <Link to="/about">go to About</Link>
            </div>
        );
    }
}

export default Home;
```
- 修改`pages`里的`about.jsx`
```
import React from 'react'
import { Link } from 'react-router-dom'
import { inject } from 'mobx-react';

@inject( 'aboutStore' )
class About extends React.Component {
	render() {
		return (
			<div>
				<p>{ this.props.aboutStore.title }</p>
				<Link to="/">goto Home</Link>
			</div>
		)
	}
}

export default About;
```
这是现在的首页：【数据变了哟】

![首页.png](./6.jpg)

这是现在的about页：【数据变了哟】

![about页.png](./7.jpg)


## 六、数据请求`axios`
```
  yarn add axios
```
- 在`api`文件夹里增加`home.js`
```
import axios from 'axios';

export default {

	/**
	 * 获取首页列表页数据
	 * @returns {Promise.<*>}
	 */
	async getList(){
		return await axios.get( 'http://lemonof.com:82/api/getList' ).then( ( res ) => res.data.data );
	}
}
```
- 更改`stores`里的`home.js`
```
import { observable, action } from 'mobx';
import HomeApi from 'api/home';

const HomeStore = observable( {
	title: 'this is home page',
	list: [],

	// 获取首页数据
	async getList() {
		this.list = await HomeApi.getList();
	}
} );

export default HomeStore;
```
- 更改`pages`里的`home.jsx`
```
import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@inject( 'homeStore' )
@observer
class Home extends React.Component {

	componentDidMount() {
		this.props.homeStore.getList();
	}

	render() {
		return (
			<div>
				<p>{this.props.homeStore.title}</p>
				<Link to="/about">go to About</Link>

				<div style={{ textAlign: 'left', width: '450px', margin: 'auto' }}>
					<p>下面是列表数据：</p>
					{
						this.props.homeStore.list && this.props.homeStore.list.map( ( el ) => {
							return ( <div key={el.id}>标题：{el.title}</div> )
						} )
					}
				</div>
			</div>
		);
	}
}

export default Home;
```
此时首页长相：【页面没有优化，请将就看】

![首页.png](./8.jpg)

此时about页长相：【页面没有优化，请将就看】

![about页.png](./9.jpg)


哇！终于写完了。
后续我再把UI优化下。
最终项目代码地址：https://github.com/lingziyb/react-mobx-demo

查阅文章有：
create-react-app全家桶router+mobx：https://www.jianshu.com/p/2d54c2b3cfa3
