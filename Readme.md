# Laravel-mvc

`node.js` `express` `laravel-mvc-config`

---

## 作用

> 使`express`能够基本像`Laravel`一样实现MVC分层开发

## 安装

```
npm install laravel-mvc
```

> 依赖的`laravel-mvc-config`将自动安装
> 
> [Laravel-mvc-config](https://www.npmjs.com/package/laravel-mvc-config)

## 使用

### 第一步、 更改`express`默认的目录结构

- `express`默认目录结构

```javascript
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade
```

- 修改后的目录结构

```javascript
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── web.js // 将`index.js`改成`web.js`
│   └── api.js // 将`users.js`改成`api.js`
├── views
│   ├── error.jade
│   ├── index.jade
│   └── layout.jade
├── controllers // 添加`controllers`文件夹，必须在项目根目录添加，全小写，名称固定
│   ├── Test // 根据项目情况添加模块，这里演示添加`Test`模块，名称自定，需在路由中对应正确
│   │   └── TestController.js  // 添加控制器，建议大驼峰标记法，可以继续添加多个，灵活处理
│   ├── Index
│   │   └── IndexController.js
│   └── Controller.js // 控制器父类，位置固定，名称固定
└── models // 添加`models`文件夹，必须在项目根目录添加，全小写，名称固定
    ├── Test  // 根据项目情况添加模块，这里演示添加`Test`模块，名称自定，需在控制器加载时，做名称对应
    │   └── Test.js  // 添加模型，建议大驼峰标记法，可以继续添加多个，灵活处理
    ├── Index
    │   └── Index.js
    └── Model.js // 模型父类，位置固定，名称固定
 
```

### 第二步，修改根目录`app.js`

- 默认`app.js`

```javascript
// ... ...

var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// ... ...

app.use('/', indexRouter);
app.use('/users', usersRouter);

// ... ...

```

- 修改后的`app.js`

```javascript
// ... ...

var logger = require('morgan');

var webRoute = require('./routes/web'); // 这行改成了`web`路由
var apiRoute = require('./routes/api'); // 这行改成了`api`路由

var app = express();

// ... ...

app.use('/', webRoute); // 加载`web`路由
app.use('/api', apiRoute); // 加载`api`路由
```

### 第三步、修改`routes/web.js`中的内容，原先是`routers/index.js`

- 默认`web.js`（或称默认`index.js`）

```javascript
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

- 修改后的`web.js`

```javascript
// 加载`laravel-mvc`核心模块
var route = require('laravel-mvc');
// 导出`express`自带系统模块,注意：`=`右面的`route.route`很重要，必须两个，不能多不能少
module.exports = route.route;

// 添加测试路由
route.get('/test', 'Test/TestController@test');

// 你可以根据项目添加自己的路由
// ... ...
```

关于第二个参数`Test/TestController@test`

> Test/TestController：代表controllers目录下面的Test目录下的TestController控制器
> 
> @是分割符
> 
> test：代表TestController控制器的test方法

注：`api` 路由如果使用，修改方法同 `web` 路由

### 第四步、控制器父类和控制器代码示例

- 父类Controller.js

```javascript
class Controller{
    constructor(){
        // 一些初始化操作
        this.name = 'yuanshang';
        this.sex = 'man';
        this.age = 26;
    }
    
    // 公用方法
    exmpleMethod() {
        console.log('Controller');
    }
}

module.exports = Controller;  // 导出父类，供子类继承，注意不要 `new`
```

- 子类TestController.js

```javascript
var config = require('laravel-mvc-config'); // 导入配置文件
var Controller = require('../Controller'); // 导入父类
var Test = require(config.const.MODELPATH + 'Test/Test'); // 导入Test模块的模型

class TestController extends Controller{
    constructor(){
        super(); // 调用父类的构造方法，必须的一行，否则下面的 `this` 将无法使用
        // 一些初始化的操作，自定义自己的一些属性
        this.param = '123';
    }
    
    // test 方法
    test(req, res) {
        $this.param = '456';
        console.log($this.param);
        Test.model_test();
        res.render('index', { title: 'Test' });
    }
}

var $this = module.exports = new TestController(); // 导出实例化的控制器对象，供路由调用
```

> 唯一缺憾是在控制器中使用 `this` 关键字会失败，只能使用上边的折中方法

### 第五步、模型父类和控制器代码示例

- 父类Model.js

```javascript
class Model{
    constructor(){
        // 一些初始化操作
        this.name = 'yuanshang';
        this.sex = 'man';
        this.age = 26;
    }
    
    // 公用方法
    modelExmpleMethod() {
        console.log('Model');
    }
}

module.exports = Model;  // 导出父类，供子类继承，注意不要 `new`
```

- 子类Test.js

```javascript
var config = require('laravel-mvc-config'); // 导入配置文件
var Model = require('../Model'); // 导入父类

class Test extends Model{
    constructor(){
        super(); // 调用父类的构造方法，必须的一行，否则下面的 `this` 将无法使用
        // 一些初始化的操作，自定义自己的一些属性
        
    }
    
    model_test() {
        console.log('test_model');
    }
}

module.exports = new Test(); // 导出实例化的 `Test` 供控制器调用
```

### 第六步、测试浏览器请求

- 在项目根目录下启动命令，输入下列命令，启动web服务

```
npm start
```

- 打开谷歌浏览器，输入

```
http://127.0.0.1:3000/test
```

- 一般情况下，浏览器将正常输出返回信息

## 附录

- 各个工具版本需求

> node.js >= 8.x.x
> 
> express >= 4.16.x

- 关于Node.js

Node.js版本必须支持ES6中规定的class语法声明方法才可以

[class使用教程](https://www.w3cschool.cn/ecmascript/e7yk1q5x.html)

- 更多问题，请联系我。

```javascript
var me = {
    name: 'yuanshang',
    email: 'zgh.yuanshang@gmail.com'
    qq: '1063545870',
    wechat: 'yuanshang-ling',
}
```