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